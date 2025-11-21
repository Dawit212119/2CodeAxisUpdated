'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A modern, scalable e-commerce solution with advanced features and seamless user experience.",
      image: "/api/placeholder/600/400"
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure and intuitive mobile banking application with real-time transaction processing.",
      image: "/api/placeholder/600/400"
    },
    {
      id: 3,
      title: "AI Analytics Dashboard",
      category: "Data Analytics",
      description: "Intelligent dashboard powered by AI for real-time business insights and predictions.",
      image: "/api/placeholder/600/400"
    },
    {
      id: 4,
      title: "Healthcare Management System",
      category: "Healthcare IT",
      description: "Comprehensive hospital management system with patient records and appointment scheduling.",
      image: "/api/placeholder/600/400"
    },
    {
      id: 5,
      title: "Cloud Infrastructure",
      category: "Cloud Solutions",
      description: "Scalable cloud infrastructure setup for enterprise-level applications and services.",
      image: "/api/placeholder/600/400"
    },
    {
      id: 6,
      title: "IoT Smart Home System",
      category: "IoT Development",
      description: "Connected smart home ecosystem with automated controls and energy management.",
      image: "/api/placeholder/600/400"
    }
  ];

  return (
    <section className="section-padding fix overflow-hidden bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-orange-500 font-bold text-sm tracking-wide mb-4">OUR PROJECTS</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Latest Projects We Have Done
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects delivered to clients worldwide
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="project-items">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            loop="true"
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="projects-swiper"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="group relative bg-white rounded-none border border-gray-200 overflow-hidden hover:border-orange-500 transition-all duration-300">
                  {/* Project Image */}
                  <div className="project-image relative h-72 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900 opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8 bg-white">
                    <h4 className="text-sm font-normal text-slate-600 mb-3">
                      {project.category}
                    </h4>
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      
      </div>

      <style jsx global>{`
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
        
        .pt-0 {
          padding-top: 0 !important;
        }

        .project-items .project-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          vertical-align: middle;
        }

        .project-items img,
        .project-items video {
          max-width: 100%;
          height: auto;
        }

        .projects-swiper {
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
          overflow: hidden;
          list-style: none;
          padding: 0 0 50px 0;
        }

        .projects-swiper .swiper-button-next,
        .projects-swiper .swiper-button-prev {
          color: #ea8c06;
          background: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .projects-swiper .swiper-button-next:after,
        .projects-swiper .swiper-button-prev:after {
          font-size: 20px;
        }

        .projects-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 12px;
          height: 12px;
        }

        .projects-swiper .swiper-pagination-bullet-active {
          background: #ea8c06;
          width: 30px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
}
