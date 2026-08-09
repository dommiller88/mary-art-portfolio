import "server-only";

import type {
  Artwork,
  ArtworkSummary,
  Biography,
  Category,
  CvEntry,
  Exhibition,
  NewsPost,
  NewsPostSummary,
} from "@/types";

import {
  demoArtworks,
  demoBiography,
  demoCategories,
  demoExhibitions,
  getDemoArtworkBySlug,
} from "./demo-data";
import { sanityFetch } from "./fetch";
import {
  ADJACENT_ARTWORKS_QUERY,
  ARTWORK_BY_SLUG_QUERY,
  ARTWORK_SLUGS_QUERY,
  ARTWORKS_BY_CATEGORY_QUERY,
  ARTWORKS_QUERY,
  BIOGRAPHY_QUERY,
  CATEGORIES_QUERY,
  COMMISSIONED_ARTWORKS_QUERY,
  CV_ENTRIES_QUERY,
  EXHIBITION_BY_SLUG_QUERY,
  EXHIBITION_SLUGS_QUERY,
  EXHIBITIONS_QUERY,
  FEATURED_ARTWORKS_QUERY,
  NEWS_POST_BY_SLUG_QUERY,
  NEWS_POSTS_QUERY,
  NEWS_SLUGS_QUERY,
  RECENT_EXHIBITIONS_QUERY,
} from "./queries";

// Opt-in local preview mode — see NEXT_PUBLIC_DEMO_MODE in .env.local.example.
// Renders the site with placeholder content/images instead of live Sanity
// data, so the design can be reviewed before a CMS project is connected.
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export async function getCategories(): Promise<Category[]> {
  if (isDemoMode) return demoCategories;
  return (await sanityFetch<Category[]>({ query: CATEGORIES_QUERY, tags: ["category"] })) ?? [];
}

export async function getArtworks(): Promise<ArtworkSummary[]> {
  if (isDemoMode) return demoArtworks;
  return (await sanityFetch<ArtworkSummary[]>({ query: ARTWORKS_QUERY, tags: ["artwork"] })) ?? [];
}

export async function getArtworksByCategory(categorySlug: string): Promise<ArtworkSummary[]> {
  if (isDemoMode) {
    return demoArtworks.filter((artwork) => artwork.category?.slug?.current === categorySlug);
  }
  return (
    (await sanityFetch<ArtworkSummary[]>({
      query: ARTWORKS_BY_CATEGORY_QUERY,
      params: { categorySlug },
      tags: ["artwork"],
    })) ?? []
  );
}

export async function getFeaturedArtworks(): Promise<ArtworkSummary[]> {
  if (isDemoMode) return demoArtworks;
  return (
    (await sanityFetch<ArtworkSummary[]>({ query: FEATURED_ARTWORKS_QUERY, tags: ["artwork"] })) ??
    []
  );
}

export async function getCommissionedArtworks(): Promise<ArtworkSummary[]> {
  if (isDemoMode) return demoArtworks.filter((artwork) => artwork.commissioned);
  return (
    (await sanityFetch<ArtworkSummary[]>({
      query: COMMISSIONED_ARTWORKS_QUERY,
      tags: ["artwork"],
    })) ?? []
  );
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  if (isDemoMode) return getDemoArtworkBySlug(slug);
  return await sanityFetch<Artwork>({
    query: ARTWORK_BY_SLUG_QUERY,
    params: { slug },
    tags: ["artwork"],
  });
}

export async function getArtworkSlugs(): Promise<{ slug: string }[]> {
  if (isDemoMode) return demoArtworks.map((artwork) => ({ slug: artwork.slug.current }));
  return (await sanityFetch<{ slug: string }[]>({ query: ARTWORK_SLUGS_QUERY })) ?? [];
}

export async function getAdjacentArtworks(id: string, year: number) {
  if (isDemoMode) {
    const index = demoArtworks.findIndex((artwork) => artwork._id === id);
    return {
      previous: index > 0 ? demoArtworks[index - 1] : null,
      next: index >= 0 && index < demoArtworks.length - 1 ? demoArtworks[index + 1] : null,
    };
  }

  const result = await sanityFetch<{
    previous: ArtworkSummary | null;
    next: ArtworkSummary | null;
  }>({
    query: ADJACENT_ARTWORKS_QUERY,
    params: { id, year },
    tags: ["artwork"],
  });

  return result ?? { previous: null, next: null };
}

export async function getBiography(): Promise<Biography | null> {
  if (isDemoMode) return demoBiography;
  return await sanityFetch<Biography>({ query: BIOGRAPHY_QUERY, tags: ["biography"] });
}

export async function getCvEntries(): Promise<CvEntry[]> {
  return (await sanityFetch<CvEntry[]>({ query: CV_ENTRIES_QUERY, tags: ["cvEntry"] })) ?? [];
}

export async function getExhibitions(): Promise<Exhibition[]> {
  if (isDemoMode) return demoExhibitions;
  return (
    (await sanityFetch<Exhibition[]>({ query: EXHIBITIONS_QUERY, tags: ["exhibition"] })) ?? []
  );
}

export async function getRecentExhibitions(): Promise<Exhibition[]> {
  if (isDemoMode) return demoExhibitions.slice(0, 3);
  return (
    (await sanityFetch<Exhibition[]>({
      query: RECENT_EXHIBITIONS_QUERY,
      tags: ["exhibition"],
    })) ?? []
  );
}

export async function getExhibitionBySlug(slug: string): Promise<Exhibition | null> {
  if (isDemoMode) {
    return demoExhibitions.find((exhibition) => exhibition.slug.current === slug) ?? null;
  }

  const exhibition = await sanityFetch<Exhibition>({
    query: EXHIBITION_BY_SLUG_QUERY,
    params: { slug },
    tags: ["exhibition", "artwork"],
  });

  if (!exhibition) return null;

  // Dereferencing yields null for any artwork that has since been deleted,
  // so drop those rather than rendering empty cards.
  return {
    ...exhibition,
    artworks: exhibition.artworks?.filter(Boolean) ?? [],
  };
}

export async function getExhibitionSlugs(): Promise<{ slug: string }[]> {
  if (isDemoMode) {
    return demoExhibitions.map((exhibition) => ({ slug: exhibition.slug.current }));
  }
  return (await sanityFetch<{ slug: string }[]>({ query: EXHIBITION_SLUGS_QUERY })) ?? [];
}

export async function getNewsPosts(): Promise<NewsPostSummary[]> {
  return (await sanityFetch<NewsPostSummary[]>({ query: NEWS_POSTS_QUERY, tags: ["newsPost"] })) ?? [];
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  return await sanityFetch<NewsPost>({
    query: NEWS_POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["newsPost"],
  });
}

export async function getNewsSlugs(): Promise<{ slug: string }[]> {
  return (await sanityFetch<{ slug: string }[]>({ query: NEWS_SLUGS_QUERY })) ?? [];
}
