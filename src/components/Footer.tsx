"use client";

import React from "react";
import Link from "next/link";
import { SITE_CONFIG, SEEDLINGS } from "../data/seedlings";
import { BananaLogo } from "./BananaLogo";

export const Footer: React.FC = () => {
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
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/bibit-pisang" className="hover:text-white transition-colors">
                  Katalog Bibit
                </Link>
              </li>
              <li>
                <Link href="/proses-kultur" className="hover:text-white transition-colors">
                  Proses Pembibitan
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/panduan-tani" className="hover:text-white transition-colors">
                  Panduan Tani
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
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
                  <Link
                    href="/bibit-pisang"
                    className="hover:text-white transition-colors flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{s.name}</span>
                    <span className="text-[#80a599] text-[11px] whitespace-nowrap">{s.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#80a691]">
          <div>
            © {new Date().getFullYear()} Turia Farm Kediri. Hak Cipta Dilindungi.
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
