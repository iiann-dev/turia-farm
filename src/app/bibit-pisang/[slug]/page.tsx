import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, Clock, Ruler, Scale, Sparkles, Check } from "lucide-react";
import { PageWrapper } from "@/components/PageWrapper";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  getSeedlingDetail,
  getAllSeedlingSlugs,
  getSiteConfig,
  getFooter,
  urlFor,
  projectId,
  dataset,
  getSlug,
} from "@/lib/sanity";
import { SEEDLINGS } from "@/data/seedlings";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSeedlingSlugs().catch(() => []);
  return slugs.map((s: any) => ({ slug: s.slug }));
}

function getWaLinkForSeedling(item: any) {
  const text = `Halo Turia Farm, saya berminat memesan bibit *${item.name}* (${item.price}). Mohon info ketersediaan stok & estimasi ongkir.`;
  return `https://wa.me/6289508495717?text=${encodeURIComponent(text)}`;
}

function seedlingImageUrl(item: any) {
  return item?.image?.asset
    ? urlFor(item.image).width(1200).quality(80).url()
    : item?.image ||
        "https://images.unsplash.com/photo-1679255728321-88375291b36c?w=1200&q=80&auto=format";
}

function isSengon(item: any) {
  const id = getSlug(item);
  return id.startsWith("sengon");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seedling = await getSeedlingDetail(slug).catch(() => null);
  const name = seedling?.name || "Bibit";
  const image = seedlingImageUrl(seedling);
  return {
    title: `${name} - Harga & Spesifikasi | Katalog Bibit Turia Farm`,
    description:
      seedling?.desc?.slice(0, 155) ||
      `Info lengkap bibit ${name}: harga, masa panen, berat tandan, karakteristik, dan rekomendasi lahan di Turia Farm Kediri.`,
    alternates: {
      canonical: `https://turia-farm.vercel.app/bibit-pisang/${slug}`,
    },
    openGraph: {
      title: `${name} | Turia Farm Kediri`,
      description: seedling?.desc?.slice(0, 155) || `Bibit ${name} di Turia Farm Kediri.`,
      images: [
        {
          url:
            seedling?.image?.asset
              ? `https://cdn.sanity.io/images/${projectId}/${dataset}/${seedling.image.asset._ref.replace("image-", "").replace(/-(jpg|jpeg|png|webp)$/, ".$1")}`
              : image,
        },
      ],
    },
  };
}

export default async function SeedlingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // CMS first; static fallback keeps local/seed-less builds working
  const seedling = await getSeedlingDetail(slug).catch(() => null);
  const fallback = SEEDLINGS.find((s) => getSlug(s) === slug);
  const item = seedling || fallback;

  if (!item) notFound();

  const [siteConfig, footer] = await Promise.all([
    getSiteConfig().catch(() => null),
    getFooter().catch(() => null),
  ]);

  const imageSrc = seedlingImageUrl(item);
  const idSlug = getSlug(item);

  const specRows: Array<{ label: string; value: string; accent?: boolean }> = [
    { label: "Masa Panen", value: item.maturity },
    { label: "Berat Tandan", value: item.bunchWeight },
    { label: isSengon(item) ? "Karakteristik" : "Kemanisan", value: item.sweetness },
    { label: "Tinggi Pohon", value: item.height },
    { label: "Rekomendasi Lahan", value: item.bestFor, accent: true },
    { label: "Harga Eceran / Partai", value: item.price },
  ];

  return (
    <PageWrapper cmsSiteConfig={siteConfig} cmsFooter={footer}>
      <div className="pt-6">
        <section className="py-20 sm:py-28 bg-[#faf9f3] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-10">
              <Breadcrumb
                items={[
                  { label: "Beranda", href: "/" },
                  { label: "Katalog Bibit", href: "/bibit-pisang" },
                  { label: item.name },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden bg-[#efeee8] border border-[#c1c8c4]/40 aspect-[4/3] lg:aspect-auto lg:min-h-[520px] shadow-sm">
                <Image
                  src={imageSrc}
                  alt={item.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#00251d]/85 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e3e3dd] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-4">
                  <Sparkles size={13} className="text-[#2d6953]" />
                  <span>{item.tag}</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00251d] tracking-tight leading-tight mb-2">
                  {item.name}
                </h1>
                <div className="text-sm italic text-[#717975] mb-6">
                  {item.scientificName}
                </div>

                <div className="mb-8">
                  <span className="inline-block px-4 py-2 rounded-2xl bg-white border border-[#c1c8c4]/50 text-[#00251d] text-lg font-bold shadow-sm">
                    {item.price}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#414845] leading-relaxed mb-10">
                  {item.desc}
                </p>

                {/* Spec Table (reuses modal styling) */}
                <div className="space-y-3 bg-white p-6 rounded-2xl border border-[#efeee8] mb-10 text-sm">
                  {specRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between py-1 border-b border-[#f5f4ee] last:border-0"
                    >
                      <span className="text-[#717975]">{row.label}</span>
                      <span
                        className={`font-semibold ${
                          row.accent ? "text-[#2d6953]" : "text-[#00251d]"
                        }`}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={getWaLinkForSeedling(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#00251d] text-white hover:bg-[#173b32] text-sm font-semibold text-center shadow-md transition-colors"
                  >
                    <span>Konsultasi & Pesan Bibit Ini</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <a
                    href="/bibit-pisang"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full border border-[#c1c8c4] hover:border-[#00251d] text-[#00251d] text-sm font-medium transition-colors hover:bg-[#f5f4ee]"
                  >
                    Lihat Semua Bibit
                  </a>
                </div>

                {/* Trust bullets */}
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#414845]">
                  {["Bibit sehat & akar aktif", "Garansi hidup sampai kebun", "Pengiriman se-Jawa & Bali"].map(
                    (t) => (
                      <span key={t} className="flex items-center gap-1.5">
                        <Check size={13} className="text-[#2d6953]" />
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}