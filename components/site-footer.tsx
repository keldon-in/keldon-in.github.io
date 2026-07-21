import Link from "next/link";
import { KeldonEmblem, KeldonWordmark, AarubyMark } from "@/components/marks";
import { Container } from "@/components/primitives";
import { SocialLinks } from "@/components/social-links";
import { contact } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-evergreen-deep text-paper">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <KeldonEmblem light className="h-10" />
              <KeldonWordmark className="text-2xl text-paper" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              Refining nature into everyday wellness. People before profit, always.
            </p>
            <div className="mt-6 flex items-center gap-3 text-paper/60">
              <span className="text-[0.6rem] uppercase tracking-widest">Marketed by</span>
              <a
                href="https://aaruby.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aaruby Nutraceuticals"
                className="inline-flex rounded-lg bg-paper px-2.5 py-1.5"
              >
                <AarubyMark className="h-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Shop" className="text-sm">
            <p className="text-[0.65rem] uppercase tracking-widest text-paper/45">Shop</p>
            <ul className="mt-5 space-y-3 text-paper/75">
              <li><Link href="/products" className="transition-colors hover:text-paper">All products</Link></li>
              <li><Link href="/products/hb-plus" className="transition-colors hover:text-paper">HB+ Juice</Link></li>
              <li><Link href="/products/multivitamins" className="transition-colors hover:text-paper">Multi-vitamins</Link></li>
              <li><Link href="/products/daily-herbals" className="transition-colors hover:text-paper">Daily Herbals</Link></li>
            </ul>
          </nav>

          <nav aria-label="Company" className="text-sm">
            <p className="text-[0.65rem] uppercase tracking-widest text-paper/45">Company</p>
            <ul className="mt-5 space-y-3 text-paper/75">
              <li><Link href="/philosophy" className="transition-colors hover:text-paper">Our science</Link></li>
              <li><Link href="/vision" className="transition-colors hover:text-paper">The vision</Link></li>
              <li><a href={contact.phoneHref} className="transition-colors hover:text-paper">{contact.phoneDisplay}</a></li>
              <li><a href={`mailto:${contact.email}`} className="transition-colors hover:text-paper">{contact.email}</a></li>
            </ul>
          </nav>

          <div className="col-span-2 text-sm md:col-span-1">
            <p className="text-[0.65rem] uppercase tracking-widest text-paper/45">Follow us</p>
            <SocialLinks
              className="mt-4"
              itemClassName="bg-paper/10 text-paper hover:bg-paper hover:text-evergreen-deep"
            />
            {/* <p className="mt-6 max-w-xs text-xs leading-relaxed text-paper/40">
              {contact.address}
            </p> */}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-paper/12 pt-8 text-xs text-paper/45 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Keldon. Marketed by{" "}
            <a
              href="https://aaruby.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline hover:text-inherit"
            >
              Aaruby Nutraceuticals
            </a>
            .
          </p>
          <p className="max-w-lg leading-relaxed">
            These products are dietary supplements. They are not intended to
            diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </Container>
    </footer>
  );
}
