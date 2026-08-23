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