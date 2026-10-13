# ARCHITECTURE

## 1. Princípios

- **Conteúdo verificado e separado da apresentação.** Os textos vivem em `src/content/pt/*.ts`, tipados por `src/types/content.ts`. Os componentes não contêm afirmações comerciais.
- **Server Components por omissão.** Só quatro componentes são cliente: navegação desktop, navegação mobile, observador de revelação progressiva e formulário de contacto (mais o `error.tsx`).
- **Páginas estáticas.** Todas as páginas são pré-renderizadas no build. Apenas `/api/contact` é dinâmico.
- **Sem funcionalidades simuladas.** O formulário envia de facto (via Resend) ou declara que não está configurado.
- **Dependências mínimas:** `next`, `react`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react` e `server-only`. A biblioteca Motion **não** foi incluída, porque as microinterações são resolvidas em CSS, o que poupa JavaScript no cliente.

## 2. Stack

| Camada      | Escolha                                                                   | Nota                                                                          |
| ----------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Framework   | Next.js 16.4 (App Router, Turbopack)                                      | `cacheComponents` + `partialPrefetching` ativos (valores por omissão da 16.4) |
| UI          | React 19.3                                                                |                                                                               |
| Linguagem   | TypeScript 5.9, `strict`                                                  | Tipos de rotas gerados (`PageProps<"/produtos/[categoria]">`)                 |
| Estilos     | Tailwind CSS 4.3 (`@theme` em `globals.css`)                              | Tokens documentados em `DESIGN_SYSTEM.md`                                     |
| Formulários | React Hook Form 7 + Zod 4                                                 | O mesmo esquema no cliente e no servidor                                      |
| Ícones      | Lucide                                                                    | Traço fino (1.4–1.75)                                                         |
| Fontes      | Archivo, Inter, JetBrains Mono (OFL), _self-hosted_ via `next/font/local` | Sem pedidos a terceiros                                                       |
| Testes      | Vitest 5, Playwright 1.64, axe-core                                       |                                                                               |

## 3. Mapa do site e rotas

| Rota                                  | Página                            | Fonte de conteúdo                        |
| ------------------------------------- | --------------------------------- | ---------------------------------------- |
| `/`                                   | Homepage                          | vários                                   |
| `/empresa` (`#historia`)              | Empresa + História e identidade   | `content/pt/company.ts`                  |
| `/qualidade`                          | Qualidade e segurança             | página + `company.ts` (`certifications`) |
| `/produtos`                           | Índice de produtos                | `products.ts`                            |
| `/produtos/[categoria]`               | 6 categorias                      | `products.ts`                            |
| `/industrias`                         | Índice de setores                 | `industries.ts`                          |
| `/industrias/[setor]`                 | 7 setores com conteúdo verificado | `industries.ts` (`detail`)               |
| `/servicos` (`#acail-vision`)         | Serviços e Acail Vision           | `services.ts`                            |
| `/saude`                              | Saúde                             | `products.ts` + `services.ts`            |
| `/distribuidores`                     | Rede de distribuidores            | `distributors.ts`                        |
| `/noticias`, `/noticias/[slug]`       | Notícias                          | `news.ts`                                |
| `/contactos`                          | Contactos + formulário            | `config/site.ts`                         |
| `/privacidade`, `/cookies`, `/termos` | Páginas legais                    | `legal.ts`                               |
| `/api/contact`                        | POST do formulário                | `lib/contact-handler.ts`                 |

**Decisões de arquitetura de informação**

- **História e Identidade** é uma secção de `/empresa` (âncora `#historia`), porque o conteúdo verificado não justifica página própria. `/empresa/historia` redireciona para essa âncora.
- **Acail Vision** é uma secção de `/servicos`, porque a informação oficial é curta (telemetria + gestão de redes de gases medicinais).
- **Indústrias:** os 15 setores são listados, mas apenas 7 têm página própria (os que têm conteúdo técnico verificado), para evitar páginas vazias.
- Os **URLs legados** do site atual (`/gases/index?type=…`, `/industria/post?industry=…`, `/noticia`, `/resolucao-alternativa-litigios.html`) têm redirecionamentos 301 em `next.config.ts`. `/en/*` e `/es/*` redirecionam temporariamente (302) para PT.

## 4. Modelo de conteúdo

`src/types/content.ts` define `ProductCategory`, `ProductItem`, `Industry`, `SupplyMode`, `NewsArticle`, `DistributorRegion`, `Certification` e `LegalDocument`. Regras:

- `Industry.detail` só existe quando há conteúdo verificado. A página e o link aparecem automaticamente.
- `Certification.verified`: só as certificações confirmadas são renderizadas (`verifiedCertifications`).
- `NewsArticle.publishedAt` é opcional. Sem data confirmada, nenhuma data é mostrada.
- `ProductItem.cylinder: false` oculta a cor de ogiva para líquidos criogénicos e gelo seco.
- `src/data/substances.ts` contém apenas **dados de referência universais** (fórmula, n.º CAS, cor de ogiva EN 1089-3), não afirmações da empresa.

**Integração futura com CMS:** basta substituir os módulos de `src/content/<locale>` por funções assíncronas que devolvam os mesmos tipos (por exemplo, com `"use cache"` + `cacheTag` para revalidação por _webhook_). As páginas já consomem apenas estas interfaces.

## 5. Internacionalização

- `src/config/i18n.ts`: `activeLocales = ["pt"]`, `plannedLocales = ["en", "es"]`.
- `buildMetadata` e o sitemap emitem `hreflang` para cada locale ativo e `x-default`.
- Para ativar EN/ES:
  1. criar `src/content/en/` com os mesmos tipos;
  2. adicionar o segmento `app/[locale]/…` (ou `app/en/…`);
  3. acrescentar o locale a `activeLocales`;
  4. remover o redirecionamento temporário `/en/*` em `next.config.ts`.

## 6. Formulário de contacto

Fluxo: `ContactForm` (cliente, RHF + Zod) → `POST /api/contact` → `handleContactRequest` → `sendContactEmail` (Resend REST, só texto).

Proteções no servidor (`src/lib/contact-handler.ts`):

1. Origem: o header `Origin`, quando presente, tem de coincidir com o host (403).
2. `Content-Type: application/json` (415) e corpo ≤ 16 KB (413).
3. Rate limit: 5 pedidos / 10 min por IP (429 + `Retry-After`), em memória por instância (ver DEPLOYMENT).
4. Validação Zod: devolve erros por campo (422), apresentados no formulário.
5. Anti-spam: um _honeypot_ e um tempo mínimo de preenchimento (3 s). Pedidos suspeitos recebem `200` mas **não são enviados**.
6. Email só em texto, com `reply_to` igual ao visitante. Não há HTML, por isso não há injeção de markup.
7. Sem configuração: `503 not_configured`. Erro do fornecedor: `502`.

A pré-seleção de assunto e produto (`/contactos?assunto=fds&produto=gases-especiais`) é lida no cliente, para que a página se mantenha estática.

## 7. Estado da UI com Cache Components

Com `cacheComponents`, o Next.js preserva as páginas visitadas via `<Activity>`. Os menus usam `useRouteScopedState` (`components/layout/use-route-scoped-state.ts`): o estado fica associado ao `pathname` e é reposto ao navegar, sem efeitos.

## 8. SEO

- `buildMetadata()` gera o título, a descrição, o canonical, o hreflang, o Open Graph e o Twitter Card de cada página.
- `sitemap.xml` e `robots.txt` (bloqueia `/api/`) são gerados a partir de `lib/seo/sitemap-paths.ts`.
- JSON-LD: `Organization` + `WebSite` (global), `BreadcrumbList` (páginas internas) e `ItemList` (produtos). Não há `Product`/`Offer`/`Review`, porque não existe informação comercial verificada.
- Uma imagem Open Graph é gerada com `next/og`.

## 9. Segurança

Os headers ficam em `next.config.ts`: CSP restritiva (só `'self'`), HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` e COOP. O `poweredByHeader` está desativado.

Limitação conhecida: `script-src` inclui `'unsafe-inline'`, necessário para os scripts inline das páginas estáticas do Next.js. A alternativa com _nonces_ obrigaria a renderização dinâmica de todas as páginas.

Não há segredos no cliente (as variáveis de email não têm o prefixo `NEXT_PUBLIC_`). O `import "server-only"` impede que o código de envio seja incluído no bundle cliente.

## 10. Testes

| Tipo      | Ficheiros                         | Cobertura                                                                                                                                                                              |
| --------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unitários | `tests/unit/*.test.ts`            | Esquema de validação, handler da API (todos os códigos), mailer, rate limiter, helpers de SEO e rotas, integridade de conteúdo (links de navegação, slugs, limites SEO, certificações) |
| E2E       | `tests/e2e/navigation.spec.ts`    | Todas as páginas do sitemap (200, 1 `h1`, metadados, consola limpa), links internos, 404, redirecionamentos legados, skip link, menus desktop/mobile, ausência de _scroll_ horizontal  |
| E2E       | `tests/e2e/contact-form.spec.ts`  | Erros acessíveis, pré-seleção, estados "não configurado" e sucesso, validação no servidor                                                                                              |
| A11y      | `tests/e2e/accessibility.spec.ts` | axe WCAG 2.2 A/AA em 14 páginas × 2 viewports + menu mobile aberto                                                                                                                     |
| SEO       | `tests/e2e/seo.spec.ts`           | robots, sitemap + hreflang, JSON-LD, imagem OG, headers de segurança                                                                                                                   |
