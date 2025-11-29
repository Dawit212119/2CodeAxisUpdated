import Link from 'next/link';
import { Mail, Phone, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-[#016B61] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#9ECFD4]" />
                <a
                  href="mailto:dawitworkye794@gmail.com"
                  className="hover:text-[#9ECFD4] transition-colors"
                >
                  dawitworkye794@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#9ECFD4]" />
                <a
                  href="tel:+251920245372"
                  className="hover:text-[#9ECFD4] transition-colors"
                >
                  +251 920 245 372
                </a>
              </div>
            </div>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-[#70B2B2] hover:bg-[#9ECFD4] transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex gap-6">
              {/* Left Column */}
              <ul className="space-y-2 flex-1">
                <li>
                  <Link href="/" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/learn" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Learn
                  </Link>
                </li>
                <li>
                  <Link href="/submit-project" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Submit Project
                  </Link>
                </li>
              </ul>
              
              {/* Vertical Separator */}
              <div className="w-px bg-slate-700"></div>
              
              {/* Right Column */}
              <ul className="space-y-2 flex-1">
                <li>
                  <Link href="/about" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/faqs" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Faq's
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-[#9ECFD4] transition-colors cursor-pointer">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-slate-400 text-sm">
            &copy; {currentYear} Code Axis — Transforming Ideas Into Scalable Digital Solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
