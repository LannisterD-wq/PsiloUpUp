"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"
import { XMark } from "@medusajs/icons"

type CartItem = {
  id: string
  title: string
  quantity: number
  unit_price: number
  thumbnail?: string
  variant?: {
    title?: string
  }
}

type CartDropdownProps = {
  cart?: {
    items?: CartItem[]
    total?: number
  }
  open: boolean
  onClose: () => void
}

const CartDropdown: React.FC<CartDropdownProps> = ({ cart, open, onClose }) => {
  if (!open) return null

  const items = cart?.items || []
  const total = cart?.total || 0

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100)
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-ui-border-base">
            <h2 className="text-lg font-semibold">Carrinho</h2>
            <button
              onClick={onClose}
              className="text-ui-fg-subtle hover:text-ui-fg-base"
            >
              <XMark />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-ui-fg-subtle mb-4">
                  Seu carrinho está vazio
                </p>
                <LocalizedClientLink href="/store" onClick={onClose}>
                  <Button variant="secondary">Continuar comprando</Button>
                </LocalizedClientLink>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {item.thumbnail && (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      {item.variant?.title && (
                        <p className="text-xs text-ui-fg-subtle">
                          {item.variant.title}
                        </p>
                      )}
                      <p className="text-xs text-ui-fg-subtle">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.unit_price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-ui-border-base p-4 space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <LocalizedClientLink href="/cart" onClick={onClose}>
                  <Button variant="secondary" className="w-full">
                    Ver carrinho
                  </Button>
                </LocalizedClientLink>
                <LocalizedClientLink href="/checkout" onClick={onClose}>
                  <Button className="w-full">
                    Finalizar
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartDropdown