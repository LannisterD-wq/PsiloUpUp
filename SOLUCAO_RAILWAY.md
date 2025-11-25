# 🚀 Solução para Problemas no Railway

## ✅ Correções Aplicadas

### 1. **Comando Start do Frontend Corrigido**
- ❌ **Antes:** `next start -p $PORT` (incorreto)
- ✅ **Agora:** `next start` (Next.js usa automaticamente a variável `PORT`)

**Arquivos corrigidos:**
- `front/package.json`
- `psiloup-production/front/package.json`

---

## ⚠️ Ações Necessárias no Railway

### **PASSO 1: Verificar Root Directory**

#### Frontend (`psiloup-production/front`):
1. Acesse o serviço no Railway
2. **Settings** → **Service Settings**
3. Verifique **Root Directory**:
   - Se seu repositório tem a estrutura `psiloup-production/front`, use: `psiloup-production/front`
   - Se seu repositório tem apenas `front`, use: `front`

#### Backend (`psiloupback`):
1. Acesse o serviço no Railway
2. **Settings** → **Service Settings**
3. Verifique **Root Directory**:
   - Deve ser: `back`

---

### **PASSO 2: Verificar Build e Start Commands**

#### Frontend:
- **Build Command:** `yarn install && yarn build`
- **Start Command:** `yarn start` (já está no railway.json)

#### Backend:
- **Build Command:** `npm install`
- **Start Command:** `npm start`

---

### **PASSO 3: Verificar Variáveis de Ambiente**

#### Frontend:
```
NEXT_PUBLIC_API_URL=https://api.psiloup.com.br/api
NEXT_PUBLIC_BASE_URL=https://psiloup.com.br
```

#### Backend:
```
NODE_ENV=production
JWT_SECRET=<sua-chave-secreta-aleatoria>
DB_PATH=/tmp/data.sqlite
CORS_ORIGIN=https://psiloup.com.br
FRONTEND_URL=https://psiloup.com.br
```

**⚠️ IMPORTANTE:** Não adicione a variável `PORT` manualmente. O Railway define automaticamente.

---

### **PASSO 4: Fazer Deploy das Correções**

1. **Commit e Push:**
   ```bash
   git add front/package.json psiloup-production/front/package.json
   git commit -m "fix: corrige comando start do Next.js"
   git push origin main
   ```

2. **O Railway fará deploy automaticamente**

3. **Verifique os logs:**
   - Acesse o serviço no Railway
   - Vá em **Deployments**
   - Clique no deployment mais recente
   - Veja os logs para verificar se iniciou corretamente

---

## 🔍 Como Diagnosticar Problemas

### **Teste 1: Backend está funcionando?**
```bash
curl https://api.psiloup.com.br/api/health
```
**Resposta esperada:** `{"ok":true}`

Se não funcionar:
- Verifique os logs do backend no Railway
- Verifique se o Root Directory está correto
- Verifique se o Build Command e Start Command estão corretos

### **Teste 2: Frontend está funcionando?**
Abra no navegador: `https://psiloup.com.br`

Se aparecer erro 502/503:
- Verifique os logs do frontend no Railway
- Verifique se o build foi concluído com sucesso
- Verifique se o Root Directory está correto

### **Teste 3: Frontend consegue acessar o backend?**
1. Abra o console do navegador (F12)
2. Vá na aba **Network**
3. Recarregue a página
4. Verifique se há erros de CORS ou 404

---

## 📋 Checklist Final

### Frontend:
- [ ] Root Directory configurado corretamente
- [ ] Build Command: `yarn install && yarn build`
- [ ] Start Command: `yarn start`
- [ ] `NEXT_PUBLIC_API_URL` configurada
- [ ] `NEXT_PUBLIC_BASE_URL` configurada
- [ ] Domínio `psiloup.com.br` configurado
- [ ] Deploy concluído com sucesso
- [ ] Site carrega sem erros

### Backend:
- [ ] Root Directory: `back`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] `NODE_ENV=production` configurada
- [ ] `JWT_SECRET` configurada
- [ ] Domínio `api.psiloup.com.br` configurado
- [ ] Deploy concluído com sucesso
- [ ] Endpoint `/api/health` responde

---

## 🆘 Se Ainda Não Funcionar

1. **Verifique os logs do Railway:**
   - Acesse **Deployments** → Clique no deployment → Veja os logs
   - Procure por erros como:
     - `Error: Cannot find module`
     - `Error: ENOENT: no such file or directory`
     - `Error: Command failed`

2. **Verifique a estrutura do repositório:**
   - Confirme que os arquivos estão no lugar correto
   - Verifique se o Root Directory no Railway corresponde à estrutura do repositório

3. **Teste localmente:**
   - Rode `yarn build && yarn start` no frontend
   - Rode `npm start` no backend
   - Verifique se funciona localmente antes de fazer deploy

---

## 📞 Próximos Passos

1. ✅ Commit e push das correções
2. ⏳ Aguardar deploy automático no Railway
3. ⏳ Verificar logs do deployment
4. ⏳ Testar `https://psiloup.com.br`
5. ⏳ Testar `https://api.psiloup.com.br/api/health`

Se após seguir todos os passos ainda não funcionar, compartilhe os logs do Railway para análise mais detalhada.





