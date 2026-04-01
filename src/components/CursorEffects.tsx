import { useEffect, useRef, useState } from 'react';

/**
 * Custom cursor system:
 * - Cyan ring that follows mouse with springy delay
 * - Precise dot at exact cursor position
 * - Fading trail dots on canvas
 * - Click ripple explosions
 *
 * Hidden on touch devices.
 */
const CursorEffects = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleIdRef = useRef(0);
  const frameRef = useRef(0);
  const trailPoints = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const canvasSizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    // Detect touch — bail entirely
    if ('ontouchstart' in window) return;

    // Hide default cursor globally
    document.documentElement.style.cursor = 'none';
    // Also target interactive elements
    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    // Size canvas once + on resize
    const sizeCanvas = () => {
      const canvas = trailRef.current;
      if (!canvas) return;
      const dpr = 1; // keep 1:1 for perf, trail doesn't need retina
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvasSizeRef.current = { w: canvas.width, h: canvas.height };
    };
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      // Push trail point
      trailPoints.current.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trailPoints.current.length > 30) trailPoints.current.shift();
    };

    const onClick = (e: MouseEvent) => {
      const id = ++rippleIdRef.current;
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    };

    const onLeave = () => {
      posRef.current = { x: -100, y: -100 };
      ringPos.current = { x: -100, y: -100 };
    };

    const animate = () => {
      // Spring ring
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.14;
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.14;

      const ring = ringRef.current;
      const dot = dotRef.current;
      if (ring) ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      if (dot) dot.style.transform = `translate(${posRef.current.x - 3}px, ${posRef.current.y - 3}px)`;

      // Trail
      const canvas = trailRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvasSizeRef.current.w, canvasSizeRef.current.h);
        const pts = trailPoints.current;
        for (let i = pts.length - 1; i >= 0; i--) {
          pts[i].alpha -= 0.04;
          if (pts[i].alpha <= 0) continue;
          const r = pts[i].alpha * 2.5;
          ctx.beginPath();
          ctx.arc(pts[i].x, pts[i].y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,212,${pts[i].alpha * 0.4})`;
          ctx.fill();
        }
        trailPoints.current = pts.filter(p => p.alpha > 0);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('click', onClick);
    document.addEventListener('mouseleave', onLeave);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      style.remove();
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', sizeCanvas);
    };
  }, []);

  // Touch device — render nothing
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <canvas
        ref={trailRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,255,212,0.35)',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#00FFD4',
          boxShadow: '0 0 10px rgba(0,255,212,0.6), 0 0 20px rgba(0,255,212,0.2)',
          willChange: 'transform',
        }}
      />

      {/* Click ripples */}
      {ripples.map(r => (
        <div
          key={r.id}
          className="fixed pointer-events-none z-[9999]"
          style={{ left: r.x, top: r.y, transform: 'translate(-50%,-50%)' }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              border: '1.5px solid #00FFD4',
              animation: 'cursorRipple 0.6s ease-out forwards',
            }}
          />
          {/* Second delayed ring */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 8,
              height: 8,
              borderRadius: '50%',
              border: '1px solid rgba(0,255,212,0.4)',
              animation: 'cursorRipple 0.6s ease-out 0.1s forwards',
              opacity: 0,
              animationFillMode: 'forwards',
            }}
          />
        </div>
      ))}
    </>
  );
};

export default CursorEffects;
