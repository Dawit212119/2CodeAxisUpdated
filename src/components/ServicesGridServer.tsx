import { Suspense } from 'react';
import ServicesGridClient from './ServicesGridClient';
import ServicesGridSkeleton from './ServicesGridSkeleton';
import { getBaseUrl } from '@/lib/get-base-url';

interface ServiceCard {
    id: string;
    title: string;
    description: string | null;
    iconName: string | null;
    linkUrl: string | null;
    imageUrl: string | null;
    category?: string | null;
    order?: number | null;
  }

async function fetchServices(): Promise<ServiceCard[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/content-cards?type=service` : '/api/content-cards?type=service';
    const res = await fetch(url, {
      cache: 'no-store', // Force fresh data on each request (SSR)
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch services: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data = await res.json();
    if (data.cards && Array.isArray(data.cards)) {
      // Filter by category "Software Solutions" or no category
      return (data.cards as ServiceCard[])
        .filter((card) => !card.category || card.category === 'Software Solutions')
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    return [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

async function ServicesData() {
  const services = await fetchServices();
  return <ServicesGridClient services={services} />;
}

export default function ServicesGridServer() {
  return (
    <section className="section-padding py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Software Solutions
          </h2>
          <p className="text-lg text-slate-600">
            Comprehensive IT services to empower your business
          </p>
        </div>

        <Suspense fallback={<ServicesGridSkeleton />}>
          <ServicesData />
        </Suspense>
      </div>
    </section>
  );
}
