import Link from "next/link";
import { Suspense } from "react";
import ProjectsGridClient from "@/components/ProjectsGridClient";
import { getBaseUrl } from "@/lib/get-base-url";

export const metadata = {
  title: "Projects • Habesha Software Solutions",
};

// Force dynamic rendering since we use cache: 'no-store' in fetchProjects
export const dynamic = 'force-dynamic';

interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  metadata?: Record<string, unknown> | null;
}

async function fetchProjects(): Promise<Project[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/projects` : '/api/projects';
    const res = await fetch(url, {
      cache: 'no-store', // Force fresh data on each request (SSR)
    });
    
    if (!res.ok) {
      console.error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
      return [];
    }
    
    const data = await res.json();
    if (data.projects && Array.isArray(data.projects)) {
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
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function ProjectsGrid() {
  const projects = await fetchProjects();
  return <ProjectsGridClient projects={projects} />;
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Projects Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #016B61 0%, #016B61 40%, #70B2B2 100%)",
        }}
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 top-0 w-[60%] h-full opacity-40">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="projects-lines" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#70B2B2" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#9ECFD4" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d={`M${-200 + i * 30},0 C ${200 + i * 40},150 ${400 + i * 40},450 ${800 +
                    i * 40},600`}
                  fill="none"
                  stroke="url(#projects-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-[#70B2B2]/80 via-[#016B61]/60 to-transparent rotate-[-35deg]" />
        </div>

        {/* Title + breadcrumb */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Projects
          </h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Projects</span>
          </nav>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold tracking-widest text-[#016B61] uppercase">
              Our Work
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
              Recent Projects & Case Studies
            </h2>
            <p className="mt-4 text-slate-600">
              Explore a selection of solutions we have built for clients across different
              industries, showcasing our expertise in software development and digital
              transformation.
            </p>
          </div>

          <Suspense fallback={
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((id) => (
                <div key={id} className="bg-white rounded-none border border-gray-200 p-6 animate-pulse">
                  <div className="h-72 bg-slate-200 mb-4"></div>
                  <div className="h-4 bg-slate-200 w-1/4 mb-2"></div>
                  <div className="h-6 bg-slate-200 w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-200 w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 w-5/6"></div>
                </div>
              ))}
            </div>
          }>
            <ProjectsGrid />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
