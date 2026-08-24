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
}

export const Footer: React.FC<FooterProps> = ({
  cmsSiteConfig,
}) => {
  const whatsapp = cmsSiteConfig?.whatsapp || SITE_CONFIG.whatsapp;
  const rawWhatsApp = whatsapp.startsWith("http") 
    ? whatsapp 
    : `https://wa.me/${whatsapp}?text=Halo%20Turia%20Farm`;
  const facebookUrl = cmsSiteConfig?.socialLinks?.facebook;

  return (
    <footer className="bg-[#00251d] text-[#faf9f3] pt-12 sm:pt-16 pb-8 border-t border-[#173b32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 sm:gap-8 pb-10 sm:pb-12 border-b border-[#173b32]/80">
          {/* Brand Col - full width on mobile */}
          <div className="col-span-2 md:col-span-2 lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <BananaLogo size={36} className="border-emerald-700/50" />
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#faf9f3]">
                Turia Farm
              </div>
            </div>
            <div className="text-xs sm:text-sm text-[#a8cfc2] max-w-sm leading-relaxed">
              Pertanian modern yang berakar pada alam. Menumbuhkan genetik unggul untuk kedaulatan pangan berkelanjutan.
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
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/bibit-pisang" className="hover:text-white transition-colors">Katalog Bibit</Link></li>
              <li><Link href="/proses-kultur" className="hover:text-white transition-colors">Proses Pembibitan</Link></li>
              <li><Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/panduan-tani" className="hover:text-white transition-colors">Panduan Tani</Link></li>
              <li><Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Varieties */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#c4ebde] mb-3">
              Varietas Populer
            </div>
            <ul className="space-y-1.5 text-xs text-[#a8cfc2]">
              {SEEDLINGS.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link href="/bibit-pisang" className="hover:text-white transition-colors flex items-center justify-between gap-2">
                    <span className="truncate">{s.name}</span>
                    <span className="text-[#80a599] text-[11px] whitespace-nowrap">{s.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Social & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-3 text-xs text-[#80a691]">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <span>© 2026 Turia Farm Kediri. Hak Cipta Dilindungi.</span>
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href={rawWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 transition-all"
                aria-label="WhatsApp Turia Farm"
              >
                <MessageCircle size={18} />
              </a>
              {/* Facebook */}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2]/10 transition-all"
                  aria-label="Facebook Turia Farm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
