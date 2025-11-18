# 🧪 Teste Local - PsiloUp

## ✅ Servidores Iniciados

Os servidores foram iniciados em janelas separadas do PowerShell:

### Backend
- **URL:** http://localhost:3000
- **Health Check:** http://localhost:3000/health
- **API:** http://localhost:3000/api

### Frontend
- **URL:** http://localhost:8000
- **Status:** Compilando (pode levar alguns minutos na primeira vez)

---

## 🔍 Como Verificar

### 1. Verificar Backend
Abra no navegador ou use curl:
```bash
# Health check
curl http://localhost:3000/health

# Lista de produtos
curl http://localhost:3000/api/catalog/products
```

### 2. Verificar Frontend
Abra no navegador:
```
http://localhost:8000
```

---

## ⚙️ Configurações Aplicadas

### Backend (`back/src/app.js`)
- ✅ CORS configurado para aceitar `http://localhost:8000`
- ✅ Porta: 3000 (padrão)
- ✅ Banco de dados: SQLite (`./data.sqlite`)

### Frontend (`front/`)
- ✅ API URL: `http://localhost:3000/api` (via `NEXT_PUBLIC_API_URL`)
- ✅ Base URL: `http://localhost:8000` (via `NEXT_PUBLIC_BASE_URL`)
- ✅ Porta: 8000

---

## 📝 Variáveis de Ambiente

### Backend (`.env` - se necessário)
```
PORT=3000
NODE_ENV=development
JWT_SECRET=dev-secret-key-local
DB_PATH=./data.sqlite
```

### Frontend (`.env.local` - se necessário)
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

---

## 🐛 Troubleshooting

### Backend não inicia
1. Verifique se a porta 3000 está livre
2. Verifique os logs na janela do PowerShell do backend
3. Verifique se o banco de dados existe (`back/data.sqlite`)

### Frontend não compila
1. Aguarde alguns minutos (primeira compilação é mais lenta)
2. Verifique os logs na janela do PowerShell do frontend
3. Verifique se todas as dependências estão instaladas:
   ```bash
   cd front
   yarn install
   ```

### Frontend não conecta ao backend
1. Verifique se o backend está rodando em `http://localhost:3000`
2. Verifique se o CORS está configurado corretamente
3. Verifique o console do navegador (F12) para erros

---

## 🚀 Próximos Passos

1. ✅ Verificar se o backend está respondendo
2. ✅ Verificar se o frontend está compilando
3. ✅ Testar acessar produtos no frontend
4. ✅ Testar adicionar ao carrinho
5. ✅ Testar checkout

---

## 📞 Comandos Úteis

### Parar os servidores
- Feche as janelas do PowerShell ou pressione `Ctrl+C` em cada uma

### Reiniciar
- Execute novamente o script `iniciar-local.bat` ou os comandos PowerShell

### Ver logs
- Os logs aparecem nas janelas do PowerShell abertas
