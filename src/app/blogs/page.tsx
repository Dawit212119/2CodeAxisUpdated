import Link from "next/link";

export const metadata = {
  title: "Blogs • CodeAxis",
};

const posts = [
  {
    title: "Modernizing Legacy Systems: A Practical Roadmap",
    date: "Oct 10, 2025",
    readTime: "7 min read",
    summary:
      "Key steps and considerations for upgrading critical legacy applications without disrupting your business.",
  },
  {
    title: "Building Secure Cloud-Native Applications",
    date: "Sep 22, 2025",
    readTime: "6 min read",
    summary:
      "Best practices for security-by-design when you are deploying workloads to AWS, Azure, or other clouds.",
  },
  {
    title: "Why System Integration Matters More Than Ever",
    date: "Aug 30, 2025",
    readTime: "5 min read",
    summary:
      "How unified data flows and integrated platforms unlock better decision-making and automation.",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #020617 0%, #020617 40%, #0b3bbf 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 top-0 w-[60%] h-full opacity-40">
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="blog-lines" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
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

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-indigo-600/80 via-indigo-700/60 to-transparent rotate-[-35deg]" />
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e134d] mb-4">
              Insights from the CodeAxis Team
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Stay up to date with practical guides, case studies, and perspectives on software development,
              infrastructure, security, and digital transformation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <article key={post.title} className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
                <p className="text-xs font-medium text-slate-500 mb-1">
                  {post.date} • {post.readTime}
                </p>
                <h3 className="text-lg font-bold text-[#0e134d] mb-2">{post.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{post.summary}</p>
                <button className="mt-auto inline-flex items-center text-sm font-semibold text-[#ea8c06] hover:text-[#c46e04]">
                  Read More
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
