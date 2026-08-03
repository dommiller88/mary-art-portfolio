import type { Dimensions } from "@/types";

export function formatDimensions(dimensions?: Dimensions): string | undefined {
  if (!dimensions?.height || !dimensions?.width) return undefined;

  const { height, width, depth, unit = "cm" } = dimensions;
  const parts = [height, width, depth].filter((n): n is number => typeof n === "number");

  return `${parts.join(" × ")} ${unit}`;
}

export function formatExhibitionDates(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const startLabel = start.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  if (!endDate) return startLabel;

  const end = new Date(endDate);
  const endLabel = end.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
