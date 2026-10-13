import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { company } from "@/content/pt/company";
import { routes } from "@/lib/routes";

export function HomeIdentity() {
  return (
    <Section tone="navy" aria-labelledby="identidade-title">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <Eyebrow index="06" tone="dark" className="mb-5">
            Identidade
          </Eyebrow>
          <h2 id="identidade-title" className="text-h2 text-white">
            A nossa missão
          </h2>
          <p className="mt-6 max-w-md text-lead text-steel-300">{company.mission}</p>
          <ArrowLink href={routes.history} tone="dark" className="mt-8">
            História e identidade
          </ArrowLink>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="font-mono text-label text-steel-400 uppercase">Valores</p>
          <ul className="mt-6 border-t border-white/12">
            {company.values.map((value, index) => (
              <li
                key={value}
                className="flex items-baseline justify-between border-b border-white/12 py-6"
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span className="font-display text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] leading-none tracking-[-0.03em] text-white">
                  {value}
                </span>
                <span aria-hidden="true" className="font-mono text-label text-cryo-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
