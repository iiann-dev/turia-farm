import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Kontak & Alamat (Halaman)",
  type: "document",
  fields: [
    // SECTION HEADER
    defineField({
      name: "sectionHeader",
      title: "Section Header",
      type: "object",
      fields: [
        defineField({
          name: "eyebrowPill",
          title: "Badge / Pill Text",
          type: "string",
          initialValue: "Kunjungi & Hubungi Kami",
        }),
        defineField({
          name: "headline",
          title: "Judul Utama",
          type: "string",
          initialValue: "Siap Memulai Kebun Pisang & Sengon Produktif?",
        }),
        defineField({
          name: "subtext",
          title: "Deskripsi Pendek",
          type: "text",
          rows: 3,
          initialValue:
            "Konsultasikan kebutuhan varietas, estimasi modal kebun, hingga pengiriman armada truk langsung ke lahan Anda.",
        }),
      ],
    }),
    // DELIVERY ASSURANCE CARD
    defineField({
      name: "deliveryCard",
      title: "Kartu Jaminan Pengiriman (Delivery Assurance)",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Judul Kartu",
          type: "string",
          initialValue: "Armada Truk & Keranjang Kayu",
        }),
        defineField({
          name: "description",
          title: "Deskripsi",
          type: "text",
          rows: 3,
          initialValue:
            "Pengiriman skala besar diantar langsung ke lokasi kebun Anda dengan garansi hidup.",
        }),
      ],
    }),
    // CONSULTATION FORM FIELDS
    defineField({
      name: "formFields",
      title: "Konfigurasi Formulir Konsultasi",
      type: "object",
      fields: [
        defineField({
          name: "formTitle",
          title: "Judul Formulir",
          type: "string",
          initialValue: "Formulir Konsultasi & Pemesanan Bibit",
        }),
        defineField({
          name: "formDescription",
          title: "Deskripsi Formulir",
          type: "text",
          rows: 3,
          initialValue:
            "Isi data kebutuhan Anda di bawah ini, kami akan langsung sambungkan ke WhatsApp resmi Agronomis Turia Farm.",
        }),
        defineField({
          name: "submitButtonText",
          title: "Teks Tombol Submit",
          type: "string",
          initialValue: "Kirim Pertanyaan via WhatsApp",
        }),
        defineField({
          name: "whatsappNumber",
          title: "Nomor WhatsApp Tujuan (Global)",
          type: "string",
          initialValue: "6289508495717",
          description:
            "Nomor WA tempat formulir akan redirect. Default dari siteConfig.",
        }),
      ],
    }),
    // VARIETAS OPTIONS FOR FORM SELECT
    defineField({
      name: "formVarietasOptions",
      title: "Opsi Varietas di Formulir (Dropdown)",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Cavendish Grand Naine",
        "Pisang Raja Bulu Super",
        "Kepok Tanjung (Tanpa Jantung)",
        "Pisang Mas Kirana",
        "Pisang Barangan Merah",
        "Pisang Ambon Kuning Super",
        "Sengon Solomon",
        "Sengon Lokal / Jeungjing",
        "Campuran Beberapa Varietas",
      ],
      description:
        "Opsi dropdown di formulir. Jika kosong, fallback ke varietas aktif di Seedlings.",
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
          initialValue: "Kontak & Alamat Nursery Batuaji Kediri | Turia Farm",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          initialValue:
            "Hubungi nursery Turia Farm di Batuaji, Ringinrejo, Kab. Kediri untuk konsultasi pemesanan bibit pisang dan bibit sengon skala kecil maupun partai besar perkebunan. Buka Senin-Sabtu.",
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
      return { title: "Kontak & Alamat (Halaman)", subtitle: "Singleton" };
    },
  },
});