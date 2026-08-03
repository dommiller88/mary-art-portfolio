/**
 * Seeds example content into Sanity so the site has something to render
 * immediately after setup. Safe to re-run: every document uses a fixed
 * _id, so re-running updates the same records instead of duplicating them.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npm run seed
 */
import { config } from "dotenv";

import { createClient, type SanityClient } from "@sanity/client";

// Next.js convention is .env.local, but plain `dotenv/config` only reads
// .env by default — load .env.local explicitly (falls back to .env).
config({ path: ".env.local" });
config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.\n" +
      "Create a write token at https://www.sanity.io/manage (API > Tokens) and set it in .env.local."
  );
  process.exit(1);
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function uploadImageFromUrl(url: string, filename: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

function imageField(assetId: string, alt: string) {
  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: assetId },
    alt,
  };
}

const categories = [
  { _id: "seed-category-paintings", title: "Paintings", slug: "paintings", order: 0 },
  { _id: "seed-category-drawings", title: "Drawings", slug: "drawings", order: 1 },
  { _id: "seed-category-prints", title: "Prints", slug: "prints", order: 2 },
  { _id: "seed-category-digital", title: "Digital", slug: "digital", order: 3 },
  { _id: "seed-category-photography", title: "Photography", slug: "photography", order: 4 },
  { _id: "seed-category-sculpture", title: "Sculpture", slug: "sculpture", order: 5 },
];

const artworks = [
  {
    _id: "seed-artwork-quiet-harbor",
    title: "Quiet Harbor",
    slug: "quiet-harbor",
    categoryId: "seed-category-paintings",
    year: 2024,
    medium: "Oil on canvas",
    dimensions: { height: 91, width: 122, unit: "cm" },
    availability: "available",
    featured: true,
    seedImage: "https://picsum.photos/seed/quiet-harbor/1600/2000",
  },
  {
    _id: "seed-artwork-afternoon-study",
    title: "Afternoon Study",
    slug: "afternoon-study",
    categoryId: "seed-category-drawings",
    year: 2023,
    medium: "Graphite on paper",
    dimensions: { height: 40, width: 30, unit: "cm" },
    availability: "sold",
    commissioned: true,
    featured: true,
    seedImage: "https://picsum.photos/seed/afternoon-study/1600/2000",
  },
  {
    _id: "seed-artwork-fragment-no-4",
    title: "Fragment No. 4",
    slug: "fragment-no-4",
    categoryId: "seed-category-prints",
    year: 2024,
    medium: "Archival pigment print",
    dimensions: { height: 60, width: 45, unit: "cm" },
    availability: "available",
    featured: true,
    seedImage: "https://picsum.photos/seed/fragment-no-4/1600/2000",
  },
  {
    _id: "seed-artwork-low-tide",
    title: "Low Tide",
    slug: "low-tide",
    categoryId: "seed-category-paintings",
    year: 2022,
    medium: "Oil on canvas",
    dimensions: { height: 76, width: 101, unit: "cm" },
    availability: "not-for-sale",
    commissioned: true,
    featured: false,
    seedImage: "https://picsum.photos/seed/low-tide/1600/2000",
  },
  {
    _id: "seed-artwork-interior-with-window",
    title: "Interior with Window",
    slug: "interior-with-window",
    categoryId: "seed-category-drawings",
    year: 2021,
    medium: "Charcoal on paper",
    dimensions: { height: 50, width: 65, unit: "cm" },
    availability: "available",
    featured: false,
    seedImage: "https://picsum.photos/seed/interior-with-window/1600/2000",
  },
  {
    _id: "seed-artwork-coastline-iii",
    title: "Coastline Series III",
    slug: "coastline-series-iii",
    categoryId: "seed-category-prints",
    year: 2023,
    medium: "Screenprint",
    dimensions: { height: 56, width: 76, unit: "cm" },
    availability: "available",
    featured: true,
    seedImage: "https://picsum.photos/seed/coastline-iii/1600/2000",
  },
];

const cvEntries = [
  {
    _id: "seed-cv-mfa",
    section: "education",
    title: "MFA in Painting",
    organization: "Rhode Island School of Design",
    year: 2016,
  },
  {
    _id: "seed-cv-ba",
    section: "education",
    title: "BA in Studio Art",
    organization: "Oberlin College",
    year: 2012,
  },
  {
    _id: "seed-cv-residency",
    section: "residencies",
    title: "Artist in Residence",
    organization: "Skowhegan School of Painting & Sculpture",
    year: 2019,
  },
  {
    _id: "seed-cv-award",
    section: "awards",
    title: "Emerging Artist Grant",
    organization: "Pollock-Krasner Foundation",
    year: 2021,
  },
  {
    _id: "seed-cv-collection",
    section: "collections",
    title: "Permanent Collection",
    organization: "Portland Museum of Art",
    year: 2022,
  },
  {
    _id: "seed-cv-press",
    section: "press",
    title: "\"Painters to Watch\"",
    organization: "Art in America",
    year: 2023,
    url: "https://example.com",
  },
];

const exhibitions = [
  {
    _id: "seed-exhibition-slow-light",
    title: "Slow Light",
    slug: "slow-light",
    type: "solo",
    venue: "Fieldwork Gallery",
    city: "Portland",
    country: "USA",
    startDate: "2024-09-05",
    endDate: "2024-10-12",
    coverSeedImage: "https://picsum.photos/seed/ex-slow-light/1800/1000",
    installationSeedImages: [
      "https://picsum.photos/seed/install-slow-1/1600/1200",
      "https://picsum.photos/seed/install-slow-2/1600/1200",
      "https://picsum.photos/seed/install-slow-3/1600/1200",
    ],
    artworkIds: [
      "seed-artwork-quiet-harbor",
      "seed-artwork-low-tide",
      "seed-artwork-interior-with-window",
    ],
  },
  {
    _id: "seed-exhibition-new-horizons",
    title: "New Horizons",
    slug: "new-horizons",
    type: "group",
    venue: "The Annex",
    city: "Brooklyn",
    country: "USA",
    startDate: "2024-03-01",
    endDate: "2024-03-24",
    coverSeedImage: "https://picsum.photos/seed/ex-new-horizons/1800/1000",
    installationSeedImages: ["https://picsum.photos/seed/install-nh-1/1600/1200"],
    artworkIds: ["seed-artwork-fragment-no-4", "seed-artwork-coastline-iii"],
  },
  {
    _id: "seed-exhibition-earlier-works",
    title: "Earlier Works: A Survey",
    slug: "earlier-works-a-survey",
    type: "solo",
    venue: "Marlow Contemporary",
    city: "Chicago",
    country: "USA",
    startDate: "2022-06-10",
    endDate: "2022-07-15",
    coverSeedImage: "https://picsum.photos/seed/ex-earlier-works/1800/1000",
    installationSeedImages: [],
    artworkIds: ["seed-artwork-low-tide"],
  },
];

const newsPosts = [
  {
    _id: "seed-news-slow-light-opening",
    title: "Slow Light opens at Fieldwork Gallery",
    slug: "slow-light-opening",
    publishedAt: "2024-09-01T12:00:00.000Z",
    excerpt: "A new solo exhibition of recent paintings opens this September in Portland.",
    seedImage: "https://picsum.photos/seed/news-slow-light/1600/900",
  },
  {
    _id: "seed-news-residency-announcement",
    title: "Announcing a residency at Skowhegan",
    slug: "skowhegan-residency",
    publishedAt: "2019-05-15T12:00:00.000Z",
    excerpt: "Spending the summer painting and drawing alongside a new community of artists.",
    seedImage: "https://picsum.photos/seed/news-residency/1600/900",
  },
];

async function seed() {
  console.log(`Seeding dataset "${dataset}" on project "${projectId}"...`);

  console.log("Creating categories...");
  for (const category of categories) {
    await client.createOrReplace({
      _id: category._id,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      order: category.order,
    });
  }

  console.log("Uploading artwork images and creating artworks...");
  for (const artwork of artworks) {
    const asset = await uploadImageFromUrl(artwork.seedImage, `${artwork.slug}.jpg`);
    await client.createOrReplace({
      _id: artwork._id,
      _type: "artwork",
      title: artwork.title,
      slug: { _type: "slug", current: artwork.slug },
      category: { _type: "reference", _ref: artwork.categoryId },
      year: artwork.year,
      medium: artwork.medium,
      dimensions: { _type: "dimensions", ...artwork.dimensions },
      availability: artwork.availability,
      commissioned: "commissioned" in artwork ? artwork.commissioned : false,
      featured: artwork.featured,
      mainImage: imageField(asset._id, artwork.title),
      description: [
        {
          _type: "block",
          _key: "desc1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "desc1-span",
              text: `${artwork.title} is a ${artwork.year} work exploring light, memory, and quiet observation.`,
            },
          ],
        },
      ],
    });
  }

  console.log("Creating biography...");
  const portraitAsset = await uploadImageFromUrl(
    "https://picsum.photos/seed/artist-portrait/1200/1500",
    "portrait.jpg"
  );
  await client.createOrReplace({
    _id: "biography",
    _type: "biography",
    name: "Mary Miller",
    portrait: imageField(portraitAsset._id, "Mary Miller"),
    shortBio:
      "Paintings and works on paper exploring light, memory, and the quiet edges of landscape.",
    biography: [
      {
        _type: "block",
        _key: "bio1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "bio1-span",
            text: "Mary Miller is a painter based in Portland, Maine. Her work draws on the landscape of the Northeast coast, examining how light and memory shape our sense of place.",
          },
        ],
      },
    ],
    artistStatement: [
      {
        _type: "block",
        _key: "statement1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "statement1-span",
            text: "I am interested in the moments just before and after — the quiet edges of a scene where light is changing and memory starts to blur with observation.",
          },
        ],
      },
    ],
    email: "studio@marymiller.art",
    instagram: "https://instagram.com",
  });

  console.log("Creating CV entries...");
  for (const entry of cvEntries) {
    await client.createOrReplace({
      _id: entry._id,
      _type: "cvEntry",
      section: entry.section,
      title: entry.title,
      organization: entry.organization,
      year: entry.year,
      url: "url" in entry ? entry.url : undefined,
    });
  }

  console.log("Uploading exhibition images and creating exhibitions...");
  for (const exhibition of exhibitions) {
    const coverAsset = await uploadImageFromUrl(
      exhibition.coverSeedImage,
      `${exhibition.slug}-cover.jpg`
    );

    const installationImages = [];
    for (const [index, url] of exhibition.installationSeedImages.entries()) {
      const asset = await uploadImageFromUrl(url, `${exhibition.slug}-install-${index + 1}.jpg`);
      installationImages.push({
        ...imageField(asset._id, `${exhibition.title}, installation view ${index + 1}`),
        _key: `install-${index + 1}`,
      });
    }

    await client.createOrReplace({
      _id: exhibition._id,
      _type: "exhibition",
      title: exhibition.title,
      slug: { _type: "slug", current: exhibition.slug },
      type: exhibition.type,
      venue: exhibition.venue,
      city: exhibition.city,
      country: exhibition.country,
      startDate: exhibition.startDate,
      endDate: exhibition.endDate,
      coverImage: imageField(coverAsset._id, `${exhibition.title} installation view`),
      installationImages,
      artworks: exhibition.artworkIds.map((id, index) => ({
        _type: "reference" as const,
        _ref: id,
        _key: `work-${index + 1}`,
      })),
      description: [
        {
          _type: "block",
          _key: "ex-desc",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "ex-desc-span",
              text: `${exhibition.title} was presented at ${exhibition.venue} in ${exhibition.city}. Replace this placeholder text with the real exhibition statement.`,
            },
          ],
        },
      ],
    });
  }

  console.log("Uploading news images and creating news posts...");
  for (const post of newsPosts) {
    const asset = await uploadImageFromUrl(post.seedImage, `${post.slug}.jpg`);
    await client.createOrReplace({
      _id: post._id,
      _type: "newsPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      publishedAt: post.publishedAt,
      excerpt: post.excerpt,
      coverImage: imageField(asset._id, post.title),
      body: [
        {
          _type: "block",
          _key: "body1",
          style: "normal",
          children: [{ _type: "span", _key: "body1-span", text: post.excerpt }],
        },
      ],
    });
  }

  console.log("Done. Seed content created.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
