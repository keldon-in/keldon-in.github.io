# Keldon

A premium storefront for a preventive-health company built to last a hundred years.
Today, nutraceuticals refined from nature — HB+ Syrup and Multivitamins, made by
Aaruby Nutraceuticals. Tomorrow, the systems that help people live healthier,
longer, better lives.

Visitors land, immediately see what's offered, and can order — with the calm,
editorial feel of a brand institution rather than a noisy supplement shop.

## Ordering

The store has a real cart (`Add to order` → cart drawer with quantities). To
order, the customer taps **Send order on WhatsApp** or **Send order by email** —
the cart is compiled into a pre-filled message (line items + subtotal +
name/address prompts) that opens WhatsApp or their mail client, and the team
takes it from there. The cart persists in `localStorage`, and `/#order`
deep-links straight to it. (No apologetic "no online payment" copy anywhere — the
flow just works.)

## Stack

- **Next.js 15** (App Router, TypeScript, static export of every route)
- **Tailwind CSS 3** — custom warm, natural token system
- **Framer Motion** — slow, intentional scroll reveals and transitions
- **next/font** — Fraunces (editorial display serif) + Inter (UI/text), self-hosted

## Getting started

```bash
npm install        # installs into a project-local node_modules (isolated)
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are static / SSG)
npm run start      # serve the production build
```

## Design system

- **Palette** — warm bone paper, warm near-black ink, a single evergreen accent.
  Two product tints used sparingly: prickly-pear burgundy (HB+) and honey amber
  (Multivitamins). Defined in `tailwind.config.ts`.
- **Type** — fluid display classes (`display-hero`, `display-xl`, …) in
  `app/globals.css`; Fraunces tuned with optical sizing + a soft axis.
- **Motion** — `Reveal` / `StaggerLines` in `components/primitives.tsx`. Above-the-fold
  content uses `immediate` (animate on mount); everything else reveals on scroll.
  Reduced-motion and no-JS are both handled.

## Structure

```
app/
  layout.tsx            Root: fonts, SEO metadata, providers, header/footer, grain
  page.tsx              Homepage: hero → manifesto → products → trust → vision → invite
  philosophy/           The beliefs behind the brand
  products/             Index + [slug] detail pages (hb-plus, multivitamins)
  vision/               The 100-year institution
  not-found.tsx  sitemap.ts  robots.ts  icon.svg
components/
  marks.tsx             Keldon wordmark + Aaruby DNA-helix lockup (vector)
  primitives.tsx        Reveal, StaggerLines, Container, Grain
  cart.tsx              CartProvider + cart drawer + AddToCartButton + CartButton
  buy-box.tsx           Product-detail price + quantity + add-to-order box
  product-card.tsx      Shoppable product card (price, MRP, add to order)
  product-visual.tsx    Vector product portraits (placeholders for studio photography)
  search.tsx            Search overlay (filters products + pages)
  page-intro.tsx  site-header.tsx  site-footer.tsx
lib/
  site.ts               Single source of truth: brand, contact, products, PRICES
```

## Navbar

Three-tier layout inspired by Ensure.com's structure (not its colours):
1. **Utility strip** — phone · Talk to an Expert (WhatsApp) · Search
2. **Brand band** — **Keldon** (product brand, left) · **Marketed by Aaruby** (parent/maker, right) — mirroring Ensure ↔ Abbott placement
3. **Main nav** — Products (dropdown) · Philosophy · The Vision, with the **Order** (cart) button on the right

Tiers 1–2 collapse on scroll, leaving a compact sticky nav with a small Keldon mark. On mobile it condenses to Keldon + cart + menu, with the utility links and Aaruby lockup inside the drawer.

## Adding products & categories (built to scale)

The catalog is fully data-driven from `lib/site.ts` — add entries there and they
flow through the entire storefront automatically (nav mega-menu, homepage
featured + "shop by need", filterable `/products`, category deep-links, product
pages, cart, SEO structured data).

- **New product** — append to the `products` array. Set `categorySlug` (must
  match a `categories` entry), `price`/`mrp`, `benefit`, `featured` (surfaces on
  the homepage), and an optional `badge` ("New", "Bestseller", …). Add a matching
  case in `components/product-visual.tsx` or drop in real photography.
- **New category** — append to the `categories` array. It appears in the
  Products mega-menu, the homepage "Shop by need" strip, and as a filter tab on
  `/products`. Deep-link with `/products?c=<slug>`.
- Helpers: `getFeaturedProducts()`, `getProductsByCategory(slug)`,
  `getCategoriesInUse()`, `getCategory(slug)`.

The homepage, product grid, and filters make **no assumption about how many
products exist** — 2 or 200 render the same way.

## Logos

- **Keldon** — leaf emblem (central sprout + two cupping leaves) + KELDON
  wordmark, tagline "Rooted in Nature. Refined by Science." A clean SVG
  recreation of `logo.png` lives in `components/marks.tsx` (`KeldonEmblem`,
  `KeldonWordmark`, `KeldonLockup`); the source `logo.png` had a gray background
  so it couldn't be used raw. Themes automatically (leaves = `currentColor`) for
  light and dark.
- **Aaruby** — the real brand PNG at `public/aaruby.png` (transparent), rendered
  by `AarubyMark`. Shown "Marketed by" in the footer (on a light chip). The
  header uses a text "Marketed by Aaruby Nutraceuticals" banner.

## Before going live — confirm these

- **⚠️ Prices** in `lib/site.ts` are **PLACEHOLDER** values (marked with comments):
  HB+ ₹899 / MRP ₹1099, Multivitamins ₹599 / MRP ₹699. Replace with real prices.
- **⚠️ Testimonials** on the homepage (`app/page.tsx`, `testimonials`) are
  **PLACEHOLDER** quotes. Replace with real, verifiable reviews.
- **⚠️ Service promises** in the footer (free delivery / returns) are placeholders
  — set them to the brand's real policy, or remove.
- **Newsletter** (`components/newsletter.tsx`) has no backend yet; it opens a
  mailto. Wire it to a real list provider.
- **WhatsApp / email / social** in `lib/site.ts` (`channels`, `contact`, `socials`,
  and `WA_NUMBER` in `components/cart.tsx`) are sensible defaults — confirm the
  brand's official number, address, and profile URLs.
- **`site.url`** in `lib/site.ts` — set to the production domain.
- **Product photography** — `components/product-visual.tsx` renders vector
  placeholders (green glass + KELDON labels); swap for studio images when ready.
- **OG/social image** — add an `app/opengraph-image` when brand imagery is ready.
