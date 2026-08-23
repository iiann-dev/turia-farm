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

export async function getFeaturedSeedlings() {
  const query = `*[_type == "seedling" && featured == true] | order(order asc, name asc)`;
  return client.fetch(query);
}

export async function getArticles() {
  const query = `*[_type == "article" && published == true] | order(date desc, order asc)`;
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

// Generate Google Maps embed iframe src from lat/lng
export function getMapsEmbedSrc(lat?: number, lng?: number): string {
  if (lat === undefined || lng === undefined) return "";
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.3131023966703!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78f1006725ea41%3A0x2a565eacbeca6fbe!2sTURIA%27S%20FARM%20KEDIRI%20%23bibitpisang%20%26%20sengon!5e0!3m2!1sen!2sid!4v1787411138372!5m2!1sen!2sid`;
}

export async function getCatalogPage() {
  const query = `*[_type == "catalogPage"][0]{
    hero,
    seo
  }`;
  return client.fetch(query);
}