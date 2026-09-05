import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, Calendar, Clock, BookOpen, ArrowUpRight } from "lucide-react";
import { PageWrapper } from "@/components/PageWrapper";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  getArticleDetail,
  getAllArticleSlugs,
  getArticles,
  getSiteConfig,
  getFooter,
  urlFor,
  getSlug,
} from "@/lib/sanity";
import { ARTICLES, SITE_CONFIG } from "@/data/seedlings";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs().catch(() => []);
  return slugs.map((s: any) => ({ slug: s.slug }));
}

function articleImageUrl(item: any) {
  return item?.image?.asset
    ? urlFor(item.image).width(1200).quality(80).url()
    : item?.image || item?.coverImage?.asset
      ? urlFor(item.coverImage).width(1200).quality(80).url()
      : "https://images.unsplash.com/photo-1620036924477-c3d6e9ce36fc?w=1200&q=80&auto=format";
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm sm:text-base text-[#414845] leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#00251d] mt-10 mb-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#00251d] mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#2d6953] pl-5 py-2 my-6 text-[#00251d] font-serif italic text-base sm:text-lg leading-relaxed bg-[#f5f4ee] rounded-r-2xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 text-sm sm:text-base text-[#414845] leading-relaxed mb-5 space-y-1.5">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 text-sm sm:text-base text-[#414845] leading-relaxed mb-5 space-y-1.5">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-[#414845]">{children}</li>,
    number: ({ children }) => <li className="text-[#414845]">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#1b1c19]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#2d6953] underline underline-offset-2 hover:text-[#00251d] transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) =>
      value?.asset?._ref ? (
        <div className="my-6 rounded-2xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={urlFor(value).width(1200).quality(80).url()}
            alt={value?.alt || ""}
            className="w-full h-auto"
          />
        </div>
      ) : null,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleDetail(slug).catch(() => null);
  const title = article?.title || "Artikel Panduan";
  const image = articleImageUrl(article);
  return {
    title: title,
    description:
      article?.excerpt?.slice(0, 155) || `Artikel panduan budidaya dari Turia Farm: ${title}`,
    alternates: {
      canonical: `https://turia-farm.vercel.app/panduan-tani/${slug}`,
    },
    openGraph: {
      title: `${title} | Turia Farm`,
      description: article?.excerpt?.slice(0, 155),
      type: "article",
      images: [{ url: image }],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticleDetail(slug).catch(() => null);
  const fallback = ARTICLES.find((a) => getSlug(a) === slug);
  const item = article || fallback;

  if (!item) notFound();

  const [siteConfig, footer, allArticles] = await Promise.all([
    getSiteConfig().catch(() => null),
    getFooter().catch(() => null),
    getArticles().catch(() => []),
  ]);

  const imageSrc = articleImageUrl(item);
  const currentSlug = getSlug(item);
  const otherArticles = (allArticles.length > 0 ? allArticles : ARTICLES)
    .filter((a: any) => getSlug(a) !== currentSlug)
    .slice(0, 3);

  return (
    <PageWrapper cmsSiteConfig={siteConfig} cmsFooter={footer}>
      <div className="pt-6">
        <article className="py-20 sm:py-28 bg-[#faf9f3] relative">
          <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-12 mx-auto sm:mx-0">
            <div className="mb-8">
              <Breadcrumb
                items={[
                  { label: "Beranda", href: "/" },
                  { label: "Panduan Tani", href: "/panduan-tani" },
                  { label: item.title },
                ]}
              />
            </div>

            {/* Header */}
            <div className="max-w-3xl w-full mx-auto sm:mx-0 mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c4ebde] text-xs font-semibold uppercase tracking-wider text-[#00251d] mb-5">
                <span>{item.category}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00251d] tracking-tight leading-tight mb-6">
                {item.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#717975]">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#2d6953]" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-[#2d6953]" />
                  {item.readTime}
                </span>
              </div>
            </div>

            {/* Featured image — smaller, constrained to reading column */}
            <div className="max-w-3xl w-full mx-auto sm:mx-0 mb-12">
              <div className="relative rounded-3xl overflow-hidden bg-[#efeee8] border border-[#c1c8c4]/40 aspect-[16/9] shadow-sm">
                <Image
                  src={imageSrc}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Article body */}
            <div className="max-w-3xl w-full mx-auto sm:mx-0">
              <p className="font-medium text-base sm:text-lg text-[#1b1c19] leading-relaxed mb-8 border-l-4 border-[#2d6953] pl-5">
                {item.excerpt}
              </p>

              {item.content?.length > 0 ? (
                <PortableText value={item.content} components={portableTextComponents} />
              ) : (
                <div className="space-y-5 text-sm sm:text-base text-[#414845] leading-relaxed">
                  <p>
                    Budidaya pisang intensif memerlukan pendekatan terencana mulai dari persiapan
                    olah tanah, pembuatan bedengan dengan saluran drainase yang lancar (pisang tidak
                    menyukai tanah tergenang air), hingga sanitasi anakan rutin (1 pohon induk cukup
                    pelihara 1 anakan penerus).
                  </p>
                  <p>
                    Pemberian nutrisi mikro dan inokulasi hayati seperti jamur Trichoderma harzianum
                    pada awal tanam terbukti menekan insiden penyakit layu hingga di bawah 1%.
                    Gunakan mulsa jerami atau daun pisang kering di sekitar piringan pohon untuk
                    menjaga kelembapan mikro tanah saat kemarau.
                  </p>
                </div>
              )}
            </div>

            {/* Below-text: related articles (full width) */}
            <div className="max-w-3xl w-full mx-auto sm:mx-0 mt-12">
              {otherArticles.length > 0 && (
                <div className="rounded-3xl bg-white border border-[#c1c8c4]/40 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={14} className="text-[#2d6953]" />
                    <h3 className="text-sm font-bold text-[#00251d]">Artikel Lainnya</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherArticles.map((a: any) => (
                      <Link
                        key={getSlug(a)}
                        href={`/panduan-tani/${getSlug(a)}`}
                        className="group flex items-start gap-3"
                      >
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-[#efeee8] shrink-0">
                          <Image
                            src={articleImageUrl(a)}
                            alt={a.title || ""}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] uppercase tracking-wider text-[#2d6953] font-semibold mb-0.5">
                            {a.category}
                          </div>
                          <div className="text-xs font-semibold text-[#00251d] leading-snug group-hover:text-[#2d6953] transition-colors line-clamp-2">
                            {a.title}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/panduan-tani"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2d6953] hover:text-[#00251d] transition-colors"
                  >
                    Lihat semua artikel
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              )}
            </div>

            {/* Back link */}
            <div className="max-w-3xl w-full mx-auto sm:mx-0 mt-12 pt-8 border-t border-[#c1c8c4]/50">
              <a
                href="/panduan-tani"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00251d] text-white text-xs font-semibold hover:bg-[#173b32] transition-colors shadow-xs"
              >
                <ArrowLeft size={14} />
                Kembali ke Panduan Tani
              </a>
            </div>
          </div>
        </article>
      </div>
    </PageWrapper>
  );
}