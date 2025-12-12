export default function ServicesSwiperSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
          <div className="p-8 h-96 flex flex-col">
            <div className="mb-6">
              <div className="w-16 h-16 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2 flex-grow">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
            <div className="h-4 bg-slate-200 rounded w-24 mt-6"></div>
          </div>
        </div>
      ))}
    </div>
  );
}




