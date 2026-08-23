import { defineType, defineField } from "sanity";

export const catalogPage = defineType({
  name: "catalogPage",
  title: "Katalog Bibit (Halaman)",
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
          initialValue: "Katalog Bibit",
        }),
        defineField({
          name: "headline",
          title: "Judul Utama",
          type: "string",
          initialValue: "Bibit Pisang & Sengon Pilihan Siap Tanam",
        }),
        defineField({
          name: "subtext",
          title: "Deskripsi Pendek",
          type: "text",
          rows: 3,
          initialValue:
            "Semua bibit dirawat langsung di kebun pembibitan Batuaji Kediri, berakar sehat aktif dalam polybag organik siap tanam.",
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
    // FEATURED SEEDLINGS (Curated Selection for Catalog Page)
    defineField({
      name: "featuredSeedlings",
      title: "Varietas Unggulan (Ditampilkan di Halaman Katalog)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "seedling" }],
        },
      ],
      description: "Pilih varietas yang ingin ditampilkan di halaman Katalog Bibit. Urutkan sesuai keinginan.",
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
          initialValue: "Katalog Bibit Pisang Unggul & Bibit Sengon | Turia Farm Kediri",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          initialValue:
            "Daftar harga dan varietas bibit pisang anakan pilihan & bibit sengon biji Turia Farm di Batuaji Ringinrejo Kediri: Cavendish Grand Naine, Raja Bulu, Kepok Tanjung, Mas Kirana, Barangan, Sengon Solomon.",
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
      return { title: "Katalog Bibit (Halaman)", subtitle: "Singleton" };
    },
  },
});