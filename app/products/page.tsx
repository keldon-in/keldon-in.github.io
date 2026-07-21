import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/primitives";
import { PageIntro } from "@/components/page-intro";
import { ProductBrowser } from "@/components/product-browser";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Keldon. Nutraceuticals refined from nature, third-party tested, and good enough for our own families.",
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
