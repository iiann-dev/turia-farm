import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Tentang Kami (Halaman)",
  type: "document",
  fields: [
    // STORY SECTION
    defineField({
      name: "storySection",
      title: "Story Section (Kisah Turia Farm)",
      type: "object",
      fields: [
        defineField({
          name: "eyebrowPill",
          title: "Badge / Pill Text",
          type: "string",
          initialValue: "Tentang Turia Farm",
        }),
        defineField({
          name: "headline",
          title: "Judul Utama",
          type: "string",
          initialValue: "Dedikasi untuk Kesejahteraan Petani Indonesia",
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraf Kisah (2 paragraf)",
          type: "array",
          of: [{ type: "text", rows: 4 }],
          initialValue: [
            "Turia Farm berawal dari kebun pembibitan keluarga di Batuaji, Ringinrejo, Kediri yang prihatin atas maraknya bibit cabutan asal-asalan dan tidak seragam di kalangan petani.",
            "Kini dengan lahan pembibitan kebun seluas 2.8 hektar di Batuaji Kediri, kami memproduksi anakan pisang pilihan dari pohon indukan sehat serta penyemaian biji sengon unggul, mendampingi ratusan petani dari nol hingga panen raya yang menguntungkan.",
          ],
        }),
      ],
    }),
    // HERO IMAGE
    defineField({
      name: "heroImage",
      title: "Gambar Hero / Team Foto (Opsional)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
    }),
    // VALUE PILLARS
    defineField({
      name: "valuePillars",
      title: "Nilai-Nilai Utama (Value Pillars)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Judul Pilar",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Deskripsi",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
      initialValue: [
        {
          _key: "pillar-1",
          title: "Bukan Bibit Cabutan",
          description: "Genetika murni klon unggul dengan riwayat pohon induk tercatat jelas.",
        },
        {
          _key: "pillar-2",
          title: "Bimbingan Sampai Panen",
          description: "Konsultasi gratis pupuk & hama langsung via WhatsApp agronomis kami.",
        },
      ],
    }),
    // TESTIMONIALS (references to article/documents or inline)
    defineField({
      name: "testimonials",
      title: "Testimoni Mitra (Opsional - bisa pakai data statis)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Kutipan",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "name",
              title: "Nama",
              type: "string",
            }),
            defineField({
              name: "role",
              title: "Peran / Jabatan",
              type: "string",
            }),
            defineField({
              name: "location",
              title: "Lokasi",
              type: "string",
            }),
            defineField({
              name: "farmSize",
              title: "Luas Kebun",
              type: "string",
            }),
            defineField({
              name: "rating",
              title: "Rating (1-5)",
              type: "number",
              validation: (Rule) => Rule.min(1).max(5).integer(),
            }),
          ],
        },
      ],
    }),
    // FARM STATS BADGE
    defineField({
      name: "farmStatsBadge",
      title: "Badge Statistik Farm (Overlay di Gambar Hero)",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Judul (contoh: 2.8 Hektar)",
          type: "string",
          initialValue: "2.8 Hektar",
        }),
        defineField({
          name: "description",
          title: "Deskripsi",
          type: "text",
          rows: 2,
          initialValue:
            "Kapasitas ribuan polybag bibit anakan & bibit sengon per siklus tanam.",
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
          initialValue: "Tentang Kami & Nursery 2.8 Ha | Turia Farm Kediri",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          initialValue:
            "Mengenal visi Turia Farm di Batuaji, Ringinrejo, Kediri: Menyejahterakan petani nusantara melalui penyediaan bibit pisang unggul murni bebas layu fusarium dan bibit sengon bermutu.",
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
      return { title: "Tentang Kami (Halaman)", subtitle: "Singleton" };
    },
  },
});