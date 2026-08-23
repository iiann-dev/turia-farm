import { createClient } from "@sanity/client";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import fetch from "node-fetch";

// Explicitly load .env.local
try {
  const envPath = join(process.cwd(), ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  }
} catch (e) {
  console.warn("Could not load .env.local:", e);
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Upload image from URL to Sanity assets
async function uploadImageFromUrl(url: string, filename: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch image from ${url}: ${response.statusText}`);
      return null;
    }
    const buffer = await response.buffer();
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType: response.headers.get("content-type") || "image/jpeg",
    });
    return asset._id;
  } catch (error) {
    console.warn(`Error uploading image ${url}:`, error);
    return null;
  }
}

// Distinct image URLs for each seedling variety (Pexels - free for commercial use)
const SEEDLING_IMAGES: Record<string, { url: string; filename: string }> = {
  "seedling-cavendish-grand-naine": {
    url: "https://images.pexels.com/photos/365810/pexels-photo-365810.jpeg?auto=compress&cs=tinysrgb&w=1200",
    filename: "cavendish-grand-naine.jpg",
  },
  "seedling-pisang-raja-bulu": {
    url: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1200",
    filename: "pisang-raja-bulu.jpg",
  },
  "seedling-kepok-tanjung": {
    url: "https://images.pexels.com/photos/10899478/pexels-photo-10899478.jpeg?auto=compress&cs=tinysrgb&w=1200",
    filename: "kepok-tanjung.jpg",
  },
  "seedling-pisang-mas-kirana": {
    url: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=1200",
    filename: "pisang-mas-kirana.jpg",
  },
  "seedling-pisang-barangan-merah": {
    url: "https://images.pexels.com/photos/5938353/pexels-photo-5938353.jpeg?auto=compress&cs=tinysrgb&w=1200",
    filename: "pisang-barangan-merah.jpg",
  },
  "seedling-pisang-ambon-kuning": {
    url: "https://images.pexels.com/photos/1085845/pexels-photo-1085845.jpeg?auto=compress&cs=tinysrgb&w=1200",
    filename: "pisang-ambon-kuning.jpg",
  },
  "seedling-sengon-solomon": {
    url: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200",
    filename: "sengon-solomon.jpg",
  },
  "seedling-sengon-lokal": {
    url: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1200",
    filename: "sengon-lokal.jpg",
  },
};

// Upload all seedling images and return map of _id -> assetId
async function uploadSeedlingImages(): Promise<Record<string, string>> {
  console.log("📸 Uploading seedling images to Sanity assets...");
  const assetMap: Record<string, string> = {};
  
  for (const [seedlingId, { url, filename }] of Object.entries(SEEDLING_IMAGES)) {
    console.log(`  Uploading ${filename} for ${seedlingId}...`);
    const assetId = await uploadImageFromUrl(url, filename);
    if (assetId) {
      assetMap[seedlingId] = assetId;
      console.log(`    ✅ Uploaded: ${assetId}`);
    } else {
      console.log(`    ⚠️ Failed to upload ${filename}`);
    }
  }
  
  return assetMap;
}

async function seedHomePage() {
  console.log("🌱 Seeding Home Page...");

  const homePageDoc = {
    _id: "homePage",
    _type: "homePage",
    hero: {
      _key: "hero",
      eyebrowPill: "Pembibitan Pisang & Sengon Unggul Kediri",
      headline: "Bibit Pisang & Sengon Sehat,\nPanen Berlimpah.",
      highlightedText: "Panen Berlimpah.",
      subtext: "Pusat pembibitan pisang dari anakan pilihan & bibit sengon dari biji berkualitas. Berakar sehat, vigor tinggi, dan siap tanam untuk perkebunan mandiri maupun skala komersial.",
      ctaPrimary: {
        text: "Pesan Bibit Sekarang",
        href: "https://wa.me/6289508495717?text=Halo%20Turia%20Farm,%20saya%20tertarik%20konsultasi%20bibit%20pisang%20%26%20sengon",
      },
      ctaSecondary: {
        text: "Lihat Varietas & Harga",
        href: "/bibit-pisang",
      },
      assuranceBadges: [
        { _key: "badge-1", icon: "check", text: "Bebas Layu Fusarium" },
        { _key: "badge-2", icon: "shield", text: "Garansi Hidup di Perjalanan" },
        { _key: "badge-3", icon: "award", text: "Pendampingan SOP Tani" },
      ],
      heroBadge: {
        _key: "hero-badge",
        title: "Siap Tanam Lapangan",
        subtitle: "Cavendish, Raja Bulu & Sengon Solomon",
        details: "Ketinggian 35-45 cm • Akar Aktif • Batuaji, Kediri",
      },
      floatingStat: {
        _key: "floating-stat",
        label: "150.000+ Bibit / Thn",
        detail: "Kirim Se-Jawa, Bali & Luar Pulau",
      },
    },
    stats: {
      _key: "stats",
      stats: [
        { _key: "stat-1", value: 98.4, suffix: "%", label: "Tingkat Hidup Lapangan" },
        { _key: "stat-2", value: 150, suffix: "K+", label: "Bibit Tersalurkan / Thn" },
        { _key: "stat-3", value: 500, suffix: "+", label: "Petani & Kebun Mitra" },
        { _key: "stat-4", value: 2.8, suffix: " Ha", label: "Nursery di Batuaji" },
      ],
    },
    featuredSeedlings: {
      _key: "featured-seedlings",
      seedlings: [
        { _type: "reference", _ref: "seedling-cavendish-grand-naine" },
        { _type: "reference", _ref: "seedling-pisang-raja-bulu" },
        { _type: "reference", _ref: "seedling-kepok-tanjung" },
      ],
    },
    processTeaser: {
      _key: "process-teaser",
      eyebrow: "Pembibitan Kebun Autentik",
      title: "4 Tahap Pemuliaan Tanpa Kompromi",
      ctaText: "Pelajari Proses Kultur Lengkap",
      ctaHref: "/proses-kultur",
      steps: [
        { _type: "reference", _ref: "processStep-01" },
        { _type: "reference", _ref: "processStep-02" },
        { _type: "reference", _ref: "processStep-03" },
        { _type: "reference", _ref: "processStep-04" },
      ],
    },
    knowledgeSpotlight: {
      _key: "knowledge-spotlight",
      eyebrow: "Edukasi Petani",
      title: "Panduan Praktis Kebun Pisang",
      ctaText: "Lihat Semua Panduan & FAQ",
      ctaHref: "/panduan-tani",
      article: { _type: "reference", _ref: "article-panduan-jarak-tanam-cavendish" },
    },
    seo: {
      _key: "seo",
      metaTitle: "Turia Farm | Pusat Pembibitan Pisang & Bibit Sengon Kediri",
      metaDescription: "Nursery bibit pisang dari anakan super (Cavendish, Raja Bulu, Kepok Tanjung) serta bibit sengon biji unggul di Batuaji, Kab. Kediri. Sehat, vigor tinggi, siap tanam, bergaransi.",
      metaKeywords: [
        "bibit pisang kediri",
        "bibit pisang anakan",
        "bibit sengon kediri",
        "bibit kepok tanjung kediri",
        "bibit pisang batuaji ringinrejo",
        "turia farm",
        "nursery pisang jawa timur",
      ],
      canonicalUrl: "https://turia-farm.vercel.app",
    },
  };

  await client.createOrReplace(homePageDoc);
  console.log("✅ Home Page seeded");
}

async function seedCatalogPage() {
  console.log("🌱 Seeding Catalog Page...");

  const catalogPageDoc = {
    _id: "catalogPage",
    _type: "catalogPage",
    hero: {
      _key: "hero",
      eyebrowPill: "Katalog Bibit",
      headline: "Bibit Pisang & Sengon Pilihan Siap Tanam",
      subtext:
        "Semua bibit dirawat langsung di kebun pembibitan Batuaji Kediri, berakar sehat aktif dalam polybag organik siap tanam.",
      heroImage: null, // Will be uploaded separately
    },
    featuredSeedlings: [
      { _type: "reference", _ref: "seedling-cavendish-grand-naine" },
      { _type: "reference", _ref: "seedling-pisang-raja-bulu" },
      { _type: "reference", _ref: "seedling-kepok-tanjung" },
    ],
    seo: {
      _key: "seo",
      metaTitle: "Katalog Bibit Pisang Unggul & Bibit Sengon | Turia Farm Kediri",
      metaDescription:
        "Daftar harga dan varietas bibit pisang anakan pilihan & bibit sengon biji Turia Farm di Batuaji Ringinrejo Kediri: Cavendish Grand Naine, Raja Bulu, Kepok Tanjung, Mas Kirana, Barangan, Sengon Solomon.",
      ogImage: null,
    },
  };

  await client.createOrReplace(catalogPageDoc);
  console.log("✅ Catalog Page seeded");
}

async function seedSiteConfig() {
  console.log("🌱 Seeding Site Config...");

  const siteConfigDoc = {
    _id: "siteConfig",
    _type: "siteConfig",
    siteName: "Turia Farm",
    siteTagline: "Pusat Pembibitan Pisang & Bibit Sengon Kediri",
    whatsapp: "6289508495717",
    whatsappLabel: "Konsultasi & Pesan Bibit",
    address: {
      street: "Batuaji, Ringinrejo",
      city: "Kediri",
      province: "Jawa Timur",
      postalCode: "64172",
      country: "Indonesia",
    },
    geo: {
      lat: -7.966558679400668,
      lng: 112.10123897405272,
    },
    openingHours: {
      days: "Senin - Sabtu",
      open: "07:30",
      close: "16:30",
      timezone: "WIB",
    },
  };

  await client.createOrReplace(siteConfigDoc);
  console.log("✅ Site Config seeded");
}

async function seedSeedlings(assetMap: Record<string, string> = {}) {
  console.log("🌱 Seeding Seedlings...");

  const seedlings = [
    {
      _id: "seedling-cavendish-grand-naine",
      _type: "seedling",
      id: { current: "cavendish-grand-naine" },
      name: "Cavendish Grand Naine",
      scientificName: "Musa acuminata Colla (AAA)",
      tag: "Favorit Ekspor & Pasar Swalayan",
      desc: "Kultur jaringan murni bebas penyakit layu darah & panama. Batang kokoh, tandan rapi, kulit mulus warna kuning cerah merata dengan daya simpan panjang.",
      maturity: "9 - 10 Bulan",
      bunchWeight: "28 - 38 kg / tandan",
      sweetness: "20 - 22° Brix (Manis Segar)",
      height: "2,1 - 2,4 meter",
      price: "Rp 12.500 / polybag",
      image: assetMap["seedling-cavendish-grand-naine"]
        ? { _type: "image", asset: { _type: "reference", _ref: assetMap["seedling-cavendish-grand-naine"] } }
        : null,
      status: "Tersedia Siap Tanam",
      bestFor: "Perkebunan komersial & agribisnis",
      featured: true,
      order: 1,
    },
    {
      _id: "seedling-pisang-raja-bulu",
      _type: "seedling",
      id: { current: "pisang-raja-bulu" },
      name: "Pisang Raja Bulu Super",
      scientificName: "Musa paradisiaca L. (AAB)",
      tag: "Primadona Kuliner & Hajatan",
      desc: "Bibit seleksi indukan produktif. Daging buah tebal bertekstur legit, aroma harum semerbak, rasa manis karamel khas pisang raja asli Nusantara.",
      maturity: "11 - 12 Bulan",
      bunchWeight: "18 - 25 kg / tandan",
      sweetness: "24 - 26° Brix (Manis Karamel Pekat)",
      height: "2,8 - 3,2 meter",
      price: "Rp 14.000 / polybag",
      image: assetMap["seedling-pisang-raja-bulu"]
        ? { _type: "image", asset: { _type: "reference", _ref: assetMap["seedling-pisang-raja-bulu"] } }
        : null,
      status: "Tersedia Siap Tanam",
      bestFor: "Pasar tradisional premium & olahan kue",
      featured: true,
      order: 2,
    },
    {
      _id: "seedling-kepok-tanjung",
      _type: "seedling",
      id: { current: "kepok-tanjung" },
      name: "Kepok Tanjung (Tanpa Jantung)",
      scientificName: "Musa balbisiana (ABB)",
      tag: "Tahan Layu Bakteri & Sangat Kokoh",
      desc: "Varietas unggulan Balitbu tanpa ontong/jantung gantung, memutus siklus infeksi bakteri pembawa layu darah. Buah padat sangat cocok untuk pisang goreng & keripik.",
      maturity: "12 - 13 Bulan",
      bunchWeight: "22 - 30 kg / tandan",
      sweetness: "21 - 23° Brix (Manis Pulen Sedang)",
      height: "3,0 - 3,5 meter",
      price: "Rp 13.500 / polybag",
      image: assetMap["seedling-kepok-tanjung"]
        ? { _type: "image", asset: { _type: "reference", _ref: assetMap["seedling-kepok-tanjung"] } }
        : null,
      status: "Tersedia Siap Tanam",
      bestFor: "Sentra UKM olahan, keripik & kebun tumpang sari",
      featured: true,
      order: 3,
    },
    {
      _id: "seedling-pisang-mas-kirana",
      _type: "seedling",
      id: { current: "pisang-mas-kirana" },
      name: "Pisang Mas Kirana",
      scientificName: "Musa acuminata (AA)",
      tag: "Pisang Meja & Sajian Hotel",
      desc: "Ukuran mungil elegan, kulit kuning emas bersih tanpa bintik, rasa manis segar lembut. Menjadi standar sajian meja hotel berbintang dan supermarket.",
      maturity: "8 - 9 Bulan",
      bunchWeight: "12 - 16 kg / tandan",
      sweetness: "23 - 25° Brix (Manis Madu Lembut)",
      height: "1,8 - 2,2 meter",
      price: "Rp 11.000 / polybag",
      image: assetMap["seedling-pisang-mas-kirana"]
        ? { _type: "image", asset: { _type: "reference", _ref: assetMap["seedling-pisang-mas-kirana"] } }
        : null,
      status: "Tersedia Siap Tanam",
      bestFor: "Kebun pekarangan & pasar buah segar harian",
      featured: false,
      order: 4,
    },
    {
      _id: "seedling-pisang-barangan-merah",
      _type: "seedling",
      id: { current: "pisang-barangan-merah" },
      name: "Pisang Barangan Merah",
      scientificName: "Musa acuminata (AAA)",
      tag: "Aroma Khas & Tekstur Pulen",
      desc: "Daging buah berwarna kuning kemerahan dengan bintik khas alami. Tekstur renyah di luar, lembut di dalam dengan wangi manis tajam menggugah selera.",
      maturity: "10 - 11 Bulan",
      bunchWeight: "16 - 22 kg / tandan",
      sweetness: "22 - 24° Brix (Manis Aromatik)",
      height: "2,5 - 2,8 meter",
      price: "Rp 12.000 / polybag",
      image: assetMap["seedling-pisang-barangan-merah"]
        ? { _type: "image", asset: { _type: "reference", _ref: assetMap["seedling-pisang-barangan-merah"] } }
        : null,
      status: "Tersedia Siap Tanam",
      bestFor: "Petani mitra & pasar regional pulau Jawa-Bali",
      featured: false,
      order: 5,
    },
    {
      _id: "seedling-pisang-ambon-kuning",
      _type: "seedling",
      id: { current: "pisang-ambon-kuning" },
      name: "Pisang Ambon Kuning Super",
      scientificName: "Musa acuminata (AAA)",
      tag: "Favorit Keluarga & MPASI",
      desc: "Buah besar melengkung mulus, daging putih krem beraroma vanila lembut. Sumber nutrisi alami favorit keluarga dan konsumsi harian.",
      maturity: "10 - 11 Bulan",
      bunchWeight: "20 - 28 kg / tandan",
      sweetness: "21 - 23° Brix (Manis Lembut Vanila)",
      height: "2,6 - 3,0 meter",
      price: "Rp 12.500 / polybag",
      image: assetMap["seedling-pisang-ambon-kuning"]
        ? { _type: "image", asset: { _type: "reference", _ref: assetMap["seedling-pisang-ambon-kuning"] } }
        : null,
      status: "Tersedia Siap Tanam",
      bestFor: "Kebun komersial & konsumsi harian keluarga",
      featured: false,
      order: 6,
    },
    {
      _id: "seedling-sengon-solomon",
      _type: "seedling",
      id: { current: "sengon-solomon" },
      name: "Sengon Solomon",
      scientificName: "Falcataria moluccana (Miq.)",
      tag: "Tumbuh Super Cepat & Serbaguna",
      desc: "Bibit sengon solomon unggul dengan pertumbuhan sangat cepat, batang lurus silindris, dan daun majemuk halus. Cocok untuk agroforestri, kayu pertukangan ringan, dan investasi lahan jangka menengah.",
      maturity: "Panen 5 - 7 Tahun",
      bunchWeight: "Diameter 30 - 45 cm",
      sweetness: "Karakter: Kayu Ringan & Putih Bersih",
      height: "Tinggi Bibit: 30 - 60 cm",
      price: "Rp 2.500 / polybag",
      image: assetMap["seedling-sengon-solomon"]
        ? { _type: "image", asset: { _type: "reference", _ref: assetMap["seedling-sengon-solomon"] } }
        : null,
      status: "Tersedia Siap Tanam",
      bestFor: "Agroforestri & investasi kayu industri",
      featured: false,
      order: 7,
    },
    {
      _id: "seedling-sengon-lokal",
      _type: "seedling",
      id: { current: "sengon-lokal" },
      name: "Sengon Lokal / Jeungjing",
      scientificName: "Paraserianthes falcataria (L.)",
      tag: "Adaptif & Ekonomis",
      desc: "Bibit sengon lokal adaptif untuk berbagai ketinggian lahan, tahan naungan awal, dan ekonomis untuk penanaman massal. Pilihan utama petani hutan rakyat untuk kayu rakyat bernilai.",
      maturity: "Panen 6 - 8 Tahun",
      bunchWeight: "Diameter 25 - 40 cm",
      sweetness: "Karakter: Serat Halus & Mudah Kering",
      height: "Tinggi Bibit: 30 - 50 cm",
      price: "Rp 2.000 / polybag",
      image: assetMap["seedling-sengon-lokal"]
        ? { _type: "image", asset: { _type: "reference", _ref: assetMap["seedling-sengon-lokal"] } }
        : null,
      status: "Tersedia Siap Tanam",
      bestFor: "Hutan rakyat & lahan kering",
      featured: false,
      order: 8,
    },
  ];

  const mutations = seedlings.map((doc) => ({ createOrReplace: doc }));
  await client.transaction(mutations).commit();
  console.log("✅ 8 Seedlings seeded with images");
}

async function seedArticles() {
  console.log("🌱 Seeding Articles...");

  const articles = [
    {
      _id: "article-panduan-jarak-tanam-cavendish",
      _type: "article",
      id: { current: "panduan-jarak-tanam-cavendish-hasil-optimal" },
      title: "Panduan Jarak Tanam & Lubang Tanam Pisang Cavendish untuk Hasil 30 Ton/Ha",
      category: "Teknik Budidaya",
      date: "2026-08-12",
      readTime: "5 menit baca",
      excerpt: "Pelajari pola tanam segitiga 2.2 x 2.2 meter, dosis pupuk dasar kandang fermentasi, dan manajemen sanitasi anakan untuk panen serentak.",
      content: [
        {
          _type: "block",
          _key: "b0",
          style: "normal",
          children: [{ _type: "span", text: "Penataan populasi pohon per hektar dan ukuran lubang tanam awal sangat menentukan kecepatan perakaran bibit cavendish hasil anakan maupun kultur jaringan." }]
        },
        {
          _type: "block",
          _key: "b1",
          style: "h3",
          children: [{ _type: "span", text: "1. Ukuran Lubang Tanam Ideal" }]
        },
        {
          _type: "block",
          _key: "b2",
          style: "normal",
          children: [{ _type: "span", text: "Buat lubang tanam berukuran 50cm x 50cm x 50cm setidaknya 2 minggu sebelum tanam. Pisahkan tanah galian atas (topsoil) dengan tanah galian bawah. Campurkan topsoil dengan 10-15 kg pupuk kandang matang/kompos terdekomposisi sempurna dan 250 gram kapur dolomit." }]
        },
        {
          _type: "block",
          _key: "b3",
          style: "h3",
          children: [{ _type: "span", text: "2. Jarak Tanam Populasi Optimal" }]
        },
        {
          _type: "block",
          _key: "b4",
          style: "normal",
          children: [{ _type: "span", text: "• Populasi Tunggal: 2,5 m x 2,5 m (sekitar 1.600 pohon/ha) untuk pencahayaan maksimal.\n• Populasi Ganda (Double Row): 2,0 m x 2,0 m x 3,0 m (sekitar 1.800-2.000 pohon/ha) untuk target tonase tinggi." }]
        },
        {
          _type: "block",
          _key: "b5",
          style: "h3",
          children: [{ _type: "span", text: "3. Penanganan Bibit Polybag Saat Tanam" }]
        },
        {
          _type: "block",
          _key: "b6",
          style: "normal",
          children: [{ _type: "span", text: "Buka plastik polybag secara perlahan tanpa merusak bola akar (root ball). Pastikan posisi leher akar sejajar atau 2-3 cm di bawah permukaan tanah bedengan untuk mencegah rebah saat berbuah." }]
        }
      ],
      author: "Pak Sugiono (Kepala Agronomis Turia)",
      published: true,
      order: 1,
    },
    {
      _id: "article-mencegah-penyakit-layu-fusarium",
      _type: "article",
      id: { current: "cara-mencegah-layu-fusarium-dan-darah-kebun-pisang" },
      title: "Mengenal Gejala & Pencegahan Dini Layu Darah (Blood Disease) pada Kebun Pisang",
      category: "Proteksi Tanaman",
      date: "2026-07-28",
      readTime: "7 menit baca",
      excerpt: "Mengapa pemakaian anakan pisang unggul dari indukan sehat dan desinfeksi parang potong adalah benteng utama petani dari kerugian gagal panen total.",
      content: [
        {
          _type: "block",
          _key: "b0",
          style: "normal",
          children: [{ _type: "span", text: "Penyakit layu darah yang disebabkan oleh bakteri Ralstonia solanacearum phylotype IV merupakan salah satu ancaman utama perkebunan pisang di Jawa Timur." }]
        },
        {
          _type: "block",
          _key: "b1",
          style: "h3",
          children: [{ _type: "span", text: "1. Gejala Khas pada Tanaman" }]
        },
        {
          _type: "block",
          _key: "b2",
          style: "normal",
          children: [{ _type: "span", text: "• Daun menguning dari daun tua, melulai dan patah pada pangkal pelepah.\n• Saat batang semut (pseudostem) dipotong, keluar cairan lendir kental berwarna cokelat kemerahan seperti darah.\n• Daging buah membusuk dan berwarna cokelat kehitaman dari dalam." }]
        },
        {
          _type: "block",
          _key: "b3",
          style: "h3",
          children: [{ _type: "span", text: "2. Jalur Penularan Utama" }]
        },
        {
          _type: "block",
          _key: "b4",
          style: "normal",
          children: [{ _type: "span", text: "Dipertukarkan oleh serangga penyerbuk yang hinggap pada jantung pisang (bunga jantan), peralatan pertanian yang tercemar, serta penggunaan bibit anakan dari induk yang terinfeksi secara tersembunyi." }]
        },
        {
          _type: "block",
          _key: "b5",
          style: "h3",
          children: [{ _type: "span", text: "3. Langkah Pencegahan Efektif" }]
        },
        {
          _type: "block",
          _key: "b6",
          style: "normal",
          children: [{ _type: "span", text: "• Gunakan bibit bebas penyakit bergaransi dari nursery terpercaya.\n• Bungkus tandan pisang (heart bagging) segera setelah sisir terakhir terbentuk.\n• Potong jantung pisang (denaveling) segera setelah pembentukan buah selesai.\n• Sterilisasi parang/alat pangkas dengan alkohol 70% sebelum berpindah antar pohon." }]
        }
      ],
      author: "Ir. Larasati Putri (Agronomis)",
      published: true,
      order: 2,
    },
    {
      _id: "article-analisis-usaha-tani-pisang-raja",
      _type: "article",
      id: { current: "analisis-modal-dan-keuntungan-kebun-pisang-raja-bulu-1-hektar" },
      title: "Analisis Modal & Estimasi Laba Bersih Kebun Pisang Raja Bulu per 1 Hektar",
      category: "Bisnis Tani",
      date: "2026-07-15",
      readTime: "6 menit baca",
      excerpt: "Rincian kebutuhan bibit (2.000 pohon/ha), instalasi irigasi tetes murah, estimasi panen bulan ke-11, dan serapan pasar induk buah lokal.",
      content: [
        {
          _type: "block",
          _key: "b0",
          style: "normal",
          children: [{ _type: "span", text: "Pisang Raja Bulu memiliki nilai ekonomi sangat tinggi di pasar lokal dan industri kue/oleh-oleh karena aroma khas dan rasa manis legitnya." }]
        },
        {
          _type: "block",
          _key: "b1",
          style: "h3",
          children: [{ _type: "span", text: "1. Kebutuhan Investasi Awal (Tahun ke-1)" }]
        },
        {
          _type: "block",
          _key: "b2",
          style: "normal",
          children: [{ _type: "span", text: "• Sewa Lahan (1 Ha): Rp 15.000.000 / tahun\n• Bibit Raja Bulu Super (1.600 batang @ Rp 14.000): Rp 22.400.000\n• Olah Tanah & Pembuatan Lubang Tanam: Rp 8.000.000\n• Pupuk Dasar & Dolomit: Rp 12.000.000\n• Instalasi Irigasi Sederhana: Rp 10.000.000\nTotal Modal Awal: Rp 67.400.000" }]
        },
        {
          _type: "block",
          _key: "b3",
          style: "h3",
          children: [{ _type: "span", text: "2. Perawatan & Pemeliharaan (Bulan 1 - 12)" }]
        },
        {
          _type: "block",
          _key: "b4",
          style: "normal",
          children: [{ _type: "span", text: "• Pupuk Lanjutan & Nutrisi Organik: Rp 15.000.000\n• Tenaga Kerja Perawatan & Sanitasi Anakan: Rp 12.000.000\nTotal Operasional: Rp 27.000.000" }]
        },
        {
          _type: "block",
          _key: "b5",
          style: "h3",
          children: [{ _type: "span", text: "3. Estimasi Hasil Panen Perdana (Bulan ke-12 s/d 14)" }]
        },
        {
          _type: "block",
          _key: "b6",
          style: "normal",
          children: [{ _type: "span", text: "• Tingkat Keberhasilan Panen: 90% (1.440 pohon berbuah)\n• Rata-rata Berat Tandan: 18 kg / tandan\n• Total Produksi: 25.920 kg\n• Harga Jual Tingkat Petani (Rata-rata): Rp 7.500 / kg\nTotal Pendapatan Kotor: Rp 194.400.000" }]
        },
        {
          _type: "block",
          _key: "b7",
          style: "h3",
          children: [{ _type: "span", text: "4. Laba Bersih Tahun Pertama" }]
        },
        {
          _type: "block",
          _key: "b8",
          style: "normal",
          children: [{ _type: "span", text: "Pendapatan (Rp 194.400.000) - Total Modal & OpEx (Rp 94.400.000) = Rp 100.000.000 Laba Bersih." }]
        }
      ],
      author: "Alfian Pratama (Manajer Kemitraan)",
      published: true,
      order: 3,
    },
  ];

  const mutations = articles.map((doc) => ({ createOrReplace: doc }));
  await client.transaction(mutations).commit();
  console.log("✅ 3 Articles seeded");
}

async function seedProcessSteps() {
  console.log("🌱 Seeding Process Steps...");

  const steps = [
    {
      _id: "processStep-01",
      _type: "processStep",
      step: "01",
      title: "Seleksi Indukan & Penyemaian Biji",
      tagline: "Genetika Unggul & Biji Pilihan",
      desc: "Untuk pisang, kami memilih anakan produktif dari pohon induk yang sehat. Untuk sengon, kami menyemai biji sengon solomon unggul pilihan.",
      duration: "Tahap Awal Pembibitan",
      highlight: "Seleksi Indukan Ketat",
      icon: "sprout",
      order: 1,
    },
    {
      _id: "processStep-02",
      _type: "processStep",
      step: "02",
      title: "Pemisahan Anakan & Bedengan Semai",
      tagline: "Penanganan Akar & Batang",
      desc: "Anakan pisang dipisah secara hati-hati dari bonggol induk, sedangkan kecambah sengon dipindahkan ke bedengan semai terbuka dengan naungan alami.",
      duration: "2 - 3 Minggu Pemulihan",
      highlight: "Pertumbuhan Akar Aktif",
      icon: "energy_savings_leaf",
      order: 2,
    },
    {
      _id: "processStep-03",
      _type: "processStep",
      step: "03",
      title: "Pembesaran Polybag & Nutrisi Organik",
      tagline: "Media Tanah & Kompos Matang",
      desc: "Bibit dirawat di polybag dengan media tanah kebun subur, kompos matang, dan pupuk organik untuk memastikan kekuatan batang dan akar sebelum siap tanam.",
      duration: "1 - 2 Bulan di Bedengan Kebun",
      highlight: "Bibit Kokoh Siap Tanam",
      icon: "potted_plant",
      order: 3,
    },
    {
      _id: "processStep-04",
      _type: "processStep",
      step: "04",
      title: "Grading Ketat & Pengiriman Bergaransi",
      tagline: "Garansi Hidup Sampai Kebun",
      desc: "Setiap bibit diperiksa manual (jumlah daun, kesegaran batang, akar aktif). Dikemas aman dengan peti kayu untuk pengiriman se-Jawa, Bali, & luar pulau.",
      duration: "1 - 3 Hari Pengiriman",
      highlight: "Garansi Ganti Bibit Baru",
      icon: "verified",
      order: 4,
    },
  ];

  const mutations = steps.map((doc) => ({ createOrReplace: doc }));
  await client.transaction(mutations).commit();
  console.log("✅ 4 Process Steps seeded");
}

async function main() {
  console.log("🚀 Starting Sanity seed for Turia Farm...\n");

  try {
    // Upload images first
    const assetMap = await uploadSeedlingImages();
    
    // Seed referenced documents FIRST
    await seedSeedlings(assetMap);
    await seedArticles();
    await seedProcessSteps();
    // Then seed Page Singletons
    await seedHomePage();
    await seedCatalogPage();
    await seedSiteConfig();

    console.log("\n🎉 All content seeded successfully!");
    console.log("\n📋 Summary:");
    console.log("  • 1 Home Page (singleton)");
    console.log("  • 1 Catalog Page (singleton)");
    console.log("  • 1 Site Config (singleton)");
    console.log("  • 8 Seedlings (3 featured) with images");
    console.log("  • 3 Articles");
    console.log("  • 4 Process Steps");
    console.log("\n💡 Images uploaded to Sanity assets and linked to seedlings");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

main();