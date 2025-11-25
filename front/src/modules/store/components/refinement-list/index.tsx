"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDownMini } from "@medusajs/icons"

type RefinementListProps = {
  sortBy?: string
}

const RefinementList: React.FC<RefinementListProps> = ({ sortBy }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [openSections, setOpenSections] = useState<string[]>(["sort", "price"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sortBy", value)
    router.push(`?${params.toString()}`)
  }

  const sortOptions = [
    { value: "created_at", label: "Mais recentes" },
    { value: "price_asc", label: "Menor preço" },
    { value: "price_desc", label: "Maior preço" },
    { value: "name", label: "Nome (A-Z)" },
  ]

  const priceRanges = [
    { value: "0-50", label: "Até R$ 50" },
    { value: "50-100", label: "R$ 50 - R$ 100" },
    { value: "100-200", label: "R$ 100 - R$ 200" },
    { value: "200+", label: "Acima de R$ 200" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
      </div>

      <div className="border-b border-ui-border-base pb-4">
        <button
          onClick={() => toggleSection("sort")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium">Ordenar por</span>
          <ChevronDownMini
            className={`transition-transform ${
              openSections.includes("sort") ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.includes("sort") && (
          <div className="mt-4 space-y-2">
            {sortOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="text-ui-fg-base"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-b border-ui-border-base pb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium">Faixa de preço</span>
          <ChevronDownMini
            className={`transition-transform ${
              openSections.includes("price") ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.includes("price") && (
          <div className="mt-4 space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={range.value}
                  className="text-ui-fg-base"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border-b border-ui-border-base pb-4">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium">Categorias</span>
          <ChevronDownMini
            className={`transition-transform ${
              openSections.includes("category") ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.includes("category") && (
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="text-ui-fg-base" />
              <span className="text-sm">Suplementos</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="text-ui-fg-base" />
              <span className="text-sm">Chás</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="text-ui-fg-base" />
              <span className="text-sm">Óleos</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="text-ui-fg-base" />
              <span className="text-sm">Cápsulas</span>
            </label>
          </div>
        )}
      </div>

      <button className="text-sm text-ui-fg-interactive hover:text-ui-fg-interactive-hover">
        Limpar filtros
      </button>
    </div>
  )
}

export default RefinementList