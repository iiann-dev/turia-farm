"use client";

import React from "react";
import Link from "next/link";
import { SITE_CONFIG, SEEDLINGS } from "../data/seedlings";
import { BananaLogo } from "./BananaLogo";
import { MessageCircle } from "lucide-react";

interface FooterProps {
  cmsSiteConfig?: {
    whatsapp?: string;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      tiktok?: string;
      youtube?: string;
    };
  };
  cmsFooter?: {
    brandSection?: { tagline?: string };
    quickLinks?: Array<{ label?: string; href?: string; order?: number }>;
    varietiesSection?: {
      title?: string;
      customVarieties?: Array<{ name?: string; price?: string; href?: string }>;
    };
    socialLinks?: {
      whatsapp?: string;
      facebook?: string;
      instagram?: string;
      tiktok?: string;
      youtube?: string;
    };
  };
}

const DEFAULT_QUICK_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Katalog Bibit", href: "/bibit-pisang" },
  { label: "Proses Pembibitan", href: "/proses-kultur" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Panduan Tani", href: "/panduan-tani" },
  { label: "Kontak", href: "/kontak" },
];

export const Footer: React.FC<FooterProps> = ({
  cmsSiteConfig,
  cmsFooter,
}) => {
  // Social: footer override > siteConfig > static fallback
  const whatsappRaw =
    cmsFooter?.socialLinks?.whatsapp ||
    cmsSiteConfig?.whatsapp ||
    SITE_CONFIG.whatsapp;
  const whatsapp = whatsappRaw.startsWith("http")
    ? whatsappRaw
    : `https://wa.me/${whatsappRaw}?text=Halo%20Turia%20Farm`;
  const facebookUrl =
    cmsFooter?.socialLinks?.facebook ||
    cmsSiteConfig?.socialLinks?.facebook;

  // Brand tagline: footer override > static fallback
  const tagline =
    cmsFooter?.brandSection?.tagline ||
    "Pertanian modern yang berakar pada alam. Menumbuhkan genetik unggul untuk kedaulatan pangan berkelanjutan.";

  // Quick Links: footer override > static defaults
  const quickLinks =
    cmsFooter?.quickLinks && cmsFooter.quickLinks.length > 0
      ? [...cmsFooter.quickLinks].sort((a, b) => (a.order || 0) - (b.order || 0))
      : DEFAULT_QUICK_LINKS;

  // Varieties: footer custom > first 4 from SEEDLINGS
  const varietiesTitle = cmsFooter?.varietiesSection?.title || "Varietas Populer";
  const varietiesItems =
    cmsFooter?.varietiesSection?.customVarieties &&
    cmsFooter.varietiesSection.customVarieties.length > 0
      ? cmsFooter.varietiesSection.customVarieties
      : SEEDLINGS.slice(0, 4).map((s) => ({
          name: s.name,
          price: s.price,
          href: "/bibit-pisang",
        }));

  return (
    <footer className="bg-[#00251d] text-[#faf9f3] pt-12 sm:pt-16 pb-8 border-t border-[#173b32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 sm:gap-8 pb-10 sm:pb-12 border-b border-[#173b32]/80">
          {/* Brand Col - full width on mobile */}
          <div className="col-span-2 md:col-span-2 lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <BananaLogo
                size={36}
                bg="#00251d"
                transparent
              />
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#faf9f3]">
                Turia Farm
              </div>
            </div>
            <div className="text-xs sm:text-sm text-[#a8cfc2] max-w-sm leading-relaxed">
              {tagline}
            </div>
            <div className="text-xs text-[#80a691] pt-1">
              {SITE_CONFIG.address}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#c4ebde] mb-3">
              Tautan Cepat
            </div>
            <ul className="space-y-2 text-xs text-[#a8cfc2]">
              {quickLinks.map((link, idx) => (
                <li key={link.label || idx}>
                  <Link
                    href={link.href || "#"}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Varieties */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#c4ebde] mb-3">
              {varietiesTitle}
            </div>
            <ul className="space-y-1.5 text-xs text-[#a8cfc2]">
              {varietiesItems.map((s, idx) => (
                <li key={s.name || idx}>
                  <Link
                    href={s.href || "/bibit-pisang"}
                    className="hover:text-white transition-colors flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{s.name}</span>
                    {s.price && (
                      <span className="text-[#80a599] text-[11px] whitespace-nowrap">
                        {s.price}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Copyright & Social */}
        <div className="pt-6 flex flex-col items-center gap-4 text-xs text-[#80a691]">
          <span className="text-center">© 2026 Turia Farm Kediri. Hak Cipta Dilindungi.</span>
          <div className="flex items-center gap-3">
            {/* WhatsApp */}
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 text-[#25D366] hover:text-[#128C7E] transition-colors"
              aria-label="WhatsApp Turia Farm"
            >
              <MessageCircle size={22} />
            </a>
            {/* Facebook */}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 text-[#1877F2] hover:text-[#0d65d9] transition-colors"
                aria-label="Facebook Turia Farm"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
