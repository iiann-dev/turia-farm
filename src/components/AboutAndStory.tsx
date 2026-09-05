"use client";

import React from "react";
import { Animated } from "./Animated";
import { TESTIMONIALS } from "../data/seedlings";
import { Users, HeartHandshake, Star } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface AboutAndStoryProps {
  cmsAboutPage?: any;
}

export const AboutAndStory: React.FC<AboutAndStoryProps> = ({
  cmsAboutPage,
}) => {
  const story = cmsAboutPage?.storySection;
  const pillars = cmsAboutPage?.valuePillars?.length > 0
    ? cmsAboutPage.valuePillars
    : [
        {
          title: "Bukan Bibit Cabutan",
          description: "Genetika murni klon unggul dengan riwayat pohon induk tercatat jelas.",
        },
        {
          title: "Bimbingan Sampai Panen",
          description: "Konsultasi gratis pupuk & hama langsung via WhatsApp agronomis kami.",
        },
      ];

  const testimonials = cmsAboutPage?.testimonials?.length > 0
    ? cmsAboutPage.testimonials
    : TESTIMONIALS;

  const farmStats = cmsAboutPage?.farmStatsBadge;

  const heroImageSrc = cmsAboutPage?.heroImage?.asset
    ? urlFor(cmsAboutPage.heroImage).width(900).quality(80).url()
    : "https://images.unsplash.com/photo-1762512216868-3e7dae3beee5?w=900&q=80&auto=format";

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
                src={heroImageSrc}
                alt={cmsAboutPage?.heroImage?.alt || "Turia Farm Team & Farmers"}
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-8 -right-4 sm:-bottom-8 sm:-right-8 p-6 rounded-3xl bg-[#00251d] text-white shadow-2xl border-4 border-white max-w-xs">
              <div className="font-serif text-2xl font-bold text-[#c4ebde] mb-1">
                {farmStats?.title || "2.8 Hektar"}
              </div>
              <div className="text-xs text-[#faf9f3]/90 leading-snug">
                {farmStats?.description || "Kapasitas ribuan polybag bibit anakan & bibit sengon per siklus tanam."}
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
              <span>{story?.eyebrowPill || "Tentang Turia Farm"}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight mb-6 leading-tight">
              {story?.headline || "Dedikasi untuk Kesejahteraan Petani Indonesia"}
            </h1>
            <div className="space-y-4 text-[#414845] text-sm sm:text-base leading-relaxed mb-8">
              {story?.paragraphs?.length > 0 ? (
                story.paragraphs.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                ))
              ) : (
                <>
                  <p>
                    Turia Farm berawal dari kebun pembibitan keluarga di Batuaji, Ringinrejo, Kediri yang prihatin atas maraknya bibit cabutan asal-asalan dan tidak seragam di kalangan petani.
                  </p>
                  <p>
                    Kini dengan lahan pembibitan kebun seluas 2.8 hektar di Batuaji Kediri, kami memproduksi anakan pisang pilihan dari pohon indukan sehat serta penyemaian biji sengon unggul, mendampingi ratusan petani dari nol hingga panen raya yang menguntungkan.
                  </p>
                </>
              )}
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar: any, idx: number) => (
                <div key={pillar._key || idx} className="p-4 rounded-2xl bg-[#f5f4ee] border border-[#c1c8c4]/40">
                  <div className="font-serif font-bold text-[#00251d] text-base mb-1">
                    {pillar.title}
                  </div>
                  <div className="text-xs text-[#414845]">
                    {pillar.description}
                  </div>
                </div>
              ))}
            </div>
          </Animated>
        </div>

        {/* Testimonials Block */}
        <div className="mt-20 pt-16 border-t border-[#efeee8]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeee8] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-3">
              <HeartHandshake size={13} className="text-[#2d6953]" />
              <span>Pengalaman Mitra</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#00251d]">
              Apa Kata Petani & Pemilik Kebun
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi: any, idx: number) => (
              <Animated
                key={testi.name || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-3xl bg-white p-7 border border-[#c1c8c4]/40 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-500">
                    {[...Array(testi.rating || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#414845] leading-relaxed italic mb-6">
                    &ldquo;{testi.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f5f4ee]">
                  <div className="font-serif font-bold text-[#00251d] text-base">
                    {testi.name}
                  </div>
                  <div className="text-xs text-[#2d6953] font-medium">
                    {testi.role}
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
