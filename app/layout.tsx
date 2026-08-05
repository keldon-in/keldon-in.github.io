import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, sans } from "./fonts";
import { site, contact } from "@/lib/site";
import { CartProvider } from "@/components/cart";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Grain } from "@/components/primitives";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Premium Nutraceuticals by ${site.maker}`,
    template: `%s | ${site.name} - ${site.maker}`,
  },
  description: `${site.name} by ${site.maker} — ${site.tagline}. ${site.description} Featuring patented HB+ Prickly Pear syrup for natural iron & hemoglobin, daily multivitamin gummies, and botanical herbals.`,
  applicationName: site.name,
  keywords: [
    "Keldon",
    "Keldon Health",
    "keldon.in",
    "www.keldon.in",
    "Aaruby",
    "Aaruby Nutraceuticals",
    "Aaruby Health",
    "preventive health",
    "nutraceuticals India",
    "HB+ Syrup",
    "HB+ Prickly Pear Syrup",
    "prickly pear nectar",
    "stevia fruit nectar",
    "natural iron supplement",
    "hemoglobin support syrup",
    "multivitamin gummies",
    "daily herbals",
    "botanical supplements",
    "FSSAI licensed nutraceuticals",
  ],
  authors: [{ name: site.maker, url: "https://www.aaruby.com" }],
  publisher: site.maker,
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    title: `${site.name} | Premium Nutraceuticals by ${site.maker}`,
    description: `${site.name} by ${site.maker} — ${site.tagline}. Patented HB+ Prickly Pear syrup, multivitamin gummies, and daily botanical herbals.`,
    siteName: `${site.name} by ${site.maker}`,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: "/logo_bg.png",
        width: 1200,
        height: 630,
        alt: `${site.name} by ${site.maker}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Premium Nutraceuticals by ${site.maker}`,
    description: `${site.name} by ${site.maker} — ${site.tagline}. Clean, bioavailable preventive-health essentials.`,
    images: ["/logo_bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.maker,
      alternateName: [
        "Aaruby",
        "Aaruby Nutraceuticals",
        "Keldon Health",
        "Keldon India",
        "keldon.in",
      ],
      url: site.url,
      logo: `${site.url}/logo.png`,
      sameAs: [
        "https://www.instagram.com/aarubynutraceuticals/",
        "https://www.facebook.com/aarubynutraceuticals/",
        "https://www.aaruby.com",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phoneDisplay,
        contactType: "customer service",
        email: contact.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: ["Aaruby Nutraceuticals", "Keldon Health", "keldon.in"],
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "Brand",
      "@id": `${site.url}/#brand`,
      name: site.name,
      alternateName: ["Aaruby Nutraceuticals", "Aaruby"],
      url: site.url,
      logo: `${site.url}/logo.png`,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
        {/* Graceful degradation: if JS is disabled, reveal all motion content. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
        <Grain />
      </body>
    </html>
  );
}
