import { useEffect, useRef } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  targetX: number;
  targetY: number;
}

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const blobsRef = useRef<Blob[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init blobs
    const NUM_BLOBS = 6;
    blobsRef.current = Array.from({ length: NUM_BLOBS }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 120 + Math.random() * 180,
      targetX: Math.random() * canvas.width,
      targetY: Math.random() * canvas.height,
    }));

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      mouseRef.current.x = e.touches[0].clientX / window.innerWidth;
      mouseRef.current.y = e.touches[0].clientY / window.innerHeight;
      mouseRef.current.active = true;
    };
    const onTouchEnd = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    let time = 0;

    const animate = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Update blobs
      const blobs = blobsRef.current;
      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];

        // Organic wandering
        blob.targetX += Math.sin(time * 1.2 + i * 2.1) * 0.8;
        blob.targetY += Math.cos(time * 0.9 + i * 1.7) * 0.8;

        // Keep in bounds
        if (blob.targetX < -100) blob.targetX = w + 100;
        if (blob.targetX > w + 100) blob.targetX = -100;
        if (blob.targetY < -100) blob.targetY = h + 100;
        if (blob.targetY > h + 100) blob.targetY = -100;

        // Mouse attraction
        if (mouse.active) {
          const mx = mouse.x * w;
          const my = mouse.y * h;
          const dx = mx - blob.x;
          const dy = my - blob.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 1 - dist / 500) * 0.8;
          blob.vx += dx * force * 0.001;
          blob.vy += dy * force * 0.001;
        }

        // Move toward target
        blob.vx += (blob.targetX - blob.x) * 0.0003;
        blob.vy += (blob.targetY - blob.y) * 0.0003;

        // Damping
        blob.vx *= 0.985;
        blob.vy *= 0.985;

        blob.x += blob.vx;
        blob.y += blob.vy;

        // Pulsing radius
        const pulseRadius = blob.radius + Math.sin(time * 2 + i * 1.3) * 20;

        // Draw blob
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, pulseRadius);
        gradient.addColorStop(0, 'rgba(0, 255, 212, 0.06)');
        gradient.addColorStop(0.4, 'rgba(0, 255, 212, 0.025)');
        gradient.addColorStop(1, 'rgba(0, 255, 212, 0)');

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw a brighter glow near mouse when active
      if (mouse.active) {
        const mx = mouse.x * w;
        const my = mouse.y * h;
        const mouseGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        mouseGlow.addColorStop(0, 'rgba(0, 255, 212, 0.07)');
        mouseGlow.addColorStop(0.5, 'rgba(0, 255, 212, 0.02)');
        mouseGlow.addColorStop(1, 'rgba(0, 255, 212, 0)');
        ctx.beginPath();
        ctx.arc(mx, my, 200, 0, Math.PI * 2);
        ctx.fillStyle = mouseGlow;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.8 }}
    />
  );
};

export default FluidBackground;
