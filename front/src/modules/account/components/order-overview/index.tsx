"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

type Order = {
  id: string
  display_id?: number
  created_at: string
  total: number
  fulfillment_status?: string
  payment_status?: string
  items?: any[]
}

type OrderOverviewProps = {
  orders?: Order[]
}

const OrderOverview: React.FC<OrderOverviewProps> = ({ orders = [] }) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusLabel = (status?: string) => {
    const statusMap: Record<string, string> = {
      pending: "Pendente",
      processing: "Processando",
      shipped: "Enviado",
      delivered: "Entregue",
      canceled: "Cancelado",
    }
    return statusMap[status || ""] || "Processando"
  }

  if (orders.length === 0) {
    return (
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-ui-fg-base mb-4">Você ainda não fez nenhum pedido</p>
          <LocalizedClientLink href="/store">
            <Button>Começar a comprar</Button>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Pedidos recentes</h2>
      <div className="flex flex-col gap-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-ui-border-base rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-x-4">
                <p className="font-medium">
                  Pedido #{order.display_id || order.id.slice(-6)}
                </p>
                <p className="text-sm text-ui-fg-subtle">
                  {formatDate(order.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-x-4 mt-2 md:mt-0">
                <span className="text-sm px-2 py-1 bg-ui-bg-subtle rounded">
                  {getStatusLabel(order.fulfillment_status)}
                </span>
                <LocalizedClientLink
                  href={`/account/orders/details/${order.id}`}
                >
                  <Button variant="secondary" size="small">
                    Ver detalhes
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-ui-fg-subtle">
                {order.items?.length || 0} {order.items?.length === 1 ? "item" : "itens"}
              </p>
              <p className="font-medium">{formatPrice(order.total)}</p>
            </div>
          </div>
        ))}
      </div>
      {orders.length > 5 && (
        <div className="mt-6 text-center">
          <LocalizedClientLink href="/account/orders">
            <Button variant="secondary">Ver todos os pedidos</Button>
          </LocalizedClientLink>
        </div>
      )}
    </div>
  )
}

export default OrderOverview