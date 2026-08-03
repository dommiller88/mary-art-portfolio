import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

import type { SanityImage } from "@/types";

const imageBuilder = createImageUrlBuilder({ projectId, dataset });

// Demo-mode images use a "local:<public path>" ref instead of a real Sanity
// asset ref — real Sanity refs always start with "image-", so this never
// matches production content. See src/sanity/lib/demo-data.ts.
function localImageBuilder(path: string) {
  const chain = {
    width: () => chain,
    height: () => chain,
    auto: () => chain,
    fit: () => chain,
    url: () => path,
  };
  return chain;
}

export function urlForImage(source: SanityImage | undefined) {
  const ref = source?.asset?._ref;
  if (!ref) {
    return undefined;
  }

  if (ref.startsWith("local:")) {
    return localImageBuilder(ref.slice("local:".length)) as unknown as ReturnType<
      typeof imageBuilder.image
    >;
  }

  return imageBuilder.image(source as SanityImageSource).auto("format").fit("max");
}
