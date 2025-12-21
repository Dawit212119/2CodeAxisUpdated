"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type FAQ = { q: string; a: string };

const faqs: FAQ[] = [
  {
    q: "What services does Habesha Software Solutions offer?",
    a: "Habesha Software Solutions provides custom software development, IT outsourcing, cloud solutions, system integration, cybersecurity consulting, and tech training programs. We build scalable solutions tailored to your business needs.",
  },
  {
    q: "Do you provide dedicated development teams?",
    a: "Yes. We offer skilled engineers who integrate with your team to accelerate product development and scale your capacity on demand.",
  },
  {
    q: "What industries do you work with?",
    a: "We serve startups, SMEs, and enterprises across fintech, healthcare, e-commerce, education, and SaaS industries worldwide.",
  },
  {
    q: "Do you provide ongoing support and maintenance?",
    a: "Absolutely. We offer SLA-backed support, monitoring, regular updates, and proactive maintenance to keep your systems running smoothly.",
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

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: Illustration */}
          <div className="relative order-2 lg:order-1 h-full flex items-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl min-h-[420px]">
              <Image
                src="https://www.genshifter.com/assets/img/faq/faq3.jpg"
                alt="FAQs Illustration"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              {/* Diagonal wedge to match reference */}
              <div className="absolute inset-y-0 right-0 w-1/3" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 70%)", background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0))" }} />
            </div>
          </div>

          {/* Right: Heading + Accordion */}
          <div className="relative order-1 lg:order-2 lg:min-h-[460px]">
            <p className="uppercase tracking-wide font-bold text-[#016B61]">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-black">
              Got Questions? We&apos;ve Got Answers
            </h2>

            <div className="mt-8 space-y-4">
              {faqs.map((f, i) => (
                <Item key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
