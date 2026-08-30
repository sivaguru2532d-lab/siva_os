import { forwardRef, type HTMLAttributes } from 'react';

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'alt';
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, children, className = '', variant = 'default', ...props }, ref) => (
    <section
      ref={ref}
      id={id}
      className={`py-20 md:py-28 lg:py-32 ${variant === 'alt' ? 'bg-background-secondary/50' : ''} ${className}`}
      {...props}
    >
      <div className="section-container">
        {children}
      </div>
    </section>
  )
);

SectionWrapper.displayName = 'SectionWrapper';