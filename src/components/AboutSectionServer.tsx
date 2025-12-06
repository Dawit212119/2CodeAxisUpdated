import { Suspense } from 'react';
import AboutSectionClient from './AboutSectionClient';
import AboutSectionSkeleton from './AboutSectionSkeleton';
import { getBaseUrl } from '@/lib/get-base-url';

async function fetchServices(): Promise<string[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/content-cards?type=service` : '/api/content-cards?type=service';
    const res = await fetch(url, {
      cache: 'no-store', // Force fresh data on each request (SSR)
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch services: ${res.status} ${res.statusText}`);
      return [
        'Managed Services',
        'Cybersecurity Services',
        'Software Development',
        'Training And Development',
        'Infrastructure Services',
        'System Integration',
      ];
    }
    
    const data = await res.json();
    if (data.cards && Array.isArray(data.cards)) {
      return data.cards.map((card: { title: string }) => card.title);
    }
    
    return [
      'Managed Services',
      'Cybersecurity Services',
      'Software Development',
      'Training And Development',
      'Infrastructure Services',
      'System Integration',
    ];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [
      'Managed Services',
      'Cybersecurity Services',
      'Software Development',
      'Training And Development',
      'Infrastructure Services',
      'System Integration',
    ];
  }
}

async function AboutData() {
  const services = await fetchServices();
  return <AboutSectionClient services={services} />;
}

export default function AboutSectionServer() {
  return (
    <Suspense fallback={<AboutSectionSkeleton />}>
      <AboutData />
    </Suspense>
  );
}
