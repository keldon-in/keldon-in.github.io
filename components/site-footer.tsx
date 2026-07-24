import Link from "next/link";
import { KeldonEmblem, KeldonWordmark, AarubyMark, FssaiMark } from "@/components/marks";
import { Container } from "@/components/primitives";
import { SocialLinks } from "@/components/social-links";
import { contact } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-evergreen-deep text-paper">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand & Marketed By */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <KeldonEmblem light className="h-10" />
              <KeldonWordmark className="text-2xl text-paper" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              Refining nature into everyday wellness. People before profit, always.
            </p>
            <div className="mt-6 flex flex-col items-start gap-2 text-paper/60">
              <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-paper/50">
                A brand of
              </span>
              <a
                href="https://aaruby.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aaruby Nutraceuticals"
                className="inline-flex items-center rounded-xl bg-paper px-3.5 py-2 transition-transform hover:scale-105"
              >
                <AarubyMark className="h-7" />
              </a>
              <div className="mt-1 flex items-center gap-2 rounded-lg bg-paper/10 px-3 py-1.5 backdrop-blur-sm">
                <FssaiMark light />
              </div>
            </div>
          </div>

          {/* Shop */}
          <nav aria-label="Shop" className="text-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-paper/45">Shop</p>
            <ul className="mt-4 space-y-2.5 text-paper/75">
              <li><Link href="/products" className="transition-colors hover:text-paper">All products</Link></li>
              <li><Link href="/products/hb-plus" className="transition-colors hover:text-paper">HB+ Syrup</Link></li>
              <li><Link href="/products/multivitamins" className="transition-colors hover:text-paper">Multi-vitamins</Link></li>
              <li><Link href="/products/daily-herbals" className="transition-colors hover:text-paper">Daily Herbals</Link></li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company" className="text-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-paper/45">Company</p>
            <ul className="mt-4 space-y-2.5 text-paper/75">
              <li><Link href="/philosophy" className="transition-colors hover:text-paper">Our Science</Link></li>
              <li><Link href="/vision" className="transition-colors hover:text-paper">The Vision</Link></li>
            </ul>
            <div className="mt-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-paper/45">Follow Us</p>
              <SocialLinks
                className="mt-3"
                itemClassName="bg-paper/10 text-paper hover:bg-paper hover:text-evergreen-deep"
              />
            </div>
          </nav>

          {/* Contact Us - Industry Standard */}
          <div aria-label="Contact Us" className="text-sm">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-paper/45">Contact Us</p>
            <ul className="mt-4 space-y-3.5 text-xs text-paper/75">
              <li className="flex flex-col gap-0.5">
                <span className="text-[0.6rem] uppercase tracking-wider text-paper/40">Customer Support</span>
                <a href={contact.phoneHref} className="transition-colors hover:text-paper">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-[0.6rem] uppercase tracking-wider text-paper/40">General Enquiries</span>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-paper">
                  {contact.email}
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-[0.6rem] uppercase tracking-wider text-paper/40">Complaints & Grievances</span>
                <a href={`mailto:${contact.complaintsEmail}`} className="transition-colors hover:text-paper">
                  {contact.complaintsEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-paper/12 pt-8 text-xs text-paper/45 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Keldon. A brand of{" "}
            <a
              href="https://aaruby.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline hover:text-inherit font-medium"
            >
              Aaruby Nutraceuticals
            </a>{" "}
            · FSSAI Reg. No.:- {contact.fssaiRegNo}
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
