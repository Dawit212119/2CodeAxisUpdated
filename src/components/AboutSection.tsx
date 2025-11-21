'use client';

import { Check, Phone, Handshake } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AboutSection() {
  const [count, setCount] = useState(17);

  useEffect(() => {
    if (count < 25) {
      const timer = setTimeout(() => setCount(count + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const services = [
    'CyberSecurity Services',
    'System Integration',
    'Software Development',
  ];

  return (
    <section className="section-padding py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Video Placeholder */}
          <div className="relative h-64 lg:h-80 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-0 h-0 border-l-8 border-l-orange-500 border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1"></div>
              </div>
            </div>
            <video
              className="w-full h-full object-cover"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Crect fill='%23e2e8f0' width='1200' height='600'/%3E%3C/svg%3E"
              controls
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right - About Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">About GenShifter</h2>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed">
                GenShifter Technologies is a leading IT company based in Addis Ababa, Ethiopia, dedicated to providing innovative software solutions and services to both national and international clients. Since our inception, we have been committed to delivering high-quality, customized software solutions that meet the unique needs of our clients across various industries. Our team of highly skilled professionals is passionate about technology and innovation. We specialize in a wide range of IT services, including software development, system integration, IT consulting, and project management. Our goal is to help businesses leverage technology to improve efficiency, drive growth, and achieve their objectives.
              </p>
            </div>

            {/* Divider with dot */}
            <div className="flex justify-center py-4">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            </div>

            {/* Services List and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Services */}
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-slate-900 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{service}</span>
                  </div>
                ))}
              </div>

              {/* Divider Line */}
              <div className="hidden md:block border-l-2 border-slate-900"></div>

              {/* Stats */}
              <div className="flex items-center gap-4">
                <Handshake className="w-12 h-12 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="text-4xl font-bold text-slate-900">{count}+</div>
                  <div className="text-slate-600 font-medium">Satisfied Clients</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded transition-colors duration-200 w-full sm:w-auto">
                Explore More →
              </button>
              <button className="flex items-center gap-3 text-slate-900 hover:text-orange-500 transition-colors font-semibold">
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow hover:bg-orange-500">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span>Call Us Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
