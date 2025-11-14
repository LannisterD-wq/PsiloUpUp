"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@modules/layout/components/header"
import { login, isAuthenticated } from "@lib/data/auth"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirect)
    }
  }, [redirect, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      await login(email, password)
      router.push(redirect)
    } catch (error: any) {
      setMessage(error.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        <section id="main" className="container">
          <header className="major">
            <h2>Entrar</h2>
            <p>Entre com sua conta para acompanhar seus pedidos e endereços.</p>
          </header>

          <div className="row gtr-50 gtr-uniform">
            <div className="col-12">
              <article className="bundle-card">
                <form id="login-form" onSubmit={handleSubmit}>
                  {message && (
                    <div className="alert alert-error" style={{ marginBottom: "1rem", padding: "0.75rem", background: "rgba(255, 47, 146, 0.1)", border: "1px solid rgba(255, 47, 146, 0.3)", borderRadius: "4px", color: "#FF2F92" }}>
                      {message}
                    </div>
                  )}
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    type="email"
                    id="login-email"
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="login-password">Senha</label>
                  <input
                    type="password"
                    id="login-password"
                    required
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="submit" className="button primary" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                  </button>
                  <p style={{ marginTop: "1rem", textAlign: "center" }}>
                    Não tem conta? <Link href={`/sign-up?redirect=${encodeURIComponent(redirect)}`}>Cadastre-se</Link>
                  </p>
                </form>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

