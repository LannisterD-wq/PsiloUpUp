import { Suspense } from "react"
import Header from "@modules/layout/components/header"
import LoginInner from "./LoginInner"

export default function LoginPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Carregando...</div>}>
        <LoginInner />
      </Suspense>
    </>
  )
}

