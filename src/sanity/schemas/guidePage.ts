import { defineType, defineField } from "sanity";

export const guidePage = defineType({
  name: "guidePage",
  title: "Panduan Tani (Halaman)",
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
          initialValue: "Panduan Tani",
        }),
        defineField({
          name: "headline",
          title: "Judul Utama",
          type: "string",
          initialValue: "Panduan Praktis & FAQ Kebun Pisang & Sengon",
        }),
        defineField({
          name: "subtext",
          title: "Deskripsi Pendek",
          type: "text",
          rows: 3,
          initialValue:
            "Wawasan teknis dari agronomis Turia Farm: jarak tanam optimal, pencegahan penyakit layu, analisis usaha tani, hingga tips panen maksimal. Gratis untuk petani mitra.",
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
    // ARTICLES - Reference to article documents
    defineField({
      name: "articles",
      title: "Artikel Panduan (Ditampilkan di Halaman)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
      description: "Pilih artikel yang ingin ditampilkan di halaman Panduan Tani. Urutkan sesuai keinginan.",
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
          initialValue: "Panduan Tani Pisang & Sengon | Turia Farm Kediri",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          initialValue:
            "Artikel panduan budidaya pisang Cavendish, Raja Bulu, Kepok Tanjung & bibit sengon Solomon. Termasuk jarak tanam, pencegahan layu fusarium, analisis modal usaha tani, hingga FAQ.",
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
      return { title: "Panduan Tani (Halaman)", subtitle: "Singleton" };
    },
  },
});