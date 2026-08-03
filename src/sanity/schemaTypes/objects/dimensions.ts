import { defineField, defineType } from "sanity";

export const dimensionsType = defineType({
  name: "dimensions",
  title: "Dimensions",
  type: "object",
  fields: [
    defineField({
      name: "height",
      title: "Height",
      type: "number",
    }),
    defineField({
      name: "width",
      title: "Width",
      type: "number",
    }),
    defineField({
      name: "depth",
      title: "Depth",
      type: "number",
    }),
    defineField({
      name: "unit",
      title: "Unit",
      type: "string",
      options: {
        list: [
          { title: "cm", value: "cm" },
          { title: "in", value: "in" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "cm",
    }),
  ],
  options: {
    columns: 4,
  },
});
