'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from 'lucide-react';

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

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'courses' | 'schedules'>('projects');
  const [schedules, setSchedules] = useState<any[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
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
      
      // Load schedules
      const scheduleRes = await fetch('/api/admin/course-schedules');
      if (scheduleRes.ok) {
        const scheduleData = await scheduleRes.json();
        setSchedules(scheduleData.schedules || []);
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
    } catch (error) {
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
      pending_verification: 'bg-orange-100 text-orange-800',
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
        <div className="flex gap-4 border-b overflow-x-auto">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'projects'
                ? 'text-[#ea8c06] border-b-2 border-[#ea8c06]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Submissions ({projectSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'courses'
                ? 'text-[#ea8c06] border-b-2 border-[#ea8c06]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Course Registrations ({courseRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('schedules')}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'schedules'
                ? 'text-[#ea8c06] border-b-2 border-[#ea8c06]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Course Schedules
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
                          <div className="mt-3 p-3 bg-white rounded-lg border-2 border-blue-300">
                            <p className="text-xs font-semibold text-slate-700 mb-2">Payment Receipt</p>
                            <a
                              href={registration.paymentReceiptUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
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
                      className="text-sm border border-slate-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#ea8c06]"
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
            )}
          </div>
        )}

        {activeTab === 'schedules' && (
          <ScheduleManagement 
            courses={[
              { id: "programming-fundamentals", title: "Programming Fundamentals with Python" },
              { id: "frontend-web-dev", title: "Frontend Web Development (HTML, CSS, JavaScript)" },
              { id: "fullstack-web-dev", title: "Full-Stack Web Development (React & Next.js)" },
              { id: "mobile-app-dev", title: "Mobile App Development (Flutter)" },
              { id: "backend-dotnet", title: "Backend Development with .NET & REST APIs" },
              { id: "cloud-devops", title: "Cloud & DevOps Essentials (AWS / Azure)" },
              { id: "data-engineering", title: "Data Engineering & Analytics Foundations" },
              { id: "software-engineering-practices", title: "Software Engineering Practices (Git, Testing, Clean Code)" },
              { id: "cybersecurity-basics", title: "Cybersecurity Fundamentals" },
            ]}
            schedules={schedules}
            onScheduleUpdate={loadData}
          />
        )}
      </div>
    </div>
  );
}

function ScheduleManagement({ courses, schedules, onScheduleUpdate }: { courses: any[], schedules: any[], onScheduleUpdate: () => void }) {
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
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
      setFormData({
        courseId: editingSchedule.courseId,
        title: editingSchedule.title,
        description: editingSchedule.description || '',
        startDate: editingSchedule.startDate ? new Date(editingSchedule.startDate).toISOString().split('T')[0] : '',
        endDate: editingSchedule.endDate ? new Date(editingSchedule.endDate).toISOString().split('T')[0] : '',
        duration: editingSchedule.duration?.toString() || '6',
        schedule: editingSchedule.schedule || '',
      });
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
    } catch (error) {
      alert('Error saving schedule');
    }
  }

  function getScheduleForCourse(courseId: string) {
    return schedules.find(s => s.courseId === courseId);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-[#0e134d] mb-4">Manage Course Schedules</h3>
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
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea8c06] bg-slate-50"
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
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] bg-slate-50"
              placeholder="e.g., 6-Month Full-Stack Development Program"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] bg-slate-50"
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
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date *</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] bg-slate-50"
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
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] bg-slate-50"
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
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] bg-slate-50 font-mono text-xs"
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
              className="px-6 py-2 bg-[#ea8c06] hover:bg-[#d17b05] text-white font-semibold rounded-lg text-sm"
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
        <h3 className="text-lg font-bold text-[#0e134d] mb-4">Existing Schedules</h3>
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
                      className="px-4 py-2 text-sm text-[#ea8c06] hover:bg-orange-50 rounded-lg font-medium"
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



