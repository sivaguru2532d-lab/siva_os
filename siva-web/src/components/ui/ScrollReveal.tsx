import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';
  once?: boolean;
  className?: string;
}

const initialStyles = {
  up: { transform: 'translate3d(0, 28px, 0)', filter: 'none' },
  down: { transform: 'translate3d(0, -28px, 0)', filter: 'none' },
  left: { transform: 'translate3d(28px, 0, 0)', filter: 'none' },
  right: { transform: 'translate3d(-28px, 0, 0)', filter: 'none' },
  scale: { transform: 'scale(0.97)', filter: 'none' },
  blur: { transform: 'translate3d(0, 16px, 0)', filter: 'blur(12px)' },
} as const;

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  once = true,
  className = '',
  style,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const initialStyle = initialStyles[direction];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: '0px 0px -80px', threshold: 0.08 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : initialStyle.transform,
        filter: isVisible ? 'none' : initialStyle.filter,
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform, filter',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
