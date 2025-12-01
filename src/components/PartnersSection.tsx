"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const partners = [
  { 
    name: "INSA", 
    logo: "/images/partners/insa.png",
    fallback: "INSA",
    initials: "INSA"
  },
  { 
    name: "Ethiopian Airlines", 
    logo: "/images/partners/ethioairlines.png",
    fallback: "Ethiopian",
    initials: "ET"
  },
  { 
    name: "Ethio Telecom", 
    logo: "/images/partners/ethiotelecom.png",
    fallback: "Ethio Telecom",
    initials: "ET"
  },
  { 
    name: "Safaricom Ethiopia", 
    logo: "/images/partners/safaricom.png",
    fallback: "Safaricom",
    initials: "SE"
  },
  { 
    name: "ICOGS", 
    logo: "/images/partners/icog.png",
    fallback: "ICOGS",
    initials: "ICOGS"
  },
  { 
    name: "Chapa", 
    logo: "/images/partners/chapa.png",
    fallback: "Chapa",
    initials: "CH"
  },
  { 
    name: "Kifiya", 
    logo: "/images/partners/kififya.png",
    fallback: "Kifiya",
    initials: "KF"
  },
  { 
    name: "Gebeya", 
    logo: "/images/partners/gebeya.png",
    fallback: "Gebeya",
    initials: "GB"
  },
];

export default function PartnersSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section className="partners-section h-[1/2] text-center mb-20">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-30">
          <span className="inline-block text-sm font-bold tracking-wide text-[#016B61]  uppercase">OUR PARTNERS</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-black">Local Technology Partners</h2>
          <p className="mt-2 text-black">Collaborating with leading Ethiopian technology companies to deliver innovative solutions.</p>
        </div>

        <div className="relative mb-30">
          {/* Nav buttons */}
          <button ref={prevRef} aria-label="Previous" className="partners-nav partners-prev">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button ref={nextRef} aria-label="Next" className="partners-nav partners-next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <Swiper
            className="partners-swiper"
            modules={[Autoplay, Navigation]}
            loop={true}
            centeredSlides={true}
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            slidesPerView={3}
            spaceBetween={28}
            onBeforeInit={(swiper) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const s = swiper as any;
              s.params.navigation.prevEl = prevRef.current;
              s.params.navigation.nextEl = nextRef.current;
            }}
            navigation={false}
            breakpoints={{
              0: { slidesPerView: 3, spaceBetween: 20, centeredSlides: true },
              768: { slidesPerView: 3, spaceBetween: 28, centeredSlides: true },
              1024: { slidesPerView: 3, spaceBetween: 32, centeredSlides: true },
            }}
          >
            {partners.map((p) => {
              const hasError = imageErrors[p.name];
              return (
                <SwiperSlide key={p.name}>
                  <div className="h-32 flex items-center justify-center rounded-xl ring-1 ring-white/10 bg-white/5 backdrop-blur-sm">
                    {!hasError && p.logo ? (
                      <Image 
                        src={p.logo} 
                        alt={p.name} 
                        width={240} 
                        height={80} 
                        className="partners-logo max-h-16 max-w-[240px] object-contain"
                        onError={() => {
                          setImageErrors(prev => ({ ...prev, [p.name]: true }));
                        }}
                        onLoadingComplete={() => {
                          // Image loaded successfully
                        }}
                      />
                    ) : (
                      <div className="partner-fallback w-full h-full flex items-center justify-center">
                        <div className="bg-gradient-to-br from-[#016B61] to-[#70B2B2] text-white font-bold text-xs sm:text-sm px-3 py-2 rounded-lg shadow-md">
                          {p.initials || p.fallback || p.name}
                        </div>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
