import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { submitEarlyAccess, trackVisit, getVisitCount } from './lib/supabase';
import ProductThesisPanel from './components/ProductThesisPanel';

const FEED = [
  { user: '@slopcreator', prompt: 'a cat riding a skateboard through neon tokyo', likes: '2.4k', caption: 'this one hit different', image: '/images/0.png' },
  { user: '@promptlord', prompt: 'underwater city with jellyfish cars', likes: '1.8k', caption: 'jellyfish go brrr', image: '/images/1.png' },
  { user: '@aivisions', prompt: 'robot cooking ramen in cyberpunk alley', likes: '3.1k', caption: 'the steam tho', image: '/images/2.png' },
  { user: '@slopqueen', prompt: 'golden retriever DJing at a neon rave', likes: '5.2k', caption: 'he really feeling it', image: '/images/3.png' },
  { user: '@glitchwave', prompt: 'samurai cat on a vaporwave mountain', likes: '1.1k', caption: 'inner peace achieved', image: '/images/4.png' },
  { user: '@braindump', prompt: 'penguin astronaut on a pizza planet', likes: '4.0k', caption: 'one small step for slop', image: '/images/5.png' },
];

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'err'>('idle');
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track visit + fetch count on mount
  useEffect(() => {
    trackVisit();
    getVisitCount().then(setVisitCount);
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowInput(false);
      }
    };
    if (showInput) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showInput]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.trim()) { setStatus('err'); return; }
    setStatus('loading');
    try {
      await submitEarlyAccess(email, 'hero');
      setStatus('done');
    } catch {
      setStatus('err');
    }
  };

  return (
    <div
      className="relative w-full h-full bg-[#0A0A0A] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,255,212,0.05) 0%, transparent 65%)' }}
      />

      {/* ── SLOPPY wordmark — behind phone ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0" style={{ paddingBottom: '8vh' }}>
        <h1
          className="text-[24vw] sm:text-[20vw] md:text-[16vw] font-black uppercase leading-none tracking-[0.02em]"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(0,255,212,0.07)',
            textShadow: '0 0 100px rgba(0,255,212,0.05)',
          }}
        >
          SLOPPY
        </h1>
      </div>

      {/* ── Phone mockup ── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" style={{ paddingBottom: '6vh' }}>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        >
          <div
            style={{
              width: 'min(260px, 42vh)',
              animation: 'float 5s ease-in-out infinite, glowPulse 4s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Frame */}
            <div
              className="rounded-[2.2rem] border border-white/[0.08] p-[5px] relative"
              style={{ background: 'linear-gradient(145deg, #191919 0%, #0c0c0c 100%)' }}
            >
              {/* Dynamic Island */}
              <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-20 h-[18px] bg-[#0A0A0A] rounded-b-xl z-20" />

              {/* Screen */}
              <div className="rounded-[1.8rem] overflow-hidden bg-[#0A0A0A] relative" style={{ aspectRatio: '9/18' }}>

                {/* Status bar */}
                <div className="relative z-20 flex items-center justify-between px-5 pt-2.5 pb-0.5">
                  <span className="text-[7px] text-white/25 font-medium">9:41</span>
                  <div className="flex gap-[2px] items-center">
                    <div className="w-2 h-1 rounded-[1px] bg-white/20" />
                    <div className="w-2 h-1 rounded-[1px] bg-white/15" />
                    <div className="w-[8px] h-[4px] rounded-sm border border-white/20">
                      <div className="w-[5px] h-full bg-white/25 rounded-[0.5px]" />
                    </div>
                  </div>
                </div>

                {/* App header */}
                <div className="relative z-20 flex items-center justify-center py-1.5">
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.18em] text-[#00FFD4]"
                    style={{ textShadow: '0 0 8px rgba(0,255,212,0.25)' }}
                  >
                    SLOPPY
                  </span>
                </div>

                {/* Scrolling feed */}
                <div className="relative z-10 overflow-hidden" style={{ height: 'calc(100% - 68px)' }}>
                  <div style={{ animation: 'scrollFeed 18s linear infinite' }}>
                    {[...FEED, ...FEED].map((item, i) => (
                      <div key={i} className="px-2 pb-2">
                        <div
                          className="w-full rounded-lg overflow-hidden relative"
                          style={{
                            aspectRatio: '9/11',
                            background: `linear-gradient(${130 + i * 25}deg,
                              hsl(${165 + i * 12}, 35%, ${5 + (i % 3) * 2}%) 0%,
                              #080808 45%,
                              hsl(${210 + i * 8}, 30%, ${4 + (i % 2) * 2}%) 100%)`,
                          }}
                        >
                          {item.image && (
                            <img src={item.image} alt={item.caption} className="absolute inset-0 w-full h-full object-cover z-0 opacity-80" />
                          )}

                          <div
                            className="absolute bottom-0 left-0 right-0 p-2"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, transparent)' }}
                          >
                            <div className="flex items-center gap-1 mb-0.5">
                              <div
                                className="w-3.5 h-3.5 rounded-full"
                                style={{ background: `linear-gradient(135deg, hsl(${170 + i * 20}, 50%, 25%), hsl(${170 + i * 20}, 40%, 15%))` }}
                              />
                              <span className="text-[6px] font-bold uppercase tracking-wider text-white/50">{item.user}</span>
                            </div>
                            <p className="text-[5.5px] text-white/30 mb-1">{item.caption}</p>
                            <div className="inline-flex items-center gap-0.5 bg-[#00FFD4]/[0.06] border border-[#00FFD4]/15 rounded-full px-1.5 py-[1px]">
                              <span className="text-[4.5px] text-[#00FFD4]/60 font-bold uppercase tracking-wider">View Prompt</span>
                            </div>
                          </div>

                          <div className="absolute right-1 bottom-10 flex flex-col items-center gap-1.5">
                            <div className="flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-white/[0.06] flex items-center justify-center">
                                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                  <path d="M12 19V5M5 12l7-7 7 7" />
                                </svg>
                              </div>
                              <span className="text-[4px] text-white/25 mt-[1px]">{item.likes}</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-[#00FFD4]/[0.08] flex items-center justify-center">
                                <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#00FFD4" strokeWidth="2.5" strokeLinecap="round">
                                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                                </svg>
                              </div>
                              <span className="text-[4px] text-[#00FFD4]/40 mt-[1px] font-bold">REMIX</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tab bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 h-8 border-t border-white/[0.04] flex items-center justify-around px-2"
                  style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(8px)' }}
                >
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center justify-center w-5 h-5">
                      {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#00FFD4]" />}
                      {i === 1 && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>}
                      {i === 2 && <div className="w-4 h-4 rounded-md bg-[#00FFD4] flex items-center justify-center"><span className="text-[7px] text-[#0A0A0A] font-black leading-none">+</span></div>}
                      {i === 3 && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /></svg>}
                      {i === 4 && <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone shadow */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[65%] h-5 rounded-[100%] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(0,255,212,0.07) 0%, transparent 70%)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* ════ CORNER ELEMENTS ════ */}

      {/* Top-left — Hamburger → opens product/thesis panel */}
      <div
        className="absolute top-6 left-6 md:top-8 md:left-8 z-30"
        style={{ animation: 'fadeIn 0.5s ease both', animationDelay: '0.2s' }}
      >
        <button
          onClick={() => setShowMenu(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
          style={{ color: 'rgba(255,255,255,0.5)' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          aria-label="Open menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="17" x2="21" y2="17" />
          </svg>
        </button>
      </div>

      {/* Top-right — Early Access */}
      <div
        className="absolute top-6 right-6 md:top-8 md:right-8 z-30"
        style={{ animation: 'fadeIn 0.5s ease both', animationDelay: '0.2s' }}
      >
        {status === 'done' ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              color: '#00FFD4',
              fontSize: '8px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            Thank you!
          </motion.p>
        ) : (
          <div ref={dropdownRef} className="relative">
            {/* Button */}
            <button
              onClick={() => setShowInput(v => !v)}
              className="cursor-pointer transition-all"
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '8px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.2em',
                padding: '4px 0',
                borderBottom: '1px solid rgba(0,255,212,0.4)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderBottomColor = '#00FFD4';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.borderBottomColor = 'rgba(0,255,212,0.4)';
              }}
            >
              Early Access
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {showInput && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full right-0 mt-3"
                  style={{ width: '300px' }}
                >
                  <div
                    style={{
                      background: '#111111',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
                    }}
                  >
                    <form onSubmit={submit} className="flex flex-col" style={{ gap: '12px' }}>
                      <input
                        type="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); if (status === 'err') setStatus('idle'); }}
                        placeholder="your@email.com"
                        autoFocus
                        className="outline-none transition-all"
                        style={{
                          width: '100%',
                          height: '44px',
                          borderRadius: '12px',
                          padding: '0 16px',
                          fontSize: '13px',
                          color: '#fff',
                          background: 'rgba(255,255,255,0.04)',
                          border: status === 'err'
                            ? '1px solid rgba(239,68,68,0.5)'
                            : '1px solid rgba(255,255,255,0.07)',
                        }}
                        onFocus={e => {
                          e.currentTarget.style.border = '1px solid rgba(0,255,212,0.35)';
                          e.currentTarget.style.background = 'rgba(0,255,212,0.02)';
                        }}
                        onBlur={e => {
                          e.currentTarget.style.border = status === 'err'
                            ? '1px solid rgba(239,68,68,0.5)'
                            : '1px solid rgba(255,255,255,0.07)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        }}
                      />

                      <AnimatePresence>
                        {status === 'err' && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ color: 'rgba(239,68,68,0.7)', fontSize: '11px', paddingLeft: '4px' }}
                          >
                            Enter a valid email
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="flex items-center justify-center cursor-pointer disabled:opacity-60 transition-all"
                        style={{
                          width: '100%',
                          height: '44px',
                          borderRadius: '12px',
                          background: '#00FFD4',
                          color: '#0A0A0A',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.14em',
                          border: 'none',
                          boxShadow: '0 0 20px rgba(0,255,212,0.15)',
                        }}
                      >
                        {status === 'loading' ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                            style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '50%',
                              border: '2px solid rgba(10,10,10,0.25)',
                              borderTopColor: '#0A0A0A',
                            }}
                          />
                        ) : 'Get Early Access'}
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom-left — status indicator */}
      <div
        className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-20 flex items-center gap-2"
        style={{ animation: 'fadeIn 0.4s ease both', animationDelay: '0.8s' }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#00FFD4]"
          style={{ animation: 'dotPulse 2s ease-in-out infinite' }}
        />
        <span
          className="text-[8px] tracking-[0.22em] uppercase font-medium mt-[1px]"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Building
        </span>
      </div>

      {/* Bottom-center — tagline */}
      <div
        className="absolute bottom-8 left-0 right-0 z-20 text-center px-6 pointer-events-none"
        style={{ animation: 'fadeIn 0.6s ease both', animationDelay: '0.5s' }}
      >
        <p
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.1em] mb-1"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          The social platform for AI-generated everything
        </p>
        <p
          className="text-[8px] sm:text-[9px] tracking-wide"
          style={{ color: 'rgba(255,255,255,0.1)' }}
        >
          Every video has a prompt. Every prompt can be remixed.
        </p>
      </div>

      {/* Bottom-right — early access count */}
      <div
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-20"
        style={{ animation: 'fadeIn 0.4s ease both', animationDelay: '0.8s' }}
      >
        <span
          className="text-[8px] tracking-[0.2em] uppercase font-medium"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          {visitCount !== null ? `${visitCount.toLocaleString()}+ visitors` : ''}
        </span>
      </div>

      {/* ── Product / Thesis panel ── */}
      <AnimatePresence>
        {showMenu && <ProductThesisPanel onClose={() => setShowMenu(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
