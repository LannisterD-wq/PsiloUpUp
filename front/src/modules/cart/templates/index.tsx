"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"
import { Trash } from "@medusajs/icons"

type CartTemplateProps = {
  cart?: any
  customer?: any
}

const CartTemplate: React.FC<CartTemplateProps> = ({ cart, customer }) => {
  const items = cart?.items || []
  const subtotal = cart?.subtotal || 0
  const shipping = cart?.shipping_total || 0
  const discount = cart?.discount_total || 0
  const total = cart?.total || 0

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100)
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-2xl font-semibold mb-4">Seu carrinho está vazio</h1>
        <p className="text-ui-fg-subtle mb-8">
          Adicione produtos ao seu carrinho para continuar
        </p>
        <LocalizedClientLink href="/store">
          <Button>Continuar comprando</Button>
        </LocalizedClientLink>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Carrinho</h1>
        <LocalizedClientLink href="/store">
          <Button variant="secondary">Continuar comprando</Button>
        </LocalizedClientLink>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border border-ui-border-base rounded-lg">
            {items.map((item: any, index: number) => (
              <div
                key={item.id}
                className={`p-4 flex items-center gap-4 ${
                  index !== items.length - 1 ? "border-b border-ui-border-base" : ""
                }`}
              >
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-ui-fg-subtle">
                    {item.variant?.title || ""}
                  </p>
                  <p className="text-sm text-ui-fg-subtle mt-1">
                    {formatPrice(item.unit_price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 border border-ui-border-base rounded flex items-center justify-center">
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button className="w-8 h-8 border border-ui-border-base rounded flex items-center justify-center">
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {formatPrice(item.unit_price * item.quantity)}
                  </p>
                </div>
                <button className="text-ui-fg-subtle hover:text-ui-fg-base">
                  <Trash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-4 h-fit">
          <div className="border border-ui-border-base rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ui-fg-subtle">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ui-fg-subtle">Frete</span>
                <span>
                  {shipping === 0 ? "Calculado no checkout" : formatPrice(shipping)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="h-px bg-ui-border-base my-4"></div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <LocalizedClientLink href="/checkout">
              <Button className="w-full mt-6">Finalizar compra</Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTemplate