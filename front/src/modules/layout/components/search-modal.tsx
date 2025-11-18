"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

interface PsiloUpProduct {
  id: number
  sku: string
  name: string
  description: string | null
  priceCents: number
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<PsiloUpProduct[]>([])

  useEffect(() => {
    if (!isOpen) return
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
    fetch(`${apiUrl}/catalog/products`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
  }, [isOpen])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products.slice(0, 8)
    return products
      .filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
      )
      .slice(0, 20)
  }, [products, query])

  if (!isOpen) return null

  return (
    <div className="search-modal" role="dialog" aria-modal="true">
      <div className="search-modal__backdrop" onClick={onClose} />
      <div className="search-modal__panel">
        <div className="search-modal__header">
          <div className="search-input">
            <i className="fas fa-search" />
            <input
              autoFocus
              type="text"
              placeholder="Buscar por nome ou SKU"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="search-close" onClick={onClose} aria-label="Fechar">
            <i className="fas fa-times" />
          </button>
        </div>
        <ul className="search-results">
          {results.map((p) => (
            <li key={p.id} className="search-result">
              <Link href={`/produtos/${p.sku}`} onClick={onClose}>
                <span className="search-title">{p.name}</span>
                <span className="search-sku">{p.sku}</span>
              </Link>
              <span className="search-price">R$ {(p.priceCents / 100).toFixed(2)}</span>
            </li>
          ))}
          {results.length === 0 && (
            <li className="search-empty">Nenhum resultado para "{query}"</li>
          )}
        </ul>
      </div>
    </div>
  )
}

