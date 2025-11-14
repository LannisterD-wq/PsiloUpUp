"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@modules/layout/components/header"
import { login, register, isAuthenticated } from "@lib/data/auth"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Login form
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register form
  const [regName, setRegName] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regPhone, setRegPhone] = useState("")
  const [regCpf, setRegCpf] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regPassword2, setRegPassword2] = useState("")

  useEffect(() => {
    if (isAuthenticated()) {
      router.push(redirect)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      await login(loginEmail, loginPassword)
      router.push(redirect)
    } catch (error: any) {
      setMessage(error.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (regPassword !== regPassword2) {
      setMessage("As senhas não coincidem")
      return
    }
    setLoading(true)
    setMessage("")
    try {
      await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone || undefined,
        cpf: regCpf || undefined,
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
            <h2>Minha conta</h2>
            <p>Entre com sua conta ou cadastre-se para acompanhar seus pedidos, endereços e checkout.</p>
          </header>

          <div className="row gtr-50 gtr-uniform">
            <div className="col-6 col-12-small">
              <article className="bundle-card">
                <h3>Entrar</h3>
                <form id="login-form" onSubmit={handleLogin}>
                  <label htmlFor="login-email">E-mail</label>
                  <input
                    type="email"
                    id="login-email"
                    required
                    placeholder="seu@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <label htmlFor="login-password">Senha</label>
                  <input
                    type="password"
                    id="login-password"
                    required
                    placeholder="Sua senha"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button type="submit" className="button primary" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                  </button>
                  {message && <p>{message}</p>}
                </form>
              </article>
            </div>
            <div className="col-6 col-12-small">
              <article className="bundle-card">
                <h3>Cadastrar</h3>
                <form id="register-form" onSubmit={handleRegister}>
                  <label htmlFor="reg-name">Nome completo</label>
                  <input
                    type="text"
                    id="reg-name"
                    required
                    placeholder="Seu nome completo"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                  <label htmlFor="reg-email">E-mail</label>
                  <input
                    type="email"
                    id="reg-email"
                    required
                    placeholder="seu@email.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                  <label htmlFor="reg-phone">Celular</label>
                  <input
                    type="tel"
                    id="reg-phone"
                    placeholder="(11) 99999-9999"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                  <label htmlFor="reg-cpf">CPF</label>
                  <input
                    type="text"
                    id="reg-cpf"
                    placeholder="000.000.000-00"
                    value={regCpf}
                    onChange={(e) => setRegCpf(e.target.value)}
                  />
                  <label htmlFor="reg-password">Senha</label>
                  <input
                    type="password"
                    id="reg-password"
                    required
                    placeholder="Crie uma senha"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                  <label htmlFor="reg-password2">Confirmar senha</label>
                  <input
                    type="password"
                    id="reg-password2"
                    required
                    placeholder="Repita sua senha"
                    value={regPassword2}
                    onChange={(e) => setRegPassword2(e.target.value)}
                  />
                  <button type="submit" className="button" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </button>
                  {message && <p>{message}</p>}
                </form>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

