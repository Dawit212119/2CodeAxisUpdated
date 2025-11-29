'use client';

import Link from 'next/link';
import { Code, GraduationCap } from 'lucide-react';

export default function ProjectCtaSection() {
  return (
    <section className="section-padding py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-orange-500 font-bold text-sm tracking-wide mb-4">GET STARTED</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Whether you need a custom project developed or want to enhance your tech skills, we're here to help you succeed.
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
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <Code className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                Submit Your Project
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Have an idea for a project? Let's bring it to life. Our team of experts will work with you to develop custom solutions tailored to your needs.
              </p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                <span>Get Started</span>
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
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <GraduationCap className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                Learn Tech Skills
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Enhance your career with our comprehensive training programs. Learn from industry experts and gain hands-on experience with real-world projects.
              </p>
              <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700">
                <span>Explore Courses</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
            {/* Decorative gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}




