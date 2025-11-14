# 🧪 Guia de Teste Local - PsiloUp

## Passo 1: Preparar Backend

```bash
# Terminal 1
cd back
npm install
```

Criar arquivo `back/.env`:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=dev-secret-key-change-in-production
DB_PATH=./data.sqlite
CORS_ORIGIN=http://localhost:8000
```

```bash
npm run dev
```

✅ Backend rodando em `http://localhost:3000`

## Passo 2: Preparar Frontend

```bash
# Terminal 2
cd front
yarn install
```

Criar arquivo `front/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

```bash
yarn dev
```

✅ Frontend rodando em `http://localhost:8000`

## Passo 3: Testar Funcionalidades

### ✅ Home Page
1. Acesse `http://localhost:8000`
2. Verifique se os produtos aparecem
3. Clique em "Adicionar ao carrinho"
4. Verifique se o carrinho abre

### ✅ Carrinho
1. Clique no ícone do carrinho
2. Verifique se os produtos aparecem
3. Teste aumentar/diminuir quantidade
4. Teste remover item
5. Teste aplicar cupom (se tiver)

### ✅ Login/Registro
1. Acesse `http://localhost:8000/login`
2. Teste criar uma conta nova
3. Teste fazer login
4. Verifique se redireciona corretamente

### ✅ Checkout
1. Adicione produtos ao carrinho
2. Acesse `http://localhost:8000/checkout`
3. Verifique se está logado (senão, redireciona para login)
4. Digite um CEP e calcule frete
5. Selecione endereço de entrega
6. Clique em "Pagar com Mercado Pago"
7. Verifique se redireciona para o Mercado Pago

### ✅ Área do Cliente
1. Acesse `http://localhost:8000/account`
2. Verifique se aparece seus pedidos
3. Teste adicionar um endereço
4. Verifique se o endereço aparece na lista

### ✅ Páginas de Produto
1. Acesse `http://localhost:8000/produtos/UP-MIND`
2. Verifique se o produto aparece
3. Teste adicionar ao carrinho

### ✅ Páginas Institucionais
1. Acesse `http://localhost:8000/quem-somos`
2. Acesse `http://localhost:8000/formulacao`
3. Verifique se as páginas carregam

## 🔍 Verificar no Console

Abra o DevTools (F12) e verifique:
- ✅ Sem erros no console
- ✅ Requisições para API funcionando
- ✅ localStorage sendo usado corretamente

## 🐛 Problemas Comuns

### Backend não inicia
- Verifique se a porta 3000 está livre
- Verifique se o `.env` está correto
- Verifique se `npm install` foi executado

### Frontend não inicia
- Verifique se a porta 8000 está livre
- Verifique se `yarn install` foi executado
- Verifique se o `.env.local` está correto

### API não conecta
- Verifique se o backend está rodando
- Verifique `NEXT_PUBLIC_API_URL` no `.env.local`
- Verifique CORS no backend

### Carrinho não funciona
- Verifique localStorage no DevTools
- Verifique se os produtos estão sendo carregados
- Verifique erros no console

## ✅ Checklist Final

- [ ] Backend rodando sem erros
- [ ] Frontend rodando sem erros
- [ ] Home page carrega produtos
- [ ] Carrinho funciona
- [ ] Login/registro funciona
- [ ] Checkout funciona
- [ ] Área do cliente funciona
- [ ] Páginas de produto funcionam
- [ ] Páginas institucionais funcionam
- [ ] Sem erros no console

## 🚀 Próximo Passo: Deploy

Após testar localmente, siga o guia em `DEPLOY_RAILWAY.md` para fazer deploy no Railway.

