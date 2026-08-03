/**
 * Shared between two separate build tools that inline env vars differently:
 * the Next.js app only exposes `NEXT_PUBLIC_*` vars to the client, while the
 * standalone Sanity Studio (built with Sanity's own Vite-based tooling) only
 * exposes `SANITY_STUDIO_*` vars. Each var is set under both prefixes in
 * .env.local so whichever bundler is running finds the one it understands.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  process.env.SANITY_STUDIO_API_VERSION ||
  "2025-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET (or SANITY_STUDIO_DATASET for the Studio build)"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_STUDIO_PROJECT_ID for the Studio build)"
);

export const useCdn = process.env.NODE_ENV === "production";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
