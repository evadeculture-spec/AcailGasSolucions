# Acail Gás Solucions: website institucional (Angola)

Website institucional da **Acail Gás Solucions**, a vertente de gás da Acail Angola (Luanda), desenvolvido com Next.js 16 (App Router), React 19, TypeScript strict e Tailwind CSS 4.

> **Estado:** pronto para revisão e publicação em ambiente de pré-produção. Antes da publicação final, é preciso validar os pontos listados em [Pendências](#pendências).

## Início rápido

```bash
npm install
cp .env.example .env.local      # configurar as variáveis (ver abaixo)
npm run dev                     # http://localhost:3000
```

Requisitos: Node.js ≥ 20.9 (testado com 22) e npm.

## Scripts

| Comando                           | Descrição                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `npm run dev`                     | Servidor de desenvolvimento (Turbopack)                                           |
| `npm run build`                   | Build de produção                                                                 |
| `npm run start`                   | Serve o build de produção                                                         |
| `npm run lint`                    | ESLint (regras Next.js + Core Web Vitals + TypeScript)                            |
| `npm run typecheck`               | Gera os tipos de rotas (`next typegen`) e corre o `tsc --noEmit`                  |
| `npm run format` / `format:check` | Prettier (com ordenação de classes Tailwind)                                      |
| `npm test`                        | Testes unitários (Vitest)                                                         |
| `npm run test:e2e`                | Testes end-to-end + acessibilidade (Playwright + axe), contra o build de produção |
| `npm run check`                   | Lint + typecheck + testes unitários + build                                       |

Para os testes e2e, faça primeiro `npm run build`. Se o Chromium do Playwright não estiver instalado, use `npx playwright install chromium` ou defina `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.

## Variáveis de ambiente

| Variável               | Âmbito   | Obrigatória       | Descrição                                                                                          |
| ---------------------- | -------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | público  | recomendada       | URL base para canonical, sitemap e Open Graph. Por omissão: `https://acailgassolucions.vercel.app` |
| `RESEND_API_KEY`       | servidor | para o formulário | Chave da API [Resend](https://resend.com)                                                          |
| `CONTACT_TO_EMAIL`     | servidor | para o formulário | Destinatário dos pedidos de contacto                                                               |
| `CONTACT_FROM_EMAIL`   | servidor | para o formulário | Remetente verificado no Resend (ex.: `website@acailgas.pt`)                                        |

**Sem estas três variáveis, o formulário não envia nada.** A API responde `503 not_configured` e o utilizador vê uma mensagem honesta com o email e o telefone da sede. Nenhum envio é simulado.

## Estrutura

```
src/
  app/                 Rotas (App Router), metadados, sitemap, robots, OG image
    (site)/            Páginas públicas, com cabeçalho e rodapé
    api/contact/       Endpoint do formulário de contacto
  components/
    ui/                Primitivas (Button, Section, GasTile, Breadcrumbs…)
    layout/            Header, navegação desktop/mobile, footer, logótipo provisório
    sections/          Secções compostas (heroes, CTA, homepage)
    forms/             Formulário de contacto (cliente)
  features/            Componentes por domínio (produtos, indústrias, serviços, notícias, distribuidores)
  content/pt/          Conteúdo tipado e verificado (PT-PT)
  data/                Dados de referência universais (fórmulas, n.º CAS, cores EN 1089-3)
  config/              Dados da empresa e i18n
  lib/                 SEO, validação, envio de email, rate limiting, rotas
  types/               Modelo de conteúdo
tests/unit/            Vitest
tests/e2e/             Playwright + axe
docs/                  Documentação do projeto
```

## Documentação

- [`docs/CONTENT_AUDIT.md`](docs/CONTENT_AUDIT.md): auditoria do site oficial, limitações e lista de validação
- [`docs/CONTENT_SOURCES.md`](docs/CONTENT_SOURCES.md): fonte de cada conteúdo publicado e imagens a fornecer
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): decisões técnicas, rotas e modelo de conteúdo
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md): tokens, tipografia, componentes e princípios
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md): Vercel, Netlify, domínio e checklist de publicação

## Qualidade verificada

Executado neste repositório, no estado atual:

- `npm run lint`: sem erros
- `npm run typecheck`: sem erros
- `npm test`: 43 testes unitários a passar
- `npm run build`: 36 rotas geradas (todas estáticas, exceto `/api/contact`)
- `npm run test:e2e`: 110 testes a passar e 6 ignorados por design (testes exclusivos de desktop ou de mobile), em desktop (1440 px) e mobile (Pixel 7). Inclui o axe WCAG 2.2 AA em 14 páginas, a navegação, o formulário, o SEO e os headers de segurança.

Os valores de Lighthouse e Core Web Vitals **não foram medidos** neste ambiente. Ver `docs/DEPLOYMENT.md` → "Medição de desempenho".

## Pendências

Resumo, com o detalhe em `docs/CONTENT_AUDIT.md` §A.7:

1. Confirmar com a Acail Angola o uso do nome **Acail Gás Solucions** e a denominação social.
2. Logótipo oficial: o atual é um **wordmark tipográfico provisório** (`src/components/layout/logo.tsx`).
3. Fotografias da fábrica de Viana e das redes de gases, com direitos de utilização.
4. Entidade certificadora e validade da ISO 22000:2018.
5. Capacidades, purezas e datas em falta (propano, inauguração).
6. Credenciais de email do formulário e destinatário.
7. Revisão jurídica das políticas (lei angolana).
