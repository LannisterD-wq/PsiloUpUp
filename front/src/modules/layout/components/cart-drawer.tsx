"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getCartTotals, removeFromCart, updateQuantity, applyCoupon } from "@lib/data/cart"
import { CartTotals } from "@lib/data/cart"
import { formatCurrency } from "@lib/util/format-currency"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [totals, setTotals] = useState<CartTotals | null>(null)
  const [loading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [couponMessage, setCouponMessage] = useState("")

  const loadCart = async () => {
    setLoading(true)
    try {
      const cartTotals = await getCartTotals()
      setTotals(cartTotals)
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      loadCart()
    }
  }, [isOpen])

  useEffect(() => {
    const handleUpdate = () => {
      if (isOpen) {
        loadCart()
      }
    }
    window.addEventListener("psiloup-cart-updated", handleUpdate)
    return () => window.removeEventListener("psiloup-cart-updated", handleUpdate)
  }, [isOpen])

  const handleRemove = (sku: string) => {
    removeFromCart(sku)
    loadCart()
  }

  const handleQuantityChange = (sku: string, qty: number) => {
    updateQuantity(sku, qty)
    loadCart()
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage("Informe um cupom.")
      return
    }
    setLoading(true)
    try {
      const result = await applyCoupon(couponCode)
      if (result.success) {
        setCouponMessage("Cupom aplicado com sucesso!")
        setCouponCode("")
        loadCart()
      } else {
        setCouponMessage(result.error || "Cupom inválido.")
      }
    } catch (error) {
      setCouponMessage("Erro ao aplicar cupom.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay active" onClick={onClose}></div>
      <div className="cart-drawer active">
        <div className="cart-drawer__header">
          <h3>Carrinho</h3>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>
        <div className="cart-drawer__content">
          {loading ? (
            <p>Carregando...</p>
          ) : !totals || totals.items.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Seu carrinho está vazio.</p>
              <Link href="/" className="button button--primary" onClick={onClose}>
                Continuar comprando
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-drawer__items">
                {totals.items.map((item) => (
                  <div key={item.sku} className="cart-item">
                    <img
                      className="cart-item__image"
                      src={item.sku === "UP-MIND" ? "/images/sem fundo mind.png" : item.sku === "UP-BURN" ? "/images/sem fundo burn.png" : "/images/burn.mind sem fundo.png"}
                      alt={item.product.name}
                    />
                    <div className="cart-item__meta">
                      <strong>{item.product.name}</strong>
                      <p>{formatCurrency(item.product.priceCents)} unidade</p>
                    </div>
                    <div className="cart-item__qty">
                      <button
                        className="button button--xs"
                        onClick={() => handleQuantityChange(item.sku, item.qty - 1)}
                      >
                        -
                      </button>
                      <input
                        className="cart-item__qty-input"
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleQuantityChange(item.sku, parseInt(e.target.value) || 1)}
                      />
                      <button
                        className="button button--xs"
                        onClick={() => handleQuantityChange(item.sku, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item__total">
                      <span>{formatCurrency(item.subtotalCents)}</span>
                      <button
                        className="button button--ghost"
                        onClick={() => handleRemove(item.sku)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {(() => {
                const threshold = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD_CENTS || 39900)
                const subtotal = totals.subtotalCents - totals.discountCents
                const remaining = Math.max(0, threshold - subtotal)
                const percent = Math.min(100, Math.floor((subtotal / threshold) * 100))
                return (
                  <div className="free-shipping-nudge" style={{ marginTop: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                      <span>{remaining === 0 ? "Frete grátis habilitado!" : "Faltam"} {remaining === 0 ? "" : formatCurrency(remaining)} {remaining === 0 ? "" : "para frete grátis"}</span>
                      <span>{percent}%</span>
                    </div>
                    <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 6 }}>
                      <div style={{ height: 6, background: "linear-gradient(90deg,#7c7cff,#5ce1e6)", width: `${percent}%`, borderRadius: 9999 }}></div>
                      <div style={{ height: 6, background: "#e5e7eb", width: `${100 - percent}%`, borderRadius: 9999 }}></div>
                    </div>
                  </div>
                )
              })()}
            </>
          )}
        </div>
        {totals && totals.items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-coupon">
              <input
                type="text"
                placeholder="Cupom de desconto"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="button" onClick={handleApplyCoupon}>
                Aplicar
              </button>
              {couponMessage && <small>{couponMessage}</small>}
            </div>
            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Subtotal:</span>
                <strong>{formatCurrency(totals.subtotalCents)}</strong>
              </div>
              {totals.discountCents > 0 && (
                <div className="cart-summary__row">
                  <span>Desconto:</span>
                  <strong>- {formatCurrency(totals.discountCents)}</strong>
                </div>
              )}
              <div className="cart-summary__total">
                <span>Total:</span>
                <strong>{formatCurrency(totals.subtotalCents - totals.discountCents)}</strong>
              </div>
            </div>
            <Link
              href="/checkout"
              prefetch={false}
              className="button button--primary button--block cart-checkout"
              onClick={onClose}
            >
              Finalizar compra
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
