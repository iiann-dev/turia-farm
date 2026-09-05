import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false so server fetch always gets fresh data upon revalidation
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getHomePage() {
  const query = `*[_type == "homePage"][0]{
    hero,
    stats,
    featuredSeedlings,
    processTeaser,
    knowledgeSpotlight,
    seo
  }`;
  return client.fetch(query);
}

export async function getSeedlings() {
  const query = `*[_type == "seedling"] | order(order asc, name asc)`;
  return client.fetch(query);
}

// Normalize a slug/id that may be a Sanity slug object ({ current: "x" }),
// a static string slug, or a plain string id. Never returns the CMS
// object shape — always a string.
export function getSlug(item: any): string {
  if (!item) return "";
  const id = item.id ?? item.slug;
  if (typeof id === "string") return id;
  if (id && typeof id === "object" && typeof id.current === "string") return id.current;
  return "";
}

// Sanity item id may be a slug object or plain string — normalize to the
// string used in URLs / lookups.
export function getItemId(item: any): string {
  return getSlug(item);
}

export async function getSeedlingDetail(id: string) {
  const query = `*[_type == "seedling" && id.current == $id][0]{
    _id,
    id,
    name,
    scientificName,
    tag,
    desc,
    maturity,
    bunchWeight,
    sweetness,
    height,
    price,
    image,
    status,
    bestFor,
    featured,
    order
  }`;
  return client.fetch(query, { id });
}

export async function getAllSeedlingSlugs() {
  const query = `*[_type == "seedling"]{"slug": id.current}`;
  return client.fetch(query);
}

export async function getFeaturedSeedlings() {
  const query = `*[_type == "seedling" && featured == true] | order(order asc, name asc)`;
  return client.fetch(query);
}

export async function getArticles() {
  const query = `*[_type == "article" && published == true] | order(date desc, order asc)`;
  return client.fetch(query);
}

export async function getArticleDetail(id: string) {
  const query = `*[_type == "article" && id.current == $id][0]{
    _id,
    id,
    title,
    slug,
    excerpt,
    content,
    image,
    category,
    author,
    date,
    publishedAt,
    published,
    readTime,
    order
  }`;
  return client.fetch(query, { id });
}

export async function getAllArticleSlugs() {
  const query = `*[_type == "article"]{"slug": id.current}`;
  return client.fetch(query);
}

export async function getProcessSteps() {
  const query = `*[_type == "processStep"] | order(order asc, step asc)`;
  return client.fetch(query);
}

export async function getSiteConfig() {
  const query = `*[_type == "siteConfig"][0]`;
  return client.fetch(query);
}

export async function getFooter() {
  const query = `*[_type == "footer"][0]`;
  return client.fetch(query);
}

// Generate Google Maps embed iframe src from lat/lng
export function getMapsEmbedSrc(lat?: number, lng?: number): string {
  if (lat === undefined || lng === undefined) return "";
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3131023966703!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78f1006725ea41%3A0x2a565eacbeca6fbe!2sTURIA%27S%20FARM%20KEDIRI%20%23bibitpisang%20%26%20sengon!5e0!3m2!1sen!2sid!4v1787411138372!5m2!1sen!2sid`;
}

export async function getCatalogPage() {
  const query = `*[_type == "catalogPage"][0]{
    hero,
    seo,
    "featuredSeedlings": featuredSeedlings[]->{
      _id,
      id,
      name,
      scientificName,
      tag,
      desc,
      maturity,
      bunchWeight,
      sweetness,
      height,
      price,
      image,
      status,
      bestFor,
      featured,
      order
    }
  }`;
  return client.fetch(query);
}

export async function getProcessPage() {
  const query = `*[_type == "processPage"][0]{
    sectionHeader,
    "processSteps": processSteps[]->{
      _id,
      step,
      title,
      tagline,
      desc,
      duration,
      highlight,
      icon,
      image,
      order
    },
    nurseryCard,
    seo
  }`;
  return client.fetch(query);
}

export async function getGuidePage() {
  const query = `*[_type == "guidePage"][0]{
    sectionHeader,
    "articles": articles[]->{
      _id,
      id,
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      publishedAt,
      published,
      readTime,
      order
    },
    faqSection,
    seo
  }`;
  return client.fetch(query);
}

export async function getAboutPage() {
  const query = `*[_type == "aboutPage"][0]{
    storySection,
    heroImage,
    valuePillars,
    testimonials,
    farmStatsBadge,
    seo
  }`;
  return client.fetch(query);
}

export async function getContactPage() {
  const query = `*[_type == "contactPage"][0]{
    sectionHeader,
    deliveryCard,
    formFields,
    formVarietasOptions,
    seo
  }`;
  return client.fetch(query);
}