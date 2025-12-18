'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Eye } from 'lucide-react';
import ProjectModal from './ProjectModal';

interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  metadata?: Record<string, unknown> | null;
}

export default function ProjectsGridClient({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-none border border-gray-200 p-8 text-center text-slate-600">
        No projects available at the moment.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative bg-white rounded-none border border-gray-200 overflow-hidden hover:border-[#70B2B2] transition-all duration-300 cursor-pointer"
          >
            {/* Project Image */}
            <div className="project-image relative h-72 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
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
                <span className="inline-block text-xs font-semibold text-[#016B61] mb-2 uppercase tracking-wide">
                  {project.category}
                </span>
              )}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#016B61] transition-colors">
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
                  className="inline-flex items-center gap-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  See Detail
                </button>
                {project.linkUrl && (
                  <a
                    href={project.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#016B61] font-semibold hover:gap-3 transition-all group-hover:text-[#70B2B2] cursor-pointer"
                  >
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

