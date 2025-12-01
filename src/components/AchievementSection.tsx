'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Lightbulb, Zap, Users, Briefcase } from 'lucide-react';

interface Counter {
  id: string;
  label: string;
  target: number;
  icon: React.ReactNode;
}

export default function AchievementSection() {
  const [counts, setCounts] = useState({
    experts: 0,
    projects: 0,
    clients: 0,
    services: 0,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const counters: Counter[] = [
    {
      id: 'experts',
      label: 'Expert Engineers',
      target: 15,
      icon: <Lightbulb className="w-12 h-12" />,
    },
    {
      id: 'projects',
      label: 'Completed Projects',
      target: 38,
      icon: <Zap className="w-12 h-12" />,
    },
    {
      id: 'clients',
      label: 'Happy Clients',
      target: 25,
      icon: <Users className="w-12 h-12" />,
    },
    {
      id: 'services',
      label: 'Services',
      target: 9,
      icon: <Briefcase className="w-12 h-12" />,
    },
  ];

  const animateCounters = useCallback(() => {
    const duration = 5000; // 5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounts({
        experts: Math.floor(15 * progress),
        projects: Math.floor(38 * progress),
        clients: Math.floor(25 * progress),
        services: Math.floor(9 * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Reset counts and animate whenever section comes into view
          setCounts({
            experts: 0,
            projects: 0,
            clients: 0,
            services: 0,
          });

          // Clear any existing timeout
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }

          // Start animation after a small delay
          animationTimeoutRef.current = setTimeout(() => {
            animateCounters();
          }, 100);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [animateCounters]);

  return (
    <section
      ref={sectionRef}
      className="achievement-section bg-[#016B61] text-white py-20 lg:py-24 relative mx-auto sm:mx-6 lg:mx-8"
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="text-[#9ECFD4] font-bold text-sm tracking-wide mb-4">PROVEN TRACK RECORD</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8">
              Delivering Results<br />That Matter
            </h2>
          </div>
        </div>

        {/* Stats Grid - Full Width */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {counters.map((counter) => (
            <div key={counter.id} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-6 text-[#70B2B2]">
                {counter.icon}
              </div>

              {/* Counter */}
              <div className="mb-4">
                <div className="text-5xl lg:text-6xl font-bold">
                  {counts[counter.id as keyof typeof counts]}+
                </div>
              </div>

              {/* Label */}
              <p className="text-slate-300 text-lg font-medium">
                {counter.label}
              </p>

              {/* Divider */}
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#70B2B2] to-transparent rounded"></div>
            </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
