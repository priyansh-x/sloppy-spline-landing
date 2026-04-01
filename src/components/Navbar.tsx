import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.05]' : ''
      }`}
    >
      {/* Logo */}
      <a
        href="#"
        className="text-sm font-black uppercase tracking-[0.15em] text-[#00FFD4]"
        style={{ textShadow: '0 0 12px rgba(0,255,212,0.3)' }}
      >
        SLOPPY
      </a>

      {/* Centre nav links — desktop only */}
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#product"
          className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors"
        >
          Product
        </a>
        <a
          href="#thesis"
          className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors"
        >
          Thesis
        </a>
      </div>

      {/* Download CTA */}
      <a
        href="/Sloppy.apk"
        download="Sloppy.apk"
        className={`h-8 px-5 text-[9px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5 no-underline ${
          scrolled
            ? 'bg-[#00FFD4] text-[#0A0A0A] hover:brightness-110'
            : 'border border-white/[0.12] text-white/50 hover:text-white hover:border-white/25'
        }`}
        style={scrolled ? { boxShadow: '0 0 18px rgba(0,255,212,0.2)' } : {}}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download App
      </a>
    </motion.nav>
  );
};

export default Navbar;
