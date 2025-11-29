import Link from "next/link";
import CourseRegistrationForm, { type Course } from "@/components/CourseRegistrationForm";

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

async function getCourses(): Promise<CourseData[]> {
  try {
    // For server-side, try to use internal API or fetch from localhost
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/courses`, {
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

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const params = await searchParams;
  const courseParam = params?.course;
  const initialCourseId = Array.isArray(courseParam) ? courseParam[0] : courseParam;
  
  const coursesData = await getCourses();
  
  // Map to Course type for the form
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
            "linear-gradient(120deg, #020617 0%, #020617 40%, #0b3bbf 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 top-0 w-[60%] h-full opacity-40">
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="learn-lines" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
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

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-indigo-600/80 via-indigo-700/60 to-transparent rotate-[-35deg]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Learn with CodeAxis
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-100 mb-4">
            Practical, industry-focused training programs designed to help students and professionals
            build real skills in software development, cloud, and cybersecurity.
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

      {/* Courses list */}
      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <p className="text-orange-500 font-bold text-sm tracking-wide mb-3">LEARNING PATHS</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e134d] mb-4">
              Courses we offer for students and professionals
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              All programs combine instructor-led sessions, hands-on projects, and mentoring from
              engineers working on real-world products at CodeAxis.
            </p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {coursesData.length === 0 ? (
              <div className="col-span-2 text-center py-12 text-slate-600">
                No courses available at the moment. Please check back later.
              </div>
            ) : (
              coursesData.map((course: CourseData) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-[#0e134d] mb-2">{course.title}</h3>
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
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-semibold text-slate-700">
                      {course.level ? `Level: ${course.level}` : "Level: Beginner – Intermediate"}
                    </p>
                    <Link
                      href={`/learn?course=${course.id}#register`}
                      className="inline-flex items-center justify-center rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] text-white font-semibold px-4 py-2 text-sm shadow-sm transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Extra info / value props */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-sm text-slate-700">
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-extrabold text-[#0e134d] mb-2">Mentoring</h3>
              <p>
                Get regular feedback on your assignments and career advice from engineers working on
                production systems.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-extrabold text-[#0e134d] mb-2">Hands-on projects</h3>
              <p>
                Every course ends with a real mini-project you can showcase to employers or use as a
                starting point for your own product.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-extrabold text-[#0e134d] mb-2">Job-ready focus</h3>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0e134d] mb-4">
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
