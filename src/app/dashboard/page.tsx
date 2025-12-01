'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/better-auth-client';

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

interface CourseRegistration {
  id: number;
  courseId: string;
  name: string;
  email: string;
  phone?: string;
  experienceLevel?: string;
  preferredSchedule?: string;
  message?: string;
  paymentReceiptUrl?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [courseRegistrations, setCourseRegistrations] = useState<CourseRegistration[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'courses'>('projects');

  useEffect(() => {
    checkSession();
    
    // Refresh course registrations when tab becomes active or window gains focus
    const handleFocus = () => {
      if (activeTab === 'courses') {
        loadCourseRegistrations();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [activeTab]);

  // Refresh when switching to courses tab
  useEffect(() => {
    if (activeTab === 'courses') {
      loadCourseRegistrations();
    }
  }, [activeTab]);

  async function checkSession() {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      
      if (!data.user) {
        console.log('=== CLIENT: No user session ===');
        router.push('/login');
        return;
      }
      
      // Log the user role on client side
      console.log('=== CLIENT: Current logged-in user role ===');
      console.log('Role:', data.user.role);
      console.log('User:', data.user);
      console.log('==========================================');
      
      // Check if user is admin and redirect to admin dashboard
      if (data.user.role === 'admin') {
        console.log('CLIENT: User is admin, redirecting to /admin');
        router.push('/admin');
        return;
      }
      
      console.log('CLIENT: User is not admin, showing user dashboard');
      setUser(data.user);
      loadProjects();
      loadCourseRegistrations();
    } catch (error) {
      console.error('CLIENT: Error checking session:', error);
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

  async function loadCourseRegistrations() {
    try {
      const res = await fetch('/api/user/course-registrations');
      const data = await res.json();
      
      if (res.ok) {
        setCourseRegistrations(data.registrations || []);
      }
    } catch (error) {
      console.error('Error loading course registrations', error);
    }
  }

  async function handleLogout() {
    try {
      await authClient.signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error logging out', error);
      router.push('/');
      router.refresh();
    }
  }

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-[#9ECFD4] text-[#016B61]',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  function getStatusLabel(status: string) {
    const labels: Record<string, string> = {
      pending: 'Pending Review',
      pending_payment: 'Pending Payment',
      pending_verification: 'Pending Verification',
      in_progress: 'In Progress',
      completed: 'Completed',
      rejected: 'Rejected',
      approved: 'Approved',
    };
    return labels[status] || status.replace('_', ' ');
  }

  function getCourseStatusColor(status: string) {
    const colors: Record<string, string> = {
      pending_payment: 'bg-yellow-100 text-yellow-800',
      pending_verification: 'bg-[#E5E9C5] text-[#016B61]',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-[#9ECFD4] text-[#016B61]',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  }

  function getCourseName(courseId: string) {
    const courses: Record<string, string> = {
      'programming-fundamentals': 'Programming Fundamentals with Python',
      'frontend-web-dev': 'Frontend Web Development (HTML, CSS, JavaScript)',
      'fullstack-web-dev': 'Full-Stack Web Development (React & Next.js)',
      'mobile-app-dev': 'Mobile App Development (Flutter)',
      'backend-dotnet': 'Backend Development with .NET & REST APIs',
      'cloud-devops': 'Cloud & DevOps Essentials (AWS / Azure)',
      'data-engineering': 'Data Engineering & Analytics Foundations',
      'software-engineering-practices': 'Software Engineering Practices (Git, Testing, Clean Code)',
      'cybersecurity-basics': 'Cybersecurity Fundamentals',
    };
    return courses[courseId] || courseId;
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
              <h1 className="text-2xl font-extrabold text-[#016B61]">My Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">Welcome, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/submit-project"
                className="inline-flex items-center justify-center rounded-lg bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-4 py-2 text-sm shadow-sm transition-colors"
              >
                Submit New Project
              </Link>
              <Link
                href="/"
                className="text-sm text-slate-600 hover:text-[#016B61]"
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
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'text-[#016B61] border-b-2 border-[#016B61]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Project Submissions ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'text-[#016B61] border-b-2 border-[#016B61]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Course Registrations ({courseRegistrations.length})
            </button>
          </div>
        </div>

        {activeTab === 'projects' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#016B61] mb-2">My Project Submissions</h2>
              <p className="text-sm text-slate-600">
                Track the status of all your submitted projects
              </p>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-[#016B61] mb-2">No projects submitted yet</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Submit your first project to get started. Our team will review it and update you on the status.
                  </p>
                  <Link
                    href="/submit-project"
                    className="inline-flex items-center justify-center rounded-lg bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors"
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
                        <h3 className="text-lg font-bold text-[#016B61]">{project.name}</h3>
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
                          className="text-sm text-[#016B61] hover:underline inline-flex items-center gap-1"
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
          </>
        )}

        {activeTab === 'courses' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#016B61] mb-2">My Course Registrations</h2>
              <p className="text-sm text-slate-600">
                Track the status of your course registrations and payment verification
              </p>
            </div>

            {courseRegistrations.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-[#016B61] mb-2">No course registrations yet</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Register for a course to get started. After submitting your payment receipt, you can track the verification status here.
                  </p>
                  <Link
                    href="/learn"
                    className="inline-flex items-center justify-center rounded-lg bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors"
                  >
                    Browse Courses
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {courseRegistrations.map((registration) => (
                  <div key={registration.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#016B61]">{getCourseName(registration.courseId)}</h3>
                        <p className="text-sm text-slate-600">{registration.email}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCourseStatusColor(registration.status)}`}>
                        {getStatusLabel(registration.status)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
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
                          <span className="font-medium text-slate-700">Preferred Schedule:</span>{' '}
                          <span className="text-slate-600">{registration.preferredSchedule}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-slate-700">Registered:</span>{' '}
                        <span className="text-slate-600">
                          {new Date(registration.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Last Updated:</span>{' '}
                        <span className="text-slate-600">
                          {new Date(registration.updatedAt).toLocaleDateString()}
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

                    {registration.paymentReceiptUrl && (
                      <div className="mb-4">
                        <a
                          href={registration.paymentReceiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#016B61] hover:underline font-medium"
                        >
                          View Payment Receipt →
                        </a>
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 mb-1">Status Information</p>
                          <p className="text-sm text-slate-600">
                            {registration.status === 'pending_payment' && 'Please submit your payment receipt to proceed with registration.'}
                            {registration.status === 'pending_verification' && 'Your payment receipt has been submitted and is awaiting admin verification.'}
                            {registration.status === 'approved' && 'Your payment has been verified! You can now view the course schedule.'}
                            {registration.status === 'rejected' && 'Your payment receipt was not approved. Please contact support for assistance.'}
                            {registration.status === 'completed' && 'Congratulations! You have completed this course.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {registration.status === 'approved' && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <Link
                          href={`/course-schedule/${registration.courseId}`}
                          className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-800 font-medium"
                        >
                          View Course Schedule →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}



