"use client"

import React from "react"

type CheckoutSummaryProps = {
  cart?: any
}

const CheckoutSummary = ({ cart }: CheckoutSummaryProps) => {
  if (!cart) {
    return (
      <div className="flex flex-col gap-y-4 py-8">
        <div className="bg-gray-100 h-32 animate-pulse rounded" />
      </div>
    )
  }

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

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-xl font-semibold">Resumo do Pedido</h2>
      
      {/* Items */}
      <div className="flex flex-col gap-y-2">
        {items.map((item: any) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>{formatPrice(item.unit_price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="h-px w-full bg-gray-200 my-2" />

      {/* Totals */}
      <div className="flex flex-col gap-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span>{shipping === 0 ? "Calculado no checkout" : formatPrice(shipping)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="h-px w-full bg-gray-200 my-2" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  )
}

export default CheckoutSummary
