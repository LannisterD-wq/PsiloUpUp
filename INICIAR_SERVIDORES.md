# 🚀 Como Iniciar os Servidores

## ⚠️ IMPORTANTE: Abra 2 Terminais Separados

### Terminal 1 - Backend

1. Abra o PowerShell ou Terminal
2. Navegue até a pasta:
   ```powershell
   cd "C:\Users\Ivan Gabriel Duarte\Documents\PsiloUp\back"
   ```
3. Inicie o servidor:
   ```powershell
   npm run dev
   ```

✅ Você deve ver: `Servidor iniciado em http://localhost:3000`

**DEIXE ESTE TERMINAL ABERTO!**

---

### Terminal 2 - Frontend

1. Abra **OUTRO** PowerShell ou Terminal (novo terminal!)
2. Navegue até a pasta:
   ```powershell
   cd "C:\Users\Ivan Gabriel Duarte\Documents\PsiloUp\front"
   ```
3. Inicie o servidor:
   ```powershell
   npm run dev
   ```

✅ Você deve ver algo como:
```
▲ Next.js 15.x.x
- Local:        http://localhost:8000
- Ready in Xs
```

**DEIXE ESTE TERMINAL ABERTO TAMBÉM!**

---

## 🌐 Acessar o Site

Depois que AMBOS os terminais mostrarem que estão rodando:

1. Abra seu navegador (Chrome, Edge, Firefox, etc.)
2. Digite na barra de endereço: **http://localhost:8000**
3. Pressione Enter

## ⚠️ Se Não Funcionar

### Backend não inicia?
- Verifique se você está na pasta `back`
- Verifique se rodou `npm install` antes
- Veja se há erros no terminal

### Frontend não inicia?
- Verifique se você está na pasta `front`
- Verifique se rodou `npm install` antes
- Veja se há erros no terminal

### Página em branco?
- Abra o DevTools (F12)
- Vá na aba "Console"
- Veja se há erros em vermelho
- Me mostre os erros

### Erro de conexão?
- Verifique se o backend está rodando (Terminal 1)
- Verifique se o frontend está rodando (Terminal 2)
- Ambos devem estar rodando ao mesmo tempo!

## 🎯 Resumo

1. Terminal 1: `cd back` → `npm run dev`
2. Terminal 2: `cd front` → `npm run dev`
3. Navegador: `http://localhost:8000`

**Ambos os terminais devem ficar abertos enquanto você testa!**

