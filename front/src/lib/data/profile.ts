"use client"

import { apiClient } from "@lib/api-client"

export interface Profile {
  id: number
  name: string
  email: string
  phone?: string | null
  cpf?: string | null
  created_at?: string
  last_login_at?: string | null
}

export async function getProfile(): Promise<Profile> {
  return apiClient.get<Profile>("/account/profile")
}

