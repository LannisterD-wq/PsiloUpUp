# 📋 Plano de Melhorias - Site PsiloUp Original

## 🎯 Objetivo

Melhorar a estrutura de código do site original PsiloUp (`front/`) usando como referência a organização do Garanti, mas **mantendo**:
- ✅ Design visual original
- ✅ Integração Mercado Pago
- ✅ Cálculo de frete (Melhor Envio)
- ✅ Todas as funcionalidades existentes

## 🔄 O que será melhorado:

### 1. Autenticação
- **Atual**: Login/cadastro em uma página só
- **Melhorar**: Separar em páginas distintas (`/sign-in`, `/sign-up`)
- **Manter**: Integração com backend existente
- **Referência**: Estrutura do Garanti

### 2. Rotas e Organização
- **Atual**: Estrutura básica
- **Melhorar**: Organizar melhor as rotas (auth, customer, store)
- **Manter**: Todas as páginas existentes (quem-somos, formulacao, etc)
- **Referência**: Estrutura de pastas do Garanti

### 3. Produtos
- **Atual**: Funciona, mas pode ser mais organizado
- **Melhorar**: Melhor estrutura de dados e componentes
- **Manter**: Busca do backend, imagens, preços

### 4. Checkout
- **Manter**: Fluxo completo com Mercado Pago
- **Manter**: Cálculo de frete Melhor Envio
- **Melhorar**: Organização do código

## 📁 Estrutura Proposta:

```
front/
├── src/
│   ├── app/
│   │   ├── (auth)/          # 🆕 Páginas de autenticação
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── (customer)/      # 🆕 Área do cliente
│   │   │   └── account/
│   │   ├── (store)/         # 🆕 Loja pública
│   │   │   ├── produtos/
│   │   │   └── checkout/
│   │   ├── quem-somos/      # ✅ Manter
│   │   ├── formulacao/      # ✅ Manter
│   │   └── page.tsx         # ✅ Home
│   ├── lib/
│   │   ├── data/
│   │   │   ├── auth.ts      # ✅ Melhorar
│   │   │   ├── cart.ts      # ✅ Melhorar
│   │   │   ├── checkout.ts  # ✅ Manter Mercado Pago
│   │   │   ├── shipping.ts  # ✅ Manter Melhor Envio
│   │   │   └── payment.ts   # ✅ Manter Mercado Pago
│   └── modules/             # ✅ Manter estrutura
```

## ✅ Checklist:

- [ ] Separar login e cadastro em páginas distintas
- [ ] Organizar rotas em grupos (auth, customer, store)
- [ ] Melhorar estrutura de autenticação
- [ ] Manter checkout com Mercado Pago
- [ ] Manter cálculo de frete
- [ ] Testar tudo funcionando

## 🚫 NÃO MUDAR:

- ❌ Design visual (CSS, cores, layout)
- ❌ Funcionalidades (Mercado Pago, frete)
- ❌ Integração com backend
- ❌ Páginas existentes (quem-somos, formulacao)

