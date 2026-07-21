import Link from "next/link";
import { Container } from "@/components/primitives";
import { DropGlyph } from "@/components/marks";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center">
      <Container className="text-center">
        <DropGlyph className="mx-auto h-14 w-auto text-evergreen/70" />
        <p className="eyebrow mt-8">Off the path</p>
        <h1 className="display-xl mt-5 text-ink">This page hasn&rsquo;t grown here.</h1>
        <p className="mx-auto mt-5 max-w-sm leading-relaxed text-ink-mute">
          The link may be old, or the page may have moved. Let&rsquo;s get you
          back to something real.
        </p>
        <div className="mt-9 flex items-center justify-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors duration-500 hover:bg-evergreen"
          >
            Return home
          </Link>
          <Link href="/products" className="link-quiet text-sm">
            See the products
          </Link>
        </div>
      </Container>
    </section>
  );
}
