import { ScrollReveal, TiltCard, GlassCard } from '@/components/ui';
import { personalInfo } from '@/data/index';

export function About() {
  const aboutParagraphs = personalInfo.about.split('\n\n').filter(p => p.trim());

  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-32">
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="max-w-2xl mb-16">
            <h2 className="text-heading-1 font-bold text-text-primary tracking-tight mb-4">About Me</h2>
            <p className="text-body-lg text-text-secondary">
              I enjoy learning by building, turning new ideas into practical projects, and improving with each iteration.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bio */}
          <ScrollReveal direction="up" delay={100}>
            <TiltCard intensity={5} className="lg:col-span-2">
              <div className="space-y-6">
                {aboutParagraphs.map((paragraph, index) => (
                  <ScrollReveal key={index} direction="up" delay={index * 100}>
                    <p className="text-body text-text-secondary leading-relaxed">
                      {paragraph}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>

          {/* Education Card */}
          <ScrollReveal direction="right" delay={200}>
            <GlassCard variant="hover" padding="lg" className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-glass-border flex items-center justify-center">
                  <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <span className="text-caption text-text-muted uppercase tracking-wider">Education</span>
                  <p className="text-sm text-text-primary font-medium mt-0.5">Bachelor of Technology</p>
                </div>
              </div>

              <div className="space-y-4 border-t border-glass-border pt-6">
                <div>
                  <h3 className="text-heading-3 font-semibold text-text-primary">{personalInfo.education.degree}</h3>
                  <p className="text-body text-text-secondary mt-1">{personalInfo.education.institution}</p>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-glass border border-glass-border">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-caption text-text-muted">Current Status</span>
                    <p className="text-sm text-text-primary font-medium">{personalInfo.education.year}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-glass border border-glass-border">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-caption text-text-muted">Expected Graduation</span>
                    <p className="text-sm text-text-primary font-medium">{personalInfo.education.graduation}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}