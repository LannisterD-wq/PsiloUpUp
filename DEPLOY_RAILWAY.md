# 🚀 Deploy no Railway - Guia Rápido

## Configuração Monorepo (Backend + Frontend no mesmo projeto)

### Passo 1: Criar Projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. Selecione este repositório (`PsiloUp`)

### Passo 2: Adicionar Serviço Backend

1. No projeto Railway, clique em **+ New** → **GitHub Repo**
2. Selecione o mesmo repositório
3. Nas configurações do serviço:
   - **Name**: `psiloup-backend`
   - **Root Directory**: `back`
   - Railway detecta automaticamente Node.js

4. **Variáveis de Ambiente** (Settings → Variables):
   ```
   PORT=3000
   NODE_ENV=production
   JWT_SECRET=<gere-uma-string-aleatoria-aqui>
   DB_PATH=/tmp/data.sqlite
   FRONTEND_URL=https://psiloup.com.br
   ```

### Passo 3: Adicionar Serviço Frontend

1. No mesmo projeto, clique em **+ New** → **GitHub Repo**
2. Selecione o mesmo repositório
3. Nas configurações do serviço:
   - **Name**: `psiloup-frontend`
   - **Root Directory**: `front`
   - Railway detecta automaticamente Next.js

4. **Variáveis de Ambiente** (Settings → Variables):
   ```
   NEXT_PUBLIC_API_URL=https://psiloup-backend-production.up.railway.app/api
   NEXT_PUBLIC_BASE_URL=https://psiloup.com.br
   ```
   ⚠️ **Importante**: Substitua `psiloup-backend-production.up.railway.app` pela URL real do seu backend Railway

### Passo 4: Configurar Domínio Personalizado

1. No serviço **Frontend**, vá em **Settings** → **Domains**
2. Clique em **Add Custom Domain**
3. Adicione:
   - `psiloup.com.br`
   - `www.psiloup.com.br`
4. Railway fornecerá um **CNAME** (ex: `xxxxx.railway.app`)

### Passo 5: Configurar DNS na Hostinger

1. Acesse o painel da Hostinger
2. Vá em **DNS** / **Gerenciar DNS**
3. Adicione registros **CNAME**:
   - **Nome**: `@` (ou deixe vazio)
   - **Valor**: `xxxxx.railway.app` (o que Railway forneceu)
   - **TTL**: 3600
   
   - **Nome**: `www`
   - **Valor**: `xxxxx.railway.app`
   - **TTL**: 3600

4. Aguarde propagação DNS (24-48h)

### Passo 6: Atualizar Variável de Ambiente do Frontend

Após o domínio estar funcionando, atualize:
```
NEXT_PUBLIC_BASE_URL=https://psiloup.com.br
```

## ✅ Verificação

1. Backend: Acesse `https://psiloup-backend-production.up.railway.app/health`
   - Deve retornar: `{"ok":true}`

2. Frontend: Acesse `https://psiloup.com.br`
   - Deve carregar o site

3. API: Teste `https://psiloup.com.br/api/catalog/products`
   - Deve retornar lista de produtos

## 🔧 Troubleshooting

### Backend não inicia
- Verifique se `JWT_SECRET` está definido
- Veja os logs em Railway → Deployments

### Frontend não conecta ao backend
- Verifique `NEXT_PUBLIC_API_URL` (deve ser a URL do backend Railway)
- Verifique CORS no backend (deve incluir a URL do frontend)

### Domínio não funciona
- Aguarde propagação DNS (pode levar até 48h)
- Verifique se o CNAME está correto na Hostinger
- Use ferramentas como [whatsmydns.net](https://www.whatsmydns.net) para verificar

## 💰 Custos

- **Railway Hobby**: $5/mês grátis, depois $0.000463/GB-hora
- **Domínio**: Continua na Hostinger (sem custo adicional)

---

**Dica**: Use o plano Hobby do Railway para começar. É suficiente para um e-commerce pequeno/médio.

