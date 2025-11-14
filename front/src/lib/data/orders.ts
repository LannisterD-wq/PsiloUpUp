"use client"

import { apiClient } from "@lib/api-client"

export interface OrderItem {
  id: number
  product_name: string
  product_sku: string
  quantity: number
  unit_price_cents: number
  subtotal_cents: number
}

export interface Order {
  id: number
  order_number: string
  status: string
  total_cents: number
  subtotal_cents: number
  discount_cents: number
  shipping_cents: number
  created_at: string
  items: OrderItem[]
  shipping_address?: {
    street: string
    number?: string
    complement?: string
    neighborhood?: string
    city: string
    state: string
    cep: string
  }
}

export async function getOrders(): Promise<Order[]> {
  return apiClient.get<Order[]>("/account/orders")
}

export async function getOrder(id: number): Promise<Order> {
  return apiClient.get<Order>(`/account/orders/${id}`)
}
