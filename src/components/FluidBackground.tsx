import { useEffect, useRef } from 'react';

/**
 * Performant liquid distortion.
 *
 * Key perf decisions:
 * - feTurbulence noise is STATIC (no feOffset animation) so the browser
 *   caches the noise texture and only recomputes displacement, not noise.
 * - numOctaves=2 instead of 3 (halves GPU work).
 * - setAttribute calls are throttled — only fire when scale actually changes.
 * - will-change: filter on the wrapper div lets the browser prepare a GPU layer.
 */
const LiquidDistortion = () => {
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const frameRef = useRef(0);
  const scaleRef = useRef(0);
  const targetScaleRef = useRef(0);
  const lastMoveRef = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastSetScale = useRef(-1);

  useEffect(() => {
    const animate = () => {
      const disp = dispRef.current;
      if (!disp) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Decay when mouse idle
      const now = Date.now();
      if (now - lastMoveRef.current > 80) {
        targetScaleRef.current *= 0.92; // fast decay
        if (targetScaleRef.current < 0.5) targetScaleRef.current = 0;
      }

      // Fast interpolation — snappy response
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.18;

      // Only touch the DOM when value actually changes (avoid forced repaints)
      const rounded = Math.round(scaleRef.current * 10) / 10;
      if (rounded !== lastSetScale.current) {
        disp.setAttribute('scale', String(rounded));
        lastSetScale.current = rounded;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX.current = e.clientX;
      lastY.current = e.clientY;

      // More responsive: higher multiplier, higher cap
      const clampedSpeed = Math.min(speed, 80);
      targetScaleRef.current = clampedSpeed * 0.7;
      lastMoveRef.current = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = touch.clientX - lastX.current;
      const dy = touch.clientY - lastY.current;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX.current = touch.clientX;
      lastY.current = touch.clientY;

      const clampedSpeed = Math.min(speed, 80);
      targetScaleRef.current = clampedSpeed * 0.7;
      lastMoveRef.current = Date.now();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="liquid-distortion"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          {/* Static noise — browser caches this, no per-frame recompute */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.012"
            numOctaves={2}
            seed={5}
            stitchTiles="stitch"
            result="noise"
          />
          {/* Only scale changes per-frame (cheap) */}
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidDistortion;
