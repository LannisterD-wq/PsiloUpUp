# Plano de Adaptação - Garanti → PsiloUp

## 🎯 Objetivo
Adaptar o sistema completo do Garanti E-commerce para o PsiloUp, mantendo toda funcionalidade mas aplicando nosso design.

## 📋 Checklist de Adaptação

### Fase 1: Configuração Base ✅
- [x] Analisar estrutura do Garanti
- [ ] Copiar estrutura de pastas
- [ ] Adaptar Tailwind config com cores PsiloUp
- [ ] Adaptar globals.css
- [ ] Configurar fontes (Inter, Poppins)

### Fase 2: Componentes Base
- [ ] Adaptar Header (logo PsiloUp, cores)
- [ ] Adaptar Footer
- [ ] Adaptar componentes UI (Button, Card, Input, etc)
- [ ] Aplicar cores PsiloUp em todos componentes

### Fase 3: Páginas de Autenticação
- [ ] Adaptar /sign-in (login)
- [ ] Adaptar /sign-up (cadastro)
- [ ] Adaptar /recover-password
- [ ] Integrar com nosso backend de auth

### Fase 4: Área do Cliente
- [ ] Adaptar /dashboard
- [ ] Adaptar /shopping-cart
- [ ] Adaptar /order-history
- [ ] Adaptar /cards-and-address
- [ ] Integrar com nosso backend

### Fase 5: Vitrine da Loja
- [ ] Adaptar /shop (listagem)
- [ ] Adaptar /product-details
- [ ] Adaptar /payment (checkout)
- [ ] Integrar com nosso backend

### Fase 6: Integração Backend
- [ ] Adaptar API client
- [ ] Conectar autenticação
- [ ] Conectar carrinho
- [ ] Conectar checkout
- [ ] Conectar frete

## 🎨 Cores PsiloUp

```css
--psiloup-cyan: #00E6FF
--psiloup-magenta: #FF2F92
--psiloup-purple: #A24BD8
--psiloup-navy: #0D1B2A
```

## 📁 Estrutura Final

```
front/
├── src/
│   ├── app/              # Páginas (do Garanti adaptadas)
│   ├── components/       # Componentes (do Garanti adaptados)
│   ├── lib/              # Utilitários + nosso API client
│   └── styles/           # CSS customizado PsiloUp
```

## 🚀 Próximos Passos

1. Copiar estrutura do Garanti
2. Adaptar cores e design
3. Integrar com nosso backend
4. Testar tudo

