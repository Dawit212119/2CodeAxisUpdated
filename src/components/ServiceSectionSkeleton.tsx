import SkeletonCard from './SkeletonCard';

export default function ServiceSectionSkeleton() {
  return (
    <section className="section-padding py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Static content shows immediately */}
        <div className="mb-16">
          <p className="text-[#016B61] font-bold text-sm tracking-wide mb-4">OUR SERVICES</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
            Empowering Your Business<br />With Expert IT Solutions
          </h2>
        </div>

        {/* Skeleton Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* CTA Section - Static */}
        <div className="text-center py-12 border-t border-slate-200 mt-12">
          <p className="text-slate-700 text-lg mb-4">
            Need Any Kind Of IT Solution For Your Business?
          </p>
          <div className="inline-block bg-slate-200 animate-pulse text-white font-bold py-3 px-8 rounded">
            Explore All Services
          </div>
        </div>
      </div>
    </section>
  );
}
