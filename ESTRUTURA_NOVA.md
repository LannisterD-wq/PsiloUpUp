# ✅ Nova Estrutura Criada

## 📁 Estrutura de Pastas

```
PsiloUp/
├── back/                    # ✅ Backend Node.js/Express
│   ├── src/                # Código fonte
│   ├── index.js            # Entry point
│   ├── package.json         # Dependências
│   ├── railway.json        # Config Railway
│   ├── .gitignore         # Arquivos ignorados
│   └── README.md           # Documentação
│
├── front/                   # ✅ Frontend Next.js
│   ├── src/                # Código fonte (App Router)
│   ├── public/             # Assets estáticos
│   ├── package.json        # Dependências
│   ├── railway.json        # Config Railway
│   ├── .gitignore         # Arquivos ignorados
│   └── README.md           # Documentação
│
├── deployment/              # ⚠️ Código legado (pode remover depois)
├── server/                  # ⚠️ Código legado (pode remover depois)
└── README.md                # Documentação principal
```

## 🚀 Próximos Passos

### 1. Testar Localmente

**Backend:**
```bash
cd back
npm install
npm run dev
```

**Frontend:**
```bash
cd front
yarn install
yarn dev
```

### 2. Deploy no Railway

#### Backend:
1. Railway → New Project → GitHub
2. Selecione este repositório
3. **Root Directory**: `back`
4. Adicione variáveis de ambiente (veja `back/README.md`)
5. Deploy automático!

#### Frontend:
1. Railway → New Project → GitHub
2. Selecione este repositório
3. **Root Directory**: `front`
4. Adicione variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL` → URL do backend Railway
   - `NEXT_PUBLIC_BASE_URL` → URL do frontend
5. Deploy automático!

### 3. Configurar Domínio

1. No Railway (frontend): Settings → Domains → Add `psiloup.com.br`
2. Na Hostinger: Adicione CNAME apontando para Railway
3. Aguarde propagação DNS (24-48h)

## 📝 Tarefas Pendentes

- [ ] Adaptar Next.js para usar nosso backend (não Medusa)
- [ ] Aplicar cores/branding PsiloUp
- [ ] Migrar imagens e assets do `deployment/images/` para `front/public/`
- [ ] Testar fluxo completo (login, cart, checkout)
- [ ] Remover código legado (`deployment/`, `server/`) após migração completa

## 🔧 Arquivos de Configuração Criados

- ✅ `back/railway.json` - Config Railway para backend
- ✅ `front/railway.json` - Config Railway para frontend
- ✅ `back/.gitignore` - Ignora node_modules, .env, etc
- ✅ `front/.gitignore` - Ignora .next, node_modules, etc
- ✅ `back/README.md` - Documentação backend
- ✅ `front/README.md` - Documentação frontend
- ✅ `README.md` - Documentação geral

## 💡 Dicas

- **Desenvolvimento**: Use `npm run dev` (back) e `yarn dev` (front)
- **Produção**: Railway faz build e deploy automático
- **Domínio**: Mantém na Hostinger, só aponta DNS para Railway
- **Banco de Dados**: SQLite em dev, PostgreSQL recomendado em produção

---

**Status**: ✅ Estrutura pronta para desenvolvimento e deploy!

