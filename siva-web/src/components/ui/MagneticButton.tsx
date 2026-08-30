import { forwardRef, useEffect, useRef, useState, type ButtonHTMLAttributes } from 'react';

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  disableOnMobile?: boolean;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const supportsMagneticEffect = () => window.matchMedia('(pointer: fine) and (min-width: 768px)').matches;

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      magnetic = true,
      disableOnMobile = true,
      isLoading = false,
      disabled,
      onMouseMove,
      onMouseLeave,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isFinePointer, setIsFinePointer] = useState(false);

    useEffect(() => {
      const query = window.matchMedia('(pointer: fine) and (min-width: 768px)');
      const updatePointerSupport = () => setIsFinePointer(supportsMagneticEffect());

      updatePointerSupport();
      query.addEventListener('change', updatePointerSupport);
      return () => query.removeEventListener('change', updatePointerSupport);
    }, []);

    const isMagnetic = magnetic && (!disableOnMobile || isFinePointer);

    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
    };

    const combinedRef = (element: HTMLButtonElement | null) => {
      buttonRef.current = element;
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    const resetTransform = () => {
      const button = buttonRef.current;
      if (!button) return;
      button.style.transform = 'translate3d(0, 0, 0)';
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(event);
      if (!isMagnetic) return;

      const button = buttonRef.current;
      const rect = button?.getBoundingClientRect();
      if (!button || !rect) return;

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const offsetX = Math.max(-5, Math.min(5, x * 0.08));
      const offsetY = Math.max(-5, Math.min(5, y * 0.08));
      button.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      resetTransform();
      onMouseLeave?.(event);
    };

    return (
      <button
        ref={combinedRef}
        className={`${variantClasses[variant]} ${sizeClasses[size]} ${className} relative overflow-hidden ${isMagnetic ? 'magnetic' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        disabled={disabled || isLoading}
        style={{
          ...style,
          transition: 'transform 180ms ease-out, background-color 200ms ease, border-color 200ms ease, color 200ms ease',
        }}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isLoading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
              <circle className="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30" strokeDashoffset="10" strokeLinecap="round" />
            </svg>
          )}
          {children}
        </span>
        <span
          className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-normal pointer-events-none"
          aria-hidden="true"
        />
      </button>
    );
  }
);

MagneticButton.displayName = 'MagneticButton';
