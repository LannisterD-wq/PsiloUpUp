# PsiloUp - E-commerce Platform

Estrutura moderna para o marketplace PsiloUp, preparada para deploy no Railway como **monorepo** (backend e frontend no mesmo projeto).

## 📁 Estrutura do Projeto

```
PsiloUp/
├── back/          # Backend Node.js/Express (API)
├── front/         # Frontend Next.js (Storefront)
├── deployment/    # Código legado (HTML estático - pode ser removido)
└── server/        # Código legado (backend antigo - pode ser removido)
```

## 🚀 Deploy no Railway (Monorepo)

### Opção 1: Um Projeto com Múltiplos Serviços (Recomendado)

1. **Criar projeto no Railway:**
   - Acesse [Railway](https://railway.app)
   - New Project → Deploy from GitHub repo
   - Selecione este repositório

2. **Adicionar Backend Service:**
   - Settings → New Service → GitHub Repo
   - **Root Directory**: `back`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Adicionar Frontend Service:**
   - Settings → New Service → GitHub Repo (mesmo repo)
   - **Root Directory**: `front`
   - **Build Command**: `yarn install && yarn build`
   - **Start Command**: `yarn start`

4. **Variáveis de Ambiente:**

   **Backend:**
   - `PORT` (Railway define automaticamente)
   - `JWT_SECRET` (gere uma string aleatória)
   - `NODE_ENV=production`
   - `DB_PATH=/tmp/data.sqlite` (ou configure PostgreSQL)
   - `FRONTEND_URL` → URL do frontend Railway

   **Frontend:**
   - `NEXT_PUBLIC_API_URL` → URL do backend Railway (ex: `https://back-production.up.railway.app/api`)
   - `NEXT_PUBLIC_BASE_URL` → URL do frontend (ex: `https://psiloup.com.br`)

5. **Configurar Domínio:**
   - No serviço Frontend: Settings → Domains → Add Custom Domain
   - Adicione `psiloup.com.br` e `www.psiloup.com.br`
   - Railway fornecerá um CNAME
   - Na Hostinger: Configure DNS com o CNAME fornecido

### Opção 2: Dois Projetos Separados

Se preferir separar, crie 2 projetos Railway:
- Um para `back/` (Root Directory: `back`)
- Um para `front/` (Root Directory: `front`)

## 🛠️ Desenvolvimento Local

### Backend

```bash
cd back
npm install
npm run dev
```

API rodando em `http://localhost:3000`

### Frontend

```bash
cd front
yarn install
yarn dev
```

Frontend rodando em `http://localhost:8000`

### Variáveis de Ambiente Locais

**Backend (`back/.env`):**
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=dev-secret-key
DB_PATH=./data.sqlite
CORS_ORIGIN=http://localhost:8000
```

**Frontend (`front/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

## 📝 Status da Migração

- ✅ Estrutura monorepo criada
- ✅ API Client criado (substituindo Medusa SDK)
- ✅ Cores PsiloUp adicionadas ao Tailwind
- ✅ CORS configurado para Next.js
- ⏳ Adaptando data fetching (products, cart, checkout)
- ⏳ Migrando imagens e assets
- ⏳ Aplicando branding completo

## 🔧 Arquivos Principais

- `back/src/app.js` - Configuração Express
- `back/src/routes/` - Rotas da API
- `front/src/lib/api-client.ts` - Cliente API para backend
- `front/src/lib/data/products-psiloup.ts` - Data fetching de produtos
- `front/tailwind.config.js` - Cores PsiloUp configuradas

## 🎨 Cores PsiloUp

As cores estão disponíveis no Tailwind:
- `psiloup-cyan` (#00E6FF)
- `psiloup-magenta` (#FF2F92)
- `psiloup-purple` (#A24BD8)
- `psiloup-navy` (#0D1B2A)

## 📚 Próximos Passos

1. Adaptar todos os data fetchers para nosso backend
2. Migrar componentes de cart e checkout
3. Aplicar branding visual completo
4. Testar fluxo completo
5. Deploy no Railway

## 🔗 Links Úteis

- [Railway Docs](https://docs.railway.app)
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Docs](https://expressjs.com)
