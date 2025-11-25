import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

const Hero: React.FC = () => {
  return (
    <div className="relative bg-ui-bg-subtle">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bem-vindo à PsiloUp
          </h1>
          <p className="text-lg md:text-xl text-ui-fg-subtle mb-8">
            Descubra produtos naturais para seu bem-estar e qualidade de vida
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedClientLink href="/store">
              <Button size="large">
                Explorar Produtos
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/collections">
              <Button variant="secondary" size="large">
                Ver Coleções
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero