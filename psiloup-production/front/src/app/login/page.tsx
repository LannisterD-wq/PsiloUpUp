"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@modules/layout/components/header"
import { isAuthenticated } from "@lib/data/auth"

// Redireciona para as novas páginas separadas
export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirect)
    } else {
      // Redireciona para sign-in mantendo o redirect
      router.push(`/sign-in?redirect=${encodeURIComponent(redirect)}`)
    }
  }, [redirect, router])

  return (
    <>
      <Header />
      <main>
        <section id="main" className="container">
          <header className="major">
            <h2>Redirecionando...</h2>
          </header>
        </section>
      </main>
    </>
  )
}
