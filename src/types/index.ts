export interface SeedlingItem {
  id: string;
  slug?: string;
  name: string;
  scientificName: string;
  tag: string;
  desc: string;
  maturity: string;
  bunchWeight: string;
  sweetness: string;
  height: string;
  price: string;
  image: string;
  status: string;
  bestFor: string;
  featured?: boolean;
  order?: number;
}

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  desc: string;
  duration: string;
  highlight: string;
  icon: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
  content?: any;
}

export interface TestimonialItem {
  name: string;
  location: string;
  role: string;
  quote: string;
  farmSize: string;
  rating: number;
}
