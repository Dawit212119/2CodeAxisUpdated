import { Suspense } from 'react';
import AboutSectionClient from './AboutSectionClient';
import AboutSectionSkeleton from './AboutSectionSkeleton';

async function fetchServices(): Promise<string[]> {
  const res = await fetch('/api/content-cards?type=service', {
    next: { 
      revalidate: 60,
      tags: ['services']
    },
  });
  
  if (!res.ok) {
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
  if (data.cards) {
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
