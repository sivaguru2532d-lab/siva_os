import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/ui';
import { MagneticButton, SocialIcon, GlassCard } from '@/components/ui';
import { personalInfo, socialLinks } from '@/data';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const profileImageRef = useRef<HTMLImageElement>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  const taglines = [
    "Building ideas into meaningful digital experiences.",
    "Turning code into creative solutions.",
    "Learning. Building. Growing.",
    "Crafting digital experiences with purpose.",
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <ScrollReveal direction="up" delay={0}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-text-secondary text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent/50 animate-pulse" />
                  Information Technology Student
                </span>
              </motion.div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-display font-bold text-text-primary tracking-tight mb-6">
                Hi, I&apos;m <span className="text-gradient">{personalInfo.name}</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="text-heading-3 text-text-secondary font-medium mb-6"
              >
                {personalInfo.title}
              </motion.p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="h-8 mb-6">
                <TypingAnimation
                  texts={taglines}
                  className="text-body-lg text-text-secondary font-medium min-h-[1.5rem]"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="text-body text-text-secondary mb-8 max-w-md leading-relaxed"
              >
                {personalInfo.bio}
              </motion.p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={500}>
              <div className="flex flex-wrap gap-3 mb-10">
                <MagneticButton size="lg" variant="primary" className="group">
                  <span>View My Projects</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary" className="group">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Resume</span>
                </MagneticButton>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={600}>
              <div className="flex items-center gap-4">
                {socialLinks.map((link, index) => (
                  <ScrollReveal key={link.name} direction="up" delay={index * 50}>
                    <a
                      href={link.url}
                      target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                      rel={link.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                      aria-label={link.ariaLabel}
                      className="group p-2 rounded-xl bg-glass border border-glass-border hover:bg-glass-hover hover:border-glass-borderHover transition-all duration-normal"
                    >
                      <SocialIcon name={link.icon as any} size={20} className="text-text-secondary group-hover:text-text-primary transition-colors" />
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Profile Image */}
          <ScrollReveal direction="right" delay={200}>
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto aspect-square lg:aspect-[4/5]">
                {/* Glow backdrop */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl blur-2xl opacity-50"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                />

                {/* Profile image container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden glass-panel border border-glass-border">
                  {mounted && !imageError ? (
                    <img
                      ref={profileImageRef}
                      src={personalInfo.profileImage}
                      alt={`${personalInfo.name} - Profile`}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-glass to-glass-hover">
                      <svg className="w-24 h-24 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}

                  {/* Border highlight */}
                  <div className="absolute inset-0 border border-glass-borderHover rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-slower pointer-events-none" />
                </div>

                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-glass border border-glass-border"
                  animate={{ rotate: [0, 180, 360], y: [0, -10, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute bottom-4 -left-4 w-16 h-16 rounded-xl bg-glass border border-glass-border"
                  animate={{ rotate: [360, 180, 0], x: [0, 10, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 2 }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <ScrollReveal direction="up" delay={800}>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-caption uppercase tracking-widest">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TypingAnimation({ texts, className }: { texts: string[]; className?: string }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 30);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return <span className={className}>{displayText}</span>;
}