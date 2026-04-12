import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { getDictionary, locales, defaultLocale, type Locale } from "@/dictionaries";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    for (const post of posts) {
      params.push({ lang, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const baseUrl = "https://yudhahafiz.com";
  const canonical = locale === "id" ? `${baseUrl}/blog/${slug}` : `${baseUrl}/en/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Yudha Hafiz"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const d = dict.blogPage;
  const prefix = locale === "en" ? "/en" : "";

  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href={`${prefix}/blog`}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          {d.backToBlog}
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
            <Calendar size={12} />
            {new Date(post.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-zinc-400">{post.description}</p>
        </div>

        <hr className="border-zinc-800 mb-10" />

        {/* Content */}
        <article
          className="prose prose-invert prose-zinc max-w-none
            prose-headings:font-bold prose-headings:text-zinc-100
            prose-p:text-zinc-400 prose-p:leading-relaxed
            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-zinc-200
            prose-code:text-cyan-300 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
            prose-blockquote:border-l-cyan-500 prose-blockquote:text-zinc-400
            prose-li:text-zinc-400
            prose-hr:border-zinc-800"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800 text-center">
          <p className="text-sm text-zinc-500 mb-4">
            {d.writtenBy}{" "}
            <Link href={`${prefix}/about`} className="text-cyan-400 hover:underline">
              Yudha Hafiz
            </Link>
          </p>
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={14} />
            {d.backToAll}
          </Link>
        </div>
      </div>
    </div>
  );
}
