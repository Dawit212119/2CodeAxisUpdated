'use client';

import { X, ExternalLink, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  metadata?: Record<string, unknown> | null;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        {/* Modal Image - shown before title */}
        {(project.metadata?.modalImageUrl || project.imageUrl) && (
          <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
            <Image
              src={(() => {
                const modalImg = project.metadata?.modalImageUrl;
                if (typeof modalImg === 'string' && modalImg) return modalImg;
                return project.imageUrl || '';
              })()}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            {/* Category Badge */}
            {project.category && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-[#016B61]" />
                <span className="text-sm font-semibold text-[#016B61] uppercase tracking-wide">
                  {project.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {project.title}
            </h2>

            {/* Description - Use detail description if available, otherwise use regular description */}
            {(project.metadata?.detailDescription || project.description) ? (
              <div className="mb-6">
                <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                  {(typeof project.metadata?.detailDescription === 'string' ? project.metadata.detailDescription : project.description) || ''}
                </p>
              </div>
            ) : null}

            {/* Additional Metadata */}
            {project.metadata ? (
              <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(project.metadata.technologies !== null && project.metadata.technologies !== undefined) ? (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(project.metadata.technologies) ? (
                          project.metadata.technologies.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[#9ECFD4] text-[#016B61] rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-600">{String(project.metadata.technologies)}</span>
                        )}
                      </div>
                    </div>
                  ) : null}
                  {(project.metadata.client !== null && project.metadata.client !== undefined) ? (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Client</h4>
                      <p className="text-slate-600">{String(project.metadata.client)}</p>
                    </div>
                  ) : null}
                  {(project.metadata.date !== null && project.metadata.date !== undefined) ? (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Date</h4>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{String(project.metadata.date)}</span>
                      </div>
                    </div>
                  ) : null}
                  {(project.metadata.duration !== null && project.metadata.duration !== undefined) ? (
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Duration</h4>
                      <p className="text-slate-600">{String(project.metadata.duration)}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* Features/Highlights */}
            {project.metadata?.features ? (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {Array.isArray(project.metadata.features) ? (
                    project.metadata.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-600">
                        <span className="text-[#70B2B2] mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-600">{String(project.metadata.features)}</li>
                  )}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-200 p-6 md:p-8 bg-slate-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600">
              {project.category && (
                <span className="font-medium">Category: {project.category}</span>
              )}
            </div>
            {project.linkUrl && (
              <a
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
              >
                <span>Visit Project</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

