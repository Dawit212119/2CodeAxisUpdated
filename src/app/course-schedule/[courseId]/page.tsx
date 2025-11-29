'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, BookOpen, ArrowLeft } from 'lucide-react';

interface Schedule {
  id: number;
  courseId: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  duration: number;
  schedule: string;
}

export default function CourseSchedulePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchedule();
  }, [courseId]);

  async function loadSchedule() {
    try {
      const res = await fetch(`/api/course-schedule?courseId=${courseId}`);
      const data = await res.json();
      
      if (res.ok && data.schedule) {
        setSchedule(data.schedule);
      }
    } catch (error) {
      console.error('Error loading schedule', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-slate-600">Loading schedule...</div>
        </div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="min-h-screen bg-[#f3f7fb] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#0e134d] mb-4">Schedule Not Available</h2>
          <p className="text-slate-600 mb-6">
            The schedule for this course is not yet available. Please check back later.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-[#ea8c06] hover:text-[#d17b05] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f7fb]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-[#ea8c06] mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          <h1 className="text-3xl font-extrabold text-[#0e134d]">{schedule.title}</h1>
          {schedule.description && (
            <p className="text-slate-600 mt-2">{schedule.description}</p>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Schedule Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-[#ea8c06]" />
              <div>
                <p className="text-xs text-slate-500">Start Date</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(schedule.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-xs text-slate-500">End Date</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(schedule.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-xs text-slate-500">Duration</p>
                <p className="text-sm font-semibold text-slate-900">
                  {schedule.duration} Months
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="bg-white rounded-lg shadow p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#ea8c06]" />
            <h2 className="text-2xl font-bold text-[#0e134d]">Course Schedule</h2>
          </div>
          
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 bg-slate-50 p-6 rounded-lg border border-slate-200">
              {schedule.schedule}
            </pre>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>This schedule is subject to change. You will be notified of any updates.</li>
            <li>All sessions will be conducted according to the timeline above.</li>
            <li>If you have any questions, please contact us at dawitworkye794@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}




