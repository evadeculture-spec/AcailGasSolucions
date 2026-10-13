import { ShieldCheck, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { routes } from "@/lib/routes";

interface Panel {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  link: { label: string; href: string };
}

const panels: Panel[] = [
  {
    icon: ShieldCheck,
    eyebrow: "Qualidade e segurança",
    title: "Qualidade com rigor documentado.",
    body: "Os gases medicinais são produzidos segundo as Boas Práticas de Fabrico. As Fichas de Dados de Segurança estão disponíveis mediante pedido.",
    points: [
      "Boas Práticas de Fabrico nos gases medicinais",
      "Fichas de Dados de Segurança segundo o Regulamento (UE) 2020/878",
      "Informação ao público sobre prevenção de acidentes graves",
    ],
    link: { label: "Qualidade e segurança", href: routes.quality },
  },
  {
    icon: HeartPulse,
    eyebrow: "Saúde",
    title: "Gases medicinais para quem cuida.",
    body: "Gases classificados como medicamentos, com níveis elevados de pureza, utilizados diariamente por hospitais, clínicas, lares, INEM e bombeiros.",
    points: [
      "Oxigénio, ar medicinal sintético e protóxido de azoto",
      "Dióxido de carbono como dispositivo médico",
      "Gestão de redes e garrafas com Acail Vision",
    ],
    link: { label: "Soluções para a saúde", href: routes.health },
  },
];

export function HomeQualityHealth() {
  return (
    <Section tone="muted" aria-label="Qualidade e saúde">
      <Container>
        <Eyebrow index="05" className="mb-10">
          Compromisso
        </Eyebrow>
        <div className="grid gap-6 lg:grid-cols-2">
          {panels.map((panel) => (
            <article
              key={panel.eyebrow}
              className="flex flex-col rounded-sm border border-steel-200 bg-white p-8 md:p-12"
              data-reveal
            >
              <panel.icon aria-hidden="true" className="size-7 text-blue-600" strokeWidth={1.4} />
              <p className="mt-8 font-mono text-label text-steel-500 uppercase">{panel.eyebrow}</p>
              <h2 className="mt-3 text-h3 text-navy-900">{panel.title}</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel-600">{panel.body}</p>
              <ul className="mt-8 space-y-3 border-t border-steel-200 pt-6 text-[0.9375rem] text-steel-800">
                {panel.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-blue-500" />
                    {point}
                  </li>
                ))}
              </ul>
              <ArrowLink href={panel.link.href} className="mt-auto pt-10">
                {panel.link.label}
              </ArrowLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
