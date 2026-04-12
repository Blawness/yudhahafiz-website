import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, Calendar } from "lucide-react";
import { getDictionary, locales, defaultLocale, type Locale } from "@/dictionaries";

interface BlogPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://yudhahafiz.com";

  return {
    title: dict.metadata.blog.title,
    description: dict.metadata.blog.description,
    alternates: {
      canonical: locale === "id" ? `${baseUrl}/blog` : `${baseUrl}/en/blog`,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const d = dict.blogPage;
  const prefix = locale === "en" ? "/en" : "";

  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            {d.label}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6">{d.title}</h1>
          <p className="text-zinc-400 max-w-xl mx-auto">{d.subtitle}</p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="flex flex-col divide-y divide-zinc-800">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`${prefix}/blog/${post.slug}`}
                className="group py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 hover:bg-zinc-900/30 rounded-xl px-4 -mx-4 transition-colors duration-200"
              >
                <div className="shrink-0">
                  <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-3">{post.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-cyan-400 font-medium group-hover:gap-2 transition-all">
                    {d.readArticle} <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <p>{d.noPosts}</p>
          </div>
        )}
      </div>
    </div>
  );
}
