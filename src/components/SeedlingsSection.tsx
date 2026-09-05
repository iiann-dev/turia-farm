"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Animated } from "./Animated";
import { SEEDLINGS } from "../data/seedlings";
import { SeedlingItem } from "../types";
import { ArrowUpRight, Sparkles, Scale, Clock, Ruler, Search, X } from "lucide-react";
import Image from "next/image";
import { urlFor, getSlug } from "@/lib/sanity";

interface SeedlingsSectionProps {
  cmsSeedlings?: any[];
  cmsCatalogHero?: {
    eyebrowPill?: string;
    headline?: string;
    subtext?: string;
    heroImage?: any;
  };
}

export const SeedlingsSection: React.FC<SeedlingsSectionProps> = ({
  cmsSeedlings,
  cmsCatalogHero,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Use CMS data with static fallbacks
  const allSeedlings =
    cmsSeedlings && cmsSeedlings.length > 0 ? cmsSeedlings : SEEDLINGS;

  const filteredSeedlings = allSeedlings.filter((item) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.scientificName?.toLowerCase().includes(searchLower) ||
      item.desc?.toLowerCase().includes(searchLower)
    );
  });

  const getWaLinkForSeedling = (item: any) => {
    const text = `Halo Turia Farm, saya berminat memesan bibit *${item.name}* (${item.price}). Mohon info ketersediaan stok & estimasi ongkir.`;
    return `https://wa.me/6289508495717?text=${encodeURIComponent(text)}`;
  };

  // Hero content with CMS fallback
  const eyebrowPill = cmsCatalogHero?.eyebrowPill || "Katalog Bibit";
  const headline = cmsCatalogHero?.headline || "Bibit Pisang & Sengon Pilihan Siap Tanam";
  const subtext =
    cmsCatalogHero?.subtext ||
    "Semua bibit dirawat langsung di kebun pembibitan Batuaji Kediri, berakar sehat aktif dalam polybag organik siap tanam.";

  return (
    <section id="seedlings" className="py-24 sm:py-32 bg-[#faf9f3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e3e3dd] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
              <Sparkles size={13} className="text-[#2d6953]" />
              <span>{eyebrowPill}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight leading-tight">
              {headline}
            </h1>
          </div>
          <p className="text-sm sm:text-base text-[#414845] max-w-md font-normal">
            {subtext}
          </p>
        </div>

        {/* Smart Search */}
        <div className="flex justify-center md:justify-start mb-12">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#00251d]/40" />
            </div>
            <input
              type="text"
              placeholder="Cari varietas bibit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-11 py-2 bg-white border border-[#c1c8c4]/40 rounded-full shadow-[0_4px_12px_rgba(0,37,29,0.08)] focus:outline-none focus:border-[#2d6953]/50 transition-all duration-300 placeholder:text-[#00251d]/40 text-sm text-[#00251d]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#00251d]/40 hover:text-[#00251d]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Seedlings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filteredSeedlings.map((item, index) => {
              const imageSrc = (item as any).image?.asset
                ? urlFor((item as any).image).width(900).quality(80).url()
                : (item as any).image ||
                  "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=900&q=80&auto=format";

              return (
                <motion.div
                  key={(item as any).id?.current || item.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group rounded-3xl bg-white border border-[#c1c8c4]/40 hover:border-[#c1c8c4]/60 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-[#efeee8] overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#00251d]/85 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
                        {item.status}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md text-[#00251d] text-xs font-bold shadow-md">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold tracking-wider uppercase text-[#2d6953] mb-1">
                        {item.tag}
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#00251d] mb-1">
                        {item.name}
                      </h3>
                      <div className="text-xs italic text-[#717975] mb-4">
                        {item.scientificName}
                      </div>
                      <p className="text-xs sm:text-sm text-[#414845] leading-relaxed mb-4 sm:mb-6 hidden sm:block">
                        {item.desc}
                      </p>

                      {/* Spec Chips */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 py-4 border-y border-[#efeee8] text-xs text-[#1b1c19] mb-4 sm:mb-6">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-[#2d6953]" />
                          <span>{item.maturity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Scale size={14} className="text-[#2d6953]" />
                          <span>{item.bunchWeight}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles size={14} className="text-[#2d6953]" />
                          <span>{item.sweetness}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler size={14} className="text-[#2d6953]" />
                          <span>{item.height}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Action */}
                    <div className="flex items-center gap-3 pt-2 mt-auto">
                      <a
                        href={getWaLinkForSeedling(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md"
                      >
                        <span>Pesan via WA</span>
                        <ArrowUpRight size={14} />
                      </a>
                      <Link
                        href={`/bibit-pisang/${getSlug(item)}`}
                        className="py-3 px-4 rounded-full border border-[#c1c8c4] hover:border-[#00251d] text-[#00251d] text-xs font-medium transition-colors hover:bg-[#f5f4ee] inline-flex items-center justify-center gap-1.5"
                      >
                        Info Detail
                        <ArrowUpRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filteredSeedlings.length === 0 && (
            <div className="col-span-full py-12 text-center text-[#414845]">
              <p>Tidak ada bibit yang ditemukan untuk pencarian "{searchQuery}".</p>
            </div>
          )}
        </div>

        {/* Modal Detail removed — detail now opens at /bibit-pisang/[slug] */}
      </div>
    </section>
  );
};