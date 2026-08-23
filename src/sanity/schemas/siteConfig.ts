import { defineType, defineField } from "sanity";

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Konfigurasi Situs (Global)",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Nama Situs",
      type: "string",
      initialValue: "Turia Farm",
    }),
    defineField({
      name: "siteTagline",
      title: "Tagline Situs",
      type: "string",
      initialValue: "Pusat Pembibitan Pisang & Bibit Sengon Kediri",
    }),
    defineField({
      name: "whatsapp",
      title: "Nomor WhatsApp",
      type: "string",
      description: "Format: 6289508495717 (tanpa + atau 0)",
      initialValue: "6289508495717",
    }),
    defineField({
      name: "whatsappLabel",
      title: "Label WhatsApp",
      type: "string",
      initialValue: "Konsultasi & Pesan Bibit",
    }),
    defineField({
      name: "address",
      title: "Alamat Lengkap",
      type: "object",
      fields: [
        { name: "street", title: "Jalan", type: "string", initialValue: "Batuaji, Ringinrejo" },
        { name: "city", title: "Kota/Kabupaten", type: "string", initialValue: "Kediri" },
        { name: "province", title: "Provinsi", type: "string", initialValue: "Jawa Timur" },
        { name: "postalCode", title: "Kode Pos", type: "string", initialValue: "64172" },
        { name: "country", title: "Negara", type: "string", initialValue: "Indonesia" },
      ],
    }),
    defineField({
      name: "geo",
      title: "Koordinat GPS",
      type: "object",
      fields: [
        { name: "lat", title: "Latitude", type: "number", initialValue: -7.966564 },
        { name: "lng", title: "Longitude", type: "number", initialValue: 112.1038139 },
      ],
    }),
    defineField({
      name: "openingHours",
      title: "Jam Operasional",
      type: "object",
      fields: [
        { name: "days", title: "Hari", type: "string", initialValue: "Senin - Sabtu" },
        { name: "open", title: "Buka", type: "string", initialValue: "07:30" },
        { name: "close", title: "Tutup", type: "string", initialValue: "16:30" },
        { name: "timezone", title: "Zona Waktu", type: "string", initialValue: "WIB" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Link Media Sosial",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "tiktok", title: "TikTok", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
      ],
    }),
    defineField({
      name: "defaultMeta",
      title: "Default Meta Tags",
      type: "object",
      fields: [
        { name: "title", title: "Default Title", type: "string" },
        { name: "description", title: "Default Description", type: "text", rows: 3 },
        { name: "ogImage", title: "Default OG Image", type: "image", options: { hotspot: true } },
        { name: "keywords", title: "Default Keywords", type: "array", of: [{ type: "string" }] },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Konfigurasi Situs (Global)", subtitle: "Singleton" };
    },
  },
});