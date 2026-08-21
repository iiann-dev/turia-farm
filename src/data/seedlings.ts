import { SeedlingItem, ProcessStep, ArticleItem, TestimonialItem } from "../types";

export const SITE_CONFIG = {
  name: "Turia Farm",
  tagline: "Pembibitan Pisang Unggul & Bibit Sengon Kediri",
  phone: "+62 895-0849-5717",
  whatsapp: "https://wa.me/6289508495717?text=Halo%20Turia%20Farm,%20saya%20tertarik%20konsultasi%20bibit%20pisang%20%26%20sengon",
  email: "salam@turiafarm.id",
  address: {
    id: "Turia's Farm Kediri, Batuaji, Ringinrejo, Kab. Kediri, Jawa Timur 64172, Indonesia",
    en: "Turia's Farm Kediri, Batuaji, Ringinrejo, Kediri Regency, East Java 64172, Indonesia",
  },
  location: "Batuaji, Ringinrejo, Kab. Kediri, Jawa Timur, Indonesia",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.25!2d112.1038139!3d-7.966564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78f1006725ea41%3A0x2a565eacbeca6fbe!2sTURIA'S%20FARM%20KEDIRI%20%23bibitpisang%26sengon!5e0!3m2!1sid!2sid!4v1720000000000",
  mapsLink:
    "https://maps.app.goo.gl/3WbP6pDM9GreKdVG9",
  geo: {
    lat: -7.966564,
    lng: 112.1038139,
  },
  nurseryArea: "2.8 Hektar Nursery & Greenhouse Aklimatisasi",
  hours: {
    id: "Senin - Sabtu: 07.30 - 16.30 WIB",
    en: "Monday - Saturday: 07:30 AM - 04:30 PM (WIB)",
  },
};

export const SEEDLINGS: SeedlingItem[] = [
  {
    id: "cavendish-grand-naine",
    name: {
      id: "Cavendish Grand Naine",
      en: "Cavendish Grand Naine",
    },
    scientificName: "Musa acuminata Colla (AAA)",
    tag: { id: "Favorit Ekspor & Pasar Swalayan", en: "Export & Retail Favorite" },
    desc: {
      id: "Kultur jaringan murni bebas penyakit layu darah & panama. Batang kokoh, tandan rapi, kulit mulus warna kuning cerah merata dengan daya simpan panjang.",
      en: "Pure tissue culture certified free of blood disease & fusarium. Sturdy pseudo-stem, symmetrical bunches, uniform golden peel with excellent shelf life.",
    },
    maturity: { id: "9 - 10 Bulan", en: "9 - 10 Months" },
    bunchWeight: { id: "28 - 38 kg / tandan", en: "28 - 38 kg / bunch" },
    sweetness: { id: "20 - 22° Brix (Manis Segar)", en: "20 - 22° Brix (Sweet & Crisp)" },
    height: { id: "2,1 - 2,4 meter", en: "2.1 - 2.4 meters" },
    price: { id: "Rp 12.500 / polybag", en: "$0.80 / seedling" },
    image: "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=900&q=80&auto=format",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Perkebunan komersial & agribisnis", en: "Commercial plantation & agribusiness" },
  },
  {
    id: "pisang-raja-bulu",
    name: {
      id: "Pisang Raja Bulu Super",
      en: "Royal Raja Bulu Super",
    },
    scientificName: "Musa paradisiaca L. (AAB)",
    tag: { id: "Primadona Kuliner & Hajatan", en: "High-Value Culinary Benchmark" },
    desc: {
      id: "Bibit seleksi indukan produktif. Daging buah tebal bertekstur legit, aroma harum semerbak, rasa manis karamel khas pisang raja asli Nusantara.",
      en: "Carefully selected from high-yield mother plants. Rich velvety flesh, distinct sweet caramel aroma, traditional premium dessert banana of Indonesia.",
    },
    maturity: { id: "11 - 12 Bulan", en: "11 - 12 Months" },
    bunchWeight: { id: "18 - 25 kg / tandan", en: "18 - 25 kg / bunch" },
    sweetness: { id: "24 - 26° Brix (Manis Karamel Pekat)", en: "24 - 26° Brix (Rich Caramel Sweet)" },
    height: { id: "2,8 - 3,2 meter", en: "2.8 - 3.2 meters" },
    price: { id: "Rp 14.000 / polybag", en: "$0.90 / seedling" },
    image: "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=900&q=80&auto=format",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Pasar tradisional premium & olahan kue", en: "Premium local market & pastry supply" },
  },
  {
    id: "kepok-tanjung",
    name: {
      id: "Kepok Tanjung (Tanpa Jantung)",
      en: "Kepok Tanjung (Disease Resistant)",
    },
    scientificName: "Musa balbisiana (ABB)",
    tag: { id: "Tahan Layu Bakteri & Sangat Kokoh", en: "Naturally Disease-Resistant" },
    desc: {
      id: "Varietas unggulan Balitbu tanpa ontong/jantung gantung, memutus siklus infeksi bakteri pembawa layu darah. Buah padat sangat cocok untuk pisang goreng & keripik.",
      en: "Official non-male bud variety, naturally breaking the transmission vector of bacterial blood disease. Dense flesh ideal for frying and chips.",
    },
    maturity: { id: "12 - 13 Bulan", en: "12 - 13 Months" },
    bunchWeight: { id: "22 - 30 kg / tandan", en: "22 - 30 kg / bunch" },
    sweetness: { id: "21 - 23° Brix (Manis Pulen Sedang)", en: "21 - 23° Brix (Mild Sweet & Dense)" },
    height: { id: "3,0 - 3,5 meter", en: "3.0 - 3.5 meters" },
    price: { id: "Rp 13.500 / polybag", en: "$0.85 / seedling" },
    image: "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=900&q=80&auto=format",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Sentra UKM olahan, keripik & kebun tumpang sari", en: "Food processing, banana chips & intercropping" },
  },
  {
    id: "pisang-mas-kirana",
    name: {
      id: "Pisang Mas Kirana",
      en: "Golden Mas Kirana",
    },
    scientificName: "Musa acuminata (AA)",
    tag: { id: "Pisang Meja & Sajian Hotel", en: "Hotel & Table Dessert Grade" },
    desc: {
      id: "Ukuran mungil elegan, kulit kuning emas bersih tanpa bintik, rasa manis segar lembut. Menjadi standar sajian meja hotel berbintang dan supermarket.",
      en: "Petite elegant banana with spotless bright golden skin and silky sweet texture. Standard fruit choice for hospitality and urban organic markets.",
    },
    maturity: { id: "8 - 9 Bulan", en: "8 - 9 Months" },
    bunchWeight: { id: "12 - 16 kg / tandan", en: "12 - 16 kg / bunch" },
    sweetness: { id: "23 - 25° Brix (Manis Madu Lembut)", en: "23 - 25° Brix (Delicate Honey Sweet)" },
    height: { id: "1,8 - 2,2 meter", en: "1.8 - 2.2 meters" },
    price: { id: "Rp 11.000 / polybag", en: "$0.70 / seedling" },
    image: "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=900&q=80&auto=format",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Kebun pekarangan & pasar buah segar harian", en: "Homestead gardens & daily fresh fruit supply" },
  },
  {
    id: "pisang-barangan-merah",
    name: {
      id: "Pisang Barangan Merah",
      en: "Red Barangan Heritage",
    },
    scientificName: "Musa acuminata (AAA)",
    tag: { id: "Aroma Khas & Tekstur Pulen", en: "Aromatic Local Heritage" },
    desc: {
      id: "Daging buah berwarna kuning kemerahan dengan bintik khas alami. Tekstur renyah di luar, lembut di dalam dengan wangi manis tajam menggugah selera.",
      en: "Red-tinted golden flesh with characteristic natural freckles. Pleasantly crisp outer bite, melting sweet center with intoxicating aroma.",
    },
    maturity: { id: "10 - 11 Bulan", en: "10 - 11 Months" },
    bunchWeight: { id: "16 - 22 kg / tandan", en: "16 - 22 kg / bunch" },
    sweetness: { id: "22 - 24° Brix (Manis Aromatik)", en: "22 - 24° Brix (Aromatic Sweet)" },
    height: { id: "2,5 - 2,8 meter", en: "2.5 - 2.8 meters" },
    price: { id: "Rp 12.000 / polybag", en: "$0.75 / seedling" },
    image: "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=900&q=80&auto=format",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Petani mitra & pasar regional pulau Jawa-Bali", en: "Contract farming & regional fresh markets" },
  },
  {
    id: "pisang-ambon-kuning",
    name: {
      id: "Pisang Ambon Kuning Super",
      en: "Ambon Kuning Classic",
    },
    scientificName: "Musa acuminata (AAA)",
    tag: { id: "Favorit Keluarga & MPASI", en: "Family & Natural Baby Food" },
    desc: {
      id: "Buah besar melengkung mulus, daging putih krem beraroma vanila lembut. Sumber nutrisi alami favorit keluarga dan konsumsi harian.",
      en: "Classic large curved fruit with smooth ivory flesh and soothing vanilla undertone. Rich in potassium and gentle dietary fiber.",
    },
    maturity: { id: "10 - 11 Bulan", en: "10 - 11 Months" },
    bunchWeight: { id: "20 - 28 kg / tandan", en: "20 - 28 kg / bunch" },
    sweetness: { id: "21 - 23° Brix (Manis Lembut Vanila)", en: "21 - 23° Brix (Vanilla Sweet & Creamy)" },
    height: { id: "2,6 - 3,0 meter", en: "2.6 - 3.0 meters" },
    price: { id: "Rp 12.500 / polybag", en: "$0.80 / seedling" },
    image: "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=900&q=80&auto=format",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Kebun komersial & konsumsi harian keluarga", en: "Commercial orchards & everyday household supply" },
  },
  {
    id: "sengon-solomon",
    name: {
      id: "Sengon Solomon",
      en: "Solomon Sengon (Albizia)",
    },
    scientificName: "Falcataria moluccana (Miq.)",
    tag: { id: "Tumbuh Super Cepat & Serbaguna", en: "Fast-Growing Timber Favorite" },
    desc: {
      id: "Bibit sengon solomon unggul dengan pertumbuhan sangat cepat, batang lurus silindris, dan daun majemuk halus. Cocok untuk agroforestri, kayu pertukangan ringan, dan investasi lahan jangka menengah.",
      en: "Premium Solomon sengon seedlings with exceptionally fast growth, straight cylindrical trunk, and fine feathery foliage. Ideal for agroforestry, light timber, and mid-term land investment.",
    },
    maturity: { id: "Panen 5 - 7 Tahun", en: "Harvest 5 - 7 Years" },
    bunchWeight: { id: "Diameter 30 - 45 cm", en: "DBH 30 - 45 cm" },
    sweetness: { id: "Karakter: Kayu Ringan & Putih Bersih", en: "Characteristic: Lightweight White Timber" },
    height: { id: "Tinggi Bibit: 30 - 60 cm", en: "Sapling Height: 30 - 60 cm" },
    price: { id: "Rp 2.500 / polybag", en: "$0.16 / seedling" },
    image: "/images/bibit-sengon.webp",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Agroforestri & investasi kayu industri", en: "Agroforestry & industrial timber investment" },
  },
  {
    id: "sengon-lokal",
    name: {
      id: "Sengon Lokal / Jeungjing",
      en: "Local Sengon (Jeungjing)",
    },
    scientificName: "Paraserianthes falcataria (L.)",
    tag: { id: "Adaptif & Ekonomis", en: "Hardy & Budget-Friendly" },
    desc: {
      id: "Bibit sengon lokal adaptif untuk berbagai ketinggian lahan, tahan naungan awal, dan ekonomis untuk penanaman massal. Pilihan utama petani hutan rakyat untuk kayu rakyat bernilai.",
      en: "Adaptive local sengon seedlings tolerant of various elevations and early shade — the economical choice for mass planting, favored by community forestry growers.",
    },
    maturity: { id: "Panen 6 - 8 Tahun", en: "Harvest 6 - 8 Years" },
    bunchWeight: { id: "Diameter 25 - 40 cm", en: "DBH 25 - 40 cm" },
    sweetness: { id: "Karakter: Serat Halus & Mudah Kering", en: "Characteristic: Fine Fiber & Fast Drying" },
    height: { id: "Tinggi Bibit: 30 - 50 cm", en: "Sapling Height: 30 - 50 cm" },
    price: { id: "Rp 2.000 / polybag", en: "$0.13 / seedling" },
    image: "/images/bibit-sengon.webp",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Hutan rakyat & lahan kering", en: "Community forests & drier land" },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: { id: "Seleksi Indukan & Penyemaian Biji", en: "Mother Tree Selection & Seed Sowing" },
    tagline: { id: "Genetika Unggul & Biji Pilihan", en: "Superior Genetics & Quality Seeds" },
    desc: {
      id: "Untuk pisang, kami memilih anakan produktif dari pohon induk yang sehat. Untuk sengon, kami menyemai biji sengon solomon unggul pilihan.",
      en: "For bananas, we select vigorous suckers from healthy mother palms. For sengon timber, we sow high-grade certified solomon seeds.",
    },
    duration: { id: "Tahap Awal Pembibitan", en: "Initial Nursery Stage" },
    highlight: { id: "Seleksi Indukan Ketat", en: "Strict Mother Selection" },
    icon: "sprout",
  },
  {
    step: "02",
    title: { id: "Pemisahan Anakan & Bedengan Semai", en: "Sucker Separation & Nursery Beds" },
    tagline: { id: "Penanganan Akar & Batang", en: "Root & Stem Care" },
    desc: {
      id: "Anakan pisang dipisah secara hati-hati dari bonggol induk, sedangkan kecambah sengon dipindahkan ke bedengan semai terbuka dengan naungan alami.",
      en: "Banana suckers are carefully separated from the mother rhizome, while sengon sprouts transition to shaded open-air nursery beds.",
    },
    duration: { id: "2 - 3 Minggu Pemulihan", en: "2 - 3 Weeks Recovery" },
    highlight: { id: "Pertumbuhan Akar Aktif", en: "Active Root Growth" },
    icon: "energy_savings_leaf",
  },
  {
    step: "03",
    title: { id: "Pembesaran Polybag & Nutrisi Organik", en: "Polybag Potting & Organic Feeding" },
    tagline: { id: "Media Tanah & Kompos Matang", en: "Rich Soil & Mature Compost" },
    desc: {
      id: "Bibit dirawat di polybag dengan media tanah kebun subur, kompos matang, dan pupuk organik untuk memastikan kekuatan batang dan akar sebelum siap tanam.",
      en: "Nurtured in polybags with fertile garden soil, mature compost, and organic bio-nutrients to build thick stems and resilient roots.",
    },
    duration: { id: "1 - 2 Bulan di Bedengan Kebun", en: "1 - 2 Months Nursery Bed" },
    highlight: { id: "Bibit Kokoh Siap Tanam", en: "Sturdy Field-Ready Saplings" },
    icon: "potted_plant",
  },
  {
    step: "04",
    title: { id: "Grading Ketat & Pengiriman Bergaransi", en: "Strict Grading & Insured Delivery" },
    tagline: { id: "Garansi Hidup Sampai Kebun", en: "Safe Arrival Guarantee" },
    desc: {
      id: "Setiap bibit diperiksa manual (jumlah daun, kesegaran batang, akar aktif). Dikemas aman dengan peti kayu untuk pengiriman se-Jawa, Bali, & luar pulau.",
      en: "Every seedling undergoes manual inspection (leaf count, stem vigor, active roots). Safely crated for road and inter-island transport.",
    },
    duration: { id: "1 - 3 Hari Pengiriman", en: "1 - 3 Days Transit Delivery" },
    highlight: { id: "Garansi Ganti Bibit Baru", en: "Free Replacement Warranty" },
    icon: "verified",
  },
];

export const ARTICLES: ArticleItem[] = [
  {
    id: "panduan-jarak-tanam-cavendish",
    slug: "panduan-jarak-tanam-cavendish-hasil-optimal",
    title: {
      id: "Panduan Jarak Tanam & Lubang Tanam Pisang Cavendish untuk Hasil 30 Ton/Ha",
      en: "Optimal Spacing & Planting Hole Guide for 30 Ton/Ha Cavendish Yield",
    },
    category: { id: "Teknik Budidaya", en: "Agronomy Guide" },
    date: { id: "12 Agustus 2026", en: "August 12, 2026" },
    readTime: { id: "5 menit baca", en: "5 min read" },
    excerpt: {
      id: "Pelajari pola tanam segitiga 2.2 x 2.2 meter, dosis pupuk dasar kandang fermentasi, dan manajemen sanitasi anakan untuk panen serentak.",
      en: "Learn the 2.2 x 2.2m triangle spacing pattern, fermented manure baseline dosage, and sucker pruning strategies for uniform harvest cycles.",
    },
    image: "https://images.unsplash.com/photo-1620036924477-c3d6e9ce36fc?w=800&q=80&auto=format",
    author: "Pak Sugiono (Kepala Agronomis Turia)",
  },
  {
    id: "mencegah-penyakit-layu-fusarium",
    slug: "cara-mencegah-layu-fusarium-dan-darah-kebun-pisang",
    title: {
      id: "Mengenal Gejala & Pencegahan Dini Layu Darah (Blood Disease) pada Kebun Pisang",
      en: "Recognizing & Preventing Bacterial Blood Disease in Commercial Banana Orchards",
    },
    category: { id: "Proteksi Tanaman", en: "Crop Protection" },
    date: { id: "28 Juli 2026", en: "July 28, 2026" },
    readTime: { id: "7 menit baca", en: "7 min read" },
    excerpt: {
      id: "Mengapa pemakaian anakan pisang unggul dari indukan sehat dan desinfeksi parang potong adalah benteng utama petani dari kerugian gagal panen total.",
      en: "Why selected healthy banana suckers and pruning tool sterilization remain a grower's strongest defense against sudden total crop failure.",
    },
    image: "https://images.unsplash.com/photo-1552901633-210088e17486?w=800&q=80&auto=format",
    author: "Ir. Larasati Putri (Agronomis)",
  },
  {
    id: "analisis-usaha-tani-pisang-raja",
    slug: "analisis-modal-dan-keuntungan-kebun-pisang-raja-bulu-1-hektar",
    title: {
      id: "Analisis Modal & Estimasi Laba Bersih Kebun Pisang Raja Bulu per 1 Hektar",
      en: "ROI & Operational Cost Breakdown for 1 Hectare Royal Raja Bulu Orchard",
    },
    category: { id: "Bisnis Tani", en: "Agri-Business" },
    date: { id: "15 Juli 2026", en: "July 15, 2026" },
    readTime: { id: "6 menit baca", en: "6 min read" },
    excerpt: {
      id: "Rincian kebutuhan bibit (2.000 pohon/ha), instalasi irigasi tetes murah, estimasi panen bulan ke-11, dan serapan pasar induk buah lokal.",
      en: "Detailed itemized costs for 2,000 seedlings/ha, budget drip irrigation setup, month-11 harvest projections, and wholesale buyer channels.",
    },
    image: "https://images.unsplash.com/photo-1762512216868-3e7dae3beee5?w=800&q=80&auto=format",
    author: "Alfian Pratama (Manajer Kemitraan)",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Haji Munawir",
    location: "Kandangan, Kediri",
    role: { id: "Petani Mitra Cavendish (2.5 Ha)", en: "Cavendish Partner Farmer (2.5 Ha)" },
    quote: {
      id: "Ambil 4.000 bibit Cavendish anakan super dari kebun Turia Farm di Batuaji Kediri, pertumbuhan seragam sekali. Daun lebar hijau pekat dan alhamdulillah zero kematian saat pindah tanam.",
      en: "Ordered 4,000 premium Cavendish suckers from Turia Farm in Batuaji Kediri. The growth uniformity is incredible — dark green lush foliage with zero transplant loss.",
    },
    farmSize: "4.000 Bibit / 2.5 Ha",
    rating: 5,
  },
  {
    name: "Budi Santoso, S.P.",
    location: "Ringinrejo, Kediri",
    role: { id: "Pengelola Kebun Buah Kelompok Tani", en: "Farming Cooperative Manager" },
    quote: {
      id: "Bibit Kepok Tanjung-nya juara, beneran tanpa ontong dan sangat tahan penyakit. Pendampingan agronomis dari tim Turia via WhatsApp sangat responsif dan membantu petani kami.",
      en: "The Kepok Tanjung variety is outstanding — true male-budless traits and completely disease-free. The Turia agronomist team is always ready to guide our farmers.",
    },
    farmSize: "1.800 Bibit / 1.2 Ha",
    rating: 5,
  },
  {
    name: "Ibu Ni Wayan Sudarni",
    location: "Tabanan, Bali",
    role: { id: "Pemilik Kebun Pisang Raja & Banten", en: "Raja Bulu Orchard Owner" },
    quote: {
      id: "Kirim dari Batuaji Kediri ke Tabanan sampai dalam kondisi segar tanpa daun patah. Packing keranjang kayunya rapi. Sekarang usia 7 bulan pohonnya montok-montok.",
      en: "Shipped from Batuaji Kediri to Bali and arrived crisp and hydrated without damaged leaves. Wooden crate packaging was very secure. 7 months in, trees look magnificent.",
    },
    farmSize: "950 Bibit / 6.000 m²",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: {
      id: "Berapa minimal pemesanan bibit di Turia Farm Kediri?",
      en: "What is the minimum order quantity for seedlings at Turia Farm Kediri?",
    },
    a: {
      id: "Tidak ada minimal untuk pengambilan langsung ke lokasi nursery di Batuaji, Kab. Kediri. Untuk pengiriman ekspedisi antar kota, minimal order adalah 20 polybag (1 krat kayu). Untuk proyek kebun skala hektar (1.000+ bibit), kami berikan harga grosir kemitraan khusus beserta layanan antar armada truk kami.",
      en: "There is no minimum for nursery pick-up at Batuaji, Kediri. For inter-city courier delivery, minimum order is 20 polybags (1 safe wooden crate). For large commercial acreage (1,000+ seedlings), we provide tiered partnership pricing and dedicated flatbed truck delivery.",
    },
  },
  {
    q: {
      id: "Apakah ada garansi jika bibit mati saat pengiriman?",
      en: "Is there a replacement warranty for seedlings damaged in transit?",
    },
    a: {
      id: "Ya, kami memberikan Garansi Hidup 100%. Jika bibit patah, layu mati, atau rusak dalam perjalanan ekspedisi, cukup kirim video unboxing saat paket tiba dan kami akan kirim bibit pengganti baru tanpa biaya tambahan.",
      en: "Yes, we guarantee 100% Live Arrival. If any plant is snapped, withered, or damaged during courier transit, simply share an unboxing video upon arrival and we will ship replacements immediately free of charge.",
    },
  },
  {
    q: {
      id: "Apakah petani pemula mendapatkan bimbingan cara tanam?",
      en: "Do beginners receive planting and maintenance guidance?",
    },
    a: {
      id: "Pasti! Setiap pemesanan disertai Buku Panduan SOP Budidaya Pisang (jadwal pemupukan, racikan kompos, pengendalian hama) dan akses konsultasi langsung via WhatsApp dengan tim Agronomis Turia Farm selama masa tanam.",
      en: "Absolutely! Every order includes our digital SOP Banana Agronomy Manual (fertilization schedules, compost recipes, pest management) plus direct WhatsApp agronomy support throughout your growing cycle.",
    },
  },
  {
    q: {
      id: "Bagaimana cara Turia Farm memastikan mutu anakan pisang & bibit sengon?",
      en: "How does Turia Farm ensure the quality of banana suckers & sengon seedlings?",
    },
    a: {
      id: "Anakan pisang kami diambil dari pohon indukan unggul yang terbukti sehat dan produktif, kemudian dibersihkan dan dirawat di polybag tanah subur. Untuk sengon, kami menyemai biji berkualitas dari benih pilihan sehingga memiliki daya tumbuh tinggi dan batang lurus kokoh.",
      en: "Our banana suckers are harvested from healthy, high-yield mother trees, cleaned, and nurtured in fertile soil polybags. For sengon, we sow premium certified seeds to ensure high germination rates and strong, straight stems.",
    },
  },
];
