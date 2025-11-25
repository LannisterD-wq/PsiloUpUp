import { Metadata } from "next"
import { listProductsPsiloUp } from "@lib/data/products-psiloup-server"
import Header from "@modules/layout/components/header"
import ProductGrid from "@modules/home/components/product-grid"

export const metadata: Metadata = {
  title: "Comprar • PsiloUp",
  description: "Catálogo de produtos PsiloUp",
}

export default async function ProdutosPage() {
  const items = await listProductsPsiloUp().catch(() => [])

  return (
    <>
      <Header />
      <main>
        <section className="hero hero--catalog">
          <div className="container hero__catalog">
            <header className="hero__catalog-header">
              <h1>Produtos PsiloUp</h1>
              <p>Escolha seu stack e finalize sua compra.</p>
            </header>
            <ProductGrid products={Array.isArray(items) ? items : []} />
          </div>
        </section>
      </main>
    </>
  )
}
