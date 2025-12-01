import Link from "next/link";
import { GraduationCap, Code, Users, Lightbulb, ArrowRight, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Guide University Students • CodeAxis",
};

export default function GuideStudentsPage() {
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
                <linearGradient id="guide-students-lines" x1="0" y1="0" x2="1" y2="0">
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
                  stroke="url(#guide-students-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-[#70B2B2]/80 via-[#016B61]/60 to-transparent rotate-[-35deg]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Project Guidance for University Students
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-100 mb-4">
            Turn your academic projects into real-world solutions with expert mentorship from industry professionals
          </p>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Guide Students</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="text-center mb-16">
            <p className="text-[#016B61] font-bold text-sm tracking-wide mb-3">STUDENT SUPPORT</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              We Help You Build Projects That Matter
            </h2>
            <p className="max-w-3xl mx-auto text-slate-600 text-lg">
              At CodeAxis, we understand that university projects are more than just assignments—they're opportunities to build something meaningful. 
              Our team of experienced developers and mentors is here to guide you through every step of your project journey, from concept to completion.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#016B61] rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expert Mentorship</h3>
              <p className="text-slate-600">
                Get guidance from industry professionals who have built real-world applications. Learn best practices, 
                coding standards, and professional development workflows.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#016B61] rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Technical Support</h3>
              <p className="text-slate-600">
                Stuck on a technical challenge? Our developers help you debug issues, implement features, 
                and choose the right technologies for your project.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#016B61] rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Project Ideas</h3>
              <p className="text-slate-600">
                Need inspiration? We help you identify real-world problems and design solutions that showcase 
                your skills and make a meaningful impact.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#016B61] rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Portfolio Building</h3>
              <p className="text-slate-600">
                Transform your academic projects into portfolio-worthy pieces. We help you document your work, 
                write compelling case studies, and present your projects professionally.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#016B61] rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Assurance</h3>
              <p className="text-slate-600">
                Ensure your project meets high standards. We review your code, test functionality, and provide 
                feedback to help you deliver exceptional work.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#016B61] rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Career Preparation</h3>
              <p className="text-slate-600">
                Learn industry-standard tools and practices that employers value. Build projects that demonstrate 
                your readiness for professional software development roles.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-br from-[#016B61] to-[#70B2B2] rounded-2xl p-8 md:p-12 text-white mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">How We Help You</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Submit Your Project</h4>
                <p className="text-slate-100">
                  Share details about your project idea, requirements, and what you need help with.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Get Expert Guidance</h4>
                <p className="text-slate-100">
                  Our team reviews your project and provides personalized mentorship and technical support.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="font-bold text-lg mb-2">Build & Launch</h4>
                <p className="text-slate-100">
                  Complete your project with confidence and add it to your portfolio to impress employers.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-slate-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Whether you're working on a final year project, a capstone assignment, or a personal project, 
              we're here to help you succeed. Submit your project details and let's turn your ideas into reality.
            </p>
            <Link
              href="/submit-project"
              className="inline-flex items-center gap-2 bg-[#016B61] hover:bg-[#70B2B2] text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Submit Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
