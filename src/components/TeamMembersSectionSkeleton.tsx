export default function TeamMembersSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="relative rounded-xl shadow-md overflow-hidden bg-white animate-pulse">
          <div className="aspect-[3/4] w-full bg-slate-200"></div>
        </div>
      ))}
    </div>
  );
}
