"use server"

import { apiClient } from "@lib/api-client"

// Tipos do nosso backend
export interface PsiloUpProduct {
  id: number
  sku: string
  name: string
  description: string | null
  priceCents: number
  weightGrams: number
  lengthCm: number
  widthCm: number
  heightCm: number
  imageUrl: string | null
  active: boolean
  stockQuantity: number
  stockManaged: boolean
}

/**
 * Lista produtos do nosso backend (Server Component)
 */
export async function listProductsPsiloUp(): Promise<PsiloUpProduct[]> {
  const fallback: PsiloUpProduct[] = [
    { id: 1, sku: 'UP-MIND', name: 'UP MIND - Neuro Performance', description: 'Suplemento para foco e performance cognitiva.', priceCents: 19990, weightGrams: 150, lengthCm: 8, widthCm: 8, heightCm: 12, imageUrl: '/images/sem fundo mind.png', active: true, stockQuantity: 100, stockManaged: false },
    { id: 2, sku: 'UP-BURN', name: 'UP BURN - Energia & Metabolismo', description: 'Suplemento para energia e metabolismo acelerado.', priceCents: 17990, weightGrams: 150, lengthCm: 8, widthCm: 8, heightCm: 12, imageUrl: '/images/sem fundo burn.png', active: true, stockQuantity: 100, stockManaged: false },
    { id: 3, sku: 'STACK-DUPLO', name: 'Stack Duplo - UP MIND + UP BURN', description: 'Combo completo com UP Mind e UP Burn.', priceCents: 34990, weightGrams: 300, lengthCm: 10, widthCm: 16, heightCm: 14, imageUrl: '/images/burn.mind sem fundo.png', active: true, stockQuantity: 50, stockManaged: false },
  ]
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000/api'
    const response = await fetch(`${apiUrl}/catalog/products`, { cache: 'no-store' })
    if (!response.ok) return fallback
    const products = await response.json()
    return Array.isArray(products) ? products : fallback
  } catch {
    return fallback
  }
}

/**
 * Busca um produto por SKU (Server Component)
 */
export async function getProductBySku(sku: string): Promise<PsiloUpProduct | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000/api'
    const response = await fetch(`${apiUrl}/catalog/products/${sku}`, { cache: 'no-store' })
    if (!response.ok) return null
    const product = await response.json()
    return product || null
  } catch {
    const all = await listProductsPsiloUp()
    return all.find((p) => p.sku === sku) || null
  }
}

