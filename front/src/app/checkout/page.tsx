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
  const [shippingQuote, setShippingQuote] = useState<ShippingQuote | null>(null)
  const [selectedShipping, setSelectedShipping] = useState<any>(null)
  const [selectedShippingIndex, setSelectedShippingIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

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
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                maxLength={8}
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
                  <label key={index} htmlFor={`ship-${index}`} className="ship-option">
                    <input
                      id={`ship-${index}`}
                      type="radio"
                      name="ship_service"
                      value={index}
                      checked={selectedShippingIndex === index}
                      onChange={() => { setSelectedShippingIndex(index); setSelectedShipping(service) }}
                    />
                    <span>{service.carrier} {service.name}</span>
                    <span className="ship-price">{formatCurrency(service.price_cents)}</span>
                    {service.delivery_time_days && (
                      <small>{service.delivery_time_days} dia(s)</small>
                    )}
                  </label>
                ))}
                {shippingQuote?.source && (
                  <small style={{ display: 'block', marginTop: 6, opacity: 0.7 }}>Fonte: {shippingQuote.source}</small>
                )}
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
                  {addresses.map((address) => (
                    <label key={address.id} htmlFor={`addr-${address.id}`} className="address-option">
                      <input
                        id={`addr-${address.id}`}
                        type="radio"
                        name="address_id"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => {
                          setSelectedAddressId(address.id)
                          setCep(address.cep.replace(/\D/g, ""))
                        }}
                      />
                      <span>
                        {address.street}, {address.number || ""} - {address.city}/{address.state} - CEP {address.cep}
                      </span>
                    </label>
                  ))}
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
                disabled={loading || !selectedShipping || !selectedAddressId}
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

