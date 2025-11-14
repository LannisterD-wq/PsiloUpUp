# Migração para Next.js - Guia de Hospedagem

## Situação Atual

- **Backend**: Node.js/Express no Railway ✅
- **Frontend**: HTML estático na Hostinger (plano PHP compartilhado)
- **Domínio**: `psiloup.com.br` gerenciado na Hostinger

## Por que não roda Next.js na Hostinger?

A Hostinger (plano atual) só suporta:
- PHP (PHP workers: 25)
- Arquivos estáticos (HTML, CSS, JS, imagens)

**Next.js precisa de Node.js** para:
- Rodar o servidor (`yarn start`)
- Fazer Server-Side Rendering (SSR)
- Processar rotas dinâmicas

## Solução Recomendada: Railway para Tudo

### Vantagens:
- ✅ Backend já está no Railway
- ✅ Frontend Next.js também no Railway (mesmo projeto ou separado)
- ✅ Gerenciamento unificado
- ✅ SSL automático
- ✅ Deploy automático via Git

### Como Configurar o Domínio:

1. **No Railway:**
   - Vá em Settings → Domains
   - Adicione `psiloup.com.br` e `www.psiloup.com.br`
   - Railway vai gerar um CNAME (ex: `xxxxx.railway.app`)

2. **Na Hostinger (DNS):**
   - Acesse o painel de DNS da Hostinger
   - Adicione um registro **CNAME**:
     - **Nome**: `@` (ou deixe vazio para o domínio raiz)
     - **Valor**: `xxxxx.railway.app` (o que Railway forneceu)
   - Para `www`, adicione outro CNAME:
     - **Nome**: `www`
     - **Valor**: `xxxxx.railway.app`

3. **Aguardar propagação DNS** (pode levar 24-48h)

### Alternativa: Vercel (Gratuito para começar)

Se preferir separar:
- **Frontend**: Vercel (especializado em Next.js, gratuito)
- **Backend**: Railway (já está lá)
- **Domínio**: Apontar para Vercel

## O que Vai Mudar?

### Arquivos:
- ❌ **Remover**: `deployment/*.html` (HTML estático antigo)
- ✅ **Manter**: `deployment/nextjs-starter-medusa-main/` (vira o novo frontend)
- ✅ **Manter**: `server/` (backend continua igual)

### Estrutura Final:
```
PsiloUp/
├── server/              # Backend Express (Railway)
├── frontend/            # Next.js (Railway ou Vercel)
│   └── (nextjs-starter-medusa-main movido para cá)
└── deployment/          # (pode ser removido depois)
```

### Deploy:
- **Backend**: `git push` → Railway detecta e faz deploy
- **Frontend**: `git push` → Railway/Vercel detecta e faz deploy

## Próximos Passos

1. ✅ Mover `nextjs-starter-medusa-main` para raiz como `frontend/`
2. ✅ Adaptar o Next.js para usar nosso backend (não Medusa)
3. ✅ Aplicar cores/branding PsiloUp
4. ✅ Configurar domínio no Railway
5. ✅ Atualizar DNS na Hostinger
6. ✅ Testar tudo funcionando

## Custos

- **Railway**: Plano Hobby (gratuito até $5/mês) ou Pro ($20/mês)
- **Vercel**: Plano Hobby (gratuito) ou Pro ($20/mês)
- **Hostinger**: Continua pagando só pelo domínio (se quiser manter)

---

**Resumo**: Não precisa mudar nada na Hostinger além do DNS. O domínio continua seu, só aponta para Railway/Vercel.

