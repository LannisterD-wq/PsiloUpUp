"use client"

import { apiClient } from "@lib/api-client"

export interface Address {
  id: number
  label?: string
  recipient: string
  street: string
  number?: string
  complement?: string
  neighborhood?: string
  city: string
  state: string
  cep: string
  is_default?: boolean
}

export async function getAddresses(): Promise<Address[]> {
  return apiClient.get<Address[]>("/account/addresses")
}

export async function createAddress(data: Omit<Address, "id">): Promise<Address> {
  return apiClient.post<Address>("/account/addresses", data)
}

export async function updateAddress(id: number, data: Partial<Address>): Promise<Address> {
  return apiClient.put<Address>(`/account/addresses/${id}`, data)
}

export async function deleteAddress(id: number): Promise<void> {
  return apiClient.delete(`/account/addresses/${id}`)
}

