import { defineQuery } from "next-sanity";

const categoryFields = /* groq */ `
  _id,
  title,
  slug,
  order
`;

const artworkCardFields = /* groq */ `
  _id,
  title,
  slug,
  year,
  medium,
  availability,
  commissioned,
  mainImage,
  "category": category->{${categoryFields}}
`;

const artworkFields = /* groq */ `
  ${artworkCardFields},
  dimensions,
  description,
  collection,
  price,
  featured,
  additionalImages,
  seo
`;

export const CATEGORIES_QUERY = defineQuery(
  /* groq */ `*[_type == "category"] | order(order asc, title asc) { ${categoryFields} }`
);

export const ARTWORKS_QUERY = defineQuery(
  /* groq */ `*[_type == "artwork"] | order(year desc, _createdAt desc) { ${artworkCardFields} }`
);

export const ARTWORKS_BY_CATEGORY_QUERY = defineQuery(
  /* groq */ `*[_type == "artwork" && category->slug.current == $categorySlug] | order(year desc, _createdAt desc) { ${artworkCardFields} }`
);

export const FEATURED_ARTWORKS_QUERY = defineQuery(
  /* groq */ `*[_type == "artwork" && featured == true] | order(year desc) [0...8] { ${artworkCardFields} }`
);

export const ARTWORK_BY_SLUG_QUERY = defineQuery(
  /* groq */ `*[_type == "artwork" && slug.current == $slug][0] { ${artworkFields} }`
);

export const ARTWORK_SLUGS_QUERY = defineQuery(
  /* groq */ `*[_type == "artwork" && defined(slug.current)]{ "slug": slug.current }`
);

export const ADJACENT_ARTWORKS_QUERY = defineQuery(
  /* groq */ `{
    "previous": *[_type == "artwork" && year <= $year && _id != $id] | order(year desc, _createdAt desc) [0] { ${artworkCardFields} },
    "next": *[_type == "artwork" && year >= $year && _id != $id] | order(year asc, _createdAt asc) [0] { ${artworkCardFields} }
  }`
);

export const BIOGRAPHY_QUERY = defineQuery(
  /* groq */ `*[_type == "biography"][0] {
    _id, name, portrait, shortBio, biography, artistStatement, email, instagram, seo
  }`
);

export const CV_ENTRIES_QUERY = defineQuery(
  /* groq */ `*[_type == "cvEntry"] | order(year desc) {
    _id, section, title, organization, year, description, url
  }`
);

const exhibitionFields = /* groq */ `
  _id, title, slug, type, venue, city, country, startDate, endDate, description, coverImage, url
`;

export const EXHIBITIONS_QUERY = defineQuery(
  /* groq */ `*[_type == "exhibition"] | order(startDate desc) { ${exhibitionFields} }`
);

export const RECENT_EXHIBITIONS_QUERY = defineQuery(
  /* groq */ `*[_type == "exhibition"] | order(startDate desc) [0...3] { ${exhibitionFields} }`
);

export const EXHIBITION_BY_SLUG_QUERY = defineQuery(
  /* groq */ `*[_type == "exhibition" && slug.current == $slug][0] {
    ${exhibitionFields},
    installationImages,
    "artworks": artworks[]->{ ${artworkCardFields} }
  }`
);

export const EXHIBITION_SLUGS_QUERY = defineQuery(
  /* groq */ `*[_type == "exhibition" && defined(slug.current)]{ "slug": slug.current }`
);

const newsCardFields = /* groq */ `
  _id, title, slug, publishedAt, excerpt, coverImage
`;

export const NEWS_POSTS_QUERY = defineQuery(
  /* groq */ `*[_type == "newsPost"] | order(publishedAt desc) { ${newsCardFields} }`
);

export const NEWS_POST_BY_SLUG_QUERY = defineQuery(
  /* groq */ `*[_type == "newsPost" && slug.current == $slug][0] {
    ${newsCardFields}, body, seo
  }`
);

export const NEWS_SLUGS_QUERY = defineQuery(
  /* groq */ `*[_type == "newsPost" && defined(slug.current)]{ "slug": slug.current }`
);
