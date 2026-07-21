import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Reveal } from "@/components/primitives";
import { ProductHero } from "@/components/product-detail";
import { AddToCartButton } from "@/components/cart";
import {
  products,
  site,
  getProduct,
  getVariants,
  getDefaultVariant,
  getPriceRange,
  variantSummary,
  hasVariants,
} from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.summary,
    alternates: { canonical: `${site.url}/products/${product.slug}` },
    openGraph: { title: product.name, description: product.summary },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const accent = product.tint === "pear" ? "#6E1E2E" : "#B7772A";
  const other = products.find((p) => p.slug !== product.slug);

  // Product JSON-LD with per-variant offers (AggregateOffer) for rich results.
  const variants = getVariants(product);
  const range = getPriceRange(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: site.name },
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: range.min,
      highPrice: range.max,
      offerCount: variants.length,
      offers: variants.map((v) => ({
        "@type": "Offer",
        sku: v.sku,
        name: variantSummary(product, v) || product.name,
        price: v.price,
        priceCurrency: "INR",
        availability:
          v.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        url: `${site.url}/products/${product.slug}?variant=${v.sku}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Interactive hero — variant selection lives here */}
      <ProductHero product={product} />

      {/* Attributes ribbon */}
      <section className="mt-24 border-y border-ink/8 py-8 md:mt-32">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
            {product.attributes.map((a) => (
              <li key={a} className="font-display text-lg font-light text-ink-soft">
                {a}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Story */}
      <section className="py-24 md:py-36">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">The making of it</p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-16">
              {product.story.map((s, i) => (
                <Reveal key={s.heading} delay={i * 0.08}>
                  <h2 className="display-md text-ink">{s.heading}</h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-mute">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Facts + usage */}
      <section className="border-t border-ink/8 bg-paper-soft/50 py-24 md:py-32">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <h2 className="display-md text-ink">What&rsquo;s inside</h2>
            <dl className="mt-8 divide-y divide-ink/10">
              {product.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between py-3.5">
                  <dt className="text-sm text-ink-mute">{f.label}</dt>
                  <dd className="font-display text-lg font-light text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-ink-mute">
              <span className="font-medium text-ink-soft">Ingredients. </span>
              {product.ingredients}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <h2 className="display-md text-ink">How to use it</h2>
            <ol className="mt-8 space-y-5">
              {product.usage.map((u, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium text-paper"
                    style={{ backgroundColor: accent }}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-ink-soft">{u}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Disclaimer + order */}
      <section className="py-24 text-center md:py-32">
        <Container>
          <Reveal>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-ink-mute">
              This is a dietary supplement and is not intended to diagnose,
              treat, cure, or prevent any disease. For diagnosis and treatment,
              consult a medical practitioner.
            </p>
            <div className="mt-8 flex justify-center">
              {hasVariants(product) ? (
                <Link
                  href="#buy"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-all duration-500 ease-calm hover:bg-evergreen"
                >
                  Choose your {product.name}
                </Link>
              ) : (
                <AddToCartButton sku={getDefaultVariant(product).sku} label={`Add ${product.name} to order`} />
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Next product */}
      {other && (
        <section className="border-t border-ink/8 py-20">
          <Container>
            <Link href={`/products/${other.slug}`} className="group flex flex-col items-center text-center">
              <span className="eyebrow text-ink-mute">Next</span>
              <span className="display-lg mt-3 text-ink transition-colors group-hover:text-evergreen">
                {other.name}
              </span>
            </Link>
          </Container>
        </section>
      )}
    </>
  );
}
