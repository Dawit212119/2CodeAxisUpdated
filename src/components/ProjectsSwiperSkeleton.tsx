export default function ProjectsSwiperSkeleton() {
  return (
    <div className="project-items">
      <div className="projects-swiper">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-none border border-gray-200 overflow-hidden animate-pulse">
            <div className="h-72 bg-slate-200"></div>
            <div className="p-6">
              <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}






