"use client"

import Link from "next/link"
import { getCartCount } from "@lib/data/cart"
import { useEffect, useState } from "react"
import CartDrawer from "./cart-drawer"

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)

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
          <nav className="site-nav">
            <button className="site-nav__toggle" aria-label="Abrir menu">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className="site-nav__list">
              <li><Link href="/quem-somos">Quem somos</Link></li>
              <li><Link href="/formulacao">Formulação</Link></li>
              <li><a href="#influencers">Seja um Influencer</a></li>
            </ul>
          </nav>
          <Link className="site-logo" href="/" aria-label="PsiloUp">
            <img src="/images/PsiloUp_logo_sem_fundo.png" alt="PsiloUp" />
          </Link>
          <div className="site-actions">
            <Link className="site-actions__link" href="/login">Minha conta</Link>
            <a className="site-actions__icon" href="#search" aria-label="Pesquisar">
              <i className="fas fa-search"></i>
            </a>
            <Link className="site-actions__icon" href="/login" aria-label="Conta">
              <i className="far fa-user"></i>
            </Link>
            <button
              className="site-actions__icon"
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
    </>
  )
}

