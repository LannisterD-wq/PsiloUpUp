"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { XMark } from "@medusajs/icons"

type SideMenuProps = {
  open: boolean
  onClose: () => void
}

const SideMenu: React.FC<SideMenuProps> = ({ open, onClose }) => {
  if (!open) return null

  const menuItems = [
    { href: "/store", label: "Loja" },
    { href: "/collections", label: "Coleções" },
    { href: "/search", label: "Buscar" },
    { href: "/account", label: "Minha Conta" },
    { href: "/cart", label: "Carrinho" },
  ]

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      <div className="fixed left-0 top-0 h-full w-full max-w-xs bg-white shadow-xl z-50 lg:hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-ui-border-base">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={onClose}
              className="text-ui-fg-subtle hover:text-ui-fg-base"
            >
              <XMark />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <LocalizedClientLink
                    href={item.href}
                    onClick={onClose}
                    className="block px-4 py-2 text-ui-fg-base hover:bg-ui-bg-base-hover rounded-md transition-colors"
                  >
                    {item.label}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-ui-border-base p-4">
            <p className="text-sm text-ui-fg-subtle text-center">
              © 2024 PsiloUp
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideMenu