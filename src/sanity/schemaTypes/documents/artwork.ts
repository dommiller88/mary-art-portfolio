import { ImageIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const artworkType = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  icon: ImageIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "images", title: "Images" },
    { name: "details", title: "Details" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "content",
      validation: (rule) => rule.required().min(1900).max(2100),
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      group: "content",
      description: "e.g. Oil on canvas, Graphite on paper, Archival pigment print",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "dimensions",
      group: "details",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
      group: "details",
      description: "e.g. Private collection, New York — leave blank if not applicable",
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Sold", value: "sold" },
          { title: "Not for sale", value: "not-for-sale" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      group: "details",
      description: "Optional, only shown alongside \"Available\" works if you choose to display pricing.",
      hidden: ({ document }) => document?.availability !== "available",
    }),
    defineField({
      name: "commissioned",
      title: "Commissioned work",
      type: "boolean",
      group: "details",
      description:
        "Surfaces this piece under the \"Commissioned\" filter in the gallery. Works can be commissioned in addition to their medium category.",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "images",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "additionalImages",
      title: "Additional images",
      type: "array",
      group: "images",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  orderings: [
    {
      title: "Year, newest first",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Title, A–Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "medium",
      media: "mainImage",
      year: "year",
    },
    prepare({ title, subtitle, media, year }) {
      return {
        title,
        subtitle: [year, subtitle].filter(Boolean).join(" — "),
        media,
      };
    },
  },
});
