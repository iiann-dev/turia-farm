"use client";

import React from "react";
import Link from "next/link";
import { Animated } from "./Animated";
import { useLanguage } from "../context/LanguageContext";
import { SEEDLINGS, PROCESS_STEPS, ARTICLES, SITE_CONFIG } from "../data/seedlings";
import { ArrowRight, ArrowUpRight, Sparkles, ShieldCheck, BookOpen, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

export const HomeHighlights: React.FC = () => {
  const { lang, t } = useLanguage();

  // Top 3 featured varieties for concise homepage presentation
  const featuredSeedlings = SEEDLINGS.slice(0, 3);
  const featuredArticle = ARTICLES[0];

  return (
    <div className="space-y-24 sm:space-y-32 py-12">
      {/* 1. Featured Seedlings Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3e3dd] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-3">
              <Sparkles size={13} className="text-[#2d6953]" />
              <span>{lang === "id" ? "Varietas Terpopuler" : "Featured Varieties"}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#00251d]">
              {lang === "id" ? "Bibit Pisang & Sengon Siap Tanam" : "Field-Ready Banana & Sengon Seedlings"}
            </h2>
          </div>
          <Link
            href="/bibit-pisang"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d6953] hover:text-[#00251d] transition-colors group"
          >
            <span>{lang === "id" ? "Lihat Semua 8 Varietas & Harga" : "View All 8 Varieties & Prices"}</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredSeedlings.map((item, idx) => (
            <Animated
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-white border border-[#c1c8c4]/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/11] w-full bg-[#efeee8] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 right-3">
                    <span className="px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md text-[#00251d] text-xs font-bold shadow-xs">
                      {item.price[lang]}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[11px] font-semibold text-[#2d6953] uppercase tracking-wider mb-1">
                    {item.tag[lang]}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#00251d] mb-2">
                    {item.name[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#414845] leading-relaxed line-clamp-2">
                    {item.desc[lang]}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href="/bibit-pisang"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-xs font-semibold tracking-wide transition-all shadow-xs"
                >
                  <span>{lang === "id" ? "Spesifikasi & Pesan" : "Specs & Order"}</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </Animated>
          ))}
        </div>
      </section>

      {/* 2. Process Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-[36px] bg-[#efeee8] border border-[#c1c8c4]/60 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4ebde] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
              <ShieldCheck size={13} className="text-[#2d6953]" />
              <span>{lang === "id" ? "Pembibitan Kebun Autentik" : "Authentic Nursery Propagation"}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#00251d] mb-4">
              {lang === "id"
                ? "4 Tahap Pemuliaan Tanpa Kompromi"
                : "4 Uncompromising Quality Propagation Steps"}
            </h3>
            <p className="hidden">
              {/* Removed paragraph per request */}
            </p>
            <Link
              href="/proses-kultur"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00251d] text-white text-xs sm:text-sm font-semibold hover:bg-[#173b32] transition-all shadow-sm"
            >
              <span>{lang === "id" ? "Pelajari Proses Kultur Lengkap" : "Explore Full Process"}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-4 rounded-2xl bg-[#faf9f3] border border-[#c1c8c4]/40"
              >
                <div className="font-serif font-bold text-lg text-[#2d6953] mb-1">
                  {step.step}
                </div>
                <div className="font-semibold text-xs text-[#00251d] leading-snug">
                  {step.title[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Agronomy Knowledge Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeee8] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-3">
              <BookOpen size={13} className="text-[#2d6953]" />
              <span>{lang === "id" ? "Edukasi Petani" : "Farmer Education"}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#00251d]">
              {lang === "id" ? "Panduan Praktis Kebun Pisang" : "Practical Agronomy Guides"}
            </h2>
          </div>
          <Link
            href="/panduan-tani"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d6953] hover:text-[#00251d] transition-colors"
          >
            <span>{lang === "id" ? "Lihat Semua Panduan & FAQ" : "View All Guides & FAQs"}</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="rounded-3xl bg-white border border-[#c1c8c4]/50 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xs">
          <div className="relative aspect-[16/10] w-full md:w-1/3 rounded-2xl overflow-hidden bg-[#efeee8] shrink-0">
            <Image
              src={featuredArticle.image}
              alt={featuredArticle.title[lang]}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="px-3 py-1 rounded-full bg-[#c4ebde] text-[#00251d] text-[11px] font-semibold">
              {featuredArticle.category[lang]}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#00251d] mt-3 mb-2">
              {featuredArticle.title[lang]}
            </h3>
            <p className="text-xs sm:text-sm text-[#414845] leading-relaxed mb-6 line-clamp-2">
              {featuredArticle.excerpt[lang]}
            </p>
            <Link
              href="/panduan-tani"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00251d] hover:text-[#2d6953] transition-colors"
            >
              <span>{lang === "id" ? "Baca Panduan Lengkap" : "Read Full Article"}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
