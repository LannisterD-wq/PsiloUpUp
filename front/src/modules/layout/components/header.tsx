"use client"

import Link from "next/link"
import { getCartCount } from "@lib/data/cart"
import { useEffect, useState } from "react"
import CartDrawer from "./cart-drawer"
import SearchModal from "./search-modal.tsx"

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount())
    }
    updateCartCount()
    window.addEventListener("psiloup-cart-updated", updateCartCount)
    return () => window.removeEventListener("psiloup-cart-updated", updateCartCount)
  }, [])

  return (
    <>
      <div className="announcement-bar">
        <div className="container announcement-bar__inner">
          <p>Frete grátis acima de R$399,00</p>
        </div>
      </div>
      <header className="site-header site-header--home">
        <div className="container site-header__wrap">
          <nav className={`site-nav ${navOpen ? "active" : ""}`}>
            <button className="site-nav__toggle" aria-label="Abrir menu" onClick={() => setNavOpen((v) => !v)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className="site-nav__list">
              <li><Link className="menu-highlight" href="/produtos" prefetch={false}>Comprar</Link></li>
              <li><Link href="/quem-somos" prefetch={false}>Quem somos</Link></li>
              <li><Link href="/formulacao" prefetch={false}>Formulação</Link></li>
              <li><Link href="/seja-um-influencer" prefetch={false}>Seja um Influencer</Link></li>
            </ul>
          </nav>
          <Link className="site-logo" href="/" aria-label="PsiloUp">
            <img src="/images/PsiloUp_logo_sem_fundo.png" alt="PsiloUp" />
          </Link>
          <div className="site-actions">
            <Link className="site-actions__link" href="/account">Minha conta</Link>
            <button className="site-actions__icon" onClick={() => setSearchOpen(true)} aria-label="Pesquisar">
              <i className="fas fa-search"></i>
            </button>
            <Link className="site-actions__icon" href="/account" aria-label="Conta">
              <i className="far fa-user"></i>
            </Link>
            <button
              className="site-actions__icon site-actions__icon--cart"
              onClick={() => setCartOpen(true)}
              aria-label="Carrinho"
            >
              <i className="fas fa-shopping-basket"></i>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
