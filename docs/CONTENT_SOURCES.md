# CONTENT_SOURCES

Mapa entre cada bloco de conteúdo publicado e a sua fonte. Base: excertos indexados do domínio oficial `acailgas.pt` (ver limitações em `CONTENT_AUDIT.md` §1).

## 1. Conteúdo da empresa

| Conteúdo                                                                   | Ficheiro                         | Fonte                                                      |
| -------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------- |
| Descrição da atividade, _statement_ "gama completa de gases atmosféricos…" | `content/pt/company.ts`          | Homepage, `/empresa`                                       |
| Fundação 1996, produção de gás a alta pressão, Grupo Acail                 | `company.ts`                     | `/empresa` (PT/EN/ES)                                      |
| Missão, valores, pilares                                                   | `company.ts`                     | `/empresa`                                                 |
| CAE 20110                                                                  | `company.ts`                     | `/files/info/2025.03.27_infopublico.pdf`                   |
| Marco 2016: unidade criogénica, 40 t/dia                                   | `company.ts`, `news.ts`          | `/noticia/4/nova-unidade-de-producao-criogenica-de-gas`    |
| Aranda de Duero (gelo seco), nova morada em Espanha                        | `company.ts`, `news.ts`          | `/en/noticia/2/…`, `/es/noticia/3/tenemos-nueva-direccion` |
| ISO 9001:2015 (**não publicado**)                                          | `company.ts` (`verified: false`) | Resumo indexado da homepage, sem documento                 |

## 2. Produtos

| Conteúdo                                                                                  | Fonte                                                                                |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 6 categorias e listas de gases                                                            | `/gases/index?type=…` (PT), `/en/gases`, `/es/gases`                                 |
| Misturas industriais (ARCO, ARO, HELAR, HELARCO, HELAZO, HIDARG, HIDAZO, LASERMIX, METAR) | `/en/gases?gas=Misturas&type=Industriais`, `/es/gases?gas=Misturas&type=Industriais` |
| Misturas ALIMIX                                                                           | `/en/gases?gas=Misturas&type=Alimentares`                                            |
| Aplicações do azoto líquido, acetileno, hidrogénio e CO₂                                  | Páginas de gás `?gas=…` (PT/EN/ES)                                                   |
| Árgon: utilizações e CAS                                                                  | FDS `ptfds22-1951-01argon-liquidorev0320220310.pdf`                                  |
| Gases medicinais: medicamentos, Boas Práticas de Fabrico, pureza, utilizadores            | `/saude`                                                                             |
| Oxigénio e Ar Medicinal Sintético: medicamentos sujeitos a receita médica                 | `/en/gases?gas=Oxigenio&type=Medicinais`, `/es/gases?gas=Ar-Medicinal-Sintetico…`    |
| Protóxido de azoto: analgésico e auxiliar na anestesia                                    | `/gases/index?type=Medicinais&gas=Protoxido-de-Azoto`                                |
| CO₂ dispositivo médico: insuflação laparoscópica/endoscópica                              | `/gases/index?type=Dispositivo+Medico&gas=Dioxido-de-Carbono`                        |
| Gases especiais e laboratório                                                             | `/en/gases?type=Especiais`, `/industria/post?industry=Laboratorios`                  |
| Gelo seco: limpeza criogénica, cadeia de frio, congelação rápida                          | `/gases/index?type=Gelo+Seco&gas=Gelo-Seco`                                          |

**Dados de referência universais** (`src/data/substances.ts`), que não são afirmações da empresa:

- Fórmulas químicas e n.º CAS: identificadores químicos normalizados (o CAS do árgon foi confirmado na FDS oficial).
- Cores de ogiva: código de cores da norma EN 1089-3 (referências RAL). Os valores hexadecimais são aproximações para ecrã.

## 3. Indústrias, serviços, saúde e distribuidores

| Conteúdo                                                                          | Fonte                                                               |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Lista de 15 setores                                                               | `/en/industria`, `/es/industria`, secções "Indústrias Relacionadas" |
| Metalurgia, Metalomecânica, Alimentar, Laboratórios, Química, Ambiente, Soldadura | `/industria/post?industry=…` e páginas de gás                       |
| Formas de fornecimento, equipamentos, on-site                                     | `/en/servicos`                                                      |
| Acail Vision (telemetria; gestão de redes e garrafas de gases medicinais)         | `/en/servicos`, homepage                                            |
| Acail Medicare (domicílio)                                                        | `/saude`, `acailmedicare.pt`                                        |
| Distribuidores (localidades)                                                      | `/en/distribuidores`, `/es/distribuidores`                          |
| Morada, telefones, fax, email                                                     | `/contactos`                                                        |
| Informação ao público (DL 150/2015)                                               | `/files/info/2025.03.27_infopublico.pdf`                            |

## 4. Conteúdo editorial próprio

Os títulos de secção e _taglines_ são propostas de copy, sem dados factuais:

- "Precisão industrial. Soluções que fazem avançar." (proposta criativa do _brief_, não é _slogan_ oficial)
- "Seis categorias. Uma gama completa de gases.", "Da garrafa ao tanque criogénico.", "Qualidade com rigor documentado.", "Gases medicinais para quem cuida.", entre outros

As páginas legais (`content/pt/legal.ts`) são minutas que descrevem o website tal como foi construído e **requerem revisão jurídica**.

## 5. Imagens a fornecer

Nenhuma imagem do site oficial foi copiada. Os espaços seguintes estão marcados com `MediaPlaceholder` (`data-placeholder="image"`):

| Local                   | Fotografia pretendida                                                |
| ----------------------- | -------------------------------------------------------------------- |
| `/empresa` (Quem somos) | Instalações de produção em Souto, Santa Maria da Feira (formato 3:4) |
| `/servicos` (Granel)    | Camião cisterna da frota e tanque criogénico num cliente (16:9)      |
| `/servicos` (On-site)   | Unidade de produção on-site (16:9)                                   |
| `/saude`                | Rede de gases medicinais numa unidade de saúde (4:3)                 |

Requisitos: fotografias reais da operação portuguesa, com direitos de utilização; mínimo de 2400 px no lado maior; JPEG/PNG de origem (o `next/image` gera AVIF/WebP); _alt_ descritivo em PT-PT. O logótipo oficial deve ser entregue em SVG.

## 6. Documentos

O link para o PDF de informação ao público aponta para `www.acailgas.pt/files/info/…`. Se o domínio ou a estrutura mudarem, copie os PDFs para `public/documents/` e atualize `siteConfig.links.publicSafetyInfo`.
