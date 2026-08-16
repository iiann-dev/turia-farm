"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { SITE_CONFIG } from "../data/seedlings";
import { BananaLogo } from "./BananaLogo";
import { Menu, X, Globe, Phone, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/bibit-pisang", label: t("nav.seedlings") },
    { href: "/proses-kultur", label: t("nav.process") },
    { href: "/tentang-kami", label: t("nav.about") },
    { href: "/panduan-tani", label: t("nav.journal") },
    { href: "/kontak", label: t("nav.contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 pt-3 sm:pt-4 pointer-events-none">
      {/* Top Banner for Local Nursery */}
      <div className="max-w-7xl mx-auto mb-2 hidden md:flex items-center justify-between px-6 py-1.5 rounded-full bg-[#173b32]/90 backdrop-blur-md text-[#c4ebde] text-xs font-medium border border-[#2d6953]/40 pointer-events-auto shadow-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{t("nav.openHours")}</span>
          <span className="text-[#80a599]">• {SITE_CONFIG.location}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={SITE_CONFIG.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone size={13} />
            <span>Hotline Tani: {SITE_CONFIG.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Glass Nav Bar */}
      <nav
        className={`max-w-7xl mx-auto rounded-full px-4 sm:px-6 py-3 flex items-center justify-between pointer-events-auto border transition-colors duration-200 ${
          scrolled
            ? "bg-[#faf9f3]/95 shadow-[0_12px_30px_rgba(0,37,29,0.08)] backdrop-blur-xl border-[#c1c8c4]/60"
            : "bg-[#faf9f3]/85 backdrop-blur-md border-[#c1c8c4]/40 shadow-xs"
        }`}
      >
        {/* Brand Logo with Banana Sprout Graphic */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
        >
          <BananaLogo size={40} className="transition-transform duration-200 group-hover:scale-105" />
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold text-[#00251d] tracking-tight leading-none">
              Turia Farm
            </div>
            <div className="text-[10px] sm:text-[10.5px] font-medium tracking-wider uppercase text-[#2d6953] mt-0.5 whitespace-nowrap">
              Bibit Pisang & Sengon Kediri
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#00251d] text-white"
                    : "text-[#414845] hover:text-[#00251d] hover:bg-[#efeee8]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Action Controls & Lang Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c1c8c4]/60 hover:border-[#00251d] text-xs font-semibold text-[#00251d] bg-white/80 hover:bg-white transition-colors duration-150 cursor-pointer shadow-xs"
            title="Ganti Bahasa / Switch Language"
          >
            <Globe size={14} className="text-[#2d6953]" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Consultation Button */}
          <a
            href={SITE_CONFIG.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-150 shadow-xs"
          >
            <span>{t("nav.cta")}</span>
            <ArrowUpRight size={15} />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-[#efeee8] text-[#00251d] transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl bg-[#faf9f3] border border-[#c1c8c4]/60 shadow-2xl p-5 pointer-events-auto">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-left px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#00251d] text-white font-semibold"
                      : "text-[#1b1c19] hover:bg-[#efeee8]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#c1c8c4]/40 flex flex-col gap-3">
            <div className="text-xs text-[#414845]">
              <span className="font-semibold block text-[#00251d]">Lokasi Nursery Kediri:</span>
              {SITE_CONFIG.location}
            </div>
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#00251d] text-white font-medium text-sm shadow-md"
            >
              <span>{t("nav.cta")}</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
