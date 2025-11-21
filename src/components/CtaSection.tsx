"use client";

import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="cta-section section-padding fix">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-blue">
        {/* stepped navy band is handled by :before in globals.css */}

   

     //     {/* headline */}
    <div className="bg-blue">  
          <div className="text-black ">
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-snug">
              Stay Connected With
              <br />
              Cutting Edge IT
            </h2>
          </div>

          {/* button */}
          <div className="justify-self-start lg:justify-self-end">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-[#0e134d] font-semibold rounded-xl px-6 py-4 shadow hover:shadow-md transition"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
  </div>
        </div>
  
    </section>
  );
}
