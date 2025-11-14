# PsiloUp — Frontend pronto para `public_html`

Esta pasta contém a versão responsiva do site da PsiloUp com integração completa ao backend Node/Express. Basta publicar os arquivos em um servidor web estático (ex.: `public_html`) e apontar `window.PSILOUP_API_BASE` para a API em produção.

## Estrutura

- `index.html` — landing page com catálogo dinâmico, gatilhos de conversão e CTA para checkout.
- `up-mind.html` / `up-burn.html` — páginas de produto com call to action para o carrinho.
- `checkout.html` — fluxo profissional em etapas (identificação, frete, revisão e redirecionamento Mercado Pago).
- `account.html` — área do cliente para pedidos e endereços.
- `assets/js/core/` — módulos de configuração, API client, autenticação, catálogo e carrinho.
- `assets/js/psiloup-modern.js` — UI + cart drawer integrados ao novo core.
- `assets/css/psiloup-modern.css` — ajustes visuais, cart drawer e feedbacks.

## Principais recursos

- Carrinho persistido em `localStorage` sincronizado com o catálogo vindo de `GET /api/catalog/products`.
- Checkout que consome os endpoints `/api/shipping/quote`, `/api/account/addresses`, `/api/checkout/create` e redireciona para o Mercado Pago.
- Login e cadastro reutilizam o client `PSILOUP.api`, salvando sessão JWT em `localStorage`.
- Drawer do carrinho com badge dinâmico, remoção de itens e link direto para o checkout.
- Scripts organizados em módulos reaproveitáveis (`core/`) para evitar duplicação.

## Como publicar

1. Gere o build do backend (pasta `server/`) e disponibilize a API (Railway, Render, VPS, etc.).
2. Ajuste a constante `window.PSILOUP_API_BASE` nas páginas, apontando para a URL pública da API (ex.: `https://api.seudominio.com/api`).
3. Faça upload desta pasta para o diretório público do seu host (FTP, painel de hospedagem, CDN, Cloudflare Pages, etc.).
4. Limpe o cache do navegador e valide o fluxo completo: login, adicionar ao carrinho, cálculo de frete, checkout e área logada.

## Checklist recomendado

- [ ] Atualizar números de WhatsApp e links institucionais.
- [ ] Substituir imagens mockup em `images/` pelas oficiais.
- [ ] Revisar textos/valores de frete grátis no backend (`FREE_SHIPPING_THRESHOLD_CENTS`).
- [ ] Configurar domínios seguros no CORS do backend.
- [ ] Criar páginas legais (privacidade, termos, devoluções) e linkar no rodapé.

Após a publicação, teste em dispositivos móveis, navegadores diferentes e monitore o console para garantir que a API esteja respondendo corretamente.



