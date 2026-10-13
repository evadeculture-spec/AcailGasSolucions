# CONTENT_AUDIT — Acail Gás

Auditoria de conteúdos do website oficial `https://www.acailgas.pt/`, base para o novo website institucional.

- **Data da auditoria:** 13-10-2026
- **Estado:** auditoria **indireta**, com lacunas (ver §1)
- **Convenção de marcação:**
  - ✅ **Verificado:** texto ou facto observado em excertos indexados do domínio oficial `acailgas.pt`.
  - 🟡 **Fonte secundária:** encontrado fora do domínio oficial (diretórios, imprensa). Não é usado no site sem validação.
  - 🔴 **A validar:** dado em conflito, incompleto ou não confirmado.

---

## 1. Método e limitações

| Item                              | Situação                                                                                                                                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Acesso direto a `www.acailgas.pt` | **Bloqueado.** A política de rede do ambiente de desenvolvimento negou a ligação (`CONNECT 403`) e a ferramenta de leitura web não resolveu o DNS.                                                                                                                             |
| Internet Archive / leitores proxy | Bloqueados pela mesma política.                                                                                                                                                                                                                                                |
| Método usado                      | Pesquisa indexada restrita ao domínio `acailgas.pt` (versões PT, EN e ES), com leitura dos excertos de cada página.                                                                                                                                                            |
| Consequência                      | Foram confirmados a arquitetura do site, as categorias, as listas de gases, os setores, os serviços, os contactos da sede e as notícias (títulos e resumos). **Não** foi possível obter textos integrais, fotografias, logótipo, cores exatas, tipografia nem fichas técnicas. |

**Ação recomendada:** autorizar `acailgas.pt` na rede do ambiente (ou fornecer um export do conteúdo e os ficheiros de marca) e repetir esta auditoria página a página.

---

## 2. Contexto empresarial crítico 🔴

Fontes secundárias (Forbes España, Corresponsables, ECO/Sapo, gasworld, Deloitte Legal) reportam o seguinte:

- A **Linde** notificou a Autoridade da Concorrência (AdC) da aquisição da Acail Gás em outubro de 2025.
- A AdC abriu uma investigação aprofundada em fevereiro de 2026 e, segundo uma nota da Deloitte Legal datada de 28-07-2026, adotou uma decisão de **não oposição** sem remédios.
- A Linde anunciou a conclusão da aquisição da Acail Gás, S.A. (gases industriais em Portugal e Espanha e terapias respiratórias domiciliárias em Portugal).

**Impacto:** a marca, a entidade legal, os contactos, a rede de distribuidores e a própria existência do website podem mudar. **O novo site não faz nenhuma afirmação sobre esta operação.** A Acail Gás tem de confirmar o enquadramento antes da publicação.

---

## 3. Arquitetura de informação do site atual (✅)

Rotas observadas (PT; existem equivalentes `/en/…` e `/es/…`):

| Rota atual                                                    | Conteúdo                                                        |
| ------------------------------------------------------------- | --------------------------------------------------------------- |
| `/`                                                           | Homepage. Apresentação, gases, Acailvision                      |
| `/empresa`                                                    | A Empresa: origem, missão, valores                              |
| `/gases/index?type=<Tipo>&gas=<Gás>`                          | Catálogo de gases por tipo                                      |
| `/industria` e `/industria/post?industry=<Setor>[&gas=<Gás>]` | Índice e fichas de setores                                      |
| `/servicos`                                                   | Serviços e sistemas de fornecimento                             |
| `/saude`                                                      | Saúde e gases medicinais                                        |
| `/distribuidores`                                             | Rede de distribuidores PT/ES                                    |
| `/noticia` e `/noticia/<id>/<slug>`                           | Notícias                                                        |
| `/contactos`                                                  | Contactos                                                       |
| `/resolucao-alternativa-litigios.html`                        | Resolução Alternativa de Litígios                               |
| `/files/security/*.pdf`                                       | Fichas de Dados de Segurança (FDS)                              |
| `/files/info/2025.03.27_infopublico.pdf`                      | Informação ao público (regime de prevenção de acidentes graves) |

**Limitações da experiência atual:**

- URLs com _query strings_ (`?type=…&gas=…`), sem estrutura semântica.
- Título de página idêntico em todas as rotas ("Acail Gás – Produção e Comercialização de Gases…"), o que prejudica o SEO.
- Conteúdo técnico fragmentado por gás e sem hierarquia editorial.
- A oferta de serviços (granel, garrafas, on-site, telemetria) não está ligada às categorias de produto.

**Oportunidades:** URLs semânticos, metadados individuais, páginas de categoria com estrutura técnica (gases, aplicações, formas de fornecimento), percursos cruzados produto ↔ setor ↔ serviço e CTAs para pedidos de FDS e propostas.

---

## 4. Empresa (✅)

- A Acail Gás foi fundada em **1996** e dedica-se à **produção de gás a alta pressão**.
- Pertence ao **Grupo Acail**, descrito como tendo **"mais de 40 anos"** de atividade. 🔴 _Confirmar a formulação exata e o ano de referência._
- Atividade: produção, comercialização e distribuição de gases industriais, medicinais e alimentares.
- Homepage: _"Produzimos uma gama completa de gases atmosféricos e desenvolvemos gases específicos para a sua indústria."_
- **Missão:** satisfação do cliente, com foco na melhoria contínua e na formação das equipas.
- **Valores:** disponibilidade, dedicação e compromisso.
- **Pilares do Grupo:** responsabilidade, rigor, qualidade, criatividade e inovação, "através de uma visão empreendedora".
- CAE principal: **20110 – Fabricação de gases industriais** (documento de informação ao público de 2025).

🔴 Não foi possível obter a narrativa histórica completa (marcos, fundadores, instalações). A página "Empresa" usa apenas os factos acima.

---

## 5. Produtos: seis categorias (✅)

Fonte: `/gases/index?type=…` (PT, EN, ES). Todas as categorias indicam "outros gases mediante consulta".

### 5.1 Gases Industriais

Acetileno, Árgon, Azoto, Dióxido de Carbono, Hélio, Hidrogénio, Oxigénio, Dióxido de Enxofre, versões liquefeitas (ex.: Azoto Líquido) e **Misturas de Gases Industriais**.
Misturas com nome comercial observadas: HELARCO, ARCO, ARO, HELAR, HIDAZO, HIDARG, HELAZO, LASERMIX, METAR. 🔴 _Composições não obtidas._

Aplicações verificadas:

- **Azoto líquido:** gás de proteção, limpeza e arrefecimento; setores de metalurgia e construção.
- **Acetileno:** soldadura e corte (a chama atinge a temperatura mais elevada entre os gases combustíveis) e fabrico de vidro.
- **Hidrogénio:** gás redutor em processos metalúrgicos e cerâmicos, misturas de soldadura, hidrogenação de gorduras vegetais, produção de vitaminas e cosmética, gás de arraste/combustível em cromatografia, e componente na produção de amoníaco e metanol.
- **Dióxido de carbono:** tratamento de águas e águas residuais (controlo de pH e remineralização de água de osmose inversa).
- **Árgon (FDS PT.FDS.22-1951-01, Regulamento (UE) 2020/878):** gás de teste/calibração, purga, diluição e inertização, fabrico de componentes eletrónicos/fotovoltaicos e gás de proteção em soldadura. CAS 7440-37-1.

### 5.2 Gases Alimentares

Azoto, Oxigénio, Dióxido de Carbono, Árgon e misturas **ALIMIX 20, ALIMIX 30, ALIMIX 30/70, ALIMIX 40/30, ALIMIX A20**. 🔴 _Composições não obtidas._

- Inertização e desoxigenação de líquidos alimentares, que preserva a vida útil e o valor nutricional.
- Bebidas: azoto e CO₂, puros ou combinados, evitam a oxidação sem recurso a antioxidantes.
- Embalagem: uma gota de azoto líquido, introduzida antes do fecho, purga o ar e pressuriza a embalagem.
- Lacticínios: o CO₂ é o gás mais utilizado em embalagem, porque inibe ou reduz a atividade microbiana.

### 5.3 Gases Medicinais

Ar Medicinal Sintético, Oxigénio, Oxigénio Líquido (API), Oxigénio Criogénico e Protóxido de Azoto.

- Os gases medicinais estão classificados como **medicamentos** e são produzidos segundo as **Boas Práticas de Fabrico**, com níveis elevados de pureza.
- O Oxigénio Medicinal Acail e o Ar Medicinal Sintético Acail são **medicamentos sujeitos a receita médica**. Para mais informação, consultar o folheto informativo.
- Protóxido de azoto: analgésico e auxiliar na anestesia.
- Utilizadores: hospitais, clínicas, lares, INEM e bombeiros.

### 5.4 Gases Especiais

Gases puros e misturas especiais para laboratório, biotecnologia, farmacêutica e eletrónica.

- Gases de pureza ultra elevada: árgon, azoto, hélio e hidrogénio.
- Misturas de análise e calibração para cromatógrafos gasosos (múltiplos detetores), cromatógrafos líquidos, espectrómetros UV/VIS e RMN.
  🔴 _Graus de pureza e lista de misturas não obtidos._

### 5.5 Gases Dispositivo Médico

- **Dióxido de Carbono:** agente de insuflação em cirurgia laparoscópica e endoscópica.
- Outros gases mediante consulta.

### 5.6 Gelo Seco

- Limpeza criogénica: limpeza de equipamentos ou materiais sensíveis à água, por projeção de gelo seco a alta pressão.
- Alimentar: garantia da cadeia de frio no transporte de refeições e congelação rápida.
- Notícia: produção de gelo seco na fábrica de Aranda de Duero (Espanha).
  🔴 _Formatos (pellets, blocos) não confirmados._

---

## 6. Indústrias (✅)

Setores listados: Agricultura, Pecuária e Pescas; Alimentar; Ambiente; Construção; Eletrónica e Telecomunicações; Farmacêutica; Laboratórios; Lazer; Metalomecânica; Metalurgia; Química (Química Básica / Petroquímica e Refinarias de Petróleo); Reciclagem; Soldadura; Transportes; Vidro.

Setores com conteúdo detalhado verificado:

- **Metalurgia:** fundição, processos térmicos, fornos de arco elétrico, afinação de aço com oxigénio, homogeneização com azoto e árgon, e hidrometalurgia (flutuação com azoto e CO₂; lixiviação de cobre, ouro, prata e zinco com oxigénio).
- **Metalomecânica:** oxicorte, corte por plasma e corte laser (chapa fina e materiais como vidro e cerâmica).
- **Alimentar:** ver §5.2.
- **Laboratórios:** ver §5.4.
- **Ambiente / Química Básica:** arrefecimento de reatores, inertização, neutralização de pH, recuperação de solventes, tratamento de resíduos e de compostos orgânicos voláteis, como apoio ao cumprimento ambiental.

---

## 7. Serviços (✅)

- **Líquidos criogénicos a granel:** frota própria de camiões em todo o território e armazenagem em tanques criogénicos isolados a vácuo nas instalações do cliente. O tanque é dimensionado com o cliente em função do volume, pressão, caudal e utilização.
- **Garrafas e quadros:** garrafas individuais ou interligadas para consumos mensais baixos a médios que exigem mobilidade.
- **Produção on-site:** sistemas de produção de azoto, oxigénio e hidrogénio com componentes normalizados e unidade central com _back-up_. A Acail constrói, opera e mantém os sistemas.
- **Equipamentos:** gaseificadores, quadros elétricos, tanques ou vasos evaporadores, válvulas e acessórios.
- **Acail Vision (Acailvision):**
  - Telemetria que monitoriza continuamente o nível de produto no reservatório e facilita o planeamento de entregas.
  - Sistema modular de gestão de redes e garrafas de gases medicinais, adaptado a cada cliente, "para maior economia e fiabilidade na utilização de recursos".
  - **Decisão:** a informação oficial **não justifica página própria**. O Acail Vision é apresentado como secção em `/servicos#acail-vision` e referido em `/saude`.

---

## 8. Saúde (✅)

- Gama completa de gases medicinais (§5.3) e gases dispositivo médico (§5.5).
- **Acail Medicare** (site próprio: `acailmedicare.pt`): acompanhamento do doente respiratório no domicílio, com apoio técnico durante todo o tratamento prescrito pelo médico.
- 🔴 Linhas telefónicas divergentes: "Linha Azul (Medicare) 707 105 555" (contactos acailgas.pt) e "800 101 200 / 256 800 053" (acailmedicare.pt). **O site remete para `acailmedicare.pt` sem reproduzir números.**

---

## 9. Qualidade e segurança

| Elemento                                                                                     | Estado                                                                                       | Uso no site                                                            |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Boas Práticas de Fabrico (gases medicinais)                                                  | ✅                                                                                           | Publicado                                                              |
| FDS segundo o Regulamento (UE) 2020/878                                                      | ✅ (exemplo: árgon líquido)                                                                  | Publicado (pedido de FDS)                                              |
| Informação ao público: regime de prevenção de acidentes graves (DL n.º 150/2015), 27-03-2025 | ✅                                                                                           | Publicado, com link para o PDF oficial                                 |
| **ISO 9001:2015**                                                                            | 🔴 Referida num resumo indexado da homepage, sem entidade certificadora, âmbito nem validade | **Não publicado.** Registado em `certifications` com `verified: false` |
| Autorização de Introdução no Mercado (AIM) / INFARMED                                        | 🟡 Circular INFARMED 2021 (fonte secundária)                                                 | Não publicado                                                          |

---

## 10. Contactos (✅ sede Portugal)

- **Morada:** Rua da Gesteira de Cima, n.º 134 e n.º 280, 4520-717 Souto SMF (Santa Maria da Feira), Portugal.
  - 🔴 Fontes secundárias indicam 4520-715 e os n.º 234/280. Prevalece o site oficial.
- **Telefone:** +351 256 800 050 / 052 / 054 (chamada para a rede fixa nacional).
- **Fax:** +351 256 800 069.
- **Email geral:** geral@acailgrupo.pt.
  - 🔴 Também surgem gas@acailgrupo.pt e um email nominativo no documento de 2025. Não são publicados.
- 🔴 A página oficial tem contactos de **Acail Gás Espanha** e **Acail Gás Angola** que não foram obtidos. **Não se mistura a operação angolana com a portuguesa.** Nenhum dado de Angola é publicado.
- Horário de funcionamento: não encontrado.

---

## 11. Rede de distribuidores (✅ parcial)

**Portugal:** Souto SMF (sede), Braga, Pombal, Tejo (Palmela), Évora, Acail Norte (Lousada), Construmadeira (Funchal, Madeira), Acail Açores (Rabo de Peixe), Torres Vedras, Santarém, Leiria, Chaves e Viseu. O site oficial tem cerca de 30 entradas.

**Espanha:** O Porriño (Pontevedra, escritório principal, no Polígono Industrial de Budiño), Castellar del Vallès (Barcelona), Vitoria, Camarma de Esteruelas (Madrid), Larrabetzu (Bizkaia), Aranda de Duero (Burgos, fábrica) e distribuidores em Toledo, Ávila, Badajoz, Zamora, Cantábria e A Coruña. O site oficial tem cerca de 17 entradas.

🔴 Nomes completos, moradas e telefones de cada ponto **não obtidos**. O site publica apenas a localidade e o tipo, com o pedido de contacto feito via sede.

---

## 12. Notícias (✅ títulos e resumos)

1. **Nova unidade de produção criogénica de gás:** projeto cofinanciado, aprovado em 2016, com capacidade prevista de 40 toneladas/dia e custo total elegível aprovado de 5 292 075 €.
2. **Fábrica de Aranda de Duero produz gelo seco** (Espanha).
3. **Temos nova morada:** mudança do escritório de Espanha para o Polígono Industrial de Budiño (O Porriño, Pontevedra).

🔴 Datas de publicação e textos integrais não obtidos. O site publica resumos factuais sem data.

---

## 13. Identidade visual 🔴

- O logótipo, as cores e a tipografia oficiais **não puderam ser obtidos**.
- O site usa um **logótipo tipográfico provisório** (`components/layout/logo.tsx`), identificado no código e na documentação, a substituir pelos ficheiros oficiais.
- A paleta proposta (navy profundo + acento ciano criogénico) está documentada em `DESIGN_SYSTEM.md` e **deve ser calibrada com o manual de marca**.

---

## 14. Lista de validação (para a Acail Gás)

1. Enquadramento da marca após a aquisição pela Linde (entidade, logótipo, domínio, contactos).
2. Certificação ISO 9001:2015: certificado, entidade, âmbito e validade.
3. Logótipo vetorial, manual de marca, paleta e tipografia oficiais.
4. Fotografias institucionais com direitos de utilização (instalações, frota, tanques, laboratório).
5. Composições das misturas (ALIMIX, HELARCO, LASERMIX, …) e graus de pureza dos gases especiais.
6. Textos integrais e datas das notícias.
7. Lista completa de distribuidores com contactos.
8. Contactos de Espanha (e decisão sobre a inclusão de Angola).
9. Horário de atendimento.
10. Email correto para pedidos comerciais e destinatário do formulário.
11. Formulação "mais de 40 anos" do Grupo Acail.
12. NIF e denominação social para as páginas legais (🟡 diretórios indicam NIF 503789151).
13. Linhas de apoio Acail Medicare.
14. Revisão jurídica das políticas de privacidade, cookies e termos.

---

## 15. Fontes

- Domínio oficial (excertos indexados): `acailgas.pt/`, `/empresa`, `/gases/index?type=…`, `/en/gases`, `/es/gases`, `/industria`, `/industria/post?industry=…`, `/en/servicos`, `/saude`, `/en/distribuidores`, `/es/distribuidores`, `/en/noticia`, `/noticia/4/nova-unidade-de-producao-criogenica-de-gas`, `/es/noticia/3/tenemos-nueva-direccion`, `/contactos`, `/resolucao-alternativa-litigios.html`, `/files/info/2025.03.27_infopublico.pdf`, `/files/security/ptfds22-1951-01argon-liquidorev0320220310.pdf`.
- Secundárias (contexto, não publicadas): forbes.es, corresponsables.com, eco.sapo.pt, gasworld.com, deloitte.com, acailmedicare.pt, acailferro.pt/acail-grupo, racius.com.

Ver também `CONTENT_SOURCES.md` para o mapa entre cada conteúdo publicado e a sua fonte.
