"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Linkedin, Mail, Share2 } from "lucide-react";

type Member = {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  email: string | null;
  linkedin: string | null;
};

export default function TeamMembersSection() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        // Fetch only members with owner=true
        const res = await fetch('/api/team-members?owner=true');
        const data = await res.json();
        if (res.ok && data.members) {
          setMembers(data.members);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeamMembers();
  }, []);
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
            The people behind CodeAxis — builders, designers, and strategists driving digital transformation.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-600">Loading team members...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-slate-600">No team members available at the moment.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {members.map((m) => (
                <article
                  key={m.id}
                  className="relative group rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden bg-white"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] w-full">
                    {m.imageUrl ? (
                      <img
                        src={m.imageUrl}
                        alt={m.name}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                        {m.name.charAt(0)}
                      </div>
                    )}

                    {/* Floating actions (right middle) */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                      {m.email && (
                        <a
                          href={`mailto:${m.email}`}
                          aria-label={`Email ${m.name}`}
                          className="h-11 w-11 grid place-items-center rounded-full bg-white text-slate-800 shadow-md hover:shadow-lg hover:text-blue-600 transition cursor-pointer"
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} on LinkedIn`}
                          className="h-11 w-11 grid place-items-center rounded-full bg-white text-slate-800 shadow-md hover:shadow-lg hover:text-blue-600 transition cursor-pointer"
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

            {/* Team Members Button */}
            <div className="text-center mt-12">
              <Link
                href="/team"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded transition-colors duration-200 cursor-pointer"
              >
                Team Members →
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
