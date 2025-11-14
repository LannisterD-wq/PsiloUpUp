"use client"

import { apiClient } from "../api-client"

export interface Product {
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

export async function listProducts(): Promise<Product[]> {
  try {
    const products = await apiClient.get<Product[]>('/catalog/products')
    return products || []
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
}

export async function getProductBySku(sku: string): Promise<Product | null> {
  try {
    const product = await apiClient.get<Product>(`/catalog/products/${sku}`)
    return product || null
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return null
  }
}

export function formatProductForUI(product: Product) {
  return {
    id: product.id.toString(),
    title: product.name,
    description: product.description || '',
    price: product.priceCents / 100,
    thumbnail: product.imageUrl || '/images/placeholder.png',
    availableQuantity: product.stockQuantity,
  }
}

