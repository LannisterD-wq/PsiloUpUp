import { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@modules/layout/components/header"
import { getProductBySku, listProductsPsiloUp } from "@lib/data/products-psiloup-server"
import ProductDetail from "@modules/products/components/product-detail"

interface PageProps {
  params: Promise<{ sku: string }>
}

export async function generateStaticParams() {
  const products = await listProductsPsiloUp()
  return products.map((product) => ({
    sku: product.sku,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sku } = await params
  const product = await getProductBySku(sku)
  
  if (!product) {
    return {
      title: "Produto não encontrado | PsiloUp",
    }
  }

  return {
    title: `${product.name} | PsiloUp`,
    description: product.description || `Conheça ${product.name} da PsiloUp`,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { sku } = await params
  const product = await getProductBySku(sku)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <ProductDetail product={product} />
      </main>
    </>
  )
}

