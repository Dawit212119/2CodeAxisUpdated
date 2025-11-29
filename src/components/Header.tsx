'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Mail, Phone, Menu, X, Facebook, Instagram, Twitter, Send, Linkedin, Youtube, User, LogOut } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
    
    // Re-check session when window gains focus (user might have logged in in another tab)
    const handleFocus = () => {
      checkSession();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Re-check session when route changes
  useEffect(() => {
    checkSession();
  }, [pathname]);

  async function checkSession() {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error checking session', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setIsProfileOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error logging out', error);
    }
  }

  function getDashboardLink() {
    if (user?.role === 'admin') {
      return '/admin';
    }
    return '/dashboard';
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Send, href: '#', label: 'Telegram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Learn', href: '/learn' },
    { label: 'Submit Project', href: '/submit-project' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const moreLinks = [
    { label: "Team", href: "/team" },
    { label: "Faq's", href: "/faqs" },
    { label: "Blogs", href: "/blogs" },
  ];

  return (
    <header className="w-full sticky top-0 z-[10000]">
      {/* Top Bar */}
      <div className="hidden md:block bg-[#016B61] text-white py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#9ECFD4]" />
              <a href="mailto:dawitworkye794@gmail.com" className="hover:text-[#9ECFD4] transition-colors">
                dawitworkye794@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#9ECFD4]" />
              <a href="tel:+251920245372" className="hover:text-[#9ECFD4] transition-colors">
                +251 920 245 372
              </a>
            </div>
          </div>

          {/* Follow Us Section */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Follow Us:</span>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-white hover:text-[#9ECFD4] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative bg-white shadow-md py-4 px-4 sm:px-6 lg:px-8 z-[999]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white">
              C
            </div>
            <span className="text-slate-900">
              CODE<span className="text-yellow-500">AXIS</span>
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on screens <= 1024px */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-700 hover:text-[#016B61] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* More dropdown (hover) */}
            <div 
              className="relative"
              onMouseLeave={() => setIsMoreDropdownOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-slate-700 hover:text-[#016B61] transition-colors font-medium"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
              >
                <span>More</span>
                <span className={`text-xs transition-transform ${isMoreDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Invisible bridge to maintain hover when moving to dropdown */}
              <div 
                className="absolute left-0 top-full w-full h-3"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
              ></div>

              {/* Desktop More dropdown */}
              <div 
                className={`absolute left-0 top-full pt-3 w-64 bg-white shadow-lg rounded-b-2xl border border-slate-100 transition-all z-[1000] ${
                  isMoreDropdownOpen 
                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
              >
                <ul className="py-2">
                  {moreLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="block px-6 py-3 text-slate-800 hover:bg-slate-50 hover:text-[#016B61] text-sm font-medium"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Auth Section */}
            {!loading && (
              <>
                {user ? (
                  /* Dashboard and Logout for logged in users */
                  <div className="flex items-center gap-3">
                    <Link
                      href={getDashboardLink()}
                      className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#016B61] transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  /* Get Started Button - Only shown when NOT logged in */
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#016B61] hover:bg-[#70B2B2] rounded-lg transition-colors"
                  >
                    Get Started
                  </Link>
                )}
              </>
            )}

            {/* Mobile Menu Button - Visible on screens <= 1024px */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-slate-700 hover:text-[#016B61] transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Visible on screens <= 1024px */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-slate-700 hover:text-[#016B61] transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile More submenu */}
              <details className="group">
                <summary className="list-none cursor-pointer text-slate-700 font-medium py-2 flex items-center justify-between">
                  <span>More</span>
                  <span className="text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-1 ml-3 flex flex-col border-l border-slate-200 pl-3">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="py-2 text-sm text-slate-700 hover:text-[#016B61]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>

              {/* Mobile Auth Section */}
              {!loading && (
                <div className="pt-4 border-t">
                  {user ? (
                    <>
                      <Link
                        href={getDashboardLink()}
                        className="flex items-center gap-2 text-slate-700 hover:text-[#016B61] transition-colors font-medium py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors font-medium py-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#016B61] hover:bg-[#70B2B2] rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
