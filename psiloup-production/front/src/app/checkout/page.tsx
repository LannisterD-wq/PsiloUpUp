"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@modules/layout/components/header"
import { isAuthenticated, getCurrentUser } from "@lib/data/auth"
import { getCartTotals, CartTotals } from "@lib/data/cart"
import { getAddresses, Address } from "@lib/data/addresses"
import { calculateShipping, ShippingQuote } from "@lib/data/shipping"
import { createOrder } from "@lib/data/checkout"
import { applyCoupon } from "@lib/data/cart"
import { formatCurrency } from "@lib/util/format-currency"

export default function CheckoutPage() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  const [totals, setTotals] = useState<CartTotals | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [cep, setCep] = useState("")
  const [shippingQuote, setShippingQuote] = useState<ShippingQuote | null>(null)
  const [selectedShipping, setSelectedShipping] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [couponMsg, setCouponMsg] = useState("")

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/sign-in?redirect=/checkout")
      return
    }
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [cartTotals, userAddresses] = await Promise.all([
        getCartTotals(),
        getAddresses(),
      ])
      setTotals(cartTotals)
      setAddresses(userAddresses)
      if (userAddresses.length > 0) {
        setSelectedAddressId(userAddresses[0].id)
        setCep(userAddresses[0].cep.replace(/\D/g, ""))
        if (cartTotals.items.length > 0) {
          const addrCep = userAddresses[0].cep.replace(/\D/g, "")
          if (addrCep && addrCep.length === 8) {
            const quote = await calculateShipping(addrCep, cartTotals.items.map(item => ({
              sku: item.product.sku,
              price_cents: item.product.priceCents,
              qty: item.qty,
            })))
            setShippingQuote(quote)
            setSelectedShipping(quote.services && quote.services.length > 0 ? quote.services[0] : null)
            setMessage(quote.services && quote.services.length > 0 ? `Frete calculado! ${quote.services.length} opção(ões) disponível(eis).` : "Nenhuma opção de frete disponível para este endereço.")
          }
        }
      }
    } catch (error) {
      setMessage("Erro ao carregar dados.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const autoCalc = async () => {
      if (!selectedAddressId || !totals) return
      const selectedAddr = addresses.find(a => a.id === selectedAddressId)
      const addrCep = selectedAddr?.cep?.replace(/\D/g, "") || ""
      if (!addrCep || addrCep.length !== 8) return
      try {
        setLoading(true)
        const quote = await calculateShipping(addrCep, totals.items.map(item => ({
          sku: item.product.sku,
          price_cents: item.product.priceCents,
          qty: item.qty,
        })))
        setShippingQuote(quote)
        setSelectedShipping(quote.services && quote.services.length > 0 ? quote.services[0] : null)
        setMessage(quote.services && quote.services.length > 0 ? `Frete calculado! ${quote.services.length} opção(ões) disponível(eis).` : "Nenhuma opção de frete disponível para este endereço.")
      } catch (error: any) {
        setMessage(error.message || "Erro ao calcular frete")
        setSelectedShipping(null)
      } finally {
        setLoading(false)
      }
    }
    autoCalc()
  }, [selectedAddressId, totals, addresses])

  const handleCalculateShipping = async () => {
    if (!selectedAddressId) {
      setMessage("Selecione um endereço primeiro")
      return
    }
    const selectedAddr = addresses.find(a => a.id === selectedAddressId)
    if (!selectedAddr) {
      setMessage("Endereço não encontrado")
      return
    }
    const addrCep = selectedAddr.cep.replace(/\D/g, "")
    if (!addrCep || addrCep.length !== 8) {
      setMessage("CEP inválido no endereço selecionado")
      return
    }
    if (!totals || totals.items.length === 0) {
      setMessage("Carrinho vazio")
      return
    }
    setLoading(true)
    setMessage("Calculando frete...")
    try {
      const quote = await calculateShipping(addrCep, totals.items.map(item => ({
        sku: item.product.sku,
        price_cents: item.product.priceCents,
        qty: item.qty,
      })))
      
      console.log('[Checkout] Resposta completa do frete:', JSON.stringify(quote, null, 2))
      
      setShippingQuote(quote)
      if (quote.services && quote.services.length > 0) {
        // Seleciona o primeiro serviço automaticamente
        const firstService = quote.services[0]
        console.log('[Checkout] Primeiro serviço:', firstService)
        console.log('[Checkout] price_cents do serviço:', firstService.price_cents)
        console.log('[Checkout] Tipo de price_cents:', typeof firstService.price_cents)
        
        setSelectedShipping(firstService)
        setMessage(`Frete calculado! ${quote.services.length} opção(ões) disponível(eis).`)
        console.log('Serviços de frete:', quote.services)
        console.log('Serviço selecionado:', firstService)
      } else {
        setMessage("Nenhuma opção de frete disponível para este endereço.")
        setSelectedShipping(null)
      }
    } catch (error: any) {
      setMessage(error.message || "Erro ao calcular frete")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitOrder = async () => {
    if (!selectedAddressId || !selectedShipping) {
      setMessage("Selecione endereço e frete")
      return
    }
    if (!totals || totals.items.length === 0) {
      setMessage("Carrinho vazio")
      return
    }
    setLoading(true)
    setMessage("Processando pagamento...")
    try {
      const response = await createOrder({
        items: totals.items.map(item => ({
          sku: item.product.sku,
          price_cents: item.product.priceCents,
          qty: item.qty,
        })),
        address_id: selectedAddressId,
        shipping: selectedShipping,
        coupon_code: totals.coupon?.code || null,
      })
      if (response.init_point) {
        window.location.href = response.init_point
      }
    } catch (error: any) {
      setMessage(error.message || "Erro ao processar pedido")
      setLoading(false)
    }
  }

  if (!isAuthenticated()) {
    return null
  }

  // Calcula custo do frete - verifica múltiplas propriedades possíveis
  const shippingCost = selectedShipping 
    ? (selectedShipping.price_cents || selectedShipping.priceCents || 0) 
    : 0
  const total = totals ? totals.subtotalCents - totals.discountCents + shippingCost : 0
  
  // Debug: log para verificar valores
  useEffect(() => {
    if (selectedShipping) {
      console.log('Frete selecionado:', selectedShipping)
      console.log('Custo do frete (price_cents):', selectedShipping.price_cents)
      console.log('Custo do frete (priceCents):', selectedShipping.priceCents)
      console.log('Custo calculado:', shippingCost)
    }
  }, [selectedShipping, shippingCost])

  return (
    <>
      <Header />
      <main>
        <section className="hero hero--catalog">
          <div className="container">
            <header className="hero__catalog-header">
              <h1>Finalizar compra</h1>
              <p>Fluxo simples: login/cadastro, cálculo de frete e pagamento.</p>
            </header>
          </div>
        </section>

        <section className="container stack" id="checkout">
          {/* Etapa 1: Login/Cadastro */}
          <article className="bundle-card">
            <h3>1) Login ou cadastro</h3>
            <p>Logado como: <strong>{user?.email}</strong></p>
          </article>

          {/* Etapa 2: Seleção de endereço e frete */}
          <article className="bundle-card">
            <h3>2) Entrega</h3>
            <p>Selecione um endereço para visualizar as Formas de Envio disponíveis.</p>
            
            {/* Seleção de endereço */}
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="address-select" style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>
                Endereço de entrega
              </label>
              {addresses.length > 0 ? (
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <select
                    id="address-select"
                    value={selectedAddressId || ""}
                    onChange={(e) => {
                      const addrId = parseInt(e.target.value)
                      setSelectedAddressId(addrId)
                      const addr = addresses.find(a => a.id === addrId)
                      if (addr) {
                        setCep(addr.cep.replace(/\D/g, ""))
                        setShippingQuote(null)
                        setSelectedShipping(null)
                      }
                    }}
                    style={{ 
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: "4px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                      lineHeight: "1.4",
                      fontSize: "0.95rem",
                      minHeight: "40px"
                    }}
                  >
                    {addresses.map((addr) => (
                      <option key={addr.id} value={addr.id}>
                        {addr.cep} - {addr.street}, {addr.number || ""} {addr.complement ? `- ${addr.complement}` : ""} - {addr.city}/{addr.state}
                      </option>
                    ))}
                  </select>
                  <Link
                    href="/account"
                    className="button button--ghost"
                    style={{ whiteSpace: "nowrap", fontSize: "0.75rem", padding: "5px 8px", borderRadius: "3px" }}
                  >
                    Cadastrar novo endereço
                  </Link>
                </div>
              ) : (
                <div style={{ padding: "12px", background: "rgba(255, 47, 146, 0.1)", borderRadius: "4px", marginBottom: "12px" }}>
                  <p style={{ marginBottom: "8px" }}>Nenhum endereço cadastrado.</p>
                  <Link href="/account" className="button button--primary" style={{ fontSize: "0.9rem", padding: "8px 16px" }}>
                    Gerenciar meus Endereços
                  </Link>
                </div>
              )}
            </div>

            {/* Opções de frete */}
            {shippingQuote?.services && shippingQuote.services.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h4 style={{ marginBottom: "12px", fontSize: "1rem", fontWeight: "600" }}>Método de Entrega</h4>
                <div className="shipping-options" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {shippingQuote.services.map((service, index) => (
                    <label 
                      key={index} 
                      className="ship-option"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px",
                        border: selectedShipping === service ? "2px solid var(--cyan)" : "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "4px",
                        background: selectedShipping === service ? "rgba(0, 230, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <input
                        type="radio"
                        name="ship_service"
                        value={index}
                        checked={selectedShipping === service}
                        onChange={() => setSelectedShipping(service)}
                        style={{ margin: 0 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: "500" }}>{service.carrier} {service.name}</span>
                          <span style={{ fontWeight: "bold", color: "var(--cyan)" }}>
                            {service.price_cents ? formatCurrency(service.price_cents) : 'R$ 0,00'}
                            {!service.price_cents && console.warn('[Checkout] Serviço sem price_cents:', service)}
                          </span>
                        </div>
                        {service.delivery_time_days && (
                          <small style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.85rem" }}>
                            Prazo: {service.delivery_time_days} dia(s)
                          </small>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {message && (
              <div style={{ 
                marginTop: "12px", 
                padding: "8px 12px", 
                background: message.includes("Erro") ? "rgba(255, 47, 146, 0.1)" : "rgba(0, 230, 255, 0.1)",
                border: message.includes("Erro") ? "1px solid rgba(255, 47, 146, 0.3)" : "1px solid rgba(0, 230, 255, 0.3)",
                borderRadius: "4px",
                color: message.includes("Erro") ? "#FF2F92" : "var(--cyan)",
                fontSize: "0.9rem"
              }}>
                {message}
              </div>
            )}
          </article>

          {/* Etapa 3: Revisão e pagamento */}
          <article className="bundle-card">
            <h3>3) Revisar e pagar</h3>
            <div className="cart-summary">
              {totals && (
                <>
                  <div id="checkout-items">
                    {totals.items.map((item) => (
                      <div key={item.sku} className="cart-row">
                        <span>{item.product.name} x{item.qty}</span>
                        <strong>{formatCurrency(item.subtotalCents)}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="cart-row">
                    <span>Subtotal</span>
                    <strong>{formatCurrency(totals.subtotalCents)}</strong>
                  </div>
                  {totals.discountCents > 0 && (
                    <div className="cart-row">
                      <span>Desconto</span>
                      <strong>- {formatCurrency(totals.discountCents)}</strong>
                    </div>
                  )}
                  <div className="cart-row">
                    <span>Frete</span>
                    <strong>
                      {selectedShipping
                        ? formatCurrency(shippingCost)
                        : "A definir"}
                    </strong>
                  </div>
                  <div className="cart-total" style={{ 
                    marginTop: "16px", 
                    paddingTop: "16px", 
                    borderTop: "2px solid rgba(255, 255, 255, 0.2)",
                    fontSize: "1.2rem"
                  }}>
                    <span>Total</span>
                    <strong style={{ fontSize: "1.4rem", color: "var(--cyan)" }}>{formatCurrency(total)}</strong>
                  </div>
                </>
              )}
            </div>

            {/* Cupom de desconto */}
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ marginBottom: "8px" }}>Cupom</h4>
              {totals?.coupon ? (
                <p style={{ fontSize: "0.95rem" }}>Aplicado: <strong>{totals.coupon.code}</strong> ({formatCurrency(totals.discountCents)} OFF)</p>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    placeholder="Código do cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "white" }}
                  />
                  <button
                    className="button"
                    onClick={async () => {
                      const res = await applyCoupon(couponCode)
                      if (res.success) {
                        setCouponMsg("Cupom aplicado!")
                        const updated = await getCartTotals()
                        setTotals(updated)
                      } else {
                        setCouponMsg(res.error || "Cupom inválido")
                      }
                    }}
                  >
                    Aplicar
                  </button>
                </div>
              )}
              {couponMsg && <small style={{ display: "block", marginTop: "6px" }}>{couponMsg}</small>}
            </div>
            
            {/* Endereço selecionado */}
            <div style={{ marginTop: "24px" }}>
              <h4 style={{ marginBottom: "12px" }}>Endereço de entrega</h4>
              {addresses.length > 0 && selectedAddressId ? (
                <div style={{ padding: "12px", background: "rgba(255, 255, 255, 0.05)", borderRadius: "4px", marginBottom: "16px", overflow: "visible" }}>
                  {(() => {
                    const addr = addresses.find(a => a.id === selectedAddressId)
                    return addr ? (
                      <>
                        <p style={{ lineHeight: "1.4", margin: "2px 0" }}><strong>{addr.recipient}</strong></p>
                        <p style={{ lineHeight: "1.4", margin: "2px 0" }}>{addr.street}, {addr.number || ""} {addr.complement ? `- ${addr.complement}` : ""}</p>
                        <p style={{ lineHeight: "1.4", margin: "2px 0" }}>{addr.neighborhood} - {addr.city}/{addr.state} - CEP {addr.cep}</p>
                      </>
                    ) : null
                  })()}
                </div>
              ) : (
                <div style={{ padding: "12px", background: "rgba(255, 47, 146, 0.1)", borderRadius: "4px", marginBottom: "16px" }}>
                  <p>Selecione um endereço acima.</p>
                </div>
              )}
            </div>
            
            {/* Botão de compra */}
            <div style={{ marginTop: "24px" }}>
              <button
                className="button button--primary"
                onClick={handleSubmitOrder}
                disabled={loading || !selectedAddressId || !selectedShipping}
                style={{ 
                  width: "100%", 
                  padding: "16px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                {loading ? "Processando..." : "COMPRAR"}
              </button>
              {(!selectedAddressId || !selectedShipping) && (
                <p style={{ marginTop: "8px", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.6)", textAlign: "center" }}>
                  {!selectedAddressId ? "Selecione um endereço" : "Selecione uma forma de entrega"}
                </p>
              )}
            </div>
          </article>
        </section>
      </main>
    </>
  )
}
