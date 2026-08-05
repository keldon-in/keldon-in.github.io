import type { Metadata } from "next";
import Link from "next/link";
import { Container, Reveal, StaggerLines } from "@/components/primitives";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Philosophy",
  description:
    "We refine nature, we don't reinvent it. The honest rules behind everything Keldon and Aaruby Nutraceuticals make.",
  alternates: { canonical: "/philosophy" },
  openGraph: {
    title: "Our Philosophy | Keldon by Aaruby Nutraceuticals",
    description:
      "We refine nature, we don't reinvent it. The honest rules behind everything Keldon and Aaruby Nutraceuticals make.",
  },
};

const beliefs = [
  {
    n: "01",
    h: "Start with what already works",
    b: "The nutrients that keep us well are older than any brand. We source them well and get out of the way, rather than engineering a replacement and hoping you can't tell.",
  },
  {
    n: "02",
    h: "Understand it before we sell it",
    b: "Science isn't decoration on a label. We use it to know exactly what's in the bottle and what it actually does, and we won't claim a word more.",
  },
  {
    n: "03",
    h: "Refine, don't fake",
    b: "We take out what doesn't belong and keep what does. No synthetic stand-ins dressed up as the real thing, ever.",
  },
  {
    n: "04",
    h: "Say less than we could",
    b: "It's easy to promise the world in health. We'd rather under-promise, prove it in your body, and let results earn the next sentence.",
  },
  {
    n: "05",
    h: "The family test",
    b: "One question decides everything: would we give this to the people we love? If the answer is no, it doesn't ship. There is no second rule.",
  },
  {
    n: "06",
    h: "People before profit",
    b: "Every call runs through one filter: does this genuinely help the person taking it? When money and honesty disagree, honesty wins. That's the whole plan.",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <PageIntro
        eyebrow="What we believe"
        title="We refine nature. We don't try to outsmart it."
        lead="We started Keldon because most supplements ask you to trust a label you can't verify. We wanted the opposite: products simple enough to understand, and honest enough that we give them to our own families."
      />

      {/* Manifesto lines */}
      <section className="py-24 md:py-36">
        <Container>
          <StaggerLines
            className="display-lg max-w-4xl text-ink"
            lineClassName="text-balance"
            lines={[
              "Nature worked most of this out",
              "long before we arrived.",
              "Our job is to respect that,",
              "and to prove it, honestly.",
            ]}
          />
        </Container>
      </section>

      {/* Beliefs grid */}
      <section className="border-t border-ink/8 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-2">
            {beliefs.map((belief, i) => (
              <Reveal key={belief.n} delay={(i % 2) * 0.1}>
                <div className="flex gap-6">
                  <span className="font-display text-lg font-light text-ink-faint">
                    {belief.n}
                  </span>
                  <div>
                    <h2 className="display-md text-ink">{belief.h}</h2>
                    <p className="mt-3 max-w-md leading-relaxed text-ink-mute">
                      {belief.b}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Pull quote */}
      <section className="bg-evergreen-deep py-28 text-paper md:py-40">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-4xl text-balance font-display text-3xl font-light leading-[1.2] tracking-tight md:text-5xl">
              We&rsquo;re not trying to be the biggest name in health, just the
              one you don&rsquo;t have to think twice about.
            </p>
            <div className="mt-12 flex items-center justify-center gap-6">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 text-sm font-medium text-paper transition-all duration-500 ease-calm hover:border-paper hover:bg-paper hover:text-evergreen-deep"
              >
                Shop the collection
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
