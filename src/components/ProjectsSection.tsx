'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight, ArrowRight, Eye } from 'lucide-react';
import ProjectModal from './ProjectModal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  metadata?: any;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (res.ok && data.projects) {
          // Map to Project interface format
          const mappedProjects = data.projects.map((project: any) => ({
            id: project.id,
            title: project.title,
            category: project.category,
            description: project.description,
            imageUrl: project.imageUrl,
            linkUrl: project.linkUrl,
            metadata: {
              modalImageUrl: project.modalImageUrl,
              detailDescription: project.detailDescription,
              technologies: project.technologies,
              client: project.client,
              date: project.date,
              duration: project.duration,
              features: project.features,
            },
          }));
          setProjects(mappedProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);



  return (
    <section className="section-padding fix overflow-hidden bg-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-4">
            <div className="flex-1 text-center md:text-left">
              <p className="text-orange-500 font-bold text-sm tracking-wide mb-4">OUR PROJECTS</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Latest Projects We Have Done
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto md:mx-0">
                Explore our portfolio of successful projects delivered to clients worldwide
              </p>
            </div>
            
            {/* Navigation Arrows - Visible on all screen sizes */}
            <div className="flex gap-4 ml-4">
              <button 
                ref={prevButtonRef}
                onClick={() => swiperRef.current?.slidePrev()}
                className="projects-swiper-button-prev-custom w-12 h-12 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-black" />
              </button>
              <button 
                ref={nextButtonRef}
                onClick={() => swiperRef.current?.slideNext()}
                className="projects-swiper-button-next-custom w-12 h-12 rounded-full border border-black bg-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Swiper Slider */}
        <div 
          className="project-items"
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
            spaceBetween={30}
            slidesPerView={1}
            navigation={false}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
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
            {loading ? (
              <SwiperSlide>
                <div className="bg-white rounded-none border border-gray-200 p-8 text-center text-slate-600">
                  Loading projects...
                </div>
              </SwiperSlide>
            ) : projects.length === 0 ? (
              <SwiperSlide>
                <div className="bg-white rounded-none border border-gray-200 p-8 text-center text-slate-600">
                  No projects available at the moment.
                </div>
              </SwiperSlide>
            ) : (
              projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="group relative bg-white rounded-none border border-gray-200 overflow-hidden hover:border-orange-500 transition-all duration-300 cursor-pointer">
                    {/* Project Image */}
                    <div className="project-image relative h-72 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                          {project.title.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      {project.category && (
                        <span className="inline-block text-xs font-semibold text-orange-500 mb-2 uppercase tracking-wide">
                          {project.category}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleOpenModal(project)}
                          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          See Detail
                        </button>
                        {project.linkUrl && (
                          <a
                            href={project.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all group-hover:text-orange-600 cursor-pointer"
                          >
                            View Project
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
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
          color: #000000;
          background: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid #000000;
          box-shadow: none;
          margin-top: 0;
        }

        .projects-swiper .swiper-button-next:hover,
        .projects-swiper .swiper-button-prev:hover {
          background: #000000;
          color: white;
        }

        .projects-swiper .swiper-button-prev {
          left: -60px;
        }

        .projects-swiper .swiper-button-next {
          right: -60px;
        }

        @media (max-width: 1200px) {
          .projects-swiper .swiper-button-prev {
            left: -50px;
          }

          .projects-swiper .swiper-button-next {
            right: -50px;
          }
        }

        @media (max-width: 1024px) {
          .projects-swiper .swiper-button-prev {
            left: -40px;
          }

          .projects-swiper .swiper-button-next {
            right: -40px;
          }
        }

        /* Hide default Swiper navigation on all screen sizes */
        .projects-swiper .swiper-button-prev,
        .projects-swiper .swiper-button-next {
          display: none !important;
        }

        .projects-swiper-button-prev-custom:hover svg,
        .projects-swiper-button-next-custom:hover svg {
          color: white;
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

        .projects-swiper {
          cursor: grab;
        }

        .projects-swiper:active {
          cursor: grabbing;
        }

        .projects-swiper .swiper-slide {
          cursor: grab;
        }

        .projects-swiper .swiper-slide:active {
          cursor: grabbing;
        }

        .projects-swiper-2 {
          cursor: grab;
        }

        .projects-swiper-2:active {
          cursor: grabbing;
        }

        .projects-swiper-2 .swiper-slide {
          cursor: grab;
        }

        .projects-swiper-2 .swiper-slide:active {
          cursor: grabbing;
        }
      `}</style>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
