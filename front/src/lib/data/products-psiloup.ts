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
  const fallback: PsiloUpProduct[] = [
    {
      id: 1,
      sku: 'UP-MIND',
      name: 'UP MIND - Neuro Performance',
      description: 'Suplemento para foco e performance cognitiva.',
      priceCents: 19990,
      weightGrams: 150,
      lengthCm: 8,
      widthCm: 8,
      heightCm: 12,
      imageUrl: '/images/MIND.png',
      active: true,
      stockQuantity: 100,
      stockManaged: false,
    },
    {
      id: 2,
      sku: 'UP-BURN',
      name: 'UP BURN - Energia & Metabolismo',
      description: 'Suplemento para energia e metabolismo acelerado.',
      priceCents: 17990,
      weightGrams: 150,
      lengthCm: 8,
      widthCm: 8,
      heightCm: 12,
      imageUrl: '/images/BURN.png',
      active: true,
      stockQuantity: 100,
      stockManaged: false,
    },
    {
      id: 3,
      sku: 'STACK-DUPLO',
      name: 'Stack Duplo - UP MIND + UP BURN',
      description: 'Combo completo com UP Mind e UP Burn.',
      priceCents: 34990,
      weightGrams: 300,
      lengthCm: 10,
      widthCm: 16,
      heightCm: 14,
      imageUrl: '/images/Stack_Duplo.png',
      active: true,
      stockQuantity: 50,
      stockManaged: false,
    },
  ]
  try {
    const products = await apiClient.get<PsiloUpProduct[]>('/catalog/products')
    return Array.isArray(products) ? products : fallback
  } catch {
    return fallback
  }
}

/**
 * Busca um produto por SKU
 */
export async function getProductBySku(sku: string): Promise<PsiloUpProduct | null> {
  try {
    const product = await apiClient.get<PsiloUpProduct>(`/catalog/products/${sku}`)
    return product || null
  } catch {
    const all = await listProductsPsiloUp()
    return all.find((p) => p.sku === sku) || null
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

