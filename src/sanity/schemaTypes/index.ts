import type { SchemaTypeDefinition } from "sanity";

import { artworkType } from "./documents/artwork";
import { biographyType } from "./documents/biography";
import { categoryType } from "./documents/category";
import { cvEntryType } from "./documents/cvEntry";
import { exhibitionType } from "./documents/exhibition";
import { newsPostType } from "./documents/newsPost";
import { dimensionsType } from "./objects/dimensions";
import { seoType } from "./objects/seo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    artworkType,
    categoryType,
    biographyType,
    exhibitionType,
    cvEntryType,
    newsPostType,
    // objects
    dimensionsType,
    seoType,
  ],
};
