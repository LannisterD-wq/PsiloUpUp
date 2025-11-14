"use client"

import { apiClient } from "@lib/api-client"

const TOKEN_KEY = "psiloup_token"
const USER_KEY = "psiloup_user"

export interface User {
  id: number
  email: string
  name?: string
  phone?: string
  cpf?: string
}

export interface LoginResponse {
  token: string
  user: User
}

// LocalStorage helpers
function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token: string | null) {
  if (typeof window === "undefined") return
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
    apiClient.setToken(token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
    apiClient.setToken(null)
  }
}

function getUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(USER_KEY)
  }
}

export function saveSession(token: string, user: User) {
  setToken(token)
  setUser(user)
}

export function clearSession() {
  setToken(null)
  setUser(null)
}

export function isAuthenticated(): boolean {
  const token = getToken()
  if (!token) return false
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    if (!payload.exp) return true
    return payload.exp * 1000 > Date.now()
  } catch {
    return false
  }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/login", { email, password })
  saveSession(response.token, response.user)
  return response
}

export async function register(data: {
  name: string
  email: string
  password: string
  phone?: string
  cpf?: string
}): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/register", data)
  saveSession(response.token, response.user)
  return response
}

export function getCurrentUser(): User | null {
  return getUser()
}

// Initialize token on load
if (typeof window !== "undefined") {
  const token = getToken()
  if (token) {
    apiClient.setToken(token)
  }
}

