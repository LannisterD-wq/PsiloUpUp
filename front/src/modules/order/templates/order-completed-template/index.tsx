"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"
import { CheckCircleSolid } from "@medusajs/icons"

type OrderCompletedTemplateProps = {
  order?: any
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({ 
  order 
}) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100)
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-2xl font-semibold mb-4">Pedido não encontrado</h1>
        <p className="text-ui-fg-subtle mb-8">
          Não conseguimos encontrar informações sobre este pedido.
        </p>
        <LocalizedClientLink href="/store">
          <Button>Voltar à loja</Button>
        </LocalizedClientLink>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <CheckCircleSolid className="text-green-600 w-16 h-16 mb-6" />
      
      <h1 className="text-3xl font-semibold mb-4">
        Pedido confirmado!
      </h1>
      
      <p className="text-ui-fg-subtle mb-2">
        Obrigado pela sua compra, {order.email}
      </p>
      
      <p className="text-ui-fg-subtle mb-8">
        Seu pedido #{order.display_id || order.id} foi confirmado e está sendo processado.
      </p>

      <div className="w-full max-w-2xl">
        <div className="border border-ui-border-base rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>
          
          <div className="space-y-4 mb-6">
            {order.items?.map((item: any) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-ui-fg-subtle">
                    {item.variant?.title || ""}
                  </p>
                  <p className="text-sm text-ui-fg-subtle">
                    Quantidade: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">
                  {formatPrice(item.unit_price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-ui-border-base pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ui-fg-subtle">Subtotal</span>
              <span>{formatPrice(order.subtotal || 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-ui-fg-subtle">Frete</span>
              <span>{formatPrice(order.shipping_total || 0)}</span>
            </div>
            {order.discount_total > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Desconto</span>
                <span>-{formatPrice(order.discount_total)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-ui-fg-subtle">Impostos</span>
              <span>{formatPrice(order.tax_total || 0)}</span>
            </div>
            <div className="border-t border-ui-border-base pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(order.total || 0)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-ui-border-base rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Informações de entrega</h2>
          {order.shipping_address ? (
            <div className="text-sm">
              <p className="font-medium mb-1">
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
              {order.shipping_address.phone && (
                <p className="text-ui-fg-subtle mt-2">
                  Tel: {order.shipping_address.phone}
                </p>
              )}
            </div>
          ) : (
            <p className="text-ui-fg-subtle text-sm">
              Endereço de entrega não disponível
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-ui-fg-subtle mb-6">
            Você receberá um e-mail de confirmação com os detalhes do seu pedido.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedClientLink href="/account/orders">
              <Button variant="secondary">Ver meus pedidos</Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/store">
              <Button>Continuar comprando</Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletedTemplate