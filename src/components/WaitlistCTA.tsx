import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { submitEarlyAccess } from '../lib/supabase';

const WaitlistCTA = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      await submitEarlyAccess(email, 'cta-section');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

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
            Early Access
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
          Get early access and be the first to create, remix, and post when we launch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3 py-6"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ border: '1px solid rgba(0,255,212,0.3)' }}
                >
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                    <motion.path
                      d="M8 16L14 22L24 10"
                      stroke="#00FFD4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                  </svg>
                </div>
                <p className="text-base font-black uppercase text-[#00FFD4] tracking-wider">You're in</p>
                <p className="text-xs text-white/25">We'll email you when it's time to create.</p>
              </motion.div>
            ) : (
              <form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                  placeholder="your@email.com"
                  className="flex-1 h-12 rounded-xl px-5 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: status === 'error' ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={e => { e.currentTarget.style.border = '1px solid rgba(0,255,212,0.35)'; }}
                  onBlur={e => {
                    e.currentTarget.style.border = status === 'error'
                      ? '1px solid rgba(239,68,68,0.4)'
                      : '1px solid rgba(255,255,255,0.08)';
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-12 font-bold uppercase tracking-[0.1em] text-[11px] px-8 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                  style={{
                    background: '#00FFD4',
                    color: '#0A0A0A',
                    boxShadow: '0 0 24px rgba(0,255,212,0.2)',
                  }}
                >
                  {status === 'loading' ? 'Joining...' : 'Get Early Access'}
                </button>
              </form>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <p className="text-red-400/70 text-xs mt-2">Please enter a valid email.</p>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="text-[10px] text-white/[0.1] mt-5"
        >
          No spam. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
};

export default WaitlistCTA;
