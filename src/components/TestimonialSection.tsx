'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';
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

  return (
    <section className="testimonial-section section-padding fix" style={{ paddingTop: '-400px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-orange-500 font-bold text-sm tracking-wide mb-4">TESTIMONIALS</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            What Our Clients Say
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with us
          </p>
        </div>

        {/* Testimonials Swiper */}
        <div className="testimonial-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            loop="true"
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
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
                <div className="testimonial-card bg-white rounded-lg p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-orange-500" />
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-slate-600">
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
          background-color: #0e134d;
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
          color: #ea8c06;
          background: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
          background: #ea8c06;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}
