"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Animated } from "./Animated";
import { SEEDLINGS } from "../data/seedlings";
import { SeedlingItem } from "../types";
import { ArrowUpRight, Sparkles, Scale, Clock, Ruler, Search, X } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface SeedlingsSectionProps {
  cmsSeedlings?: any[];
  cmsCatalogHero?: {
    eyebrowPill?: string;
    headline?: string;
    subtext?: string;
    heroImage?: any;
  };
}

// Smart search ranking function
interface SearchResult {
  item: SeedlingItem;
  score: number;
  tier: number;
}

const searchFields = [
  { key: "name", weight: 100 },
  { key: "tag", weight: 50 },
  { key: "scientificName", weight: 30 },
  { key: "bestFor", weight: 20 },
] as const;

function calculateSearchScore(item: SeedlingItem, query: string): SearchResult | null {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return { item, score: 0, tier: 0 };

  const keywords = normalizedQuery.split(/\s+/).filter(k => k.length > 0);
  let maxScore = 0;
  let bestTier = 4;

  for (const field of searchFields) {
    const fieldValue = (item as any)[field.key]?.toLowerCase() || "";
    if (!fieldValue) continue;

    // Tier 1: Exact phrase match in name
    if (field.key === "name" && fieldValue.includes(normalizedQuery)) {
      return { item, score: field.weight * 10, tier: 1 };
    }

    // Tier 2: All keywords present in name (order independent)
    if (field.key === "name") {
      const allKeywordsInName = keywords.every(kw => fieldValue.includes(kw));
      if (allKeywordsInName && keywords.length > 1) {
        return { item, score: field.weight * 5, tier: 2 };
      }
    }

    // Tier 3: Keywords in tag or scientificName
    if (field.key === "tag" || field.key === "scientificName") {
      const matches = keywords.filter(kw => fieldValue.includes(kw)).length;
      if (matches > 0) {
        const score = (matches / keywords.length) * field.weight;
        if (score > maxScore) {
          maxScore = score;
          bestTier = 3;
        }
      }
    }

    // Tier 4: Keywords in bestFor or desc
    if (field.key === "bestFor") {
      const matches = keywords.filter(kw => fieldValue.includes(kw)).length;
      if (matches > 0) {
        const score = (matches / keywords.length) * field.weight;
        if (score > maxScore) {
          maxScore = score;
          bestTier = 4;
        }
      }
    }
  }

  if (maxScore > 0) {
    return { item, score: maxScore, tier: bestTier };
  }

  return null;
}

function filterSeedlings(seedlings: SeedlingItem[], query: string): SeedlingItem[] {
  if (!query.trim()) return seedlings;

  const results: SearchResult[] = seedlings
    .map(item => calculateSearchScore(item, query))
    .filter((r): r is SearchResult => r !== null)
    .sort((a, b) => {
      // Sort by tier first (lower = better), then by score (higher = better)
      if (a.tier !== b.tier) return a.tier - b.tier;
      return b.score - a.score;
    });

  return results.map(r => r.item);
}

export const SeedlingsSection: React.FC<SeedlingsSectionProps> = ({
  cmsSeedlings,
  cmsCatalogHero,
}) => {
  const [selectedItem, setSelectedItem] = useState<SeedlingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNoResultsAnimation, setShowNoResultsAnimation] = useState(false);

  // Use CMS data with static fallbacks
  const allSeedlings =
    cmsSeedlings && cmsSeedlings.length > 0 ? cmsSeedlings : SEEDLINGS;

  // Filter seedlings based on search query
  const filteredSeedlings = filterSeedlings(allSeedlings, searchQuery);

  // Trigger shake animation when no results and query has value
  useEffect(() => {
    if (searchQuery.trim() && filteredSeedlings.length === 0) {
      setShowNoResultsAnimation(true);
      const timer = setTimeout(() => setShowNoResultsAnimation(false), 600);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, filteredSeedlings.length]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClearSearch();
      (e.target as HTMLInputElement).blur();
    }
  };

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

        {/* Search Input */}
        <div className="mb-10 max-w-xl mx-auto w-full">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717975] transition-colors duration-200"
              size={20}
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Cari varietas... (contoh: Cavendish, Raja Bulu, Sengon)"
              className={`
                w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border-2 transition-all duration-200
                text-[#00251d] placeholder:text-[#a8cfc2] text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-[#2d6953]
                ${showNoResultsAnimation ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-[#c1c8c4]/60 focus:border-[#2d6953]"}
              `}
              aria-label="Cari varietas bibit"
              aria-describedby={filteredSeedlings.length === 0 && searchQuery.trim() ? "search-result-message" : undefined}
              autoComplete="off"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717975] hover:text-[#00251d] transition-colors p-1 rounded-full hover:bg-[#efeee8]"
                  aria-label="Hapus pencarian"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Result count / Empty state message */}
          <AnimatePresence>
            {searchQuery.trim() && (
              <motion.p
                id="search-result-message"
                className={`mt-2 text-xs text-center transition-all duration-200 ${
                  filteredSeedlings.length === 0 ? "text-red-500" : "text-[#717975]"
                }`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                aria-live="polite"
              >
                {filteredSeedlings.length === 0 ? (
                  <>
                    Tidak ditemukan varietas untuk &ldquo;{searchQuery}&rdquo;.
                    <br />
                    <span className="font-medium">Coba: Cavendish, Raja, Kepok, Mas, Barangan, Sengon...</span>
                  </>
                ) : (
                  `Menampilkan ${filteredSeedlings.length} dari ${allSeedlings.length} varietas`
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Seedlings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredSeedlings.length === 0 && searchQuery.trim() ? (
              <motion.div
                key="no-results"
                className="col-span-full flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-200 animate-shake-pulse`}
                  style={{
                    animation: showNoResultsAnimation
                      ? "shakePulse 0.6s ease-in-out 2"
                      : "none",
                  }}
                >
                  <Sparkles size={48} className="text-red-400 mx-auto" />
                </div>
                <p className="text-lg text-[#414845] font-medium">
                  Tidak ada varietas yang cocok
                </p>
                <p className="text-sm text-[#717975] mt-1 max-w-sm text-center">
                  Coba kata kunci lain seperti &ldquo;Cavendish&rdquo;, &ldquo;Raja&rdquo;,
                  &ldquo;Kepok&rdquo;, atau &ldquo;Sengon&rdquo;
                </p>
              </motion.div>
            ) : (
              filteredSeedlings.map((item, index) => {
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
              })
            )}
          </AnimatePresence>
        </div>

        {/* Modal Detail */}
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

      {/* Global shake-pulse keyframes injected once */}
      <style jsx global>{`
        @keyframes shakePulse {
          0%, 100% { transform: translateX(0); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          10% { transform: translateX(-8px); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0.15); }
          20% { transform: translateX(8px); }
          30% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          50% { transform: translateX(-4px); box-shadow: 0 0 0 12px rgba(239, 68, 68, 0.1); }
          60% { transform: translateX(4px); }
          70% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          90% { transform: translateX(0); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        .animate-shake-pulse {
          animation: shakePulse 0.6s ease-in-out;
        }
      `}</style>
    </section>
  );
};
