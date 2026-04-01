import { useEffect, useRef } from 'react';

/**
 * SVG displacement filter that warps the entire page like liquid.
 * - feTurbulence generates fractal noise
 * - feOffset slides the noise around so it flows organically
 * - feDisplacementMap uses that flowing noise to distort SourceGraphic
 * - Mouse movement speed increases distortion intensity
 */
const LiquidDistortion = () => {
  const offsetRef = useRef<SVGFEOffsetElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const frameRef = useRef(0);
  const scaleRef = useRef(3);
  const targetScaleRef = useRef(3);
  const lastMoveRef = useRef(0);
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    let time = 0;

    const animate = () => {
      time += 0.012;

      const offset = offsetRef.current;
      const disp = dispRef.current;
      if (!offset || !disp) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Flow the noise pattern in a lissajous-like path
      const dx = Math.sin(time * 0.23) * 50 + Math.cos(time * 0.61) * 25;
      const dy = Math.cos(time * 0.17) * 40 + Math.sin(time * 0.43) * 20;
      offset.setAttribute('dx', String(dx));
      offset.setAttribute('dy', String(dy));

      // Decay distortion when mouse stops
      const now = Date.now();
      if (now - lastMoveRef.current > 120) {
        targetScaleRef.current = 3; // subtle baseline wobble
      }

      // Smooth interpolation toward target
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * 0.05;
      disp.setAttribute('scale', String(scaleRef.current));

      frameRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX.current = e.clientX;
      lastY.current = e.clientY;

      // Scale distortion with mouse velocity — fast = more warp
      const clampedSpeed = Math.min(speed, 60);
      targetScaleRef.current = 3 + clampedSpeed * 0.5;
      lastMoveRef.current = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const dx = touch.clientX - lastX.current;
      const dy = touch.clientY - lastY.current;
      const speed = Math.sqrt(dx * dx + dy * dy);
      lastX.current = touch.clientX;
      lastY.current = touch.clientY;

      const clampedSpeed = Math.min(speed, 60);
      targetScaleRef.current = 3 + clampedSpeed * 0.5;
      lastMoveRef.current = Date.now();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id="liquid-distortion"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          colorInterpolationFilters="sRGB"
        >
          {/* Generate fractal noise texture */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.009"
            numOctaves={3}
            seed={3}
            stitchTiles="stitch"
            result="noise"
          />
          {/* Slide the noise around to create flowing motion */}
          <feOffset
            ref={offsetRef}
            in="noise"
            dx="0"
            dy="0"
            result="flowing-noise"
          />
          {/* Displace the actual page content using the flowing noise */}
          <feDisplacementMap
            ref={dispRef}
            in="SourceGraphic"
            in2="flowing-noise"
            scale={3}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidDistortion;
