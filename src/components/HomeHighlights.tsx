"use client";

import React from "react";
import Link from "next/link";
import { Animated } from "./Animated";
import { SEEDLINGS, PROCESS_STEPS, ARTICLES } from "../data/seedlings";
import { ArrowRight, ArrowUpRight, Sparkles, ShieldCheck, BookOpen, ChevronRight } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface HomeHighlightsProps {
  cmsData?: any;
  featuredSeedlings?: any[];
  featuredArticle?: any;
  processSteps?: any[];
}

export const HomeHighlights: React.FC<HomeHighlightsProps> = ({
  cmsData,
  featuredSeedlings: cmsFeaturedSeedlings,
  featuredArticle: cmsFeaturedArticle,
  processSteps: cmsProcessSteps,
}) => {
  // Use CMS data with static fallbacks
  const featuredSeedlings =
    cmsFeaturedSeedlings && cmsFeaturedSeedlings.length > 0
      ? cmsFeaturedSeedlings.slice(0, 3)
      : SEEDLINGS.slice(0, 3);

  const featuredArticle = cmsFeaturedArticle || ARTICLES[0];
  const processSteps =
    cmsProcessSteps && cmsProcessSteps.length > 0 ? cmsProcessSteps : PROCESS_STEPS;

  const processTeaser = cmsData?.processTeaser || {
    eyebrow: "Pembibitan Kebun Autentik",
    title: "4 Tahap Pemuliaan Tanpa Kompromi",
    ctaText: "Pelajari Proses Kultur Lengkap",
    ctaHref: "/proses-kultur",
  };

  const knowledgeSpotlight = cmsData?.knowledgeSpotlight || {
    eyebrow: "Edukasi Petani",
    title: "Panduan Praktis Kebun Pisang",
    ctaText: "Lihat Semua Panduan & FAQ",
    ctaHref: "/panduan-tani",
  };

  return (
    <div className="space-y-24 sm:space-y-32 py-12">
      {/* 1. Featured Seedlings Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e3e3dd] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-3">
              <Sparkles size={13} className="text-[#2d6953]" />
              <span>Varietas Terpopuler</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#00251d]">
              Bibit Pisang & Sengon Siap Tanam
            </h2>
          </div>
          <Link
            href="/bibit-pisang"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d6953] hover:text-[#00251d] transition-colors group"
          >
            <span>Lihat Semua Varietas & Harga</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredSeedlings.map((item, idx) => {
            const imageSrc = item.image?.asset
              ? urlFor(item.image).width(900).quality(80).url()
              : item.image || "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=900&q=80&auto=format";

            return (
              <Animated
                key={item.id?.current || item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl bg-white border border-[#c1c8c4]/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/11] w-full bg-[#efeee8] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3">
                      <span className="px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md text-[#00251d] text-xs font-bold shadow-xs">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-[11px] font-semibold text-[#2d6953] uppercase tracking-wider mb-1">
                      {item.tag}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#00251d] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#414845] leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href="/bibit-pisang"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-xs font-semibold tracking-wide transition-all shadow-xs"
                  >
                    <span>Spesifikasi & Pesan</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </Animated>
            );
          })}
        </div>
      </section>

      {/* 2. Process Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-[36px] bg-[#efeee8] border border-[#c1c8c4]/60 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4ebde] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
              <ShieldCheck size={13} className="text-[#2d6953]" />
              <span>{processTeaser.eyebrow}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#00251d] mb-4">
              {processTeaser.title}
            </h3>
            <Link
              href={processTeaser.ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00251d] text-white text-xs sm:text-sm font-semibold hover:bg-[#173b32] transition-all shadow-sm"
            >
              <span>{processTeaser.ctaText}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {processSteps.map((step: any) => (
              <div
                key={step.step}
                className="p-4 rounded-2xl bg-[#faf9f3] border border-[#c1c8c4]/40"
              >
                <div className="font-serif font-bold text-lg text-[#2d6953] mb-1">
                  {step.step}
                </div>
                <div className="font-semibold text-xs text-[#00251d] leading-snug">
                  {step.title}
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
              <span>{knowledgeSpotlight.eyebrow}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#00251d]">
              {knowledgeSpotlight.title}
            </h2>
          </div>
          <Link
            href={knowledgeSpotlight.ctaHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2d6953] hover:text-[#00251d] transition-colors"
          >
            <span>{knowledgeSpotlight.ctaText}</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="rounded-3xl bg-white border border-[#c1c8c4]/50 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 shadow-xs">
          <div className="relative aspect-[16/10] w-full md:w-1/3 rounded-2xl overflow-hidden bg-[#efeee8] shrink-0">
            <Image
              src={
                featuredArticle.image?.asset
                  ? urlFor(featuredArticle.image).width(800).quality(80).url()
                  : featuredArticle.image || "https://images.unsplash.com/photo-1620036924477-c3d6e9ce36fc?w=800&q=80&auto=format"
              }
              alt={featuredArticle.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <span className="px-3 py-1 rounded-full bg-[#c4ebde] text-[#00251d] text-[11px] font-semibold">
              {featuredArticle.category}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#00251d] mt-3 mb-2">
              {featuredArticle.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#414845] leading-relaxed mb-6 line-clamp-2">
              {featuredArticle.excerpt}
            </p>
            <Link
              href="/panduan-tani"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00251d] hover:text-[#2d6953] transition-colors"
            >
              <span>Baca Panduan Lengkap</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
