'use client';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

function reveal(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease, delay },
  };
}

const FIELDS = [
  {
    tag: 'SUBJECT',
    accent: '#6B8AFF',
    example: 'Pitch: [Your Name] — [Your story in 5 words]',
    note: 'Skip "coffee chat" energy. Lead with what makes you different.',
  },
  {
    tag: 'HOOK',
    accent: '#00C4FF',
    example: 'I built X at 17. It failed spectacularly. Here\'s what I learned.',
    note: 'First two sentences. Make Aaryan stop scrolling.',
  },
  {
    tag: 'THE PITCH',
    accent: '#A78BFA',
    example: 'The Inside Scoop audience would care because...',
    note: 'Why does this story hit for Gen Z founders specifically?',
  },
  {
    tag: 'RECEIPTS',
    accent: '#34D399',
    example: 'Link to your work, press, socials, or anything that proves the story.',
    note: 'No essay needed. Just drop proof.',
  },
  {
    tag: 'THE ASK',
    accent: '#FBBF24',
    example: 'I\'d love 30 minutes to share my story on the pod.',
    note: 'Be direct. Aaryan respects the close.',
  },
];

const MAILTO = 'mailto:aaryanpol14@gmail.com?subject=Pitch: [Your Name] — [Story in 5 words]';

export default function Contact() {
  return (
    <section
      id="contact"
      className="snap-section"
      style={{ backgroundColor: '#102040', overflowY: 'auto' }}
    >
      <div style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 'clamp(7rem, 10vw, 8rem)',
        paddingRight: 'clamp(1rem, 5vw, 2rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        paddingLeft: 'clamp(1rem, 5vw, 2rem)',
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>

          <motion.p {...reveal(0.05)} style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem',
          }}>
            06 / Get in Touch
          </motion.p>

          <motion.h2 {...reveal(0.12)} style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900,
            lineHeight: 0.97, letterSpacing: '-0.03em', color: 'white', marginBottom: '1.1rem',
          }}>
            Write the email<br />worth opening.
          </motion.h2>

          <motion.p {...reveal(0.2)} style={{
            fontSize: '1rem', fontWeight: 300, lineHeight: 1.8,
            color: 'rgba(255,255,255,0.5)', marginBottom: '2.5rem', maxWidth: '460px',
          }}>
            No form. No middleman. Just an email that earns a reply.
            Here&apos;s the anatomy of one that does.
          </motion.p>

          {/* Pitch brief card — styled like a dark email composer */}
          <motion.div {...reveal(0.3)} style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '2rem',
          }}>

            {/* Fake email client titlebar */}
            <div style={{
              padding: '0.9rem 1.4rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'rgba(255,255,255,0.015)',
            }}>
              {['rgba(255,255,255,0.13)', 'rgba(255,255,255,0.09)', 'rgba(255,255,255,0.06)'].map((bg, i) => (
                <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: bg, display: 'inline-block' }} />
              ))}
              <span style={{
                marginLeft: '0.8rem',
                fontSize: '10.5px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'monospace',
              }}>
                pitch_brief.eml → aaryanpol14@gmail.com
              </span>
            </div>

            {/* Anatomy rows */}
            <div>
              {FIELDS.map((field, i) => (
                <motion.div
                  key={field.tag}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.09 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '88px 1fr',
                    gap: '1.1rem',
                    padding: '1.1rem 1.4rem',
                    borderBottom: i < FIELDS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    alignItems: 'start',
                  }}
                >
                  <span style={{
                    fontSize: '8.5px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: field.accent,
                    backgroundColor: `${field.accent}15`,
                    border: `1px solid ${field.accent}28`,
                    borderRadius: '4px',
                    padding: '0.3rem 0.45rem',
                    display: 'inline-block',
                    marginTop: '3px',
                    whiteSpace: 'nowrap',
                  }}>
                    {field.tag}
                  </span>

                  <div>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.72)',
                      fontStyle: 'italic',
                      marginBottom: '0.3rem',
                      lineHeight: 1.55,
                    }}>
                      {field.example}
                    </p>
                    <p style={{
                      fontSize: '0.72rem',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.3)',
                      lineHeight: 1.6,
                    }}>
                      {field.note}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div {...reveal(0.9)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.1rem',
            flexWrap: 'wrap',
          }}>
            <a
              href={MAILTO}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                backgroundColor: 'white',
                color: '#0a1628',
                fontSize: '0.9rem',
                fontWeight: 700,
                fontFamily: 'inherit',
                padding: '0.82rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.82'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
              Open Email Draft
            </a>

            <span style={{
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.28)',
              fontWeight: 300,
              lineHeight: 1.5,
            }}>
              aaryanpol14@gmail.com<br />replies within a week
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
