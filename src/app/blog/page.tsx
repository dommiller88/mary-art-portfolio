import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatDate } from "@/lib/format";
import { getNewsPosts } from "@/sanity/lib/fetchers";
import { urlForImage } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest posts, press, and updates.",
};

export default async function BlogPage() {
  const posts = await getNewsPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-32 lg:px-10">
      <SectionHeading eyebrow="Blog" title="Latest posts" />

      <div className="mt-16 divide-y divide-border border-t border-border">
        {posts.map((post, index) => {
          const imageUrl = urlForImage(post.coverImage)?.width(600).height(400).url();

          return (
            <AnimatedSection as="section" key={post._id} delay={Math.min(index * 0.05, 0.2)}>
              <Link
                href={`/blog/${post.slug.current}`}
                className="group grid grid-cols-1 gap-4 py-8 sm:grid-cols-[160px_1fr] sm:gap-8"
              >
                {imageUrl && (
                  <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                    <Image
                      src={imageUrl}
                      alt={post.coverImage?.alt ?? post.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div>
                  <p className="text-label text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                  <h2 className="font-display mt-2 text-xl transition-colors group-hover:text-muted-foreground">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          );
        })}

        {posts.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Blog posts will appear here once added in the CMS.
          </p>
        )}
      </div>
    </div>
  );
}
