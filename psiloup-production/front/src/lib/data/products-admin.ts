"use client"

import { apiClient } from "@lib/api-client"

export interface AdminProduct {
  id: number
  sku: string
  name: string
  description?: string | null
  priceCents: number
  weightGrams: number
  lengthCm: number
  widthCm: number
  heightCm: number
  imageUrl?: string | null
  active: boolean
  stockQuantity: number
  stockManaged: boolean
}

export async function listAdminProducts(): Promise<AdminProduct[]> {
  return apiClient.get<AdminProduct[]>("/admin/products")
}

export async function createAdminProduct(data: Partial<AdminProduct> & { price_cents?: number }): Promise<AdminProduct> {
  const payload: any = {
    sku: data.sku,
    name: data.name,
    description: data.description,
    price_cents: data.price_cents ?? data.priceCents,
    weight_grams: data.weightGrams,
    length_cm: data.lengthCm,
    width_cm: data.widthCm,
    height_cm: data.heightCm,
    image_url: data.imageUrl,
    active: data.active,
    stock_quantity: data.stockQuantity,
    stock_managed: data.stockManaged,
  }
  return apiClient.post<AdminProduct>("/admin/products", payload)
}

export async function updateAdminProduct(id: number, data: Partial<AdminProduct> & { price_cents?: number }): Promise<AdminProduct> {
  const payload: any = {
    ...(data.sku ? { sku: data.sku } : {}),
    ...(data.name ? { name: data.name } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.price_cents !== undefined ? { price_cents: data.price_cents } : {}),
    ...(data.weightGrams !== undefined ? { weight_grams: data.weightGrams } : {}),
    ...(data.lengthCm !== undefined ? { length_cm: data.lengthCm } : {}),
    ...(data.widthCm !== undefined ? { width_cm: data.widthCm } : {}),
    ...(data.heightCm !== undefined ? { height_cm: data.heightCm } : {}),
    ...(data.imageUrl !== undefined ? { image_url: data.imageUrl } : {}),
    ...(data.active !== undefined ? { active: data.active } : {}),
    ...(data.stockQuantity !== undefined ? { stock_quantity: data.stockQuantity } : {}),
    ...(data.stockManaged !== undefined ? { stock_managed: data.stockManaged } : {}),
  }
  return apiClient.put<AdminProduct>(`/admin/products/${id}`, payload)
}

export async function deleteAdminProduct(id: number): Promise<{ ok: true } | any> {
  return apiClient.delete<{ ok: true }>(`/admin/products/${id}`)
}