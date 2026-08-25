"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Animated } from "./Animated";
import { SEEDLINGS, SEARCH_ALIASES } from "../data/seedlings";
import { SeedlingItem } from "../types";
import { ArrowUpRight, Sparkles, Scale, Clock, Ruler, SearchX } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { CatalogSearch, type CatalogCategory } from "./CatalogSearch";

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
  const [selectedItem, setSelectedItem] = useState<SeedlingItem | null>(null);

  // Smart search state (Concept A + B)
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CatalogCategory>("all");

  // Use CMS data with static fallbacks
  const allSeedlings =
    cmsSeedlings && cmsSeedlings.length > 0 ? cmsSeedlings : SEEDLINGS;

  // --- Smart filtering + relevance scoring (Concept A + B) ---
  const getId = (item: any) =>
    typeof item.id === "object" && item.id?.current
      ? item.id.current
      : item.id;

  const filteredSeedlings = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matchesCategory = (item: any) => {
      if (category === "all") return true;
      const id = getId(item);
      const isSengon =
        id?.startsWith("sengon") ||
        /sengon|falcataria|paraserianthes/i.test(
          `${item.name} ${item.scientificName}`
        );
      return category === "sengon" ? isSengon : !isSengon;
    };

    const score = (item: any): number => {
      if (!q) return 0;
      const id = getId(item);
      const haystack = [
        item.name,
        item.scientificName,
        item.tag,
        item.desc,
        item.bestFor,
        ...(SEARCH_ALIASES[id] || []),
      ]
        .join(" ")
        .toLowerCase();

      let s = 0;
      if (haystack.includes(q)) s += 1;
      // Exact name match ranks highest
      if (item.name?.toLowerCase().includes(q)) s += 3;
      // Alias hit (intent search) gets a solid bump
      if ((SEARCH_ALIASES[id] || []).some((a: string) => a.includes(q))) s += 2;
      return s;
    };

    let list = allSeedlings;
    if (category !== "all") {
      list = list.filter(matchesCategory);
    }
    if (q) {
      list = list
        .map((item) => ({ item, s: score(item) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((x) => x.item);
    }
    return list;
  }, [query, category, allSeedlings]);

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
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight leading-tight">
              {headline}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#414845] max-w-md font-normal">
            {subtext}
          </p>
        </div>

        {/* Smart Search (Concept A + B) */}
        <CatalogSearch
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          total={allSeedlings.length}
          resultCount={filteredSeedlings.length}
        />

        {/* Seedlings Grid */}
        {filteredSeedlings.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#efeee8] text-[#2d6953]">
              <SearchX size={28} />
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-[#00251d]">
                Bibit tidak ditemukan
              </p>
              <p className="mt-1 text-sm text-[#717975]">
                Coba kata kunci lain atau pilih kategori lain.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="rounded-full bg-[#00251d] px-5 py-2.5 text-xs font-semibold text-[#faf9f3] transition-colors hover:bg-[#173b32]"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="group rounded-3xl bg-white border border-[#c1c8c4]/40 hover:border-[#2d6953]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/11] w-full bg-[#efeee8] overflow-hidden">
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
                  <div className="p-6 flex-1 flex flex-col justify-between">
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
                      <p className="text-xs sm:text-sm text-[#414845] leading-relaxed mb-6">
                        {item.desc}
                      </p>

                      {/* Spec Chips */}
                      <div className="grid grid-cols-2 gap-2.5 py-4 border-y border-[#efeee8] text-xs text-[#1b1c19] mb-6">
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
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={getWaLinkForSeedling(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md"
                      >
                        <span>Pesan via WA</span>
                        <ArrowUpRight size={14} />
                      </a>
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="py-3 px-4 rounded-full border border-[#c1c8c4] hover:border-[#00251d] text-[#00251d] text-xs font-medium transition-colors hover:bg-[#f5f4ee]"
                      >
                        Info Detail
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          </div>
        )}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#faf9f3] max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-[#c1c8c4] shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#efeee8] hover:bg-[#e3e3dd] text-[#00251d] flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="text-xs font-bold uppercase tracking-wider text-[#2d6953] mb-1">
                {selectedItem.tag}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#00251d] mb-1">
                {selectedItem.name}
              </h3>
              <div className="text-xs italic text-[#717975] mb-4">
                {selectedItem.scientificName}
              </div>

              <p className="text-sm text-[#414845] leading-relaxed mb-6">
                {selectedItem.desc}
              </p>

              <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#efeee8] mb-6 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">Masa Panen:</span>
                  <span className="font-semibold text-[#00251d]">{selectedItem.maturity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">Berat Tandan:</span>
                  <span className="font-semibold text-[#00251d]">{selectedItem.bunchWeight}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">
                    {(typeof selectedItem.id === 'object' && selectedItem.id && 'current' in selectedItem.id && (selectedItem.id as any).current?.startsWith("sengon")) || (typeof selectedItem.id === 'string' && selectedItem.id.startsWith("sengon")) ? "Karakteristik" : "Kemanisan"}:
                  </span>
                  <span className="font-semibold text-[#00251d]">{selectedItem.sweetness}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">Tinggi Pohon:</span>
                  <span className="font-semibold text-[#00251d]">{selectedItem.height}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">Rekomendasi Lahan:</span>
                  <span className="font-semibold text-[#2d6953]">{selectedItem.bestFor}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#717975]">Harga Eceran / Partai:</span>
                  <span className="font-bold text-[#00251d]">{selectedItem.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={getWaLinkForSeedling(selectedItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-sm font-semibold text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>Konsultasi & Pesan Bibit Ini</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};