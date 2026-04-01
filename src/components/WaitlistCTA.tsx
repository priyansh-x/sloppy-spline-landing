import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WaitlistCTA = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section ref={ref} id="early-access" className="relative py-28 md:py-36 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(0,255,212,0.03) 50%, #0A0A0A 100%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,212,0.05), transparent 70%)' }}
      />

      <div className="max-w-lg mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-5"
        >
          <div className="w-10 h-[2px] bg-[#00FFD4] mb-5" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#00FFD4]">
            Download Now
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white mb-4 tracking-tight"
        >
          Be the first to create
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm text-white/25 mb-10 leading-relaxed"
        >
          Download the Android app and start creating, remixing, and posting AI-generated content.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="/Sloppy.apk"
            download="Sloppy.apk"
            className="inline-flex items-center justify-center gap-2.5 h-14 px-10 rounded-xl font-bold uppercase tracking-[0.1em] text-[12px] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer no-underline"
            style={{
              background: '#00FFD4',
              color: '#0A0A0A',
              boxShadow: '0 0 30px rgba(0,255,212,0.25)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download for Android
          </a>

          <p className="text-[10px] text-white/15">
            Android only · 8 MB · No Play Store needed
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-[10px] text-white/[0.1] mt-5"
        >
          iOS coming soon
        </motion.p>
      </div>
    </section>
  );
};

export default WaitlistCTA;
