import { createClient } from "@sanity/client";
import { dirname, join } from "path";
import { readFileSync } from "fs";

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
      heroImage: null, // Will be uploaded separately if needed
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
      ogImage: null,
      canonicalUrl: "https://turia-farm.vercel.app",
    },
  };

  await client.createOrReplace(homePageDoc);
  console.log("✅ Home Page seeded");
}

async function seedSeedlings() {
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
      image: null, // Will be uploaded separately
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
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
      image: null,
      status: "Tersedia Siap Tanam",
      bestFor: "Hutan rakyat & lahan kering",
      featured: false,
      order: 8,
    },
  ];

  const mutations = seedlings.map((doc) => ({ createOrReplace: doc }));
  await client.transaction(mutations).commit();
  console.log("✅ 8 Seedlings seeded");
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
      content: [],
      image: null,
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
      content: [],
      image: null,
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
      content: [],
      image: null,
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
    // Seed referenced documents FIRST
    await seedSeedlings();
    await seedArticles();
    await seedProcessSteps();
    // Then seed Home Page (which references them)
    await seedHomePage();

    console.log("\n🎉 All content seeded successfully!");
    console.log("\n📋 Summary:");
    console.log("  • 1 Home Page (singleton)");
    console.log("  • 8 Seedlings (3 featured)");
    console.log("  • 3 Articles");
    console.log("  • 4 Process Steps");
    console.log("\n💡 Next: Upload images to Sanity assets and update references");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

main();