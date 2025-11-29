import Link from "next/link";

export const metadata = {
  title: "Contact Us • CodeAxis",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Contact Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #020617 0%, #020617 40%, #0b3bbf 100%)",
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
                <linearGradient id="contact-lines" x1="0" y1="0" x2="1" y2="0">
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
                  stroke="url(#contact-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-indigo-600/80 via-indigo-700/60 to-transparent rotate-[-35deg]" />
        </div>

        {/* Title + breadcrumb */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Contact Us
          </h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Contact Us</span>
          </nav>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-start">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0e134d] mb-4">
              Let&apos;s Talk About Your Next Project
            </h2>
            <p className="text-slate-600 mb-8">
              Fill out the form and our team will get back to you as soon as possible. We&apos;re
              here to help you plan, build, and scale your digital solutions.
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
                    placeholder="+251 920 245 372"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  How can we help?
                </label>
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50">
                  <option>Software Development</option>
                  <option>System Integration</option>
                  <option>CyberSecurity Services</option>
                  <option>Consulting &amp; Strategy</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Project Details
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
                  placeholder="Tell us briefly about your project, timeline, and goals."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#0e134d] text-white rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-extrabold mb-3">Get In Touch</h3>
              <p className="text-sm text-slate-200 mb-5">
                Reach out to us via email, phone, or visit our office. We&apos;re always happy
                to discuss how we can support your business.
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <span className="font-semibold">Email:</span> dawitworkye794@gmail.com
                </li>
                <li>
                  <span className="font-semibold">Phone:</span> +251 920 245 372
                </li>
                <li>
                  <span className="font-semibold">Address:</span> Addis Ababa, Ethiopia
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4 text-sm text-slate-700">
              <h4 className="text-base font-extrabold text-[#0e134d]">Business Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM (EAT)</p>
              <p>Saturday: 9:00 AM - 1:00 PM (EAT)</p>
              <p>Sunday &amp; Holidays: Closed</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md space-y-4 text-sm text-slate-700">
              <h4 className="text-base font-extrabold text-[#0e134d]">Head Office</h4>
              <p>Seattle, Washington, USA</p>
              <p className="text-slate-500 text-xs">
                We operate globally with teams in both the U.S. and Ethiopia, enabling us to
                support clients across time zones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
