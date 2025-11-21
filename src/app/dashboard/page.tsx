'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  description: string;
  fileUrl?: string;
  status: string;
  createdAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      
      if (!data.user) {
        router.push('/login');
        return;
      }
      
      setUser(data.user);
      loadProjects();
    } catch (error) {
      router.push('/login');
    }
  }

  async function loadProjects() {
    try {
      const res = await fetch('/api/user/projects');
      const data = await res.json();
      
      if (res.ok) {
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error loading projects', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  function getStatusLabel(status: string) {
    const labels: Record<string, string> = {
      pending: 'Pending Review',
      in_progress: 'In Progress',
      completed: 'Completed',
      rejected: 'Rejected',
    };
    return labels[status] || status;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-slate-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f7fb]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-[#0e134d]">My Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">Welcome, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/submit-project"
                className="inline-flex items-center justify-center rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] text-white font-semibold px-4 py-2 text-sm shadow-sm transition-colors"
              >
                Submit New Project
              </Link>
              <Link
                href="/"
                className="text-sm text-slate-600 hover:text-[#ea8c06]"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#0e134d] mb-2">My Project Submissions</h2>
          <p className="text-sm text-slate-600">
            Track the status of all your submitted projects
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-[#0e134d] mb-2">No projects submitted yet</h3>
              <p className="text-sm text-slate-600 mb-6">
                Submit your first project to get started. Our team will review it and update you on the status.
              </p>
              <Link
                href="/submit-project"
                className="inline-flex items-center justify-center rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors"
              >
                Submit Your First Project
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0e134d]">{project.name}</h3>
                    <p className="text-sm text-slate-600">{project.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                  {project.company && (
                    <div>
                      <span className="font-medium text-slate-700">Company:</span>{' '}
                      <span className="text-slate-600">{project.company}</span>
                    </div>
                  )}
                  {project.projectType && (
                    <div>
                      <span className="font-medium text-slate-700">Type:</span>{' '}
                      <span className="text-slate-600">{project.projectType}</span>
                    </div>
                  )}
                  {project.budgetRange && (
                    <div>
                      <span className="font-medium text-slate-700">Budget:</span>{' '}
                      <span className="text-slate-600">{project.budgetRange}</span>
                    </div>
                  )}
                  {project.timeline && (
                    <div>
                      <span className="font-medium text-slate-700">Timeline:</span>{' '}
                      <span className="text-slate-600">{project.timeline}</span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-slate-700">Submitted:</span>{' '}
                    <span className="text-slate-600">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Last Updated:</span>{' '}
                    <span className="text-slate-600">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-slate-700 mb-2">
                    <span className="font-medium">Description:</span>
                  </p>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {project.fileUrl && (
                  <div className="mb-4">
                    <a
                      href={project.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#ea8c06] hover:underline inline-flex items-center gap-1"
                    >
                      View Attachment →
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-1">Status Information</p>
                      <p className="text-sm text-slate-600">
                        {project.status === 'pending' && 'Your project is pending review by our team.'}
                        {project.status === 'in_progress' && 'Your project is currently being worked on.'}
                        {project.status === 'completed' && 'Your project has been completed!'}
                        {project.status === 'rejected' && 'Unfortunately, your project submission was not approved.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


