import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CountUp = ({ target, suffix = '', started }: { target: number; suffix?: string; started: boolean }) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  const animate = useCallback((time: number) => {
    if (!startRef.current) startRef.current = time;
    const progress = Math.min((time - startRef.current) / 2000, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setCount(Math.floor(eased * target));
    if (progress < 1) rafRef.current = requestAnimationFrame(animate);
  }, [target]);

  useEffect(() => {
    if (!started) return;
    startRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, animate]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const stats = [
  { target: 2400, suffix: '+', label: 'Early Access Signups' },
  { target: 150, suffix: '+', label: 'Creators Ready' },
  { target: 10000, suffix: '+', label: 'Prompts Submitted' },
];

const SocialProof = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col items-center"
        >
          <div className="w-10 h-[2px] bg-[#00FFD4] mb-5" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#00FFD4]">
            Early Access
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center px-10 md:px-14"
              >
                <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white">
                  <CountUp target={stat.target} suffix={stat.suffix} started={inView} />
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-2 font-bold">
                  {stat.label}
                </span>
              </motion.div>

              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-14 bg-white/[0.06]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
