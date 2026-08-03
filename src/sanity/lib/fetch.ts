import "server-only";

import { client } from "./client";

/**
 * Wraps client.fetch so a temporarily unreachable/unconfigured CMS degrades
 * to an empty result instead of failing the whole page render or build.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<QueryResponse | null> {
  try {
    return await client.fetch<QueryResponse>(query, params, {
      next: { revalidate: tags ? false : 60, tags },
    });
  } catch (error) {
    console.warn("[sanityFetch] query failed:", error);
    return null;
  }
}
