# DEPLOYMENT

## 1. Requisitos de execução

- **Servidor Node.js necessário** para:
  - `POST /api/contact` (envio de email);
  - os redirecionamentos e headers definidos em `next.config.ts`;
  - o Partial Prerendering e a geração de páginas para _slugs_ desconhecidos (que devolvem 404).
- Todas as páginas de conteúdo são pré-renderizadas no build (estáticas).
- Um _static export_ (`output: "export"`) **não é recomendado**: perderia o formulário, os headers e os redirecionamentos, e é incompatível com `cacheComponents`.

## 2. Vercel (recomendado)

1. Importar o repositório em vercel.com → _New Project_. O _framework_ é detetado como Next.js.
2. _Build command_ `npm run build`, _install_ `npm ci`, Node 22.
3. Em _Environment Variables_ (Production e Preview):
   - `NEXT_PUBLIC_SITE_URL=https://www.acailgas.pt` (em Preview, pode usar o URL do _deployment_ ou deixar o valor de produção);
   - `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. _Deploy_.
5. Domínio: _Settings → Domains → Add_ `www.acailgas.pt` e `acailgas.pt` (redirecionar o _apex_ para `www`). No DNS do registo:
   - `www` → `CNAME cname.vercel-dns.com`;
   - _apex_ → `A 76.76.21.21` (ou os valores indicados pela Vercel).
   - O certificado TLS é automático.
6. Em Preview, para não indexar URLs `*.vercel.app`, ative _Deployment Protection_ ou adicione `X-Robots-Tag: noindex` aos _deployments_ de pré-visualização.

### Email (Resend)

1. Criar uma conta em resend.com e verificar o domínio de envio (registos SPF/DKIM no DNS).
2. Criar uma API key com permissão de envio → `RESEND_API_KEY`.
3. `CONTACT_FROM_EMAIL` tem de pertencer ao domínio verificado (ex.: `website@acailgas.pt`).
4. Testar: enviar o formulário em produção e confirmar a receção com _reply-to_ para o visitante.

Para usar outro fornecedor (SMTP, Postmark, SES), basta substituir `sendContactEmail` em `src/lib/mail/contact-mailer.ts`. A interface do handler mantém-se.

## 3. Netlify (viável)

- O Netlify suporta Next.js App Router através do _OpenNext adapter_ (instalado automaticamente).
- Configurar o _build_ `npm run build`, o _publish_ `.next` e as mesmas variáveis de ambiente.
- As _route handlers_ correm em Netlify Functions. Os headers e redirecionamentos de `next.config.ts` são respeitados pelo adaptador.
- Ponto de atenção: as funcionalidades mais recentes do Next.js 16 (Cache Components, Partial Prefetching) dependem do suporte da versão do adaptador. Valide num _deploy preview_ antes de publicar. Em caso de incompatibilidade, desative `cacheComponents` e `partialPrefetching` em `next.config.ts`: o site é integralmente estático e funciona sem eles.

## 4. Outras plataformas

Qualquer _host_ Node 20.9+: `npm ci && npm run build && npm run start` (porta via `PORT`). Coloque um _reverse proxy_ com TLS à frente.

## 5. Rate limiting em produção

O limitador do formulário é em memória e funciona **por instância**. Em _serverless_, várias instâncias têm contadores independentes. Para um limite global, substitua o _store_ em `src/lib/rate-limit.ts` por Redis/Upstash ou use a _Firewall / Rate Limiting_ da plataforma para `/api/contact`.

## 6. Checklist de publicação

- [ ] Validar o enquadramento da marca após a aquisição pela Linde (logótipo, entidade, contactos).
- [ ] Substituir o logótipo provisório (`src/components/layout/logo.tsx`) e os ícones (`src/app/icon.svg`, `opengraph-image.tsx`).
- [ ] Integrar as fotografias oficiais (ver `CONTENT_SOURCES.md` §5).
- [ ] Rever os conteúdos com a lista de validação (`CONTENT_AUDIT.md` §14).
- [ ] Revisão jurídica das páginas legais.
- [ ] Configurar as variáveis de email e testar o envio real.
- [ ] Definir `NEXT_PUBLIC_SITE_URL` com o domínio final.
- [ ] Submeter `https://www.acailgas.pt/sitemap.xml` no Google Search Console.
- [ ] Confirmar que os redirecionamentos 301 dos URLs antigos funcionam no domínio final.
- [ ] Medir o desempenho (ver abaixo).

## 7. Medição de desempenho

As metas (Lighthouse ≥ 90/95/95/95, LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms) **ainda não foram medidas**: o ambiente de desenvolvimento não tinha Lighthouse nem acesso externo. Depois do primeiro _deploy_:

```bash
npx lighthouse https://<url> --preset=desktop --view
npx lighthouse https://<url> --form-factor=mobile --view
```

Em produção, ative o Vercel Speed Insights (dados de campo de Core Web Vitals). Se o fizer, atualize a Política de Cookies caso a ferramenta escolhida utilize armazenamento local.

Fatores que já favorecem o desempenho: páginas estáticas, fontes _self-hosted_ com `display: swap` (a mono não é pré-carregada), sem imagens _raster_, arte em SVG inline, apenas quatro componentes cliente e sem bibliotecas de animação.
