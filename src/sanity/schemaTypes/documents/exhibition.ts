import { CalendarDays } from "lucide-react";
import { defineField, defineType } from "sanity";

export const exhibitionType = defineType({
  name: "exhibition",
  title: "Exhibition",
  type: "document",
  icon: CalendarDays,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Exhibition type",
      type: "string",
      options: {
        list: [
          { title: "Solo", value: "solo" },
          { title: "Group", value: "group" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "group",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "installationImages",
      title: "Installation photographs",
      type: "array",
      description:
        "Photos from the exhibition itself — installation shots, the opening, the space.",
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
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "artworks",
      title: "Works shown",
      type: "array",
      description:
        "The pieces included in this exhibition. Each links through to its own artwork page.",
      of: [{ type: "reference", to: [{ type: "artwork" }] }],
    }),
    defineField({
      name: "url",
      title: "External link",
      type: "url",
      description: "Optional link to the venue's own page for this exhibition.",
    }),
  ],
  orderings: [
    {
      title: "Start date, newest first",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      venue: "venue",
      city: "city",
      startDate: "startDate",
      media: "coverImage",
    },
    prepare({ title, venue, city, startDate, media }) {
      const year = startDate ? new Date(startDate).getFullYear() : undefined;
      return {
        title,
        subtitle: [year, venue, city].filter(Boolean).join(" — "),
        media,
      };
    },
  },
});
