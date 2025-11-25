import { Metadata } from "next"
import { listProductsPsiloUp } from "@lib/data/products-psiloup-server"
import Header from "@modules/layout/components/header"
import ProductGrid from "@modules/home/components/product-grid"

export const metadata: Metadata = {
  title: "PsiloUp | Neuro Performance Natural",
  description:
    "PsiloUp — Suplementos premium inspirados em creators e líderes que precisam de foco limpo, energia inteligente e metabolismo equilibrado todos os dias.",
}

export default async function HomePage() {
  const products = await listProductsPsiloUp()

  return (
    <>
      <Header />
      <main>
        <section id="packs" className="hero hero--catalog">
          <div className="container hero__catalog">
            <header className="hero__catalog-header">
              <h1>Kits PsiloUp prontos para o dia a dia</h1>
              <p>Escolha seu stack e já veja o valor de cada fórmula.</p>
            </header>
            <ProductGrid products={products} />
          </div>
        </section>
      </main>
    </>
  )
}
