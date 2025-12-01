"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const partners = [
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Google Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Cloud_logo.svg" },
  { name: "Docker", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  { name: "Kubernetes", logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg" },
  { name: "Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" },
  { name: "DigitalOcean", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Digitalocean-logo.svg" },
  { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
];

export default function PartnersSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="partners-section h-[1/2] text-center mb-20">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-30">
          <span className="inline-block text-sm font-bold tracking-wide text-[#016B61]  uppercase">TECH STACK</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-black">Technology Partners We Work With</h2>
          <p className="mt-2 text-black">Leveraging industry-leading platforms to build reliable, scalable solutions.</p>
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
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            breakpoints={{
              0: { slidesPerView: 3, spaceBetween: 20, centeredSlides: true },
              768: { slidesPerView: 3, spaceBetween: 28, centeredSlides: true },
              1024: { slidesPerView: 3, spaceBetween: 32, centeredSlides: true },
            }}
          >
            {partners.map((p) => (
              <SwiperSlide key={p.name}>
                <div className="h-24 flex items-center justify-center  rounded-xl ring-1 ring-white/10">
                  <img src={p.logo} alt={p.name} className="partners-logo max-h-10 max-w-[160px]" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
