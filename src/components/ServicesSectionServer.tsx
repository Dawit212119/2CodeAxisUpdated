import { Suspense } from 'react';
import ServicesSectionClient from './ServicesSectionClient';
import ServicesSwiperSkeleton from './ServicesSwiperSkeleton';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  description: string | null;
  iconName: string | null;
  linkUrl: string | null;
  order?: number | null;
}

async function fetchServices(): Promise<ServiceCard[]> {
  const res = await fetch('/api/content-cards?type=service-section', {
    next: { 
      revalidate: 60,
      tags: ['service-section']
    },
  });
  
  if (!res.ok) {
    return [];
  }
  
  const data = await res.json();
  if (data.cards) {
    return (data.cards as ServiceCard[]).sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  return [];
}

async function ServicesData() {
  const services = await fetchServices();
  return <ServicesSectionClient services={services} />;
}

export default function ServicesSectionServer() {
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
          
          {/* Navigation Arrows - will be connected by client component */}
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
          <ServicesData />
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
    </section>
  );
}
