import { GraduationCap } from "lucide-react";
import { defineField, defineType } from "sanity";

export const cvEntryType = defineType({
  name: "cvEntry",
  title: "CV Entry",
  type: "document",
  icon: GraduationCap,
  fields: [
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "education" },
          { title: "Awards & honors", value: "awards" },
          { title: "Publications", value: "publications" },
          { title: "Residencies", value: "residencies" },
          { title: "Collections", value: "collections" },
          { title: "Press", value: "press" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "e.g. MFA in Painting, First Prize — National Drawing Biennial",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "organization",
      title: "Institution / Organization",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Additional detail",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Year, newest first",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "organization", year: "year", section: "section" },
    prepare({ title, subtitle, year, section }) {
      return {
        title,
        subtitle: [section, year, subtitle].filter(Boolean).join(" — "),
      };
    },
  },
});
