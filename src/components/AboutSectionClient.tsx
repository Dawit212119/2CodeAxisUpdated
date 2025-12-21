'use client';

import { Check, Handshake } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function AboutSectionClient({ services }: { services: string[] }) {
  const [count, setCount] = useState(17);

  useEffect(() => {
    if (count < 25) {
      const timer = setTimeout(() => setCount(count + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <section className="section-padding py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Photo Gallery */}
          <div className="relative h-full rounded-lg overflow-hidden shadow-lg flex items-stretch">
            <div className="grid grid-cols-2 gap-2 w-full h-full">
              {/* Large image on left */}
              <div className="row-span-2">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop"
                    alt="Coding workspace"
                    width={600}
                    height={800}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
              </div>
              {/* Top right image */}
              <div>
                <div className="w-full h-full bg-gradient-to-br from-[#016B61] to-[#70B2B2] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
                    alt="Code on screen"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
              </div>
              {/* Bottom right image */}
              <div>
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-500 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
                    alt="Programming"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right - About Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">About Habesha Software Solutions</h2>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-slate-600 text-lg leading-relaxed">
                Habesha Software Solutions is a modern IT solutions and software outsourcing company specializing in custom development, cloud architecture, and dedicated engineering teams. We partner with businesses to build scalable products, optimize operations, and accelerate digital transformation. Our expertise spans software engineering, system integration, and tech consultation—delivering reliable solutions that drive measurable results.
              </p>
            </div>

            {/* Divider with dot */}
            <div className="flex justify-center py-4">
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            </div>

            {/* Services List and Stats */}
            <div className="space-y-6">
              {/* Services with vertical separators */}
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-3">
                {services.length > 0 ? (
                  services.map((service, index) => (
                    <div key={index} className="flex items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-slate-900 flex-shrink-0" />
                        <span className="text-slate-700 font-medium text-sm sm:text-base">{service}</span>
                      </div>
                      {/* Vertical separator */}
                      {index < services.length - 1 && (
                        <div className="hidden sm:block w-0.5 h-8 bg-slate-300"></div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-500">No services available</div>
                )}
              </div>

              {/* Divider Line */}
              <div className="flex justify-center py-2">
                <div className="w-full max-w-md border-t border-slate-300"></div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <Handshake className="w-12 h-12 text-[#70B2B2] flex-shrink-0" />
                <div>
                  <div className="text-4xl font-bold text-slate-900">{count}+</div>
                  <div className="text-slate-600 font-medium">Satisfied Clients</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button className="bg-[#016B61] hover:bg-[#70B2B2] text-white font-bold py-3 px-8 rounded transition-colors duration-200 w-full sm:w-auto cursor-pointer">
                Learn More
              </button>
              <Link 
                href="/services"
                className="bg-[#016B61] hover:bg-[#70B2B2] text-white font-bold py-3 px-8 rounded transition-colors duration-200 w-full sm:w-auto text-center cursor-pointer"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

