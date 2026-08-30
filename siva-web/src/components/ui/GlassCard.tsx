import { forwardRef, type HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'hover' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  blur?: 'default' | 'strong';
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      padding = 'md',
      blur = 'default',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'glass-panel';
    const variantClasses = {
      default: '',
      hover: 'glass-panel-hover',
      interactive: 'glass-panel-hover cursor-pointer',
    };
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6 md:p-8',
      lg: 'p-8 md:p-10',
    };
    const blurClasses = {
      default: 'backdrop-blur-glass',
      strong: 'backdrop-blur-glass-strong',
    };

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${blurClasses[blur]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';