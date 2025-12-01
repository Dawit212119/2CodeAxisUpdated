import { Suspense } from 'react';
import TeamMembersSectionClient from './TeamMembersSectionClient';
import TeamMembersSectionSkeleton from './TeamMembersSectionSkeleton';

type Member = {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  email: string | null;
  linkedin: string | null;
};

async function fetchTeamMembers(): Promise<Member[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/team-members?owner=true`, {
    next: { 
      revalidate: 60,
      tags: ['team-members']
    },
  });
  
  if (!res.ok) {
    return [];
  }
  
  const data = await res.json();
  return data.members || [];
}

async function TeamMembersData() {
  const members = await fetchTeamMembers();
  return <TeamMembersSectionClient members={members} />;
}

export default function TeamMembersSectionServer() {
  return (
    <section className="team-section-3 section-padding main-bg fix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Static content shows immediately */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-[#70B2B2] rounded-full" />
            <span className="text-[#016B61] font-bold text-sm tracking-wide">MEET THE TEAM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Expert Engineers & Consultants</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Skilled professionals with deep expertise in software development, cloud architecture, and system design.
          </p>
        </div>

        {/* Team Members Grid with Suspense */}
        <Suspense fallback={<TeamMembersSectionSkeleton />}>
          <TeamMembersData />
        </Suspense>
      </div>
    </section>
  );
}

