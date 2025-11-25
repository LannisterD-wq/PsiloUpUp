"use client"

import React from "react"
import RefinementList from "@modules/store/components/refinement-list"
import PaginatedProducts from "@modules/store/templates/paginated-products"

type StoreTemplateProps = {
  sortBy?: string
  page?: number
  countryCode: string
}

const StoreTemplate: React.FC<StoreTemplateProps> = ({
  sortBy,
  page = 1,
  countryCode,
}) => {
  return (
    <div className="flex flex-col py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <RefinementList sortBy={sortBy} />
          </div>
          
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-2">Todos os Produtos</h1>
              <p className="text-ui-fg-subtle">
                Explore nossa seleção completa de produtos
              </p>
            </div>
            
            <PaginatedProducts
              sortBy={sortBy}
              page={page}
              countryCode={countryCode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate