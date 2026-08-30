import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  intensity?: number;
  className?: string;
  disableOnMobile?: boolean;
}

const supportsTiltEffect = () => window.matchMedia('(pointer: fine) and (min-width: 768px)').matches;

export function TiltCard({
  children,
  intensity = 8,
  className = '',
  disableOnMobile = true,
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (min-width: 768px)');
    const updatePointerSupport = () => setIsFinePointer(supportsTiltEffect());

    updatePointerSupport();
    query.addEventListener('change', updatePointerSupport);
    return () => query.removeEventListener('change', updatePointerSupport);
  }, []);

  const tiltIsEnabled = !disableOnMobile || isFinePointer;

  const resetTransform = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event);
    if (!tiltIsEnabled) return;

    const card = cardRef.current;
    const rect = card?.getBoundingClientRect();
    if (!card || !rect) return;

    const deltaX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const deltaY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    const maxTilt = Math.min(intensity, 6);
    const tiltX = Math.max(-maxTilt, Math.min(maxTilt, deltaY * maxTilt));
    const tiltY = Math.max(-maxTilt, Math.min(maxTilt, -deltaX * maxTilt));

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(0, -4px, 0)`;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(false);
    resetTransform();
    onMouseLeave?.(event);
  };

  return (
    <div
      ref={cardRef}
      className={`glass-card relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
        transformStyle: 'preserve-3d',
        transition: isHovering ? 'transform 120ms ease-out, box-shadow 180ms ease-out' : 'transform 380ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 220ms ease-out',
        boxShadow: isHovering && tiltIsEnabled ? '0 24px 64px -16px rgba(0, 0, 0, 0.42)' : undefined,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-slower pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)] opacity-0 hover:opacity-100 transition-opacity duration-slower pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
