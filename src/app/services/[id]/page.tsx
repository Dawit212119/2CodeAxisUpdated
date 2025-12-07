import { Settings, Shield, Code, Users, Network, Lock, Check } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface ServiceData {
  title: string;
  icon: LucideIcon;
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  useCases: string[];
}

const servicesData: Record<string, ServiceData> = {
  'managed-services': {
    title: 'Managed Services',
    icon: Settings,
    description: 'At CodeAxis Technologies, our Managed Services are designed to ensure your business operates smoothly and efficiently.',
    fullDescription: `CodeAxis Technologies offers comprehensive Managed Services that take the burden of IT management off your shoulders. Our expert team proactively monitors, maintains, and optimizes your IT infrastructure 24/7, ensuring maximum uptime and performance. We handle everything from network management and security monitoring to system updates and disaster recovery planning.

Our Managed Services include:
- Proactive system monitoring and maintenance
- Security threat detection and response
- Regular backups and disaster recovery
- Performance optimization
- Help desk support
- Infrastructure management

By partnering with us, you can focus on your core business while we ensure your technology infrastructure runs flawlessly.`,
    benefits: [
      'Reduced IT operational costs',
      '24/7 monitoring and support',
      'Improved system reliability',
      'Enhanced security posture',
      'Scalable solutions',
      'Predictable budgeting',
    ],
    features: [
      'Proactive system monitoring',
      'Security threat detection',
      'Regular backups',
      'Performance optimization',
      'Help desk support',
      'Infrastructure management',
    ],
    useCases: [
      'Small to medium businesses needing IT support',
      'Organizations wanting to reduce IT overhead',
      'Companies requiring 24/7 monitoring',
    ],
  },
  'cybersecurity-services': {
    title: 'Cybersecurity Services',
    icon: Shield,
    description: 'At CodeAxis Technologies, our Cybersecurity Services are designed to provide robust protection against cyber threats.',
    fullDescription: `In today's digital landscape, cybersecurity is paramount. CodeAxis Technologies provides comprehensive cybersecurity solutions to protect your organization from evolving threats. Our team of certified security experts implements multi-layered defense strategies to safeguard your data, systems, and reputation.

Our Cybersecurity Services include:
- Vulnerability assessments and penetration testing
- Security awareness training
- Incident response and management
- Compliance and regulatory support
- Firewall and intrusion detection
- Data encryption and protection

We stay ahead of emerging threats to ensure your organization remains secure.`,
    benefits: [
      'Protection against cyber attacks',
      'Compliance with regulations',
      'Reduced security incidents',
      'Employee security awareness',
      'Rapid incident response',
      'Peace of mind',
    ],
    features: [
      'Vulnerability assessments',
      'Penetration testing',
      'Security awareness training',
      'Incident response',
      'Compliance support',
      'Data encryption',
    ],
    useCases: [
      'Organizations handling sensitive data',
      'Companies needing compliance support',
      'Businesses wanting to improve security posture',
    ],
  },
  'software-development': {
    title: 'Software Development',
    icon: Code,
    description: 'At CodeAxis Technologies, we offer a comprehensive range of software development solutions tailored to your needs.',
    fullDescription: `CodeAxis Technologies specializes in custom software development that transforms your business ideas into powerful, scalable applications. Our experienced development team uses the latest technologies and best practices to deliver high-quality solutions that drive business growth.

Our Software Development Services include:
- Custom application development
- Web application development
- Mobile app development
- Cloud-based solutions
- API development and integration
- Legacy system modernization

From concept to deployment, we partner with you to create software that exceeds expectations.`,
    benefits: [
      'Tailored solutions for your business',
      'Latest technology stack',
      'Scalable architecture',
      'Ongoing support and maintenance',
      'Faster time to market',
      'Cost-effective development',
    ],
    features: [
      'Custom application development',
      'Web application development',
      'Mobile app development',
      'Cloud-based solutions',
      'API development',
      'Legacy system modernization',
    ],
    useCases: [
      'Startups needing custom software',
      'Businesses requiring web applications',
      'Companies needing mobile apps',
    ],
  },
  'training-development': {
    title: 'Training And Development',
    icon: Users,
    description: 'At CodeAxis Technologies, our Training and Development Services are designed to empower your team.',
    fullDescription: `Investing in your team's skills is investing in your business future. CodeAxis Technologies offers comprehensive training and development programs designed to enhance your workforce's technical capabilities and professional growth.

Our Training and Development Services include:
- Technical skills training
- Leadership development programs
- Certification preparation courses
- Custom training solutions
- Workshops and seminars
- Mentoring and coaching

Our expert trainers deliver engaging, practical training that translates directly to improved job performance.`,
    benefits: [
      'Enhanced employee skills',
      'Improved productivity',
      'Better employee retention',
      'Industry certifications',
      'Competitive advantage',
      'Professional growth',
    ],
    features: [
      'Technical skills training',
      'Leadership development',
      'Certification preparation',
      'Custom training solutions',
      'Workshops and seminars',
      'Mentoring and coaching',
    ],
    useCases: [
      'Companies wanting to upskill employees',
      'Organizations needing certification training',
      'Businesses requiring custom training programs',
    ],
  },
  'infrastructure-services': {
    title: 'Infrastructure Services',
    icon: Network,
    description: 'At CodeAxis Technologies, our Infrastructure Services provide a robust and scalable foundation.',
    fullDescription: `A solid IT infrastructure is the backbone of any successful organization. CodeAxis Technologies designs, implements, and manages enterprise-grade infrastructure solutions that support your business growth and ensure optimal performance.

Our Infrastructure Services include:
- Data center design and management
- Cloud infrastructure setup
- Network design and optimization
- Server and storage solutions
- Virtualization services
- Infrastructure monitoring

We build infrastructure that scales with your business needs.`,
    benefits: [
      'Reliable infrastructure',
      'Improved performance',
      'Scalability for growth',
      'Reduced downtime',
      'Cost optimization',
      'Future-proof solutions',
    ],
    features: [
      'Data center design',
      'Cloud infrastructure setup',
      'Network design',
      'Server and storage solutions',
      'Virtualization services',
      'Infrastructure monitoring',
    ],
    useCases: [
      'Companies needing infrastructure setup',
      'Organizations requiring cloud migration',
      'Businesses wanting infrastructure optimization',
    ],
  },
  'system-integration': {
    title: 'System Integration',
    icon: Lock,
    description: 'At CodeAxis Technologies, our System Integration services seamlessly connect your systems.',
    fullDescription: `In a complex IT environment, seamless system integration is crucial. CodeAxis Technologies specializes in integrating disparate systems, applications, and platforms to create a unified, efficient IT ecosystem that enhances productivity and data flow.

Our System Integration Services include:
- Enterprise application integration
- API development and management
- Data migration services
- Legacy system integration
- Middleware solutions
- Integration testing and validation

We ensure all your systems work together harmoniously.`,
    benefits: [
      'Unified system environment',
      'Improved data flow',
      'Reduced manual processes',
      'Better decision-making',
      'Increased efficiency',
      'Seamless operations',
    ],
    features: [
      'Enterprise application integration',
      'API development',
      'Data migration',
      'Legacy system integration',
      'Middleware solutions',
      'Integration testing',
    ],
    useCases: [
      'Companies with multiple systems',
      'Organizations needing data migration',
      'Businesses requiring API integration',
    ],
  },
};

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = servicesData[params.id];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-[#016B61] font-semibold hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #020617 0%, #020617 40%, #0b3bbf 100%)",
        }}
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-40 top-0 w-[60%] h-full opacity-40">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="service-detail-lines" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {[...Array(12)].map((_, i) => (
                <path
                  key={i}
                  d={`M${-200 + i * 30},0 C ${200 + i * 40},150 ${400 + i * 40},450 ${800 +
                    i * 40},600`}
                  fill="none"
                  stroke="url(#service-detail-lines)"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          <div className="absolute -left-40 top-0 w-80 h-full bg-gradient-to-b from-indigo-600/80 via-indigo-700/60 to-transparent rotate-[-35deg]" />
        </div>

        {/* Title + breadcrumb */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Service Details
          </h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <Link href="/services" className="opacity-80 hover:underline">
              Services
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">{service.title}</span>
          </nav>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line mb-8">
                  {service.fullDescription}
                </p>
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Benefits</h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#70B2B2] flex-shrink-0 mt-1" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-[#016B61] hover:bg-[#70B2B2] text-white font-bold py-3 px-6 rounded-lg mt-8 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-slate-900 mb-8">Other Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(servicesData).map(([id, svc]: [string, ServiceData]) => {
              if (id === params.id) return null;
              const SvcIcon = svc.icon;
              return (
                <Link
                  key={id}
                  href={`/services/${id}`}
                  className="group bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-[#E5E9C5] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#9ECFD4] transition-colors">
                    <SvcIcon className="w-6 h-6 text-[#016B61] group-hover:text-[#016B61] transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-[#016B61] transition-colors">{svc.title}</h4>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
