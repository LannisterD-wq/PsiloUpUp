# PsiloUp - Versão Final de Produção

Esta é a versão final e organizada do projeto PsiloUp, contendo tudo que está sendo usado em produção.

## 📁 Estrutura

```
psiloup-production/
├── front/              # Frontend Next.js (produção)
│   ├── src/           # Código fonte
│   ├── public/        # Arquivos públicos
│   └── package.json   # Dependências
│
├── back/               # Backend Node.js/Express (produção)
│   ├── src/           # Código fonte
│   └── package.json   # Dependências
│
└── assets/             # Assets organizados
    ├── images/        # Todas as imagens do projeto
    ├── css/           # CSS customizado
    └── fonts/         # Fontes (se houver)
```

## 🚀 Como Usar

### Frontend
```bash
cd front
npm install
npm run dev
```

### Backend
```bash
cd back
npm install
npm run dev
```

## 📦 O que está incluído

### Frontend
- ✅ Next.js 15 com App Router
- ✅ Páginas: Home, Produtos, Checkout, Login, Account, Quem Somos, Formulação
- ✅ Componentes: Header, Cart Drawer, Product Grid
- ✅ Integração com backend via API Client
- ✅ CSS customizado PsiloUp

### Backend
- ✅ Node.js/Express
- ✅ Autenticação JWT
- ✅ Carrinho de compras
- ✅ Checkout e pedidos
- ✅ Cálculo de frete (Melhor Envio)
- ✅ Cupons de desconto
- ✅ Integração Mercado Pago

### Assets
- ✅ Imagens dos produtos (sem fundo)
- ✅ Logo PsiloUp
- ✅ CSS completo (main.css, psiloup.css, psiloup-modern.css)
- ✅ FontAwesome icons

## 🔗 Referências

- **Base de E-commerce**: `garanti-ecommerce-master` (na raiz do projeto)
- **Template Original**: `deployment/` (HTML/CSS/JS original)
- **Starter Next.js**: `nextjs-starter-medusa-main` (usado como base)

## 📝 Notas

- Todas as imagens estão centralizadas em `assets/images/`
- CSS customizado em `assets/css/`
- Backend e Frontend são independentes e podem ser deployados separadamente
- Configurações de ambiente estão nos respectivos `.env` de cada pasta

## 🎨 Design

- Cores: Cyan (#00E6FF), Magenta (#FF2F92), Purple (#A24BD8), Navy (#0D1B2A)
- Fontes: Inter, Poppins
- Estilo: Moderno, dark theme, gradientes suaves

