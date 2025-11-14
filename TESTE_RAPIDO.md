# ⚡ Teste Rápido - 3 Passos

## ✅ Status: TUDO PRONTO!

- ✅ Todas as páginas criadas
- ✅ Todas as funcionalidades implementadas
- ✅ Imagens copiadas
- ✅ Arquivos de configuração prontos

## 🚀 Teste em 3 Passos

### Passo 1: Backend (Terminal 1)

```powershell
cd back
npm run dev
```

✅ Deve aparecer: `Servidor iniciado em http://localhost:3000`

### Passo 2: Frontend (Terminal 2)

```powershell
cd front
yarn dev
```

✅ Deve aparecer: `Ready on http://localhost:8000`

### Passo 3: Abrir no Navegador

Acesse: **http://localhost:8000**

## 🧪 Teste Rápido (2 minutos)

1. ✅ **Home**: Veja os produtos na página inicial
2. ✅ **Carrinho**: Clique no ícone do carrinho (canto superior direito)
3. ✅ **Adicionar**: Clique em "Adicionar ao carrinho" em qualquer produto
4. ✅ **Login**: Clique em "Minha conta" → crie uma conta
5. ✅ **Checkout**: Vá para `/checkout` → digite CEP → calcule frete

## 📋 Páginas para Testar

- `http://localhost:8000` - Home
- `http://localhost:8000/produtos/UP-MIND` - Produto
- `http://localhost:8000/checkout` - Checkout
- `http://localhost:8000/login` - Login
- `http://localhost:8000/account` - Conta
- `http://localhost:8000/quem-somos` - Quem somos
- `http://localhost:8000/formulacao` - Formulação

## ⚠️ Problemas?

**Backend não inicia?**
- Verifique se a porta 3000 está livre
- Verifique se tem `back/.env` criado

**Frontend não inicia?**
- Verifique se a porta 8000 está livre
- Verifique se tem `front/.env.local` criado (já criamos!)

**Produtos não aparecem?**
- Verifique se o backend está rodando
- Abra o DevTools (F12) e veja se há erros

## 🎯 Pronto para Testar!

Abra os 2 terminais e rode os comandos acima. Em 30 segundos você estará testando!

