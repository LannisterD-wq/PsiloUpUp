"use client"

import React, { useState } from "react"
import { Button, Input, Label } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const LoginTemplate: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      console.log("Login:", { email, password })
    } else {
      console.log("Register:", { email, password, firstName, lastName, phone })
    }
  }

  return (
    <div className="w-full flex justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">
            {isLogin ? "Entrar na sua conta" : "Criar nova conta"}
          </h1>
          <p className="text-ui-fg-subtle">
            {isLogin
              ? "Entre para acompanhar seus pedidos e gerenciar sua conta"
              : "Crie uma conta para aproveitar todos os benefícios"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isLogin && (
            <LocalizedClientLink
              href="/account/forgot-password"
              className="text-sm text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
            >
              Esqueceu sua senha?
            </LocalizedClientLink>
          )}

          <Button type="submit" className="w-full">
            {isLogin ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-ui-fg-subtle">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium"
            >
              {isLogin ? "Criar conta" : "Entrar"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate