"use client"

import { apiClient } from "../api-client"

export interface User {
  id: number
  name: string
  email: string
  phone?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', { email, password })
  apiClient.setToken(response.token)
  return response
}

export async function register(data: {
  name: string
  email: string
  password: string
  phone?: string
  cpf?: string
}): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/register', data)
  apiClient.setToken(response.token)
  return response
}

export function logout() {
  apiClient.setToken(null)
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('psiloup_token')
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('psiloup_user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function setCurrentUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('psiloup_user', JSON.stringify(user))
  }
}

