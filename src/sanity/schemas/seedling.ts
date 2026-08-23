import { defineType, defineField } from "sanity";

export const seedling = defineType({
  name: "seedling",
  title: "Bibit (Seedling)",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID (slug)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nama Bibit",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scientificName",
      title: "Nama Ilmiah",
      type: "string",
    }),
    defineField({
      name: "tag",
      title: "Tag/Label Singkat",
      type: "string",
    }),
    defineField({
      name: "desc",
      title: "Deskripsi Lengkap",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "maturity",
      title: "Waktu Panen / Paruh Bunga",
      type: "string",
    }),
    defineField({
      name: "bunchWeight",
      title: "Berat Tandan / Diameter",
      type: "string",
    }),
    defineField({
      name: "sweetness",
      title: "Kemanisan / Karakter",
      type: "string",
    }),
    defineField({
      name: "height",
      title: "Tinggi Tanaman / Bibit",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Harga",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Gambar Bibit",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
      ],
    }),
    defineField({
      name: "status",
      title: "Status Ketersediaan",
      type: "string",
      initialValue: "Tersedia Siap Tanam",
    }),
    defineField({
      name: "bestFor",
      title: "Cocok Untuk",
      type: "string",
    }),
    defineField({
      name: "featured",
      title: "Tampilkan di Beranda (Featured)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tag", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Tanpa Nama", subtitle: subtitle || "", media };
    },
  },
  orderings: [
    { title: "Urutan Manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Nama A-Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
});