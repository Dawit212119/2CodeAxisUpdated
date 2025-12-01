'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Settings, Shield, Code, Users, Network, Lock, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { LucideIcon } from 'lucide-react';
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
}

export default function ServicesSectionClient({ services }: { services: Service[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

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
