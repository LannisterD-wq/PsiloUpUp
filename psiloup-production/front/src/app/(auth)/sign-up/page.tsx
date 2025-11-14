"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "@modules/layout/components/header"
import { register, isAuthenticated } from "@lib/data/auth"

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirect)
    }
  }, [redirect, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== password2) {
      setMessage("As senhas não coincidem")
      return
    }

    setLoading(true)
    setMessage("")
    try {
      await register({
        name,
        email,
        password,
        phone: phone || undefined,
        cpf: cpf || undefined,
      })
      router.push(redirect)
    } catch (error: any) {
      setMessage(error.message || "Erro ao cadastrar")
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
            <h2>Cadastrar</h2>
            <p>Crie sua conta para acompanhar seus pedidos, endereços e checkout.</p>
          </header>

          <div className="row gtr-50 gtr-uniform">
            <div className="col-12">
              <article className="bundle-card">
                <form id="register-form" onSubmit={handleSubmit}>
                  {message && (
                    <div className="alert alert-error" style={{ marginBottom: "1rem", padding: "0.75rem", background: "rgba(255, 47, 146, 0.1)", border: "1px solid rgba(255, 47, 146, 0.3)", borderRadius: "4px", color: "#FF2F92" }}>
                      {message}
                    </div>
                  )}
                  <label htmlFor="reg-name">Nome completo</label>
                  <input
                    type="text"
                    id="reg-name"
                    required
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="reg-email">E-mail</label>
                  <input
                    type="email"
                    id="reg-email"
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="reg-phone">Celular</label>
                  <input
                    type="tel"
                    id="reg-phone"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label htmlFor="reg-cpf">CPF</label>
                  <input
                    type="text"
                    id="reg-cpf"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                  <label htmlFor="reg-password">Senha</label>
                  <input
                    type="password"
                    id="reg-password"
                    required
                    placeholder="Crie uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="reg-password2">Confirmar senha</label>
                  <input
                    type="password"
                    id="reg-password2"
                    required
                    placeholder="Repita sua senha"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                  <button type="submit" className="button" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </button>
                  <p style={{ marginTop: "1rem", textAlign: "center" }}>
                    Já tem conta? <Link href={`/sign-in?redirect=${encodeURIComponent(redirect)}`}>Entrar</Link>
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

