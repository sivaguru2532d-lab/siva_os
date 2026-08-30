import { useState } from 'react';
import { ScrollReveal, GlassCard, MagneticButton } from '@/components/ui';
import { SocialIcon, type SocialIconProps } from '@/components/ui';
import { socialLinks, contactInfo } from '@/data/index';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'unavailable'>('idle');
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validateForm = () => {
    const nextErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) nextErrors.name = 'Name is required';
    if (!formData.email.trim()) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email address';
    if (!formData.message.trim()) nextErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) setStatus('unavailable');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setStatus('idle');
    if (errors[name as keyof typeof errors]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const phoneHref = `tel:${contactInfo.phone.replace(/\s/g, '')}`;
  const externalLinks = socialLinks.filter((link) => ['LinkedIn', 'GitHub', 'Instagram'].includes(link.name));

  return (
    <section id="contact" className="relative py-20 md:py-28 lg:py-32 bg-background-secondary/30">
      <div className="section-container">
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-16 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-glass-border text-text-secondary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-accent/50" />
              Contact
            </span>
            <h2 className="text-heading-1 font-bold text-text-primary tracking-tight mb-4">Let&apos;s Connect</h2>
            <p className="text-body-lg text-text-secondary">Have a project in mind or just want to say hi? I&apos;d love to hear from you.</p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal direction="up" delay={100}>
            <div className="space-y-8">
              <GlassCard variant="hover" padding="lg">
                <h3 className="text-heading-3 font-semibold text-text-primary mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <ContactDetail icon="mail" label="Email" href={`mailto:${contactInfo.email}`}>{contactInfo.email}</ContactDetail>
                  <ContactDetail icon="phone" label="Phone" href={phoneHref}>{contactInfo.phone}</ContactDetail>
                </div>
              </GlassCard>

              <GlassCard variant="hover" padding="lg">
                <h3 className="text-heading-3 font-semibold text-text-primary mb-6">Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <a href={`mailto:${contactInfo.email}`} className="btn-secondary px-4 py-2 text-sm gap-1.5" aria-label="Send email">
                    <SocialIcon name="mail" size={16} />
                    Email Me
                  </a>
                  <a href={phoneHref} className="btn-secondary px-4 py-2 text-sm gap-1.5" aria-label="Call">
                    <SocialIcon name="phone" size={16} />
                    Call
                  </a>
                  {externalLinks.map((link) => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel} className="btn-secondary px-4 py-2 text-sm gap-1.5">
                      <SocialIcon name={link.icon as SocialIconProps['name']} size={16} />
                      {link.name}
                    </a>
                  ))}
                </div>
              </GlassCard>

              <GlassCard variant="hover" padding="lg">
                <h3 className="text-heading-3 font-semibold text-text-primary mb-6">Follow Me</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      aria-label={link.ariaLabel}
                      className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-glass border border-glass-border text-text-secondary hover:text-text-primary hover:bg-glass-hover hover:border-glass-borderHover transition-all duration-normal"
                    >
                      <SocialIcon name={link.icon as SocialIconProps['name']} size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{link.name}</span>
                    </a>
                  ))}
                </div>
              </GlassCard>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <GlassCard variant="hover" padding="lg">
              <h3 className="text-heading-3 font-semibold text-text-primary mb-2">Send a Message</h3>
              <p className="text-body-sm text-text-secondary mb-6">
                Direct form delivery is not configured yet. Validate your message here, then use the email link to send it securely.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <FormField label="Name" name="name" value={formData.name} error={errors.name} onChange={handleChange} placeholder="Your name" />
                <FormField label="Email" name="email" type="email" value={formData.email} error={errors.email} onChange={handleChange} placeholder="your@email.com" />
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className={`input-field resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : ''}`} placeholder="What&apos;s on your mind?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />
                  {errors.message && <p id="message-error" className="mt-1.5 text-sm text-red-400" role="alert">{errors.message}</p>}
                </div>

                <MagneticButton type="submit" size="lg" variant="primary" className="w-full">Check Message</MagneticButton>

                {status === 'unavailable' && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100" role="status">
                    This form cannot send email until a secure provider or backend is configured. Please email <a href={`mailto:${contactInfo.email}`} className="underline underline-offset-2 hover:text-white">{contactInfo.email}</a> instead.
                  </div>
                )}
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ContactDetail({ icon, label, href, children }: { icon: 'mail' | 'phone'; label: string; href: string; children: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-glass border border-glass-border flex items-center justify-center flex-shrink-0">
        <SocialIcon name={icon} size={20} className="text-text-primary" />
      </div>
      <div>
        <span className="text-caption text-text-muted uppercase tracking-wider">{label}</span>
        <a href={href} className="block text-body text-text-primary hover:text-accent transition-colors mt-1 font-medium">{children}</a>
      </div>
    </div>
  );
}

function FormField({ label, name, type = 'text', value, error, onChange, placeholder }: { label: string; name: 'name' | 'email'; type?: 'text' | 'email'; value: string; error?: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-2">{label}</label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} className={`input-field ${error ? 'border-red-500/50 focus:border-red-500' : ''}`} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} />
      {error && <p id={errorId} className="mt-1.5 text-sm text-red-400" role="alert">{error}</p>}
    </div>
  );
}