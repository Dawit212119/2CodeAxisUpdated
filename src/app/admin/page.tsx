'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProjectSubmission {
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
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface CourseRegistration {
  id: number;
  courseId: string;
  name: string;
  email: string;
  phone?: string;
  experienceLevel?: string;
  preferredSchedule?: string;
  message?: string;
  status: string;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'courses'>('projects');
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>([]);
  const [courseRegistrations, setCourseRegistrations] = useState<CourseRegistration[]>([]);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      
      if (!data.user || data.user.role !== 'admin') {
        router.push('/login');
        return;
      }
      
      setUser(data.user);
      loadData();
    } catch (error) {
      router.push('/login');
    }
  }

  async function loadData() {
    try {
      const res = await fetch('/api/admin/submissions');
      const data = await res.json();
      
      if (res.ok) {
        setProjectSubmissions(data.projectSubmissions || []);
        setCourseRegistrations(data.courseRegistrations || []);
      }
    } catch (error) {
      console.error('Error loading data', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProjectStatus(id: number, status: string) {
    setUpdating(id);
    try {
      const res = await fetch('/api/admin/update-project-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        await loadData();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
    } finally {
      setUpdating(null);
    }
  }

  async function updateCourseStatus(id: number, status: string) {
    setUpdating(id);
    try {
      const res = await fetch('/api/admin/update-course-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        await loadData();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status');
    } finally {
      setUpdating(null);
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
      approved: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
              <h1 className="text-2xl font-extrabold text-[#0e134d]">Admin Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">Welcome, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
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

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'projects'
                ? 'text-[#ea8c06] border-b-2 border-[#ea8c06]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Submissions ({projectSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'courses'
                ? 'text-[#ea8c06] border-b-2 border-[#ea8c06]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Course Registrations ({courseRegistrations.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {projectSubmissions.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-slate-600">
                No project submissions yet.
              </div>
            ) : (
              projectSubmissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#0e134d]">{submission.name}</h3>
                      <p className="text-sm text-slate-600">{submission.email}</p>
                      {submission.user && (
                        <p className="text-xs text-slate-500 mt-1">
                          User: {submission.user.name} ({submission.user.email})
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                    {submission.company && (
                      <div>
                        <span className="font-medium text-slate-700">Company:</span>{' '}
                        <span className="text-slate-600">{submission.company}</span>
                      </div>
                    )}
                    {submission.projectType && (
                      <div>
                        <span className="font-medium text-slate-700">Type:</span>{' '}
                        <span className="text-slate-600">{submission.projectType}</span>
                      </div>
                    )}
                    {submission.budgetRange && (
                      <div>
                        <span className="font-medium text-slate-700">Budget:</span>{' '}
                        <span className="text-slate-600">{submission.budgetRange}</span>
                      </div>
                    )}
                    {submission.timeline && (
                      <div>
                        <span className="font-medium text-slate-700">Timeline:</span>{' '}
                        <span className="text-slate-600">{submission.timeline}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-slate-700">Submitted:</span>{' '}
                      <span className="text-slate-600">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-700 mb-2">
                      <span className="font-medium">Description:</span>
                    </p>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded">{submission.description}</p>
                  </div>

                  {submission.fileUrl && (
                    <div className="mb-4">
                      <a
                        href={submission.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#ea8c06] hover:underline"
                      >
                        View Attachment →
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4 border-t">
                    <span className="text-sm font-medium text-slate-700">Update Status:</span>
                    <select
                      value={submission.status}
                      onChange={(e) => updateProjectStatus(submission.id, e.target.value)}
                      disabled={updating === submission.id}
                      className="text-sm border border-slate-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#ea8c06]"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    {updating === submission.id && (
                      <span className="text-xs text-slate-500">Updating...</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            {courseRegistrations.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-slate-600">
                No course registrations yet.
              </div>
            ) : (
              courseRegistrations.map((registration) => (
                <div key={registration.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#0e134d]">{registration.name}</h3>
                      <p className="text-sm text-slate-600">{registration.email}</p>
                      {registration.user && (
                        <p className="text-xs text-slate-500 mt-1">
                          User: {registration.user.name} ({registration.user.email})
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                      {registration.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium text-slate-700">Course:</span>{' '}
                      <span className="text-slate-600">{registration.courseId}</span>
                    </div>
                    {registration.phone && (
                      <div>
                        <span className="font-medium text-slate-700">Phone:</span>{' '}
                        <span className="text-slate-600">{registration.phone}</span>
                      </div>
                    )}
                    {registration.experienceLevel && (
                      <div>
                        <span className="font-medium text-slate-700">Experience:</span>{' '}
                        <span className="text-slate-600">{registration.experienceLevel}</span>
                      </div>
                    )}
                    {registration.preferredSchedule && (
                      <div>
                        <span className="font-medium text-slate-700">Schedule:</span>{' '}
                        <span className="text-slate-600">{registration.preferredSchedule}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-slate-700">Registered:</span>{' '}
                      <span className="text-slate-600">
                        {new Date(registration.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {registration.message && (
                    <div className="mb-4">
                      <p className="text-sm text-slate-700 mb-2">
                        <span className="font-medium">Message:</span>
                      </p>
                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded">{registration.message}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4 border-t">
                    <span className="text-sm font-medium text-slate-700">Update Status:</span>
                    <select
                      value={registration.status}
                      onChange={(e) => updateCourseStatus(registration.id, e.target.value)}
                      disabled={updating === registration.id}
                      className="text-sm border border-slate-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#ea8c06]"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                    {updating === registration.id && (
                      <span className="text-xs text-slate-500">Updating...</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}


