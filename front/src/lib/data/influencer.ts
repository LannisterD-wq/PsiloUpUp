"use client"

import { apiClient } from "@lib/api-client"

export interface InfluencerPayload {
  name: string
  whatsapp: string
  email: string
  instagram: string
  followers: number
  story: string
}

export async function submitInfluencer(data: InfluencerPayload): Promise<{ id: number }> {
  return apiClient.post<{ id: number }>("/influencers/apply", data)
}

