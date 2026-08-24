import { defineType, defineField } from "sanity";

export const processPage = defineType({
  name: "processPage",
  title: "Proses Kultur (Halaman)",
  type: "document",
  fields: [
    // SECTION HEADER
    defineField({
      name: "sectionHeader",
      title: "Section Header",
      type: "object",
      fields: [
        defineField({
          name: "eyebrowPill",
          title: "Badge / Pill Text",
          type: "string",
          initialValue: "Standar Mutu Bibit",
        }),
        defineField({
          name: "headline",
          title: "Judul Utama",
          type: "string",
          initialValue: "4 Tahap Pembibitan Kebun Tradisional",
        }),
        defineField({
          name: "subtext",
          title: "Deskripsi Pendek",
          type: "text",
          rows: 3,
          initialValue:
            "Dari pemisahan anakan pisang berkualitas & penyemaian biji sengon hingga pemeliharaan di polybag bedengan terbuka.",
        }),
      ],
    }),
    // HERO SECTION (optional - for future use)
    defineField({
      name: "hero",
      title: "Hero Section (Opsional)",
      type: "object",
      fields: [
        defineField({
          name: "eyebrowPill",
          title: "Badge / Pill Text",
          type: "string",
          initialValue: "Proses Pembibitan",
        }),
        defineField({
          name: "headline",
          title: "Judul Utama",
          type: "string",
          initialValue: "4 Tahap Pemuliaan Tanpa Kompromi",
        }),
        defineField({
          name: "subtext",
          title: "Deskripsi Pendek",
          type: "text",
          rows: 3,
          initialValue:
            "Setiap bibit Turia Farm melewati seleksi ketat dari induk unggul hingga siap tanam di lahan Anda. Proses standar SOP berkelanjutan menjamin kualitas genetik & kesehatan tanaman.",
        }),
        defineField({
          name: "heroImage",
          title: "Gambar Hero (Opsional)",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        }),
      ],
    }),
    // PROCESS STEPS - Reference to processStep documents
    defineField({
      name: "processSteps",
      title: "Tahap Proses Kultur (Ditampilkan di Halaman)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "processStep" }] }],
      description: "Pilih tahap proses yang ingin ditampilkan di halaman Proses Kultur. Urutkan sesuai keinginan.",
    }),
    // NURSERY FIELD VERIFICATION CARD
    defineField({
      name: "nurseryCard",
      title: "Kartu Kunjungan Kebun (Nursery Field Verification)",
      type: "object",
      fields: [
        defineField({
          name: "eyebrowPill",
          title: "Badge / Pill Text",
          type: "string",
          initialValue: "Kunjungan & Edukasi Terbuka",
        }),
        defineField({
          name: "headline",
          title: "Judul Kartu",
          type: "string",
          initialValue: "Ingin melihat langsung kebun pembibitan & indukan kami?",
        }),
        defineField({
          name: "description",
          title: "Deskripsi",
          type: "text",
          rows: 4,
          initialValue:
            "Pintu kebun pembibitan Turia Farm di Batuaji, Ringinrejo selalu terbuka untuk petani individu, kelompok tani, maupun investor perkebunan yang ingin cek mutu bibit secara langsung.",
        }),
        defineField({
          name: "ctaText",
          title: "Teks Tombol CTA",
          type: "string",
          initialValue: "Jadwalkan Kunjungan Kebun",
        }),
        defineField({
          name: "ctaLink",
          title: "Link CTA (WhatsApp)",
          type: "url",
          initialValue: "https://wa.me/6289508495717?text=Halo%20Turia%20Farm,%20saya%20ingin%20jadwalkan%20kunjungan%20kebun",
        }),
        defineField({
          name: "heroImage",
          title: "Gambar Background (Opsional)",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        }),
      ],
    }),
    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          initialValue: "Proses Pembibitan | Turia Farm Kediri",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          initialValue:
            "Pelajari 4 tahap pembibitan pisang anakan dan penyemaian bibit sengon biji di Turia Farm Batuaji Ringinrejo Kediri. Akar aktif bergaransi hidup.",
        }),
        defineField({
          name: "ogImage",
          title: "OG Image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Proses Kultur (Halaman)", subtitle: "Singleton" };
    },
  },
});