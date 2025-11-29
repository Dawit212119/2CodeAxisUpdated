'use client';

import Link from 'next/link';
import { Code, GraduationCap } from 'lucide-react';

export default function ProjectCtaSection() {
  return (
    <section className="section-padding py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#016B61] font-bold text-sm tracking-wide mb-4">LEARN WITH US</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Partner with Code Axis for custom software development or upskill your team with our expert-led training programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* Submit Project Card */}
          <Link
            href="/submit-project"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8 lg:p-10">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#E5E9C5] rounded-xl flex items-center justify-center group-hover:bg-[#016B61] transition-colors">
                  <Code className="w-8 h-8 text-[#016B61] group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#016B61] transition-colors">
                Submit Your Project
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Need a custom solution? Our engineering team builds scalable, high-quality software tailored to your business needs.
              </p>
              <div className="flex items-center text-[#016B61] font-semibold group-hover:text-[#70B2B2]">
                <span>Submit Project</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
            {/* Decorative gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
          </Link>

          {/* Learn Card */}
          <Link
            href="/learn"
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-8 lg:p-10">
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#E5E9C5] rounded-xl flex items-center justify-center group-hover:bg-[#016B61] transition-colors">
                  <GraduationCap className="w-8 h-8 text-[#016B61] group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#016B61] transition-colors">
                Tech Training Programs
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Upskill with hands-on training in software development, cloud, and cybersecurity. Learn from industry professionals.
              </p>
              <div className="flex items-center text-[#016B61] font-semibold group-hover:text-[#70B2B2]">
                <span>Explore Courses</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
            {/* Decorative gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#016B61]/0 to-[#016B61]/0 group-hover:from-[#016B61]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}




