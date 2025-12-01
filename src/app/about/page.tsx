import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About • CodeAxis",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb/Hero */}
      <section className="breadcrumb-wrapper py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest text-[#016B61] uppercase">About Us</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold">Driving Digital Transformation</h1>
            <nav className="mt-4 text-sm opacity-90">
              <ol className="inline-flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li aria-hidden className="opacity-60">/</li>
                <li className="opacity-90">About</li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* About details on image background */}
      <section
        className="section-padding fix bg-cover"
        style={{ backgroundImage: "url(https://www.genshifter.com/assets/img/service/service-bg-2.jpg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left images */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1534759846116-5799c33ce22a?q=80&w=1200&auto=format&fit=crop"
                alt="Technology collaboration"
                width={1200}
                height={420}
                className="w-full h-[420px] object-cover"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-8 left-16 rounded-2xl overflow-hidden ring-8 ring-white/50 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=800&auto=format&fit=crop"
                alt="Handshake overlay"
                width={800}
                height={448}
                className="w-80 h-56 object-cover"
                unoptimized
              />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-6 left-0 bg-[#016B61] text-white rounded-xl px-6 py-4 shadow-lg">
              <div className="text-lg font-bold">25 Years</div>
              <div className="text-sm opacity-90 -mt-1">Of Experience</div>
            </div>
          </div>

          {/* Right content */}
          <div>
            <span className="inline-block text-[#016B61] font-bold uppercase tracking-wider mb-3">About CodeAxis</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              We Empower Clients With
              <br />
              Innovative Solutions That
              <br />
              Address Their Unique
              <br />
              Challenges.
            </h2>
            <p className="mt-6 text-slate-700 leading-relaxed">
              CodeAxis Technologies is a leading IT company dedicated to providing innovative software solutions
              and services to clients around the world. Since our inception, we have been committed to delivering
              high-quality, customized systems that meet the unique needs of our clients across industries.
            </p>

            {/* Features */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-white shadow grid place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#016B61" strokeWidth="2" className="h-6 w-6"><path d="M3 3v18h18"/><path d="M7 13l3 3 7-7"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Problem Solving</h3>
                  <p className="text-slate-600 text-sm">We analyze challenges and develop effective solutions.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-white shadow grid place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#016B61" strokeWidth="2" className="h-6 w-6"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Mission & Vision</h3>
                  <p className="text-slate-600 text-sm">To innovate and lead in technology solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Our Unique Advantages */}
      <section className="bg-white py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#016B61] mb-3">Why Choose Us</h2>
            <p className="text-lg text-slate-800 font-semibold">Our Unique Advantages</p>
            <div className="mt-6 flex justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-400"></div>
            </div>
          </div>

          {/* Grid around center illustration */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {/* Left column */}
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-[#016B61] mb-3">Experience</h3>
                <p className="text-slate-700 leading-7">
                  Our team boasts extensive industry experience, bringing deep technical expertise and a successful
                  track record in delivering complex projects across various sectors. We understand the unique
                  challenges businesses face and leverage our experience to provide solutions that work.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#016B61] mb-3">Products</h3>
                <p className="text-slate-700 leading-7">
                  We offer a robust portfolio of innovative, scalable, and customizable software solutions. Whether you
                  need a tailored application or an integrated system, our products are designed to enhance your
                  business operations and drive growth.
                </p>
              </div>

              <div className="lg:hidden">
                <h3 className="text-2xl font-bold text-[#016B61] mb-3">Pricing</h3>
                <p className="text-slate-700 leading-7">
                  Our pricing models are designed to offer maximum value. We combine high-quality service with
                  cost-effective solutions, ensuring that you receive exceptional outcomes within your budget.
                </p>
              </div>
            </div>

            {/* Center illustration */}
            <div className="flex justify-center">
              <Image
                src="/images/advantages-center-illustration.png"
                alt="Team working on digital solutions"
                width={400}
                height={400}
                className="max-w-xs md:max-w-md w-full h-auto"
              />
            </div>

            {/* Right column */}
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-[#016B61] mb-3">Approach</h3>
                <p className="text-slate-700 leading-7">
                  We believe in a client-first approach, partnering with you to fully understand your business objectives
                  and challenges. Our collaborative process ensures that the solutions we deliver are perfectly aligned
                  with your strategic goals.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#016B61] mb-3">Delivery</h3>
                <p className="text-slate-700 leading-7">
                  We are committed to delivering projects on time, without compromising on quality. Our streamlined
                  processes and meticulous project management ensure that you receive your solutions when you need them,
                  fully operational and ready to perform.
                </p>
              </div>

              <div className="hidden lg:block">
                <h3 className="text-2xl font-bold text-[#016B61] mb-3">Pricing</h3>
                <p className="text-slate-700 leading-7">
                  Our pricing models are designed to offer maximum value. We combine high-quality service with
                  cost-effective solutions, ensuring that you receive exceptional outcomes within your budget.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#016B61] mb-3">Support</h3>
                <p className="text-slate-700 leading-7">
                  Our commitment to you doesn&apos;t end with delivery. We provide continuous, reliable support to keep your
                  systems running smoothly. Our dedicated support team is always ready to assist, ensuring that you have
                  the help you need when you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are / Our Mission / Our Vision */}
      <section
        className="section-padding py-20 bg-cover"
        style={{ backgroundImage: "url(https://www.genshifter.com/assets/img/service/service-bg-2.jpg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - stacked images */}
          <div className="grid gap-6 grid-rows-1 sm:grid-rows-[2fr,1fr]">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
                alt="Focused professional working on a laptop"
                width={1200}
                height={360}
                className="w-full h-[360px] object-cover"
                unoptimized
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Team collaborating in a meeting"
                  width={800}
                  height={160}
                  className="w-full h-40 object-cover"
                  unoptimized
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop"
                  alt="Colleagues discussing work"
                  width={800}
                  height={160}
                  className="w-full h-40 object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Right column - content */}
          <div className="space-y-8 bg-white/80 rounded-2xl p-8 shadow-xl">
            <div>
              <h2 className="text-3xl font-extrabold text-[#016B61] mb-4">Who We Are</h2>
              <p className="text-slate-700 leading-relaxed">
                CodeAxis Technologies is a U.S.-based IT company headquartered in Seattle, Washington, with a growing
                branch in Addis Ababa, Ethiopia. As a product- and service-based company, we specialize in driving digital
                transformation for both public and private sector clients. Our clients range from startups and small
                businesses to global enterprises. Since our inception, we have been committed to delivering high-quality,
                customized software solutions that meet the unique needs of our clients across various industries.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Our team of highly skilled professionals is passionate about technology and innovation. We specialize in a
                wide range of IT services, including software development, system integration, IT consulting, and project
                management. Our goal is to help businesses leverage technology to improve efficiency, drive growth, and
                achieve their objectives.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#016B61] mb-2">Our Mission</h3>
              <p className="text-slate-700 leading-relaxed">
                To empower businesses through innovative and reliable software solutions that drive growth and efficiency.
                We are dedicated to delivering exceptional value by leveraging the latest technologies and fostering a
                culture of continuous improvement.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#016B61] mb-2">Our Vision</h3>
              <p className="text-slate-700 leading-relaxed">
                To be the leading software solutions provider in Ethiopia and a trusted partner for businesses worldwide,
                helping them set the benchmark for excellence and innovation in their industries.
              </p>
            </div>
          </div>
        </div>

        {/* Our Goals - full width below content, stacked in column */}
        <div className="mt-12 bg-white/85 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#016B61] text-center mb-8">Our Goals</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Goal card */}
            <div className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col gap-2">
              <div className="text-3xl mb-1">🎯</div>
              <h4 className="text-lg font-bold text-slate-900">Client Satisfaction</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Consistently exceed client expectations by delivering high-quality, customized software solutions.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col gap-2">
              <div className="text-3xl mb-1">🎯</div>
              <h4 className="text-lg font-bold text-slate-900">Innovation</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Continuously explore and adopt cutting-edge technologies and methodologies.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col gap-2">
              <div className="text-3xl mb-1">🎯</div>
              <h4 className="text-lg font-bold text-slate-900">Growth And Expansion</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Expand our reach and impact by entering new markets, both nationally and internationally.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col gap-2">
              <div className="text-3xl mb-1">🎯</div>
              <h4 className="text-lg font-bold text-slate-900">Employee Development</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Invest in the growth and development of our team, fostering a culture of learning and collaboration.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col gap-2">
              <div className="text-3xl mb-1">🎯</div>
              <h4 className="text-lg font-bold text-slate-900">Operational Excellence</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Maintain the highest standards of operational efficiency and effectiveness.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md px-6 py-6 flex flex-col gap-2">
              <div className="text-3xl mb-1">🎯</div>
              <h4 className="text-lg font-bold text-slate-900">Strategic Partnerships</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Forge strong alliances with technology leaders and industry experts to enhance our capabilities and offer
                cutting-edge solutions to our clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
