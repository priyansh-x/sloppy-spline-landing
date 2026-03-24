import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const beliefs = [
  {
    num: '01',
    title: 'Prompts are open source by nature',
    body: 'A prompt is just an idea, written down. Ideas want to spread. Hiding the prompt is like a musician refusing to share sheet music — it kills the culture that made them.',
  },
  {
    num: '02',
    title: 'Remix is the internet\'s native creative act',
    body: 'Every meme is a remix. Every trend is derivative. The internet has always built on itself. We\'re building infrastructure for this to happen with AI video at scale.',
  },
  {
    num: '03',
    title: 'Generation is a utility, not the product',
    body: 'Kling, Runway, Luma, Sora — they\'re engines. We\'re model-agnostic by design. When models improve, Sloppy gets better automatically. The social layer is the product.',
  },
];

const roadmapPhases = [
  {
    phase: 'V1 — Now Building',
    active: true,
    items: [
      'Short-form AI video feed (3–30 second reels)',
      'Prompt-first UI — every card shows the full prompt',
      'One-tap remix with full chain tracking',
      'Mock generation (real providers at beta)',
    ],
  },
  {
    phase: 'Near-term',
    active: false,
    items: [
      'Live AI generation via Kling, Runway, Luma',
      'Prompt Universe — keyword constellation',
      'Cross-platform import (save your Runway clip)',
      'Creator monetisation primitives',
    ],
  },
  {
    phase: 'Long-term Vision',
    active: false,
    items: [
      'The definitive home for all AI-generated video',
      'Prompt library that compounds as the platform grows',
      'Open prompt API — build on Sloppy\'s prompt graph',
      'AI GIF and meme native formats',
    ],
  },
];

const ThesisSection = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [quoteRef, quoteInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [beliefsRef, beliefsInView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [productRef, productInView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [roadmapRef, roadmapInView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="thesis" className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,212,0.025) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="w-10 h-[2px] bg-[#00FFD4] mb-5" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#00FFD4]">
            Our Thesis
          </span>
        </motion.div>

        {/* ── Big statement ── */}
        <div ref={quoteRef} className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            <span className="text-white">The next great social platform<br className="hidden sm:block" /> won't be built on clips.</span>
            {' '}
            <span className="text-[#00FFD4]">It'll be built on prompts.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-sm sm:text-base text-white/25 max-w-xl mx-auto leading-relaxed"
          >
            Every era-defining platform has a sharing primitive. YouTube had the link.
            TikTok had the sound. Sloppy's primitive is the prompt — the source code of AI-generated culture.
          </motion.p>
        </div>

        {/* ── Belief pillars ── */}
        <div ref={beliefsRef} className="grid md:grid-cols-3 gap-4 mb-28">
          {beliefs.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={beliefsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-7 hover:border-[#00FFD4]/15 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-black text-[#00FFD4]/30 tracking-[0.2em]">{b.num}</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(0,255,212,0.08)' }} />
              </div>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white/75 mb-3 leading-snug">
                {b.title}
              </h3>
              <p className="text-[13px] text-white/30 leading-relaxed">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/[0.04] mb-28" />

        {/* ── Product header ── */}
        <motion.div
          ref={productRef}
          initial={{ opacity: 0, y: 16 }}
          animate={productInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-5"
        >
          <div className="w-10 h-[2px] bg-[#00FFD4] mb-5" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#00FFD4]">
            The Product
          </span>
        </motion.div>

        <motion.div
          id="product"
          initial={{ opacity: 0, y: 20 }}
          animate={productInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-[1.1] mb-4">
            Built in layers.{' '}
            <span className="text-white/20">Starting with the feed.</span>
          </h2>
          <p className="text-sm text-white/25 leading-relaxed">
            V1 is meme reels — short, weird, fully AI-generated, prompt-visible.
            The architecture is built for everything AI video becomes.
          </p>
        </motion.div>

        {/* ── Roadmap cards ── */}
        <div ref={roadmapRef} className="grid md:grid-cols-3 gap-4">
          {roadmapPhases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={roadmapInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl p-6"
              style={{
                background: phase.active ? 'rgba(0,255,212,0.025)' : 'rgba(255,255,255,0.015)',
                border: phase.active ? '1px solid rgba(0,255,212,0.18)' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* Active badge */}
              {phase.active && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#00FFD4]"
                    style={{ boxShadow: '0 0 6px rgba(0,255,212,0.7)', animation: 'dotPulse 2s ease-in-out infinite' }}
                  />
                  <span className="text-[8px] tracking-[0.15em] uppercase text-[#00FFD4]/60 font-bold">Active</span>
                </div>
              )}

              <h3
                className="text-[11px] font-bold uppercase tracking-[0.15em] mb-5"
                style={{ color: phase.active ? '#00FFD4' : 'rgba(255,255,255,0.25)' }}
              >
                {phase.phase}
              </h3>

              <ul className="space-y-3">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[12px] text-white/35">
                    <span
                      className="w-1 h-1 rounded-full shrink-0 mt-[5px]"
                      style={{ background: phase.active ? 'rgba(0,255,212,0.5)' : 'rgba(255,255,255,0.18)' }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ThesisSection;
