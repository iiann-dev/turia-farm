import { SeedlingItem, ProcessStep, ArticleItem, TestimonialItem } from "../types";

export const SITE_CONFIG = {
  name: "Turia Farm",
  tagline: "Pembibitan Pisang Unggul & Kultur Jaringan Kediri",
  phone: "+62 812-3456-7890",
  whatsapp: "https://wa.me/6281234567890?text=Halo%20Turia%20Farm,%20saya%20tertarik%20konsultasi%20bibit%20pisang",
  email: "salam@turiafarm.id",
  address: "Batuaji, Ringinrejo, Kab. Kediri, Jawa Timur 64172, Indonesia",
  location: "Batuaji, Kab. Kediri, Jawa Timur, Indonesia",
  geo: {
    lat: -7.9528,
    lng: 112.0156,
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
    sweetness: "20 - 22° Brix",
    height: "2.1 - 2.4 m",
    price: { id: "Rp 12.500 / polybag", en: "$0.80 / seedling" },
    image: "https://images.unsplash.com/photo-1668762924635-a3683caf32bf?w=900&q=80&auto=format",
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
    sweetness: "24 - 26° Brix",
    height: "2.8 - 3.2 m",
    price: { id: "Rp 14.000 / polybag", en: "$0.90 / seedling" },
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e562?w=900&q=80&auto=format",
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
    sweetness: "21 - 23° Brix",
    height: "3.0 - 3.5 m",
    price: { id: "Rp 13.500 / polybag", en: "$0.85 / seedling" },
    image: "https://images.unsplash.com/photo-1653481006620-dbb70963c713?w=900&q=80&auto=format",
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
    sweetness: "23 - 25° Brix",
    height: "1.8 - 2.2 m",
    price: { id: "Rp 11.000 / polybag", en: "$0.70 / seedling" },
    image: "https://images.unsplash.com/photo-1617631716600-6a454b430367?w=900&q=80&auto=format",
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
    sweetness: "22 - 24° Brix",
    height: "2.5 - 2.8 m",
    price: { id: "Rp 12.000 / polybag", en: "$0.75 / seedling" },
    image: "https://images.unsplash.com/photo-1526892523967-3e939630b835?w=900&q=80&auto=format",
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
    sweetness: "21 - 23° Brix",
    height: "2.6 - 3.0 m",
    price: { id: "Rp 12.500 / polybag", en: "$0.80 / seedling" },
    image: "https://images.unsplash.com/photo-1668762924684-a9753a0a887c?w=900&q=80&auto=format",
    status: { id: "Tersedia Siap Tanam", en: "Ready to Plant" },
    bestFor: { id: "Kebun komersial & konsumsi harian keluarga", en: "Commercial orchards & everyday household supply" },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: { id: "Seleksi Indukan & Kultur Jaringan", en: "Mother Plant Selection & In-Vitro" },
    tagline: { id: "Genetika Murni & Steril", en: "Pure & Sterile Genetics" },
    desc: {
      id: "Kami hanya mengambil eksplan meristem pucuk dari indukan pohon pisang terbaik yang terbukti bebas penyakit fusarium, layu darah, dan virus kerdil.",
      en: "We isolate shoot apical meristems from certified elite mother trees with zero presence of fusarium wilt, blood disease, or bunchy top virus.",
    },
    duration: { id: "Bulan 1 - 3 di Laboratorium", en: "Month 1 - 3 (In-Vitro Lab)" },
    highlight: { id: "Sterilisasi 99.8%", en: "99.8% Sterile Guarantee" },
    icon: "biotech",
  },
  {
    step: "02",
    title: { id: "Aklimatisasi di Greenhouse", en: "Greenhouse Acclimatization" },
    tagline: { id: "Penguatan Akar & Batang", en: "Root & Foliar Hardening" },
    desc: {
      id: "Plantlet mini dipindahkan ke media tanam steril khusus dengan pengabutan mikro dan kontrol intensitas cahaya bertahap agar daun baru beradaptasi kuat.",
      en: "Micro-plantlets transition into sterile organic potting media under micro-misting and controlled UV spectrums to fortify leaf cuticles.",
    },
    duration: { id: "4 - 6 Minggu di Shading House", en: "4 - 6 Weeks (Shadehouse)" },
    highlight: { id: "Survival Rate 97%", en: "97% Field Survival Rate" },
    icon: "energy_savings_leaf",
  },
  {
    step: "03",
    title: { id: "Pembesaran Polybag & Nutrisi Organik", en: "Nursery Potting & Bio-Nutrition" },
    tagline: { id: "Kaya Mikoriza & Trichoderma", en: "Enriched with Mycorrhizae" },
    desc: {
      id: "Bibit dirawat di polybag ukuran 15x20 cm dengan media kompos matang, cocopeat, dan inokulasi jamur hayati Trichoderma untuk perlindungan akar alami.",
      en: "Transplanted into 15x20 cm polybags with mature compost, aerated cocopeat, and beneficial Trichoderma to insulate root systems against pathogens.",
    },
    duration: { id: "1.5 - 2 Bulan di Bedengan Terbuka", en: "1.5 - 2 Months (Open Nursery)" },
    highlight: { id: "Tinggi 30-45 cm Siap Tanam", en: "30-45 cm Field-Ready Height" },
    icon: "potted_plant",
  },
  {
    step: "04",
    title: { id: "Grading Ketat & Pengiriman Bergaransi", en: "Strict Grading & Insured Delivery" },
    tagline: { id: "Garansi Hidup Sampai Kebun", en: "Safe Arrival Guarantee" },
    desc: {
      id: "Setiap polybag bibit diperiksa manual (jumlah daun, vigor batang, akar putih aktif). Dikemas peti kayu aman untuk kirim se-Jawa, Bali, & luar pulau.",
      en: "Every seedling undergoes manual inspection (leaf count, stem girth, active white roots). Safely crated for road and inter-island shipping across Indonesia.",
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
      id: "Mengapa pemakaian bibit kultur jaringan bersertifikat dan desinfeksi parang potong adalah benteng utama petani dari kerugian gagal panen total.",
      en: "Why disease-free tissue culture seedlings and pruning tool sterilization remain a grower's strongest defense against sudden total crop failure.",
    },
    image: "https://images.unsplash.com/photo-1552901633-210088e17486?w=800&q=80&auto=format",
    author: "Ir. Larasati Putri (Laboratorium Biotek)",
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
      id: "Ambil 4.000 bibit Cavendish kultur jaringan dari nursery Turia Farm di Batuaji Kediri, pertumbuhan seragam sekali. Daun lebar hijau pekat dan alhamdulillah zero kematian saat pindah tanam.",
      en: "Ordered 4,000 tissue culture Cavendish seedlings from Turia Farm in Batuaji Kediri. The growth uniformity is incredible — dark green lush foliage with zero transplant loss.",
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
      id: "Apa keunggulan bibit kultur jaringan dibanding anakan bonggol biasa?",
      en: "Why choose tissue culture seedlings over traditional rhizome suckers?",
    },
    a: {
      id: "Kultur jaringan dihasilkan di laboratorium steril sehingga bebas dari virus bawaan & jamur fusarium, memiliki keseragaman pertumbuhan panen hingga 95%, dan masa berbuah relatif lebih cepat dan serempak dibanding anakan cabutan liar.",
      en: "Tissue culture seedlings are propagated in sterile laboratories, ensuring 100% freedom from seed-borne pathogens, achieving 95% crop growth uniformity, and maturing in synchronized harvest windows.",
    },
  },
];
