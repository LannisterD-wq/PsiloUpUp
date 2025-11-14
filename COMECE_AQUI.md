# 🚀 COMECE AQUI - Teste do PsiloUp

## ✅ Tudo Pronto!

Todas as páginas e funcionalidades foram criadas:
- ✅ Home com produtos
- ✅ Páginas de produto individuais
- ✅ Carrinho funcional
- ✅ Login e registro
- ✅ Checkout completo
- ✅ Área do cliente
- ✅ Páginas institucionais (Quem Somos, Formulação)
- ✅ Imagens copiadas

## 🧪 Como Testar AGORA

### 1️⃣ Abra 2 Terminais

**Terminal 1 - Backend:**
```bash
cd back
npm install
```

Crie `back/.env`:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=dev-secret-key
DB_PATH=./data.sqlite
CORS_ORIGIN=http://localhost:8000
```

```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd front
yarn install
```

Crie `front/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

```bash
yarn dev
```

### 2️⃣ Acesse o Site

Abra no navegador: **http://localhost:8000**

### 3️⃣ Teste Rápido

1. **Home**: Veja os produtos
2. **Carrinho**: Clique no ícone do carrinho, adicione produtos
3. **Login**: Acesse `/login`, crie uma conta
4. **Checkout**: Adicione produtos, vá para `/checkout`, calcule frete
5. **Account**: Acesse `/account`, veja pedidos e endereços

## 📋 Páginas Disponíveis

- `/` - Home
- `/produtos/UP-MIND` - Produto UP MIND
- `/produtos/UP-BURN` - Produto UP BURN
- `/produtos/STACK-DUPLO` - Stack Dupla
- `/checkout` - Checkout
- `/login` - Login/Registro
- `/account` - Área do cliente
- `/quem-somos` - Quem somos
- `/formulacao` - Formulação

## ⚠️ Se Der Erro

1. **Backend não inicia**: Verifique se a porta 3000 está livre
2. **Frontend não inicia**: Verifique se a porta 8000 está livre
3. **API não conecta**: Verifique se o backend está rodando e o `.env.local` está correto
4. **Produtos não aparecem**: Verifique se o backend tem produtos no banco (rode `npm run dev` no backend primeiro)

## 🎯 Próximo Passo

Depois de testar localmente, siga `DEPLOY_RAILWAY.md` para fazer deploy!

---

**Dica**: Deixe os 2 terminais abertos enquanto testa. Se precisar parar, use `Ctrl+C` em cada terminal.

