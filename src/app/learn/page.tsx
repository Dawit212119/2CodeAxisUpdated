import { Suspense } from 'react';
import Link from "next/link";
import CourseRegistrationForm, { type Course } from "@/components/CourseRegistrationForm";
import CoursesListClient from "@/components/CoursesListClient";
import { getBaseUrl } from '@/lib/get-base-url';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Learn with CodeAxis",
};

interface LearnPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface CourseData {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  mode: string | null;
  level: string | null;
  features: string[] | null;
}

async function fetchCourses(): Promise<CourseData[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/courses` : '/api/courses';
    const res = await fetch(url, {
      cache: 'no-store', // Ensure fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await res.json();
    return data.courses || [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

function CoursesSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
          <div className="animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-1/3"></div>
          </div>
          <div className="flex items-center justify-between mt-2 gap-2">
            <div className="h-3 bg-slate-200 rounded w-1/4"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-slate-200 rounded w-20"></div>
              <div className="h-8 bg-slate-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = await searchParams;
  const courseParam = params?.course;
  const initialCourseId = Array.isArray(courseParam) ? courseParam[0] : courseParam;
  
  // Fetch courses for the form (needed immediately)
  const coursesData = await fetchCourses();
  const courses: Course[] = coursesData.map((course) => ({
    id: course.id,
    title: course.title,
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #016B61 0%, #016B61 40%, #70B2B2 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 top-0 w-[60%] h-full opacity-40">
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="learn-lines" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#70B2B2" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#9ECFD4" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d={`M${-200 + i * 30},0 C ${200 + i * 40},150 ${400 + i * 40},450 ${800 +
                    i * 40},600`}
                  fill="none"
                  stroke="url(#learn-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-[#70B2B2]/80 via-[#016B61]/60 to-transparent rotate-[-35deg]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Learn with Code Axis
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-100 mb-4">
            Hands-on training programs in software development, cloud computing, and cybersecurity. Build real-world skills with expert instructors.
          </p>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Learn</span>
          </nav>
        </div>
      </section>

      {/* Courses list with Suspense */}
      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Static header */}
          <div className="max-w-3xl">
            <p className="text-[#016B61] font-bold text-sm tracking-wide mb-3">TECH TRAINING</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#016B61] mb-4">
              Training Programs That Build Real Skills
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              All programs combine instructor-led sessions, hands-on projects, and mentoring from
              engineers working on real-world products at CodeAxis.
            </p>
          </div>

          <Suspense fallback={<CoursesSkeleton />}>
            <CoursesListClient courses={coursesData} />
          </Suspense>

          {/* Extra info / value props */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-sm text-slate-700">
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-extrabold text-[#016B61] mb-2">Mentoring</h3>
              <p>
                Get regular feedback on your assignments and career advice from engineers working on
                production systems.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-extrabold text-[#016B61] mb-2">Hands-on projects</h3>
              <p>
                Every course ends with a real mini-project you can showcase to employers or use as a
                starting point for your own product.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-extrabold text-[#016B61] mb-2">Job-ready focus</h3>
              <p>
                We emphasize practical skills: Git, code reviews, cloud deployment, and collaboration
                workflows used in modern teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration form section */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#016B61] mb-4">
              Ready to start learning?
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-4">
              Choose a course that fits your goals and register below. Our team will follow up with
              schedule details, pricing in ETB, and next steps.
            </p>
            <p className="text-sm text-slate-600">
              If you are registering on behalf of a university or organization, mention it in the
              notes so we can tailor the program for your group.
            </p>
          </div>

          <CourseRegistrationForm courses={courses} initialCourseId={initialCourseId} />
        </div>
      </section>
    </div>
  );
}
