import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Mail, Share2 } from 'lucide-react';
import { getBaseUrl } from '@/lib/get-base-url';

export const dynamic = 'force-dynamic';

type Member = {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  email: string | null;
  linkedin: string | null;
};

async function fetchTeamMembers(): Promise<Member[]> {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl ? `${baseUrl}/api/team-members` : '/api/team-members';
    const res = await fetch(url, {
      cache: 'no-store', // Force fresh data on each request (SSR)
    });
  
    if (!res.ok) {
      console.error(`Failed to fetch team members: ${res.status} ${res.statusText}`);
      return [];
    }
  
    const data = await res.json();
    if (data.members && Array.isArray(data.members)) {
      return data.members;
    }
    return [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

function TeamMembersSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="relative rounded-xl shadow-md overflow-hidden bg-white animate-pulse">
          <div className="aspect-[3/4] w-full bg-slate-200"></div>
        </div>
      ))}
    </div>
  );
}

async function TeamMembersList() {
  const members = await fetchTeamMembers();
  
  if (members.length === 0) {
    return (
      <div className="text-center py-12 text-slate-600">
        No team members available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {members.map((m) => (
        <article
          key={m.id}
          className="relative group rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden bg-white"
        >
          {/* Same structure as TeamMembersSectionClient */}
          <div className="relative aspect-[3/4] w-full">
            {m.imageUrl ? (
              <Image
                src={m.imageUrl}
                alt={m.name}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                {m.name.charAt(0)}
              </div>
            )}

            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {m.email && (
                <a
                  href={`mailto:${m.email}`}
                  aria-label={`Email ${m.name}`}
                  className="h-11 w-11 grid place-items-center rounded-full bg-white text-slate-800 shadow-md hover:shadow-lg hover:text-[#016B61] transition cursor-pointer"
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
                  className="h-11 w-11 grid place-items-center rounded-full bg-white text-slate-800 shadow-md hover:shadow-lg hover:text-[#016B61] transition cursor-pointer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>

            <div
              className="absolute bottom-0 left-0 w-full text-white"
              style={{ clipPath: "polygon(0 35%, 100% 20%, 100% 100%, 0 100%)", backgroundColor: "#016B61" }}
            >
              <div className="px-6 pt-8 pb-6">
                <h3 className="text-2xl font-semibold">{m.name}</h3>
                <p className="text-sm/6 opacity-90">{m.role}</p>
              </div>

              <div className="absolute -top-5 right-6 h-10 w-10 rounded-full bg-[#016B61] grid place-items-center shadow-md">
                <Share2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Static content */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #016B61 0%, #016B61 40%, #70B2B2 100%)",
        }}
      >
        {/* ... existing hero SVG code ... */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Our Team</h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">Home</Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Team</span>
          </nav>
        </div>
      </section>

      {/* Team Members with Suspense */}
      <section className="py-16 md:py-20 bg-[#f3f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Meet Our Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Skilled professionals dedicated to delivering exceptional results.
            </p>
          </div>

          <Suspense fallback={<TeamMembersSkeleton />}>
            <TeamMembersList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
