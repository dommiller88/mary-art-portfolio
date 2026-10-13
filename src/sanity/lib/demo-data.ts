/**
 * Local placeholder content for NEXT_PUBLIC_DEMO_MODE=true — lets the site
 * render with real imagery before a Sanity project is connected. Images
 * live in public/demo/. Referenced via a "local:" asset ref that only
 * src/sanity/lib/image.ts recognizes; real Sanity refs never match it.
 */
import type { Artwork, ArtworkSummary, Biography, Category, Exhibition } from "@/types";

function localImage(path: string, alt: string) {
  return { asset: { _ref: `local:${path}`, _type: "reference" as const }, alt };
}

const categories: Category[] = [
  { _id: "demo-category-paintings", title: "Paintings", slug: { current: "paintings" }, order: 0 },
  { _id: "demo-category-drawings", title: "Drawings", slug: { current: "drawings" }, order: 1 },
  { _id: "demo-category-prints", title: "Prints", slug: { current: "prints" }, order: 2 },
];

export const demoCategories = categories;

export const demoArtworks: ArtworkSummary[] = [
  {
    _id: "demo-artwork-quiet-harbor",
    title: "Quiet Harbor",
    slug: { current: "quiet-harbor" },
    year: 2024,
    medium: "Oil on canvas",
    availability: "available",
    mainImage: localImage("/demo/quiet-harbor.jpg", "Quiet Harbor"),
    category: categories[0],
  },
  {
    _id: "demo-artwork-afternoon-study",
    title: "Afternoon Study",
    slug: { current: "afternoon-study" },
    year: 2023,
    medium: "Graphite on paper",
    availability: "sold",
    commissioned: true,
    mainImage: localImage("/demo/afternoon-study.jpg", "Afternoon Study"),
    category: categories[1],
  },
  {
    _id: "demo-artwork-fragment-no-4",
    title: "Fragment No. 4",
    slug: { current: "fragment-no-4" },
    year: 2024,
    medium: "Archival pigment print",
    availability: "available",
    mainImage: localImage("/demo/fragment-no-4.jpg", "Fragment No. 4"),
    category: categories[2],
  },
  {
    _id: "demo-artwork-low-tide",
    title: "Low Tide",
    slug: { current: "low-tide" },
    year: 2022,
    medium: "Oil on canvas",
    availability: "not-for-sale",
    commissioned: true,
    mainImage: localImage("/demo/low-tide.jpg", "Low Tide"),
    category: categories[0],
  },
  {
    _id: "demo-artwork-interior-with-window",
    title: "Interior with Window",
    slug: { current: "interior-with-window" },
    year: 2021,
    medium: "Charcoal on paper",
    availability: "available",
    mainImage: localImage("/demo/interior-with-window.jpg", "Interior with Window"),
    category: categories[1],
  },
  {
    _id: "demo-artwork-coastline-iii",
    title: "Coastline Series III",
    slug: { current: "coastline-iii" },
    year: 2023,
    medium: "Screenprint",
    availability: "available",
    mainImage: localImage("/demo/coastline-iii.jpg", "Coastline Series III"),
    category: categories[2],
  },
];

const artworkDetailOverrides: Record<string, Partial<Artwork>> = {
  "quiet-harbor": {
    dimensions: { height: 91, width: 122, unit: "cm" },
    description: [
      {
        _type: "block",
        _key: "d1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "d1-span",
            text: "Quiet Harbor explores the last light of day settling over water — a study in stillness and reflected color.",
          },
        ],
      },
    ],
  },
};

export function getDemoArtworkBySlug(slug: string): Artwork | null {
  const summary = demoArtworks.find((a) => a.slug.current === slug);
  if (!summary) return null;
  return { ...summary, ...artworkDetailOverrides[slug] };
}

export const demoBiography: Biography = {
  _id: "demo-bio",
  name: "Mary Miller",
  shortBio:
    "Paintings and works on paper exploring light, memory, and the quiet edges of landscape.",
  email: "studio@marymiller.art",
  instagram: "https://instagram.com",
  portrait: localImage("/demo/portrait.jpg", "Mary Miller"),
  biography: [
    {
      _type: "block",
      _key: "b1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "b1-span",
          text: "Mary Miller is a painter based in Portland, Maine, working across oil painting, drawing, and print. This is placeholder demo copy — replace it with the real biography once Sanity is connected.",
        },
      ],
    },
  ],
  artistStatement: [
    {
      _type: "block",
      _key: "s1",
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "s1-span",
          text: "I am interested in the moments just before and after — the quiet edges of a scene where light is changing and memory starts to blur with observation.",
        },
      ],
    },
  ],
};

function demoBlock(key: string, text: string) {
  return {
    _type: "block" as const,
    _key: key,
    style: "normal",
    children: [{ _type: "span" as const, _key: `${key}-span`, text }],
  };
}

export const demoExhibitions: Exhibition[] = [
  {
    _id: "demo-exhibition-slow-light",
    title: "Slow Light",
    slug: { current: "slow-light" },
    type: "solo",
    venue: "Fieldwork Gallery",
    city: "Portland",
    country: "USA",
    startDate: "2026-09-05",
    endDate: "2026-10-12",
    coverImage: localImage("/demo/exhibition-cover-1.jpg", "Slow Light installation view"),
    description: [
      demoBlock(
        "sl1",
        "Slow Light brought together eighteen months of painting and works on paper made along the northeast coast. The works were hung low and widely spaced, letting the room's changing daylight become part of the viewing."
      ),
    ],
    installationImages: [
      localImage("/demo/install-1.jpg", "Slow Light, installation view, east wall"),
      localImage("/demo/install-2.jpg", "Slow Light, installation view, main room"),
      localImage("/demo/install-3.jpg", "Slow Light, opening night"),
    ],
    artworks: [demoArtworks[0], demoArtworks[3], demoArtworks[4]],
  },
  {
    _id: "demo-exhibition-new-horizons",
    title: "New Horizons",
    slug: { current: "new-horizons" },
    type: "group",
    venue: "The Annex",
    city: "Brooklyn",
    country: "USA",
    startDate: "2024-03-01",
    endDate: "2024-03-24",
    coverImage: localImage("/demo/exhibition-cover-2.jpg", "New Horizons installation view"),
    description: [
      demoBlock(
        "nh1",
        "A group exhibition of six painters working with landscape as a starting point rather than a subject."
      ),
    ],
    installationImages: [
      localImage("/demo/install-4.jpg", "New Horizons, installation view"),
    ],
    artworks: [demoArtworks[2], demoArtworks[5]],
  },
  {
    _id: "demo-exhibition-earlier-works",
    title: "Earlier Works: A Survey",
    slug: { current: "earlier-works-a-survey" },
    type: "solo",
    venue: "Marlow Contemporary",
    city: "Chicago",
    country: "USA",
    startDate: "2022-06-10",
    endDate: "2022-07-15",
    // Deliberately no coverImage — exercises the no-cover-image case so it
    // stays verified that nothing falls back to a placeholder/stock image.
    artworks: [demoArtworks[3]],
  },
];
