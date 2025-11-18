# 🔧 Como Configurar DNS na Hostinger para Railway

## ⚠️ Problema: DNS_PROBE_FINISHED_NXDOMAIN

Este erro significa que o DNS não está resolvendo o domínio `psiloup.com.br`. Isso acontece quando:
- O domínio não está configurado no DNS da Hostinger
- O CNAME não está apontando corretamente para o Railway
- A propagação DNS ainda não ocorreu (pode levar até 48h)

---

## 📋 Passo a Passo Completo

### **PASSO 1: Obter o CNAME do Railway**

1. Acesse o Railway: https://railway.app
2. Vá no serviço do **Frontend** (`psiloup-production/front`)
3. Clique em **Settings** → **Networking** (ou **Domains**)
4. Clique em **+ Custom Domain** ou **Add Domain**
5. Digite: `psiloup.com.br`
6. O Railway vai gerar um **CNAME** para você, algo como:
   - `xxxxx.up.railway.app` ou
   - `xxxxx.railway.app`
   
   **ANOTE ESSE CNAME!** Você vai precisar dele no próximo passo.

---

### **PASSO 2: Configurar DNS na Hostinger**

1. Acesse o painel da Hostinger: https://hpanel.hostinger.com
2. Vá em **Domínios** → Selecione `psiloup.com.br`
3. Clique em **Gerenciar DNS** ou **DNS / Nameservers**
4. Você verá uma lista de registros DNS

#### **Opção A: Se você NÃO tem outros registros importantes**

**Para o domínio raiz (`psiloup.com.br`):**
- **Tipo:** `CNAME`
- **Nome:** `@` (ou deixe vazio, dependendo da interface)
- **Valor:** `xxxxx.up.railway.app` (o CNAME que você copiou do Railway)
- **TTL:** `3600` (ou deixe o padrão)

**Para o subdomínio `www` (`www.psiloup.com.br`):**
- **Tipo:** `CNAME`
- **Nome:** `www`
- **Valor:** `xxxxx.up.railway.app` (o mesmo CNAME do Railway)
- **TTL:** `3600` (ou deixe o padrão)

#### **Opção B: Se você JÁ tem registros A ou outros importantes**

⚠️ **CUIDADO:** Se você já tem um registro `A` para `@`, você precisa **remover** ou **substituir** por um `CNAME`.

**IMPORTANTE:** Você **NÃO pode** ter um registro `A` e um `CNAME` para o mesmo nome ao mesmo tempo!

**Solução:**
1. Remova o registro `A` existente para `@` (se houver)
2. Adicione o `CNAME` conforme descrito acima

---

### **PASSO 3: Configurar DNS para o Backend (api.psiloup.com.br)**

1. No Railway, vá no serviço do **Backend** (`psiloupback`)
2. **Settings** → **Networking** → **+ Custom Domain**
3. Digite: `api.psiloup.com.br`
4. Copie o CNAME gerado

5. Na Hostinger, adicione:
   - **Tipo:** `CNAME`
   - **Nome:** `api`
   - **Valor:** `yyyyy.up.railway.app` (o CNAME do backend)
   - **TTL:** `3600`

---

### **PASSO 4: Aguardar Propagação DNS**

⏰ **A propagação DNS pode levar de 5 minutos a 48 horas**, mas geralmente acontece em 1-2 horas.

**Como verificar se está funcionando:**

1. **Ferramenta online:**
   - Acesse: https://www.whatsmydns.net
   - Digite: `psiloup.com.br`
   - Selecione: `CNAME`
   - Verifique se aparece o CNAME do Railway em vários servidores DNS

2. **Via terminal (Windows PowerShell):**
   ```powershell
   nslookup psiloup.com.br
   ```
   
   Deve retornar algo como:
   ```
   Non-authoritative answer:
   psiloup.com.br    canonical name = xxxxx.up.railway.app
   ```

3. **Teste direto:**
   - Tente acessar: `https://psiloup.com.br`
   - Se ainda não funcionar, aguarde mais um pouco

---

## 🔍 Verificações Importantes

### ✅ Checklist DNS:

- [ ] CNAME configurado na Hostinger para `@` (domínio raiz)
- [ ] CNAME configurado na Hostinger para `www`
- [ ] CNAME configurado na Hostinger para `api`
- [ ] Removidos registros `A` conflitantes (se houver)
- [ ] Aguardado propagação DNS (verificar com whatsmydns.net)

### ✅ Checklist Railway:

- [ ] Domínio `psiloup.com.br` adicionado no Railway (Frontend)
- [ ] Domínio `www.psiloup.com.br` adicionado no Railway (Frontend)
- [ ] Domínio `api.psiloup.com.br` adicionado no Railway (Backend)
- [ ] Status do domínio mostra "Setup complete" ou "Active"

---

## 🆘 Problemas Comuns

### **Problema 1: "CNAME já existe"**
- Verifique se já existe um CNAME para `@` ou `www`
- Se existir, edite para usar o CNAME do Railway
- Se não conseguir editar, remova e crie novamente

### **Problema 2: "Não posso criar CNAME para @ (domínio raiz)"**
- Alguns provedores DNS não permitem CNAME no domínio raiz
- **Solução:** Use um registro `A` apontando para o IP do Railway
- Para obter o IP, faça:
  ```powershell
  nslookup xxxxx.up.railway.app
  ```
- Use o IP retornado no registro `A`

### **Problema 3: "DNS ainda não propagou após 24h"**
- Verifique se o CNAME está correto na Hostinger
- Verifique se o domínio está configurado corretamente no Railway
- Limpe o cache DNS do seu computador:
  ```powershell
  ipconfig /flushdns
  ```
- Tente acessar de outro dispositivo/rede

### **Problema 4: "Erro SSL/HTTPS"**
- O Railway configura SSL automaticamente
- Aguarde alguns minutos após o DNS propagar
- Se não funcionar, verifique se o domínio está "Active" no Railway

---

## 📞 Teste Final

Após configurar tudo e aguardar a propagação:

1. **Teste o domínio:**
   ```bash
   curl https://psiloup.com.br
   ```
   Deve retornar HTML do site (não erro DNS)

2. **Teste o backend:**
   ```bash
   curl https://api.psiloup.com.br/api/health
   ```
   Deve retornar: `{"ok":true}`

3. **Teste no navegador:**
   - Abra: `https://psiloup.com.br`
   - Deve carregar o site normalmente

---

## 🎯 Resumo Rápido

1. ✅ Adicione `psiloup.com.br` no Railway (Frontend) → Copie o CNAME
2. ✅ Adicione `api.psiloup.com.br` no Railway (Backend) → Copie o CNAME
3. ✅ Na Hostinger, configure CNAME:
   - `@` → CNAME do frontend
   - `www` → CNAME do frontend
   - `api` → CNAME do backend
4. ⏳ Aguarde propagação DNS (1-48h)
5. ✅ Teste: `https://psiloup.com.br`

---

## 📚 Links Úteis

- [Railway DNS Docs](https://docs.railway.app/networking/custom-domains)
- [Hostinger DNS Guide](https://support.hostinger.com/en/articles/1583299-how-to-manage-dns-records)
- [Verificar Propagação DNS](https://www.whatsmydns.net)



