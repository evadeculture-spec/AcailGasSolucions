import { routes } from "@/lib/routes";
import type { NavGroup, NavItem } from "@/types/content";

import { productCategories } from "./products";

export const primaryNavigation: NavGroup[] = [
  {
    label: "Empresa",
    href: routes.company,
    children: [
      { label: "A Empresa", href: routes.company, description: "Missão e compromissos" },
      { label: "História", href: routes.history, description: "Percurso desde 2005" },
      {
        label: "Qualidade e certificação",
        href: routes.quality,
        description: "ISO 22000:2018 e compromisso com a segurança",
      },
      { label: "Notícias", href: routes.news, description: "Atualidade da fábrica de gases" },
    ],
  },
  {
    label: "Produtos",
    href: routes.products,
    children: productCategories.map((category) => ({
      label: category.name,
      href: routes.product(category.slug),
      description: category.summary,
    })),
  },
  { label: "Indústrias", href: routes.industries },
  { label: "Serviços", href: routes.services },
  { label: "Saúde", href: routes.health },
];

export const contactNavItem: NavItem = { label: "Contactos", href: routes.contact };

export const footerNavigation: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Produtos",
    items: productCategories.map((category) => ({
      label: category.name,
      href: routes.product(category.slug),
    })),
  },
  {
    title: "Soluções",
    items: [
      { label: "Indústrias e aplicações", href: routes.industries },
      { label: "Serviços e fornecimento", href: routes.services },
      { label: "Redes de gases industriais", href: routes.industrialNetworks },
      { label: "Redes de gases medicinais", href: routes.medicalNetworks },
      { label: "Saúde", href: routes.health },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "A Empresa", href: routes.company },
      { label: "Qualidade e certificação", href: routes.quality },
      { label: "Notícias", href: routes.news },
      { label: "Contactos", href: routes.contact },
    ],
  },
];

export const legalNavigation: NavItem[] = [
  { label: "Política de Privacidade", href: routes.privacy },
  { label: "Política de Cookies", href: routes.cookies },
  { label: "Termos e Condições", href: routes.terms },
];
