import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface Slug {
  current: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface Category {
  _id: string;
  title: string;
  slug: Slug;
  order?: number;
}

export type Availability = "available" | "sold" | "not-for-sale";

export interface Dimensions {
  height?: number;
  width?: number;
  depth?: number;
  unit?: "cm" | "in";
}

export interface Artwork {
  _id: string;
  title: string;
  slug: Slug;
  category: Category;
  year: number;
  medium: string;
  dimensions?: Dimensions;
  description?: PortableTextBlock[];
  collection?: string;
  availability: Availability;
  price?: string;
  commissioned?: boolean;
  featured?: boolean;
  mainImage: SanityImage;
  additionalImages?: SanityImage[];
  seo?: Seo;
}

export type ArtworkSummary = Pick<
  Artwork,
  | "_id"
  | "title"
  | "slug"
  | "category"
  | "year"
  | "medium"
  | "mainImage"
  | "availability"
  | "commissioned"
>;

export interface CvEntry {
  _id: string;
  section: "education" | "awards" | "publications" | "residencies" | "collections" | "press";
  title: string;
  organization?: string;
  year: number;
  description?: string;
  url?: string;
}

export interface Biography {
  _id: string;
  name: string;
  portrait?: SanityImage;
  shortBio?: string;
  biography?: PortableTextBlock[];
  artistStatement?: PortableTextBlock[];
  email?: string;
  instagram?: string;
  seo?: Seo;
}

export interface Exhibition {
  _id: string;
  title: string;
  slug: Slug;
  type: "solo" | "group";
  venue: string;
  city: string;
  country?: string;
  startDate: string;
  endDate?: string;
  description?: PortableTextBlock[];
  coverImage?: SanityImage;
  installationImages?: SanityImage[];
  artworks?: ArtworkSummary[];
  url?: string;
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: Slug;
  publishedAt: string;
  excerpt: string;
  coverImage?: SanityImage;
  body?: PortableTextBlock[];
  seo?: Seo;
}

export type NewsPostSummary = Pick<
  NewsPost,
  "_id" | "title" | "slug" | "publishedAt" | "excerpt" | "coverImage"
>;
