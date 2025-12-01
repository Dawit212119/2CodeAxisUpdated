import ServicesGridServer from '@/components/ServicesGridServer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Services Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            'linear-gradient(120deg, #016B61 0%, #016B61 40%, #70B2B2 100%)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 top-0 w-[60%] h-full opacity-40">
            <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="services-lines" x1="0" y1="0" x2="1" y2="0">
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
                  stroke="url(#services-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-[#70B2B2]/80 via-[#016B61]/60 to-transparent rotate-[-35deg]" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Services</h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <span className="opacity-80">Home</span>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Services</span>
          </nav>
        </div>
      </section>

      <ServicesGridServer />
    </div>
  );
}
