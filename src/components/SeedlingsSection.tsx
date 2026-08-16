"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { SEEDLINGS, SITE_CONFIG } from "../data/seedlings";
import { SeedlingItem } from "../types";
import { ArrowUpRight, Check, Sparkles, Scale, Clock, Ruler } from "lucide-react";
import Image from "next/image";

export const SeedlingsSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<SeedlingItem | null>(null);

  const getWaLinkForSeedling = (item: SeedlingItem) => {
    const text =
      lang === "id"
        ? `Halo Turia Farm, saya berminat memesan bibit *${item.name.id}* (${item.price.id}). Mohon info ketersediaan stok & estimasi ongkir.`
        : `Hello Turia Farm, I am interested in ordering *${item.name.en}* banana seedlings. Please provide stock availability & shipping info.`;
    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="seedlings" className="py-24 sm:py-32 bg-[#faf9f3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e3e3dd] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
              <Sparkles size={13} className="text-[#2d6953]" />
              <span>{t("seedlings.eyebrow")}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight leading-tight">
              {t("seedlings.title")}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#414845] max-w-md font-normal">
            {t("seedlings.desc")}
          </p>
        </div>

        {/* Seedlings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SEEDLINGS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-3xl bg-white border border-[#c1c8c4]/40 hover:border-[#2d6953]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/11] w-full bg-[#efeee8] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#00251d]/85 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
                    {item.status[lang]}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md text-[#00251d] text-xs font-bold shadow-md">
                    {item.price[lang]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-semibold tracking-wider uppercase text-[#2d6953] mb-1">
                    {item.tag[lang]}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#00251d] mb-1">
                    {item.name[lang]}
                  </h3>
                  <div className="text-xs italic text-[#717975] mb-4">
                    {item.scientificName}
                  </div>
                  <p className="text-xs sm:text-sm text-[#414845] leading-relaxed mb-6">
                    {item.desc[lang]}
                  </p>

                  {/* Spec Chips */}
                  <div className="grid grid-cols-2 gap-2.5 py-4 border-y border-[#efeee8] text-xs text-[#1b1c19] mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#2d6953]" />
                      <span>{item.maturity[lang]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Scale size={14} className="text-[#2d6953]" />
                      <span>{item.bunchWeight[lang]}</span>
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
                    <span>{t("seedlings.btnOrder")}</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="py-3 px-4 rounded-full border border-[#c1c8c4] hover:border-[#00251d] text-[#00251d] text-xs font-medium transition-colors hover:bg-[#f5f4ee]"
                  >
                    {lang === "id" ? "Info Detail" : "View Details"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Detail */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#faf9f3] max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-[#c1c8c4] shadow-2xl relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#efeee8] hover:bg-[#e3e3dd] text-[#00251d] flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="text-xs font-bold uppercase tracking-wider text-[#2d6953] mb-1">
                {selectedItem.tag[lang]}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#00251d] mb-1">
                {selectedItem.name[lang]}
              </h3>
              <div className="text-xs italic text-[#717975] mb-4">
                {selectedItem.scientificName}
              </div>

              <p className="text-sm text-[#414845] leading-relaxed mb-6">
                {selectedItem.desc[lang]}
              </p>

              <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#efeee8] mb-6 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">{t("seedlings.detailMaturity")}:</span>
                  <span className="font-semibold text-[#00251d]">{selectedItem.maturity[lang]}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">{t("seedlings.detailWeight")}:</span>
                  <span className="font-semibold text-[#00251d]">{selectedItem.bunchWeight[lang]}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">{t("seedlings.detailSweetness")}:</span>
                  <span className="font-semibold text-[#00251d]">{selectedItem.sweetness}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">{t("seedlings.detailHeight")}:</span>
                  <span className="font-semibold text-[#00251d]">{selectedItem.height}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#f5f4ee]">
                  <span className="text-[#717975]">{lang === "id" ? "Rekomendasi Lahan" : "Best For"}:</span>
                  <span className="font-semibold text-[#2d6953]">{selectedItem.bestFor[lang]}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#717975]">{lang === "id" ? "Harga Eceran / Partai" : "Pricing"}:</span>
                  <span className="font-bold text-[#00251d]">{selectedItem.price[lang]}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={getWaLinkForSeedling(selectedItem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-sm font-semibold text-center shadow-md flex items-center justify-center gap-2"
                >
                  <span>{lang === "id" ? "Konsultasi & Pesan Bibit Ini" : "Order This Variety"}</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
