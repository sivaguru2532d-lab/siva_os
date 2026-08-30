import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialIcon } from '@/components/ui';
import { socialLinks, personalInfo } from '@/data';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-normal ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-glass-strong border-b border-glass-border py-3'
            : 'bg-transparent py-4'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="flex items-center gap-2 text-text-primary font-semibold text-lg"
              aria-label="Go to homepage"
            >
              <span className="w-8 h-8 rounded-xl bg-glass border border-glass-border flex items-center justify-center">
                <span className="text-sm font-mono font-bold">{personalInfo.name.charAt(0)}</span>
              </span>
              <span className="hidden sm:block">{personalInfo.name}</span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-fast ${
                    activeSection === item.id
                      ? 'text-text-primary bg-glass border border-glass-border'
                      : 'text-text-secondary hover:text-text-primary hover:bg-glass'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-xl bg-glass border border-glass-border text-text-secondary hover:text-text-primary hover:bg-glass-hover transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background-secondary/95 backdrop-blur-glass-strong border-l border-glass-border p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-semibold text-text-primary">{personalInfo.name}</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-glass border border-glass-border text-text-secondary hover:text-text-primary hover:bg-glass-hover transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1" aria-label="Mobile navigation">
                <ul className="space-y-2" role="list">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-body font-medium transition-all duration-fast ${
                          activeSection === item.id
                            ? 'text-text-primary bg-glass border border-glass-border'
                            : 'text-text-secondary hover:text-text-primary hover:bg-glass'
                        }`}
                        aria-current={activeSection === item.id ? 'page' : undefined}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="pt-6 border-t border-glass-border space-y-4">
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                      rel={link.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                      aria-label={link.ariaLabel}
                      className="p-2 rounded-xl bg-glass border border-glass-border text-text-secondary hover:text-text-primary hover:bg-glass-hover hover:border-glass-borderHover transition-all duration-normal"
                    >
                      <SocialIcon name={link.icon as any} size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <div
              className="absolute inset-0 bg-background/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}