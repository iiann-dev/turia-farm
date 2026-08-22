"use client";

import React, { useState } from "react";
import { Animated } from "./Animated";
import { ARTICLES, FAQS } from "../data/seedlings";
import { ArticleItem } from "../types";
import { BookOpen, HelpCircle, ArrowUpRight, ChevronDown, Calendar, Clock } from "lucide-react";
import Image from "next/image";

export const JournalAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [readingArticle, setReadingArticle] = useState<ArticleItem | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="journal" className="py-24 sm:py-32 bg-[#faf9f3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header: Agronomy Guides */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c4ebde] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
              <BookOpen size={13} className="text-[#2d6953]" />
              <span>Edukasi & Riset Tani</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight">
              Panduan & Tips Budidaya Terkini
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#414845] max-w-md font-normal">
            Artikel praktis berbasis riset lapang dari tim agronomis Turia Farm untuk membantu keberhasilan panen Anda.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {ARTICLES.map((article, idx) => (
            <Animated
              as="article"
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#faf9f3] border border-[#c1c8c4]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] relative w-full bg-[#dbdad4] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#00251d]/90 text-white text-[11px] font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#717975] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#00251d] mb-3 group-hover:text-[#2d6953] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#414845] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setReadingArticle(article)}
                  className="w-full flex items-center justify-between py-2.5 px-4 rounded-full bg-white border border-[#c1c8c4] text-xs font-semibold text-[#00251d] hover:bg-[#00251d] hover:text-white transition-all shadow-xs"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </Animated>
          ))}
        </div>

        {/* Modal Full Article Reader */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#faf9f3] max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-[#c1c8c4] shadow-2xl relative">
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#efeee8] hover:bg-[#e3e3dd] text-[#00251d] flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="text-xs font-bold uppercase tracking-wider text-[#2d6953] mb-2">
                {readingArticle.category} • {readingArticle.readTime}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#00251d] mb-4">
                {readingArticle.title}
              </h3>
              <div className="text-xs text-[#717975] mb-6">
                {readingArticle.date} • Penulis: {readingArticle.author}
              </div>

              <div className="space-y-4 text-sm text-[#414845] leading-relaxed">
                <p className="font-medium text-base text-[#1b1c19]">
                  {readingArticle.excerpt}
                </p>
                <p>
                  Budidaya pisang intensif memerlukan pendekatan terencana mulai dari persiapan olah tanah, pembuatan bedengan dengan saluran drainase yang lancar (pisang tidak menyukai tanah tergenang air), hingga sanitasi anakan rutin (1 pohon induk cukup pelihara 1 anakan penerus).
                </p>
                <p>
                  Pemberian nutrisi mikro dan inokulasi hayati seperti jamur Trichoderma harzianum pada awal tanam terbukti menekan insiden penyakit layu hingga di bawah 1%. Gunakan mulsa jerami atau daun pisang kering di sekitar piringan pohon untuk menjaga kelembapan mikro tanah saat kemarau.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#c1c8c4]/50 flex justify-end">
                <button
                  onClick={() => setReadingArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-[#00251d] text-white text-xs font-semibold"
                >
                  Tutup Bacaan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto pt-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4ebde] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-3">
              <HelpCircle size={13} className="text-[#2d6953]" />
              <span>FAQ • Pertanyaan Umum</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#00251d]">
              Pertanyaan Seputar Pemesanan & Pengiriman
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[#faf9f3] border border-[#c1c8c4]/60 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-[#f5f4ee]"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#00251d] pr-4">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-[#efeee8] flex items-center justify-center text-[#00251d] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 bg-[#00251d] text-white" : ""
                      }`}
                    >
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[#414845] leading-relaxed border-t border-[#efeee8]">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
