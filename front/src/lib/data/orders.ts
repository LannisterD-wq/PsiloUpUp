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

// Add aliases for expected imports
export async function retrieveOrder(id: string) {
  try {
    const order = await getOrder(parseInt(id))
    
    // Transform to match expected order structure
    return {
      id: order.id.toString(),
      display_id: order.order_number,
      created_at: order.created_at,
      email: "customer@example.com",
      fulfillment_status: order.status,
      payment_status: "paid",
      total: order.total_cents,
      subtotal: order.subtotal_cents,
      discount_total: order.discount_cents,
      shipping_total: order.shipping_cents,
      tax_total: 0,
      items: order.items.map(item => ({
        id: item.id.toString(),
        title: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price_cents,
        thumbnail: null,
        variant: {
          title: item.product_sku
        }
      })),
      shipping_address: order.shipping_address ? {
        first_name: "Cliente",
        last_name: "",
        address_1: order.shipping_address.street,
        address_2: order.shipping_address.complement,
        city: order.shipping_address.city,
        province: order.shipping_address.state,
        postal_code: order.shipping_address.cep,
        country_code: "BR",
        phone: ""
      } : null
    }
  } catch (error) {
    console.error("Error retrieving order:", error)
    return null
  }
}

export async function listOrders() {
  try {
    const orders = await getOrders()
    
    // Transform to match expected structure
    return orders.map(order => ({
      id: order.id.toString(),
      display_id: order.order_number,
      created_at: order.created_at,
      total: order.total_cents,
      fulfillment_status: order.status,
      payment_status: "paid",
      items: order.items
    }))
  } catch (error) {
    console.error("Error listing orders:", error)
    return []
  }
}

export async function acceptTransferRequest(orderId: string, token: string) {
  try {
    await apiClient.post(`/orders/${orderId}/transfer/${token}/accept`)
    return { success: true }
  } catch (error) {
    console.error("Error accepting transfer:", error)
    return { success: false, error: "Failed to accept transfer" }
  }
}

export async function declineTransferRequest(orderId: string, token: string) {
  try {
    await apiClient.post(`/orders/${orderId}/transfer/${token}/decline`)
    return { success: true }
  } catch (error) {
    console.error("Error declining transfer:", error)
    return { success: false, error: "Failed to decline transfer" }
  }
}
