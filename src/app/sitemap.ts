import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/constants";
import {
  getArtworkSlugs,
  getExhibitionSlugs,
  getNewsSlugs,
} from "@/sanity/lib/fetchers";

const staticRoutes = [
  "",
  "/gallery",
  "/commissions",
  "/about",
  "/exhibitions",
  "/blog",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artworkSlugs, exhibitionSlugs, newsSlugs] = await Promise.all([
    getArtworkSlugs(),
    getExhibitionSlugs(),
    getNewsSlugs(),
  ]);

  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified,
    })),
    ...artworkSlugs.map(({ slug }) => ({
      url: `${siteConfig.url}/artwork/${slug}`,
      lastModified,
    })),
    ...exhibitionSlugs.map(({ slug }) => ({
      url: `${siteConfig.url}/exhibitions/${slug}`,
      lastModified,
    })),
    ...newsSlugs.map(({ slug }) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      lastModified,
    })),
  ];
}
