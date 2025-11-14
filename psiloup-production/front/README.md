# PsiloUp Frontend

Frontend Next.js baseado no Medusa Starter, adaptado para PsiloUp.

## 🚀 Início Rápido

```bash
yarn install
yarn dev
```

Frontend rodando em `http://localhost:8000`

## 📦 Estrutura

```
front/
├── src/
│   ├── app/                # App Router (Next.js 15)
│   ├── lib/                # Utilitários e data fetching
│   ├── modules/            # Componentes React
│   ├── styles/             # CSS global
│   └── types/              # TypeScript types
├── public/                 # Assets estáticos
└── package.json
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz com:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

## 🎨 Customização

- **Cores**: Edite `tailwind.config.js` e `src/styles/globals.css`
- **Componentes**: Modifique em `src/modules/`
- **Páginas**: Adicione em `src/app/`

## 🚢 Deploy no Railway

1. Conecte o repositório no Railway
2. Configure **Root Directory** como `front`
3. Adicione as variáveis de ambiente
4. Deploy automático!

## 📝 Próximos Passos

- [ ] Remover dependências do Medusa
- [ ] Adaptar data fetching para nosso backend
- [ ] Aplicar branding PsiloUp (cores, logo)
- [ ] Migrar imagens e assets
