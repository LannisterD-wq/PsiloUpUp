import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 - Página não encontrada | PsiloUp",
  description: "A página que você procura não existe.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi">Página não encontrada</h1>
      <p className="text-small-regular">
        A página que você tentou acessar não existe.
      </p>
      <Link
        className="flex gap-x-1 items-center group button button--primary"
        href="/"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}
