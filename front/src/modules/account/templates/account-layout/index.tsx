"use client"

import React from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { User, Package, MapPin, ChevronRightMini } from "@medusajs/icons"

type AccountLayoutProps = {
  children: React.ReactNode
  customer?: any
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, customer }) => {
  const pathname = usePathname()

  const menuItems = [
    {
      href: "/account",
      label: "Visão Geral",
      icon: User,
    },
    {
      href: "/account/profile",
      label: "Perfil",
      icon: User,
    },
    {
      href: "/account/addresses",
      label: "Endereços",
      icon: MapPin,
    },
    {
      href: "/account/orders",
      label: "Pedidos",
      icon: Package,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/account") {
      return pathname === "/account" || pathname === "/br/account"
    }
    return pathname?.includes(href)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 py-8">
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="bg-white rounded-lg border border-ui-border-base p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <LocalizedClientLink
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-md transition-colors
                    ${
                      active
                        ? "bg-ui-bg-base-hover text-ui-fg-base font-medium"
                        : "text-ui-fg-subtle hover:bg-ui-bg-base-hover hover:text-ui-fg-base"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRightMini />}
                </LocalizedClientLink>
              )
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-ui-border-base">
            <button
              onClick={() => console.log("Logout")}
              className="w-full text-left px-3 py-2 text-ui-fg-subtle hover:text-ui-fg-base hover:bg-ui-bg-base-hover rounded-md transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="bg-white rounded-lg border border-ui-border-base p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default AccountLayout