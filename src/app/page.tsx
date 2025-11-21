'use client';

import { Play } from 'lucide-react';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import AchievementSection from '@/components/AchievementSection';
import ProjectsSection from '@/components/ProjectsSection';
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
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Delivering Superior Services <span className="text-orange-500">IT Solutions.</span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              GenShifter Technologies is a U.S.-based IT company headquartered in Seattle, Washington, with a growing branch in Addis Ababa, Ethiopia. As a product- and service-based company, we specialize in driving digital transformation for both public and private sector clients. Our clients range from startups and small businesses to global enterprises. Since our inception, we have been committed to delivering high-quality software and IT solutions.
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

          {/* Right Side - AI Head Illustration */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Gradient background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-blue-600 rounded-3xl opacity-20 blur-2xl"></div>
              
              {/* AI Head Placeholder - using gradient and shapes */}
              <div className="relative w-64 h-80 bg-gradient-to-br from-yellow-400 via-orange-400 to-blue-600 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {/* Inner glow effect */}
                <div className="absolute inset-4 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-2xl opacity-80"></div>
                
                {/* Head shape with circuit pattern effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-56 bg-gradient-to-b from-blue-900 to-slate-900 rounded-full opacity-40 blur-xl"></div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-blue-400 rounded-full opacity-60 blur-lg"></div>
                <div className="absolute bottom-12 right-8 w-20 h-20 bg-cyan-400 rounded-full opacity-50 blur-lg"></div>
              </div>

              {/* Accent line */}
              <div className="absolute right-0 top-1/2 w-1 h-32 bg-gradient-to-b from-blue-600 to-transparent transform translate-x-8"></div>
            </div>
          </div>
        </div>
      </div>

      <AboutSection />
      <ServicesSection />
      <AchievementSection />
      <ProjectsSection />
      <TestimonialSection />
      <TeamMembersSection />
      <FaqSection />
      <PartnersSection />
      <CtaSection />
    </div>
  );
}
