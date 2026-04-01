const Footer = () => {
  return (
    <footer className="border-t border-white/[0.04] py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3
              className="text-lg font-black uppercase text-[#00FFD4] mb-2"
              style={{ textShadow: '0 0 12px rgba(0,255,212,0.25)' }}
            >
              SLOPPY
            </h3>
            <p className="text-[11px] text-white/20 leading-relaxed">
              The social platform for AI-generated everything.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-3">Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Features', href: '#product' },
                { label: 'How It Works', href: '#thesis' },
                { label: 'Pricing', href: '#', soon: true },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] text-white/20 hover:text-white/50 transition-colors">
                    {link.label}
                    {link.soon && <span className="text-[9px] text-white/10 ml-1">(Coming Soon)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-3">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Careers'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[13px] text-white/20 hover:text-white/50 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 mb-3">Connect</h4>
            <div className="flex gap-2.5 mb-4">
              {[
                {
                  name: 'X',
                  d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
                },
                {
                  name: 'Discord',
                  d: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z',
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:border-[#00FFD4]/20 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  title={s.name}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" fillOpacity="0.25">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
            <a
              href="/Sloppy.apk"
              download="Sloppy.apk"
              className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#00FFD4]/60 hover:text-[#00FFD4] transition-colors no-underline"
            >
              Download App →
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/10">
            © 2026 Sloppy. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-[11px] text-white/10 hover:text-white/25 transition-colors">Privacy</a>
            <a href="#" className="text-[11px] text-white/10 hover:text-white/25 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
