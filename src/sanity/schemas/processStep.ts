import { defineType, defineField } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Tahap Proses Kultur",
  type: "document",
  fields: [
    defineField({
      name: "step",
      title: "Nomor Tahap",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Judul Tahap",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline Singkat",
      type: "string",
    }),
    defineField({
      name: "desc",
      title: "Deskripsi Lengkap",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "duration",
      title: "Durasi / Waktu",
      type: "string",
    }),
    defineField({
      name: "highlight",
      title: "Highlight / Poin Kunci",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Nama Ikon (lucide-react)",
      type: "string",
      options: { list: ["sprout", "energy_savings_leaf", "potted_plant", "verified", "check", "shield", "award"] },
    }),
    defineField({
      name: "order",
      title: "Urutan",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "step" },
    prepare({ title, subtitle }) {
      return { title: `${subtitle} - ${title}`, subtitle: "" };
    },
  },
  orderings: [
    { title: "Urutan Manual", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});