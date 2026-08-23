import { defineType, defineField } from "sanity";

export const article = defineType({
  name: "article",
  title: "Artikel Panduan",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID (slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Judul Artikel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: { list: ["Teknik Budidaya", "Proteksi Tanaman", "Bisnis Tani", "Lainnya"] },
    }),
    defineField({
      name: "date",
      title: "Tanggal Publikasi",
      type: "date",
    }),
    defineField({
      name: "readTime",
      title: "Waktu Baca",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan (Excerpt)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Konten Lengkap (Portable Text)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "image",
      title: "Gambar Thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
      ],
    }),
    defineField({
      name: "author",
      title: "Penulis",
      type: "string",
    }),
    defineField({
      name: "published",
      title: "Dipublikasikan",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Tanpa Judul", subtitle: subtitle || "", media };
    },
  },
  orderings: [
    { title: "Terbaru", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
    { title: "Urutan Manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});