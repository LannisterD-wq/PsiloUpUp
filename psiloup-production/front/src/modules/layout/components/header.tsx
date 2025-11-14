"use client"

import Link from "next/link"
import { getCartCount } from "@lib/data/cart"
import { useEffect, useState } from "react"
import CartDrawer from "@modules/layout/components/cart-drawer"

export default function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateCartCount = () => {
      setCartCount(getCartCount())
    }
    updateCartCount()
    window.addEventListener("psiloup-cart-updated", updateCartCount)
    return () => window.removeEventListener("psiloup-cart-updated", updateCartCount)
  }, [])

  // Fecha menu ao clicar em link
  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <div className="announcement-bar">
        <div className="container announcement-bar__inner">
          <p>Frete grátis acima de R$399,00</p>
        </div>
      </div>
      <header className="site-header site-header--home">
        <div className="container site-header__wrap">
          <nav className={`site-nav ${menuOpen ? 'active' : ''}`}>
            <button 
              className="site-nav__toggle" 
              aria-label="Abrir menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className="site-nav__list">
              <li><Link href="/" onClick={handleLinkClick}>Produtos</Link></li>
              <li><Link href="/quem-somos" onClick={handleLinkClick}>Quem somos</Link></li>
              <li><Link href="/formulacao" onClick={handleLinkClick}>Formulação</Link></li>
              <li><a href="#influencers" onClick={handleLinkClick}>Seja um Influencer</a></li>
            </ul>
          </nav>
          <Link className="site-logo" href="/" aria-label="PsiloUp">
            <img src="/images/PsiloUp_logo_sem_fundo.png" alt="PsiloUp" />
          </Link>
          <div className="site-actions">
            <Link className="site-actions__link" href="/account">Minha conta</Link>
            <a className="site-actions__icon" href="#search" aria-label="Pesquisar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            <Link className="site-actions__icon" href="/account" aria-label="Conta">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </Link>
            <button
              className="site-actions__icon"
              onClick={() => setCartOpen(true)}
              aria-label="Carrinho"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7h12l-1.5 7H8.5L7 7z" fill="currentColor"/>
                <circle cx="9" cy="20" r="1.6" fill="currentColor"/>
                <circle cx="17" cy="20" r="1.6" fill="currentColor"/>
              </svg>
              {mounted && cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
