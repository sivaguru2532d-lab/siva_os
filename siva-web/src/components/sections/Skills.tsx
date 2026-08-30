import { useEffect, useRef, useState } from 'react';
import { ScrollReveal, TiltCard, Tag } from '@/components/ui';
import { skills, SkillLevel, skillLevelStyles } from '@/data/skills';

export function Skills() {
  const getLevelProgress = (level: SkillLevel) => {
    switch (level) {
      case 'Intermediate': return 75;
      case 'Familiar': return 45;
      case 'Learning': return 20;
      default: return 0;
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="relative py-20 md:py-28 lg:py-32 bg-background-secondary/30">
      <div className="section-container">
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-text-secondary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-accent/50" />
              Skills
            </span>
            <h2 className="text-heading-1 font-bold text-text-primary tracking-tight mb-4">Technical Skills</h2>
            <p className="text-body-lg text-text-secondary">
              Technologies and tools I work with. Levels indicate my current proficiency.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <ScrollReveal key={category} direction="up" delay={categoryIndex * 150}>
              <div className="mb-6">
                <h3 className="text-heading-3 font-semibold text-text-primary mb-2 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent/30 rounded-full" />
                  {category}
                </h3>
                <p className="text-caption text-text-muted uppercase tracking-wider">
                  {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill, index) => (
                  <ScrollReveal key={skill.name} direction="up" delay={index * 80}>
                    <SkillCard skill={skill} progress={getLevelProgress(skill.level)} />
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal direction="up" delay={300}>
            <div className="pt-8 border-t border-glass-border">
              <h4 className="text-sm font-medium text-text-secondary mb-4">Proficiency Levels</h4>
              <div className="flex flex-wrap gap-3">
                {(['Intermediate', 'Familiar', 'Learning'] as SkillLevel[]).map((level) => (
                  <div key={level} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-glass border border-glass-border">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: skillLevelStyles[level].bg.replace('bg-', '') }}
                    />
                    <span className="text-sm text-text-secondary">{skillLevelStyles[level].label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  skill: typeof skills[0];
  progress: number;
}

function SkillCard({ skill, progress }: SkillCardProps) {
  const levelStyle = skillLevelStyles[skill.level];

  return (
    <TiltCard intensity={3} className="group">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-glass border border-glass-border flex items-center justify-center group-hover:border-glass-borderHover transition-colors">
              <span className="text-text-primary font-mono text-lg font-medium">{skill.name.slice(0, 3).toUpperCase()}</span>
            </div>
            <div>
              <h4 className="text-body font-medium text-text-primary">{skill.name}</h4>
              <Tag variant="skill" className={levelStyle.color}>{levelStyle.label}</Tag>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-text-muted">Proficiency</span>
            <span className="text-text-secondary font-mono">{progress}%</span>
          </div>
          <SkillProgressBar progress={progress} />
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
          <svg className="w-10 h-10 text-text-muted/50" viewBox="0 0 40 40" aria-hidden="true">
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={100.53}
              strokeDashoffset={100.53 - (100.53 * progress) / 100}
              className="text-accent/30"
            />
          </svg>
        </div>
      </div>
    </TiltCard>
  );
}

function SkillProgressBar({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasBeenVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -48px', threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-2 bg-glass border border-glass-border rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-accent/30 to-accent/60"
        style={{
          width: hasBeenVisible ? `${progress}%` : '0%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 100%)',
          transition: 'width 850ms cubic-bezier(0.4, 0, 0.2, 1) 150ms',
        }}
      />
    </div>
  );
}
