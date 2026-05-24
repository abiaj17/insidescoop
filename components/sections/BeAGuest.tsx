'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientDots } from '@/components/ui/gradient-dots';

const ease = [0.16, 1, 0.3, 1] as const;
function reveal(delay: number, active: boolean) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.85, ease, delay },
  };
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  padding: '0.7rem 1rem',
  color: 'white',
  fontSize: '0.9375rem',
  fontWeight: 300,
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.5)',
  marginBottom: '0.45rem',
};

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const contacts = [
  {
    Icon: EmailIcon,
    label: 'Email',
    value: 'aaryanpol14@gmail.com',
    href: 'mailto:aaryanpol14@gmail.com',
  },
  {
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'Connect with Aaryan',
    href: 'https://linkedin.com', // AARYAN: replace with real LinkedIn URL
  },
  {
    Icon: InstagramIcon,
    label: 'Instagram',
    value: '@theinsidescoop', // AARYAN: confirm handle
    href: 'https://instagram.com/theinsidescoop', // AARYAN: confirm URL
  },
];

export default function BeAGuest({ isActive = false }: { isActive?: boolean }) {
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [fields, setFields] = useState({
    name: '',
    email: '',
    role: '',
    why: '',
    social: '',
  });

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === field ? 'rgba(26,20,245,0.7)' : 'rgba(255,255,255,0.12)',
  });

  function set(field: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields(prev => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const body = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `What I do: ${fields.role}`,
      ``,
      `Why I'd make a good guest:`,
      fields.why,
      fields.social ? `\nSocial: ${fields.social}` : '',
    ].join('\n');

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm` +
      `&to=aaryanpol14@gmail.com` +
      `&su=${encodeURIComponent(`${fields.name}'s Application`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank');
    setSent(true);
  }

  return (
    <section
      className="snap-section"
      onScroll={(e) => {
        const dim = e.currentTarget.scrollTop > 50;
        window.dispatchEvent(new CustomEvent('wordmark-dim', { detail: { dim } }));
      }}
      style={{ backgroundColor: '#0d2b5e', overflowY: 'auto' }}
    >
      <div style={{
        position: 'relative',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 'clamp(7rem, 10vw, 8rem)',
        paddingRight: 'clamp(1rem, 5vw, 2rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        paddingLeft: 'clamp(1rem, 5vw, 2rem)',
      }}>
        <GradientDots backgroundColor="#0d2b5e" dotSize={7} spacing={9} duration={32} colorCycleDuration={7} className="z-0 opacity-[0.18] pointer-events-none" />
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

          <motion.p {...reveal(0.05, isActive)} style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1.5rem',
          }}>
            05 / Get in Touch
          </motion.p>

          <motion.h2 {...reveal(0.15, isActive)} style={{
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 900,
            lineHeight: 0.97, letterSpacing: '-0.03em', color: 'white', marginBottom: '1.25rem',
          }}>
            Apply, connect,<br />or just say hey.
          </motion.h2>

          <motion.p {...reveal(0.25, isActive)} style={{
            fontSize: '1.0625rem', fontWeight: 300, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.55)', marginBottom: '3rem',
          }}>
            Aaryan reviews every application personally and replies within a week.
          </motion.p>

          <motion.div {...reveal(0.35, isActive)} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.25rem',
            alignItems: 'start',
          }}>

            {/* Form card */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '2rem',
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '1.75rem' }}>
                Send an Application
              </h3>

              {sent ? (
                <div style={{
                  padding: '2rem 0',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '1.0625rem',
                  fontWeight: 300,
                  lineHeight: 1.85,
                }}>
                  Your email is ready — just add a subject line and hit send.
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      required
                      type="text"
                      value={fields.name}
                      onChange={set('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={focusStyle('name')}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      required
                      type="email"
                      value={fields.email}
                      onChange={set('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={focusStyle('email')}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>What you do</label>
                    <input
                      required
                      type="text"
                      value={fields.role}
                      onChange={set('role')}
                      onFocus={() => setFocused('role')}
                      onBlur={() => setFocused(null)}
                      style={focusStyle('role')}
                      placeholder="Founder, student, researcher..."
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Why you&apos;d make a good guest</label>
                    <textarea
                      required
                      value={fields.why}
                      onChange={set('why')}
                      onFocus={() => setFocused('why')}
                      onBlur={() => setFocused(null)}
                      rows={4}
                      style={{ ...focusStyle('why'), resize: 'vertical' }}
                      placeholder="What's your story? What would you bring to the show?"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Social link <span style={{ opacity: 0.45, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                    <input
                      type="text"
                      value={fields.social}
                      onChange={set('social')}
                      onFocus={() => setFocused('social')}
                      onBlur={() => setFocused(null)}
                      style={focusStyle('social')}
                      placeholder="LinkedIn, Twitter, Instagram..."
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      backgroundColor: '#1A14F5',
                      border: '1px solid #1A14F5',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      fontFamily: 'inherit',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s',
                      marginTop: '0.25rem',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Contact card */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '2rem',
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
                Other Ways to Reach Out
              </h3>
              <p style={{
                fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.65)', marginBottom: '1.75rem',
              }}>
                Got a story worth sharing, an idea that could spark a conversation, or just want to say hey? Aaryan&apos;s always looking for people doing bold things.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {contacts.map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s, background-color 0.2s',
                      color: 'white',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,20,245,0.5)';
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(26,20,245,0.08)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                    }}
                  >
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      backgroundColor: 'rgba(255,255,255,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.7)', flexShrink: 0,
                    }}>
                      <Icon />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'white', letterSpacing: '0.01em' }}>
                        {label}
                      </div>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', marginTop: '0.1rem' }}>
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
