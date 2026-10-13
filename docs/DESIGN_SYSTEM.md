# DESIGN_SYSTEM

## 1. Direção criativa: "Precisão criogénica"

A linguagem visual inspira-se na engenharia de gases: diagramas técnicos, tabela periódica, linhas de fluxo e isóbaras. Os princípios são:

- **Editorial, não template.** Composições assimétricas numa grelha de 12 colunas, índices numerados (`01 — Produtos`), muito espaço em branco e tipografia de grande escala.
- **Dados como ornamento.** Fórmulas químicas, n.º CAS e cores de ogiva (EN 1089-3) substituem ícones decorativos e fotografia genérica. São factos reais e úteis para o cliente técnico.
- **Contraste de superfícies.** Secções navy profundas alternam com superfícies claras em aço. O ciano criogénico é usado com parcimónia, como sinal.
- **Movimento discreto.** Revelação progressiva suave, linhas de fluxo lentas no hero e microinterações em setas e botões. Tudo é desativado com `prefers-reduced-motion`.

> **A validar:** a paleta foi definida sem acesso ao manual de marca da Acail Gás. Calibre os tokens `navy-*` e `blue-*` com as cores oficiais. O resto do sistema deriva destes tokens.

## 2. Tokens (`src/app/globals.css`, `@theme`)

### Cor

| Token                   | Valor                             | Uso                                                                                 |
| ----------------------- | --------------------------------- | ----------------------------------------------------------------------------------- |
| `ink-950`               | `#050d18`                         | Rodapé                                                                              |
| `navy-900`              | `#08172b`                         | Header, heroes, secções escuras                                                     |
| `navy-800`              | `#0c2340`                         | Botão primário em superfície clara, secção "navy"                                   |
| `navy-700` / `navy-600` | `#12325a` / `#1a4577`             | Reservados (gradientes, estados)                                                    |
| `blue-600`              | `#18508f`                         | Links, eyebrows, faixa CTA                                                          |
| `blue-500`              | `#1f5fa8`                         | Foco, acentos                                                                       |
| `blue-400` / `blue-100` | `#3b7bc8` / `#e3edf8`             | Estados, avisos regulamentares                                                      |
| `cryo-200/300/400`      | `#b5e8f5` / `#7fd6ee` / `#4fc3e3` | Acento em superfícies escuras, foco em escuro, arte                                 |
| `steel-50 … 900`        | `#f6f7f9 … #141a22`               | Neutros. Texto secundário `steel-600`; legendas `steel-500` (≥ 4,5:1 em `steel-50`) |
| `success-*`, `danger-*` |                                   | Estados de formulário                                                               |

Regras de contraste: em superfícies escuras, o texto secundário usa `steel-300`/`steel-400`. Em superfícies claras, nunca usar `steel-400` para texto. Estas regras são verificadas pelo axe nos testes e2e.

### Tipografia

| Família                             | Papel                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| **Archivo** (variável, eixo `wdth`) | Títulos (`--font-display`), peso 560, _tracking_ negativo                               |
| **Inter** (variável)                | Texto corrido e UI (`--font-sans`)                                                      |
| **JetBrains Mono**                  | Etiquetas técnicas: eyebrows, CAS, dados (`--font-mono`), maiúsculas, `tracking 0.08em` |

Escala fluida (`clamp`): `text-display` (44→92 px), `text-h1` (36→68), `text-h2` (28→46), `text-h3` (20→24), `text-lead` (18→21), `text-label` (12).

### Espaçamento e grelha

- `--container-site: 86rem` (1376 px), _gutter_ fluido `--spacing-gutter` (16 → 40 px).
- Ritmo vertical de secção: `--spacing-section` (72 → 144 px).
- Grelha: 12 colunas em `lg`. Em mobile, as composições são reorganizadas e não apenas encolhidas: menus de ecrã inteiro, factos em 2 colunas e tabelas de produto em linhas empilhadas.

### Raios, sombras e movimento

- Raios: `xs 2px`, `sm 4px` (padrão), `md 8px`, `lg 14px`. A estética é industrial e contida.
- Sombras: `shadow-panel` e `shadow-float` (menus). As superfícies usam sobretudo filetes (_hairlines_) de 1 px.
- Curvas: `ease-out-quart`, `ease-in-out-quint`. Durações: `fast 160ms`, `base 280ms`, `slow 720ms`.

## 3. Componentes

| Componente                                                  | Ficheiro                    | Notas                                                                                                               |
| ----------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Container`                                                 | `ui/container.tsx`          | `size="site" \| "prose"`                                                                                            |
| `Section`, `SectionHeader`                                  | `ui/section.tsx`            | Tons `light`, `muted`, `dark`, `navy`                                                                               |
| `Eyebrow`                                                   | `ui/eyebrow.tsx`            | Índice numerado + etiqueta mono                                                                                     |
| `ButtonLink`                                                | `ui/button.tsx`             | `primary`/`secondary`/`ghost` × `light`/`dark`; links externos abrem em nova janela com aviso para leitores de ecrã |
| `ArrowLink`                                                 | `ui/arrow-link.tsx`         | Link de texto com seta animada                                                                                      |
| `GasTile`, `ShoulderSwatch`                                 | `ui/gas-tile.tsx`           | Mosaico estilo tabela periódica; a cor de ogiva tem `role="img"` e um rótulo descritivo                             |
| `Formula`                                                   | `ui/formula.tsx`            | Índices químicos com `<sub>`                                                                                        |
| `Breadcrumbs`                                               | `ui/breadcrumbs.tsx`        | Visual + JSON-LD `BreadcrumbList`                                                                                   |
| `MediaPlaceholder`                                          | `ui/media-placeholder.tsx`  | Espaço identificado para fotografia oficial (ver CONTENT_SOURCES)                                                   |
| `PageHero`                                                  | `sections/page-hero.tsx`    | Hero escuro das páginas internas                                                                                    |
| `IsobarField`                                               | `sections/isobar-field.tsx` | Arte generativa SVG, determinística e leve                                                                          |
| `CtaBand`                                                   | `sections/cta-band.tsx`     | Fecho de página                                                                                                     |
| `CategoryIndex`, `ProductItems`                             | `features/products/`        | Índice editorial e linhas técnicas de produto                                                                       |
| `IndustryIndex`, `SupplyModeList`, `NewsList`, `RegionList` | `features/*`                |                                                                                                                     |
| `Field`, `ContactForm`                                      | `forms/`                    | Campos com label, ajuda e erro ligados por `aria-describedby`                                                       |

## 4. Estados interativos

- **Hover:** mudança de cor/fundo em 160–280 ms; as setas deslocam-se 2–4 px.
- **Focus:** contorno de 2 px, `blue-500` em superfície clara e `cryo-300` em escura, com _offset_ de 3 px. Nunca é removido.
- **Ativo na navegação:** sublinhado ciano e `aria-current="page"`.
- **Formulário:** `aria-invalid` com borda `danger-600`, mensagem associada e foco no primeiro campo inválido (pela ordem visual).
- **Carregamento:** botão desativado com _spinner_ e o texto "A enviar…".

## 5. Iconografia e imagem

- Ícones Lucide, traço 1.4–1.75, sempre `aria-hidden`, e apenas onde acrescentam significado (formas de fornecimento, contactos, avisos).
- Não há fotografia de _stock_. Os espaços para fotografia oficial estão identificados (`data-placeholder="image"`). Ao integrar imagens, use `next/image` com `sizes`, dimensões explícitas e _alt_ descritivo.

## 6. Acessibilidade (WCAG 2.2 AA)

Skip link, landmarks (`header`, `nav` nomeados, `main`, `footer`), um `h1` por página com hierarquia de títulos, áreas de toque ≥ 24 px, menus com `aria-expanded`/`aria-controls`, Escape para fechar e retorno de foco, _focus trap_ no menu mobile, `lang="pt-PT"` e movimento reduzido respeitado.
