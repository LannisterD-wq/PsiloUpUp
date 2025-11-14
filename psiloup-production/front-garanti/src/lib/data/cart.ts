"use client"

import { apiClient } from "../api-client"

export interface CartItem {
  sku: string
  qty: number
  product: {
    id: number
    sku: string
    name: string
    priceCents: number
    imageUrl: string | null
  }
  subtotalCents: number
}

export interface CartTotals {
  items: CartItem[]
  subtotalCents: number
  discountCents: number
  shippingCents?: number
  totalCents?: number
}

const CART_STORAGE_KEY = 'psiloup_cart'

// Funções para gerenciar carrinho local
function getCartFromStorage(): Record<string, number> {
  if (typeof window === 'undefined') return {}
  const cartStr = localStorage.getItem(CART_STORAGE_KEY)
  if (!cartStr) return {}
  try {
    return JSON.parse(cartStr)
  } catch {
    return {}
  }
}

function saveCartToStorage(cart: Record<string, number>) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    window.dispatchEvent(new CustomEvent('psiloup-cart-updated'))
  }
}

export function addToCart(sku: string, qty: number = 1) {
  const cart = getCartFromStorage()
  cart[sku] = (cart[sku] || 0) + qty
  saveCartToStorage(cart)
}

export function removeFromCart(sku: string) {
  const cart = getCartFromStorage()
  delete cart[sku]
  saveCartToStorage(cart)
}

export function updateQuantity(sku: string, qty: number) {
  const cart = getCartFromStorage()
  if (qty <= 0) {
    delete cart[sku]
  } else {
    cart[sku] = qty
  }
  saveCartToStorage(cart)
}

export function getCartCount(): number {
  const cart = getCartFromStorage()
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0)
}

export async function getCartTotals(): Promise<CartTotals> {
  const cart = getCartFromStorage()
  const items = Object.entries(cart).map(([sku, qty]) => ({ sku, qty }))
  
  if (items.length === 0) {
    return {
      items: [],
      subtotalCents: 0,
      discountCents: 0,
    }
  }

  try {
    const response = await apiClient.post<CartTotals>('/cart/totals', { items })
    return response
  } catch (error) {
    console.error('Erro ao buscar totais do carrinho:', error)
    // Fallback: calcular localmente
    const products = await import('./products').then(m => m.listProducts()).catch(() => [])
    const cartItems: CartItem[] = items
      .map(({ sku, qty }) => {
        const product = products.find(p => p.sku === sku)
        if (!product) return null
        return {
          sku,
          qty,
          product: {
            id: product.id,
            sku: product.sku,
            name: product.name,
            priceCents: product.priceCents,
            imageUrl: product.imageUrl,
          },
          subtotalCents: product.priceCents * qty,
        }
      })
      .filter((item): item is CartItem => item !== null)
    
    const subtotalCents = cartItems.reduce((sum, item) => sum + item.subtotalCents, 0)
    
    return {
      items: cartItems,
      subtotalCents,
      discountCents: 0,
    }
  }
}

export async function applyCoupon(code: string): Promise<{ success: boolean; error?: string }> {
  try {
    await apiClient.post('/coupons/apply', { code })
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Cupom inválido' }
  }
}

