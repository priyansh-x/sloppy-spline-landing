import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    num: '01',
    label: 'Prompt-First',
    title: 'The idea is the content',
    body: 'On Sloppy, every piece of content shows its prompt front and center. Not buried in metadata. Not hidden. The prompt IS the content.',
    bullets: [
      'Prompts displayed on every video card',
      'Tap any prompt to see the full text',
      'Browse content by prompt, not just by creator',
    ],
  },
  {
    num: '02',
    label: 'Remix Culture',
    title: 'One prompt. Infinite interpretations.',
    body: 'Every video can be remixed by anyone. Tap remix, edit the prompt, generate your version. Remix chains let ideas evolve. Ideas are open source.',
    bullets: [
      'One-tap remix from any video',
      'Full remix chain tracking',
      'Original creators get notified and credited',
    ],
  },
  {
    num: '03',
    label: 'AI Generation',
    title: 'Type a prompt. Get a video. Post it.',
    body: 'Provider-agnostic generation. We route to the best model for your prompt. You just type and create.',
    bullets: [
      'Works with Kling, Runway, Luma, Sora, and more',
      'Best model selected automatically',
      '3 to 30 second AI-generated videos',
    ],
  },
  {
    num: '04',
    label: 'Prompt Universe',
    title: 'Explore ideas. Not just creators.',
    body: "Because every video has a prompt, we can build a discovery surface no other platform can. Browse trending keywords, explore remix trees, find your next idea.",
    bullets: [
      'Visual keyword constellation updated every 30 minutes',
      'Trending prompts with top-scoring videos',
      'Semantic search across all prompts',
    ],
  },
];

const FeatureBlock = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const isReversed = index % 2 === 1;

  return (
    <div ref={ref} className="py-16 md:py-24">
      <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'md:[direction:rtl]' : ''}`}>
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="md:[direction:ltr]"
        >
          <span className="text-4xl font-black text-[#00FFD4]/10 block mb-1">{feature.num}</span>
          <div className="w-8 h-[2px] bg-[#00FFD4] mb-4" />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#00FFD4] block mb-4">
            {feature.label}
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-[1.15] mb-4">
            {feature.title}
          </h3>
          <p className="text-[13px] text-white/30 leading-relaxed mb-6">
            {feature.body}
          </p>
          <ul className="space-y-3">
            {feature.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 text-[13px] text-white/40"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD4]/40 shrink-0 mt-1.5" />
                {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Visual side — abstract card */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center md:[direction:ltr]"
        >
          <div className="w-full max-w-xs aspect-[3/4] rounded-2xl border border-white/[0.05] bg-white/[0.015] relative overflow-hidden">
            {/* Decorative content */}
            <div className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, rgba(0,255,212,${0.02 + index * 0.01}), transparent 60%)` }} />

            {/* Number watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[120px] font-black text-white/[0.02] leading-none select-none">
                {feature.num}
              </span>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#00FFD4]/40" />
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#00FFD4]/60">
                  {feature.label}
                </span>
              </div>
              <p className="text-[11px] text-white/20 leading-relaxed">
                {feature.body.slice(0, 80)}...
              </p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#00FFD4]/10" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#00FFD4]/10" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="px-6 md:px-12">
      <div className="max-w-5xl mx-auto divide-y divide-white/[0.04]">
        {features.map((f, i) => (
          <FeatureBlock key={i} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Features;
