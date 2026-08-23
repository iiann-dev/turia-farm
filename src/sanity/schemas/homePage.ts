import { defineType, defineField } from "sanity";

// Hero section schema
export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrowPill",
      title: "Eyebrow Pill Text",
      type: "string",
      initialValue: "Pembibitan Pisang & Sengon Unggul Kediri",
    }),
    defineField({
      name: "headline",
      title: "Main Headline",
      type: "text",
      rows: 3,
      initialValue: "Bibit Pisang & Sengon Sehat,\nPanen Berlimpah.",
    }),
    defineField({
      name: "highlightedText",
      title: "Highlighted Text (italic underline)",
      type: "string",
      initialValue: "Panen Berlimpah.",
    }),
    defineField({
      name: "subtext",
      title: "Subtext Description",
      type: "text",
      rows: 3,
      initialValue: "Pusat pembibitan pisang dari anakan pilihan & bibit sengon dari biji berkualitas. Berakar sehat, vigor tinggi, dan siap tanam untuk perkebunan mandiri maupun skala komersial.",
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA",
      type: "object",
      fields: [
        { name: "text", type: "string", initialValue: "Pesan Bibit Sekarang" },
        { name: "href", type: "url", initialValue: "https://wa.me/6289508495717?text=Halo%20Turia%20Farm,%20saya%20tertarik%20konsultasi%20bibit%20pisang%20%26%20sengon" },
      ],
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA",
      type: "object",
      fields: [
        { name: "text", type: "string", initialValue: "Lihat Varietas & Harga" },
        { name: "href", type: "string", initialValue: "/bibit-pisang" },
      ],
    }),
    defineField({
      name: "assuranceBadges",
      title: "Assurance Badges",
      type: "array",
      of: [{ type: "object", fields: [
        { name: "icon", type: "string", options: { list: ["check", "shield", "award"] } },
        { name: "text", type: "string" },
      ] }],
      initialValue: [
        { icon: "check", text: "Bebas Layu Fusarium" },
        { icon: "shield", text: "Garansi Hidup di Perjalanan" },
        { icon: "award", text: "Pendampingan SOP Tani" },
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", initialValue: "Bibit Pisang Kultur Jaringan Unggul Kediri" },
      ],
    }),
    defineField({
      name: "heroBadge",
      title: "Hero Badge (overlay on image)",
      type: "object",
      fields: [
        { name: "title", type: "string", initialValue: "Siap Tanam Lapangan" },
        { name: "subtitle", type: "string", initialValue: "Cavendish, Raja Bulu & Sengon Solomon" },
        { name: "details", type: "string", initialValue: "Ketinggian 35-45 cm • Akar Aktif • Batuaji, Kediri" },
      ],
    }),
    defineField({
      name: "floatingStat",
      title: "Floating Stat Card",
      type: "object",
      fields: [
        { name: "label", type: "string", initialValue: "150.000+ Bibit / Thn" },
        { name: "detail", type: "string", initialValue: "Kirim Se-Jawa, Bali & Luar Pulau" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hero Section", subtitle: "Headline, CTAs, Badges, Image & Overlay" };
    },
  },
});

// Stats strip schema
export const statsStrip = defineType({
  name: "statsStrip",
  title: "Stats Strip (4 Numbers)",
  type: "object",
  fields: [
    defineField({
      name: "stats",
      title: "Stat Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "value", type: "number" },
          { name: "suffix", type: "string" },
          { name: "label", type: "string" },
        ],
      }],
      initialValue: [
        { value: 98.4, suffix: "%", label: "Tingkat Hidup Lapangan" },
        { value: 150, suffix: "K+", label: "Bibit Tersalurkan / Thn" },
        { value: 500, suffix: "+", label: "Petani & Kebun Mitra" },
        { value: 2.8, suffix: " Ha", label: "Nursery di Batuaji" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Stats Strip", subtitle: "4 Key Numbers" };
    },
  },
});

// Featured seedlings reference
export const featuredSeedlings = defineType({
  name: "featuredSeedlings",
  title: "Featured Seedlings (Home Preview)",
  type: "object",
  fields: [
    defineField({
      name: "seedlings",
      title: "Seedlings (max 3)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "seedling" }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Featured Seedlings", subtitle: "Max 3 for Home Preview" };
    },
  },
});

// Process teaser schema
export const processTeaser = defineType({
  name: "processTeaser",
  title: "Process Teaser Banner",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      initialValue: "Pembibitan Kebun Autentik",
    }),
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      initialValue: "4 Tahap Pemuliaan Tanpa Kompromi",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "string",
      initialValue: "Pelajari Proses Kultur Lengkap",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "string",
      initialValue: "/proses-kultur",
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [{ type: "reference", to: [{ type: "processStep" }] }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Process Teaser", subtitle: "4 Steps + CTA" };
    },
  },
});

// Knowledge spotlight schema
export const knowledgeSpotlight = defineType({
  name: "knowledgeSpotlight",
  title: "Knowledge Spotlight (Article)",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      initialValue: "Edukasi Petani",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Panduan Praktis Kebun Pisang",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "string",
      initialValue: "Lihat Semua Panduan & FAQ",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "string",
      initialValue: "/panduan-tani",
    }),
    defineField({
      name: "article",
      title: "Featured Article",
      type: "reference",
      to: [{ type: "article" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Knowledge Spotlight", subtitle: "Featured Article + CTA" };
    },
  },
});

// SEO schema for home page
export const homeSeo = defineType({
  name: "homeSeo",
  title: "Home Page SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      initialValue: "Turia Farm | Pusat Pembibitan Pisang & Bibit Sengon Kediri",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      initialValue: "Nursery bibit pisang dari anakan super (Cavendish, Raja Bulu, Kepok Tanjung) serta bibit sengon biji unggul di Batuaji, Kab. Kediri. Sehat, vigor tinggi, siap tanam, bergaransi.",
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "bibit pisang kediri",
        "bibit pisang anakan",
        "bibit sengon kediri",
        "bibit kepok tanjung kediri",
        "bibit pisang batuaji ringinrejo",
        "turia farm",
        "nursery pisang jawa timur",
      ],
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      initialValue: "https://turia-farm.vercel.app",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page SEO", subtitle: "Meta tags, OG, Canonical" };
    },
  },
});

// Main Home Page singleton
export const homePage = defineType({
  name: "homePage",
  title: "Beranda (Home Page)",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "heroSection",
    }),
    defineField({
      name: "stats",
      title: "Stats Strip",
      type: "statsStrip",
    }),
    defineField({
      name: "featuredSeedlings",
      title: "Featured Seedlings Preview",
      type: "featuredSeedlings",
    }),
    defineField({
      name: "processTeaser",
      title: "Process Teaser Banner",
      type: "processTeaser",
    }),
    defineField({
      name: "knowledgeSpotlight",
      title: "Knowledge Spotlight",
      type: "knowledgeSpotlight",
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "homeSeo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Beranda", subtitle: "Hero, Stats, Featured Seedlings, Process, Knowledge, SEO" };
    },
  },
});