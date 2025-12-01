'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Clock, BookOpen, Users, Award } from 'lucide-react';

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

interface CourseScheduleModalProps {
  courseId: string;
  courseTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseScheduleModal({
  courseId,
  courseTitle,
  isOpen,
  onClose,
}: CourseScheduleModalProps) {
  const [schedule, setSchedule] = useState<CourseSchedule | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && courseId) {
      fetchSchedule();
    }
  }, [isOpen, courseId]);

  async function fetchSchedule() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/course-schedule?courseId=${courseId}`);
      const data = await res.json();
      
      if (res.ok && data.schedule) {
        setSchedule(data.schedule);
      } else {
        setError(data.error || 'Schedule not available');
      }
    } catch (err) {
      setError('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function parseSchedule(scheduleText: string) {
    const lines = scheduleText.split('\n').filter(line => line.trim());
    const sections: { title: string; items: string[] }[] = [];
    let currentSection: { title: string; items: string[] } | null = null;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        // It's an item
        if (currentSection) {
          currentSection.items.push(trimmed.substring(1).trim());
        }
      } else if (trimmed.includes(':')) {
        // It's a section title
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: trimmed,
          items: [],
        };
      } else if (trimmed) {
        // It's a standalone item or title
        if (currentSection) {
          currentSection.items.push(trimmed);
        } else {
          sections.push({
            title: trimmed,
            items: [],
          });
        }
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#016B61] to-[#70B2B2] text-white p-6 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{courseTitle}</h2>
                <p className="text-sm text-white/90">Course Schedule & Curriculum</p>
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#016B61] mb-4"></div>
                  <p className="text-slate-600">Loading schedule...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">⚠️</div>
                <p className="text-slate-600">{error}</p>
                <p className="text-sm text-slate-500 mt-2">
                  Schedule details will be available soon.
                </p>
              </div>
            ) : schedule ? (
              <div className="space-y-6">
                {/* Schedule Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#E5E9C5] to-[#9ECFD4] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-[#016B61]" />
                      <span className="text-sm font-semibold text-slate-700">Start Date</span>
                    </div>
                    <p className="text-lg font-bold text-[#016B61]">
                      {formatDate(schedule.startDate)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#9ECFD4] to-[#70B2B2] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-[#016B61]" />
                      <span className="text-sm font-semibold text-slate-700">Duration</span>
                    </div>
                    <p className="text-lg font-bold text-[#016B61]">
                      {schedule.duration} {schedule.duration === 1 ? 'Month' : 'Months'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-[#70B2B2] to-[#016B61] rounded-xl p-4 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5" />
                      <span className="text-sm font-semibold">End Date</span>
                    </div>
                    <p className="text-lg font-bold">
                      {formatDate(schedule.endDate)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {schedule.description && (
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-[#016B61]" />
                      <h3 className="font-bold text-slate-900">Program Overview</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{schedule.description}</p>
                  </div>
                )}

                {/* Schedule Breakdown */}
                <div className="bg-white rounded-xl border-2 border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#016B61] to-[#70B2B2] p-4">
                    <div className="flex items-center gap-2 text-white">
                      <Users className="w-5 h-5" />
                      <h3 className="text-xl font-bold">Detailed Schedule</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {parseSchedule(schedule.schedule).map((section, idx) => (
                      <div key={idx} className="mb-6 last:mb-0">
                        <h4 className="text-lg font-bold text-[#016B61] mb-3 pb-2 border-b-2 border-[#E5E9C5]">
                          {section.title}
                        </h4>
                        {section.items.length > 0 ? (
                          <ul className="space-y-2 ml-4">
                            {section.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-3">
                                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#016B61] flex-shrink-0"></span>
                                <span className="text-slate-700 leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-slate-500 italic ml-4">Details coming soon...</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-4 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Need more details? Contact us for personalized information.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
