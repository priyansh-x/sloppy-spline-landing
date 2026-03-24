import { motion } from 'framer-motion';

interface Props {
  onClose: () => void;
}

const ProductThesisPanel = ({ onClose }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50"
      style={{ background: '#0A0A0A' }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 w-8 h-8 flex items-center justify-center cursor-pointer"
        style={{ color: 'rgba(255,255,255,0.3)' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Scrollable */}
      <div className="w-full h-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '460px',
            margin: '0 auto',
            padding: '100px 32px 80px',
            textAlign: 'center',
          }}
        >

          {/* Label */}
          <p style={{
            color: '#00FFD4',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.35em',
            marginBottom: '80px',
          }}>
            Thesis
          </p>

          {/* --- */}

          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '15px',
            lineHeight: '2',
            marginBottom: '48px',
          }}>
            AI video is everywhere now.<br />
            But nobody owns the culture around it.
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '15px',
            lineHeight: '2',
            marginBottom: '64px',
          }}>
            The tools exist — Runway, Kling,<br />
            Luma, Sora. But there's no home<br />
            for what people make with them.<br />
            No feed. No remix. No community.
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(0,255,212,0.25)' }} />
          </div>

          <p style={{
            color: '#ffffff',
            fontSize: '22px',
            fontWeight: 700,
            lineHeight: '1.5',
            marginBottom: '40px',
          }}>
            Every great platform<br />
            has a sharing primitive.
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '14px',
            lineHeight: '2.2',
            marginBottom: '64px',
          }}>
            YouTube had the link.<br />
            TikTok had the sound.<br />
            Sloppy's primitive is the prompt.
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(0,255,212,0.25)' }} />
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '15px',
            lineHeight: '2',
            marginBottom: '48px',
          }}>
            On Sloppy, every video shows<br />
            its prompt. Not buried in metadata —<br />
            visible, tappable, front and centre.
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '15px',
            lineHeight: '2',
            marginBottom: '64px',
          }}>
            Every video can be remixed by anyone.<br />
            Tap remix, edit the prompt,<br />
            generate your version.<br />
            Ideas are open source.
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(0,255,212,0.25)' }} />
          </div>

          <p style={{
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '1.5',
            marginBottom: '48px',
          }}>
            We believe three things.
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '14px',
            lineHeight: '2',
            marginBottom: '36px',
          }}>
            <span style={{ color: 'rgba(0,255,212,0.5)' }}>1.</span>
            &nbsp;&nbsp;Prompts are ideas.<br />
            Ideas want to spread.<br />
            Hiding them kills the culture.
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '14px',
            lineHeight: '2',
            marginBottom: '36px',
          }}>
            <span style={{ color: 'rgba(0,255,212,0.5)' }}>2.</span>
            &nbsp;&nbsp;Remix is the internet's<br />
            native creative act.<br />
            Every meme is a derivative.<br />
            We're building the rails for AI video<br />
            to work the same way.
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '14px',
            lineHeight: '2',
            marginBottom: '80px',
          }}>
            <span style={{ color: 'rgba(0,255,212,0.5)' }}>3.</span>
            &nbsp;&nbsp;Generation is a utility,<br />
            not the product.<br />
            Models come and go.<br />
            The social layer is what lasts.
          </p>

          {/* Divider */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(0,255,212,0.25)' }} />
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '15px',
            lineHeight: '2',
            marginBottom: '48px',
          }}>
            V1 is meme reels — short, weird,<br />
            fully AI-generated.<br />
            The architecture is built for everything<br />
            AI video becomes.
          </p>

          <p style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '13px',
            lineHeight: '1.8',
            letterSpacing: '0.03em',
            marginBottom: '80px',
          }}>
            The definitive platform<br />
            for AI-generated everything.
          </p>

          {/* Footer */}
          <p style={{
            color: 'rgba(0,255,212,0.2)',
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
          }}>
            Sloppy — 2026
          </p>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductThesisPanel;
