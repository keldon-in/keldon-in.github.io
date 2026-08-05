import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/primitives";
import { PageIntro } from "@/components/page-intro";
import { ProductBrowser } from "@/components/product-browser";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Shop Keldon by Aaruby Nutraceuticals. Premium nutraceuticals refined from nature, third-party tested, including HB+ Prickly Pear Syrup, multivitamin gummies, and daily herbals.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Shop All Products | Keldon by Aaruby Nutraceuticals",
    description:
      "Browse Keldon by Aaruby Nutraceuticals. Patented HB+ Prickly Pear syrup, multivitamin gummies, and botanical herbals.",
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageIntro
        eyebrow="The collection"
        title="Everyday health, refined from nature."
        lead="Browse by need or explore everything. Each product is refined from nature, third-party tested, and made to a standard we'd give our own families. Add to your order and send it to us in a tap."
      />

      <section className="py-14 md:py-20">
        <Container>
          <Suspense fallback={null}>
            <ProductBrowser />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
