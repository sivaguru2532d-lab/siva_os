import { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
  enabled?: boolean;
}

const supportsCustomCursor = () => (
  window.matchMedia('(pointer: fine) and (min-width: 768px)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: -100, y: -100 });
  const followerPositionRef = useRef({ x: -100, y: -100 });
  const animationFrameRef = useRef<number>();
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const finePointerQuery = window.matchMedia('(pointer: fine) and (min-width: 768px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateSupport = () => setIsSupported(supportsCustomCursor());

    updateSupport();
    finePointerQuery.addEventListener('change', updateSupport);
    reducedMotionQuery.addEventListener('change', updateSupport);

    return () => {
      finePointerQuery.removeEventListener('change', updateSupport);
      reducedMotionQuery.removeEventListener('change', updateSupport);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !isSupported) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let isPageVisible = document.visibilityState === 'visible';
    let isPointerVisible = false;
    let isHoveringInteractive = false;
    let isClicking = false;

    const renderCursor = () => {
      const { x, y } = pointerRef.current;
      const followerPosition = followerPositionRef.current;
      followerPosition.x += (x - followerPosition.x) * 0.16;
      followerPosition.y += (y - followerPosition.y) * 0.16;

      const cursorScale = isClicking ? 0.6 : isHoveringInteractive ? 1.5 : 1;
      const followerScale = isClicking ? 0.8 : isHoveringInteractive ? 1.55 : 1;
      const visibility = isPointerVisible ? '1' : '0';

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
      follower.style.transform = `translate3d(${followerPosition.x}px, ${followerPosition.y}px, 0) translate(-50%, -50%) scale(${followerScale})`;
      cursor.style.opacity = visibility;
      follower.style.opacity = visibility;
    };

    const animate = () => {
      if (!isPageVisible) return;
      renderCursor();
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

    const handleMouseMove = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (!isPointerVisible) isPointerVisible = true;
    };

    const handleMouseDown = () => { isClicking = true; };
    const handleMouseUp = () => { isClicking = false; };
    const handleMouseLeave = () => { isPointerVisible = false; };
    const handleMouseEnter = () => { isPointerVisible = true; };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      isHoveringInteractive = Boolean(target?.closest('a, button, [role="button"], input, textarea, select, .magnetic'));
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const relatedTarget = event.relatedTarget as Element | null;
      if (!target?.closest('a, button, [role="button"], input, textarea, select, .magnetic')) return;
      isHoveringInteractive = Boolean(relatedTarget?.closest('a, button, [role="button"], input, textarea, select, .magnetic'));
    };

    const handleVisibilityChange = () => {
      isPageVisible = document.visibilityState === 'visible';
      if (isPageVisible) startAnimation();
      else stopAnimation();
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    startAnimation();

    return () => {
      stopAnimation();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, isSupported]);

  if (!enabled || !isSupported) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-white mix-blend-difference transition-opacity duration-200"
        aria-hidden="true"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 rounded-full border border-white/20 bg-white/5 transition-opacity duration-300"
        aria-hidden="true"
      />
    </>
  );
}
