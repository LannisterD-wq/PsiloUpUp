"use client"

import { apiClient } from "@lib/api-client"

export interface ShippingItem {
  sku: string
  price_cents: number
  qty: number
}

export interface ShippingService {
  carrier: string
  name: string
  price_cents: number
  delivery_time_days?: number
}

export interface ShippingQuote {
  services?: ShippingService[]
  cost_cents?: number
  free?: boolean
  selectedIndex?: number
  source?: string
}

export async function calculateShipping(
  cep: string,
  items: ShippingItem[]
): Promise<ShippingQuote> {
  return apiClient.post<ShippingQuote>("/shipping/quote", {
    to_cep: cep.replace(/\D/g, ""),
    items,
  })
}

