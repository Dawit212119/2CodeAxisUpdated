import Link from "next/link";

export const metadata = {
  title: "Careers • CodeAxis",
};

const roles = [
  {
    title: "Senior Full-Stack Engineer",
    location: "Remote / Seattle, WA",
    type: "Full-time",
    summary:
      "Lead the design and delivery of scalable web applications using modern JavaScript frameworks and cloud-native architectures.",
  },
  {
    title: "Cloud & DevOps Engineer",
    location: "Addis Ababa, Ethiopia",
    type: "Full-time",
    summary:
      "Build and maintain CI/CD pipelines, observability, and secure infrastructure for our products and client projects.",
  },
  {
    title: "Business Analyst",
    location: "Remote",
    type: "Contract / Full-time",
    summary:
      "Work with clients to translate business needs into clear requirements and help guide solution design.",
  },
];

export default function CareersPage() {
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
                <linearGradient id="careers-lines" x1="0" y1="0" x2="1" y2="0">
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
                  stroke="url(#careers-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-indigo-600/80 via-indigo-700/60 to-transparent rotate-[-35deg]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Careers</h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Careers</span>
          </nav>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#016B61] mb-4">
              Join the CodeAxis Team
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              We are always looking for curious, driven people who are passionate about technology and
              delivering real impact for our clients. Explore our open roles below or send us your
              profile for future opportunities.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-[#016B61] mb-2">{role.title}</h3>
                  <p className="text-sm text-slate-500 mb-3">
                    {role.location} • {role.type}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{role.summary}</p>
                </div>
                <button className="self-start mt-2 inline-flex items-center justify-center rounded-lg bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-4 py-2 text-sm shadow-sm transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-600">
            <p>
              Don&apos;t see a perfect fit? Send your resume and a short note to
              <span className="font-semibold"> dawitworkye794@gmail.com</span>.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-[#016B61] text-[#016B61] hover:bg-[#016B61] hover:text-white font-semibold px-4 py-2 transition-colors"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
