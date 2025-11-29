'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  description: string;
  linkUrl: string | null;
  date: string;
  minutesToRead: number | null;
};

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch('/api/blog-posts');
        const data = await res.json();
        if (res.ok && data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #016B61 0%, #016B61 40%, #70B2B2 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 top-0 w-[60%] h-full opacity-40">
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="blog-lines" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#70B2B2" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#9ECFD4" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d={`M${-200 + i * 30},0 C ${200 + i * 40},150 ${400 + i * 40},450 ${800 +
                    i * 40},600`}
                  fill="none"
                  stroke="url(#blog-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-[#70B2B2]/80 via-[#016B61]/60 to-transparent rotate-[-35deg]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Blogs</h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Blogs</span>
          </nav>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#016B61] mb-4">
              Insights from the CodeAxis Team
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Stay up to date with practical guides, case studies, and perspectives on software development,
              infrastructure, security, and digital transformation.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-600">Loading blog posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-slate-600">No blog posts available at the moment.</div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
                  <p className="text-xs font-medium text-slate-500 mb-1">
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {post.minutesToRead ? `${post.minutesToRead} min read` : ''}
                  </p>
                  <h3 className="text-lg font-bold text-[#016B61] mb-2">{post.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{post.description}</p>
                  {post.linkUrl ? (
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center text-sm font-semibold text-[#016B61] hover:text-[#70B2B2] cursor-pointer"
                    >
                      Read More
                    </a>
                  ) : (
                    <span className="mt-auto inline-flex items-center text-sm font-semibold text-slate-400">
                      Read More
                    </span>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
