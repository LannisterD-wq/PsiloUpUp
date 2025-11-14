"use client"

import { PsiloUpProduct } from "@lib/data/products-psiloup-server"
import { addToCart } from "@lib/data/cart"
import { formatCurrency } from "@lib/util/format-currency"

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

  const imageUrl = `/images/${product.sku === "UP-MIND" ? "MIND" : product.sku === "UP-BURN" ? "BURN" : "Stack_Duplo"}-removebg-preview.png`

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="hero__eyebrow">Focus Core Blend™</span>
            <h1 className="hero__title">{product.name} — clareza mental sem ansiedade</h1>
            <p className="hero__subtitle">
              Fórmula exclusiva da PsiloUp com adaptógenos certificados para produtores de conteúdo, executivos e
              líderes que precisam manter raciocínio rápido e controle emocional em rotinas intensas.
            </p>
            <div className="hero__actions">
              <div className="bundle-card__price">
                <strong>{formatCurrency(product.priceCents)}</strong>
                <span>PIX 5% OFF • {formatCurrency(Math.floor(product.priceCents * 0.95))}</span>
                <span>Cartão: até 12x • ex.: 3x de {formatCurrency(Math.ceil(product.priceCents / 3))}</span>
              </div>
              <div className="bundle-card__cta">
                <button
                  className="button button--primary"
                  onClick={handleAddToCart}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
            <div className="hero__badges">
              <div className="hero__badge">30 comprimidos para uso diário</div>
              <div className="hero__badge">Foco, memória e estabilidade emocional</div>
              <div className="hero__badge">Laudos por lote e QR code de rastreio</div>
            </div>
          </div>
          <div className="hero__media">
            <img src={imageUrl} alt={product.name} />
          </div>
        </div>
      </section>

      <section>
        <div className="container stack">
          <div>
            <h2 className="section-title">Uso sugerido & resultados</h2>
          </div>
          <div className="guides">
            <div className="guide-card">
              <h4>Posologia</h4>
              <ul>
                <li>1 cápsula ao acordar com água.</li>
                <li>Associe a café ou chá verde se desejar.</li>
                <li>Evite consumir após as 17h para não impactar o sono.</li>
              </ul>
            </div>
            <div className="guide-card">
              <h4>Linha do tempo</h4>
              <ul>
                <li>Dia 1-3: energia mental estável, humor mais equilibrado.</li>
                <li>Dia 4-7: foco contínuo, menos procrastinação.</li>
                <li>Após 2 semanas: memória e clareza mental sustentadas.</li>
              </ul>
            </div>
            <div className="guide-card">
              <h4>Para quem é</h4>
              <ul>
                <li>Creators, apresentadores, devs, traders e líderes sob pressão.</li>
                <li>Pessoas que buscam foco limpo sem ansiedade ou crashes.</li>
                <li>Rotinas híbridas que alternam gravação, live e reuniões.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container stack">
          <div>
            <h2 className="section-title">Compra segura • {formatCurrency(product.priceCents)}</h2>
            <p className="section-copy">
              Pote com 30 cápsulas. Assinatura com 10% OFF e frete reduzido. Atendimento humano durante todo o processo.
            </p>
          </div>
          <div className="purchase-steps">
            <div className="purchase-step">
              <span>1</span>
              <h3>Feche o pedido</h3>
              <p>Receba link de pagamento via WhatsApp ou e-mail. PIX, cartão (1-12x) e recorrência automática.</p>
            </div>
            <div className="purchase-step">
              <span>2</span>
              <h3>Confirmação expressa</h3>
              <p>Nota fiscal e confirmação de pagamento em até 24h úteis.</p>
            </div>
            <div className="purchase-step">
              <span>3</span>
              <h3>Envio rastreado</h3>
              <p>Correios + Melhor Envio com código de rastreio automático para o seu WhatsApp.</p>
            </div>
          </div>
          <p className="section-copy" style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.55)" }}>
            Suplemento alimentar. Não é medicamento. Consulte seu médico ou nutricionista em caso de condições
            pré-existentes.
          </p>
        </div>
      </section>
    </>
  )
}

