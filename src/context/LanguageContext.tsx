"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "../types";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.seedlings": "Bibit Pisang & Sengon",
    "nav.process": "Proses Kultur & Nursery",
    "nav.about": "Tentang Kami",
    "nav.journal": "Panduan Tani",
    "nav.contact": "Kontak & Lokasi",
    "nav.cta": "Konsultasi Bibit",
    "nav.openHours": "Buka Senin - Sabtu 07:30 - 16:30 WIB",

    // Hero
    "hero.eyebrow": "Pembibitan Pisang Unggul & Bibit Sengon",
    "hero.title1": "Bibit Pisang & Sengon Sehat,",
    "hero.title2": "Panen Berlimpah.",
    "hero.desc":
      "Pusat pembibitan bibit pisang unggul berbasis kultur jaringan & bibit sengon pilihan. Bebas virus, seragam, dan siap tanam untuk perkebunan mandiri maupun skala komersial.",
    "hero.ctaPrimary": "Pesan Bibit Sekarang",
    "hero.ctaSecondary": "Lihat Varietas & Harga",
    "hero.stat1.val": "98.4%",
    "hero.stat1.label": "Tingkat Hidup Lapangan",
    "hero.stat2.val": "150.000+",
    "hero.stat2.label": "Bibit Tersalurkan / Thn",
    "hero.stat3.val": "500+",
    "hero.stat3.label": "Petani & Kebun Mitra",

    // Seedlings Section
    "seedlings.eyebrow": "Katalog Bibit",
    "seedlings.title": "Bibit Pisang & Sengon Pilihan Siap Tanam",
    "seedlings.desc":
      "Semua bibit melalui proses aklimatisasi bertahap, berakar sehat aktif dengan media organik kaya trichoderma pelindung jamur.",
    "seedlings.filter.all": "Semua Varietas",
    "seedlings.btnOrder": "Pesan via WA",
    "seedlings.detailMaturity": "Masa Panen",
    "seedlings.detailWeight": "Berat Tandan",
    "seedlings.detailSweetness": "Kemanisan",
    "seedlings.detailHeight": "Tinggi Pohon",

    // Process Section
    "process.eyebrow": "Standar Mutu Bibit",
    "process.title": "4 Tahap Pemuliaan Tanpa Kompromi",
    "process.desc":
      "Dari tabung in-vitro steril hingga polybag siap kebun, setiap bibit melewati kontrol mutu biologis ketat.",

    // About Section
    "about.eyebrow": "Tentang Turia Farm",
    "about.title": "Dedikasi untuk Kesejahteraan Petani Indonesia",
    "about.p1":
      "Turia Farm berawal dari kebun pembibitan keluarga di Batuaji, Ringinrejo, Kediri yang prihatin atas maraknya wabah layu fusarium dan bibit cabutan yang tidak seragam di kalangan petani.",
    "about.p2":
      "Kini dengan fasilitas laboratorium kultur jaringan modern dan greenhouse aklimatisasi 2.8 hektar, kami membudidayakan bibit pisang unggul dan bibit sengon, mendampingi ratusan petani dari nol hingga panen raya yang menguntungkan.",
    "about.badge": "Garansi 100% Bebas Penyakit Bawaan",

    // Journal Section
    "journal.eyebrow": "Edukasi & Riset Tani",
    "journal.title": "Panduan & Tips Budidaya Terkini",
    "journal.readMore": "Baca Selengkapnya",

    // Testimonials
    "testi.eyebrow": "Pengalaman Mitra",
    "testi.title": "Apa Kata Petani & Pemilik Kebun",

    // Contact & Location
    "contact.eyebrow": "Kunjungi & Hubungi Kami",
    "contact.title": "Siap Memulai Kebun Pisang Produktif?",
    "contact.desc":
      "Konsultasikan kebutuhan varietas, estimasi modal kebun, hingga pengiriman armada truk langsung ke lahan Anda.",
    "contact.addressTitle": "Lokasi Nursery & Greenhouse",
    "contact.phoneTitle": "Layanan Konsultasi Tani",
    "contact.emailTitle": "Surat Elektronik",
    "contact.hoursTitle": "Jam Operasional Nursery",
    "contact.form.name": "Nama Lengkap / Kelompok Tani",
    "contact.form.phone": "Nomor WhatsApp",
    "contact.form.variety": "Varietas yang Diminati",
    "contact.form.qty": "Estimasi Kebutuhan Bibit (Pohon)",
    "contact.form.message": "Catatan / Lokasi Lahan Kebun",
    "contact.form.submit": "Kirim Pertanyaan via WhatsApp",

    // Footer
    "footer.tagline": "Modern agriculture rooted in nature. Menumbuhkan bibit unggul untuk masa depan pertanian Nusantara.",
    "footer.quickLinks": "Tautan Cepat",
    "footer.varieties": "Varietas Populer",
    "footer.rights": "Hak Cipta Dilindungi.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.seedlings": "Banana & Sengon",
    "nav.process": "Nursery Process",
    "nav.about": "About Us",
    "nav.journal": "Agri Journal",
    "nav.contact": "Contact & Location",
    "nav.cta": "Consult Agronomist",
    "nav.openHours": "Open Mon - Sat 07:30 AM - 04:30 PM",

    // Hero
    "hero.eyebrow": "Premium Banana Seedlings & Sengon Saplings",
    "hero.title1": "Healthier Roots,",
    "hero.title2": "Abundant Harvest.",
    "hero.desc":
      "Premier nursery combining sterile in-vitro tissue culture for bananas and vigorous sengon timber saplings. Pathogen-free, synchronized growth, ready for smallholders and commercial orchards.",
    "hero.ctaPrimary": "Order Seedlings",
    "hero.ctaSecondary": "Explore Varieties",
    "hero.stat1.val": "98.4%",
    "hero.stat1.label": "Field Survival Rate",
    "hero.stat2.val": "150,000+",
    "hero.stat2.label": "Seedlings Distributed / Yr",
    "hero.stat3.val": "500+",
    "hero.stat3.label": "Partner Farmers & Orchards",

    // Seedlings Section
    "seedlings.eyebrow": "Catalog",
    "seedlings.title": "Field-Ready Banana & Sengon Seedlings",
    "seedlings.desc":
      "All seedlings undergo gradual shade hardening, featuring robust white root systems fortified with organic Trichoderma fungi.",
    "seedlings.filter.all": "All Varieties",
    "seedlings.btnOrder": "Order via WA",
    "seedlings.detailMaturity": "Harvest Time",
    "seedlings.detailWeight": "Bunch Weight",
    "seedlings.detailSweetness": "Sweetness",
    "seedlings.detailHeight": "Tree Height",

    // Process Section
    "process.eyebrow": "Quality Standards",
    "process.title": "4 Uncompromising Propagation Steps",
    "process.desc":
      "From sterile in-vitro test tubes to fortified nursery polybags, every plant undergoes rigorous biological grading.",

    // About Section
    "about.eyebrow": "About Turia Farm",
    "about.title": "Empowering Sustainable Banana Farming Across Indonesia",
    "about.p1":
      "Turia Farm started as a local family nursery in Batuaji, Ringinrejo, Kediri, addressing the widespread losses caused by fusarium wilt and weak uncertified suckers.",
    "about.p2":
      "Today, with a modern in-vitro laboratory and 2.8 hectares of acclimatization greenhouses, we cultivate premium banana seedlings and sengon timber saplings, partnering with hundreds of growers from initial planting to lucrative harvests.",
    "about.badge": "100% Certified Pathogen-Free",

    // Journal Section
    "journal.eyebrow": "Agronomy Insights",
    "journal.title": "Latest Guides & Orchard Insights",
    "journal.readMore": "Read Full Guide",

    // Testimonials
    "testi.eyebrow": "Farmer Stories",
    "testi.title": "Trusted by Smallholders & Estate Managers",

    // Contact & Location
    "contact.eyebrow": "Visit & Connect",
    "contact.title": "Ready to Cultivate a High-Yield Orchard?",
    "contact.desc":
      "Consult on variety selection, orchard budgeting, and dedicated truck delivery directly to your farming plots.",
    "contact.addressTitle": "Nursery & Greenhouse Facility",
    "contact.phoneTitle": "Agronomy Helpline",
    "contact.emailTitle": "Direct Email",
    "contact.hoursTitle": "Nursery Visiting Hours",
    "contact.form.name": "Full Name / Farm Cooperative",
    "contact.form.phone": "WhatsApp Number",
    "contact.form.variety": "Interested Variety",
    "contact.form.qty": "Estimated Seedling Quantity (Plants)",
    "contact.form.message": "Notes / Farm Location",
    "contact.form.submit": "Inquire via WhatsApp",

    // Footer
    "footer.tagline": "Modern agriculture rooted in nature. Cultivating elite genetics for sustainable food sovereignty.",
    "footer.quickLinks": "Quick Links",
    "footer.varieties": "Popular Varieties",
    "footer.rights": "All Rights Reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("id");

  useEffect(() => {
    const saved = localStorage.getItem("turia_lang") as Language;
    if (saved === "id" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("turia_lang", newLang);
  };

  const toggleLang = () => {
    const next = lang === "id" ? "en" : "id";
    handleSetLang(next);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["id"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
