"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { User, MapPin, Package, CreditCard } from "@medusajs/icons"

type Customer = {
  id: string
  email?: string
  first_name?: string
  last_name?: string
  phone?: string
  created_at?: string
  orders?: any[]
  shipping_addresses?: any[]
}

type OverviewProps = {
  customer?: Customer | null
}

const Overview: React.FC<OverviewProps> = ({ customer }) => {
  const getCustomerName = () => {
    if (customer?.first_name || customer?.last_name) {
      return `${customer.first_name || ""} ${customer.last_name || ""}`.trim()
    }
    return customer?.email || "Usuário"
  }

  const stats = [
    {
      label: "Pedidos",
      value: customer?.orders?.length || 0,
      icon: Package,
      href: "/account/orders",
    },
    {
      label: "Endereços",
      value: customer?.shipping_addresses?.length || 0,
      icon: MapPin,
      href: "/account/addresses",
    },
    {
      label: "Perfil",
      value: "Gerenciar",
      icon: User,
      href: "/account/profile",
    },
  ]

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">
          Olá, {getCustomerName()}!
        </h1>
        <p className="text-ui-fg-subtle">
          Gerencie sua conta e acompanhe seus pedidos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <LocalizedClientLink
              key={stat.label}
              href={stat.href}
              className="group"
            >
              <div className="border border-ui-border-base rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="text-ui-fg-subtle" />
                  <span className="text-2xl font-semibold">{stat.value}</span>
                </div>
                <p className="text-sm text-ui-fg-subtle">{stat.label}</p>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Informações da Conta</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-ui-fg-subtle">Email</p>
              <p className="font-medium">{customer?.email || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm text-ui-fg-subtle">Telefone</p>
              <p className="font-medium">{customer?.phone || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm text-ui-fg-subtle">Cliente desde</p>
              <p className="font-medium">
                {customer?.created_at
                  ? new Date(customer.created_at).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Não informado"}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex flex-col gap-y-3">
            <LocalizedClientLink
              href="/account/profile"
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              Editar Perfil →
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account/addresses"
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              Gerenciar Endereços →
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account/orders"
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              Ver Todos os Pedidos →
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/store"
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              Continuar Comprando →
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview