import { SocialIcon } from '@/components/ui';
import { socialLinks, personalInfo } from '@/data/index';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-glass-border bg-background-secondary/30">
      <div className="section-container">
        <div className="py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl bg-glass border border-glass-border flex items-center justify-center">
                  <span className="text-base font-mono font-bold">{personalInfo.name.charAt(0)}</span>
                </span>
                <div>
                  <h3 className="text-heading-3 font-bold text-text-primary">{personalInfo.name}</h3>
                  <p className="text-body-sm text-text-secondary">{personalInfo.title}</p>
                </div>
              </div>
              <p className="text-body-sm text-text-muted max-w-xs">
                Building ideas into meaningful digital experiences.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={link.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  aria-label={link.ariaLabel}
                  className="group p-2.5 rounded-xl bg-glass border border-glass-border text-text-secondary hover:text-text-primary hover:bg-glass-hover hover:border-glass-borderHover transition-all duration-normal"
                >
                  <SocialIcon name={link.icon as any} size={20} className="group-hover:scale-110 transition-transform duration-normal" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-body-sm text-text-muted">
                &copy; {currentYear} {personalInfo.name}. All rights reserved.
              </p>
              <p className="text-caption text-text-muted mt-1">
                Built with React, TypeScript, Tailwind CSS & Framer Motion
              </p>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="mt-12 pt-8 border-t border-glass-border">
            <div className="max-w-md mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}