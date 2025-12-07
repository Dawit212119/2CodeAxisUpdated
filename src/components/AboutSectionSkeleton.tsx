export default function AboutSectionSkeleton() {
  return (
    <section className="section-padding py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Photo Gallery Skeleton */}
          <div className="relative h-full rounded-lg overflow-hidden shadow-lg flex items-stretch animate-pulse">
            <div className="grid grid-cols-2 gap-2 w-full h-full">
              <div className="row-span-2 bg-slate-200 rounded-lg"></div>
              <div className="bg-slate-200 rounded-lg"></div>
              <div className="bg-slate-200 rounded-lg"></div>
            </div>
          </div>

          {/* Right - Content Skeleton */}
          <div className="space-y-8">
            <div className="h-12 bg-slate-200 rounded w-3/4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6 animate-pulse"></div>
            </div>
            <div className="flex justify-center py-4">
              <div className="w-3 h-3 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 bg-slate-200 rounded w-32 animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded animate-pulse"></div>
              <div>
                <div className="h-10 bg-slate-200 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


