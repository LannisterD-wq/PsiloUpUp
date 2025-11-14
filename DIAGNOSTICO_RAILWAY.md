# 🔍 Diagnóstico e Solução de Problemas - Railway

## Problemas Identificados e Soluções

### ✅ **PROBLEMA 1: Comando Start do Frontend Incorreto**

**Problema:** O comando `next start -p $PORT` está incorreto. O Next.js não aceita a flag `-p` com variável de ambiente dessa forma.

**Solução:** ✅ **CORRIGIDO** - Alterado para `next start` (Next.js usa automaticamente a variável `PORT` do ambiente)

**Arquivos corrigidos:**
- `front/package.json`
- `psiloup-production/front/package.json`

---

### ⚠️ **PROBLEMA 2: Configuração do Railway - Root Directory**

**Verificar no Railway:**

#### **Frontend (`psiloup-production/front`):**
1. Acesse o serviço no Railway
2. Vá em **Settings** → **Service Settings**
3. Verifique o **Root Directory**:
   - Se o repositório é `psiloupback`, o Root Directory deve ser: `psiloup-production/front`
   - OU se você tem uma estrutura diferente, ajuste conforme necessário

#### **Backend (`psiloupback`):**
1. Acesse o serviço no Railway
2. Vá em **Settings** → **Service Settings**
3. Verifique o **Root Directory**:
   - Se o repositório é `psiloupback`, o Root Directory deve ser: `back`
   - OU se você tem uma estrutura diferente, ajuste conforme necessário

---

### ⚠️ **PROBLEMA 3: Variáveis de Ambiente**

#### **Frontend - Verificar no Railway:**
```
NEXT_PUBLIC_API_URL=https://api.psiloup.com.br/api
NEXT_PUBLIC_BASE_URL=https://psiloup.com.br
PORT (Railway define automaticamente - não precisa adicionar)
```

#### **Backend - Verificar no Railway:**
```
PORT (Railway define automaticamente)
NODE_ENV=production
JWT_SECRET=<sua-chave-secreta>
DB_PATH=/tmp/data.sqlite
CORS_ORIGIN=https://psiloup.com.br
FRONTEND_URL=https://psiloup.com.br
```

**Importante:** O Railway define automaticamente a variável `PORT`. Não precisa adicionar manualmente.

---

### ⚠️ **PROBLEMA 4: Build Commands**

#### **Frontend:**
- **Build Command:** `yarn install && yarn build`
- **Start Command:** `yarn start` (já configurado no railway.json)

#### **Backend:**
- **Build Command:** `npm install`
- **Start Command:** `npm start`

---

### ⚠️ **PROBLEMA 5: CORS no Backend**

Verifique se o backend está permitindo requisições do frontend. O arquivo `back/src/app.js` já tem CORS configurado, mas verifique se `https://psiloup.com.br` está na lista de origens permitidas.

**Arquivo:** `back/src/app.js` (linhas 12-19)

---

## 📋 Checklist de Verificação

### No Railway - Frontend:
- [ ] Root Directory configurado corretamente
- [ ] Build Command: `yarn install && yarn build`
- [ ] Start Command: `yarn start`
- [ ] Variável `NEXT_PUBLIC_API_URL` configurada
- [ ] Variável `NEXT_PUBLIC_BASE_URL` configurada
- [ ] Domínio `psiloup.com.br` configurado e funcionando

### No Railway - Backend:
- [ ] Root Directory configurado corretamente
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Variável `NODE_ENV=production` configurada
- [ ] Variável `JWT_SECRET` configurada
- [ ] Variável `CORS_ORIGIN` configurada (ou verificar allowedOrigins no código)
- [ ] Domínio `api.psiloup.com.br` configurado e funcionando

### Testes:
- [ ] Backend responde em `https://api.psiloup.com.br/api/health`
- [ ] Frontend carrega em `https://psiloup.com.br`
- [ ] Frontend consegue fazer requisições para o backend
- [ ] Logs do Railway não mostram erros

---

## 🔧 Como Verificar os Logs no Railway

1. Acesse o serviço no Railway
2. Vá na aba **Deployments**
3. Clique no deployment mais recente
4. Veja os logs para identificar erros

**Erros comuns:**
- `Error: listen EADDRINUSE` → Porta já em uso (improvável no Railway)
- `Error: Cannot find module` → Dependências não instaladas
- `Error: ENOENT: no such file or directory` → Root Directory incorreto
- `Error: Command failed` → Build Command ou Start Command incorreto

---

## 🚀 Próximos Passos

1. **Commit e Push das correções:**
   ```bash
   git add front/package.json psiloup-production/front/package.json
   git commit -m "fix: corrige comando start do Next.js para usar PORT automaticamente"
   git push
   ```

2. **Verificar no Railway:**
   - O Railway deve fazer deploy automaticamente após o push
   - Verifique os logs do novo deployment
   - Teste se o frontend está funcionando

3. **Se ainda não funcionar:**
   - Verifique os logs do Railway
   - Confirme que o Root Directory está correto
   - Verifique se todas as variáveis de ambiente estão configuradas
   - Teste o endpoint `/health` do backend manualmente

---

## 📞 Teste Rápido

### Testar Backend:
```bash
curl https://api.psiloup.com.br/api/health
```
**Resposta esperada:** `{"ok":true}`

### Testar Frontend:
Abra no navegador: `https://psiloup.com.br`

Se aparecer erro 502/503, verifique os logs do Railway.

