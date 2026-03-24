import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const problems = [
  {
    title: 'Prompts Are Hidden',
    body: 'Every platform hides how AI content was made. The most interesting part -- the idea -- stays invisible.',
  },
  {
    title: 'No Remix Culture',
    body: "You see something cool, but you can't build on it. AI creativity is siloed with no open-source ethos.",
  },
  {
    title: 'Scattered Everywhere',
    body: "Your AI videos live across 10 different apps. There's no single home for AI-native content.",
  },
];

const ProblemSection = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section ref={ref} className="py-28 md:py-36 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center text-center"
        >
          <div className="w-10 h-[2px] bg-[#00FFD4] mb-5" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#00FFD4]">
            The Problem
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.1] mb-16 text-center max-w-3xl mx-auto"
        >
          AI video is everywhere.{' '}
          <span className="text-white/20">But nobody owns the culture.</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 hover:border-[#00FFD4]/20 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-[#00FFD4]/[0.06] flex items-center justify-center mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00FFD4]/40" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-white/80 mb-3">
                {p.title}
              </h3>
              <p className="text-[13px] text-white/30 leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
