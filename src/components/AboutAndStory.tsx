"use client";

import React from "react";
import { Animated } from "./Animated";
import { useLanguage } from "../context/LanguageContext";
import { TESTIMONIALS, SITE_CONFIG } from "../data/seedlings";
import { Users, HeartHandshake, ShieldAlert, Star, Quote } from "lucide-react";
import Image from "next/image";

export const AboutAndStory: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#faf9f3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Visual Collage */}
          <Animated
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-[36px] overflow-hidden border-4 border-white shadow-2xl bg-[#efeee8] aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1762512216868-3e7dae3beee5?w=900&q=80&auto=format"
                alt="Turia Farm Team & Farmers"
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-8 -right-4 sm:-bottom-8 sm:-right-8 p-6 rounded-3xl bg-[#00251d] text-white shadow-2xl border-4 border-white max-w-xs">
              <div className="font-serif text-2xl font-bold text-[#c4ebde] mb-1">
                2.8 Hektar
              </div>
              <div className="text-xs text-[#faf9f3]/90 leading-snug">
                {lang === "id"
                  ? "Kapasitas 60.000 polybag bibit aklimatisasi per siklus tanam."
                  : "60,000 active acclimated seedlings per planting cycle."}
              </div>
            </div>
          </Animated>

          {/* Editorial Story */}
          <Animated
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeee8] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
              <Users size={13} className="text-[#2d6953]" />
              <span>{t("about.eyebrow")}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight mb-6 leading-tight">
              {t("about.title")}
            </h2>
            <div className="space-y-4 text-[#414845] text-sm sm:text-base leading-relaxed mb-8">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#f5f4ee] border border-[#c1c8c4]/40">
                <div className="font-serif font-bold text-[#00251d] text-base mb-1">
                  {lang === "id" ? "Bukan Bibit Cabutan" : "Zero Wild Suckers"}
                </div>
                <div className="text-xs text-[#414845]">
                  {lang === "id"
                    ? "Genetika murni klon unggul dengan riwayat pohon induk tercatat jelas."
                    : "Pure single-clone genetics with verified mother tree lineage."}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#f5f4ee] border border-[#c1c8c4]/40">
                <div className="font-serif font-bold text-[#00251d] text-base mb-1">
                  {lang === "id" ? "Bimbingan Sampai Panen" : "Lifecycle Agronomy"}
                </div>
                <div className="text-xs text-[#414845]">
                  {lang === "id"
                    ? "Konsultasi gratis pupuk & hama langsung via WhatsApp agronomis kami."
                    : "Free guidance on organic fertilizer & pest management via WhatsApp."}
                </div>
              </div>
            </div>
          </Animated>
        </div>

        {/* Testimonials Block */}
        <div className="mt-20 pt-16 border-t border-[#efeee8]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeee8] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-3">
              <HeartHandshake size={13} className="text-[#2d6953]" />
              <span>{t("testi.eyebrow")}</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#00251d]">
              {t("testi.title")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testi, idx) => (
              <Animated
                key={testi.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl bg-white p-7 border border-[#c1c8c4]/40 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#414845] leading-relaxed italic mb-6">
                    &ldquo;{testi.quote[lang]}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f5f4ee]">
                  <div className="font-serif font-bold text-[#00251d] text-base">
                    {testi.name}
                  </div>
                  <div className="text-xs text-[#2d6953] font-medium">
                    {testi.role[lang]}
                  </div>
                  <div className="text-[11px] text-[#717975] mt-0.5">
                    {testi.location} • {testi.farmSize}
                  </div>
                </div>
              </Animated>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
