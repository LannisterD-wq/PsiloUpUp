"use client"

import { useState } from "react"
import Header from "@modules/layout/components/header"
import { submitInfluencer } from "@lib/data/influencer"

const steps = [
  "Nome completo",
  "WhatsApp",
  "E-mail",
  "Perfil do Instagram",
  "Número de seguidores",
  "O que te conecta com o propósito da PsiloUp? Conte sua história.",
  "Confirmação",
]

export default function InfluencerPage() {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [email, setEmail] = useState("")
  const [instagram, setInstagram] = useState("@")
  const [followers, setFollowers] = useState("")
  const [story, setStory] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const formatWhatsapp = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "")
    // Assume internacional com +55 País
    if (digits.length === 0) return "+"
    const cc = digits.slice(0, 2) // país
    const ddd = digits.slice(2, 4)
    const p1 = digits.slice(4, 9)
    const p2 = digits.slice(9, 13)
    let out = "+" + cc
    if (ddd) out += " " + ddd
    if (p1) out += " " + p1
    if (p2) out += "-" + p2
    return out
  }

  const sanitizeWhatsapp = (masked: string) => {
    const digits = masked.replace(/[^\d]/g, "")
    return "+" + digits
  }

  const formatInstagram = (raw: string) => {
    let v = raw.trim()
    if (!v.startsWith("@")) v = "@" + v.replace(/^@+/, "")
    return v.replace(/\s+/g, "")
  }

  const formatFollowers = (raw: string) => {
    return raw.replace(/\D/g, "")
  }

  const validate = () => {
    switch (step) {
      case 0:
        return name.trim().length > 5
      case 1:
        return /^\+\d{8,}$/.test(sanitizeWhatsapp(whatsapp))
      case 2:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      case 3:
        return formatInstagram(instagram).startsWith("@") && formatInstagram(instagram).length > 1
      case 4:
        return /^\d+$/.test(followers.trim())
      case 5:
        return story.trim().length >= 50
      default:
        return true
    }
  }

  const next = () => {
    if (!validate()) {
      setMsg("Preencha corretamente antes de avançar.")
      return
    }
    setMsg("")
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    if (!validate()) {
      setMsg("Verifique os campos antes de enviar.")
      return
    }
    setLoading(true)
    try {
      await submitInfluencer({
        name: name.trim(),
        whatsapp: sanitizeWhatsapp(whatsapp),
        email: email.trim(),
        instagram: formatInstagram(instagram),
        followers: parseInt(formatFollowers(followers).trim(), 10) || 0,
        story: story.trim(),
      })
      setStep(6)
    } catch (e: any) {
      setMsg(e.message || "Erro ao enviar.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="hero hero--catalog" style={{ position: "relative", overflow: "hidden", textAlign: "center", minHeight: "80vh" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/PsiloUp_logo_sem_fundo.png"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
          >
            <source src="/videos/fundo_area_influencer.mp4" type="video/mp4" />
            <source src="/videos/fundo_area_influencer.webm" type="video/webm" />
          </video>
          <div className="container" style={{ position: "relative", zIndex: 1, minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: 24 }}>
            <header className="hero__catalog-header">
              <h1>Seja um Influencer PsiloUp</h1>
              <p>Programa de creators e comunicadores com propósito — multi-step simples e direto.</p>
            </header>
            <img src="/images/burn.mind sem fundo.png" alt="PsiloUp Produtos" style={{ width: 90, height: "auto", margin: "12px auto 0" }} />
            <article className="bundle-card" style={{ maxWidth: 520, width: "100%", textAlign: "center", marginTop: 18 }}>
              <h3>{steps[step]}</h3>
              {step < 6 && (
                <p style={{ color: "rgba(247,251,255,0.7)", marginTop: 4 }}>Etapa {step + 1} de {steps.length}</p>
              )}

              {step === 0 && (
                <input className="msf-input" type="text" placeholder="Seu nome completo" value={name} onChange={(e) => setName(e.target.value)} />
              )}
              {step === 1 && (
                <input className="msf-input" type="tel" placeholder="WhatsApp (ex.: +55 11 99999-9999)" value={whatsapp} onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))} />
              )}
              {step === 2 && (
                <input className="msf-input" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              )}
              {step === 3 && (
                <input className="msf-input" type="text" placeholder="@seuinstagram" value={instagram} onChange={(e) => setInstagram(formatInstagram(e.target.value))} />
              )}
              {step === 4 && (
                <input className="msf-input" type="text" placeholder="Número de seguidores" value={followers} onChange={(e) => setFollowers(formatFollowers(e.target.value))} />
              )}
              {step === 5 && (
                <textarea className="msf-textarea" placeholder="Conte sua história (mínimo 50 caracteres)" value={story} onChange={(e) => setStory(e.target.value)} />
              )}
              {step === 6 && (
                <div style={{ padding: 12 }}>
                  <h4>Obrigado!</h4>
                  <p>Vamos analisar seu perfil e entraremos em contato.</p>
                </div>
              )}

              {msg && <small style={{ color: "#ff7878" }}>{msg}</small>}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <button className="button" onClick={back} disabled={step === 0 || step === 6}>Voltar</button>
                {step < 5 && (
                  <button className="button button--primary" onClick={next}>Próxima pergunta →</button>
                )}
                {step === 5 && (
                  <button className="button button--primary" onClick={submit} disabled={loading}>{loading ? "Enviando..." : "Enviar →"}</button>
                )}
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}
