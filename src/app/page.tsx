'use client';

import { Play } from 'lucide-react';
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
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-orange-500 font-bold text-sm tracking-wide">BEST IT SOLUTION PROVIDER</span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Delivering Superior Services <span className="text-orange-500">IT Solutions.</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              CodeAxis Technologies is a U.S.-based IT company headquartered in Seattle, Washington, with a growing branch in Addis Ababa, Ethiopia. As a product- and service-based company, we specialize in driving digital transformation for both public and private sector clients. Our clients range from startups and small businesses to global enterprises. Since our inception, we have been committed to delivering high-quality software and IT solutions.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded transition-colors duration-200 flex items-center gap-2">
                Explore More →
              </button>
              <button className="flex items-center gap-3 text-slate-900 hover:text-blue-600 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                  <Play className="w-5 h-5 text-blue-500 ml-1" />
                </div>
                <span className="font-semibold">About Us</span>
              </button>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="hidden md:block relative h-96 lg:h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="https://www.genshifter.com/assets/img/hero/hero-1.png"
                alt="CodeAxis Hero"
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
