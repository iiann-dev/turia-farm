"use client";

import React from "react";
import { Animated } from "./Animated";
import { StatCounter } from "./StatCounter";
import Link from "next/link";
import { SITE_CONFIG } from "../data/seedlings";
import { ArrowRight, CheckCircle2, Sprout, Award, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface HeroProps {
  cmsData?: {
    eyebrowPill?: string;
    headline?: string;
    highlightedText?: string;
    subtext?: string;
    ctaPrimary?: { text: string; href: string };
    ctaSecondary?: { text: string; href: string };
    assuranceBadges?: Array<{ _key: string; icon: string; text: string }>;
    heroImage?: any;
    heroBadge?: { title: string; subtitle: string; details: string };
    floatingStat?: { label: string; detail: string };
  };
  statsData?: {
    stats?: Array<{ _key: string; value: number; suffix: string; label: string }>;
  };
}

export const Hero: React.FC<HeroProps> = ({ cmsData, statsData }) => {
  // Use CMS data with hardcoded fallbacks
  const eyebrowPill = cmsData?.eyebrowPill || "Pembibitan Pisang & Sengon Unggul Kediri";
  const headline = cmsData?.headline || "Bibit Pisang & Sengon Sehat,\nPanen Berlimpah.";
  const highlightedText = cmsData?.highlightedText || "Panen Berlimpah.";
  const subtext = cmsData?.subtext || "Pusat pembibitan pisang dari anakan pilihan & bibit sengon dari biji berkualitas. Berakar sehat, vigor tinggi, dan siap tanam untuk perkebunan mandiri maupun skala komersial.";
  const ctaPrimary = cmsData?.ctaPrimary || {
    text: "Pesan Bibit Sekarang",
    href: SITE_CONFIG.whatsapp,
  };
  const ctaSecondary = cmsData?.ctaSecondary || {
    text: "Lihat Varietas & Harga",
    href: "/bibit-pisang",
  };
  const assuranceBadges = cmsData?.assuranceBadges || [
    { _key: "1", icon: "check", text: "Bebas Layu Fusarium" },
    { _key: "2", icon: "shield", text: "Garansi Hidup di Perjalanan" },
    { _key: "3", icon: "award", text: "Pendampingan SOP Tani" },
  ];
  const heroBadge = cmsData?.heroBadge || {
    title: "Siap Tanam Lapangan",
    subtitle: "Cavendish, Raja Bulu & Sengon Solomon",
    details: "Ketinggian 35-45 cm • Akar Aktif • Batuaji, Kediri",
  };
  const floatingStat = cmsData?.floatingStat || {
    label: "150.000+ Bibit / Thn",
    detail: "Kirim Se-Jawa, Bali & Luar Pulau",
  };
  const stats = statsData?.stats || [
    { _key: "1", value: 98.4, suffix: "%", label: "Tingkat Hidup Lapangan" },
    { _key: "2", value: 150, suffix: "K+", label: "Bibit Tersalurkan / Thn" },
    { _key: "3", value: 500, suffix: "+", label: "Petani & Kebun Mitra" },
    { _key: "4", value: 2.8, suffix: " Ha", label: "Nursery di Batuaji" },
  ];

  // Hero image source
  const heroImageSrc = cmsData?.heroImage
    ? urlFor(cmsData.heroImage).width(1000).quality(80).url()
    : "https://images.unsplash.com/photo-1668762924635-a3683caf32bf?w=1000&q=80&auto=format";

  const renderBadgeIcon = (icon: string) => {
    switch (icon) {
      case "shield":
        return <ShieldCheck size={16} className="text-[#2d6953] shrink-0" />;
      case "award":
        return <Award size={16} className="text-[#2d6953] shrink-0" />;
      default:
        return <CheckCircle2 size={16} className="text-[#2d6953] shrink-0" />;
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex flex-col justify-center"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#c4ebde]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#b1f0d4]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Copy */}
          <Animated
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#efeee8] border border-[#c1c8c4]/60 text-xs font-semibold text-[#00251d] tracking-wide mb-6">
              <Sprout size={14} className="text-[#2d6953]" />
              <span>{eyebrowPill}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#00251d] leading-[1.08] tracking-tight mb-6 whitespace-pre-line">
              {headline.includes(highlightedText) ? (
                <>
                  {headline.split(highlightedText)[0]}
                  <span className="italic font-normal text-[#2d6953] underline decoration-[#c4ebde] decoration-wavy decoration-2 underline-offset-8">
                    {highlightedText}
                  </span>
                  {headline.split(highlightedText)[1]}
                </>
              ) : (
                headline
              )}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#414845] leading-relaxed max-w-2xl mb-8 font-normal">
              {subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href={ctaPrimary.href}
                target={ctaPrimary.href.startsWith("http") ? "_blank" : undefined}
                rel={ctaPrimary.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-sm font-semibold tracking-wide shadow-[0_10px_25px_rgba(0,37,29,0.2)] hover:shadow-[0_15px_35px_rgba(0,37,29,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{ctaPrimary.text}</span>
                <ArrowRight size={17} />
              </a>

              <Link
                href={ctaSecondary.href}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white hover:bg-[#f5f4ee] border border-[#c1c8c4] text-[#00251d] text-sm font-semibold tracking-wide transition-all hover:border-[#00251d]"
              >
                <span>{ctaSecondary.text}</span>
              </Link>
            </div>

            {/* Assurance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[#c1c8c4]/40 w-full">
              {assuranceBadges.map((badge) => (
                <div key={badge._key || badge.text} className="flex items-center gap-2.5 text-xs text-[#1b1c19] font-medium">
                  {renderBadgeIcon(badge.icon)}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </Animated>

          {/* Right Column: Clean Botanical Visual */}
          <Animated
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-[36px] overflow-hidden shadow-2xl bg-[#efeee8] border-8 border-white">
              <div className="aspect-[4/5] relative w-full">
                <Image
                  src={heroImageSrc}
                  alt={cmsData?.heroImage?.alt || "Bibit Pisang Kultur Jaringan Unggul Kediri"}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#00251d]/75 via-transparent to-transparent" />

              {/* Botanical Overlay Badge inside Image */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-white/60 text-[#00251d] shadow-lg">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#2d6953] mb-1">
                  {heroBadge.title}
                </div>
                <div className="font-serif text-lg font-bold text-[#00251d]">
                  {heroBadge.subtitle}
                </div>
                <div className="text-xs text-[#414845] mt-1 flex items-center justify-between">
                  <span>{heroBadge.details}</span>
                  <span className="font-bold text-[#2d6953]">Kediri</span>
                </div>
              </div>
            </div>

            {/* Floating Live Stat Card */}
            <div className="absolute -bottom-5 -left-5 hidden sm:block p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#c1c8c4]/60 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#b1f0d4] text-[#00251d] flex items-center justify-center font-bold">
                  🌱
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#00251d]">
                    {floatingStat.label}
                  </div>
                  <div className="text-[11px] text-[#414845]">
                    {floatingStat.detail}
                  </div>
                </div>
              </div>
            </div>
          </Animated>
        </div>

        {/* Highlight Numbers Strip */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-[#efeee8] border border-[#c1c8c4]/50">
          {stats.map((stat, idx) => (
            <Animated
              key={stat._key || stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center md:text-left"
            >
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#00251d]">
                <StatCounter value={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-[#414845] mt-1 font-medium">
                {stat.label}
              </div>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};
