'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Settings, Shield, Code, Users, Network, Lock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const iconMap: { [key: string]: any } = {
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

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/content-cards?type=service');
        const data = await res.json();
        if (res.ok && data.cards) {
          setServices(data.cards);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);


  return (
    <section className="section-padding py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-orange-500 font-bold text-sm tracking-wide mb-4">IT SERVICES</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
              We Solve IT Problems<br />With Technology
            </h2>
          </div>
          
          {/* Navigation Arrows - Visible on all screen sizes */}
          <div className="flex gap-4">
            <button 
              ref={prevButtonRef}
              onClick={() => swiperRef.current?.slidePrev()}
              className="swiper-button-prev-custom w-12 h-12 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <button 
              ref={nextButtonRef}
              onClick={() => swiperRef.current?.slideNext()}
              className="swiper-button-next-custom w-12 h-12 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Services Carousel */}
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
          {loading ? (
            <SwiperSlide>
              <div className="flex h-96 bg-white rounded-lg items-center justify-center text-slate-600">
                Loading services...
              </div>
            </SwiperSlide>
          ) : services.length === 0 ? (
            <SwiperSlide>
              <div className="flex h-96 bg-white rounded-lg items-center justify-center text-slate-600">
                No services available at the moment.
              </div>
            </SwiperSlide>
          ) : (
            services.map((service) => {
              const Icon = service.iconName && iconMap[service.iconName] ? iconMap[service.iconName] : Settings;
              const href = service.linkUrl || `/service-details?title=${service.id}`;
              return (
                <SwiperSlide key={service.id}>
                  <Link
                    href={href}
                    className="cursor-pointer"
                    className="group relative flex h-96 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    {/* Black overlay that slides from top to bottom on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500 ease-out transform origin-top group-hover:scale-y-100 scale-y-0 z-10"></div>

                    {/* Content */}
                    <div className="relative p-8 h-full flex flex-col justify-between z-20 w-full">
                      <div>
                        <div className="mb-6">
                          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                            <Icon className="w-8 h-8 text-blue-500 group-hover:text-orange-500 transition-colors" />
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
                      
                      <div className="flex items-center gap-2 text-slate-900 font-semibold group-hover:text-orange-400 transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })
          )}
          </Swiper>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-slate-200 mt-12">
          <p className="text-slate-700 text-lg mb-4">
            Need Any Kind Of IT Solution For Your Business?
          </p>
          <Link 
            href="/services"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded transition-colors duration-200 cursor-pointer"
          >
            View Services
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
