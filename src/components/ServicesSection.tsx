'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Settings, Shield, Code, Users, Network, Lock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import { Navigation, Autoplay, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import ServicesSwiperSkeleton from './ServicesSwiperSkeleton';
import 'swiper/css';
import 'swiper/css/navigation';

const iconMap: { [key: string]: LucideIcon } = {
  Settings,
  Shield,
  Code,
  Users,
  Network,
  Lock,
};

interface Service {
  id: string;
  title: string;
  description: string | null;
  iconName: string | null;
  linkUrl: string | null;
  order?: number | null;
}

// Server component for fetching data
async function fetchServices(): Promise<Service[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/content-cards?type=service-section`, {
    next: { 
      revalidate: 60,
      tags: ['service-section']
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }
  
  const data = await res.json();
  if (data.cards) {
    return (data.cards as Service[]).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return [];
}

// Client component for Swiper
function ServicesSwiper({ services }: { services: Service[] }) {
  const swiperRef = React.useRef<SwiperType | null>(null);
 

  if (services.length === 0) {
    return (
      <div className="flex h-96 bg-white rounded-lg items-center justify-center text-slate-600">
        No services available at the moment.
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => {
        if (swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.stop();
        }
      }}
      onMouseLeave={() => {
        if (swiperRef.current?.autoplay) {
          swiperRef.current.autoplay.start();
        }
      }}
    >
      <Swiper
        modules={[Navigation, Autoplay, Mousewheel]}
        spaceBetween={24}
        speed={600}
        navigation={false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 32,
          },
        }}
        className="services-swiper"
      >
        {services.map((service) => {
          const Icon = service.iconName && iconMap[service.iconName] ? iconMap[service.iconName] : Settings;
          const href = service.linkUrl || `/service-details?title=${service.id}`;
          return (
            <SwiperSlide key={service.id}>
              <Link
                href={href}
                className="group relative flex h-96 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500 ease-out transform origin-top group-hover:scale-y-100 scale-y-0 z-10"></div>

                <div className="relative p-8 h-full flex flex-col justify-between z-20 w-full">
                  <div>
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-[#E5E9C5] rounded-lg flex items-center justify-center group-hover:bg-[#9ECFD4] transition-colors">
                        <Icon className="w-8 h-8 text-[#016B61] group-hover:text-[#016B61] transition-colors" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>
                    
                    {service.description && (
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-slate-200 transition-colors">
                        {service.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-900 font-semibold group-hover:text-[#016B61] transition-colors">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

// Better approach: Use a wrapper that fetches on the server
export default function ServicesSection() {
  return (
    <section className="section-padding py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Static content shows immediately */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-[#016B61] font-bold text-sm tracking-wide mb-4">OUR SERVICES</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
              Empowering Your Business<br />With Expert IT Solutions
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button className="swiper-button-prev-custom w-12 h-12 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <button className="swiper-button-next-custom w-12 h-12 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer">
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Services Carousel with Suspense */}
        <Suspense fallback={<ServicesSwiperSkeleton />}>
          <ServicesSwiperWrapper />
        </Suspense>

        {/* CTA Section - Static */}
        <div className="text-center py-12 border-t border-slate-200 mt-12">
          <p className="text-slate-700 text-lg mb-4">
            Need Any Kind Of IT Solution For Your Business?
          </p>
          <Link 
            href="/services"
            className="inline-block bg-[#016B61] hover:bg-[#70B2B2] text-white font-bold py-3 px-8 rounded transition-colors duration-200 cursor-pointer"
          >
            Explore All Services
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .services-swiper {
          cursor: grab;
        }

        .services-swiper:active {
          cursor: grabbing;
        }

        .services-swiper .swiper-slide {
          cursor: grab;
        }

        .services-swiper .swiper-slide:active {
          cursor: grabbing;
        }

        .swiper-button-prev-custom:hover svg,
        .swiper-button-next-custom:hover svg {
          color: white;
        }
      `}</style>
    </section>
  );
}

// Wrapper component that fetches data
async function ServicesSwiperWrapper() {
  const services = await fetchServices();
  return <ServicesSwiper services={services} />;
}
