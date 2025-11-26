import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMeta } from "../services/api";
import { MetaData } from "../types";

export default function Layout() {
  const [meta, setMeta] = useState<MetaData | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const aboutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contactTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetchMeta().then(setMeta);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash navigation
  const scrollToSection = (hash: string) => {
    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }
    const element = document.getElementById(hash);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const hash = href.substring(2); // Remove '/#'
      scrollToSection(hash);
      setMobileMenuOpen(false);
    }
  };

  // About Us dropdown items
  const aboutDropdownItems = [
    { label: "Our Vision", href: "/vision", isLink: true },
    { label: "Leadership", href: "/leadership", isLink: true },
  ];

  // Contact Us dropdown items
  const contactDropdownItems = [
    { label: "Our Offices", href: "/offices", isLink: true },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slateInk">
      {/* Top Utility Bar */}
      <div className="bg-slateInk text-white text-xs tracking-widest z-50 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
          <span className="uppercase hidden ">Global Education Standard</span>
          <div className="flex gap-6 ml-auto">
            <a href="#" className="hover:text-crimson transition-colors">Student Portal</a>
            <a href="#" className="hover:text-crimson transition-colors">Faculty</a>
            <a href="#" className="hover:text-crimson transition-colors">Blogs</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 border-b border-transparent ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-slate-100 py-3" : "bg-white py-6 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="group transition-opacity hover:opacity-90">
            <img 
              src="/nova-black-logo2.png" 
              alt="Nova Vista Education" 
              className="h-12 md:h-16 lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {/* About Us Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (aboutTimeoutRef.current) {
                  clearTimeout(aboutTimeoutRef.current);
                  aboutTimeoutRef.current = null;
                }
                setAboutDropdownOpen(true);
              }}
              onMouseLeave={() => {
                aboutTimeoutRef.current = setTimeout(() => {
                  setAboutDropdownOpen(false);
                }, 200);
              }}
            >
              <button className="text-xs xl:text-sm font-medium transition-colors uppercase tracking-wider text-slateInk/70 hover:text-crimson whitespace-nowrap flex items-center gap-1">
                About Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {aboutDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onMouseEnter={() => {
                    if (aboutTimeoutRef.current) {
                      clearTimeout(aboutTimeoutRef.current);
                      aboutTimeoutRef.current = null;
                    }
                    setAboutDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    aboutTimeoutRef.current = setTimeout(() => {
                      setAboutDropdownOpen(false);
                    }, 200);
                  }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50"
                >
                  {aboutDropdownItems.map((item) => (
                    item.isLink ? (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setAboutDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-slateInk/70 hover:text-crimson hover:bg-slate-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          setAboutDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-slateInk/70 hover:text-crimson hover:bg-slate-50 transition-colors"
                      >
                        {item.label}
                      </a>
                    )
                  ))}
                </motion.div>
              )}
            </div>

            {/* Online Admission */}
            <a
              href="/#admission"
              onClick={(e) => handleNavClick(e, '/#admission')}
              className="text-xs xl:text-sm font-medium transition-colors uppercase tracking-wider text-slateInk/70 hover:text-crimson whitespace-nowrap"
            >
              Online Admission
            </a>

            {/* Our Services */}
            <Link
              to="/services"
              className="text-xs xl:text-sm font-medium transition-colors uppercase tracking-wider text-slateInk/70 hover:text-crimson whitespace-nowrap"
            >
              Our Services
            </Link>

            {/* Contact Us Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (contactTimeoutRef.current) {
                  clearTimeout(contactTimeoutRef.current);
                  contactTimeoutRef.current = null;
                }
                setContactDropdownOpen(true);
              }}
              onMouseLeave={() => {
                contactTimeoutRef.current = setTimeout(() => {
                  setContactDropdownOpen(false);
                }, 800);
              }}
            >
              <Link to="/contact" className="text-xs xl:text-sm font-medium transition-colors uppercase tracking-wider text-slateInk/70 hover:text-crimson whitespace-nowrap flex items-center gap-1">
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link >
              
              {contactDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onMouseEnter={() => {
                    if (contactTimeoutRef.current) {
                      clearTimeout(contactTimeoutRef.current);
                      contactTimeoutRef.current = null;
                    }
                    setContactDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    contactTimeoutRef.current = setTimeout(() => {
                      setContactDropdownOpen(false);
                    }, 800);
                  }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50"
                >
                  {contactDropdownItems.map((item) => (
                    item.isLink ? (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setContactDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-slateInk/70 hover:text-crimson hover:bg-slate-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(e, item.href);
                          setContactDropdownOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-slateInk/70 hover:text-crimson hover:bg-slate-50 transition-colors"
                      >
                        {item.label}
                      </a>
                    )
                  ))}
                </motion.div>
              )}
            </div>

            {/* Apply Now Button */}
            <Link
              to="/contact"
              className="px-4 xl:px-6 py-2 xl:py-2.5 bg-crimson text-white text-xs xl:text-sm font-semibold rounded-full hover:bg-crimsonDark transition-colors shadow-lg shadow-crimson/20 whitespace-nowrap"
            >
              Apply Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-slateInk"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
             </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              <Link 
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif text-slateInk hover:text-crimson"
              >
                Home
              </Link>
              
              <div className="space-y-2">
                <p className="text-lg font-serif text-slateInk font-semibold">About Us</p>
                {aboutDropdownItems.map((item) => (
                  item.isLink ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block pl-4 text-base text-slateInk/70 hover:text-crimson"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setMobileMenuOpen(false);
                      }}
                      className="block pl-4 text-base text-slateInk/70 hover:text-crimson"
                    >
                      {item.label}
                    </a>
                  )
                ))}
              </div>

              <a
                href="/#admission"
                onClick={(e) => {
                  handleNavClick(e, '/#admission');
                  setMobileMenuOpen(false);
                }}
                className="text-lg font-serif text-slateInk hover:text-crimson"
              >
                Online Admission
              </a>

              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif text-slateInk hover:text-crimson"
              >
                Our Services
              </Link>

              <div className="space-y-2">
                <p className="text-lg font-serif text-slateInk font-semibold">Contact Us</p>
                {contactDropdownItems.map((item) => (
                  item.isLink ? (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block pl-4 text-base text-slateInk/70 hover:text-crimson"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setMobileMenuOpen(false);
                      }}
                      className="block pl-4 text-base text-slateInk/70 hover:text-crimson"
                    >
                      {item.label}
                    </a>
                  )
                ))}
              </div>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2 bg-crimson text-white text-sm font-semibold rounded-full hover:bg-crimsonDark transition-colors text-center"
              >
                Apply Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 bg-parchment relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slateInk text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 px-6">
          <div className="col-span-1 md:col-span-1">
            <img 
              src="/nova-logo-2-white.png" 
              alt="Nova Vista Education" 
              className="h-12 md:h-16 lg:h-20 w-auto object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Empowering Growth. Elevating Futures through academic recognition and skill enhancement.
            </p>
          </div>
          
          <div>
            <p className="kicker text-white/40 mb-6">Headquarters</p>
            <p className="text-white/90 font-serif">B37, Lajpat Nagar-2</p>
            <p className="text-white/90 font-serif">New Delhi, 110024</p>
          </div>

          <div>
            <p className="kicker text-white/40 mb-6">Quick Links</p>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link to="/vision" className="hover:text-white transition-colors">Our Vision</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/leadership" className="hover:text-white transition-colors">Leadership</Link></li>
              <li><Link to="/offices" className="hover:text-white transition-colors">Our Offices</Link></li>
            </ul>
          </div>

          <div>
            <p className="kicker text-white/40 mb-6">Connect</p>
            <div className="flex flex-col gap-3 mb-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">YouTube</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">X (Twitter)</a>
            </div>
            <Link
              to="/contact"
              className="inline-block px-6 py-2 border border-white/20 rounded-full text-sm hover:bg-white hover:text-slateInk transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center md:text-left text-xs text-white/30 uppercase tracking-widest">
          © {new Date().getFullYear()} Nova Vista Education. All rights reserved.
        </div>
      </footer>
    </div>
  );
}