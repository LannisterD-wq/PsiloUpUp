"use client"

import { apiClient } from "@lib/api-client"

export interface CheckoutItem {
  sku: string
  price_cents: number
  qty: number
}

export interface ShippingOption {
  carrier: string
  name: string
  price_cents: number
  delivery_time_days?: number
}

export interface CreateOrderPayload {
  items: CheckoutItem[]
  address_id: number
  shipping: ShippingOption
  coupon_code?: string | null
}

export interface CreateOrderResponse {
  order_id: number
  init_point: string // URL do Mercado Pago
}

export async function createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
  return apiClient.post<CreateOrderResponse>("/checkout/create", payload)
}

