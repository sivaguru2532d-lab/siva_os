import { ScrollReveal, TiltCard, Tag, SocialIcon } from '@/components/ui';
import { certificates, Certificate } from '@/data/index';

export function Certificates() {
  return (
    <section id="certificates" className="relative py-20 md:py-28 lg:py-32 bg-background-secondary/30">
      <div className="section-container">
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-text-secondary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-accent/50" />
              Certificates
            </span>
            <h2 className="text-heading-1 font-bold text-text-primary tracking-tight mb-4">Certificates & Achievements</h2>
            <p className="text-body-lg text-text-secondary">
              Recognitions and certifications that showcase my learning journey.
            </p>
          </div>
        </ScrollReveal>

        {certificates.length === 0 ? (
          <ScrollReveal direction="up" delay={100}>
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-glass border border-glass-border flex items-center justify-center">
                <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 10c0 .7-.3 1.3-.8 1.7-.4.4-1 .8-1.7.8H6.1c-.7 0-1.3-.4-1.7-.8-.4-.4-.7-1-.7-1.7v-1c0-.7.3-1.3.8-1.7.4-.4 1-.8 1.7-.8h10.6c.7 0 1.3.4 1.7.8.4.4.7 1 .7 1.7v1z" />
                </svg>
              </div>
              <h3 className="text-heading-2 font-semibold text-text-primary mb-3">Certificates coming soon</h3>
              <p className="text-body text-text-secondary max-w-md mx-auto">
                Verified certificates will appear here once they are available.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal direction="up" delay={100}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate, index) => (
                <ScrollReveal key={certificate.id} direction="up" delay={index * 80}>
                  <CertificateCard certificate={certificate} />
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
}

function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <TiltCard intensity={4} className="group h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-glass border border-glass-border">
        {certificate.image ? (
          <img
            src={certificate.image}
            alt={`${certificate.title} certificate`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-glass to-glass-hover text-center">
            <div className="w-16 h-16 rounded-xl bg-accent/10 border border-glass-border flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-body text-text-secondary">Certificate preview unavailable</p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-slower flex items-end p-6">
          <div className="w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-slower">
            <Tag variant="status" className="bg-blue-500/20 text-blue-400">{certificate.date}</Tag>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 space-y-4">
        <div>
          <h3 className="text-heading-3 font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors">{certificate.title}</h3>
          <p className="text-body-sm text-text-secondary">{certificate.organization}</p>
        </div>

        {certificate.description && <p className="text-body-sm text-text-muted line-clamp-2 flex-1">{certificate.description}</p>}

        <div className="pt-2 border-t border-glass-border">
          {certificate.credentialUrl ? (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-sm group-hover:bg-accent/20 transition-colors"
              aria-label={`View ${certificate.title} credential`}
            >
              <SocialIcon name="external" size={16} />
              View Credential
            </a>
          ) : (
            <p className="text-caption text-text-muted text-center">Verification link unavailable</p>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
