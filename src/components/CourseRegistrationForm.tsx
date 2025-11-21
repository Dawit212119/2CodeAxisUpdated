'use client';

import { useState } from "react";

export type Course = {
  id: string;
  title: string;
};

interface CourseRegistrationFormProps {
  courses: Course[];
  initialCourseId?: string;
}

export default function CourseRegistrationForm({ courses, initialCourseId }: CourseRegistrationFormProps) {
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      courseId: formData.get("courseId")?.toString() ?? "",
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      phone: formData.get("phone")?.toString() || undefined,
      experienceLevel: formData.get("experienceLevel")?.toString() || undefined,
      preferredSchedule: formData.get("preferredSchedule")?.toString() || undefined,
      message: formData.get("message")?.toString() || undefined,
    };

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/course-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit registration.");
      }

      setStatus({
        type: "success",
        message: "Thank you! Your registration has been received.",
      });
      form.reset();
      setSelectedCourseId("");
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div id="register" className="bg-white rounded-2xl shadow-md p-8">
      <h3 className="text-xl font-extrabold text-[#0e134d] mb-4">Register for a Course</h3>

      {status && (
        <div
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Course *</label>
          <select
            name="courseId"
            required
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone (optional)</label>
            <input
              name="phone"
              type="tel"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
              placeholder="+251 ..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Experience Level</label>
            <select
              name="experienceLevel"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
            >
              <option value="">Select level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Schedule</label>
          <select
            name="preferredSchedule"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
          >
            <option value="">Select schedule</option>
            <option>Weekday evenings</option>
            <option>Weekend mornings</option>
            <option>Weekend full days</option>
            <option>Flexible / Online only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">What would you like to achieve?</label>
          <textarea
            name="message"
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
            placeholder="Share your goals, background, and expectations."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors w-full md:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Register Now"}
        </button>
      </form>
    </div>
  );
}
