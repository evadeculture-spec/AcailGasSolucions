import { siteConfig } from "@/config/site";
import type { LegalDocument } from "@/types/content";

/**
 * Legal texts. Drafted to describe the website as built (no analytics, no
 * marketing cookies, contact form only). They require legal review before
 * publication — see docs/CONTENT_AUDIT.md §14.
 */

const { legalName, contact } = siteConfig;
const addressLine = `${contact.address.street}, ${contact.address.postalCode} ${contact.address.locality}, ${contact.address.country}`;

export const privacyPolicy: LegalDocument = {
  title: "Política de Privacidade",
  updatedLabel: "Versão inicial do novo website",
  intro: `A ${legalName} respeita a privacidade de quem visita este website e trata os dados pessoais de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a legislação nacional aplicável.`,
  sections: [
    {
      id: "responsavel",
      title: "Responsável pelo tratamento",
      paragraphs: [
        `${legalName}, com sede em ${addressLine}.`,
        `Para qualquer questão relacionada com dados pessoais, contacte ${contact.email}.`,
      ],
    },
    {
      id: "dados",
      title: "Dados recolhidos",
      paragraphs: [
        "Através do formulário de contacto são recolhidos os dados que nos fornece voluntariamente:",
      ],
      list: [
        "Nome",
        "Empresa (opcional)",
        "Endereço de email",
        "Telefone (opcional)",
        "Assunto, produto de interesse e conteúdo da mensagem",
      ],
    },
    {
      id: "finalidades",
      title: "Finalidades e fundamento",
      paragraphs: [
        "Os dados são tratados exclusivamente para responder ao seu pedido de contacto, informação ou proposta comercial. O fundamento do tratamento é o seu consentimento e as diligências pré-contratuais a seu pedido.",
        "Os dados não são utilizados para fins de marketing sem consentimento prévio e específico.",
      ],
    },
    {
      id: "conservacao",
      title: "Conservação",
      paragraphs: [
        "Os dados são conservados apenas pelo período necessário à resposta ao pedido e ao eventual seguimento comercial, salvo obrigação legal de conservação por prazo superior.",
      ],
    },
    {
      id: "destinatarios",
      title: "Destinatários e subcontratantes",
      paragraphs: [
        "As mensagens enviadas através do formulário são transmitidas por um prestador de serviços de envio de email, que atua como subcontratante e apenas processa os dados para esse fim.",
        "O website é alojado por um prestador de serviços de alojamento, que pode tratar dados técnicos de acesso (como o endereço IP) para garantir a segurança e o funcionamento do serviço.",
      ],
    },
    {
      id: "direitos",
      title: "Os seus direitos",
      paragraphs: [
        `Pode exercer os direitos de acesso, retificação, apagamento, limitação, portabilidade e oposição, bem como retirar o consentimento a qualquer momento, contactando ${contact.email}.`,
        "Tem ainda o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).",
      ],
    },
    {
      id: "seguranca",
      title: "Segurança",
      paragraphs: [
        "O website utiliza ligação cifrada (HTTPS) e aplica medidas técnicas e organizativas adequadas para proteger os dados pessoais contra acesso, alteração ou divulgação não autorizados.",
      ],
    },
  ],
  seo: {
    title: "Política de Privacidade",
    description: "Como a Acail Gás trata os dados pessoais recolhidos através deste website.",
  },
};

export const cookiePolicy: LegalDocument = {
  title: "Política de Cookies",
  updatedLabel: "Versão inicial do novo website",
  intro:
    "Este website não utiliza cookies de análise, de publicidade nem de redes sociais, nem carrega conteúdos de terceiros que os instalem.",
  sections: [
    {
      id: "o-que-sao",
      title: "O que são cookies",
      paragraphs: [
        "Cookies são pequenos ficheiros de texto guardados no seu dispositivo pelo navegador, que permitem a um website memorizar informação sobre a sua visita.",
      ],
    },
    {
      id: "utilizacao",
      title: "Cookies utilizados",
      paragraphs: [
        "O website não instala cookies próprios nem de terceiros. A infraestrutura de alojamento pode utilizar mecanismos estritamente necessários à segurança e entrega do serviço, que não exigem consentimento.",
      ],
    },
    {
      id: "consentimento",
      title: "Alterações futuras",
      paragraphs: [
        "Se, no futuro, forem introduzidas ferramentas de análise ou outras que utilizem cookies não essenciais, estas só serão ativadas após o seu consentimento expresso, através de um mecanismo de gestão de preferências, e esta política será atualizada.",
      ],
    },
    {
      id: "gestao",
      title: "Gestão no navegador",
      paragraphs: [
        "Pode, a qualquer momento, consultar e eliminar cookies através das definições do seu navegador.",
      ],
    },
  ],
  seo: {
    title: "Política de Cookies",
    description: "Informação sobre a utilização de cookies no website da Acail Gás.",
  },
};

export const termsAndConditions: LegalDocument = {
  title: "Termos e Condições",
  updatedLabel: "Versão inicial do novo website",
  intro: `Estes termos regulam a utilização do website da ${legalName}. Ao utilizar o website, aceita as condições aqui descritas.`,
  sections: [
    {
      id: "informacao",
      title: "Natureza da informação",
      paragraphs: [
        "Os conteúdos deste website têm caráter informativo e não constituem proposta contratual. As características, disponibilidade e condições de fornecimento dos produtos e serviços são confirmadas em proposta comercial.",
        "A informação sobre gases medicinais não substitui o folheto informativo dos medicamentos nem o aconselhamento de um profissional de saúde.",
      ],
    },
    {
      id: "seguranca-produtos",
      title: "Segurança dos produtos",
      paragraphs: [
        "O manuseamento de gases deve respeitar as respetivas Fichas de Dados de Segurança. As fichas podem ser solicitadas através do formulário de contacto ou do email geral.",
      ],
    },
    {
      id: "propriedade",
      title: "Propriedade intelectual",
      paragraphs: [
        `Os conteúdos, marcas e elementos gráficos deste website são propriedade da ${legalName} ou utilizados com autorização. A sua reprodução depende de autorização prévia.`,
      ],
    },
    {
      id: "responsabilidade",
      title: "Responsabilidade",
      paragraphs: [
        "A Acail Gás procura manter a informação atualizada e correta, mas não garante a ausência de erros ou interrupções do website. Os links para websites de terceiros são disponibilizados para conveniência, não sendo a Acail Gás responsável pelos respetivos conteúdos.",
      ],
    },
    {
      id: "resolucao-litigios",
      title: "Resolução alternativa de litígios",
      paragraphs: [
        "Em caso de litígio de consumo, o consumidor pode recorrer a uma entidade de resolução alternativa de litígios de consumo. A lista de entidades está disponível no Portal do Consumidor (www.consumidor.gov.pt).",
        "Está igualmente disponível o Livro de Reclamações Eletrónico (www.livroreclamacoes.pt).",
      ],
    },
    {
      id: "lei",
      title: "Lei aplicável",
      paragraphs: ["Estes termos regem-se pela lei portuguesa."],
    },
  ],
  seo: {
    title: "Termos e Condições",
    description: "Condições de utilização do website da Acail Gás.",
  },
};
