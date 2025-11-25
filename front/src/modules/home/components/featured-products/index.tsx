"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

type Product = {
  id: string
  title: string
  handle: string
  thumbnail?: string
  price?: {
    calculated_price: string
    original_price: string
  }
}

type FeaturedProductsProps = {
  products?: Product[]
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products = [] }) => {
  const formatPrice = (price: string) => {
    const amount = parseFloat(price)
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100)
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Produtos em Destaque</h2>
          <LocalizedClientLink href="/store">
            <Button variant="secondary">Ver todos</Button>
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <LocalizedClientLink
              key={product.id}
              href={`/products/${product.handle}`}
              className="group"
            >
              <div className="border border-ui-border-base rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {product.thumbnail ? (
                  <div className="aspect-square overflow-hidden bg-ui-bg-subtle">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-ui-bg-subtle flex items-center justify-center">
                    <span className="text-ui-fg-subtle">Sem imagem</span>
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="font-medium text-ui-fg-base mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  {product.price && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ui-fg-base">
                        {formatPrice(product.price.calculated_price)}
                      </span>
                      {product.price.original_price !== product.price.calculated_price && (
                        <span className="text-sm text-ui-fg-muted line-through">
                          {formatPrice(product.price.original_price)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts