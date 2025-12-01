import { Suspense } from 'react';
import ProjectsSectionClient from '@/components/ProjectsSectionClient';
import ProjectsSwiperSkeleton from '@/components/ProjectsSwiperSkeleton';

interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  modalImageUrl?: string | null;
  detailDescription?: string | null;
  technologies?: string[] | null;
  client?: string | null;
  date?: string | null;
  duration?: string | null;
  features?: string[] | null;
}

async function fetchProjects(): Promise<Project[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/projects`, {
    next: { 
      revalidate: 60,
      tags: ['projects']
    },
  });
  
  if (!res.ok) {
    return [];
  }
  
  const data = await res.json();
  if (data.projects) {
    // Map to Project interface format
    return (data.projects as Array<{
      id: string;
      title: string;
      category: string | null;
      description: string | null;
      imageUrl: string | null;
      linkUrl: string | null;
      modalImageUrl?: string | null;
      detailDescription?: string | null;
      technologies?: string[] | null;
      client?: string | null;
      date?: string | null;
      duration?: string | null;
      features?: string[] | null;
    }>).map((project) => ({
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
  }
  return [];
}

async function ProjectsData() {
  const projects = await fetchProjects();
  return <ProjectsSectionClient projects={projects} />;
}

export default function ProjectsSectionServer() {
  return (
    <section className="py-[120px] overflow-hidden bg-white mt-20 max-[1199px]:py-[100px] max-[991px]:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Static content shows immediately */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-4">
            <div className="flex-1 text-center md:text-left">
              <p className="text-[#016B61] font-bold text-sm tracking-wide mb-4">RECENT WORK</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Projects We&apos;ve Delivered
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto md:mx-0">
                Explore our portfolio of successful projects delivered to clients worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Projects Carousel with Suspense */}
        <Suspense fallback={<ProjectsSwiperSkeleton />}>
          <ProjectsData />
        </Suspense>
      </div>
    </section>
  );
}
