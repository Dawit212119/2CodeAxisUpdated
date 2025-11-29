"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type FAQ = { q: string; a: string };

const faqs: FAQ[] = [
  {
    q: "What Services Does CodeAxis Technologies. Offer?",
    a: "We provide a comprehensive range of IT solutions, including software development, managed services, infrastructure services, system integration, cybersecurity services, and training and development. Additionally, we specialize in ERP systems and school management systems, along with custom web and mobile applications. We tailor solutions to meet various industries' unique needs.",
  },
  {
    q: "Can CodeAxis Software Customize ERP Solutions For My Industry?",
    a: "Yes. We tailor ERP modules to your workflows, data structures, and reporting so adoption is smooth and ROI is clear.",
  },
  {
    q: "How Does The School Management System Help In Streamlining Operations?",
    a: "It centralizes student information, attendance, grading, finance, and communication, reducing manual work and improving accuracy.",
  },
  {
    q: "Do you offer support and maintenance?",
    a: "Yes. We provide SLAs, monitoring, incident response, and regular updates for security and performance.",
  },
];

function Item({ q, a, defaultOpen = false }: FAQ & { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left p-6"
        aria-expanded={open}
      >
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">{q}</h3>
        <ChevronDown className={`shrink-0 h-5 w-5 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 -mt-2 text-slate-600">
          <p>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  return (
    <section className="faq-section section-padding fix">
      {/* Background gradient & subtle lines */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-500" />
      <div className="absolute inset-0 -z-10 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 0, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0, transparent 50%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: Illustration */}
          <div className="relative order-2 lg:order-1 h-full flex items-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl min-h-[420px]">
              <img
                src="https://www.genshifter.com/assets/img/faq/faq3.jpg"
                alt="FAQs Illustration"
                className="w-full h-full object-cover"
              />
              {/* Diagonal wedge to match reference */}
              <div className="absolute inset-y-0 right-0 w-1/3" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 70%)", background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0))" }} />
            </div>
          </div>

          {/* Right: Heading + Accordion */}
          <div className="relative order-1 lg:order-2 lg:min-h-[460px]">
            <p className="uppercase tracking-wide font-bold text-[#ea8c06]">See our FAQs</p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-black">
              Keep Your Business Safe & Ensure High Availability
            </h2>

            <div className="mt-8 space-y-4">
              {faqs.map((f, i) => (
                <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
              >
                Ask
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
