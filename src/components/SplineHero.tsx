import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENE_URL = 'https://prod.spline.design/I79RGdZmvEKwayib/scene.splinecode';

const SplineHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Load the spline-viewer web component
    if (!document.querySelector('script[data-spline-viewer]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.70/build/spline-viewer.js';
      script.setAttribute('data-spline-viewer', 'true');
      document.head.appendChild(script);
    }

    // Create the viewer element
    if (containerRef.current) {
      const viewer = document.createElement('spline-viewer');
      viewer.setAttribute('url', SCENE_URL);
      viewer.style.cssText = 'width:100%;height:100%;position:absolute;inset:0;';
      containerRef.current.appendChild(viewer);

      // Listen for load event
      const onLoad = () => setSceneLoaded(true);
      viewer.addEventListener('load', onLoad);

      // Fallback timeout
      const timer = setTimeout(() => setSceneLoaded(true), 6000);

      return () => {
        clearTimeout(timer);
        viewer.removeEventListener('load', onLoad);
        viewer.remove();
      };
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    await new Promise((r) => setTimeout(r, 1200));
    setFormStatus('success');
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Loading state */}
      <AnimatePresence>
        {!sceneLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0A0A0A]"
          >
            <div className="relative w-12 h-12 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-[#00FFD4]/20" />
              <div
                className="absolute inset-0 rounded-full border-2 border-[#00FFD4] border-t-transparent"
                style={{ animation: 'spin-slow 0.8s linear infinite' }}
              />
            </div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30">
              Loading Experience
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spline 3D Scene container */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Gradient overlays for text legibility */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-28"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.5), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-72"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9), rgba(10,10,10,0.4) 60%, transparent)' }} />
        <div className="hidden md:block absolute inset-y-0 left-0 w-[45%]"
          style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.65), transparent)' }} />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 h-full flex flex-col justify-end md:justify-center pb-20 md:pb-0 px-6 md:px-16 lg:px-24">
        <div className="max-w-lg">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={sceneLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2.5 mb-6"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#00FFD4]"
              style={{ boxShadow: '0 0 6px rgba(0,255,212,0.6)' }}
            />
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/40">
              Launching 2026
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={sceneLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.06em] text-[#00FFD4] leading-none mb-4"
            style={{ textShadow: '0 0 50px rgba(0,255,212,0.3), 0 0 100px rgba(0,255,212,0.1)' }}
          >
            SLOPPY
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={sceneLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-sm sm:text-base font-medium tracking-[0.04em] uppercase text-white/40 mb-2"
          >
            The social platform for AI-generated everything
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={sceneLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-xs text-white/20 tracking-wide mb-8"
          >
            Prompt-first. Remixable. Pure chaos.
          </motion.p>

          {/* Waitlist */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={sceneLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            {formStatus === 'success' ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full border border-[#00FFD4]/30 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                    <motion.path
                      d="M8 16L14 22L24 10"
                      stroke="#00FFD4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase text-[#00FFD4] tracking-wider">You're on the list</p>
                  <p className="text-[11px] text-white/25">We'll email you when it's time.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setFormStatus('idle'); }}
                  placeholder="your@email.com"
                  className="flex-1 h-11 bg-white/[0.05] border border-white/10 rounded-full px-5 text-white text-sm outline-none focus:border-[#00FFD4]/40 transition-colors placeholder:text-white/20"
                />
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="h-11 bg-[#00FFD4] text-[#0A0A0A] font-bold uppercase tracking-[0.1em] text-[11px] px-6 rounded-full hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  style={{ boxShadow: '0 0 20px rgba(0,255,212,0.2)' }}
                >
                  {formStatus === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            )}

            {formStatus === 'error' && (
              <p className="text-red-400/70 text-xs mt-2">Please enter a valid email.</p>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={sceneLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-[10px] text-white/15 tracking-[0.15em] uppercase mt-4"
          >
            2,400+ creators already waiting
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={sceneLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <span className="text-[8px] tracking-[0.3em] uppercase text-white/15">Scroll</span>
        <motion.svg width="10" height="10" viewBox="0 0 16 16" fill="none"
          animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <path d="M4 6L8 10L12 6" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default SplineHero;
