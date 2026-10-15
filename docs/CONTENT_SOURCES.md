# CONTENT_SOURCES — Acail Gás Solucions (Angola)

Mapa entre cada bloco de conteúdo publicado e a sua fonte. Base: excertos indexados do site oficial `acailangola.com`, o certificado ISO 22000 e imprensa (ver limitações em `CONTENT_AUDIT.md` §A.1).

## 1. Empresa e notícias

| Conteúdo                                              | Ficheiro                 | Fonte                                                            |
| ----------------------------------------------------- | ------------------------ | ---------------------------------------------------------------- |
| Constituição em 2005, seis setores, setor do gás      | `content/pt/company.ts`  | acailangola.com/quem-somos.php                                   |
| Missão e compromisso (qualidade, segurança, ambiente) | `company.ts`             | acailangola.com/quem-somos.php                                   |
| Grupo Acail (Portugal, Espanha, Angola)               | `company.ts`             | Perfil do site oficial (🔴 a confirmar)                          |
| Inauguração das unidades de gases (2015)              | `company.ts`, `news.ts`  | acailangola.com/noticias.php; ANGOP, 2015                        |
| Visita de António Costa (junho de 2023)               | `company.ts`, `news.ts`  | RNA — rna.ao, 06-06-2023                                         |
| ISO 22000:2018 (12-02-2024)                           | `company.ts`, `news.ts`  | acailangola.com/files/latest/ACAIL-ANGOLA_22000_UKAS_EN_2024.pdf |
| Gás propano (12 kg, 45 kg, granel)                    | `products.ts`, `news.ts` | acailangola.com/acail-gas-propano.php                            |

## 2. Produtos e serviços

| Conteúdo                                                        | Fonte (acailangola.com)                                               |
| --------------------------------------------------------------- | --------------------------------------------------------------------- |
| Gases e misturas de soldadura e corte (classes ISO 14175)       | `/produtos-industriais-gas-industrial-gas-soldadura-e-corte.php`      |
| Acetileno em garrafas, reguladores, centrais, carros de garrafa | `/produtos-industriais-soldadura-equipamentos-material-soldadura.php` |
| Gases alimentares (inertização, congelação, refrigeração)       | `/produtos-industriais-gas-industrial-gases-alimentares.php`          |
| Gás ambiente (ozono, ácido carbónico)                           | `/produtos-industriais-gas-industrial-gases-ambiente.php`             |
| Gases medicinais                                                | `/saude-gas-medicinal.php`                                            |
| Formas de fornecimento do oxigénio medicinal                    | `/saude-equipamentos-medicos.php`                                     |
| Redes de gases medicinais                                       | `/saude-redes-gases-medicinais.php`                                   |
| Redes de gases industriais                                      | `/produtos-industriais-redes-de-gases-industriais.php`                |
| Oxicorte                                                        | `/servicos.php`                                                       |
| Contactos por departamento                                      | `/contactos.php`                                                      |

**Dados de referência universais** (`src/data/substances.ts`): fórmulas químicas, n.º CAS e cores de ogiva EN 1089-3. Não são afirmações da empresa. Ozono e propano não apresentam cor de ogiva.

## 3. Conteúdo editorial próprio

Títulos e _taglines_ ("Precisão industrial. Soluções que fazem avançar.", "Gases produzidos em Angola.", "Da garrafa à rede de gases.", entre outros) são propostas de copy, sem dados factuais. O nome **Acail Gás Solucions** foi definido pelo cliente.

As páginas legais são minutas adaptadas à Lei n.º 22/11 (Proteção de Dados Pessoais) e requerem revisão jurídica.

## 4. Imagens a fornecer

Espaços marcados com `MediaPlaceholder` (`data-placeholder="image"`):

| Local                           | Fotografia pretendida                                          |
| ------------------------------- | -------------------------------------------------------------- |
| `/empresa`                      | Fábrica de gases no Pólo Industrial de Viana (3:4)             |
| `/servicos` (redes industriais) | Rede de gases industriais instalada (16:9)                     |
| `/servicos` (redes medicinais)  | Rede de gases medicinais numa unidade de saúde (16:9)          |
| `/saude`                        | Rede de gases medicinais numa unidade de saúde em Angola (4:3) |

Requisitos: fotografias reais da operação angolana, com direitos de utilização, ≥ 2400 px no lado maior; logótipo oficial em SVG.
