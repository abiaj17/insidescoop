'use client';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

function reveal(delay: number, active: boolean) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.85, ease, delay },
  };
}

function BarChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="1"  y="16" width="5.5" height="11" rx="1" fill="white" fillOpacity="0.9" />
      <rect x="11" y="9"  width="5.5" height="18" rx="1" fill="white" fillOpacity="0.9" />
      <rect x="21" y="3"  width="5.5" height="24" rx="1" fill="white" fillOpacity="0.9" />
      <line x1="0" y1="27.25" x2="28" y2="27.25" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="10" y="1" width="8" height="14" rx="4" fill="white" fillOpacity="0.9" />
      <path d="M5 13C5 19.075 8.134 23 14 23C19.866 23 23 19.075 23 13"
        stroke="white" strokeOpacity="0.9" strokeWidth="1.75" strokeLinecap="round" fill="none" />
      <line x1="14" y1="23" x2="14" y2="27" stroke="white" strokeOpacity="0.9" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="9"  y1="27" x2="19" y2="27" stroke="white" strokeOpacity="0.9" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 5C14 5 9 3 3 4V25C9 24 14 26 14 26V5Z" fill="white" fillOpacity="0.9" />
      <path d="M14 5C14 5 19 3 25 4V25C19 24 14 26 14 26V5Z" fill="white" fillOpacity="0.45" />
      <line x1="14" y1="5" x2="14" y2="26" stroke="white" strokeOpacity="0.3" strokeWidth="0.75" />
    </svg>
  );
}

const types = [
  {
    Icon: BarChartIcon,
    name: 'Business Breakdowns',
    desc: "No guest needed. China's $17 trillion economy, Tinder vs Bumble's decade-long war, the real playbook behind billion-dollar decisions. Short, sharp, worth the 6 minutes.",
  },
  {
    Icon: MicIcon,
    name: 'Founder Interviews',
    desc: 'Conversations with people actually building things. High schoolers hitting 1M users, college kids disrupting test prep, researchers democratizing academia. No PR speak, no rehearsed answers.',
  },
  {
    Icon: BookIcon,
    name: 'Fiction Meets Hustle',
    desc: "Business lessons from stories that never happened. Harvey Specter. Characters who never existed but understand leverage, negotiation, and risk better than most real executives.",
  },
];

export default function Podcast({ isActive = false }: { isActive?: boolean }) {
  return (
    <section
      className="snap-section"
      onScroll={(e) => {
        const dim = e.currentTarget.scrollTop > 50;
        window.dispatchEvent(new CustomEvent('wordmark-dim', { detail: { dim } }));
      }}
      style={{
        backgroundColor: '#1A14F5',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '0 2rem 5rem',
        paddingTop: 'clamp(7rem, 10vw, 8rem)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>

        {/* Eyebrow */}
        <motion.p
          {...reveal(0.05, isActive)}
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.55)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          04 / About the Podcast
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...reveal(0.15, isActive)}
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 0.97,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '1.5rem',
          }}
        >
          Three kinds of episodes.<br />One show.
        </motion.h2>

        {/* Lead */}
        <motion.p
          {...reveal(0.28, isActive)}
          style={{
            fontSize: '1.0625rem',
            fontWeight: 300,
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '3.5rem',
          }}
        >
          Every episode fits into one of these. All of them are worth your time.
        </motion.p>

        {/* What It's About */}
        <motion.div {...reveal(0.38, isActive)} style={{ marginBottom: '3.5rem' }}>
          <h3 style={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: 'white',
            marginBottom: '0.6rem',
          }}>
            What It&apos;s About
          </h3>
          <div style={{ width: '2rem', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)', marginBottom: '1.75rem' }} />

          {/* AARYAN: replace/confirm this copy if you want different wording */}
          <p style={{ fontSize: '1.0625rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.85)', marginBottom: '1rem' }}>
            <strong style={{ fontWeight: 700 }}>The Inside Scoop</strong>{' '}is where real conversations meet entrepreneurial fire. Every episode is a deep dive: a case study breaking down the Tinder vs. Bumble war, or a raw talk with someone who built a startup in a high school bathroom.
          </p>
          <p style={{ fontSize: '1.0625rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.85)', marginBottom: '1rem' }}>
            This podcast is built for thinkers, builders, and dreamers. Especially those who aren&apos;t afraid to start before they&apos;re ready.
          </p>
          <p style={{ fontSize: '1.0625rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.85)', marginBottom: '1.75rem' }}>
            From Gen Z founders to business legends (fictional and real), <strong style={{ fontWeight: 700 }}>The Inside Scoop</strong> gets into what it actually takes to stand out, and what it means to lead with curiosity.
          </p>

          {/* Pull quote */}
          <blockquote style={{
            borderLeft: '2px solid rgba(255,255,255,0.6)',
            paddingLeft: '1.25rem',
            margin: 0,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: 'rgba(255,255,255,0.75)',
          }}>
            &ldquo;Not just another podcast. This is The Inside Scoop.&rdquo;
          </blockquote>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          {types.map(({ Icon, name, desc }, i) => (
            <motion.div
              key={name}
              {...reveal(0.4 + i * 0.08, isActive)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
              }}
            >
              {/* Icon container */}
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon />
              </div>

              <h3 style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 1.35,
                margin: 0,
              }}>
                {name}
              </h3>

              <p style={{
                fontSize: '0.9rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.65,
                margin: 0,
              }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Listen On */}
        <motion.div {...reveal(0.4 + types.length * 0.08 + 0.12, isActive)} style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: '0.6rem' }}>
            Listen On
          </h3>
          <div style={{ width: '2rem', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)', marginBottom: '1.75rem' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '520px' }}>

            {/* Spotify */}
            <a
              href="https://open.spotify.com/show/6s2DP0oNBGAFmNwBSyuJZ9" /* AARYAN: confirm Spotify show URL */
              target="_blank" rel="noopener noreferrer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                padding: '1.5rem 1.75rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem',
                textDecoration: 'none', transition: 'background-color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(29,185,84,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(29,185,84,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.516 17.313c-.214.332-.666.439-1 .225-2.74-1.674-6.19-2.053-10.254-1.124-.39.089-.78-.152-.869-.542-.09-.39.151-.78.542-.869 4.444-1.016 8.257-.578 11.333 1.3.334.214.44.666.226 1.01zm1.472-3.27c-.27.418-.843.549-1.261.28-3.136-1.927-7.918-2.486-11.628-1.36-.482.145-.99-.127-1.136-.609-.145-.482.127-.99.609-1.136 4.236-1.286 9.503-.663 13.097 1.565.418.27.549.843.28 1.261zm.127-3.405C15.95 8.48 9.876 8.273 6.23 9.385c-.578.174-1.19-.153-1.364-.73-.174-.578.153-1.19.73-1.364 4.218-1.28 11.227-1.033 15.658 1.593.532.317.707 1.003.39 1.535-.317.532-1.004.707-1.536.39z"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spotify</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em' }}>Listen Now →</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@TheInsideScoop-ByAaryanPol"
              target="_blank" rel="noopener noreferrer"
              style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '12px',
                padding: '1.5rem 1.75rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem',
                textDecoration: 'none', transition: 'background-color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,0,0,0.15)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,0,0,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>YouTube</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em' }}>Watch Now →</span>
            </a>

          </div>
        </motion.div>

        {/* Closing line */}
        <motion.p
          {...reveal(0.4 + types.length * 0.08 + 0.25, isActive)}
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
          }}
        >
          New episodes every other week.
        </motion.p>

      </div>
    </section>
  );
}
