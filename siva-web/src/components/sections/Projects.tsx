import { ScrollReveal, TiltCard, Tag, SocialIcon } from '@/components/ui';
import { projects, Project } from '@/data/projects';

export function Projects() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  const statusStyles: Record<Project['status'], { label: string; bg: string; text: string }> = {
    completed: { label: 'Completed', bg: 'bg-green-500/20', text: 'text-green-400' },
    'in-progress': { label: 'In Progress', bg: 'bg-blue-500/20', text: 'text-blue-400' },
    planned: { label: 'Planned', bg: 'bg-amber-500/20', text: 'text-amber-400' },
  };

  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-text-secondary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-accent/50" />
              Projects
            </span>
            <h2 className="text-heading-1 font-bold text-text-primary tracking-tight mb-4">Featured Projects</h2>
            <p className="text-body-lg text-text-secondary">
              A collection of projects I&apos;ve built to solve problems and learn new technologies.
            </p>
          </div>
        </ScrollReveal>

        {projects.length === 0 ? (
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-glass border border-glass-border flex items-center justify-center">
                <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-heading-2 font-semibold text-text-primary mb-3">Projects coming soon</h3>
              <p className="text-body text-text-secondary max-w-md mx-auto">
                I&apos;m currently working on real projects to share here. Please check back soon.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <>
            {featuredProjects.length > 0 && (
              <ScrollReveal direction="up" delay={100}>
                <div className="mb-12">
                  <h3 className="text-heading-3 font-semibold text-text-primary mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Featured
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {featuredProjects.map((project, index) => (
                      <ScrollReveal key={project.id} direction="up" delay={index * 100}>
                        <ProjectCard project={project} statusStyles={statusStyles} featured />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {otherProjects.length > 0 && (
              <ScrollReveal direction="up" delay={200}>
                <h3 className="text-heading-3 font-semibold text-text-primary mb-6">All Projects</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProjects.map((project, index) => (
                    <ScrollReveal key={project.id} direction="up" delay={index * 80}>
                      <ProjectCard project={project} statusStyles={statusStyles} />
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  statusStyles: Record<Project['status'], { label: string; bg: string; text: string }>;
  featured?: boolean;
}

function ProjectCard({ project, statusStyles, featured = false }: ProjectCardProps) {
  const status = statusStyles[project.status];

  return (
    <TiltCard intensity={featured ? 5 : 4} className="group h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-glass border border-glass-border">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-glass to-glass-hover">
            <svg className="w-16 h-16 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-slower flex items-end p-6">
          <div className="w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-slower">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.slice(0, 4).map((technology) => (
                <Tag key={technology} variant="skill" className="bg-glass border-glass-border text-text-secondary">
                  {technology}
                </Tag>
              ))}
              {project.technologies.length > 4 && (
                <Tag variant="skill" className="bg-glass border-glass-border text-text-muted">
                  +{project.technologies.length - 4}
                </Tag>
              )}
            </div>
            <div className="flex items-center gap-2">
              {featured && <Tag variant="status" className="bg-amber-500/20 text-amber-400">Featured</Tag>}
              <Tag variant="status" className={`${status.bg} ${status.text}`}>{status.label}</Tag>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-heading-3 font-semibold text-text-primary group-hover:text-accent transition-colors">{project.name}</h3>
          {featured && (
            <span className="flex items-center gap-1 text-amber-400" aria-label="Featured project">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            </span>
          )}
        </div>

        <p className="text-body text-text-secondary line-clamp-3 flex-1">{project.description}</p>

        <div className="flex items-center gap-3 pt-2 border-t border-glass-border">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-secondary text-sm justify-center group-hover:bg-glass-hover transition-colors"
              aria-label={`View ${project.name} on GitHub`}
            >
              <SocialIcon name="github" size={16} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary text-sm justify-center group-hover:bg-accent/20 transition-colors"
              aria-label={`View ${project.name} live demo`}
            >
              <SocialIcon name="external" size={16} />
              Live
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="text-caption text-text-muted flex-1 text-center">Links coming soon</span>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
