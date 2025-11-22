'use client';

import { useState } from "react";

export default function SubmitProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/submit-project", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit project.");
      }

      setStatus({
        type: "success",
        message: "Your project has been submitted successfully. We will contact you shortly.",
      });
      form.reset();
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
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h3 className="text-xl font-extrabold text-[#0e134d] mb-4">Project Submission Form</h3>

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
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company / Organization</label>
            <input
              name="company"
              type="text"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
              placeholder="Your company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Type</label>
            <select
              name="projectType"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
            >
              <option value="">Select type</option>
              <option>Web Application</option>
              <option>Mobile Application</option>
              <option>Enterprise System</option>
              <option>Cloud / Infrastructure</option>
              <option>System Integration</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Budget Range</label>
            <select
              name="budgetRange"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
            >
              <option value="">Select budget (ETB)</option>
              <option>Below 250,000 ETB</option>
              <option>250,000 - 600,000 ETB</option>
              <option>600,000 - 1,200,000 ETB</option>
              <option>1,200,000 - 2,500,000 ETB</option>
              <option>Above 2,500,000 ETB</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Desired Timeline</label>
            <select
              name="timeline"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
            >
              <option value="">Select timeline</option>
              <option>1 - 3 months</option>
              <option>3 - 6 months</option>
              <option>6 - 12 months</option>
              <option>More than 12 months</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Project Details *
          </label>
          <textarea
            name="description"
            required
            rows={6}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
            placeholder="Describe your goals, key features, users, and any existing systems we should know about."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Attachments (optional)
          </label>
          <input
            type="file"
            name="attachment"
            className="w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#ea8c06] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#d17b05]"
          />
          <p className="mt-1 text-xs text-slate-500">
            You can upload a brief document, presentation, or requirements file (PDF, DOCX, PPTX, images).
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors w-full md:w-auto"
        >
          {isSubmitting ? "Submitting..." : "Submit Project"}
        </button>
      </form>
    </div>
  );
}
