import Link from "next/link";
import Image from "next/image";

// Map of all services keyed by their unique IDs (these should match the IDs you
// pass in `?title=` from the services list, e.g. 677af7b15d4b2867d025ed7f).
// Add all your real services here.
const servicesData: Record<string, { title: string; description: string; body: string; image: string }> = {
  "software-development": {
    title: "Software Development",
    description:
      "At CodeAxis Technologies, we offer a comprehensive range of software development solutions tailored to meet your unique business needs and drive growth through innovative technology and industry expertise.",
    body:
      "Our services include:\n\nWeb Development\nWe craft responsive, secure websites and web applications that effectively represent your brand and deliver an outstanding user experience.\n\nKey Features\nResponsive Design: Adaptable to various devices and screen sizes for a consistent experience.\nSecure and Scalable: Robust solutions that ensure security and can expand with your business needs.\nEnhanced User Experience: Optimized to provide a superior experience and effectively represent your brand.\n\nMobile App Development\nOur team develops high-performance, user-friendly mobile applications for both iOS and Android platforms, enhancing user engagement and optimizing workflows.\n\nKey Features\nIntuitive Interfaces: Engaging and easy-to-use designs for a superior user experience.\nHigh Performance: Optimized applications ensuring smooth functionality on both iOS and Android.\nSmooth User Experience: Efficient and seamless performance for enhanced usability.\n\nEnterprise Software Solutions\nWe offer scalable and robust solutions designed to streamline complex processes, integrate seamlessly with existing systems, and deliver valuable data insights.\n\nKey Features\nScalable Solutions: Efficiently manage large-scale operations with scalable solutions.\nSeamless Integration: Integrate smoothly with your current enterprise systems for enhanced efficiency.\nComprehensive Insights: Deliver valuable data analytics and insights for informed decision-making.\n\nCustom Software Development\nWe provide tailor-made software solutions designed to fit your specific operational requirements and seamlessly integrate with your existing systems.\n\nKey Features\nTailored Solutions: Customized software to address your unique business processes.\nSeamless Integration: Smooth integration with your current systems to maintain operational efficiency.\nScalable and Adaptable: Solutions that grow with your business and adjust to future needs.",
    image: "/images/services/software-development.jpg",
  },
  "managed-services": {
    title: "Managed Services",
    description:
      "At CodeAxis Technologies, our Managed Services are designed to ensure your business operates smoothly and securely. We offer a comprehensive suite of services that includes IT Support and Helpdesk, Managed Network Services, Managed Security Services, and Managed Cloud Services.",
    body:
      "Our proactive approach to managing your IT infrastructure allows you to focus on driving your business forward with confidence.\n\nIT Support and Helpdesk\nProactive IT infrastructure management to ensure smooth and secure business operations.\n\nKey Features\n24/7 Support: Around-the-clock assistance to resolve issues quickly.\nExpert Assistance: Access to skilled professionals with deep technical knowledge.\nEfficient Resolution: Fast and effective solutions to minimize downtime.\n\nManaged Network Services\nProactive network management to ensure optimal performance and security.\n\nKey Features\nNetwork Monitoring: Continuous monitoring to detect and address issues proactively.\nPerformance Optimization: Ensuring optimal network performance and reliability.\nScalability: Solutions that grow with your business needs.\n\nManaged Security Services\nAdvanced security management to safeguard your systems and data from cyber threats.\n\nKey Features\nThreat Detection and Response: Advanced tools and strategies to identify and mitigate threats.\nData Protection: Robust measures to safeguard your sensitive information.\nCompliance: Ensuring adherence to industry regulations and standards.\n\nManaged Cloud Services\nAdvanced cloud management to optimize performance and cost-efficiency.\n\nKey Features\nCloud Optimization: Tailored solutions for optimal cloud performance and cost-efficiency.\nScalability: Easily adjust resources based on your business needs.\nSupport and Management: Comprehensive management and support to ensure seamless cloud operations.",
    image: "/images/services/managed-services.jpg",
  },
  "infrastructure-services": {
    title: "Infrastructure Services",
    description:
      "At CodeAxis Technologies, we provide a full range of Infrastructure Services designed to optimize and enhance your IT infrastructure.",
    body:
      "Our offerings include Network Setup and Management, Server Installation and Maintenance, Cloud Services (IaaS, PaaS, SaaS), and Data Center Management. We focus on ensuring that your IT operations are robust, scalable, and efficient, enabling your business to thrive in a digital landscape.\n\nNetwork Setup and Management\nWe design, implement, and manage your network infrastructure to ensure seamless connectivity and reliable performance.\n\nKey Features\nNetwork Design and Implementation: Custom solutions tailored to your business requirements.\nOngoing Management: Continuous monitoring and maintenance to ensure optimal network performance.\nTroubleshooting and Support: Rapid resolution of network issues to minimize downtime.\n\nServer Installation and Maintenance\nOur services cover the installation, configuration, and ongoing maintenance of your server infrastructure to ensure stability and efficiency.\n\nKey Features\nServer Setup: Professional installation and configuration of servers to meet your operational needs.\nRegular Maintenance: Routine checks and updates to ensure server reliability and performance.\nPerformance Optimization: Enhancements to maximize server efficiency and response times.\n\nCloud Services (IaaS, PaaS, SaaS)\nWe offer a range of cloud solutions, including Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS), to support your business operations.\n\nKey Features\nIaaS: Scalable and flexible infrastructure solutions to support your IT needs.\nPaaS: Development and deployment platforms for building and managing applications.\nSaaS: Access to essential software applications with minimal upfront investment.\n\nData Center Management\nWe manage and maintain your data center facilities to ensure secure, efficient, and reliable operation.\n\nKey Features\nFacility Management: Comprehensive oversight of physical and virtual data center environments.\nSecurity and Compliance: Implementing measures to protect your data and meet regulatory requirements.\nResource Optimization: Efficient use of data center resources to reduce costs and improve performance.",
    image: "/images/services/infrastructure-services.jpg",
  },
  "system-integration": {
    title: "System Integration",
    description:
      "At CodeAxis Technologies, our System Integration services are designed to provide seamless connectivity and enhance the efficiency of your IT environment.",
    body:
      "We specialize in API Integration, Enterprise Application Integration, and Middleware Development to unify your disparate systems and applications. Our goal is to ensure smooth data exchange, improved performance, and a cohesive IT ecosystem that drives your business forward.\n\nAPI Integration\nWe enable your systems to communicate effectively by integrating various APIs, allowing for efficient data exchange and interaction between different software applications.\n\nKey Features\nCustom API Development: Tailored API solutions to meet your specific integration needs.\nEnhanced Connectivity: Seamless interaction between diverse applications and services.\nReal-time Data Exchange: Immediate synchronization of data across systems.\n\nEnterprise Application Integration\nOur services focus on integrating your enterprise applications to streamline processes, improve data accuracy, and enhance overall efficiency.\n\nKey Features\nHolistic Integration: Unified view and management of enterprise applications.\nProcess Optimization: Streamlined workflows and reduced redundancy.\nImproved Data Consistency: Ensuring accurate and up-to-date information across applications.\n\nMiddleware Development\nWe develop and implement middleware solutions to facilitate communication and data exchange between different software applications and systems.\n\nKey Features\nCustom Middleware Solutions: Tailored middleware to fit your specific integration requirements.\nEnhanced Performance: Optimized communication channels for better system performance.\nScalability: Middleware solutions that grow with your business needs.",
    image: "/images/services/system-integration.jpg",
  },
  "training-development": {
    title: "Training and Development",
    description:
      "At CodeAxis Technologies, our Training and Development services are designed to empower your team with the knowledge and skills needed to leverage your technology effectively.",
    body:
      "We offer tailored programs in Technical Training, Software Training, and End-User Training to ensure enhanced proficiency and optimal utilization of your systems.\n\nTechnical Training\nWe provide specialized training for IT professionals to deepen their technical expertise and stay current with the latest technologies and practices.\n\nKey Features\nIn-Depth Technical Courses: Comprehensive training on advanced technical topics and tools.\nHands-On Experience: Practical sessions to apply theoretical knowledge in real-world scenarios.\nCertification Preparation: Assistance with industry-recognized certifications and qualifications.\n\nSoftware Training\nOur software training programs are designed to help your team master the specific software applications your business uses.\n\nKey Features\nApplication-Specific Training: Focused sessions on the software tools relevant to your organization.\nCustomized Content: Tailored training materials to address your software's unique features and functions.\nInteractive Learning: Engaging methods to ensure effective learning and retention.\n\nEnd-User Training\nOur end-user training programs are designed to help your team master the specific software applications your business uses.\n\nKey Features\nUser-Friendly Training: Simple, clear instructions suited to users of all skill levels.\nPractical Exercises: Real-world scenarios to help users apply what they've learned.\nOngoing Support: Resources and assistance to address any questions or issues that arise post-training.",
    image: "/images/services/training-development.jpg",
  },
  "cybersecurity-services": {
    title: "Cybersecurity Services",
    description:
      "At CodeAxis Technologies, our Cybersecurity Services are designed to provide robust protection against digital threats and ensure the safety of your critical data and systems.",
    body:
      "Our comprehensive offerings include Security Audits and Assessments, Threat Detection and Response, Vulnerability Management, and Data Encryption and Protection. We implement advanced strategies to fortify your digital environment, proactively identify risks, and maintain the highest level of security.\n\nSecurity Audits and Assessments\nWe conduct thorough security audits and assessments to evaluate your current security posture and identify potential vulnerabilities.\n\nKey Features\nComprehensive Audits: Detailed examinations of your security infrastructure and practices.\nRisk Identification: Detection of weaknesses and potential threats to your systems.\nActionable Recommendations: Practical advice for enhancing your security measures and policies.\n\nThreat Detection and Response\nOur services provide real-time monitoring and rapid response to emerging threats, minimizing potential damage and downtime.\n\nKey Features\n24/7 Monitoring: Continuous surveillance of your network and systems for suspicious activities.\nImmediate Response: Quick action to address and neutralize threats as they arise.\nIncident Management: Detailed reporting and management of security incidents to prevent recurrence.\n\nVulnerability Management\nWe identify and manage vulnerabilities within your IT environment to reduce the risk of exploitation and ensure system integrity.\n\nKey Features\nVulnerability Scanning: Regular scans to detect potential security weaknesses.\nPatch Management: Timely updates and patches to address identified vulnerabilities.\nRisk Prioritization: Assessment and prioritization of vulnerabilities based on potential impact.\n\nData Encryption and Protection\nWe implement robust encryption and protection measures to safeguard your sensitive data from unauthorized access and breaches.\n\nKey Features\nData Encryption: Advanced encryption techniques to secure data both at rest and in transit.\nAccess Controls: Strict access management to ensure only authorized personnel can view or modify sensitive information.\nData Loss Prevention: Strategies and tools to prevent accidental or malicious data loss.",
    image: "/images/services/cybersecurity-services.jpg",
  },
};

interface ServiceDetailsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ServiceDetailsPage({ searchParams }: ServiceDetailsPageProps) {
  const params = await searchParams;
  const titleParam = params?.title;
  const id = Array.isArray(titleParam) ? titleParam[0] : titleParam;
  const service = id ? servicesData[id] : undefined;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold mb-3 text-slate-900">Service not found</h1>
          <p className="text-slate-600 mb-6">The service you are looking for does not exist or may have been moved.</p>
          <Link href="/services" className="text-[#016B61] font-semibold hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-40 text-white"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #020617 0%, #020617 40%, #0b3bbf 100%)",
        }}
      >
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Service Details</h1>
          <nav className="text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <Link href="/" className="opacity-80 hover:underline">
              Home
            </Link>
            <span className="opacity-70">/</span>
            <span className="opacity-100">Service Details</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding fix bg-[#f3f7fb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between gap-10 items-start">
          {/* Left: All Services list */}
          <aside className="bg-white rounded-2xl shadow-md p-6 w-full lg:w-1/3">
            <h3 className="text-lg font-extrabold text-[#016B61] mb-4 border-b pb-3">All Services</h3>
            <ul className="space-y-3">
              {Object.entries(servicesData).map(([serviceId, svc]) => (
                <li key={serviceId}>
                  <Link
                    href={`/service-details?title=${serviceId}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                      serviceId === id
                        ? "bg-[#016B61] text-white border-[#016B61]"
                        : "bg-white text-slate-800 border-slate-200 hover:border-[#016B61] hover:text-[#016B61]"
                    }`}
                  >
                    <span>{svc.title}</span>
                    <span className="text-xs">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Right: Current service details */}
          <div className="bg-white rounded-2xl shadow-md p-8 w-full lg:flex-1">
            <div className="mb-6">
              <Image
                src={service.image}
                alt={`${service.title} illustration`}
                width={800}
                height={288}
                className="w-full h-56 md:h-72 object-cover rounded-xl"
              />
            </div>
            <h2 className="text-3xl font-extrabold text-[#016B61] mb-4">{service.title}</h2>
            <p className="text-lg text-slate-700 mb-6">{service.description}</p>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-4">{service.body}</p>
            <p className="text-slate-600 leading-relaxed">
              We tailor <span className="font-semibold">{service.title}</span> to your specific industry and technology
              stack, ensuring measurable business impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
