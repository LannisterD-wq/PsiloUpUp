# 🚀 Comandos Git para Subir no GitHub

## ✅ Status Atual

Repositório remoto configurado: `https://github.com/LannisterD-wq/psiloupback.git`

## 📋 Arquivos Preparados para Commit

Os seguintes arquivos foram adicionados e estão prontos para commit:

- ✅ `psiloup-production/.gitignore` - Proteção de arquivos sensíveis
- ✅ `psiloup-production/ARQUIVOS_PARA_COMMIT.md` - Documentação
- ✅ `psiloup-production/CHECKLIST_COMMIT.md` - Checklist
- ✅ `psiloup-production/back/ENV_EXAMPLE.txt` - Exemplo de variáveis
- ✅ `psiloup-production/back/PESO_PRODUTOS.md` - Documentação atualizada
- ✅ `.gitignore` (raiz) - Atualizado para permitir psiloup-production

## 🎯 Próximos Passos

### 1. Verificar o que será commitado

```bash
cd "C:\Users\Ivan Gabriel Duarte\Documents\PsiloUp"
git status
```

### 2. Fazer o Commit

```bash
git commit -m "feat: versão de produção completa do PsiloUp

- Adicionado psiloup-production com backend e frontend completos
- Configurado .gitignore para proteger arquivos sensíveis
- Documentação completa de variáveis de ambiente
- Scripts de inicialização
- Assets e imagens organizados"
```

### 3. Fazer Push para o GitHub

```bash
git push origin main
```

## ⚠️ Verificações de Segurança

Antes de fazer push, certifique-se de que:

- [ ] Nenhum arquivo `.env` está sendo commitado
- [ ] Nenhum banco de dados `.sqlite` está sendo commitado
- [ ] Nenhum `node_modules/` está sendo commitado
- [ ] O `.gitignore` está funcionando corretamente

## 🔍 Verificar Arquivos Sensíveis

```bash
# Verificar se há arquivos .env sendo rastreados
git ls-files | Select-String "\.env$"

# Verificar se há bancos de dados sendo rastreados
git ls-files | Select-String "\.(sqlite|db)$"

# Verificar se há node_modules sendo rastreados
git ls-files | Select-String "node_modules"
```

Se algum desses comandos retornar resultados, **NÃO faça o commit** e verifique o `.gitignore`.

## 📦 Estrutura que será Commitada

```
psiloup-production/
├── .gitignore                    ✅ Proteção
├── iniciar.bat                   ✅ Script de inicialização
├── README.md                     ✅ Documentação
├── back/                         ✅ Backend completo
│   ├── src/                      ✅ Código fonte
│   ├── package.json              ✅ Dependências
│   └── ENV_EXAMPLE.txt           ✅ Exemplo de env
├── front-garanti/                ✅ Frontend completo
│   ├── src/                      ✅ Código fonte
│   ├── public/                   ✅ Assets públicos
│   └── package.json              ✅ Dependências
└── assets/                       ✅ Assets estáticos
```

## 🆘 Em Caso de Problemas

### Se precisar desfazer o último commit (antes do push):

```bash
git reset --soft HEAD~1
```

### Se precisar remover arquivos do staging:

```bash
git reset HEAD <arquivo>
```

### Se precisar ver o que mudou:

```bash
git diff --cached
```

