"use client"

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

export interface ProductListResponse {
  products: PsiloUpProduct[]
  count: number
}

/**
 * Lista produtos do nosso backend
 */
export async function listProductsPsiloUp(): Promise<PsiloUpProduct[]> {
  try {
    const products = await apiClient.get<PsiloUpProduct[]>('/catalog/products')
    return products || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

/**
 * Busca um produto por SKU
 */
export async function getProductBySku(sku: string): Promise<PsiloUpProduct | null> {
  try {
    const product = await apiClient.get<PsiloUpProduct>(`/catalog/products/${sku}`)
    return product || null
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return null
  }
}

/**
 * Converte produto do nosso backend para formato compatível com componentes
 */
export function formatProductForUI(product: PsiloUpProduct) {
  return {
    id: product.id.toString(),
    handle: product.sku,
    title: product.name,
    description: product.description || '',
    thumbnail: product.imageUrl || '/placeholder-product.jpg',
    images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    variants: [
      {
        id: `${product.id}-variant`,
        title: 'Padrão',
        prices: [
          {
            amount: product.priceCents,
            currency_code: 'brl',
          },
        ],
        inventory_quantity: product.stockQuantity,
        manage_inventory: product.stockManaged,
      },
    ],
    metadata: {
      weight_grams: product.weightGrams,
      dimensions: `${product.lengthCm}x${product.widthCm}x${product.heightCm}`,
    },
  }
}

