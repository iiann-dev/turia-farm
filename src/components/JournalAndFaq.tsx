"use client";

import React, { useState } from "react";
import { Animated } from "./Animated";
import { ARTICLES, FAQS } from "../data/seedlings";
import { ArticleItem } from "../types";
import { BookOpen, HelpCircle, ArrowUpRight, ChevronDown, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor, getSlug } from "@/lib/sanity";

interface JournalAndFaqProps {
  cmsGuidePage?: any;
}

export const JournalAndFaq: React.FC<JournalAndFaqProps> = ({
  cmsGuidePage,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Use CMS data with static fallbacks
  const sectionHeader = cmsGuidePage?.sectionHeader;
  const articles = cmsGuidePage?.articles?.length > 0 ? cmsGuidePage.articles : ARTICLES;
  const faqSection = cmsGuidePage?.faqSection;
  const faqs = faqSection?.faqs?.length > 0 ? faqSection.faqs : FAQS;

  return (
    <section id="journal" className="py-24 sm:py-32 bg-[#faf9f3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header: Agronomy Guides */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c4ebde] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
              <BookOpen size={13} className="text-[#2d6953]" />
              <span>{sectionHeader?.eyebrowPill || "Edukasi & Riset Tani"}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight">
              {sectionHeader?.headline || "Panduan & Tips Budidaya Terkini"}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#414845] max-w-md font-normal">
            {sectionHeader?.subtext || "Artikel praktis berbasis riset lapang dari tim agronomis Turia Farm untuk membantu keberhasilan panen Anda."}
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {articles.map((article: any, idx: number) => {
            const articleId = article.id?.current || article.id || `article-${idx}`;
            const imageSrc = article.image?.asset
              ? urlFor(article.image).width(800).quality(80).url()
              : article.coverImage?.asset
                ? urlFor(article.coverImage).width(800).quality(80).url()
                : article.image || "https://images.unsplash.com/photo-1620036924477-c3d6e9ce36fc?w=800&q=80&auto=format";

            return (
              <Animated
                as="article"
                key={articleId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-3xl bg-[#faf9f3] border border-[#c1c8c4]/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] relative w-full bg-[#dbdad4] overflow-hidden">
                    <Image
                      src={imageSrc}
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
                  <Link
                    href={`/panduan-tani/${articleId}`}
                    className="w-full flex items-center justify-between py-2.5 px-4 rounded-full bg-white border border-[#c1c8c4] text-xs font-semibold text-[#00251d] hover:bg-[#00251d] hover:text-white transition-all shadow-xs"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </Animated>
            );
          })}
        </div>

        {/* Article modal removed — full article now at /panduan-tani/[slug] */}

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto pt-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4ebde] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-3">
              <HelpCircle size={13} className="text-[#2d6953]" />
              <span>{faqSection?.eyebrowPill || "FAQ • Pertanyaan Umum"}</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#00251d]">
              {faqSection?.headline || "Pertanyaan Seputar Pemesanan & Pengiriman"}
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq: any, index: number) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq._key || faq.question || index}
                  className="rounded-2xl bg-[#faf9f3] border border-[#c1c8c4]/60 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-[#f5f4ee]"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#00251d] pr-4">
                      {faq.question || faq.q}
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
                        {faq.answer || faq.a}
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
