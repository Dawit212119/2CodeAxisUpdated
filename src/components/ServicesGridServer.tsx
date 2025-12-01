import { Suspense } from 'react';
import ServicesGridClient from './ServicesGridClient';
import ServicesGridSkeleton from './ServicesGridSkeleton';

async function fetchServices() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/content-cards?type=service`, {
    next: { 
      revalidate: 60,
      tags: ['services']
    },
  });
  
  if (!res.ok) {
    return [];
  }
  
  const data = await res.json();
  if (data.cards) {
    // Filter by category "Software Solutions" or no category
    return data.cards
      .filter((card: any) => !card.category || card.category === 'Software Solutions')
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
  }
  return [];
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
