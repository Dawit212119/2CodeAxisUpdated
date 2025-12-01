'use client';

import { useState } from 'react';
import Link from "next/link";
import CourseScheduleModal from './CourseScheduleModal';

interface CourseData {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  mode: string | null;
  level: string | null;
  features: string[] | null;
}

export default function CoursesListClient({ courses }: { courses: CourseData[] }) {
  const [selectedCourse, setSelectedCourse] = useState<{ id: string; title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openScheduleModal(courseId: string, courseTitle: string) {
    setSelectedCourse({ id: courseId, title: courseTitle });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedCourse(null);
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-2 text-center py-12 text-slate-600">
        No courses available at the moment. Please check back later.
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {courses.map((course: CourseData) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-[#016B61] mb-2">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-3">
                {course.duration && course.mode
                  ? `Duration: ${course.duration} • Mode: ${course.mode}`
                  : course.duration
                  ? `Duration: ${course.duration}`
                  : course.mode
                  ? `Mode: ${course.mode}`
                  : ""}
              </p>
              {course.features && Array.isArray(course.features) && course.features.length > 0 ? (
                <ul className="text-sm text-slate-600 space-y-1 mb-4 list-disc list-inside">
                  {course.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              ) : (
                <ul className="text-sm text-slate-600 space-y-1 mb-4 list-disc list-inside">
                  <li>Weekly live sessions with CodeAxis engineers</li>
                  <li>Capstone project you can add to your portfolio</li>
                  <li>Certificate of completion and career guidance</li>
                </ul>
              )}
            </div>
            <div className="flex items-center justify-between mt-2 gap-2">
              <p className="text-sm font-semibold text-slate-700">
                {course.level ? `Level: ${course.level}` : "Level: Beginner – Intermediate"}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => openScheduleModal(course.id, course.title)}
                  className="inline-flex items-center justify-center rounded-lg border border-[#016B61] text-[#016B61] hover:bg-[#016B61] hover:text-white font-semibold px-3 py-2 text-xs transition-colors"
                >
                  Schedule
                </button>
                <Link
                  href={`/learn?course=${course.id}#register`}
                  className="inline-flex items-center justify-center rounded-lg bg-[#016B61] hover:bg-[#70B2B2] text-white font-semibold px-4 py-2 text-sm shadow-sm transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && (
        <CourseScheduleModal
          courseId={selectedCourse.id}
          courseTitle={selectedCourse.title}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}

