import { defineType, defineField } from "sanity";

export const guidePage = defineType({
  name: "guidePage",
  title: "Panduan Tani (Halaman)",
  type: "document",
  fields: [
    // SECTION HEADER
    defineField({
      name: "sectionHeader",
      title: "Section Header (Artikel)",
      type: "object",
      fields: [
        defineField({
          name: "eyebrowPill",
          title: "Badge / Pill Text",
          type: "string",
          initialValue: "Edukasi & Riset Tani",
        }),
        defineField({
          name: "headline",
          title: "Judul Utama",
          type: "string",
          initialValue: "Panduan & Tips Budidaya Terkini",
        }),
        defineField({
          name: "subtext",
          title: "Deskripsi Pendek",
          type: "text",
          rows: 3,
          initialValue:
            "Artikel praktis berbasis riset lapang dari tim agronomis Turia Farm untuk membantu keberhasilan panen Anda.",
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
    // FAQ SECTION
    defineField({
      name: "faqSection",
      title: "FAQ Section (Pertanyaan Umum)",
      type: "object",
      fields: [
        defineField({
          name: "eyebrowPill",
          title: "Badge / Pill Text",
          type: "string",
          initialValue: "FAQ • Pertanyaan Umum",
        }),
        defineField({
          name: "headline",
          title: "Judul FAQ",
          type: "string",
          initialValue: "Pertanyaan Seputar Pemesanan & Pengiriman",
        }),
        defineField({
          name: "faqs",
          title: "Daftar FAQ",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Pertanyaan (Q)",
                  type: "string",
                }),
                defineField({
                  name: "answer",
                  title: "Jawaban (A)",
                  type: "text",
                  rows: 4,
                }),
              ],
            },
          ],
          description: "Tambah/edit pertanyaan dan jawaban FAQ di sini.",
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
          initialValue: "Panduan Budidaya Pisang & FAQ | Edukasi Tani Turia Farm",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          initialValue:
            "Kumpulan artikel teknis budidaya pisang: jarak tanam cavendish 30 ton/ha, cara cegah penyakit layu fusarium, analisis modal usaha kebun pisang 1 hektar.",
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