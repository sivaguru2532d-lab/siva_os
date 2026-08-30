import { ScrollReveal, GlassCard } from '@/components/ui';
import { resumeData } from '@/data/resume';

export function Resume() {
  const resumeIsAvailable = Boolean(resumeData.fileUrl && resumeData.fileName);

  return (
    <section id="resume" className="relative py-20 md:py-28 lg:py-32">
      <div className="section-container">
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-text-secondary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-accent/50" />
              Resume
            </span>
            <h2 className="text-heading-1 font-bold text-text-primary tracking-tight mb-4">Resume</h2>
            <p className="text-body-lg text-text-secondary">
              {resumeIsAvailable ? 'View or download my latest resume.' : 'My resume will be available here soon.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          <ScrollReveal direction="up" delay={100}>
            <GlassCard variant="hover" padding="lg" className="relative overflow-hidden">
              {resumeIsAvailable ? <ResumePreview /> : <ResumeComingSoon />}
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ResumePreview() {
  const fileUrl = resumeData.fileUrl!;
  const fileName = resumeData.fileName!;

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-20 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center relative overflow-hidden">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/10 to-transparent" />
        </div>
        <div>
          <h3 className="text-heading-3 font-semibold text-text-primary">{fileName}</h3>
          <p className="text-body-sm text-text-secondary">
            PDF Resume{resumeData.lastUpdated ? ` • Updated ${new Date(resumeData.lastUpdated).toLocaleDateString()}` : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5V4.75A2.75 2.75 0 016.75 2h7.5L20 7.75V19.5A2.5 2.5 0 0117.5 22h-11A2.5 2.5 0 014 19.5zM14 2v6h6" />
          </svg>
          View Resume
        </a>
        <a href={fileUrl} download={fileName} className="btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Resume
        </a>
      </div>
    </>
  );
}

function ResumeComingSoon() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-glass border border-glass-border flex items-center justify-center">
        <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-heading-2 font-semibold text-text-primary mb-3">Resume coming soon</h3>
      <p className="text-body text-text-secondary max-w-md mx-auto">
        Please use the contact links if you would like to get in touch in the meantime.
      </p>
    </div>
  );
}
