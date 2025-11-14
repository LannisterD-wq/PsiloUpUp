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
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
    const response = await fetch(`${apiUrl}/catalog/products`, {
      cache: 'no-store', // Sempre buscar dados frescos
    })
    
    if (!response.ok) {
      console.error('Erro ao buscar produtos:', response.statusText)
      return []
    }
    
    const products = await response.json()
    return products || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

/**
 * Busca um produto por SKU (Server Component)
 */
export async function getProductBySku(sku: string): Promise<PsiloUpProduct | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
    const response = await fetch(`${apiUrl}/catalog/products/${sku}`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      return null
    }
    
    const product = await response.json()
    return product || null
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return null
  }
}

