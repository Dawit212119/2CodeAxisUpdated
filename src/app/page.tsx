'use client';

import Link from 'next/link';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import AchievementSection from '@/components/AchievementSection';
import ProjectsSection from '@/components/ProjectsSection';
import ProjectCtaSection from '@/components/ProjectCtaSection';
import TeamMembersSection from '@/components/TeamMembersSection';
import FaqSection from '@/components/FaqSection';
import PartnersSection from '@/components/PartnersSection';
import CtaSection from '@/components/CtaSection';
import TestimonialSection from '@/components/TestimonialSection';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-[#70B2B2] rounded-full"></div>
              <span className="text-[#016B61] font-bold text-sm tracking-wide">MODERN IT SOLUTIONS & SOFTWARE OUTSOURCING</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Transforming Ideas Into <span className="text-[#016B61]">Scalable Digital Solutions</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Code Axis delivers enterprise-grade software development, IT outsourcing, and tech consultation. We help companies scale faster with dedicated engineering teams and innovative solutions.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link 
                href="/about"
                className="bg-[#016B61] hover:bg-[#70B2B2] text-white font-bold py-3 px-8 rounded transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              >
                Start Your Project
              </Link>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="hidden md:block relative h-96 lg:h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/images/hero/cybernetic-hero.png"
                alt="CodeAxis Hero - Cybernetic Developer"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <AboutSection />
      <ServicesSection />
      <AchievementSection />
      <ProjectsSection />
      <ProjectCtaSection />
      <TestimonialSection />
      <TeamMembersSection />
      <FaqSection />
      <PartnersSection />
      <CtaSection />
    </div>
  );
}
