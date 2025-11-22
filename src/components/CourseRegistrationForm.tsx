'use client';

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export type Course = {
  id: string;
  title: string;
};

interface CourseRegistrationFormProps {
  courses: Course[];
  initialCourseId?: string;
}

export default function CourseRegistrationForm({ courses, initialCourseId }: CourseRegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experienceLevel: "",
    preferredSchedule: "",
    message: "",
    paymentReceipt: null as File | null,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, paymentReceipt: file }));
    }
  }

  function validateStep1() {
    if (!selectedCourseId || !formData.name || !formData.email) {
      return false;
    }
    return true;
  }

  function handleNext() {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!formData.paymentReceipt) {
      setStatus({
        type: "error",
        message: "Please upload your payment receipt.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("courseId", selectedCourseId);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone || "");
      formDataToSend.append("experienceLevel", formData.experienceLevel || "");
      formDataToSend.append("preferredSchedule", formData.preferredSchedule || "");
      formDataToSend.append("message", formData.message || "");
      if (formData.paymentReceipt) {
        formDataToSend.append("paymentReceipt", formData.paymentReceipt);
      }

      const res = await fetch("/api/course-registration", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit registration.");
      }

      setStatus({
        type: "success",
        message: "Your registration and payment receipt have been submitted. We will verify your payment and contact you shortly.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        experienceLevel: "",
        preferredSchedule: "",
        message: "",
        paymentReceipt: null,
      });
      setSelectedCourseId("");
      setStep(1);
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
      <div className="mb-6">
        <h3 className="text-xl font-extrabold text-[#0e134d] mb-2">Register for a Course</h3>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className={`px-3 py-1 rounded-full ${step >= 1 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
            Step 1
          </span>
          <ChevronRight className="w-4 h-4" />
          <span className={`px-3 py-1 rounded-full ${step >= 2 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
            Step 2
          </span>
        </div>
      </div>

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

      {step === 1 ? (
        <div className="space-y-5">
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
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
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
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
                placeholder="+251 ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
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
              value={formData.preferredSchedule}
              onChange={handleInputChange}
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
              value={formData.message}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
              placeholder="Share your goals, background, and expectations."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!validateStep1()}
              className="inline-flex items-center gap-2 rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 mb-3">
              <strong>Payment Information:</strong> Please make payment to the account below and upload your payment receipt. 
              Your registration will be verified by our admin team before confirmation.
            </p>
            
            {/* Bank Account Details - Copyable */}
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-500 mb-1">Bank Account Number</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="1000524310302"
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 bg-slate-50 font-mono cursor-pointer"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("1000524310302");
                      setStatus({ type: "success", message: "Account number copied to clipboard!" });
                      setTimeout(() => setStatus(null), 2000);
                    }}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Account Name</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value="dawit workye"
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 bg-slate-50 cursor-pointer"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("dawit workye");
                      setStatus({ type: "success", message: "Account name copied to clipboard!" });
                      setTimeout(() => setStatus(null), 2000);
                    }}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Payment Receipt *</label>
            <input
              type="file"
              accept="image/*,.pdf"
              required
              onChange={handleFileChange}
              className="w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#ea8c06] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#d17b05]"
            />
            <p className="mt-1 text-xs text-slate-500">
              Upload a clear image or PDF of your payment receipt (JPG, PNG, or PDF)
            </p>
            {formData.paymentReceipt && (
              <p className="mt-2 text-sm text-green-600">
                ✓ File selected: {formData.paymentReceipt.name}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3 text-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
