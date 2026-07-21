import type { Metadata } from "next";
import Link from "next/link";
import { Container, Reveal, StaggerLines } from "@/components/primitives";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "The Vision",
  description:
    "Keldon starts with honest nutraceuticals and intends to become the name people trust with their health for a lifetime.",
};

const horizons = [
  {
    n: "01",
    h: "Diagnostics",
    b: "Know what's actually happening in your body, clearly and at home, without the fear or the jargon. So you act early, not late.",
  },
  {
    n: "02",
    h: "Guidance you understand",
    b: "Software that reads your health honestly and tells you the truth in plain words, not a wall of numbers you can't use.",
  },
  {
    n: "03",
    h: "Nutrition made personal",
    b: "Not what the average body needs. What yours does, measured first, then met.",
  },
  {
    n: "04",
    h: "Longevity",
    b: "More good years, not just more years. Health that quietly compounds over a lifetime.",
  },
  {
    n: "05",
    h: "Always-on care",
    b: "A calm, continuous sense of how you're doing. It surfaces what matters and quietly ignores what doesn't.",
  },
  {
    n: "06",
    h: "Consumer biotech",
    b: "The frontier, made everyday, with the same restraint we bring to a bottle of juice.",
  },
];

export default function VisionPage() {
  return (
    <>
      <PageIntro
        eyebrow="Where we're going"
        title="A company built to outlive its founders."
        lead="Keldon starts as a place to buy honest nutraceuticals. But selling supplements was never the point. Becoming the name you trust with your health, for a lifetime, is."
      />

      <section className="py-24 md:py-36">
        <Container>
          <StaggerLines
            className="display-lg max-w-4xl text-ink"
            lineClassName="text-balance"
            lines={[
              "Anyone can sell a bottle.",
              "Very few earn the right",
              "to be trusted for a hundred years.",
            ]}
          />
          <Reveal delay={0.3} className="mt-10 max-w-editorial">
            <p className="lead">
              That&rsquo;s the bar we&rsquo;ve set ourselves: the kind of trust
              people give Apple, Leica, or Patagonia. Not for what they say, but
              for what they&rsquo;ve never once betrayed.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-ink/8 py-24 md:py-32">
        <Container>
          <Reveal className="max-w-editorial">
            <p className="eyebrow">Where this goes next</p>
            <h2 className="display-md mt-5 text-balance text-ink">
              Nutraceuticals are the start, not the summit.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-mute">
              Each of these is a promise we intend to keep, but only once
              we&rsquo;ve earned the right to. In order:
            </p>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2">
            {horizons.map((horizon, i) => (
              <Reveal key={horizon.n} delay={(i % 2) * 0.1}>
                <div className="flex gap-6">
                  <span className="font-display text-lg font-light text-ink-faint">
                    {horizon.n}
                  </span>
                  <div>
                    <h3 className="display-md text-ink">{horizon.h}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-ink-mute">
                      {horizon.b}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-28 text-paper md:py-40">
        <Container className="text-center">
          <Reveal>
            <p className="mx-auto max-w-3xl text-balance font-display text-3xl font-light leading-[1.2] tracking-tight md:text-5xl">
              We refine nature, we put people before profit, and we intend to
              still be doing both in a hundred years.
            </p>
            <p className="mx-auto mt-8 max-w-md leading-relaxed text-paper/60">
              It starts with a few honest products, and a promise to earn your
              trust one of them at a time.
            </p>
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 text-sm font-medium text-paper transition-all duration-500 ease-calm hover:border-paper hover:bg-paper hover:text-ink"
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
