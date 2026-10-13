import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/shared/animated-section";
import { RichText } from "@/components/shared/portable-text";
import { formatDate } from "@/lib/format";
import { getNewsPostBySlug, getNewsSlugs } from "@/sanity/lib/fetchers";
import { urlForImage } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) return {};

  const imageUrl = urlForImage(post.coverImage)?.width(1200).height(630).url();

  return {
    title: post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    openGraph: imageUrl ? { images: [{ url: imageUrl }] } : undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) notFound();

  const imageUrl = urlForImage(post.coverImage)?.width(1600).height(900).url();

  return (
    <div className="mx-auto max-w-3xl px-6 py-32 lg:px-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to blog
      </Link>

      <AnimatedSection>
        <p className="mt-8 text-label text-muted-foreground">
          {formatDate(post.publishedAt)}
        </p>
        <h1 className="font-display mt-3 text-3xl sm:text-4xl">{post.title}</h1>

        {imageUrl && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={post.coverImage?.alt ?? post.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-10">
          <RichText value={post.body} />
        </div>
      </AnimatedSection>
    </div>
  );
}
