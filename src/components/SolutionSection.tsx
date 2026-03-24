import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  { label: 'See a Video', d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0' },
  { label: 'Tap the Prompt', d: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2' },
  { label: 'Remix It', d: 'M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' },
  { label: 'Post Your Version', d: 'M22 2L11 13 M22 2L15 22L11 13L2 9L22 2' },
];

const SolutionSection = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section ref={ref} className="relative py-28 md:py-36 px-6 md:px-12">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,255,212,0.03), transparent 60%)' }} />

      <div className="max-w-5xl mx-auto relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col items-center"
        >
          <div className="w-10 h-[2px] bg-[#00FFD4] mb-5" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#00FFD4]">
            The Solution
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.1] mb-5 max-w-3xl mx-auto"
        >
          Every video has a <span className="text-[#00FFD4]">prompt</span>.
          Every prompt can be <span className="text-[#00FFD4]">remixed</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-white/25 max-w-lg mx-auto mb-14 leading-relaxed"
        >
          Sloppy is the first social platform where AI-generated content is open by default.
          See how anything was made. Remix it. Make it yours.
        </motion.p>

        {/* Core loop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center hover:border-[#00FFD4]/30 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00FFD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={step.d} />
                  </svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40">
                  {step.label}
                </span>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  className="hidden sm:block w-12 lg:w-20 h-px mx-3"
                  style={{ background: 'linear-gradient(90deg, rgba(0,255,212,0.15), rgba(0,255,212,0.05))' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
