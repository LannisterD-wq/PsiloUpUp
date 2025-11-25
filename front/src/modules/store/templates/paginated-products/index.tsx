"use client"

import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"
import { ChevronLeftMini, ChevronRightMini } from "@medusajs/icons"

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

type PaginatedProductsProps = {
  sortBy?: string
  page?: number
  countryCode: string
  products?: Product[]
  totalPages?: number
}

const PaginatedProducts: React.FC<PaginatedProductsProps> = ({
  sortBy,
  page = 1,
  countryCode,
  products = [],
  totalPages = 1,
}) => {
  const formatPrice = (price: string) => {
    const amount = parseFloat(price)
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount / 100)
  }

  const mockProducts: Product[] = products.length > 0 ? products : [
    {
      id: "1",
      title: "Produto Exemplo 1",
      handle: "produto-exemplo-1",
      thumbnail: undefined,
      price: {
        calculated_price: "5000",
        original_price: "5000",
      },
    },
    {
      id: "2",
      title: "Produto Exemplo 2",
      handle: "produto-exemplo-2",
      thumbnail: undefined,
      price: {
        calculated_price: "7500",
        original_price: "10000",
      },
    },
    {
      id: "3",
      title: "Produto Exemplo 3",
      handle: "produto-exemplo-3",
      thumbnail: undefined,
      price: {
        calculated_price: "12000",
        original_price: "12000",
      },
    },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {mockProducts.map((product) => (
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
                
                <Button 
                  variant="secondary" 
                  size="small" 
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.preventDefault()
                    console.log("Add to cart:", product.id)
                  }}
                >
                  Adicionar ao carrinho
                </Button>
              </div>
            </div>
          </LocalizedClientLink>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="small"
            disabled={page === 1}
            className="p-2"
          >
            <ChevronLeftMini />
          </Button>
          
          <div className="flex gap-1">
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              const pageNum = index + 1
              return (
                <LocalizedClientLink
                  key={pageNum}
                  href={`/store?page=${pageNum}${sortBy ? `&sortBy=${sortBy}` : ""}`}
                >
                  <Button
                    variant={page === pageNum ? "primary" : "secondary"}
                    size="small"
                    className="min-w-[40px]"
                  >
                    {pageNum}
                  </Button>
                </LocalizedClientLink>
              )
            })}
          </div>
          
          <Button
            variant="secondary"
            size="small"
            disabled={page === totalPages}
            className="p-2"
          >
            <ChevronRightMini />
          </Button>
        </div>
      )}
    </div>
  )
}

export default PaginatedProducts