"use client";

import React from "react";
import { Animated } from "./Animated";
import { PROCESS_STEPS, SITE_CONFIG } from "../data/seedlings";
import { ShieldCheck, ArrowRight, Dna, Sprout, SunMedium, Truck } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface ProcessSectionProps {
  cmsProcessPage?: any;
  cmsSiteConfig?: any;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  cmsProcessPage,
  cmsSiteConfig,
}) => {
  const processSteps = cmsProcessPage?.processSteps?.length > 0
    ? cmsProcessPage.processSteps
    : PROCESS_STEPS;

  const sectionHeader = cmsProcessPage?.sectionHeader;
  const nurseryCard = cmsProcessPage?.nurseryCard;

  const siteConfig = cmsSiteConfig || SITE_CONFIG;

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Dna className="text-[#00251d]" size={24} />;
      case 1:
        return <SunMedium className="text-[#00251d]" size={24} />;
      case 2:
        return <Sprout className="text-[#00251d]" size={24} />;
      case 3:
        return <Truck className="text-[#00251d]" size={24} />;
      default:
        return <ShieldCheck className="text-[#2d6953]" size={24} />;
    }
  };

  return (
    <section id="process" className="py-24 sm:py-32 bg-[#faf9f3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c4ebde] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
            <ShieldCheck size={13} className="text-[#2d6953]" />
            <span>{sectionHeader?.eyebrowPill || "Standar Mutu Bibit"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight mb-4">
            {sectionHeader?.headline || "4 Tahap Pembibitan Kebun Tradisional"}
          </h2>
          <p className="text-base sm:text-lg text-[#414845]">
            {sectionHeader?.subtext || "Dari pemisahan anakan pisang berkualitas & penyemaian biji sengon hingga pemeliharaan di polybag bedengan terbuka."}
          </p>
        </div>

        {/* 4-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((p: any, index: number) => (
            <Animated
              key={p.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="rounded-3xl bg-[#faf9f3] p-7 border border-[#c1c8c4]/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-bold text-[#2d6953]/50">
                    {p.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#b1f0d4] flex items-center justify-center shadow-xs">
                    {getStepIcon(index)}
                  </div>
                </div>

                <div className="text-[11px] font-bold uppercase tracking-wider text-[#2d6953] mb-1">
                  {p.tagline}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#00251d] mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#414845] leading-relaxed mb-6 font-normal">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#efeee8]">
                <div className="text-[11px] text-[#717975] mb-1">
                  {p.duration}
                </div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-[#e3e3dd] text-[#00251d] text-[11px] font-semibold">
                  {p.highlight}
                </div>
              </div>
            </Animated>
          ))}
        </div>

        {/* Nursery Field Verification Card */}
        <div className="mt-16 rounded-[36px] bg-[#00251d] text-[#faf9f3] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-20">
            <Image
              src={nurseryCard?.heroImage?.asset
                ? urlFor(nurseryCard.heroImage).width(800).quality(80).url()
                : "https://images.unsplash.com/photo-1643892343594-1e3be700217b?w=800&q=80&auto=format"}
              alt="Turia Farm Greenhouse"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-block px-3 py-1 rounded-full bg-[#173b32] text-[#c4ebde] text-xs font-semibold tracking-wider uppercase mb-4">
              {nurseryCard?.eyebrowPill || "Kunjungan & Edukasi Terbuka"}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal mb-4 text-[#faf9f3]">
              {nurseryCard?.headline || "Ingin melihat langsung kebun pembibitan & indukan kami?"}
            </h3>
            <p className="text-sm sm:text-base text-[#c1c8c4] max-w-2xl leading-relaxed mb-8 font-normal">
              {nurseryCard?.description || "Pintu kebun pembibitan Turia Farm di Batuaji, Ringinrejo selalu terbuka untuk petani individu, kelompok tani, maupun investor perkebunan yang ingin cek mutu bibit secara langsung."}
            </p>
            <a
              href={nurseryCard?.ctaLink || siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#b1f0d4] text-[#00251d] hover:bg-white text-sm font-semibold transition-all shadow-md"
            >
              <span>{nurseryCard?.ctaText || "Jadwalkan Kunjungan Kebun"}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
