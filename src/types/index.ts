export type Language = "id" | "en";

export interface SeedlingItem {
  id: string;
  name: { id: string; en: string };
  scientificName: string;
  tag: { id: string; en: string };
  desc: { id: string; en: string };
  maturity: { id: string; en: string };
  bunchWeight: { id: string; en: string };
  sweetness: string;
  height: string;
  price: { id: string; en: string };
  image: string;
  status: { id: string; en: string };
  bestFor: { id: string; en: string };
}

export interface ProcessStep {
  step: string;
  title: { id: string; en: string };
  tagline: { id: string; en: string };
  desc: { id: string; en: string };
  duration: { id: string; en: string };
  highlight: { id: string; en: string };
  icon: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: { id: string; en: string };
  category: { id: string; en: string };
  date: { id: string; en: string };
  readTime: { id: string; en: string };
  excerpt: { id: string; en: string };
  image: string;
  author: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  role: { id: string; en: string };
  quote: { id: string; en: string };
  farmSize: string;
  rating: number;
}
