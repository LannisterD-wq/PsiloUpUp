"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@modules/layout/components/header"
import { isAuthenticated, getCurrentUser } from "@lib/data/auth"
import { getCartTotals, CartTotals } from "@lib/data/cart"
import { getAddresses, Address } from "@lib/data/addresses"
import { calculateShipping, ShippingQuote } from "@lib/data/shipping"
import { createOrder } from "@lib/data/checkout"
import { formatCurrency } from "@lib/util/format-currency"

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [user, setUser] = useState(getCurrentUser())
  const [totals, setTotals] = useState<CartTotals | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [cep, setCep] = useState("")
  const [shippingCep, setShippingCep] = useState<string>("")
  const [shippingQuote, setShippingQuote] = useState<ShippingQuote | null>(null)
  const [selectedShipping, setSelectedShipping] = useState<any>(null)
  const [selectedShippingIndex, setSelectedShippingIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [recalcRequested, setRecalcRequested] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login?redirect=/checkout")
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
      }
    } catch (error) {
      setMessage("Erro ao carregar dados.")
    } finally {
      setLoading(false)
    }
  }

  const handleCalculateShipping = async () => {
    if (!cep || cep.length !== 8) {
      setMessage("CEP inválido")
      return
    }
    if (!totals || totals.items.length === 0) {
      setMessage("Carrinho vazio")
      return
    }
    setLoading(true)
    setMessage("Calculando frete...")
    try {
      const quote = await calculateShipping(cep, totals.items.map(item => ({
        sku: item.product.sku,
        price_cents: item.product.priceCents,
        qty: item.qty,
      })))
      setShippingQuote(quote)
      if (quote.services && quote.services.length > 0) {
        setSelectedShippingIndex(0)
        setSelectedShipping(quote.services[0])
      } else if (typeof quote.cost_cents === 'number') {
        const fallback = { carrier: 'Correios', name: quote.free ? 'Frete Grátis' : 'Padrão', price_cents: quote.cost_cents }
        setShippingQuote({ ...quote, services: [fallback] })
        setSelectedShippingIndex(0)
        setSelectedShipping(fallback)
      }
      setMessage("Frete calculado!")
      setStep(3)
      setShippingCep(cep)
      setRecalcRequested(false)
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

  const shippingCost = selectedShipping ? selectedShipping.price_cents : 0
  const total = totals ? totals.subtotalCents - totals.discountCents + shippingCost : 0

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

          {/* Etapa 2: Cálculo de frete */}
          <article className="bundle-card">
            <h3>2) Calcular frete</h3>
            <p>Digite seu CEP para calcular o frete e habilitar o pagamento.</p>
            <div className="cart-row">
              <input
                type="text"
                id="shipping-cep"
                className="cart-cep__input"
                placeholder="CEP (somente números)"
                value={cep.replace(/\D/g, '').replace(/(\d{5})(\d{0,3})/, (m, p1, p2) => p2 ? `${p1}-${p2}` : p1)}
                onChange={(e) => setCep(e.target.value)}
                maxLength={9}
              />
              <button
                className="button button--primary"
                onClick={handleCalculateShipping}
                disabled={loading}
              >
                Calcular
              </button>
            </div>
            {shippingQuote?.services && shippingQuote.services.length > 0 && (
              <div className="shipping-options" style={{ marginTop: "10px" }}>
                {shippingQuote.services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => { setSelectedShippingIndex(index); setSelectedShipping(service) }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 12,
                      border: selectedShippingIndex === index ? '2px solid #5ce1e6' : '1px solid #e5e7eb',
                      borderRadius: 8,
                      marginBottom: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600 }}>{service.carrier}</div>
                      <div style={{ opacity: 0.8 }}>{service.name}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 600 }}>{service.price_cents === 0 ? 'Frete grátis' : formatCurrency(service.price_cents)}</div>
                      {service.delivery_time_days && (
                        <small>{service.delivery_time_days} dia(s)</small>
                      )}
                    </div>
                  </div>
                ))}
                {shippingQuote?.source && (
                  <small style={{ display: 'block', marginTop: 6, opacity: 0.7 }}>Fonte: {shippingQuote.source}</small>
                )}
                <div style={{ marginTop: 8 }}>
                  <button className="button" onClick={() => { setRecalcRequested(true); handleCalculateShipping() }} disabled={loading || cep.replace(/\D/g, '').length !== 8}>
                    {loading ? "Recalculando..." : "Recalcular frete"}
                  </button>
                </div>
              </div>
            )}
            {message && <small>{message}</small>}
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
                        ? `${selectedShipping.carrier} ${selectedShipping.name} - ${formatCurrency(shippingCost)}`
                        : "Calcule com o CEP"}
                    </strong>
                  </div>
                  <div className="cart-total">
                    <span>Total</span>
                    <strong>{formatCurrency(total)}</strong>
                  </div>
                </>
              )}
            </div>
            <div className="bundle-card__cta" style={{ marginTop: "16px" }}>
              <h4>Endereço de entrega</h4>
              {addresses.length > 0 ? (
                <div>
                  {addresses.map((address) => {
                    const active = selectedAddressId === address.id
                    return (
                      <div key={address.id} style={{ border: active ? "2px solid #5ce1e6" : "1px solid #e5e7eb", borderRadius: 8, padding: 12, marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <strong>{address.label || "Endereço"}</strong>
                          <button
                            className="button"
                            onClick={() => {
                              setSelectedAddressId(address.id)
                              const newCep = address.cep.replace(/\D/g, "")
                              setCep(newCep)
                              setRecalcRequested(true)
                              if (shippingCep && newCep !== shippingCep) {
                                setSelectedShipping(null)
                                setSelectedShippingIndex(null)
                                setShippingQuote(null)
                                setMessage("CEP do endereço diferente do frete. Recalcule o frete.")
                              }
                            }}
                          >
                            Selecionar
                          </button>
                        </div>
                        <div style={{ marginTop: 6 }}>
                          <span>{address.street}, {address.number || ""} {address.complement ? `- ${address.complement}` : ""}</span>
                        </div>
                        <div style={{ opacity: 0.8 }}>
                          <span>{address.neighborhood ? `${address.neighborhood} - ` : ""}{address.city}/{address.state} - CEP {address.cep}</span>
                        </div>
                      </div>
                    )
                  })}
                  <div>
                    <button className="button" onClick={() => recalcRequested ? handleCalculateShipping() : setMessage("Selecione um endereço e calcule o frete") } disabled={loading || !selectedAddressId}>
                      {loading ? "Calculando..." : "Calcular frete para o endereço selecionado"}
                    </button>
                  </div>
                </div>
              ) : (
                <p>Nenhum endereço cadastrado.</p>
              )}
              <button
                className="button"
                onClick={() => router.push("/account?tab=addresses")}
              >
                Adicionar novo endereço
              </button>
            </div>
            <div className="bundle-card__cta">
              <button
                className="button button--primary"
                onClick={handleSubmitOrder}
                disabled={loading || !selectedShipping || !selectedAddressId || (shippingCep && cep !== shippingCep)}
              >
                Pagar com Mercado Pago
              </button>
            </div>
            {message && <small>{message}</small>}
          </article>
        </section>
      </main>
    </>
  )
}

