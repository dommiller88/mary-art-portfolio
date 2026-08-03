import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/types";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="font-display mt-10 mb-4 text-2xl">{children}</h2>,
    h3: ({ children }) => <h3 className="font-display mt-8 mb-3 text-xl">{children}</h3>,
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-muted-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="font-display my-8 border-l-2 border-foreground pl-6 text-xl italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer noopener"
        className="underline underline-offset-4 hover:text-foreground"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: SanityImage }) => {
      const url = urlForImage(value)?.width(1600).url();
      if (!url) return null;
      return (
        <span className="relative my-8 block aspect-[3/2] w-full overflow-hidden bg-muted">
          <Image src={url} alt={value.alt ?? ""} fill className="object-cover" />
        </span>
      );
    },
  },
};

export function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
