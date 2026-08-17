"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { SITE_CONFIG, SEEDLINGS } from "../data/seedlings";
import { BananaLogo } from "./BananaLogo";

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();

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
            <p className="text-xs sm:text-sm text-[#a8cfc2] max-w-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="text-xs text-[#80a691] pt-1">
              {SITE_CONFIG.address}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#c4ebde] mb-3">
              {t("footer.quickLinks")}
            </div>
            <ul className="space-y-2 text-xs text-[#a8cfc2]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/bibit-pisang" className="hover:text-white transition-colors">
                  {t("nav.seedlings")}
                </Link>
              </li>
              <li>
                <Link href="/proses-kultur" className="hover:text-white transition-colors">
                  {t("nav.process")}
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-white transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/panduan-tani" className="hover:text-white transition-colors">
                  {t("nav.journal")}
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Varieties */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#c4ebde] mb-3">
              {t("footer.varieties")}
            </div>
            <ul className="space-y-1.5 text-xs text-[#a8cfc2]">
              {SEEDLINGS.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link
                    href="/bibit-pisang"
                    className="hover:text-white transition-colors flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{s.name[lang]}</span>
                    <span className="text-[#80a599] text-[11px] whitespace-nowrap">{s.price[lang]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#80a691]">
          <div>
            © {new Date().getFullYear()} Turia Farm Kediri. {t("footer.rights")}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>Standar Pertanian Berkelanjutan</span>
            <span>Kultur Jaringan Bersertifikasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
