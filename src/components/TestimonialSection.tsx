'use client';

import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export default function TestimonialSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperRef2 = useRef<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "John Anderson",
      position: "CEO",
      company: "Tech Innovations Inc",
      content: "CodeAxis Technologies transformed our digital infrastructure completely. Their expertise in cloud solutions and commitment to excellence exceeded our expectations. The team's professionalism and technical knowledge are outstanding.",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      position: "CTO",
      company: "Digital Ventures",
      content: "Working with CodeAxis has been a game-changer for our business. Their innovative approach to software development and attention to detail helped us achieve our goals faster than we anticipated.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "Director of IT",
      company: "Global Systems Corp",
      content: "The team at CodeAxis delivered exceptional results on our enterprise project. Their technical expertise, combined with excellent project management, made the entire process smooth and efficient.",
      rating: 5
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      position: "Product Manager",
      company: "StartupHub",
      content: "CodeAxis Technologies helped us build our platform from the ground up. Their dedication, technical skills, and understanding of our vision were instrumental in our success.",
      rating: 5
    }
  ];

  // Custom autoplay for second swiper (moving backwards/left to right)
  useEffect(() => {
    if (swiperRef2.current) {
      // Clear any existing interval
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }

      // Start autoplay that moves backwards (left to right)
      autoplayIntervalRef.current = setInterval(() => {
        if (swiperRef2.current) {
          swiperRef2.current.slidePrev();
        }
      }, 4000);

      return () => {
        if (autoplayIntervalRef.current) {
          clearInterval(autoplayIntervalRef.current);
        }
      };
    }
  }, []);

  return (
    <section className="testimonial-section section-padding fix" style={{ paddingTop: '-400px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-4">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[#016B61] font-bold text-sm tracking-wide mb-4">CLIENT FEEDBACK</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
                Trusted By Businesses Worldwide
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto md:mx-0">
                Hear from our satisfied clients about their experience working with us
              </p>
            </div>
            
            {/* Navigation Arrows - Visible on all screen sizes */}
            <div className="flex gap-4 ml-4">
              <button 
                ref={prevButtonRef}
                onClick={() => swiperRef.current?.slidePrev()}
                className="testimonial-swiper-button-prev-custom w-12 h-12 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button 
                ref={nextButtonRef}
                onClick={() => swiperRef.current?.slideNext()}
                className="testimonial-swiper-button-next-custom w-12 h-12 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Swiper */}
        <div 
          className="testimonial-wrapper"
          onMouseEnter={() => {
            if (swiperRef.current?.autoplay) {
              swiperRef.current.autoplay.stop();
            }
          }}
          onMouseLeave={() => {
            if (swiperRef.current?.autoplay) {
              swiperRef.current.autoplay.start();
            }
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Mousewheel]}
            spaceBetween={24}
            loop={true}
            navigation={false}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            grabCursor={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow max-w-md mx-auto">
                  <div className="flex items-start gap-4 mb-4">
                    <Quote className="w-8 h-8 text-[#70B2B2] flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">★</span>
                        ))}
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-slate-600">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Second Swiper - Moving in opposite direction */}
          <div 
            className="testimonial-wrapper mt-6"
            onMouseEnter={() => {
              if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current);
              }
            }}
            onMouseLeave={() => {
              if (swiperRef2.current) {
                autoplayIntervalRef.current = setInterval(() => {
                  if (swiperRef2.current) {
                    swiperRef2.current.slidePrev();
                  }
                }, 4000);
              }
            }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Mousewheel]}
              spaceBetween={24}
              loop={true}
              navigation={false}
              pagination={false}
              autoplay={false}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              grabCursor={true}
              onSwiper={(swiper) => {
                swiperRef2.current = swiper;
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              className="testimonial-swiper-2"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={`${testimonial.id}-2`}>
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow max-w-md mx-auto">
                    <div className="flex items-start gap-4 mb-4">
                      <Quote className="w-8 h-8 text-[#70B2B2] flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-sm">★</span>
                          ))}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {testimonial.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-slate-600">
                          {testimonial.position} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-section {
          position: relative;
        }

        .testimonial-section:before {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          content: "";
          background-color: #016B61;
          top: 50%;
          z-index: -1;
        }

        .section-padding {
          padding: 120px 0;
        }
        
        @media (max-width: 1199px) {
          .section-padding {
            padding: 100px 0;
          }
        }
        
        @media (max-width: 991px) {
          .section-padding {
            padding: 80px 0;
          }
        }
        
        .fix {
          overflow: hidden;
        }

        .testimonial-wrapper {
          position: relative;
        }

        .testimonial-swiper {
          padding-bottom: 60px;
        }

        .testimonial-swiper .swiper-button-next,
        .testimonial-swiper .swiper-button-prev {
          color: #000000;
          background: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid #000000;
          box-shadow: none;
          margin-top: 0;
        }

        .testimonial-swiper .swiper-button-next:hover,
        .testimonial-swiper .swiper-button-prev:hover {
          background: #000000;
          color: white;
        }

        .testimonial-swiper .swiper-button-prev {
          left: -60px;
        }

        .testimonial-swiper .swiper-button-next {
          right: -60px;
        }

        @media (max-width: 1200px) {
          .testimonial-swiper .swiper-button-prev {
            left: -50px;
          }

          .testimonial-swiper .swiper-button-next {
            right: -50px;
          }
        }

        @media (max-width: 1024px) {
          .testimonial-swiper .swiper-button-prev {
            left: -40px;
          }

          .testimonial-swiper .swiper-button-next {
            right: -40px;
          }
        }

        /* Hide default Swiper navigation on all screen sizes */
        .testimonial-swiper .swiper-button-prev,
        .testimonial-swiper .swiper-button-next {
          display: none !important;
        }

        .testimonial-swiper-button-prev-custom:hover svg,
        .testimonial-swiper-button-next-custom:hover svg {
          color: white;
        }

        .testimonial-swiper .swiper-button-next:after,
        .testimonial-swiper .swiper-button-prev:after {
          font-size: 20px;
        }

        .testimonial-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #016B61;
          width: 30px;
          border-radius: 6px;
        }

        .testimonial-swiper {
          cursor: grab;
        }

        .testimonial-swiper:active {
          cursor: grabbing;
        }

        .testimonial-swiper .swiper-slide {
          cursor: grab;
        }

        .testimonial-swiper .swiper-slide:active {
          cursor: grabbing;
        }


        .testimonial-swiper-2 {
          cursor: grab;
        }

        .testimonial-swiper-2:active {
          cursor: grabbing;
        }

        .testimonial-swiper-2 .swiper-slide {
          cursor: grab;
        }

        .testimonial-swiper-2 .swiper-slide:active {
          cursor: grabbing;
        }
      `}</style>
    </section>
  );
}
