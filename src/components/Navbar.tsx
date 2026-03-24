import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitEarlyAccess } from '../lib/supabase';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'err'>('idle');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowForm(false);
      }
    };
    if (showForm) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showForm]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.trim()) { setStatus('err'); return; }
    setStatus('loading');
    try {
      await submitEarlyAccess(email, 'navbar');
      setStatus('done');
    } catch {
      setStatus('err');
    }
  };

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

      {/* CTA */}
      <div ref={dropdownRef} className="relative">
        {status === 'done' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-[#00FFD4]/10 h-8 px-4 rounded-full border border-[#00FFD4]/20"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#00FFD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#00FFD4]">You're in</span>
          </motion.div>
        ) : (
          <>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`h-8 px-5 text-[9px] font-bold uppercase tracking-[0.12em] rounded-full transition-all duration-300 cursor-pointer ${
                scrolled || showForm
                  ? 'bg-[#00FFD4] text-[#0A0A0A] hover:brightness-110'
                  : 'border border-white/[0.12] text-white/50 hover:text-white hover:border-white/25'
              }`}
              style={scrolled || showForm ? { boxShadow: '0 0 18px rgba(0,255,212,0.2)' } : {}}
            >
              Get Early Access
            </button>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 380 }}
                  className="absolute top-full right-0 mt-2 w-72"
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
                  }}
                >
                  {/* Header */}
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25 mb-3">
                    Secure your spot
                  </p>

                  <form onSubmit={submit} className="flex flex-col gap-2">
                    {/* Email input */}
                    <input
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                      placeholder="your@email.com"
                      autoFocus
                      className="h-10 w-full rounded-xl px-4 text-[12px] text-white outline-none transition-all placeholder:text-white/20"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: status === 'err' ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.border = '1px solid rgba(0,255,212,0.35)';
                        e.currentTarget.style.background = 'rgba(0,255,212,0.02)';
                      }}
                      onBlur={e => {
                        e.currentTarget.style.border = status === 'err'
                          ? '1px solid rgba(239,68,68,0.4)'
                          : '1px solid rgba(255,255,255,0.08)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      }}
                    />

                    {/* Error */}
                    <AnimatePresence>
                      {status === 'err' && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-red-400/70 text-[10px] pl-1"
                        >
                          Enter a valid email
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="h-10 w-full rounded-xl text-[10px] font-bold uppercase tracking-[0.14em] transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center"
                      style={{
                        background: '#00FFD4',
                        color: '#0A0A0A',
                        boxShadow: '0 0 20px rgba(0,255,212,0.2)',
                      }}
                    >
                      {status === 'loading' ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ border: '2px solid rgba(10,10,10,0.3)', borderTopColor: '#0A0A0A' }}
                        />
                      ) : (
                        'Get Early Access'
                      )}
                    </button>
                  </form>

                  <p className="text-[9px] text-white/[0.12] text-center mt-3">
                    No spam. Unsubscribe anytime.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
