"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { SITE_CONFIG, SEEDLINGS } from "../data/seedlings";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Truck, CheckCircle2 } from "lucide-react";

export const ContactAndLocation: React.FC = () => {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    variety: "Cavendish Grand Naine",
    qty: "500",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      lang === "id"
        ? `Halo Turia Farm,%0A%0ANama: ${encodeURIComponent(form.name)}%0AWhatsApp: ${encodeURIComponent(
            form.phone
          )}%0AVarietas: ${encodeURIComponent(form.variety)}%0AEstimasi Jumlah: ${encodeURIComponent(
            form.qty
          )} bibit%0ACatatan: ${encodeURIComponent(form.message)}`
        : `Hello Turia Farm,%0A%0AName: ${encodeURIComponent(form.name)}%0AWhatsApp: ${encodeURIComponent(
            form.phone
          )}%0AVariety: ${encodeURIComponent(form.variety)}%0AQuantity: ${encodeURIComponent(
            form.qty
          )} seedlings%0ANote: ${encodeURIComponent(form.message)}`;

    window.open(`https://wa.me/6289508495717?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#faf9f3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#efeee8] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
            <MessageCircle size={13} className="text-[#2d6953]" />
            <span>{t("contact.eyebrow")}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#00251d] tracking-tight mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-base sm:text-lg text-[#414845]">
            {t("contact.desc")}
          </p>
        </div>

        {/* Bento Grid: Contact Details & Order Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Bento */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-[#c1c8c4]/60 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#c4ebde] text-[#00251d] flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2d6953] mb-1">
                    {t("contact.addressTitle")}
                  </div>
                  <div className="text-sm font-semibold text-[#00251d] leading-snug">
                    {SITE_CONFIG.address}
                  </div>
                  <div className="text-xs text-[#717975] mt-1">
                    {SITE_CONFIG.nurseryArea}
                  </div>
                  {/* Google Maps Embed */}
                  <div className="mt-4 rounded-2xl overflow-hidden border border-[#c1c8c4]/60 shadow-sm">
                    <iframe
                      src={SITE_CONFIG.mapsEmbed}
                      title="Turia's Farm Kediri - Google Maps"
                      className="w-full h-44 sm:h-52"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a
                    href={SITE_CONFIG.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#2d6953] hover:text-[#00251d] transition-colors"
                  >
                    <MapPin size={14} />
                    {lang === "id" ? "Buka di Google Maps" : "Open in Google Maps"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#b1f0d4] text-[#00251d] flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2d6953] mb-1">
                    {t("contact.phoneTitle")}
                  </div>
                  <div className="text-sm font-semibold text-[#00251d]">
                    {SITE_CONFIG.phone} (WhatsApp / Telepon)
                  </div>
                  <div className="text-xs text-[#717975] mt-1">
                    {lang === "id" ? "Fast response jam kerja" : "Fast response during hours"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#efeee8] text-[#00251d] flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#2d6953] mb-1">
                    {t("contact.hoursTitle")}
                  </div>
                  <div className="text-sm font-semibold text-[#00251d]">
                    {SITE_CONFIG.hours[lang]}
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Assurance Card */}
            <div className="p-6 rounded-3xl bg-[#173b32] text-white flex items-center gap-4 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-[#2d6953] flex items-center justify-center shrink-0 text-[#c4ebde]">
                <Truck size={24} />
              </div>
              <div>
                <div className="font-serif font-bold text-base text-[#faf9f3]">
                  {lang === "id" ? "Armada Truk & Keranjang Kayu" : "Dedicated Truck & Wooden Crates"}
                </div>
                <div className="text-xs text-[#a8cfc2] mt-0.5 leading-relaxed">
                  {lang === "id"
                    ? "Pengiriman skala besar diantar langsung ke lokasi kebun Anda dengan garansi hidup."
                    : "Bulk orders delivered direct to farm gates across Java, Bali, and outer islands."}
                </div>
              </div>
            </div>
          </div>

          {/* Right Consultation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-[#c1c8c4]/60 shadow-lg"
          >
            <h3 className="font-serif text-2xl font-bold text-[#00251d] mb-2">
              {lang === "id" ? "Formulir Konsultasi & Pemesanan Bibit" : "Consultation & Order Form"}
            </h3>
            <p className="text-xs sm:text-sm text-[#414845] mb-8">
              {lang === "id"
                ? "Isi data kebutuhan Anda di bawah ini, kami akan langsung sambungkan ke WhatsApp resmi Agronomis Turia Farm."
                : "Fill in your requirements below to connect directly with our Agronomist WhatsApp desk."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#00251d] mb-2">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Contoh: Pak Herman"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf9f3] border border-[#c1c8c4] focus:outline-none focus:border-[#00251d] text-sm text-[#1b1c19]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#00251d] mb-2">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf9f3] border border-[#c1c8c4] focus:outline-none focus:border-[#00251d] text-sm text-[#1b1c19]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#00251d] mb-2">
                    {t("contact.form.variety")}
                  </label>
                  <select
                    value={form.variety}
                    onChange={(e) => setForm({ ...form, variety: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf9f3] border border-[#c1c8c4] focus:outline-none focus:border-[#00251d] text-sm text-[#1b1c19]"
                  >
                    {SEEDLINGS.map((s) => (
                      <option key={s.id} value={s.name[lang]}>
                        {s.name[lang]}
                      </option>
                    ))}
                    <option value="Campuran Beberapa Varietas">
                      {lang === "id" ? "Campuran Beberapa Varietas" : "Mixed Varieties"}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#00251d] mb-2">
                    {t("contact.form.qty")}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.qty}
                    onChange={(e) => setForm({ ...form, qty: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#faf9f3] border border-[#c1c8c4] focus:outline-none focus:border-[#00251d] text-sm text-[#1b1c19]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#00251d] mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={
                    lang === "id"
                      ? "Sebutkan lokasi lahan kebun (kabupaten/provinsi) atau pertanyaan khusus Anda..."
                      : "Describe your farm location or any specific questions..."
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-[#faf9f3] border border-[#c1c8c4] focus:outline-none focus:border-[#00251d] text-sm text-[#1b1c19]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-sm font-semibold tracking-wide shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Send size={16} />
                <span>{t("contact.form.submit")}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
