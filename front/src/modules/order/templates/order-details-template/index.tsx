"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

type OrderDetailsTemplateProps = {
  order?: any
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({ order }) => {
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-2xl font-semibold mb-4">Pedido não encontrado</h1>
        <p className="text-ui-fg-subtle mb-8">
          Não conseguimos encontrar o pedido solicitado.
        </p>
        <LocalizedClientLink href="/account/orders">
          <Button>Voltar para pedidos</Button>
        </LocalizedClientLink>
      </div>
    )
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col gap-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Pedido #{order.display_id || order.id}
        </h1>
        <LocalizedClientLink href="/account/orders">
          <Button variant="secondary">Voltar para pedidos</Button>
        </LocalizedClientLink>
      </div>

      <div className="border border-ui-border-base rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Detalhes do pedido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-ui-fg-subtle">Data do pedido</p>
            <p className="font-medium">{formatDate(order.created_at)}</p>
          </div>
          <div>
            <p className="text-ui-fg-subtle">Status</p>
            <p className="font-medium capitalize">
              {order.fulfillment_status || "Processando"}
            </p>
          </div>
          <div>
            <p className="text-ui-fg-subtle">Email</p>
            <p className="font-medium">{order.email}</p>
          </div>
          <div>
            <p className="text-ui-fg-subtle">Telefone</p>
            <p className="font-medium">
              {order.shipping_address?.phone || "Não informado"}
            </p>
          </div>
        </div>
      </div>

      <div className="border border-ui-border-base rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Itens do pedido</h2>
        <div className="flex flex-col gap-y-4">
          {order.items?.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 border-b border-ui-border-base last:border-0"
            >
              <div className="flex items-center gap-x-4">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-ui-fg-subtle">
                    {item.variant?.title || ""}
                  </p>
                  <p className="text-sm text-ui-fg-subtle">
                    Quantidade: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">
                {formatPrice(item.unit_price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-ui-border-base rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Endereço de entrega</h2>
        {order.shipping_address ? (
          <div className="text-sm">
            <p className="font-medium">
              {order.shipping_address.first_name} {order.shipping_address.last_name}
            </p>
            <p className="text-ui-fg-subtle">
              {order.shipping_address.address_1}
              {order.shipping_address.address_2 && 
                `, ${order.shipping_address.address_2}`}
            </p>
            <p className="text-ui-fg-subtle">
              {order.shipping_address.city}, {order.shipping_address.province}{" "}
              {order.shipping_address.postal_code}
            </p>
            <p className="text-ui-fg-subtle">
              {order.shipping_address.country_code?.toUpperCase()}
            </p>
          </div>
        ) : (
          <p className="text-ui-fg-subtle text-sm">
            Endereço não disponível
          </p>
        )}
      </div>

      <div className="border border-ui-border-base rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Resumo do pagamento</h2>
        <div className="flex flex-col gap-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ui-fg-subtle">Subtotal</span>
            <span>{formatPrice(order.subtotal || 0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ui-fg-subtle">Frete</span>
            <span>{formatPrice(order.shipping_total || 0)}</span>
          </div>
          {order.discount_total > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto</span>
              <span>-{formatPrice(order.discount_total)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-ui-fg-subtle">Impostos</span>
            <span>{formatPrice(order.tax_total || 0)}</span>
          </div>
          <div className="border-t border-ui-border-base pt-2 mt-2">
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>{formatPrice(order.total || 0)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button variant="secondary" className="w-full md:w-auto">
          Precisa de ajuda? Entre em contato
        </Button>
      </div>
    </div>
  )
}

export default OrderDetailsTemplate