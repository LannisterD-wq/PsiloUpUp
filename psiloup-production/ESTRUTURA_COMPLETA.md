# Estrutura Completa - PsiloUp Production

## 📦 O que está nesta pasta

Esta é a **versão final e organizada** de tudo que está sendo usado em produção no PsiloUp.

## 🗂️ Estrutura de Pastas

```
psiloup-production/
│
├── 📁 front/                    # Frontend Next.js (PRODUÇÃO)
│   ├── src/
│   │   ├── app/                # Páginas (App Router)
│   │   │   ├── page.tsx        # Home
│   │   │   ├── produtos/       # Páginas de produtos
│   │   │   ├── checkout/       # Checkout
│   │   │   ├── login/          # Login/Register
│   │   │   ├── account/        # Área do cliente
│   │   │   ├── quem-somos/     # Quem somos
│   │   │   └── formulacao/     # Formulação
│   │   ├── modules/            # Componentes organizados
│   │   │   ├── layout/        # Header, Footer, Cart
│   │   │   ├── home/          # Componentes da home
│   │   │   └── products/      # Componentes de produtos
│   │   ├── lib/               # Utilitários e API client
│   │   │   ├── api-client.ts  # Cliente API para backend
│   │   │   ├── data/          # Data fetching
│   │   │   └── util/          # Funções utilitárias
│   │   └── styles/            # CSS global
│   ├── public/
│   │   ├── css/               # CSS compilado (referência)
│   │   └── images/            # Imagens (referência)
│   └── package.json
│
├── 📁 back/                     # Backend Node.js/Express (PRODUÇÃO)
│   ├── src/
│   │   ├── app.js             # App principal
│   │   ├── routes/            # Rotas da API
│   │   │   ├── auth.js        # Autenticação
│   │   │   ├── catalog.js     # Catálogo
│   │   │   ├── checkout.js    # Checkout
│   │   │   ├── coupons.js     # Cupons
│   │   │   ├── shipping.js    # Frete
│   │   │   └── account.js     # Conta do usuário
│   │   ├── controllers/       # Controllers
│   │   ├── models/            # Models (Sequelize)
│   │   ├── services/          # Serviços (Mercado Pago, Melhor Envio)
│   │   ├── middleware/        # Middleware (auth, etc)
│   │   └── utils/             # Utilitários
│   └── package.json
│
└── 📁 assets/                    # ASSETS ORGANIZADOS (TUDO CENTRALIZADO)
    ├── images/                  # TODAS AS IMAGENS
    │   ├── PsiloUp_logo_sem_fundo.png
    │   ├── MIND-removebg-preview.png
    │   ├── BURN-removebg-preview.png
    │   ├── Stack_Duplo-removebg-preview.png
    │   └── ... (todas as imagens)
    │
    ├── css/                     # CSS CUSTOMIZADO
    │   ├── main.css            # CSS base
    │   ├── psiloup.css         # CSS principal PsiloUp
    │   ├── psiloup-modern.css  # Melhorias modernas
    │   ├── psiloup-nextjs-fix.css  # Correções Next.js
    │   └── fontawesome-all.min.css
    │
    └── fonts/                   # Fontes (se necessário)
```

## 🎯 O que cada parte faz

### Frontend (`front/`)
- **Next.js 15** com App Router
- **TypeScript** para type safety
- **TailwindCSS** + CSS customizado
- **API Client** para comunicação com backend
- **Componentes reutilizáveis** organizados

### Backend (`back/`)
- **Node.js/Express** API REST
- **Sequelize** ORM (SQLite dev, PostgreSQL prod)
- **JWT** para autenticação
- **Mercado Pago** integração
- **Melhor Envio** cálculo de frete
- **Cupons** de desconto

### Assets (`assets/`)
- **Imagens centralizadas** - todas as imagens do projeto
- **CSS organizado** - todos os estilos customizados
- **Fontes** - se necessário

## 🔗 Referências Externas

### `garanti-ecommerce-master/` (na raiz)
- Base sólida de e-commerce
- Componentes UI prontos (Shadcn/UI)
- Páginas de autenticação bem estruturadas
- Dashboard do cliente completo
- **Usar como referência para melhorias**

### `deployment/` (na raiz)
- HTML/CSS/JS original
- Design e estrutura inicial
- **Usado como base visual**

## 📋 Checklist de Uso

### Para Desenvolvimento:
- [ ] `cd front && npm install`
- [ ] `cd back && npm install`
- [ ] Configurar `.env` em cada pasta
- [ ] `npm run dev` em cada pasta

### Para Produção:
- [ ] Deploy frontend (Railway/Vercel)
- [ ] Deploy backend (Railway)
- [ ] Configurar variáveis de ambiente
- [ ] Configurar DNS

## 🎨 Design System

- **Cores**: Cyan (#00E6FF), Magenta (#FF2F92), Purple (#A24BD8), Navy (#0D1B2A)
- **Fontes**: Inter, Poppins
- **Estilo**: Dark theme, gradientes suaves, moderno

## 📝 Próximos Passos

1. **Analisar Garanti E-commerce** - ver `ANALISE_GARANTI.md`
2. **Melhorar Autenticação** - usar estrutura do Garanti
3. **Melhorar Carrinho** - usar componentes do Garanti
4. **Melhorar Checkout** - usar fluxo do Garanti
5. **Criar Dashboard** - usar layout do Garanti

## 🚀 Comandos Rápidos

```bash
# Frontend
cd psiloup-production/front
npm install
npm run dev

# Backend
cd psiloup-production/back
npm install
npm run dev
```

## ✅ Status

- ✅ Frontend organizado
- ✅ Backend organizado
- ✅ Assets centralizados
- ✅ Imagens todas em um lugar
- ✅ CSS organizado
- ✅ Documentação criada

**Tudo pronto para produção!** 🎉

