import { Container, Reveal } from "@/components/primitives";

export function PageIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="pt-28 md:pt-40">
      <Container>
        <Reveal immediate>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal immediate delay={0.1}>
          <h1 className="display-xl mt-6 max-w-4xl text-balance text-ink">
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal immediate delay={0.2}>
            <p className="lead mt-8 max-w-editorial">{lead}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
