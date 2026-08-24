import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer (Global)",
  type: "document",
  fields: [
    // BRAND SECTION (Kolom Kiri)
    defineField({
      name: "brandSection",
      title: "Brand Section (Kolom Kiri)",
      type: "object",
      fields: [
        defineField({
          name: "tagline",
          title: "Tagline / Deskripsi Brand",
          type: "text",
          rows: 3,
          description: "Deskripsi singkat di bawah logo Turia Farm",
        }),
      ],
    }),

    // QUICK LINKS (Kolom Tengah) - Optional custom links
    defineField({
      name: "quickLinks",
      title: "Tautan Cepat (Kolom Tengah)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "url" }),
            defineField({ name: "order", title: "Urutan", type: "number" }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
      description: "Opsional: Tambahkan link custom. Kosongkan untuk pakai default (Beranda, Katalog, dll).",
    }),

    // VARIETIES SECTION (Kolom Kanan) - Optional override
    defineField({
      name: "varietiesSection",
      title: "Varietas Populer (Kolom Kanan)",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Judul Section",
          type: "string",
          initialValue: "Varietas Populer",
        }),
        defineField({
          name: "customVarieties",
          title: "Varietas Custom (Opsional)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", title: "Nama Varietas", type: "string" }),
                defineField({ name: "price", title: "Harga", type: "string" }),
                defineField({ name: "href", title: "Link", type: "url" }),
              ],
            },
          ],
          description: "Kosongkan untuk auto-ambil 4 varietas pertama dari SEEDLINGS.",
        }),
      ],
    }),

    // SOCIAL MEDIA (Sudah ada di siteConfig, tapi bisa override di sini jika perlu)
    defineField({
      name: "socialLinks",
      title: "Media Sosial (Override siteConfig)",
      type: "object",
      description: "Opsional: Override link sosial media. Kosongkan untuk pakai siteConfig.socialLinks.",
      fields: [
        defineField({ name: "whatsapp", title: "WhatsApp URL", type: "url" }),
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok URL", type: "url" }),
        defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
      ],
    }),

    // CUSTOM BOTTOM TEXT (Opsional)
    defineField({
      name: "bottomText",
      title: "Teks Tambahan di Bawah (Opsional)",
      type: "string",
      description: "Teks tambahan di samping copyright. Copyright tetap hardcoded.",
    }),
  ],
});