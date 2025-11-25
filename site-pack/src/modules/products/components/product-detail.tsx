"use client"

import { PsiloUpProduct } from "@lib/data/products-psiloup-server"
import { addToCart } from "@lib/data/cart"
import { formatCurrency } from "@lib/util/format-currency"
import Link from "next/link"
import { useState } from "react"

interface ProductDetailProps {
  product: PsiloUpProduct
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const handleAddToCart = () => {
    addToCart(product.sku, 1)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("psiloup-toast", {
        detail: { message: `${product.name} adicionado ao carrinho!`, type: "success" }
      }))
    }
  }

  const preferNew = product.sku === "UP-MIND" ? "/images/sem-fundo-mind.png"
    : product.sku === "UP-BURN" ? "/images/sem-fundo-burn.png"
    : "/images/burn-mind-sem-fundo.png"
  const fallback = `/images/${product.sku === "UP-MIND" ? "MIND" : product.sku === "UP-BURN" ? "BURN" : "Stack_Duplo"}-removebg-preview.png`
  const [imageUrl, setImageUrl] = useState<string>(preferNew)

  const isMind = product.sku === "UP-MIND"
  const isBurn = product.sku === "UP-BURN"
  const isStack = product.sku === "STACK-DUPLO"
  const timeBullets = isBurn
    ? [
        "Dia 1-3: energia estável e menos fadiga",
        "Dia 4-7: metabolismo mais ativo e menor apetite por picos",
        "Após 2 semanas: apoio ao emagrecimento com rotina e alimentação",
      ]
    : isMind
    ? [
        "Dia 1-3: clareza mental e humor mais equilibrado",
        "Dia 4-7: foco contínuo e menos procrastinação",
        "Após 2 semanas: memória e foco sustentados",
      ]
    : [
        "Dia 1-3: energia e foco mais estáveis",
        "Dia 4-7: rotina mais produtiva com menos quedas",
        "Após 2 semanas: desempenho mental e físico combinados",
      ]
  const whoBullets = isBurn
    ? [
        "Quem busca emagrecimento equilibrado",
        "Rotinas com treinos leves a moderados",
        "Pessoas com fadiga diária e picos de energia",
      ]
    : isMind
    ? [
        "Estudantes e profissionais em rotina intensa",
        "Apresentações, reuniões e tarefas que exigem foco",
        "Gamers e quem precisa performance cognitiva",
      ]
    : [
        "Jovens e adultos que querem foco + energia",
        "Rotinas com estudo, trabalho e atividade física",
        "Quem quer produtividade sem ansiedade",
      ]

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="hero__eyebrow">{isBurn ? "Energy Flow System™" : isMind ? "Focus Core Blend™" : "Stack Duplo"}</span>
            <h1 className="hero__title">{product.name}</h1>
            <p className="hero__subtitle">
              {isBurn
                ? "Energia constante, metabolismo equilibrado e apoio ao emagrecimento para o dia a dia."
                : isMind
                  ? "Foco limpo, memória e estabilidade emocional para rotinas intensas."
                  : "Combo completo para desempenho mental e físico no cotidiano."}
            </p>
            <div className="hero__actions">
              <div className="bundle-card__price">
                <strong>{formatCurrency(product.priceCents)}</strong>
                <span>Ex.: 3x de {formatCurrency(Math.ceil(product.priceCents / 3))}</span>
              </div>
              <div className="bundle-card__cta">
                <button
                  className="button button--primary"
                  onClick={handleAddToCart}
                >
                  Adicionar ao carrinho
                </button>
                <Link className="button button--ghost" href="/formulacao">
                  Ver formulação
                </Link>
              </div>
            </div>
            <div className="hero__badges">
              {isMind && (
                <>
                  <div className="hero__badge">30 comprimidos para uso diário</div>
                  <div className="hero__badge">Foco, memória e estabilidade emocional</div>
                  <div className="hero__badge">Laudos por lote e rastreio de envio</div>
                </>
              )}
              {isBurn && (
                <>
                  <div className="hero__badge">Metabolismo e energia balanceados</div>
                  <div className="hero__badge">Apoio ao emagrecimento equilibrado</div>
                  <div className="hero__badge">Laudos por lote e rastreio de envio</div>
                </>
              )}
              {isStack && (
                <>
                  <div className="hero__badge">Dois potes: Mind + Burn</div>
                  <div className="hero__badge">Desempenho mental e físico</div>
                  <div className="hero__badge">Laudos por lote e rastreio de envio</div>
                </>
              )}
            </div>
          </div>
          <div className="hero__media">
            <img src={imageUrl} alt={product.name} onError={() => setImageUrl(fallback)} />
          </div>
        </div>
      </section>
    </>
  )
}
