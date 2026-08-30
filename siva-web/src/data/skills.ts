export type SkillLevel = 'Familiar' | 'Intermediate' | 'Learning';

export interface Skill {
  name: string;
  level: SkillLevel;
  category: 'Language' | 'Tool' | 'Framework' | 'Other';
  icon?: string;
}

export const skills: Skill[] = [
  { name: 'Python', level: 'Intermediate', category: 'Language' },
  { name: 'C++', level: 'Intermediate', category: 'Language' },
  { name: 'JavaScript', level: 'Learning', category: 'Language' },
  { name: 'HTML', level: 'Intermediate', category: 'Language' },
  { name: 'Git', level: 'Intermediate', category: 'Tool' },
  { name: 'GitHub', level: 'Intermediate', category: 'Tool' },
];

export const skillLevelStyles: Record<SkillLevel, { label: string; color: string; bg: string }> = {
  Familiar: { label: 'Familiar', color: 'text-text-secondary', bg: 'bg-glass' },
  Intermediate: { label: 'Intermediate', color: 'text-text-primary', bg: 'bg-accent/10' },
  Learning: { label: 'Learning', color: 'text-text-muted', bg: 'bg-glass' },
};