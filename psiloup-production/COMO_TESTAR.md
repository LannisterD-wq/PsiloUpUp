# 🚀 Como Testar o Site PsiloUp

## ⚠️ IMPORTANTE: Portas

O **backend** e o **frontend** não podem usar a mesma porta!

- **Backend**: Porta `3000` (http://localhost:3000)
- **Frontend**: Porta `3001` (http://localhost:3001)

## 📋 Passo a Passo:

### 1️⃣ Iniciar o Backend

Abra um terminal e execute:

```bash
cd psiloup-production/back
npm install
npm run dev
```

O backend ficará rodando em: **http://localhost:3000**

### 2️⃣ Iniciar o Frontend

Abra **OUTRO** terminal e execute:

```bash
cd psiloup-production/front-garanti
npm install --legacy-peer-deps
npm run dev
```

O frontend ficará rodando em: **http://localhost:3001** (ou 3000 se configurado diferente)

### 3️⃣ Acessar o Site

Abra o navegador em: **http://localhost:3001**

## 🔧 Se não abrir:

1. **Verifique se as portas estão livres:**
   - Backend: http://localhost:3000/api/catalog/products
   - Frontend: http://localhost:3001

2. **Verifique os logs nos terminais** para erros

3. **Confirme que o .env.local está correto:**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

## 🎯 Teste Rápido:

1. Acesse http://localhost:3001
2. Vá em `/sign-up` para cadastrar
3. Faça login em `/sign-in`
4. Adicione produtos ao carrinho
5. Veja o carrinho em `/shopping-cart`

## ⚡ Script Rápido (Windows):

Crie um arquivo `iniciar.bat` na raiz:

```batch
@echo off
echo Iniciando Backend...
start "Backend" cmd /k "cd psiloup-production\back && npm run dev"
timeout /t 3
echo Iniciando Frontend...
start "Frontend" cmd /k "cd psiloup-production\front-garanti && npm run dev"
echo Aguarde alguns segundos e acesse: http://localhost:3001
pause
```

