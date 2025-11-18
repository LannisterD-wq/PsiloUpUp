# ✅ Checklist para Commit no GitHub

## 📋 Antes de Fazer Commit

### 1. Verificar Arquivos Sensíveis
- [ ] Nenhum arquivo `.env` está sendo commitado
- [ ] Nenhum banco de dados `.sqlite` está sendo commitado
- [ ] Nenhum `node_modules/` está sendo commitado
- [ ] Nenhuma senha ou token está hardcoded no código

### 2. Verificar Estrutura
- [ ] Backend (`back/`) está completo
- [ ] Frontend (`front-garanti/`) está completo
- [ ] Assets (`assets/`) estão incluídos
- [ ] Scripts (`iniciar.bat`) estão incluídos
- [ ] Documentação está atualizada

### 3. Arquivos Criados/Atualizados
- [x] `.gitignore` criado em `psiloup-production/`
- [x] `ENV_EXAMPLE.txt` criado em `back/`
- [x] `ARQUIVOS_PARA_COMMIT.md` criado
- [x] `.gitignore` da raiz atualizado (removida exclusão de `psiloup-production/`)

## 🚀 Comandos para Executar

```bash
# 1. Navegar para a raiz do projeto
cd "C:\Users\Ivan Gabriel Duarte\Documents\PsiloUp"

# 2. Verificar status atual
git status

# 3. Adicionar apenas psiloup-production (se quiser limpar o resto depois)
git add psiloup-production/

# 4. OU adicionar tudo (incluindo mudanças na raiz)
git add .

# 5. Verificar o que será commitado
git status

# 6. Fazer commit
git commit -m "feat: versão de produção completa do PsiloUp

- Backend Node.js/Express completo
- Frontend Next.js 15 com App Router
- Assets e imagens organizados
- Scripts de inicialização
- Documentação completa
- Configurações de ambiente documentadas"

# 7. Push para o GitHub
git push origin main
```

## 🧹 Limpar Repositório (Opcional)

Se quiser limpar o repositório e manter apenas `psiloup-production`:

```bash
# CUIDADO: Isso remove tudo exceto psiloup-production
# Faça backup antes!

# 1. Criar branch de backup (opcional)
git branch backup-antes-limpeza

# 2. Remover tudo exceto psiloup-production
git rm -r --cached .
git add psiloup-production/
git commit -m "chore: limpar repositório, manter apenas psiloup-production"

# 3. Push
git push origin main
```

## 📝 Notas Importantes

1. **Backup**: Sempre faça backup antes de limpar o repositório
2. **Variáveis de Ambiente**: Nunca commite arquivos `.env` reais
3. **Banco de Dados**: Nunca commite arquivos `.sqlite`
4. **Node Modules**: Sempre ignore `node_modules/`
5. **Build Files**: Ignore `.next/`, `dist/`, `build/`

## 🔍 Verificar o que será Commitado

```bash
# Ver arquivos que serão commitados
git status

# Ver diferenças
git diff --cached

# Ver tamanho dos arquivos
git ls-files | xargs ls -lh | sort -k5 -hr | head -20
```

