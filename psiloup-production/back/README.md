# PsiloUp Backend API

Backend Node.js/Express para o marketplace PsiloUp.

## 🚀 Início Rápido

```bash
npm install
npm run dev
```

API rodando em `http://localhost:3000`

## 📦 Estrutura

```
back/
├── src/
│   ├── app.js              # Configuração Express
│   ├── config/             # Configurações (env, constants)
│   ├── controllers/        # Lógica de negócio
│   ├── db/                 # Sequelize setup
│   ├── middleware/         # Auth, etc
│   ├── models/             # Modelos Sequelize
│   ├── routes/             # Rotas da API
│   ├── services/           # Serviços externos (shipping, payment)
│   └── utils/              # Utilitários
├── index.js                # Entry point
└── package.json
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key
DB_PATH=./data.sqlite
CORS_ORIGIN=http://localhost:8000
```

## 📡 Endpoints Principais

- `GET /api/catalog/products` - Lista produtos
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `GET /api/account/addresses` - Endereços do usuário
- `POST /api/shipping/quote` - Cálculo de frete
- `POST /api/checkout/create` - Criar pedido

## 🚢 Deploy no Railway

1. Conecte o repositório no Railway
2. Configure **Root Directory** como `back`
3. Adicione as variáveis de ambiente
4. Deploy automático!

