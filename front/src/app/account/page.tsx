"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@modules/layout/components/header"
import { isAuthenticated, getCurrentUser, clearSession } from "@lib/data/auth"
import { getOrders, Order } from "@lib/data/orders"
import { getAddresses, createAddress, Address } from "@lib/data/addresses"
import { formatCurrency } from "@lib/util/format-currency"

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState(getCurrentUser())
  const [orders, setOrders] = useState<Order[]>([])
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddressForm, setShowAddressForm] = useState(false)

  // Address form
  const [addrLabel, setAddrLabel] = useState("")
  const [addrRecipient, setAddrRecipient] = useState("")
  const [addrStreet, setAddrStreet] = useState("")
  const [addrNumber, setAddrNumber] = useState("")
  const [addrComplement, setAddrComplement] = useState("")
  const [addrNeighborhood, setAddrNeighborhood] = useState("")
  const [addrCity, setAddrCity] = useState("")
  const [addrState, setAddrState] = useState("")
  const [addrCep, setAddrCep] = useState("")

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [userOrders, userAddresses] = await Promise.all([
        getOrders(),
        getAddresses(),
      ])
      setOrders(userOrders)
      setAddresses(userAddresses)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    clearSession()
    router.push("/")
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createAddress({
        label: addrLabel || undefined,
        recipient: addrRecipient,
        street: addrStreet,
        number: addrNumber || undefined,
        complement: addrComplement || undefined,
        neighborhood: addrNeighborhood || undefined,
        city: addrCity,
        state: addrState,
        cep: addrCep.replace(/\D/g, ""),
      })
      setShowAddressForm(false)
      // Reset form
      setAddrLabel("")
      setAddrRecipient("")
      setAddrStreet("")
      setAddrNumber("")
      setAddrComplement("")
      setAddrNeighborhood("")
      setAddrCity("")
      setAddrState("")
      setAddrCep("")
      loadData()
    } catch (error: any) {
      alert(error.message || "Erro ao adicionar endereço")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated()) {
    return null
  }

  return (
    <>
      <Header />
      <main>
        <section id="main" className="container">
          <header className="major">
            <h2>Minha conta</h2>
            <p>Gerencie seus pedidos, endereços e perfil.</p>
          </header>

          <div className="row gtr-50 gtr-uniform">
            <div className="col-12">
              <article className="bundle-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3>Pedidos</h3>
                  <button id="logout" className="button small" onClick={handleLogout}>
                    Sair
                  </button>
                </div>
                {loading ? (
                  <p>Carregando pedidos...</p>
                ) : orders.length === 0 ? (
                  <p>Nenhum pedido encontrado.</p>
                ) : (
                  <div id="orders-list">
                    {orders.map((order) => (
                      <div key={order.id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "4px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <strong>Pedido #{order.order_number}</strong>
                          <span>{new Date(order.created_at).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <p>Status: {order.status}</p>
                        <p>Total: {formatCurrency(order.total_cents)}</p>
                        <div>
                          <strong>Itens:</strong>
                          {order.items.map((item) => (
                            <div key={item.id}>
                              {item.product_name} x{item.quantity} - {formatCurrency(item.subtotal_cents)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </div>
            <div className="col-12">
              <article className="bundle-card">
                <h3>Endereços</h3>
                {loading ? (
                  <p>Carregando endereços...</p>
                ) : addresses.length === 0 ? (
                  <p>Nenhum endereço cadastrado.</p>
                ) : (
                  <div id="addresses-list">
                    {addresses.map((address) => (
                      <div key={address.id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "4px" }}>
                        <strong>{address.label || "Endereço"}</strong>
                        <p>
                          {address.street}, {address.number || ""} {address.complement ? `- ${address.complement}` : ""}
                        </p>
                        <p>
                          {address.neighborhood} - {address.city}/{address.state} - CEP {address.cep}
                        </p>
                        <p>Destinatário: {address.recipient}</p>
                      </div>
                    ))}
                  </div>
                )}
                <details>
                  <summary>Adicionar novo endereço</summary>
                  <form id="address-form" style={{ marginTop: "1rem" }} onSubmit={handleAddAddress}>
                    <div className="row gtr-25 gtr-uniform">
                      <div className="col-6 col-12-small">
                        <label htmlFor="addr-label">Identificação</label>
                        <input
                          type="text"
                          id="addr-label"
                          placeholder="Ex: Casa, Trabalho"
                          value={addrLabel}
                          onChange={(e) => setAddrLabel(e.target.value)}
                        />
                      </div>
                      <div className="col-6 col-12-small">
                        <label htmlFor="addr-recipient">Destinatário</label>
                        <input
                          type="text"
                          id="addr-recipient"
                          placeholder="Quem recebe a entrega"
                          value={addrRecipient}
                          onChange={(e) => setAddrRecipient(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-6 col-12-small">
                        <label htmlFor="addr-street">Rua</label>
                        <input
                          type="text"
                          id="addr-street"
                          value={addrStreet}
                          onChange={(e) => setAddrStreet(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-3 col-12-small">
                        <label htmlFor="addr-number">Número</label>
                        <input
                          type="text"
                          id="addr-number"
                          value={addrNumber}
                          onChange={(e) => setAddrNumber(e.target.value)}
                        />
                      </div>
                      <div className="col-3 col-12-small">
                        <label htmlFor="addr-complement">Complemento</label>
                        <input
                          type="text"
                          id="addr-complement"
                          value={addrComplement}
                          onChange={(e) => setAddrComplement(e.target.value)}
                        />
                      </div>
                      <div className="col-6 col-12-small">
                        <label htmlFor="addr-neighborhood">Bairro</label>
                        <input
                          type="text"
                          id="addr-neighborhood"
                          value={addrNeighborhood}
                          onChange={(e) => setAddrNeighborhood(e.target.value)}
                        />
                      </div>
                      <div className="col-3 col-12-small">
                        <label htmlFor="addr-city">Cidade</label>
                        <input
                          type="text"
                          id="addr-city"
                          value={addrCity}
                          onChange={(e) => setAddrCity(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-3 col-12-small">
                        <label htmlFor="addr-state">UF</label>
                        <input
                          type="text"
                          id="addr-state"
                          maxLength={2}
                          value={addrState}
                          onChange={(e) => setAddrState(e.target.value.toUpperCase())}
                          required
                        />
                      </div>
                      <div className="col-3 col-12-small">
                        <label htmlFor="addr-cep">CEP</label>
                        <input
                          type="text"
                          id="addr-cep"
                          maxLength={9}
                          value={addrCep}
                          onChange={(e) => setAddrCep(e.target.value.replace(/\D/g, ""))}
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="button" disabled={loading}>
                      {loading ? "Salvando..." : "Salvar endereço"}
                    </button>
                  </form>
                </details>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

