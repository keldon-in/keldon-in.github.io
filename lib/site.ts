// Single source of truth for brand, contact, and product data.
// Contact handles are best-guess defaults — confirm/replace with the brand's
// official profiles before going live.

export const site = {
  name: "Keldon",
  maker: "Aaruby Nutraceuticals",
  tagline: "Rooted in Nature. Refined by Science.",
  description:
    "Keldon is a preventive-health company. Premium nutraceuticals refined from nature, and a growing store of everyday health essentials, each good enough for our own families.",
  url: "https://keldon.health",
} as const;

export const contact = {
  phoneDisplay: "+91 91525 35156",
  phoneHref: "tel:+919152535156",
  email: "nutraceuticals@aaruby.com",
  website: "www.aaruby.com",
  // address:
  //   "Unit 405, RP-112, Globe Arcade, Near Ganesh Mandir, MIDC Residential Area, Dombivli East, Thane 421203, Maharashtra, India",
} as const;

export type Channel = {
  id: "whatsapp" | "instagram" | "facebook" | "email";
  label: string;
  detail: string;
  href: string;
};

export const channels: Channel[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: contact.phoneDisplay,
    href: "https://wa.me/919152535156",
  },
  {
    id: "instagram",
    label: "Instagram",
    detail: "@aaruby.nutraceuticals",
    href: "https://instagram.com/aaruby.nutraceuticals",
  },
  {
    id: "facebook",
    label: "Facebook",
    detail: "Aaruby Nutraceuticals",
    href: "https://facebook.com/aarubynutraceuticals",
  },
  {
    id: "email",
    label: "Email",
    detail: contact.email,
    href: `mailto:${contact.email}?subject=${encodeURIComponent(
      "Keldon product enquiry",
    )}`,
  },
];

export const certifications = ["ISO 22000", "GMP", "HACCP", "FSSAI Licensed"];

// Social profiles — best-guess handles; confirm official URLs before launch.
export type Social = { id: "instagram" | "facebook" | "youtube" | "email"; label: string; href: string };

export const socials: Social[] = [
  { id: "instagram", label: "Instagram", href: "https://instagram.com/aaruby.nutraceuticals" },
  { id: "facebook", label: "Facebook", href: "https://facebook.com/aarubynutraceuticals" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com/@aaruby" },
  { id: "email", label: "Email", href: `mailto:${contact.email}` },
];

// Currency for the storefront.
export const currency = { code: "INR", symbol: "₹" } as const;

export function formatPrice(amount: number) {
  return `${currency.symbol}${amount.toLocaleString("en-IN")}`;
}

// ---------------------------------------------------------------------------
// Catalog taxonomy — add categories here as the store grows. Every product
// references a categorySlug, so new products and categories flow through the
// whole storefront (nav, filters, category pages) automatically.
// ---------------------------------------------------------------------------
export type Category = {
  slug: string;
  name: string;
  blurb: string;
};

export const categories: Category[] = [
  {
    slug: "blood-vitality",
    name: "Blood & Vitality",
    blurb: "Iron, energy, and the essentials of healthy blood.",
  },
  {
    slug: "daily-essentials",
    name: "Daily Essentials",
    blurb: "Everyday nutrition for the whole family.",
  },
  {
    slug: "herbal-wellness",
    name: "Herbal Wellness",
    blurb: "Time-tested botanicals, targeted for every need.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

// ---------------------------------------------------------------------------
// Variant system (Shopify-style options → variants)
//
// A product declares a list of *options* (axes such as Formula, Pack, Plan).
// Each option has a set of *values*. A *variant* is one concrete, purchasable
// combination of option values, with its own SKU, price, availability, image
// accent, and metadata. This is the industry-standard model: adding a new axis
// (Flavor, Strength, Size, …) is purely data — no code changes required.
//
// Products with a single offering can omit `options`/`variants`; helpers below
// synthesise a single default variant from the product's own fields so every
// consumer (cards, cart, PDP, SEO) can treat everything uniformly.
// ---------------------------------------------------------------------------

export type OptionValue = {
  slug: string;
  label: string;
  swatch?: string; // hex colour for a visual chip (optional)
  note?: string; // short caption, e.g. "Save 15%"
  group?: string; // optional grouping label (e.g. a health concern)
};

export type ProductOption = {
  slug: string; // stable key used inside Variant.options, e.g. "formula"
  name: string; // display label, e.g. "Formula"
  /** How the catalog card should render this axis. Defaults sensibly by size. */
  display?: "chips" | "select" | "swatch";
  values: OptionValue[];
};

export type Variant = {
  sku: string; // globally unique
  /** Map of optionSlug -> valueSlug. Empty for single-offering products. */
  options: Record<string, string>;
  price: number;
  mrp?: number;
  inStock?: boolean; // default true
  title?: string; // display name for this variant (e.g. the formula name)
  accent?: string; // colour that drives the product visual
  /** Variant-specific metadata surfaced dynamically on the PDP. */
  meta?: { label: string; value: string }[];
  default?: boolean; // the pre-selected variant
};

export type Product = {
  slug: string;
  name: string;
  category: string; // descriptive subtitle shown on cards
  categorySlug: string; // taxonomy reference (see `categories`)
  badge?: string; // e.g. "Bestseller", "New"
  featured?: boolean; // surfaced on the homepage
  inStock?: boolean; // default true
  essence: string; // one-line poetic descriptor
  summary: string;
  tint: "pear" | "honey";
  form: string;
  origin: string;
  // Pricing — PLACEHOLDER values in INR. Replace with real prices before launch.
  price: number;
  mrp?: number; // optional "before" price for a strikethrough
  benefit: string; // short shopping-card benefit line
  attributes: string[];
  facts: { label: string; value: string }[];
  ingredients: string;
  usage: string[];
  story: { heading: string; body: string }[];
  patent?: string;
  // Variant system (optional). When present, these drive pricing/availability.
  options?: ProductOption[];
  variants?: Variant[];
};

// ---------------------------------------------------------------------------
// Gummy Bite — a single parent product with many variants. Formulas are the
// primary axis (Kids Multivitamin, Hair, Immunity, …); Pack and Plan are
// secondary axes. Variants are generated as the cartesian product, so the whole
// range stays DRY and new formulas/axes are a one-line data change.
// ---------------------------------------------------------------------------

type GummyFormula = {
  slug: string;
  label: string;
  accent: string; // drives the product visual + swatch
  benefit: string;
  actives: string; // key ingredients, shown as variant metadata
  base: number; // one-bottle price (INR)
  mrp: number; // one-bottle MRP
};

const GUMMY_FORMULAS: GummyFormula[] = [
  { slug: "kids-multivitamin", label: "Kids Multivitamin", accent: "#C43D63", benefit: "Growth and everyday development for children.", actives: "Vitamins A, C, D, E, B-complex, Zinc", base: 449, mrp: 549 },
  { slug: "adult-multivitamin", label: "Adult Multivitamin", accent: "#B7772A", benefit: "Complete daily nutrition for adults.", actives: "Multivitamin & mineral blend, Biotin", base: 499, mrp: 599 },
  { slug: "hair", label: "Hair", accent: "#6D4AA0", benefit: "Stronger hair, from the roots.", actives: "Biotin, Folate, Zinc, Amla", base: 549, mrp: 649 },
  { slug: "immunity", label: "Immunity", accent: "#2F6E4F", benefit: "Strong immunity and overall wellness.", actives: "Vitamin C, Zinc, Elderberry", base: 499, mrp: 599 },
  { slug: "energy", label: "Energy", accent: "#C86A1F", benefit: "All-day stamina and vitality.", actives: "B12, Iron, Ginseng", base: 499, mrp: 599 },
  { slug: "eye-care", label: "Eye Care", accent: "#2E6B8F", benefit: "Everyday support for tired eyes.", actives: "Lutein, Zeaxanthin, Vitamin A", base: 549, mrp: 649 },
  { slug: "bone-health", label: "Bone Health", accent: "#5B6BA8", benefit: "Stronger bones and joints.", actives: "Calcium, Vitamin D3, K2", base: 499, mrp: 599 },
  { slug: "gut-health", label: "Gut Health", accent: "#4B7A54", benefit: "Balanced digestion, every day.", actives: "Probiotics, Prebiotic fibre", base: 549, mrp: 649 },
  { slug: "sleep", label: "Sleep", accent: "#3B4A80", benefit: "Calmer nights, easier mornings.", actives: "Melatonin, L-Theanine, Chamomile", base: 499, mrp: 599 },
  { slug: "skin", label: "Skin", accent: "#C25B7C", benefit: "Radiant, healthy-looking skin.", actives: "Collagen, Vitamin C, Hyaluronic acid", base: 549, mrp: 649 },
  { slug: "omega-3", label: "Omega 3", accent: "#1F6E7A", benefit: "Heart, brain and joint support.", actives: "Algal Omega-3 (DHA/EPA)", base: 599, mrp: 699 },
  { slug: "brain", label: "Brain", accent: "#7A4FA0", benefit: "Focus, memory and clarity.", actives: "Omega-3, Bacopa, Vitamin B12", base: 599, mrp: 699 },
  { slug: "respiratory", label: "Basil (Respiratory)", accent: "#3E7D5A", benefit: "Everyday respiratory support.", actives: "Holy Basil (Tulsi), Vitamin C", base: 499, mrp: 599 },
  { slug: "menstruation", label: "Menstruation", accent: "#A63D5B", benefit: "Support through the monthly cycle.", actives: "Iron, B6, Cramp-bark, Magnesium", base: 549, mrp: 649 },
  { slug: "prenatal", label: "Prenatal", accent: "#B06A8F", benefit: "Nutrition for pregnancy and planning.", actives: "Folate, Iron, DHA, Iodine", base: 649, mrp: 749 },
  { slug: "uti", label: "UTI", accent: "#2B6EA0", benefit: "Everyday urinary tract support.", actives: "D-Mannose, Cranberry, Vitamin C", base: 549, mrp: 649 },
];

const GUMMY_OPTIONS: ProductOption[] = [
  {
    slug: "formula",
    name: "Formula",
    display: "select",
    values: GUMMY_FORMULAS.map((f) => ({ slug: f.slug, label: f.label, swatch: f.accent, note: f.benefit })),
  },
];

function buildGummyVariants(): Variant[] {
  return GUMMY_FORMULAS.map((f) => ({
    sku: `MV-${f.slug.toUpperCase().replace(/-/g, "")}`,
    options: { formula: f.slug },
    price: f.base,
    mrp: f.mrp,
    inStock: true,
    title: f.label,
    accent: f.accent,
    default: f.slug === "kids-multivitamin",
    meta: [
      { label: "Formula", value: f.label },
      { label: "Count", value: "30 gummies" },
      { label: "Key actives", value: f.actives },
    ],
  }));
}

// ---------------------------------------------------------------------------
// Daily Herbals — a broad range of single-focus botanical capsules/softgels,
// grouped by health concern. Same one-axis (Formula) variant model as the
// gummies; the `group` field on each value drives the grouped selector UI.
// ---------------------------------------------------------------------------

type HerbalFormula = {
  slug: string;
  label: string;
  group: string; // health concern, used to group the selector
  accent: string;
  benefit: string;
  actives: string;
  count: string; // e.g. "60 capsules"
  dose: string; // directions
  base: number;
  mrp: number;
};

const HERBAL_FORMULAS: HerbalFormula[] = [
  // Immunity & Wellness
  { slug: "daily-defense", label: "Daily Defense", group: "Immunity & Wellness", accent: "#C86A1F", benefit: "Everyday immunity, heart and joint support.", actives: "Amla, Tulsi, Guduchi", count: "60 capsules", dose: "1 capsule morning and 1 at night, after food.", base: 649, mrp: 799 },
  { slug: "daily-moringa", label: "Daily Moringa", group: "Immunity & Wellness", accent: "#4B7A54", benefit: "Everyday superfood nutrition.", actives: "Moringa leaf extract", count: "60 capsules", dose: "2 capsules daily, preferably at meal times.", base: 549, mrp: 699 },
  { slug: "daily-triphala", label: "Daily Triphala", group: "Immunity & Wellness", accent: "#7A4FA0", benefit: "Gentle detox and bowel wellness.", actives: "Triphala (Amla, Haritaki, Bibhitaki)", count: "60 capsules", dose: "2 to 3 capsules daily, at meal times.", base: 499, mrp: 599 },
  { slug: "daily-green-tea", label: "Daily Green Tea", group: "Immunity & Wellness", accent: "#6E8B3D", benefit: "Supports a healthy metabolism.", actives: "Green tea catechins (EGCG)", count: "60 capsules", dose: "1 to 2 capsules daily, at meal times.", base: 549, mrp: 649 },
  { slug: "daily-n-durance", label: "Daily N-Durance", group: "Immunity & Wellness", accent: "#C43D63", benefit: "Endurance and healthy circulation.", actives: "Herbal endurance blend", count: "60 capsules", dose: "2 to 4 capsules per day.", base: 699, mrp: 849 },
  // Heart & Cholesterol
  { slug: "omega-3-double", label: "Omega-3 Double", group: "Heart & Cholesterol", accent: "#2E6B8F", benefit: "Double-strength fish oil for heart, joints and brain.", actives: "Fish oil (EPA/DHA), 2x strength", count: "60 softgels", dose: "1 to 2 softgels per day, before food.", base: 899, mrp: 1099 },
  { slug: "omega-3-triple", label: "Omega-3 Triple", group: "Heart & Cholesterol", accent: "#1F6E7A", benefit: "Triple-strength omega-3 for all-round wellness.", actives: "Fish oil (EPA/DHA), 3x strength", count: "60 softgels", dose: "2 softgels per day, before food.", base: 1099, mrp: 1299 },
  { slug: "daily-pomegranate", label: "Daily Pomegranate", group: "Heart & Cholesterol", accent: "#A63D5B", benefit: "Supports cardiac health and blood pressure.", actives: "Pomegranate extract (punicalagins)", count: "60 capsules", dose: "1 capsule morning and 1 at night, after food.", base: 649, mrp: 799 },
  { slug: "daily-amla", label: "Daily Amla", group: "Heart & Cholesterol", accent: "#C25B4A", benefit: "Balances healthy triglyceride levels.", actives: "Bioactive Amla extract", count: "60 capsules", dose: "1 capsule morning and 1 at night, after food.", base: 549, mrp: 649 },
  { slug: "omega-flax", label: "Omega Flax", group: "Heart & Cholesterol", accent: "#6D4AA0", benefit: "Plant omega for heart and brain.", actives: "Flaxseed oil (ALA)", count: "90 softgels", dose: "1 softgel 3 times a day, after food.", base: 599, mrp: 699 },
  // Brain & Sleep
  { slug: "daily-brahmi", label: "Daily Brahmi", group: "Brain & Sleep", accent: "#4A6FA0", benefit: "Concentration, memory and mental wellness.", actives: "Brahmi (Bacopa monnieri)", count: "60 capsules", dose: "2 to 3 capsules daily, at meal times.", base: 599, mrp: 699 },
  { slug: "sleep-n-rest", label: "Sleep N'Rest", group: "Brain & Sleep", accent: "#3B4A80", benefit: "For better quality sleep and rest.", actives: "Herbal sleep blend", count: "30 capsules", dose: "1 capsule 1 hour before sleep.", base: 549, mrp: 649 },
  { slug: "daily-ashwagandha", label: "Daily Ashwagandha", group: "Brain & Sleep", accent: "#8A5A2B", benefit: "Sleep and stress management.", actives: "Ashwagandha root extract", count: "60 capsules", dose: "1 capsule 1 to 2 hours before dinner.", base: 599, mrp: 699 },
  // Joint & Pain
  { slug: "daily-boswellia", label: "Daily Boswellia", group: "Joint & Pain", accent: "#3E7D5A", benefit: "Respiratory support and easier breathing.", actives: "Boswellia serrata extract", count: "60 capsules", dose: "1 to 2 capsules morning and night, after food.", base: 599, mrp: 699 },
  { slug: "fast-rhulief", label: "Fast Rhulief", group: "Joint & Pain", accent: "#C0392B", benefit: "Fast support for muscle and joint comfort.", actives: "Turmeric + Boswellia fast-acting blend", count: "60 softgels", dose: "2 softgels after food, once or twice daily.", base: 649, mrp: 799 },
  { slug: "joint-rescue", label: "Joint Rescue", group: "Joint & Pain", accent: "#5B6BA8", benefit: "Joint mobility and pain relief.", actives: "Glucosamine + herbal blend", count: "60 capsules", dose: "1 capsule morning and 1 at night, after food.", base: 699, mrp: 849 },
  { slug: "glucowalk", label: "Glucowalk", group: "Joint & Pain", accent: "#B7772A", benefit: "Complete joint support.", actives: "Turmeric + Boswellia + Glucosamine HCl", count: "90 capsules", dose: "3 capsules in the morning, after food.", base: 749, mrp: 899 },
  // Digestion
  { slug: "gut-eaze-365", label: "Gut Eaze 365", group: "Digestion", accent: "#4B7A54", benefit: "Gut health from a blend of 14 herbs.", actives: "14-herb digestive blend", count: "60 capsules", dose: "2 capsules 1 hour before bed, with water.", base: 649, mrp: 799 },
  // Blood Sugar
  { slug: "gluco-balance", label: "Gluco Balance", group: "Blood Sugar", accent: "#2B6EA0", benefit: "Healthy blood sugar metabolism.", actives: "Herbal glucose-balance blend", count: "60 capsules", dose: "1 capsule morning and 1 at night, after food.", base: 699, mrp: 849 },
  // Skin & Hair
  { slug: "flax-n-cumin", label: "Flax N'Cumin", group: "Skin & Hair", accent: "#C25B7C", benefit: "Skin and hair with complete Omega 3-6-9.", actives: "Flax + black cumin oil (Omega 3-6-9)", count: "90 softgels", dose: "1 softgel 3 times a day, after food.", base: 599, mrp: 699 },
  { slug: "beauty-collagen", label: "Beauty Collagen", group: "Skin & Hair", accent: "#B06A8F", benefit: "Youthful skin, lush hair and shiny nails.", actives: "Collagen peptides, Vitamin C", count: "30 sachets", dose: "1 sachet once a day, after a meal.", base: 999, mrp: 1199 },
  // Women's Health
  { slug: "cramp-eaze", label: "Cramp Eaze", group: "Women's Health", accent: "#A63D5B", benefit: "Fast relief from menstrual cramps.", actives: "Triple-action herbal blend", count: "30 softgels", dose: "2 softgels after food, once or twice daily.", base: 549, mrp: 649 },
  // Men's Health
  { slug: "testobloom", label: "Testobloom", group: "Men's Health", accent: "#2F6E4F", benefit: "Healthy testosterone and stamina in men.", actives: "Herbal testosterone-support blend", count: "60 capsules", dose: "1 capsule per day, after food.", base: 899, mrp: 1099 },
];

const HERBAL_OPTIONS: ProductOption[] = [
  {
    slug: "formula",
    name: "Formula",
    display: "select",
    values: HERBAL_FORMULAS.map((f) => ({
      slug: f.slug,
      label: f.label,
      swatch: f.accent,
      note: f.benefit,
      group: f.group,
    })),
  },
];

function buildHerbalVariants(): Variant[] {
  return HERBAL_FORMULAS.map((f) => ({
    sku: `DH-${f.slug.toUpperCase().replace(/-/g, "")}`,
    options: { formula: f.slug },
    price: f.base,
    mrp: f.mrp,
    inStock: true,
    title: f.label,
    accent: f.accent,
    default: f.slug === "daily-defense",
    meta: [
      { label: "Best for", value: f.group },
      { label: "Count", value: f.count },
      { label: "Key actives", value: f.actives },
      { label: "Directions", value: f.dose },
    ],
  }));
}

export const products: Product[] = [
  {
    slug: "hb-plus",
    name: "HB+ Juice",
    category: "Prickly Pear · Stevia Fruit Nectar",
    categorySlug: "blood-vitality",
    badge: "Bestseller",
    featured: true,
    inStock: true,
    essence: "A quiet return of iron to the blood.",
    summary:
      "A patented nectar pressed from wild prickly pear and sweetened only by the stevia leaf. A natural source of iron, formulated to support healthy hemoglobin, without a gram of added sugar.",
    tint: "pear",
    form: "750 ml glass · liquid nectar",
    origin: "Wild-sourced prickly pear (Opuntia)",
    price: 899, // PLACEHOLDER
    mrp: 1099, // PLACEHOLDER
    benefit: "Natural iron to support healthy hemoglobin.",
    attributes: [
      "Natural iron source",
      "Zero added sugar",
      "Diabetic friendly",
      "Keto friendly",
      "100% natural",
      "Vegan",
    ],
    facts: [
      { label: "Serving", value: "Per 100 g" },
      { label: "Energy", value: "46 kcal" },
      { label: "Carbohydrate", value: "9 g" },
      { label: "Sugars", value: "0 g" },
      { label: "Total fat", value: "0 g" },
      { label: "Protein", value: "1 g" },
    ],
    ingredients:
      "Prickly pear pulp, stevia glycoside (INS 960), malate (E 5463), lactic acid (E 270), citric acid, permitted Class II preservative (INS 211).",
    usage: [
      "Shake well before use.",
      "Add 5 ml to 90 ml of water. Lemon and rock salt to taste, if you like.",
      "Twice daily: on an empty stomach in the morning, and one hour after your evening meal.",
      "Refrigerate after opening. Store cool and away from direct sunlight.",
    ],
    story: [
      {
        heading: "Sourced from the wild",
        body: "The prickly pear grows where little else will, on arid, sun-worn land. Its fruit carries a natural density of iron and micronutrients. We take it as it grows, and refine rather than remake it.",
      },
      {
        heading: "Sweetened by a leaf, not a factory",
        body: "Sweetness comes from the stevia leaf alone. No cane sugar, no syrups, no substitutes engineered in a lab. The result is a nectar diabetic and keto routines can live alongside.",
      },
      {
        heading: "Made to support your blood",
        body: "HB+ is a dietary supplement intended to support healthy hemoglobin as part of a balanced life. It is not a medicine and does not diagnose, treat, or cure disease.",
      },
    ],
    patent: "Patent No. 323016",
  },
  {
    slug: "multivitamins",
    name: "Multi-vitamins",
    category: "Bunny-shaped gummies · A formula for every need",
    categorySlug: "daily-essentials",
    badge: "16 formulas",
    featured: true,
    inStock: true,
    essence: "Healthy never tasted this good.",
    summary:
      "One delicious range, a formula for everyone. Bunny-shaped gummies made with natural colours and flavours, 100% vegetarian, gluten free and third-party tested. Choose your formula.",
    tint: "honey",
    form: "Chewable gummies · 30 per bottle",
    origin: "Fruit-derived, vegetarian pectin base",
    price: 449, // default variant price; real pricing lives on each variant
    mrp: 549,
    benefit: "Pick your formula. Delicious nutrition in every bite.",
    attributes: [
      "100% vegetarian",
      "No artificial colours",
      "Gluten free",
      "Third-party tested",
      "Natural flavours",
      "High absorption",
    ],
    facts: [
      { label: "Format", value: "Chewable gummy" },
      { label: "Serving", value: "One to two daily" },
      { label: "Shapes", value: "Bunny gummies" },
      { label: "For", value: "Kids & adults" },
      { label: "Testing", value: "Third-party" },
      { label: "Diet", value: "Vegetarian" },
    ],
    ingredients:
      "Vegetarian pectin base with natural fruit-derived colours and flavours. Formula-specific actives printed on each pack. Gelatin-free, gluten-free.",
    usage: [
      "Take one to two gummies per day, as directed on your chosen formula.",
      "Suitable for children and adults, unless the formula states otherwise.",
      "Store cool and dry, away from direct sunlight.",
      "Not a substitute for a varied diet.",
    ],
    story: [
      {
        heading: "A formula for every need",
        body: "From kids' growth to sleep, skin, immunity and beyond, the whole family finds their formula in one trusted range. Same bunny shape, same clean promise, tuned to what each body needs.",
      },
      {
        heading: "Nutrition people actually finish",
        body: "The best supplement is the one that gets taken. Bunny-shaped, fruit-flavoured and genuinely enjoyable, so the daily habit sticks, for children and adults alike.",
      },
      {
        heading: "Nothing artificial to hide",
        body: "Colour from fruit. Flavour from fruit. No synthetic dyes, no gluten, no gelatin. Vegetarian, and third-party tested batch by batch.",
      },
    ],
    options: GUMMY_OPTIONS,
    variants: buildGummyVariants(),
  },
  {
    slug: "daily-herbals",
    name: "Daily Herbals",
    category: "Botanical capsules & softgels · A formula for every need",
    categorySlug: "herbal-wellness",
    badge: "23 formulas",
    featured: true,
    inStock: true,
    essence: "Time-tested botanicals, in a daily capsule.",
    summary:
      "Single-focus formulas drawn from time-tested botanicals, in easy daily capsules and softgels. Standardised extracts, third-party tested, and made to a standard we would give our own families. Choose your formula.",
    tint: "pear",
    form: "Botanical capsules & softgels",
    origin: "Standardised botanical extracts",
    price: 649, // default variant price; real pricing lives on each variant
    mrp: 799,
    benefit: "Targeted herbal support. Choose your formula.",
    attributes: [
      "Standardised extracts",
      "No artificial colours",
      "Third-party tested",
      "GMP made",
      "Veg where possible",
      "Nutraceutical, not medicinal",
    ],
    facts: [
      { label: "Format", value: "Capsule / softgel" },
      { label: "Range", value: "23 formulas" },
      { label: "Diet", value: "Veg where possible" },
      { label: "Testing", value: "Third-party" },
      { label: "Made", value: "GMP facility" },
      { label: "Use", value: "Daily" },
    ],
    ingredients:
      "Standardised herbal and botanical extracts. Exact actives vary by formula and are printed on each pack; see the selected formula's key actives above.",
    usage: [
      "Follow the directions shown with your chosen formula.",
      "Take with water, with or after food unless stated otherwise.",
      "Store cool and dry, away from direct sunlight.",
      "A nutraceutical, not a medicine. Not for medicinal use.",
    ],
    story: [
      {
        heading: "Botanicals, taken seriously",
        body: "Each formula starts with a plant that has earned its place over generations, then we standardise the extract so every capsule delivers a known, consistent amount. Tradition, measured.",
      },
      {
        heading: "One range, many needs",
        body: "From immunity and heart to sleep, joints and skin, the range meets the everyday needs of a whole household, each formula focused on doing one thing well.",
      },
      {
        heading: "Honest by default",
        body: "These are nutraceuticals, not medicines. We say what a formula supports, not what it cures, and we print the actives on every pack.",
      },
    ],
    options: HERBAL_OPTIONS,
    variants: buildHerbalVariants(),
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  const featured = products.filter((p) => p.featured);
  return featured.length ? featured : products;
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getCategoriesInUse() {
  return categories.filter((c) => products.some((p) => p.categorySlug === c.slug));
}

// ---------------------------------------------------------------------------
// Variant helpers — the single API every consumer (cards, cart, PDP, SEO) uses.
// Products without an explicit variant list get one synthesised default, so the
// rest of the app never has to special-case single- vs multi-variant products.
// ---------------------------------------------------------------------------

export function getVariants(product: Product): Variant[] {
  if (product.variants && product.variants.length) return product.variants;
  return [
    {
      sku: product.slug.toUpperCase(),
      options: {},
      price: product.price,
      mrp: product.mrp,
      inStock: product.inStock ?? true,
      title: product.name,
      accent: product.tint === "pear" ? "#6E1E2E" : "#B7772A",
      default: true,
    },
  ];
}

export function getOptions(product: Product): ProductOption[] {
  return product.options ?? [];
}

export function getDefaultVariant(product: Product): Variant {
  const variants = getVariants(product);
  return variants.find((v) => v.default) ?? variants[0];
}

export function getVariantBySku(product: Product, sku: string): Variant | undefined {
  return getVariants(product).find((v) => v.sku === sku);
}

/** Find the variant matching a full set of selected option values. */
export function findVariant(
  product: Product,
  selected: Record<string, string>,
): Variant | undefined {
  const options = getOptions(product);
  return getVariants(product).find((v) =>
    options.every((o) => v.options[o.slug] === selected[o.slug]),
  );
}

/** Resolve a SKU across the whole catalog (used by the cart). */
export function resolveSku(
  sku: string,
): { product: Product; variant: Variant } | undefined {
  for (const product of products) {
    const variant = getVariants(product).find((v) => v.sku === sku);
    if (variant) return { product, variant };
  }
  return undefined;
}

/**
 * Is a given option value still reachable, holding the other current
 * selections fixed? Powers disabled/greyed-out states in the selector.
 */
export function isValueAvailable(
  product: Product,
  optionSlug: string,
  valueSlug: string,
  selected: Record<string, string>,
): boolean {
  const options = getOptions(product);
  return getVariants(product).some(
    (v) =>
      v.inStock !== false &&
      v.options[optionSlug] === valueSlug &&
      options.every(
        (o) =>
          o.slug === optionSlug ||
          !selected[o.slug] ||
          v.options[o.slug] === selected[o.slug],
      ),
  );
}

/** Does this option value combination exist at all (in or out of stock)? */
export function variantExists(
  product: Product,
  optionSlug: string,
  valueSlug: string,
  selected: Record<string, string>,
): boolean {
  const options = getOptions(product);
  return getVariants(product).some(
    (v) =>
      v.options[optionSlug] === valueSlug &&
      options.every(
        (o) =>
          o.slug === optionSlug ||
          !selected[o.slug] ||
          v.options[o.slug] === selected[o.slug],
      ),
  );
}

/** "Kids Multivitamin · 2 Bottles · Subscribe & Save" for cart/summary lines. */
export function variantSummary(product: Product, variant: Variant): string {
  return getOptions(product)
    .map((o) => o.values.find((val) => val.slug === variant.options[o.slug])?.label)
    .filter(Boolean)
    .join(" · ");
}

/** Lowest / highest in-stock price across a product's variants. */
export function getPriceRange(product: Product): { min: number; max: number } {
  const variants = getVariants(product);
  const live = variants.filter((v) => v.inStock !== false);
  const prices = (live.length ? live : variants).map((v) => v.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function hasVariants(product: Product): boolean {
  return Boolean(product.options && product.options.length);
}
