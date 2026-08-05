import Link from "next/link";
import { Container, Reveal } from "@/components/primitives";
import { ScienceVisual } from "@/components/science-visual";
import { ProductCard } from "@/components/product-card";
import { Newsletter } from "@/components/newsletter";
import {
  products,
  site,
  contact,
  getFeaturedProducts,
} from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Featured Nutraceuticals",
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.name,
          description: p.summary,
          brand: {
            "@type": "Brand",
            name: site.name,
            alternateName: site.maker,
          },
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `${site.url}/products/${p.slug}`,
          },
        },
      })),
    },
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
    <section className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[780px] w-full overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24 lg:pt-48 flex items-center">
      {/* Background Banner Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/banner.png"
          alt="Keldon HB+ Syrup natural nutrition"
          className="h-full w-full object-cover object-[75%_top] sm:object-[70%_top] md:object-[65%_top] lg:object-top"
        />
        {/* Soft gradient overlay for smooth text contrast on smaller screens */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#e8e0d4]/85 via-[#e8e0d4]/50 to-transparent sm:from-[#e8e0d4]/70 sm:via-[#e8e0d4]/30 lg:from-[#e8e0d4]/20 lg:via-transparent"
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="max-w-xl lg:max-w-lg xl:max-w-xl">
          <Reveal immediate delay={0.1}>
            <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#6E1E2E]">
              KELDON BY AARUBY NUTRACEUTICALS
            </p>
            <h1 className="font-display font-light text-[#1b2c22] leading-[1.08] text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              Better health
              <br />
              is a choice we make
              <br />
              <em className="italic font-normal">every day.</em>
            </h1>
          </Reveal>

          <Reveal immediate delay={0.25}>
            <div className="mt-5 mb-6 h-[2px] w-12 bg-[#c2ad8e]" />
          </Reveal>

          <Reveal immediate delay={0.35}>
            <p className="font-sans font-light leading-relaxed text-[#4a554d] text-base sm:text-lg max-w-md">
              Thoughtfully crafted nutrition with clean, bioavailable
              ingredients and unwavering integrity.
            </p>
          </Reveal>

          <Reveal immediate delay={0.45} className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#1b2c22] px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#f5f2eb] transition-all duration-300 hover:bg-[#2c4436] hover:shadow-lg"
            >
              EXPLORE OUR PRODUCTS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <Link
              href="/philosophy"
              className="text-xs font-semibold uppercase tracking-widest text-[#1b2c22] underline underline-offset-4 transition-colors hover:text-evergreen"
            >
              OUR STORY
            </Link>
          </Reveal>

          <Reveal immediate delay={0.55}>
            <ul className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 pt-6 border-t border-[#1b2c22]/10">
              {[
                { i: "leaf", t: "Natural Ingredients" },
                { i: "flask", t: "Science Backed" },
                { i: "heart", t: "Daily Wellness" },
                { i: "shield", t: "Trusted Quality" },
              ].map((f) => (
                <li key={f.t} className="flex flex-col items-start gap-1.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/50 text-evergreen">
                    <FeatureIcon name={f.i} />
                  </span>
                  <span className="text-xs font-medium leading-tight text-ink-soft">{f.t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
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
const testimonials = [
  {
    q: "Excellent quality products and great customer service. The ingredients are high quality, the packaging is premium, and the products have exceeded my expectations. Definitely a brand I trust and would recommend.",
    n: "Sam K.",
  },
  {
    q: "Very good HB+ Syrup, my hemoglobin levels increased.",
    n: "A AS",
  },
  {
    q: "Healthy option to increase haemoglobin level..",
    n: "Suni Hari",
  },
  {
    q: "Quality assured product range of multivitamin and other wellness products.",
    n: "Reena Shah",
  },
  {
    q: "Good and pure product.",
    n: "Pooja Kadam",
  },
  {
    q: "Very Good Product.",
    n: "Gaurav Gupta",
  },
  {
    q: "Keldon's HB+ Syrup has genuinely improved my energy levels. Clean ingredients and no aftertaste.",
    n: "Bhaven S.",
  },
  {
    q: "Good products.",
    n: "Vihan Patil",
  },
  {
    q: "Good and pure products.",
    n: "Aditya Patil",
  },
  {
    q: "Love the philosophy behind Keldon. You can feel the quality in every product.",
    n: "Unnati S.",
  },
];

function Testimonials() {
  return (
    <section className="bg-sage-soft/60 py-20 md:py-28 overflow-hidden">
      <Container>
        <Reveal>
          <div className="text-center max-w-xl mx-auto">
            <span className="eyebrow text-evergreen">Community Feedback</span>
            <h2 className="display-lg text-ink mt-2">What our customers say</h2>
            <p className="mt-3 text-sm text-ink-mute">
              Real reviews from real people who trust Keldon for their daily health & wellness.
            </p>
          </div>
        </Reveal>
      </Container>

      {/* Slow Scrolling Horizontal Marquee Slider */}
      <div className="mt-14 overflow-hidden select-none">
        <div className="animate-marquee-slow flex items-stretch gap-6 px-4">
          {/* Loop 1 */}
          <div className="flex items-stretch gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={`t1-${i}`} t={t} />
            ))}
          </div>

          {/* Loop 2 (Seamless loop) */}
          <div className="flex items-stretch gap-6" aria-hidden="true">
            {testimonials.map((t, i) => (
              <TestimonialCard key={`t2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: { q: string; n: string } }) {
  return (
    <figure className="flex w-[320px] sm:w-[380px] shrink-0 flex-col gap-4 rounded-2xl border border-ink/8 bg-paper/90 p-7 shadow-sm transition-all duration-300 hover:border-ink/15 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 text-amber-600" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, s) => (
            <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
            </svg>
          ))}
        </div>
        <span className="text-[0.7rem] font-medium text-evergreen">5.0 ★</span>
      </div>

      <blockquote className="text-sm leading-relaxed text-ink-soft">
        &ldquo;{t.q}&rdquo;
      </blockquote>

      <figcaption className="mt-auto pt-4 border-t border-ink/8 text-xs font-semibold text-ink">
        {t.n}
      </figcaption>
    </figure>
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
