import Link from "next/link";

export const metadata = {
  title: "Consultation • CodeAxis",
};

export default function ConsultationPage() {
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
                <linearGradient id="consult-lines" x1="0" y1="0" x2="1" y2="0">
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
                  stroke="url(#consult-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-indigo-600/80 via-indigo-700/60 to-transparent rotate-[-35deg]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Consultation
          </h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Consultation</span>
          </nav>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-start">
          {/* Left: Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#016B61] mb-4">
              Schedule a Strategy Session
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-6">
              Whether you are planning a new product, modernizing legacy systems, or looking for a long-term
              technology partner, our experts can help you define the right approach.
            </p>
            <ul className="space-y-3 text-slate-600 text-sm md:text-base mb-6">
              <li>• Understand your current challenges and goals.</li>
              <li>• Explore solution options and technology choices.</li>
              <li>• Get a rough timeline and engagement model.</li>
            </ul>
            <p className="text-slate-600 text-sm">
              Prefer email? Reach us directly at
              <span className="font-semibold"> dawitworkye794@gmail.com</span>.
            </p>
          </div>

          {/* Right: Simple form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-xl font-extrabold text-[#016B61] mb-4">Request Consultation</h3>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] focus:border-transparent bg-slate-50"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] focus:border-transparent bg-slate-50"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company / Organization</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] focus:border-transparent bg-slate-50"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">What would you like to discuss?</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] focus:border-transparent bg-slate-50"
                  placeholder="Briefly describe your project or challenge."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors w-full"
              >
                Submit Request
              </button>
              <p className="text-[11px] text-slate-500 mt-2">
                This form is not wired up yet; hook it to your backend, email service, or form handler as needed.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
