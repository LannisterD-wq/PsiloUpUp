import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-ui-border-base mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">PsiloUp</h3>
            <p className="text-sm text-ui-fg-subtle">
              Sua loja de produtos naturais e bem-estar.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Produtos</h4>
            <ul className="space-y-2 text-sm text-ui-fg-subtle">
              <li>
                <LocalizedClientLink href="/store">
                  Todos os produtos
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/collections">
                  Coleções
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/search">
                  Buscar
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-ui-fg-subtle">
              <li>
                <LocalizedClientLink href="/contact">
                  Contato
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/shipping">
                  Envio
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/returns">
                  Devoluções
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-ui-fg-subtle">
              <li>
                <LocalizedClientLink href="/privacy">
                  Política de Privacidade
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/terms">
                  Termos de Uso
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-ui-border-base mt-8 pt-8 text-center text-sm text-ui-fg-subtle">
          <p>&copy; 2024 PsiloUp. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer