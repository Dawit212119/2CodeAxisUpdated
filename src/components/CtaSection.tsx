"use client";

import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="cta-section section-padding fix">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-blue">
        {/* stepped navy band is handled by :before in globals.css */}
        {/* headline */}
        <div className="bg-blue flex flex-col items-center justify-center gap-6">
          <div className="text-black text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-snug">
              Ready to Build
              <br />
              Your Next Solution?
            </h2>
          </div>

          {/* button */}
          <div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-[#016B61] font-semibold rounded-xl px-6 py-4 shadow hover:shadow-md transition cursor-pointer"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
  </div>
        </div>
  
    </section>
  );
}
