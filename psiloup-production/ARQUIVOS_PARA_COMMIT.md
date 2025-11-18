# 📋 Arquivos Importantes para Commit no GitHub

Este documento lista todos os arquivos e pastas que **DEVEM** ser commitados no repositório Git.

## ✅ O QUE DEVE SER COMMITADO

### 📁 Estrutura Principal
```
psiloup-production/
├── .gitignore                    ✅ NOVO - Arquivo de exclusão do Git
├── iniciar.bat                   ✅ Script para iniciar servidores
├── README.md                     ✅ Documentação principal
├── INICIO_RAPIDO.md             ✅ Guia de início rápido
├── PLANO_ADAPTACAO.md           ✅ Documentação do plano
├── PLANO_MELHORIAS.md           ✅ Documentação de melhorias
├── ESTRUTURA_COMPLETA.md        ✅ Documentação da estrutura
├── COMO_TESTAR.md               ✅ Guia de testes
├── ANALISE_GARANTI.md           ✅ Análise do frontend
│
├── assets/                       ✅ Assets estáticos
│   ├── css/                     ✅ Estilos CSS
│   ├── images/                  ✅ Imagens do projeto
│   └── fonts/                   ✅ Fontes (se houver)
│
├── back/                         ✅ Backend Node.js/Express
│   ├── package.json             ✅ Dependências
│   ├── index.js                 ✅ Entry point
│   ├── ENV_EXAMPLE.txt          ✅ NOVO - Exemplo de variáveis de ambiente
│   ├── README.md                ✅ Documentação do backend
│   ├── PESO_PRODUTOS.md         ✅ Documentação de pesos
│   ├── railway.json             ✅ Configuração Railway (se houver)
│   ├── public_html/             ✅ Arquivos estáticos (se houver)
│   └── src/                     ✅ Código fonte
│       ├── app.js               ✅ Configuração Express
│       ├── config/              ✅ Configurações
│       ├── controllers/         ✅ Controllers
│       ├── db/                  ✅ Configuração banco
│       ├── middleware/          ✅ Middlewares
│       ├── models/              ✅ Modelos Sequelize
│       ├── routes/              ✅ Rotas da API
│       ├── services/            ✅ Serviços externos
│       └── utils/               ✅ Utilitários
│
└── front-garanti/                ✅ Frontend Next.js
    ├── package.json             ✅ Dependências
    ├── next.config.ts           ✅ Configuração Next.js
    ├── tsconfig.json            ✅ Configuração TypeScript
    ├── tailwind.config.js       ✅ Configuração Tailwind
    ├── postcss.config.mjs       ✅ Configuração PostCSS
    ├── eslint.config.mjs        ✅ Configuração ESLint
    ├── components.json          ✅ Configuração componentes
    ├── README.md                ✅ Documentação do frontend
    ├── COMO_USAR.md             ✅ Guia de uso
    ├── ADAPTACAO_STATUS.md      ✅ Status de adaptação
    ├── INTEGRACAO_COMPLETA.md   ✅ Documentação de integração
    ├── LICENSE                  ✅ Licença
    ├── public/                  ✅ Arquivos públicos
    │   ├── images/              ✅ Imagens
    │   ├── banners/             ✅ Banners
    │   ├── categories/          ✅ Categorias
    │   └── products/            ✅ Produtos
    └── src/                     ✅ Código fonte
        ├── app/                 ✅ App Router (Next.js 15)
        ├── components/          ✅ Componentes React
        └── lib/                 ✅ Bibliotecas e utilitários
```

## ❌ O QUE NÃO DEVE SER COMMITADO

### 🚫 Arquivos e Pastas Excluídos (via .gitignore)

1. **Dependências**
   - `node_modules/` - Instalado via `npm install`
   - `package-lock.json` - Gerado automaticamente
   - `yarn.lock` - Gerado automaticamente
   - `pnpm-lock.yaml` - Gerado automaticamente

2. **Variáveis de Ambiente**
   - `.env` - Contém informações sensíveis
   - `.env.local` - Configurações locais
   - `.env.*.local` - Outras variantes locais

3. **Banco de Dados**
   - `*.sqlite` - Banco de dados SQLite
   - `*.sqlite3` - Banco de dados SQLite3
   - `*.db` - Outros bancos de dados
   - `back/data.sqlite` - Banco de dados do backend

4. **Build e Cache**
   - `.next/` - Build do Next.js
   - `out/` - Output do build
   - `dist/` - Distribuição
   - `build/` - Build files
   - `.cache/` - Cache
   - `.turbo/` - Turbo cache

5. **Logs**
   - `logs/` - Pasta de logs
   - `*.log` - Arquivos de log

6. **Sistema Operacional**
   - `.DS_Store` - macOS
   - `Thumbs.db` - Windows
   - `desktop.ini` - Windows

7. **IDEs**
   - `.vscode/` - Configurações VS Code
   - `.idea/` - Configurações IntelliJ
   - `*.swp`, `*.swo` - Vim

## 🔐 Variáveis de Ambiente Necessárias

### Backend (`back/.env`)
Veja o arquivo `back/ENV_EXAMPLE.txt` para todas as variáveis necessárias.

**Principais:**
- `PORT` - Porta do servidor (padrão: 3000)
- `JWT_SECRET` - Secret para tokens JWT
- `FRONTEND_URL` - URL do frontend (para CORS)
- `SHIPPING_ORIGIN_CEP` - CEP de origem para frete

### Frontend (`front-garanti/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📝 Comandos para Preparar o Commit

```bash
# 1. Navegar para a pasta do projeto
cd psiloup-production

# 2. Verificar status do Git
git status

# 3. Adicionar todos os arquivos importantes (respeitando .gitignore)
git add .

# 4. Verificar o que será commitado
git status

# 5. Fazer commit
git commit -m "feat: versão de produção do PsiloUp"

# 6. Push para o GitHub
git push origin main
```

## ⚠️ IMPORTANTE

1. **NUNCA** commite arquivos `.env` com valores reais
2. **NUNCA** commite `node_modules/` (muito pesado)
3. **NUNCA** commite bancos de dados (`.sqlite`, `.db`)
4. **SEMPRE** verifique o `.gitignore` antes de commitar
5. **SEMPRE** use `git status` para verificar o que será commitado

## 📦 Estrutura Mínima para Funcionar

Após clonar o repositório, execute:

```bash
# Backend
cd back
npm install
cp ENV_EXAMPLE.txt .env
# Edite o .env com suas configurações
npm run dev

# Frontend
cd ../front-garanti
npm install
# Crie .env.local com NEXT_PUBLIC_API_URL
npm run dev
```

