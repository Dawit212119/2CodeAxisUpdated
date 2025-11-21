"use client";

import { Linkedin, Mail, Share2 } from "lucide-react";

type Member = {
  name: string;
  role: string;
  image: string;
  email?: string;
  linkedin?: string;
};

const team: Member[] = [
  {
    name: "Abdi Birassa",
    role: "CEO & Co‑Founder",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    email: "mailto:abdi@example.com",
    linkedin: "#",
  },
  {
    name: "Lulit Bekele",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop",
    email: "mailto:lulit@example.com",
    linkedin: "#",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop",
    email: "mailto:michael@example.com",
    linkedin: "#",
  },
  {
    name: "Jared Smith",
    role: "Lead Engineer",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
    email: "mailto:jared@example.com",
    linkedin: "#",
  },
];

export default function TeamMembersSection() {
  return (
    <section className="team-section-3 section-padding main-bg fix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-orange-500 font-bold text-sm tracking-wide">OUR TEAM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Meet the Team</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            The people behind GenShifter — builders, designers, and strategists driving digital transformation.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {team.map((m) => (
            <article
              key={m.name}
              className="relative group rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden bg-white"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] w-full">
                <img
                  src={m.image}
                  alt={m.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Floating actions (right middle) */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {m.email && (
                    <a
                      href={m.email}
                      aria-label={`Email ${m.name}`}
                      className="h-11 w-11 grid place-items-center rounded-full bg-white text-slate-800 shadow-md hover:shadow-lg hover:text-blue-600 transition"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      aria-label={`${m.name} on LinkedIn`}
                      className="h-11 w-11 grid place-items-center rounded-full bg-white text-slate-800 shadow-md hover:shadow-lg hover:text-blue-600 transition"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>

                {/* Slanted footer */}
                <div
                  className="absolute bottom-0 left-0 w-full text-white"
                  style={{ clipPath: "polygon(0 35%, 100% 20%, 100% 100%, 0 100%)", backgroundColor: "#0e134d" }}
                >
                  <div className="px-6 pt-8 pb-6">
                    <h3 className="text-2xl font-semibold">{m.name}</h3>
                    <p className="text-sm/6 opacity-90">{m.role}</p>
                  </div>

                  {/* Share bubble */}
                  <div className="absolute -top-5 right-6 h-10 w-10 rounded-full bg-[#0e134d] grid place-items-center shadow-md">
                    <Share2 className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
