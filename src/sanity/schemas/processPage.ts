import { defineType, defineField } from "sanity";

export const processPage = defineType({
  name: "processPage",
  title: "Proses Kultur (Halaman)",
  type: "document",
  fields: [
    // HERO SECTION
    defineField({
      name: "hero",
      title: "Hero Section",
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
    // PROCESS TEASER - Reference to processStep documents
    defineField({
      name: "processSteps",
      title: "Tahap Proses Kultur (Ditampilkan di Halaman)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "processStep" }] }],
      description: "Pilih tahap proses yang ingin ditampilkan di halaman Proses Kultur. Urutkan sesuai keinginan.",
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
          initialValue: "Proses Pembibitan Pisang & Sengon | Turia Farm Kediri",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          initialValue:
            "Pelajari 4 tahap proses pembibitan pisang anakan unggul & bibit sengon biji di Turia Farm Kediri: Seleksi Indukan, Pemisahan Anakan, Pembesaran Polybag, hingga Grading & Pengiriman Bergaransi.",
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