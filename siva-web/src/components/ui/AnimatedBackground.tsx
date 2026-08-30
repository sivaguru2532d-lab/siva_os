import { useEffect, useRef, useState } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const isMobileViewport = () => window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;

export function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles: Particle[] = [];
    let isPageVisible = document.visibilityState === 'visible';

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = isMobileViewport() ? 12 : 30;
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.1 + 0.35,
        opacity: Math.random() * 0.24 + 0.04,
      }));
    };

    const drawFrame = () => {
      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        context.fill();
      }
    };

    const animate = () => {
      if (!isPageVisible) return;
      drawFrame();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (isPageVisible && animationFrameRef.current === undefined) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === 'visible';
      setIsDocumentVisible(isPageVisible);

      if (isPageVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    const handleMotionPreferenceChange = () => {
      if (reducedMotionQuery.matches) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    resizeCanvas();
    startAnimation();

    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      stopAnimation();
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  return (
    <div className={`aurora-background fixed inset-0 z-0 ${isDocumentVisible ? '' : 'aurora-background--paused'} ${className}`} aria-hidden="true">
      <div className="aurora-layer aurora-layer--purple" />
      <div className="aurora-layer aurora-layer--blue" />
      <div className="aurora-layer aurora-layer--cyan" />
      <div className="aurora-layer aurora-layer--magenta" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="aurora-vignette absolute inset-0" />
    </div>
  );
}
