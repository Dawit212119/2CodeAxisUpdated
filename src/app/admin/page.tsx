'use client';

import { useState, useEffect, useCallback } from 'react';
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
  paymentReceiptUrl?: string;
  status: string;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface CourseSchedule {
  id: number;
  courseId: string;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  duration: number;
  schedule: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'courses' | 'manage-courses' | 'manage-cards' | 'manage-lists' | 'manage-team' | 'manage-blogs' | 'manage-projects'>('projects');
  const [schedules, setSchedules] = useState<CourseSchedule[]>([]);
  const [projectSubmissions, setProjectSubmissions] = useState<ProjectSubmission[]>([]);
  const [courseRegistrations, setCourseRegistrations] = useState<CourseRegistration[]>([]);
  const [updating, setUpdating] = useState<number | null>(null);
  
  // Filter states for Project Submissions
  const [filterProjectName, setFilterProjectName] = useState('');
  const [filterProjectCompany, setFilterProjectCompany] = useState('');
  const [filterProjectType, setFilterProjectType] = useState('');
  const [filterProjectStatus, setFilterProjectStatus] = useState<string>('all');
  
  // Filter states for Course Registrations
  const [filterCourseName, setFilterCourseName] = useState('');
  const [filterCourseId, setFilterCourseId] = useState('');
  const [filterCourseStatus, setFilterCourseStatus] = useState<string>('all');

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/submissions');
      const data = await res.json();
      
      if (res.ok) {
        setProjectSubmissions(data.projectSubmissions || []);
        setCourseRegistrations(data.courseRegistrations || []);
      }
      
      // Load schedules
      const scheduleRes = await fetch('/api/admin/course-schedules');
      if (scheduleRes.ok) {
        const scheduleData = await scheduleRes.json();
        setSchedules(scheduleData.schedules || []);
      }
    } catch {
      console.error('Failed to load data');
    }
  }, []);
  
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      if (res.ok && data.user) {
        // Check if user is admin
        if (data.user.role !== 'admin') {
          router.push('/dashboard');
          return;
        }
        setUser(data.user);
        await loadData();
        setLoading(false);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error checking session:', error);
      setLoading(false);
      router.push('/login');
    }
  }, [router, loadData]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

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
    } catch {
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
    } catch {
      alert('Error updating status');
    } finally {
      setUpdating(null);
    }
  }

  async function verifyPayment(id: number, verified: boolean) {
    setUpdating(id);
    try {
      const res = await fetch('/api/admin/verify-payment', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, verified }),
      });

      if (res.ok) {
        await loadData();
        alert(verified ? 'Payment verified successfully!' : 'Payment rejected.');
      } else {
        alert('Failed to verify payment');
      }
    } catch {
      alert('Error verifying payment');
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
      pending_payment: 'bg-yellow-100 text-yellow-800',
      pending_verification: 'bg-[#E5E9C5] text-[#016B61]',
      in_progress: 'bg-[#9ECFD4] text-[#016B61]',
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
              <h1 className="text-2xl font-extrabold text-[#016B61]">Admin Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">Welcome, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
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

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex gap-4 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'projects'
                ? 'text-[#016B61] border-b-2 border-[#016B61]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Submissions ({projectSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'courses'
                ? 'text-[#016B61] border-b-2 border-[#016B61]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Course Registrations ({courseRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('manage-courses')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'manage-courses'
                ? 'text-[#016B61] border-b-2 border-[#016B61]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Course
          </button>
          <button
            onClick={() => setActiveTab('manage-cards')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'manage-cards'
                ? 'text-[#016B61] border-b-2 border-[#016B61]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Services
          </button>
          <button
            onClick={() => setActiveTab('manage-lists')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'manage-lists'
                ? 'text-[#016B61] border-b-2 border-[#016B61]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Lists
          </button>
          <button
            onClick={() => setActiveTab('manage-team')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'manage-team'
                ? 'text-[#016B61] border-b-2 border-[#016B61]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Team
          </button>
          <button
            onClick={() => setActiveTab('manage-blogs')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'manage-blogs'
                ? 'text-[#016B61] border-b-2 border-[#016B61]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Blogs
          </button>
          <button
            onClick={() => setActiveTab('manage-projects')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'manage-projects'
                ? 'text-[#016B61] border-b-2 border-[#016B61]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Projects
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && (
          <div className="space-y-4">
            {/* Filters for Project Submissions */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Name/Email</label>
                  <input
                    type="text"
                    value={filterProjectName}
                    onChange={(e) => setFilterProjectName(e.target.value)}
                    placeholder="Filter by name or email..."
                    className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Company</label>
                  <input
                    type="text"
                    value={filterProjectCompany}
                    onChange={(e) => setFilterProjectCompany(e.target.value)}
                    placeholder="Filter by company..."
                    className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Project Type</label>
                  <input
                    type="text"
                    value={filterProjectType}
                    onChange={(e) => setFilterProjectType(e.target.value)}
                    placeholder="Filter by type..."
                    className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                  <select
                    value={filterProjectStatus}
                    onChange={(e) => setFilterProjectStatus(e.target.value)}
                    className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
            
            {(() => {
              const filteredProjects = projectSubmissions.filter(submission => {
                if (filterProjectName && !submission.name.toLowerCase().includes(filterProjectName.toLowerCase()) && !submission.email.toLowerCase().includes(filterProjectName.toLowerCase())) return false;
                if (filterProjectCompany && !submission.company?.toLowerCase().includes(filterProjectCompany.toLowerCase())) return false;
                if (filterProjectType && !submission.projectType?.toLowerCase().includes(filterProjectType.toLowerCase())) return false;
                if (filterProjectStatus !== 'all' && submission.status !== filterProjectStatus) return false;
                return true;
              });
              
              return filteredProjects.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-slate-600">
                {projectSubmissions.length === 0 ? 'No project submissions yet.' : 'No submissions match the filters.'}
              </div>
            ) : (
              filteredProjects.map((submission) => (
                <div key={submission.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#016B61]">{submission.name}</h3>
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
                        className="text-sm text-[#016B61] hover:underline"
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
                      className="text-sm border border-slate-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#016B61]"
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
            );
            })()}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            {/* Filters for Course Registrations */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Name/Email</label>
                  <input
                    type="text"
                    value={filterCourseName}
                    onChange={(e) => setFilterCourseName(e.target.value)}
                    placeholder="Filter by name or email..."
                    className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Course ID</label>
                  <input
                    type="text"
                    value={filterCourseId}
                    onChange={(e) => setFilterCourseId(e.target.value)}
                    placeholder="Filter by course ID..."
                    className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                  <select
                    value={filterCourseStatus}
                    onChange={(e) => setFilterCourseStatus(e.target.value)}
                    className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
                  >
                    <option value="all">All</option>
                    <option value="pending_payment">Pending Payment</option>
                    <option value="pending_verification">Pending Verification</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            
            {(() => {
              const filteredRegistrations = courseRegistrations.filter(registration => {
                if (filterCourseName && !registration.name.toLowerCase().includes(filterCourseName.toLowerCase()) && !registration.email.toLowerCase().includes(filterCourseName.toLowerCase())) return false;
                if (filterCourseId && !registration.courseId.toLowerCase().includes(filterCourseId.toLowerCase())) return false;
                if (filterCourseStatus !== 'all' && registration.status !== filterCourseStatus) return false;
                return true;
              });
              
              return filteredRegistrations.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-slate-600">
                {courseRegistrations.length === 0 ? 'No course registrations yet.' : 'No registrations match the filters.'}
              </div>
            ) : (
              filteredRegistrations.map((registration) => (
                <div key={registration.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#016B61]">{registration.name}</h3>
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

                  {/* Payment Information */}
                  {registration.status === 'pending_verification' && (
                    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-3">Payment Verification Required</h4>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="bg-white rounded-lg p-3 border border-yellow-200">
                          <p className="text-xs text-slate-500 mb-1">Bank Account Number</p>
                          <p className="font-mono text-sm font-semibold text-slate-900">1000524310302</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-yellow-200">
                          <p className="text-xs text-slate-500 mb-1">Account Name</p>
                          <p className="text-sm font-semibold text-slate-900">dawit workye</p>
                        </div>
                        {registration.paymentReceiptUrl && (
                          <div className="mt-3 p-3 bg-white rounded-lg border-2 border-[#9ECFD4]">
                            <p className="text-xs font-semibold text-slate-700 mb-2">Payment Receipt</p>
                            <a
                              href={registration.paymentReceiptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              <span>Open Receipt in New Tab</span>
                              <span>↗</span>
                            </a>
                            <p className="text-xs text-slate-500 mt-2">
                              Click to view the uploaded payment receipt file
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => verifyPayment(registration.id, true)}
                          disabled={updating === registration.id}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
                        >
                          Verify Payment
                        </button>
                        <button
                          onClick={() => verifyPayment(registration.id, false)}
                          disabled={updating === registration.id}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Approved - Show Schedule Link */}
                  {registration.status === 'approved' && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Payment Verified ✓</h4>
                      <p className="text-sm text-green-800 mb-3">
                        This student can now view the course schedule.
                      </p>
                      <Link
                        href={`/course-schedule/${registration.courseId}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-800 font-medium"
                      >
                        View Course Schedule →
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4 border-t">
                    <span className="text-sm font-medium text-slate-700">Update Status:</span>
                    <select
                      value={registration.status}
                      onChange={(e) => updateCourseStatus(registration.id, e.target.value)}
                      disabled={updating === registration.id}
                      className="text-sm border border-slate-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#016B61]"
                    >
                      <option value="pending_payment">Pending Payment</option>
                      <option value="pending_verification">Pending Verification</option>
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
            );
            })()}
          </div>
        )}

        {activeTab === 'manage-courses' && (
          <UnifiedCourseManagement
            schedules={schedules}
            onUpdate={loadData}
          />
        )}

        {activeTab === 'manage-cards' && (
          <ContentManagement
            type="cards"
            title="Manage Services"
            onUpdate={loadData}
          />
        )}

        {activeTab === 'manage-lists' && (
          <ContentManagement
            type="lists"
            title="Manage Content Lists"
            onUpdate={loadData}
          />
        )}

        {activeTab === 'manage-team' && (
          <TeamManagement onUpdate={loadData} />
        )}

        {activeTab === 'manage-blogs' && (
          <BlogManagement onUpdate={loadData} />
        )}

        {activeTab === 'manage-projects' && (
          <ProjectManagement onUpdate={loadData} />
        )}
      </div>
    </div>
  );
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  mode?: string | null;
  level: string | null;
  price: number | null;
  imageUrl: string | null;
  linkUrl: string | null;
  isActive: boolean;
  order: number | null;
  features?: string[] | null;
}

function UnifiedCourseManagement({ schedules, onUpdate }: { schedules: CourseSchedule[], onUpdate: () => void }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Filter states
  const [filterTitle, setFilterTitle] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterMode, setFilterMode] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  // Schedule form data
  const [scheduleData, setScheduleData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    duration: '6',
    schedule: '',
  });

  useEffect(() => {
    loadCourses();
  }, []);

  // Load existing schedule when editing a course
  useEffect(() => {
    if (editingCourse) {
      const existingSchedule = schedules.find(s => s.courseId === editingCourse.id);
      if (existingSchedule) {
        setScheduleData({
          title: existingSchedule.title || '',
          description: existingSchedule.description || '',
          startDate: existingSchedule.startDate ? new Date(existingSchedule.startDate).toISOString().split('T')[0] : '',
          endDate: existingSchedule.endDate ? new Date(existingSchedule.endDate).toISOString().split('T')[0] : '',
          duration: existingSchedule.duration?.toString() || '6',
          schedule: existingSchedule.schedule || '',
        });
      } else {
        setScheduleData({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          duration: '6',
          schedule: '',
        });
      }
    }
  }, [editingCourse, schedules]);

  async function loadCourses() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/courses');
      const data = await res.json();
      if (res.ok) {
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const courseData: {
      title: string;
      description: string;
      duration: number;
      mode?: string;
      level: string;
      price?: number;
      imageUrl?: string;
      linkUrl?: string;
      isActive: boolean;
      order: number;
      features?: string[];
    } = {
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      duration: parseInt(formData.get('duration')?.toString() || '0'),
      mode: formData.get('mode')?.toString() || '',
      level: formData.get('level')?.toString() || '',
      order: parseInt(formData.get('order')?.toString() || '0'),
      isActive: formData.get('isActive') === 'on',
    };
    
    const featuresText = formData.get('features')?.toString() || '';
    if (featuresText) {
      courseData.features = featuresText.split('\n').filter(f => f.trim());
    }

    try {
      // Save course
      const endpoint = '/api/admin/courses';
      const method = editingCourse ? 'PUT' : 'POST';
      const url = editingCourse ? `${endpoint}/${editingCourse.id}` : endpoint;

      const courseRes = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      if (!courseRes.ok) {
        const error = await courseRes.json();
        alert(error.error || 'Failed to save course');
        return;
      }

      const courseResult = await courseRes.json();
      const courseId = editingCourse ? editingCourse.id : courseResult.course?.id;

      // Save schedule if provided
      if (scheduleData.title && scheduleData.startDate && scheduleData.endDate && scheduleData.schedule) {
        const schedulePayload = {
          courseId,
          ...scheduleData,
          duration: parseInt(scheduleData.duration),
        };

        const scheduleRes = await fetch('/api/admin/course-schedules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(schedulePayload),
        });

        if (!scheduleRes.ok) {
          alert('Course saved but schedule failed to save');
        }
      }

      setShowForm(false);
      setEditingCourse(null);
      setScheduleData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        duration: '6',
        schedule: '',
      });
      loadCourses();
      onUpdate();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to save');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadCourses();
        onUpdate();
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete');
    }
  }

  function handleEdit(course: Course) {
    setEditingCourse(course);
    setShowForm(true);
  }

  // Filter courses
  const filteredCourses = courses.filter(course => {
    if (filterTitle && !course.title.toLowerCase().includes(filterTitle.toLowerCase())) return false;
    if (filterDuration && course.duration && !String(course.duration).toLowerCase().includes(filterDuration.toLowerCase())) return false;
    if (filterMode && !course.mode?.toLowerCase().includes(filterMode.toLowerCase())) return false;
    if (filterLevel && !course.level?.toLowerCase().includes(filterLevel.toLowerCase())) return false;
    if (filterActive === 'active' && !course.isActive) return false;
    if (filterActive === 'inactive' && course.isActive) return false;
    return true;
  });

  if (loading) {
    return <div className="text-center py-12 text-slate-600">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#016B61]">Manage Course</h2>
        <button
          onClick={() => {
            setEditingCourse(null);
            setShowForm(true);
            setScheduleData({
              title: '',
              description: '',
              startDate: '',
              endDate: '',
              duration: '6',
              schedule: '',
            });
          }}
          className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
        >
          Add New Course
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
            <input
              type="text"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              placeholder="Filter by title..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Duration</label>
            <input
              type="text"
              value={filterDuration}
              onChange={(e) => setFilterDuration(e.target.value)}
              placeholder="Filter by duration..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Mode</label>
            <input
              type="text"
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              placeholder="Filter by mode..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Level</label>
            <input
              type="text"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              placeholder="Filter by level..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-[#016B61] mb-4">
            {editingCourse ? 'Edit' : 'Add New'} Course
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Fields */}
            <div className="border-b border-slate-200 pb-4 mb-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Course Information</h4>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingCourse?.title || ''}
                  required
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingCourse?.description || ''}
                  rows={3}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    defaultValue={editingCourse?.duration || ''}
                    placeholder="e.g., 8–12 weeks"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mode</label>
                  <input
                    type="text"
                    name="mode"
                    defaultValue={editingCourse?.mode || ''}
                    placeholder="e.g., Hybrid (Addis Ababa + Online)"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                <input
                  type="text"
                  name="level"
                  defaultValue={editingCourse?.level || ''}
                  placeholder="e.g., Beginner – Intermediate"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Features (one per line)</label>
                <textarea
                  name="features"
                  defaultValue={editingCourse?.features ? (Array.isArray(editingCourse.features) ? editingCourse.features.join('\n') : '') : ''}
                  rows={4}
                  placeholder="Weekly live sessions with CodeAxis engineers&#10;Capstone project you can add to your portfolio&#10;Certificate of completion and career guidance"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={editingCourse?.order || 0}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div className="flex items-center mt-6">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingCourse?.isActive !== false}
                    className="w-4 h-4 text-[#016B61] border-slate-300 rounded focus:ring-[#016B61]"
                  />
                  <label className="ml-2 text-sm font-medium text-slate-700">Active</label>
                </div>
              </div>
            </div>

            {/* Schedule Fields */}
            <div className="border-t border-slate-200 pt-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Course Schedule (Optional)</h4>
              <p className="text-xs text-slate-500 mb-4">
                Create a schedule for this course. Students will see this schedule after their payment is verified.
              </p>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Schedule Title</label>
                <input
                  type="text"
                  value={scheduleData.title}
                  onChange={(e) => setScheduleData({ ...scheduleData, title: e.target.value })}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  placeholder="e.g., 6-Month Full-Stack Development Program"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Schedule Description</label>
                <textarea
                  value={scheduleData.description}
                  onChange={(e) => setScheduleData({ ...scheduleData, description: e.target.value })}
                  rows={2}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  placeholder="Brief description of the schedule"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={scheduleData.startDate}
                    onChange={(e) => setScheduleData({ ...scheduleData, startDate: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={scheduleData.endDate}
                    onChange={(e) => setScheduleData({ ...scheduleData, endDate: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Duration (months)</label>
                <input
                  type="number"
                  value={scheduleData.duration}
                  onChange={(e) => setScheduleData({ ...scheduleData, duration: e.target.value })}
                  min="1"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">Schedule Details</label>
                <textarea
                  value={scheduleData.schedule}
                  onChange={(e) => setScheduleData({ ...scheduleData, schedule: e.target.value })}
                  rows={5}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  placeholder="Enter the detailed schedule timeline. This will be displayed to students after payment verification."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCourse(null);
                  setScheduleData({
                    title: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    duration: '6',
                    schedule: '',
                  });
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
              >
                {editingCourse ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-[#016B61]">
            Courses ({filteredCourses.length})
          </h3>
        </div>
        {filteredCourses.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            {courses.length === 0 ? 'No courses created yet.' : 'No courses match the filters.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Mode</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Level</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Schedule</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCourses.map((course) => {
                  const schedule = schedules.find(s => s.courseId === course.id);
                  return (
                    <tr key={course.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900 font-medium">{course.title}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{course.duration || '-'}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{course.mode || '-'}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{course.level || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          course.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {course.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {schedule ? (
                          <span className="text-green-600">✓ Has Schedule</span>
                        ) : (
                          <span className="text-slate-400">No Schedule</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(course)}
                            className="px-3 py-1 text-xs bg-[#016B61] hover:bg-[#70B2B2] text-white rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  email: string | null;
  linkedin: string | null;
  owner: boolean;
  order: number | null;
  isActive: boolean;
}

// Team Management Component
function TeamManagement({ onUpdate }: { onUpdate: () => void }) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Filter states
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterOwner, setFilterOwner] = useState<'all' | 'owner' | 'non-owner'>('all');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/team-members');
      const data = await res.json();
      if (res.ok) {
        setMembers(data.members || []);
      }
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const memberData: {
      name: string;
      role: string;
      imageUrl: string;
      email: string;
      linkedin: string;
      owner: boolean;
      order: number;
      isActive: boolean;
    } = {
      name: formData.get('name')?.toString() || '',
      role: formData.get('role')?.toString() || '',
      imageUrl: formData.get('imageUrl')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      linkedin: formData.get('linkedin')?.toString() || '',
      owner: formData.get('owner') === 'on',
      order: parseInt(formData.get('order')?.toString() || '0'),
      isActive: formData.get('isActive') === 'on',
    };

    try {
      const endpoint = '/api/admin/team-members';
      const method = editingMember ? 'PUT' : 'POST';
      const url = editingMember ? `${endpoint}/${editingMember.id}` : endpoint;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Failed to save team member');
        return;
      }

      setShowForm(false);
      setEditingMember(null);
      loadMembers();
      onUpdate();
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Failed to save');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const res = await fetch(`/api/admin/team-members/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadMembers();
        onUpdate();
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete');
    }
  }

  function handleEdit(member: TeamMember) {
    setEditingMember(member);
    setShowForm(true);
  }

  // Filter members
  const filteredMembers = members.filter(member => {
    if (filterName && !member.name.toLowerCase().includes(filterName.toLowerCase())) return false;
    if (filterRole && !member.role.toLowerCase().includes(filterRole.toLowerCase())) return false;
    if (filterOwner === 'owner' && !member.owner) return false;
    if (filterOwner === 'non-owner' && member.owner) return false;
    if (filterActive === 'active' && !member.isActive) return false;
    if (filterActive === 'inactive' && member.isActive) return false;
    return true;
  });

  if (loading) {
    return <div className="text-center py-12 text-slate-600">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#016B61]">Manage Team</h2>
        <button
          onClick={() => {
            setEditingMember(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
        >
          Add New Member
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Name</label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Filter by name..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Role</label>
            <input
              type="text"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              placeholder="Filter by role..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Owner</label>
            <select
              value={filterOwner}
              onChange={(e) => setFilterOwner(e.target.value as 'all' | 'owner' | 'non-owner')}
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            >
              <option value="all">All</option>
              <option value="owner">Owner</option>
              <option value="non-owner">Non-Owner</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-[#016B61] mb-4">
            {editingMember ? 'Edit' : 'Add New'} Team Member
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                defaultValue={editingMember?.name || ''}
                required
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role *</label>
              <input
                type="text"
                name="role"
                defaultValue={editingMember?.role || ''}
                required
                placeholder="e.g., CEO & Co‑Founder, Head of Product, CTO"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="owner"
                defaultChecked={editingMember?.owner === true}
                className="w-4 h-4 text-[#016B61] border-slate-300 rounded focus:ring-[#016B61]"
              />
              <label className="ml-2 text-sm font-medium text-slate-700">
                Owner (Shows in team section on homepage)
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                defaultValue={editingMember?.imageUrl || ''}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingMember?.email || ''}
                  placeholder="email@example.com"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  defaultValue={editingMember?.linkedin || ''}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingMember?.order || 0}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={editingMember?.isActive !== false}
                  className="w-4 h-4 text-[#016B61] border-slate-300 rounded focus:ring-[#016B61]"
                />
                <label className="ml-2 text-sm font-medium text-slate-700">Active</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMember(null);
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
              >
                {editingMember ? 'Update Member' : 'Create Member'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-[#016B61]">
            Team Members ({filteredMembers.length})
          </h3>
        </div>
        {filteredMembers.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            {members.length === 0 ? 'No team members created yet.' : 'No members match the filters.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Owner</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900 font-medium">{member.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{member.role}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        member.owner ? 'bg-[#9ECFD4] text-[#016B61]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {member.owner ? 'Owner' : 'Member'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{member.email || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        member.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

interface BlogPost {
  id: string;
  title: string;
  description: string | null;
  linkUrl: string | null;
  date: string;
  minutesToRead: string | null;
  order: number | null;
  isActive: boolean;
}

// Blog Management Component
function BlogManagement({ onUpdate }: { onUpdate: () => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Filter states
  const [filterTitle, setFilterTitle] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog-posts');
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const postData: {
      title: string;
      description: string;
      linkUrl: string;
      date: string;
      minutesToRead: string;
      order: number;
      isActive: boolean;
    } = {
      title: formData.get('title')?.toString() || '',
      description: formData.get('description')?.toString() || '',
      linkUrl: formData.get('linkUrl')?.toString() || '',
      date: formData.get('date')?.toString() || '',
      minutesToRead: formData.get('minutesToRead')?.toString() || '',
      order: parseInt(formData.get('order')?.toString() || '0'),
      isActive: formData.get('isActive') === 'on',
    };

    try {
      const endpoint = '/api/admin/blog-posts';
      const method = editingPost ? 'PUT' : 'POST';
      const url = editingPost ? `${endpoint}/${editingPost.id}` : endpoint;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Failed to save blog post');
        return;
      }

      setShowForm(false);
      setEditingPost(null);
      loadPosts();
      onUpdate();
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Failed to save');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`/api/admin/blog-posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadPosts();
        onUpdate();
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      alert('Failed to delete');
    }
  }

  function handleEdit(post: BlogPost) {
    setEditingPost(post);
    setShowForm(true);
  }

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (filterTitle && !post.title.toLowerCase().includes(filterTitle.toLowerCase())) return false;
    if (filterActive === 'active' && !post.isActive) return false;
    if (filterActive === 'inactive' && post.isActive) return false;
    return true;
  });

  if (loading) {
    return <div className="text-center py-12 text-slate-600">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#016B61]">Manage Blogs</h2>
        <button
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
        >
          Add New Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
            <input
              type="text"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              placeholder="Filter by title..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-[#016B61] mb-4">
            {editingPost ? 'Edit' : 'Add New'} Blog Post
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                defaultValue={editingPost?.title || ''}
                required
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
              <textarea
                name="description"
                defaultValue={editingPost?.description || ''}
                required
                rows={4}
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                placeholder="Summary/description of the blog post"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Read More Link URL</label>
              <input
                type="url"
                name="linkUrl"
                defaultValue={editingPost?.linkUrl || ''}
                placeholder="https://example.com/blog-post"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date *</label>
                <input
                  type="date"
                  name="date"
                  defaultValue={editingPost?.date ? new Date(editingPost.date).toISOString().split('T')[0] : ''}
                  required
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Minutes to Read</label>
                <input
                  type="number"
                  name="minutesToRead"
                  defaultValue={editingPost?.minutesToRead || ''}
                  min="1"
                  placeholder="e.g., 5"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingPost?.order || 0}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={editingPost?.isActive !== false}
                  className="w-4 h-4 text-[#016B61] border-slate-300 rounded focus:ring-[#016B61]"
                />
                <label className="ml-2 text-sm font-medium text-slate-700">Active</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
              >
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-[#016B61]">
            Blog Posts ({filteredPosts.length})
          </h3>
        </div>
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            {posts.length === 0 ? 'No blog posts created yet.' : 'No posts match the filters.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Read Time</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900 font-medium">{post.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {new Date(post.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {post.minutesToRead ? `${post.minutesToRead} min read` : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {post.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

interface Project {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  modalImageUrl: string | null;
  detailDescription: string | null;
  technologies: string[] | null;
  client: string | null;
  date: string | null;
  duration: string | null;
  features: string[] | null;
  isActive: boolean;
  order: number | null;
}

// Project Management Component
function ProjectManagement({ onUpdate }: { onUpdate: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  
  // Filter states
  const [filterTitle, setFilterTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Parse technologies and features from textarea (one per line)
    const technologiesText = formData.get('technologies')?.toString() || '';
    const technologies = technologiesText.split('\n').filter(t => t.trim()).map(t => t.trim());
    
    const featuresText = formData.get('features')?.toString() || '';
    const features = featuresText.split('\n').filter(f => f.trim()).map(f => f.trim());

    // Create FormData for API request (supports both files and JSON data)
    const submitData = new FormData();
    
    // Add text fields
    submitData.append('title', formData.get('title')?.toString() || '');
    submitData.append('category', formData.get('category')?.toString() || '');
    submitData.append('description', formData.get('description')?.toString() || '');
    submitData.append('detailDescription', formData.get('detailDescription')?.toString() || '');
    submitData.append('linkUrl', formData.get('linkUrl')?.toString() || '');
    submitData.append('client', formData.get('client')?.toString() || '');
    submitData.append('date', formData.get('date')?.toString() || '');
    submitData.append('duration', formData.get('duration')?.toString() || '');
    submitData.append('order', formData.get('order')?.toString() || '0');
    submitData.append('isActive', formData.get('isActive') === 'on' ? 'true' : 'false');
    
    // Add technologies and features as JSON strings
    if (technologies.length > 0) {
      submitData.append('technologies', JSON.stringify(technologies));
    }
    if (features.length > 0) {
      submitData.append('features', JSON.stringify(features));
    }
    
    // Handle imageUrl - either file or URL
    const imageUrlFile = formData.get('imageUrlFile') as File | null;
    const imageUrlText = formData.get('imageUrl')?.toString() || '';
    if (imageUrlFile && imageUrlFile.size > 0) {
      submitData.append('imageUrlFile', imageUrlFile);
    } else if (imageUrlText) {
      submitData.append('imageUrl', imageUrlText);
    }
    
    // Handle modalImageUrl - either file or URL
    const modalImageUrlFile = formData.get('modalImageUrlFile') as File | null;
    const modalImageUrlText = formData.get('modalImageUrl')?.toString() || '';
    if (modalImageUrlFile && modalImageUrlFile.size > 0) {
      submitData.append('modalImageUrlFile', modalImageUrlFile);
    } else if (modalImageUrlText) {
      submitData.append('modalImageUrl', modalImageUrlText);
    }

    try {
      const endpoint = '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';
      const url = editingProject ? `${endpoint}/${editingProject.id}` : endpoint;

      const res = await fetch(url, {
        method,
        body: submitData, // Send FormData directly (don't set Content-Type header, browser will set it with boundary)
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Failed to save project');
        return;
      }

      setShowForm(false);
      setEditingProject(null);
      loadProjects();
      onUpdate();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadProjects();
        onUpdate();
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete');
    }
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setShowForm(true);
  }

  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (filterTitle && !project.title.toLowerCase().includes(filterTitle.toLowerCase())) return false;
    if (filterCategory && !project.category?.toLowerCase().includes(filterCategory.toLowerCase())) return false;
    if (filterActive === 'active' && !project.isActive) return false;
    if (filterActive === 'inactive' && project.isActive) return false;
    return true;
  });

  if (loading) {
    return <div className="text-center py-12 text-slate-600">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#016B61]">Manage Projects</h2>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
        >
          Add New Project
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Title</label>
            <input
              type="text"
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              placeholder="Filter by title..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
            <input
              type="text"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              placeholder="Filter by category..."
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
              className="w-full border border-slate-300 rounded px-2 py-1.5 text-sm text-black"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-[#016B61] mb-4">
            {editingProject ? 'Edit' : 'Add New'} Project
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                name="title"
                defaultValue={editingProject?.title || ''}
                required
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={editingProject?.category || ''}
                placeholder="e.g., Web Development, Mobile App"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={editingProject?.description || ''}
                rows={3}
                placeholder="Short description for project card"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image (for card)</label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Option 1: Enter URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    defaultValue={editingProject?.imageUrl || ''}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div className="text-center text-xs text-slate-500">OR</div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Option 2: Upload File</label>
                  <input
                    type="file"
                    name="imageUrlFile"
                    accept="image/*"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Modal Image</label>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Option 1: Enter URL</label>
                  <input
                    type="url"
                    name="modalImageUrl"
                    defaultValue={editingProject?.modalImageUrl || ''}
                    placeholder="Large image shown in modal (before title)"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div className="text-center text-xs text-slate-500">OR</div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Option 2: Upload File</label>
                  <input
                    type="file"
                    name="modalImageUrlFile"
                    accept="image/*"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Detail Explanation</label>
              <textarea
                name="detailDescription"
                defaultValue={editingProject?.detailDescription || ''}
                rows={5}
                placeholder="Detailed explanation about the project shown in modal"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Link URL</label>
              <input
                type="url"
                name="linkUrl"
                defaultValue={editingProject?.linkUrl || ''}
                placeholder="https://example.com/project"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  defaultValue={editingProject?.duration || ''}
                  placeholder="e.g., 3 months"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  defaultValue={editingProject?.date || ''}
                  placeholder="e.g., January 2024"
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
              <input
                type="text"
                name="client"
                defaultValue={editingProject?.client || ''}
                placeholder="Client name or company"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Technologies (one per line)</label>
              <textarea
                name="technologies"
                defaultValue={editingProject?.technologies ? (Array.isArray(editingProject.technologies) ? editingProject.technologies.join('\n') : editingProject.technologies) : ''}
                rows={3}
                placeholder="React&#10;Node.js&#10;TypeScript"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Key Features (one per line)</label>
              <textarea
                name="features"
                defaultValue={editingProject?.features ? (Array.isArray(editingProject.features) ? editingProject.features.join('\n') : editingProject.features) : ''}
                rows={4}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingProject?.order || 0}
                  className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  name="isActive"
                  defaultChecked={editingProject?.isActive !== false}
                  className="w-4 h-4 text-[#016B61] border-slate-300 rounded focus:ring-[#016B61]"
                />
                <label className="ml-2 text-sm font-medium text-slate-700">Active</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
              >
                {editingProject ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-[#016B61]">
            Projects ({filteredProjects.length})
          </h3>
        </div>
        {filteredProjects.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            {projects.length === 0 ? 'No projects created yet.' : 'No projects match the filters.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm text-slate-900 font-medium">{project.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{project.category || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {project.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Unused component - kept for potential future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ScheduleManagement({ courses, schedules, onScheduleUpdate }: { courses: Course[], schedules: CourseSchedule[], onScheduleUpdate: () => void }) {
  const [editingSchedule, setEditingSchedule] = useState<CourseSchedule | null>(null);
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    duration: '6',
    schedule: '',
  });

  useEffect(() => {
    if (editingSchedule) {
      // Use setTimeout to avoid setState in effect warning
      const timeoutId = setTimeout(() => {
        setFormData({
          courseId: editingSchedule.courseId,
          title: editingSchedule.title,
          description: editingSchedule.description || '',
          startDate: editingSchedule.startDate ? new Date(editingSchedule.startDate).toISOString().split('T')[0] : '',
          endDate: editingSchedule.endDate ? new Date(editingSchedule.endDate).toISOString().split('T')[0] : '',
          duration: editingSchedule.duration?.toString() || '6',
          schedule: editingSchedule.schedule || '',
        });
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [editingSchedule]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/course-schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Schedule saved successfully!');
        setEditingSchedule(null);
        setFormData({
          courseId: '',
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          duration: '6',
          schedule: '',
        });
        onScheduleUpdate();
      } else {
        alert('Failed to save schedule');
      }
    } catch {
      alert('Error saving schedule');
    }
  }

  function getScheduleForCourse(courseId: string) {
    return schedules.find(s => s.courseId === courseId);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-[#016B61] mb-4">Manage Course Schedules</h3>
        <p className="text-sm text-slate-600 mb-6">
          Create or update schedules for each course. Students will see these schedules after their payment is verified.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course *</label>
            <select
              required
              value={formData.courseId}
              onChange={(e) => {
                setFormData({ ...formData, courseId: e.target.value });
                const existing = getScheduleForCourse(e.target.value);
                if (existing) {
                  setEditingSchedule(existing);
                } else {
                  setEditingSchedule(null);
                }
              }}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#016B61] bg-slate-50"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Schedule Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] bg-slate-50"
              placeholder="e.g., 6-Month Full-Stack Development Program"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] bg-slate-50"
              placeholder="Brief description of the schedule"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date *</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date *</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration (months) *</label>
              <input
                type="number"
                required
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Schedule Details *</label>
            <textarea
              required
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              rows={8}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#016B61] bg-slate-50 font-mono text-xs"
              placeholder={`Example format:
Month 1: Introduction to React
- Week 1-2: React Basics
- Week 3-4: Components and Props

Month 2: State Management
- Week 1-2: useState and useEffect
- Week 3-4: Context API

...and so on`}
            />
            <p className="mt-1 text-xs text-slate-500">
              Enter the detailed schedule timeline. This will be displayed to students after payment verification.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
            >
              {editingSchedule ? 'Update Schedule' : 'Create Schedule'}
            </button>
            {editingSchedule && (
              <button
                type="button"
                onClick={() => {
                  setEditingSchedule(null);
                  setFormData({
                    courseId: '',
                    title: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    duration: '6',
                    schedule: '',
                  });
                }}
                className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Schedules */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-[#016B61] mb-4">Existing Schedules</h3>
        {schedules.length === 0 ? (
          <p className="text-sm text-slate-600">No schedules created yet.</p>
        ) : (
          <div className="space-y-4">
            {schedules.map((schedule) => {
              const course = courses.find(c => c.id === schedule.courseId);
              return (
                <div key={schedule.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{course?.title || schedule.courseId}</h4>
                      <p className="text-sm text-slate-600 mt-1">{schedule.title}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {new Date(schedule.startDate).toLocaleDateString()} - {new Date(schedule.endDate).toLocaleDateString()} ({schedule.duration} months)
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingSchedule(schedule)}
                      className="px-4 py-2 text-sm text-[#016B61] hover:bg-[#E5E9C5] rounded-lg font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface ContentItem {
  id: string;
  type: string;
  title: string | null;
  description?: string | null;
  content?: string | null;
  category?: string | null;
  isActive: boolean;
  order: number | null;
  [key: string]: unknown;
}

function ContentManagement({ type, title, onUpdate }: { type: 'courses' | 'cards' | 'lists', title: string, onUpdate: () => void }) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedCardType, _setSelectedCardType] = useState<string>('');
  
  // Filter states for Cards (Services) - reserved for future filtering functionality
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filterCardTitle, _setFilterCardTitle] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filterCardType, _setFilterCardType] = useState<string>('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filterCardCategory, _setFilterCardCategory] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filterCardActive, _setFilterCardActive] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Filter states for Lists - reserved for future filtering functionality
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filterListTitle, _setFilterListTitle] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filterListType, _setFilterListType] = useState<string>('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_filterListActive, _setFilterListActive] = useState<'all' | 'active' | 'inactive'>('all');

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = type === 'courses' ? '/api/admin/courses' : 
                      type === 'cards' ? '/api/admin/content-cards' : 
                      '/api/admin/content-lists';
      const res = await fetch(endpoint);
      const data = await res.json();
      if (res.ok) {
        setItems(type === 'courses' ? data.courses : type === 'cards' ? data.cards : data.lists || []);
      }
    } catch {
      console.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // Show/hide project fields based on card type
  useEffect(() => {
    if (type !== 'cards') return;
    
    const typeSelect = document.getElementById('card-type-select') as HTMLSelectElement;
    const projectFields = document.getElementById('project-fields');
    
    if (typeSelect && projectFields) {
      const handleTypeChange = () => {
        const value = typeSelect.value;
        _setSelectedCardType(value);
        if (value === 'project') {
          projectFields.style.display = 'block';
        } else {
          projectFields.style.display = 'none';
        }
      };
      
      typeSelect.addEventListener('change', handleTypeChange);
      
      // Set initial state
      const currentValue = editingItem?.type || typeSelect.value;
      if (currentValue === 'project') {
        projectFields.style.display = 'block';
        _setSelectedCardType('project');
      } else {
        projectFields.style.display = 'none';
      }
      
      return () => {
        typeSelect.removeEventListener('change', handleTypeChange);
      };
    }
  }, [editingItem, showForm, type]);

  // Show/hide project fields based on card type
  useEffect(() => {
    const typeSelect = document.getElementById('card-type-select') as HTMLSelectElement;
    const projectFields = document.getElementById('project-fields');
    
    if (typeSelect && projectFields) {
      const handleTypeChange = () => {
        const value = typeSelect.value;
        _setSelectedCardType(value);
        if (value === 'project') {
          projectFields.style.display = 'block';
        } else {
          projectFields.style.display = 'none';
        }
      };
      
      typeSelect.addEventListener('change', handleTypeChange);
      
      // Set initial state
      if (editingItem?.type === 'project' || typeSelect.value === 'project') {
        projectFields.style.display = 'block';
        _setSelectedCardType('project');
      } else {
        projectFields.style.display = 'none';
      }
      
      return () => {
        typeSelect.removeEventListener('change', handleTypeChange);
      };
    }
  }, [editingItem, showForm]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {};

    if (type === 'courses') {
      data.title = formData.get('title')?.toString() || '';
      data.description = formData.get('description')?.toString() || '';
      data.duration = formData.get('duration')?.toString() || '';
      data.mode = formData.get('mode')?.toString() || '';
      data.level = formData.get('level')?.toString() || '';
      data.order = parseInt(formData.get('order')?.toString() || '0');
      data.isActive = formData.get('isActive') === 'on';
      const featuresText = formData.get('features')?.toString() || '';
      if (featuresText) {
        data.features = featuresText.split('\n').filter(f => f.trim());
      }
    } else if (type === 'cards') {
      data.type = formData.get('type')?.toString() || '';
      data.title = formData.get('title')?.toString() || '';
      data.category = formData.get('category')?.toString() || '';
      data.description = formData.get('description')?.toString() || '';
      data.imageUrl = formData.get('imageUrl')?.toString() || '';
      data.iconName = formData.get('iconName')?.toString() || '';
      data.linkUrl = formData.get('linkUrl')?.toString() || '';
      data.order = parseInt(formData.get('order')?.toString() || '0');
      data.isActive = formData.get('isActive') === 'on';
      
      // Collect project-specific metadata (only if type is project)
      if (data.type === 'project') {
        const metadata: Record<string, unknown> = {};
        const modalImageUrl = formData.get('modalImageUrl')?.toString() || '';
        const detailDescription = formData.get('detailDescription')?.toString() || '';
        const duration = formData.get('duration')?.toString() || '';
        const date = formData.get('date')?.toString() || '';
        const client = formData.get('client')?.toString() || '';
        const technologiesText = formData.get('technologies')?.toString() || '';
        const featuresText = formData.get('features')?.toString() || '';
        
        if (modalImageUrl) metadata.modalImageUrl = modalImageUrl;
        if (detailDescription) metadata.detailDescription = detailDescription;
        if (duration) metadata.duration = duration;
        if (date) metadata.date = date;
        if (client) metadata.client = client;
        if (technologiesText) {
          metadata.technologies = technologiesText.split('\n').filter(t => t.trim());
        }
        if (featuresText) {
          metadata.features = featuresText.split('\n').filter(f => f.trim());
        }
        
        // Only add metadata if it has at least one field
        if (Object.keys(metadata).length > 0) {
          data.metadata = metadata;
        }
      }
    } else {
      data.type = formData.get('type')?.toString() || '';
      data.title = formData.get('title')?.toString() || '';
      data.content = formData.get('content')?.toString() || '';
      data.order = parseInt(formData.get('order')?.toString() || '0');
      data.isActive = formData.get('isActive') === 'on';
    }

    try {
      const endpoint = type === 'courses' ? '/api/admin/courses' : 
                      type === 'cards' ? '/api/admin/content-cards' : 
                      '/api/admin/content-lists';
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `${endpoint}/${editingItem.id}` : endpoint;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingItem(null);
        loadItems();
        onUpdate();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = type === 'courses' ? '/api/admin/courses' : 
                      type === 'cards' ? '/api/admin/content-cards' : 
                      '/api/admin/content-lists';
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });

      if (res.ok) {
        loadItems();
        onUpdate();
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete');
    }
  }

  // Filter items
  const filteredItems = items.filter(item => {
    if (type === 'cards') {
      if (_filterCardTitle && !item.title?.toLowerCase().includes(_filterCardTitle.toLowerCase())) return false;
      if (_filterCardType !== 'all' && item.type !== _filterCardType) return false;
      if (_filterCardCategory && !item.category?.toLowerCase().includes(_filterCardCategory.toLowerCase())) return false;
      if (_filterCardActive === 'active' && !item.isActive) return false;
      if (_filterCardActive === 'inactive' && item.isActive) return false;
    } else if (type === 'lists') {
      if (_filterListTitle && !item.title?.toLowerCase().includes(_filterListTitle.toLowerCase())) return false;
      if (_filterListType !== 'all' && item.type !== _filterListType) return false;
      if (_filterListActive === 'active' && !item.isActive) return false;
      if (_filterListActive === 'inactive' && item.isActive) return false;
    }
    return true;
  });

  // Get unique types for filter dropdowns (reserved for future filtering functionality)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _uniqueCardTypes = Array.from(new Set(items.map(item => item.type).filter(Boolean)));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _uniqueListTypes = Array.from(new Set(items.map(item => item.type).filter(Boolean)));

  if (loading) {
    return <div className="text-center py-12 text-slate-600">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#016B61]">{title}</h2>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
        >
          Add New
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-[#016B61] mb-4">
            {editingItem ? 'Edit' : 'Add New'} {type === 'courses' ? 'Course' : type === 'cards' ? 'Card' : 'List Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'courses' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingItem?.title || ''}
                    required
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingItem?.description || ''}
                    rows={3}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      defaultValue={editingItem?.duration ? (typeof editingItem.duration === 'string' || typeof editingItem.duration === 'number' ? String(editingItem.duration) : '') : ''}
                      placeholder="e.g., 8–12 weeks"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Mode</label>
                    <input
                      type="text"
                      name="mode"
                      defaultValue={editingItem?.mode ? (typeof editingItem.mode === 'string' ? String(editingItem.mode) : '') : ''}
                      placeholder="e.g., Hybrid (Addis Ababa + Online)"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                  <input
                    type="text"
                    name="level"
                    defaultValue={editingItem?.level ? (typeof editingItem.level === 'string' ? String(editingItem.level) : '') : ''}
                      placeholder="e.g., Beginner – Intermediate"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Features (one per line)</label>
                  <textarea
                    name="features"
                    defaultValue={editingItem?.features ? (Array.isArray(editingItem.features) ? editingItem.features.join('\n') : '') : ''}
                    rows={4}
                    placeholder="Weekly live sessions with CodeAxis engineers&#10;Capstone project you can add to your portfolio&#10;Certificate of completion and career guidance"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
              </>
            )}

            {type === 'cards' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
                    <select
                      name="type"
                      defaultValue={editingItem?.type || ''}
                      required
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                      id="card-type-select"
                    >
                      <option value="">Select type</option>
                      <option value="project">Project</option>
                      <option value="service">Service</option>
                      <option value="service-section">Service Section Card</option>
                      <option value="testimonial">Testimonial</option>
                      <option value="team">Team</option>
                      <option value="partner">Partner</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingItem?.title || ''}
                      required
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={editingItem?.category || ''}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description (Short preview)</label>
                  <textarea
                    name="description"
                    defaultValue={editingItem?.description || ''}
                    rows={3}
                    placeholder="Short description shown on project card"
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Card Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      defaultValue={editingItem?.imageUrl ? (typeof editingItem.imageUrl === 'string' ? String(editingItem.imageUrl) : '') : ''}
                      placeholder="Image for project card"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Icon Name (for services)</label>
                    <input
                      type="text"
                      name="iconName"
                      defaultValue={editingItem?.iconName ? (typeof editingItem.iconName === 'string' ? String(editingItem.iconName) : '') : ''}
                      placeholder="e.g., Settings, Shield, Code"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Website URL (Optional)</label>
                  <input
                    type="url"
                    name="linkUrl"
                    defaultValue={editingItem?.linkUrl ? (typeof editingItem.linkUrl === 'string' ? String(editingItem.linkUrl) : '') : ''}
                      placeholder="https://example.com"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                </div>

                {/* Project-specific fields (shown when type is project) */}
                <div id="project-fields" className="border-t border-slate-200 pt-4 mt-4 space-y-4" style={{ display: editingItem?.type === 'project' ? 'block' : 'none' }}>
                  <h3 className="text-sm font-semibold text-slate-700">Project Details (Optional - for Projects only)</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Modal Image URL (Optional)</label>
                    <input
                      type="url"
                      name="modalImageUrl"
                      defaultValue={(editingItem?.metadata && typeof editingItem.metadata === 'object' && 'modalImageUrl' in editingItem.metadata) ? String(editingItem.metadata.modalImageUrl) : ''}
                      placeholder="Large image shown in modal (before title)"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Detail Explanation (Optional)</label>
                    <textarea
                      name="detailDescription"
                      defaultValue={(editingItem?.metadata && typeof editingItem.metadata === 'object' && 'detailDescription' in editingItem.metadata) ? String(editingItem.metadata.detailDescription) : ''}
                      rows={5}
                      placeholder="Detailed explanation about the project shown in modal"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Optional)</label>
                      <input
                        type="text"
                        name="duration"
                        defaultValue={(editingItem?.metadata && typeof editingItem.metadata === 'object' && 'duration' in editingItem.metadata) ? String(editingItem.metadata.duration) : ''}
                        placeholder="e.g., 3 months"
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date (Optional)</label>
                      <input
                        type="text"
                        name="date"
                        defaultValue={(editingItem?.metadata && typeof editingItem.metadata === 'object' && 'date' in editingItem.metadata) ? String(editingItem.metadata.date) : ''}
                        placeholder="e.g., January 2024"
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Client (Optional)</label>
                    <input
                      type="text"
                      name="client"
                      defaultValue={(editingItem?.metadata && typeof editingItem.metadata === 'object' && 'client' in editingItem.metadata) ? String(editingItem.metadata.client) : ''}
                      placeholder="Client name or company"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Technologies (Optional - one per line)</label>
                    <textarea
                      name="technologies"
                      defaultValue={(editingItem?.metadata && typeof editingItem.metadata === 'object' && 'technologies' in editingItem.metadata) ? (Array.isArray(editingItem.metadata.technologies) ? editingItem.metadata.technologies.join('\n') : String(editingItem.metadata.technologies)) : ''}
                      rows={3}
                      placeholder="React&#10;Node.js&#10;TypeScript"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Key Features (Optional - one per line)</label>
                    <textarea
                      name="features"
                      defaultValue={(editingItem?.metadata && typeof editingItem.metadata === 'object' && 'features' in editingItem.metadata) ? (Array.isArray(editingItem.metadata.features) ? editingItem.metadata.features.join('\n') : String(editingItem.metadata.features)) : ''}
                      rows={4}
                      placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>
                </div>
              </>
            )}

            {type === 'lists' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
                    <select
                      name="type"
                      defaultValue={editingItem?.type || ''}
                      required
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    >
                      <option value="">Select type</option>
                      <option value="faq">FAQ</option>
                      <option value="achievement">Achievement</option>
                      <option value="feature">Feature</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={editingItem?.title || ''}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Content *</label>
                  <textarea
                    name="content"
                    defaultValue={editingItem?.content || ''}
                    required
                    rows={5}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editingItem?.order || 0}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-sm text-black"
                />
              </div>
              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={editingItem?.isActive !== false}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-slate-700">Active</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg text-sm"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#016B61] mb-4">
            Existing {type === 'cards' ? 'Services' : type === 'lists' ? 'Lists' : 'Items'} ({filteredItems.length})
          </h3>
          {filteredItems.length === 0 ? (
            <p className="text-sm text-slate-600">
              {items.length === 0 
                ? `No ${type === 'cards' ? 'services' : type === 'lists' ? 'lists' : 'items'} yet.`
                : `No ${type === 'cards' ? 'services' : type === 'lists' ? 'lists' : 'items'} match the filters.`}
            </p>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-slate-900">{item.title || item.id}</h4>
                        {!item.isActive && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">Inactive</span>
                        )}
                        {type === 'cards' && item.type && (
                          <span className="px-2 py-1 bg-[#9ECFD4] text-[#016B61] text-xs rounded">{item.type}</span>
                        )}
                        {type === 'lists' && item.type && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">{item.type}</span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-slate-600 mb-2 line-clamp-2">{item.description}</p>
                      )}
                      {type === 'lists' && item.content && (
                        <p className="text-sm text-slate-600 mb-2 line-clamp-2">{item.content}</p>
                      )}
                      <p className="text-xs text-slate-500">Order: {item.order}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        className="px-3 py-1 text-sm text-[#016B61] hover:bg-[#E5E9C5] rounded font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}