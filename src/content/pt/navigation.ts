import { routes } from "@/lib/routes";
import type { NavGroup, NavItem } from "@/types/content";

import { productCategories } from "./products";

export const primaryNavigation: NavGroup[] = [
  {
    label: "Empresa",
    href: routes.company,
    children: [
      { label: "A Empresa", href: routes.company, description: "Origem, missão e valores" },
      { label: "História e identidade", href: routes.history, description: "Percurso desde 1996" },
      {
        label: "Qualidade e segurança",
        href: routes.quality,
        description: "Boas Práticas de Fabrico, FDS e informação pública",
      },
      { label: "Notícias", href: routes.news, description: "Atualidade da Acail Gás" },
    ],
  },
  {
    label: "Produtos",
    href: routes.products,
    children: [
      ...productCategories.map((category) => ({
        label: category.name,
        href: routes.product(category.slug),
        description: category.summary,
      })),
    ],
  },
  { label: "Indústrias", href: routes.industries },
  { label: "Serviços", href: routes.services },
  { label: "Saúde", href: routes.health },
  { label: "Distribuidores", href: routes.distributors },
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
      { label: "Acail Vision", href: routes.acailVision },
      { label: "Saúde", href: routes.health },
    ],
  },
  {
    title: "Empresa",
    items: [
      { label: "A Empresa", href: routes.company },
      { label: "Qualidade e segurança", href: routes.quality },
      { label: "Rede de distribuidores", href: routes.distributors },
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
