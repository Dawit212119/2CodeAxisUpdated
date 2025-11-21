import Link from "next/link";
import { redirect } from "next/navigation";
import SubmitProjectForm from "@/components/SubmitProjectForm";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "Submit Project • GenShifter",
};

export default async function SubmitProjectPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login?redirect=/submit-project");
  }
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
                <linearGradient id="submit-project-lines" x1="0" y1="0" x2="1" y2="0">
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
                  stroke="url(#submit-project-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-indigo-600/80 via-indigo-700/60 to-transparent rotate-[-35deg]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Submit Project
          </h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Submit Project</span>
          </nav>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-start">
          {/* Left: Intro text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e134d] mb-4">
              Tell Us About Your Project
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-6">
              Share a few details about your idea, requirements, and timeline. Our team will review your
              submission and get back to you with next steps.
            </p>
            <ul className="space-y-3 text-slate-600 text-sm md:text-base mb-6">
              <li>• What problem are you trying to solve?</li>
              <li>• Who will use the solution?</li>
              <li>• What is your ideal launch timeline and budget range?</li>
            </ul>
            <p className="text-slate-600 text-sm">
              Prefer email? Reach us at
              <span className="font-semibold"> projects@genshifter.com</span>.
            </p>
          </div>

          {/* Right: Form */}
          <SubmitProjectForm />
        </div>
      </section>
    </div>
  );
}
