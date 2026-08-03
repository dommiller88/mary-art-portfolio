import { UserRound } from "lucide-react";
import { defineField, defineType } from "sanity";

export const biographyType = defineType({
  name: "biography",
  title: "Biography",
  type: "document",
  icon: UserRound,
  // Rendered as a singleton via the desk structure — see src/sanity/structure.ts
  fields: [
    defineField({
      name: "name",
      title: "Artist name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
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
    }),
    defineField({
      name: "shortBio",
      title: "Short bio",
      type: "text",
      rows: 3,
      description: "A one or two sentence introduction used on the homepage.",
      validation: (rule) => rule.max(280),
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "artistStatement",
      title: "Artist statement",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: { title: "name" },
    prepare({ title }) {
      return { title: title || "Biography" };
    },
  },
});
