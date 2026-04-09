import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Yudha Hafiz — Web Dev, AI & Automation Insights",
  description:
    "Articles by Yudha Hafiz on web development, AI integration, automation, and building impactful digital products.",
  alternates: {
    canonical: "https://yudhahafiz.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-6">
            Articles by Yudha Hafiz
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Insights on web development, AI integration, automation, and building products that matter.
          </p>
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <div className="flex flex-col divide-y divide-zinc-800">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group py-8 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 hover:bg-zinc-900/30 rounded-xl px-4 -mx-4 transition-colors duration-200"
              >
                <div className="shrink-0">
                  <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString("en-US", {
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
                    Read article <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <p>Blog posts coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
