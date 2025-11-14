"use client"

import Link from "next/link"
import { PsiloUpProduct } from "@lib/data/products-psiloup-server"
import { addToCart } from "@lib/data/cart"
import { formatCurrency } from "@lib/util/format-currency"

interface ProductGridProps {
  products: PsiloUpProduct[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const handleAddToCart = (product: PsiloUpProduct) => {
    addToCart(product.sku, 1)
    // Show toast notification
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("psiloup-toast", {
        detail: { message: `${product.name} adicionado ao carrinho!`, type: "success" }
      }))
    }
  }

  // Map products to display format - usar imagens sem fundo
  const displayProducts = products.map((product) => ({
    ...product,
    highlight: product.sku === "UP-MIND",
    badge: product.sku === "UP-MIND" ? "Mais pedido" : product.sku === "STACK-DUPLO" ? "10% de desconto" : null,
    image: `/images/${product.sku === "UP-MIND" ? "MIND" : product.sku === "UP-BURN" ? "BURN" : "Stack_Duplo"}-removebg-preview.png`,
  }))

  // Mapear produtos para o formato do HTML antigo
  const getProductInfo = (sku: string) => {
    if (sku === "UP-MIND") {
      return {
        name: "UP MIND • Neuro Performance",
        description: "Focus Core Blend™ com Lion's Mane, Cordyceps, Ashwagandha, Bacopa e Schisandra para quem precisa de clareza mental sem ansiedade.",
        bullets: [
          "30 comprimidos para uso diário.",
          "Foco, memória e estabilidade emocional.",
          "Laudos por lote e QR code de rastreio.",
        ]
      }
    } else if (sku === "UP-BURN") {
      return {
        name: "UP BURN • Energia & Metabolismo",
        description: "Energy Flow System™ com Cordyceps, Maca, Guaraná nativo, Gynostemma e Shilajit para energia celular constante e termogênese equilibrada.",
        bullets: [
          "Cordyceps de alta pureza para VO₂ máximo",
          "Maca, Guaraná nativo e Gynostemma sinérgicos",
          "Shilajit para absorção mineral e ATP elevado",
        ]
      }
    } else {
      return {
        name: "Stack dupla • Foco + Energia",
        description: "Dois potes (UP MIND + UP BURN) para quem precisa render de manhã até o pós-treino sem perder controle em nenhuma etapa.",
        bullets: [
          "Economia de 10% no ciclo completo.",
          "Atendimento dedicado para ajustes e renovação.",
          "Perfeito para creators, líderes comerciais e atletas mentais.",
        ]
      }
    }
  }

  return (
    <div className="bundle-grid bundle-grid--hero">
      {displayProducts.map((product) => {
        const info = getProductInfo(product.sku)
        const installments = Math.ceil(product.priceCents / 3)
        
        return (
          <article
            key={product.id}
            className={`bundle-card ${product.highlight ? "bundle-card--highlight" : ""}`}
          >
            {product.badge && (
              <div className={`bundle-card__badge ${product.sku === "STACK-DUPLO" ? "bundle-card__badge--alt" : ""}`}>
                {product.badge}
              </div>
            )}
            <img src={product.image} alt={product.name} />
            <h3>{info.name}</h3>
            <p>{info.description}</p>
            <ul>
              {info.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
            <div className="bundle-card__price">
              <strong>{formatCurrency(product.priceCents)}</strong>
              <span>ou {Math.floor(product.priceCents / 100 / 3)}x de {formatCurrency(installments)}</span>
            </div>
            <div className="bundle-card__cta">
              <button
                className="button button--primary"
                onClick={() => handleAddToCart(product)}
              >
                Adicionar ao carrinho
              </button>
              <Link className="button button--ghost" href={`/produtos/${product.sku}`}>
                Ver detalhes
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}

