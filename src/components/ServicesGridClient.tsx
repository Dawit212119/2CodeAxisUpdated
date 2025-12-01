'use client';

import Link from 'next/link';
import { Settings, Shield, Code, Users, Network, Lock, ArrowRight } from 'lucide-react';

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
  imageUrl: string | null;
}

export default function ServicesGridClient({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <div className="flex h-96 bg-white rounded-lg items-center justify-center text-slate-600">
        No services available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const Icon = service.iconName && iconMap[service.iconName] ? iconMap[service.iconName] : Settings;
        const href = service.linkUrl || `/service-details?title=${service.id}`;
        
        return (
          <Link
            key={service.id}
            href={href}
            className="group relative flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {service.imageUrl ? (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300"></div>
              </div>
            ) : (
              <div className="h-48 bg-gradient-to-br from-[#E5E9C5] to-[#9ECFD4] flex items-center justify-center group-hover:from-[#9ECFD4] group-hover:to-[#016B61] transition-colors">
                <Icon className="w-16 h-16 text-[#016B61] group-hover:text-white transition-colors" />
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#016B61] transition-colors">
                {service.title}
              </h3>
              
              {service.description && (
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                  {service.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 text-[#016B61] font-semibold group-hover:gap-3 transition-all">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
