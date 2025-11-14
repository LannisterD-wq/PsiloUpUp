"use client"

import { apiClient } from "@lib/api-client"
import { PsiloUpProduct, listProductsPsiloUp } from "./products-psiloup"

const CART_KEY = "psiloup_cart"
const COUPON_KEY = "psiloup_coupon"

export interface CartItem {
  sku: string
  qty: number
}

export interface DetailedCartItem {
  sku: string
  product: PsiloUpProduct
  qty: number
  subtotalCents: number
}

export interface CartTotals {
  items: DetailedCartItem[]
  subtotalCents: number
  discountCents: number
  coupon: Coupon | null
}

export interface Coupon {
  code: string
  discount_cents: number
  label?: string
}

// LocalStorage helpers
function readCart(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && item.sku && item.qty)
  } catch {
    return []
  }
}

function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent("psiloup-cart-updated"))
}

function getCoupon(): Coupon | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(COUPON_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setCoupon(coupon: Coupon | null) {
  if (typeof window === "undefined") return
  if (!coupon) {
    localStorage.removeItem(COUPON_KEY)
  } else {
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupon))
  }
  window.dispatchEvent(new CustomEvent("psiloup-cart-updated"))
}

// Cart operations
export function addToCart(sku: string, qty: number = 1): CartItem[] {
  const items = readCart()
  const index = items.findIndex((item) => item.sku === sku)
  if (index >= 0) {
    items[index].qty = Math.max(1, items[index].qty + qty)
  } else {
    items.push({ sku, qty: Math.max(1, qty) })
  }
  writeCart(items)
  return items
}

export function removeFromCart(sku: string): CartItem[] {
  const items = readCart().filter((item) => item.sku !== sku)
  writeCart(items)
  return items
}

export function updateQuantity(sku: string, qty: number): CartItem[] {
  const items = readCart()
  const index = items.findIndex((item) => item.sku === sku)
  if (index >= 0) {
    if (qty <= 0) {
      items.splice(index, 1)
    } else {
      items[index].qty = qty
    }
    writeCart(items)
  }
  return items
}

export function clearCart() {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_KEY)
  setCoupon(null)
  window.dispatchEvent(new CustomEvent("psiloup-cart-updated"))
}

export function getCartItems(): CartItem[] {
  return readCart()
}

export async function getDetailedCartItems(): Promise<DetailedCartItem[]> {
  const items = readCart()
  const products = await listProductsPsiloUp()
  
  return items
    .map((item) => {
      const product = products.find((p) => p.sku === item.sku)
      if (!product) return null
      return {
        sku: product.sku,
        product,
        qty: item.qty,
        subtotalCents: product.priceCents * item.qty,
      }
    })
    .filter((item): item is DetailedCartItem => item !== null)
}

export async function validateCoupon(
  code: string,
  items: DetailedCartItem[],
  subtotalCents: number
): Promise<Coupon | null> {
  try {
    const response = await apiClient.post<{ valid: boolean; discount_cents?: number; label?: string }>(
      "/coupons/validate",
      {
        code: code.trim().toUpperCase(),
        subtotal_cents: subtotalCents,
        items: items.map((item) => ({
          id: item.product.sku,
          price_cents: item.product.priceCents,
          qty: item.qty,
        })),
      }
    )
    
    if (response.valid && response.discount_cents) {
      return {
        code: code.trim().toUpperCase(),
        discount_cents: Number(response.discount_cents),
        label: response.label,
      }
    }
    return null
  } catch {
    return null
  }
}

export async function applyCoupon(code: string): Promise<{ success: boolean; error?: string; coupon?: Coupon }> {
  const trimmed = code.trim().toUpperCase()
  if (!trimmed) {
    setCoupon(null)
    return { success: false, error: "Informe um cupom." }
  }

  const items = await getDetailedCartItems()
  const subtotalCents = items.reduce((sum, item) => sum + item.subtotalCents, 0)
  
  if (!subtotalCents) {
    return { success: false, error: "Carrinho vazio." }
  }

  const validated = await validateCoupon(trimmed, items, subtotalCents)
  if (validated) {
    setCoupon(validated)
    return { success: true, coupon: validated }
  }

  setCoupon(null)
  return { success: false, error: "Cupom inválido ou indisponível." }
}

export async function getCartTotals(): Promise<CartTotals> {
  const items = await getDetailedCartItems()
  const subtotalCents = items.reduce((sum, item) => sum + item.subtotalCents, 0)
  
  let coupon = getCoupon()
  if (coupon && subtotalCents > 0) {
    const refreshed = await validateCoupon(coupon.code, items, subtotalCents)
    if (refreshed) {
      setCoupon(refreshed)
      coupon = refreshed
    } else {
      setCoupon(null)
      coupon = null
    }
  }

  const discountCents = coupon ? Number(coupon.discount_cents || 0) : 0

  return {
    items,
    subtotalCents,
    discountCents,
    coupon,
  }
}

export function getCartCount(): number {
  return readCart().reduce((sum, item) => sum + item.qty, 0)
}
