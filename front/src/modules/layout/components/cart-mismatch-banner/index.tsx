"use client"

import React from "react"
import { Button } from "@medusajs/ui"
import { XMark } from "@medusajs/icons"

type CartMismatchBannerProps = {
  mismatch?: boolean
}

const CartMismatchBanner: React.FC<CartMismatchBannerProps> = ({ mismatch }) => {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!mismatch || !isVisible) {
    return null
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-yellow-800">
            Detectamos itens no seu carrinho de uma sessão anterior. 
            Deseja mantê-los ou começar uma nova compra?
          </p>
          <div className="flex items-center gap-2 ml-4">
            <Button size="small" variant="secondary">
              Limpar carrinho
            </Button>
            <Button size="small">
              Manter itens
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-yellow-800 hover:text-yellow-900 ml-2"
            >
              <XMark />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartMismatchBanner