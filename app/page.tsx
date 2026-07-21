import Link from "next/link";
import { Container, Reveal, Float } from "@/components/primitives";
import { ProductVisual } from "@/components/product-visual";
import { ScienceVisual } from "@/components/science-visual";
import { ProductCard } from "@/components/product-card";
import { Newsletter } from "@/components/newsletter";
import {
  products,
  site,
  contact,
  getFeaturedProducts,
  getDefaultVariant,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      description: site.description,
      slogan: site.tagline,
      email: contact.email,
      telephone: contact.phoneDisplay,
    },
    ...products.map((p) => ({
      "@type": "Product",
      name: p.name,
      description: p.summary,
      brand: { "@type": "Brand", name: site.name },
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${site.url}/products/${p.slug}`,
      },
    })),
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Bestsellers />
      <Promise />
      <Science />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}

/* ------------------------------------------------------------------ Hero */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-40">
      <div
        aria-hidden="true"
        className="animate-aura pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 82% 12%, rgba(167,183,149,0.35), transparent 55%), radial-gradient(90% 70% at 8% 96%, rgba(47,74,58,0.10), transparent 55%)",
        }}
      />
      <Container className="grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <div>
          <Reveal immediate delay={0.1}>
            <h1 className="display-hero text-ink" style={{ fontSize: "clamp(2.6rem,6.5vw,5.5rem)" }}>
              Better inside.
              <br />
              Stronger you.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.25}>
            <p className="lead mt-6 max-w-md">
              Premium nutraceuticals crafted with clean ingredients and honest
              nutrition, for your everyday wellness and long-term health.
            </p>
          </Reveal>
          <Reveal immediate delay={0.4} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-all duration-500 ease-calm hover:bg-evergreen"
            >
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 ease-calm group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <Link href="/philosophy" className="link-quiet text-sm">
              Our science
            </Link>
          </Reveal>
          <Reveal immediate delay={0.55}>
            <ul className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {[
                { i: "leaf", t: "Natural Ingredients" },
                { i: "flask", t: "Science Backed" },
                { i: "heart", t: "Daily Wellness" },
                { i: "shield", t: "Trusted Quality" },
              ].map((f) => (
                <li key={f.t} className="flex flex-col items-start gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/50 text-evergreen">
                    <FeatureIcon name={f.i} />
                  </span>
                  <span className="text-xs font-medium leading-tight text-ink-soft">{f.t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Two products, staggered — each links to its product page */}
        <Reveal immediate delay={0.3} className="w-full">
          <div className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4 lg:ml-auto lg:mr-0">
            {[products[0], products[1]].map((p, i) => (
              <Float key={p.slug} className={i === 1 ? "mt-10" : ""} duration={6 + i} delay={i * 0.8}>
                <Link
                  href={`/products/${p.slug}`}
                  aria-label={`View ${p.name}`}
                  className="block rounded-[24px] transition-all duration-500 ease-calm hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  <ProductVisual
                    slug={p.slug}
                    accent={getDefaultVariant(p).accent}
                    caption={getDefaultVariant(p).title}
                    className="aspect-[3/4] w-full"
                  />
                </Link>
              </Float>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const p = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "leaf") return <svg {...p}><path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 8-4 16-9 16Z" /><path d="M4 20c2-6 6-9 12-11" /></svg>;
  if (name === "flask") return <svg {...p}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" /></svg>;
  if (name === "heart") return <svg {...p}><path d="M12 20s-7-4.5-9.5-9C1 8 3 4.5 6.5 4.5c2 0 3.5 1.5 5.5 3.5 2-2 3.5-3.5 5.5-3.5C21 4.5 23 8 21.5 11 19 15.5 12 20 12 20Z" /></svg>;
  return <svg {...p}><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" /></svg>;
}

/* ----------------------------------------------------------- Bestsellers */
function Bestsellers() {
  const featured = getFeaturedProducts();
  return (
    <section id="shop" className="scroll-mt-24 py-16 md:py-24">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg text-ink">Our Bestsellers</h2>
          <Link href="/products" className="link-quiet text-sm uppercase tracking-wide">
            View all products →
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- Promise */
function Promise() {
  const items = [
    { i: "leaf", t: "Clean Ingredients" },
    { i: "flask", t: "No Artificial Fillers" },
    { i: "heart", t: "Clinically Studied" },
    { i: "shield", t: "Made for Everyday You" },
  ];
  return (
    <section className="bg-evergreen-deep py-12 text-paper md:py-14">
      <Container>
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((it) => (
            <li key={it.t} className="flex flex-col items-center gap-3 text-center">
              <span className="text-sage-deep"><FeatureIcon name={it.i} /></span>
              <span className="text-sm font-medium text-paper">{it.t}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- Science */
function Science() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="display-lg text-ink">Rooted in Nature. Backed by Science.</h2>
          <p className="mt-6 max-w-md leading-relaxed text-ink-mute">
            At Keldon, we believe the best solutions come from nature, and are
            perfected by science. Every product is the result of thoughtful
            research, clean ingredients, and a commitment to your health.
          </p>
          <Link
            href="/philosophy"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-medium text-ink transition-all duration-500 ease-calm hover:border-ink hover:bg-ink hover:text-paper"
          >
            Learn our science
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 ease-calm group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <ScienceVisual />
        </Reveal>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------- Testimonials */
// Placeholder testimonials — replace with real, verifiable reviews before launch.
const testimonials = [
  { q: "Keldon's HB+ Juice has genuinely improved my energy levels. Clean ingredients and no aftertaste.", n: "Bhaven S." },
  { q: "Finally, a multivitamin gummy that tastes good and works well. My daily essential.", n: "Reena S." },
  { q: "Love the philosophy behind Keldon. You can feel the quality in every product.", n: "Unnati S." },
];

function Testimonials() {
  return (
    <section className="bg-sage-soft py-20 md:py-24">
      <Container>
        <Reveal>
          <h2 className="display-lg text-center text-ink">What our community says</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.1}>
              <figure className="flex h-full flex-col items-center gap-4 rounded-2xl bg-paper/60 p-8 text-center">
                <div className="flex gap-0.5 text-evergreen" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" /></svg>
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-ink-soft">&ldquo;{t.q}&rdquo;</blockquote>
                <figcaption className="mt-auto text-sm font-medium text-ink">{t.n}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------- NewsletterSect. */
function NewsletterSection() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-[28px] bg-paper-soft px-6 py-14 text-center md:px-10">
          <Reveal>
            <h2 className="display-md text-ink">Stay in the loop</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-mute">
              Be the first to know about new products, offers, and wellness tips.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex w-full justify-center">
            <Newsletter />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
