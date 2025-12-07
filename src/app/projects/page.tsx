import Link from "next/link";

export const metadata = {
  title: "Projects • CodeAxis",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Projects Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #016B61 0%, #016B61 40%, #70B2B2 100%)",
        }}
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 top-0 w-[60%] h-full opacity-40">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="projects-lines" x1="0" y1="0" x2="1" y2="0">
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
                  stroke="url(#projects-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-[#70B2B2]/80 via-[#016B61]/60 to-transparent rotate-[-35deg]" />
        </div>

        {/* Title + breadcrumb */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Project
          </h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Project</span>
          </nav>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold tracking-widest text-[#016B61] uppercase">
              Our Work
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-[#016B61]">
              Recent Projects & Case Studies
            </h2>
            <p className="mt-4 text-slate-600">
              Explore a selection of solutions we have built for clients across different
              industries, showcasing our expertise in software development and digital
              transformation.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <article
                key={id}
                className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-slate-900/80 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#016B61] via-[#70B2B2] to-[#9ECFD4] opacity-70" />
                  <div className="relative z-10 h-full flex items-end p-5">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/30 mr-3">
                      <span className="text-xl">💡</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Digital Transformation #{id}
                    </h3>
                  </div>
                </div>

                <div className="flex-1 flex flex-col p-6 gap-4">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A tailored software solution designed to streamline operations, improve
                    visibility, and enhance user experience for our client.
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                    <span className="px-3 py-1 rounded-full bg-slate-100">Web App</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100">Cloud</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100">Integration</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">FinTech • 2024</span>
                    <Link
                      href={`/projects/${id}`}
                      className="text-[#016B61] font-semibold hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
