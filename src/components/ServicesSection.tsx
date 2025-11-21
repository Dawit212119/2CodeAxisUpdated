'use client';

import Link from 'next/link';
import { Settings, Shield, Code, Users, Network, Lock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ServicesSection() {
  const services = [
    {
      id: 'managed-services',
      title: 'Managed Services',
      description: 'At GenShifter Technologies, our Managed Services are designed to ensure your business operates smoothly and efficiently.',
      icon: Settings,
    },
    {
      id: 'cybersecurity-services',
      title: 'Cybersecurity Services',
      description: 'At GenShifter Technologies, our Cybersecurity Services are designed to provide robust protection against...',
      icon: Shield,
    },
    {
      id: 'software-development',
      title: 'Software Development',
      description: 'At GenShifter Technologies, we offer a comprehensive range of software development solutions tailored to...',
      icon: Code,
    },
    {
      id: 'training-development',
      title: 'Training And Development',
      description: 'At GenShifter Technologies, our Training and Development Services are designed to empower your team with...',
      icon: Users,
    },
    {
      id: 'infrastructure-services',
      title: 'Infrastructure Services',
      description: 'At GenShifter Technologies, our Infrastructure Services are designed to provide a robust and scalable...',
      icon: Network,
    },
    {
      id: 'system-integration',
      title: 'System Integration',
      description: 'At GenShifter Technologies, our System Integration services are designed to seamlessly connect your...',
      icon: Lock,
    },
  ];

  return (
    <section className="section-padding py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-orange-500 font-bold text-sm tracking-wide mb-4">IT SERVICES</p>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              We Solve IT Problems<br />With Technology
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button className="swiper-button-prev-custom w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="swiper-button-next-custom w-12 h-12 rounded-full border-2 border-slate-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Services Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={3}
          spaceBetween={32}
          speed={600}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="services-swiper"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <SwiperSlide key={service.id}>
                <Link
                  href={`/service-details?title=${service.id}`}
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
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-slate-200 transition-colors">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-900 font-semibold group-hover:text-orange-400 transition-colors">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-slate-200 mt-12">
          <p className="text-slate-700 text-lg">
            Need Any Kind Of IT Solution For Your Business?{' '}
            <Link href="/services" className="text-orange-500 font-semibold hover:underline">
              View Services
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
