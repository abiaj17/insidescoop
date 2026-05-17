'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const ease = [0.16, 1, 0.3, 1] as const;

function reveal(delay: number, active: boolean) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.85, ease, delay },
  };
}

const GOALS = [
  { num: '01', title: 'Learn',          desc: "Every interview teaches me something I didn't know. That's the main reason." },
  { num: '02', title: 'Build',          desc: "Gen Z founders are doing interesting work. Most podcasts haven't noticed yet." },
  { num: '03', title: 'McCombs',        desc: "I want something real to show — not a club list, but a podcast that's actually running." },
  { num: '04', title: 'Pay it forward', desc: "If one listener starts something they've been sitting on, that's a good episode." },
];

const EPISODES = [
  { label: 'EP 01', title: 'Who Am I? and Why I Started This Podcast', guest: 'Aaryan Polisetty', spotify: 'https://open.spotify.com/episode/1CA7i79aV73VZqr1ebOtjd?si=fXhhZOxoSsODeUxnr-hjkQ' },
  { label: 'EP 02', title: 'The High School Hustle to 1M Users | Talem\'s Journey', guest: 'Pranav Konjeti', spotify: 'https://open.spotify.com/episode/7kaxsnSVSXwvSaKEldXKj1?si=NmqCZD0kTUSzu8Mxu0b7mw' },
  { label: 'EP 03', title: 'From Startup Dreams to Global Impact', guest: 'Mahir Laul · Founder, Velric', spotify: 'https://open.spotify.com/episode/52prNMXkGPZfcJ007EVyB9?si=d31Eae28QWaO1nYwvIjc_w' },
];

export default function About({ isActive = false }: { isActive?: boolean }) {
  return (
    <section
      className="snap-section grid grid-cols-1 lg:grid-cols-[7fr_5fr]"
      onScroll={(e) => {
        const dim = e.currentTarget.scrollTop > 50;
        window.dispatchEvent(new CustomEvent('wordmark-dim', { detail: { dim } }));
      }}
      style={{
        backgroundColor: '#080812',
        backgroundImage: `
          radial-gradient(ellipse 60% 50% at 4% 20%, rgba(26,20,245,0.13) 0%, transparent 60%),
          radial-gradient(ellipse 45% 40% at 90% 80%, rgba(85,119,255,0.07) 0%, transparent 55%)
        `,
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Text column ─────────────────────────────────────── */}
      <div
        className="flex flex-col justify-center"
        style={{
          padding: 'clamp(2.5rem, 5vw, 5rem) clamp(1.5rem, 6vw, 6rem)',
          paddingTop: 'clamp(7rem, 10vw, 8rem)',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          {...reveal(0.05, isActive)}
          style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1.5rem',
          }}
        >
          02 / About Me
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...reveal(0.15, isActive)}
          style={{
            fontSize: 'clamp(2.4rem, 3.8vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 0.97,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '2rem',
          }}
        >
          The voice behind<br />The Inside Scoop.
        </motion.h2>

        {/* Pull quote */}
        <motion.blockquote
          {...reveal(0.25, isActive)}
          style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start', marginBottom: '2.25rem' }}
        >
          <div style={{
            width: '2px', background: '#1A14F5',
            flexShrink: 0, alignSelf: 'stretch', minHeight: '2.25rem',
          }} />
          <p style={{
            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
            fontStyle: 'italic', fontWeight: 300,
            color: 'rgba(255,255,255,0.80)', lineHeight: 1.6,
          }}>
            "Every interview teaches me something a classroom hasn't."
          </p>
        </motion.blockquote>

        {/* Body */}
        <motion.p
          {...reveal(0.3, isActive)}
          style={{
            fontSize: '1.0625rem',
            fontWeight: 300, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.88)',
            marginBottom: '1.25rem',
          }}
        >
          I&apos;m Aaryan, a high school student who got a little too deep into business content.
          Ranveer Allahbadia and Think School India were the rabbit holes that started it.
          Content where you actually walk away knowing something. I figured I&apos;d try having
          those conversations myself, with founders, builders, and yes, even fictional legends
          like Harvey Specter.
        </motion.p>

        <motion.p
          {...reveal(0.38, isActive)}
          style={{
            fontSize: '1.0625rem',
            fontWeight: 300, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.88)',
            marginBottom: '1.25rem',
          }}
        >
          The Inside Scoop exists because I kept watching interviews where the host was too
          polished to ask anything real. The goals here are simple: learn something from every
          conversation, build something I can point to when I apply to McCombs, and give Gen Z
          founders the kind of attention that usually only goes to people who&apos;ve already made it.
        </motion.p>

        <motion.p
          {...reveal(0.46, isActive)}
          style={{
            fontSize: '1.0625rem',
            fontWeight: 300, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.88)',
          }}
        >
          Most of this is selfish, honestly. Every interview teaches me something a classroom
          hasn&apos;t. But if someone listens and walks away with a new way of thinking, or
          finally starts the thing they&apos;ve been sitting on, that&apos;s a good episode.
        </motion.p>
      </div>

      {/* ── Image column ────────────────────────────────────── */}
      <div className="flex items-start justify-center" style={{ padding: 'clamp(2rem, 4vw, 4rem)', paddingTop: 'clamp(7rem, 10vw, 8rem)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.92 }}
          transition={{ duration: 1.0, ease, delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: '-10px',
            borderRadius: '50%',
            border: '1px solid rgba(26,20,245,0.35)',
          }} />
          {/* Circle photo */}
          <div style={{
            width: 'clamp(220px, 28vw, 360px)',
            height: 'clamp(220px, 28vw, 360px)',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <Image
              src="/aaryan.jpg"
              alt="Aaryan Polisetty"
              fill
              sizes="(max-width: 1024px) 60vw, 30vw"
              style={{ objectFit: 'cover', objectPosition: '72% 18%' }}
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* ── Why I Started — full width ──────────────────────── */}
      <div
        className="col-span-1 lg:col-span-2 order-3"
        style={{ padding: '0 clamp(1.5rem, 6vw, 6rem) 0' }}
      >
        <motion.p
          {...reveal(0.52, isActive)}
          style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}
        >
          Why I Started
        </motion.p>
        <div>
          {GOALS.map((g, i) => (
            <motion.div
              key={g.num}
              {...reveal(0.56 + i * 0.07, isActive)}
              className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[2.5rem_9rem_1fr]"
              style={{
                rowGap: '0.25rem',
                columnGap: '1.5rem',
                alignItems: 'baseline',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                padding: '0.75rem 0',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#1A14F5', letterSpacing: '0.1em' }}>{g.num}</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'white', letterSpacing: '0.02em', textTransform: 'uppercase' }}>{g.title}</span>
              <span className="col-span-2 sm:col-auto" style={{ fontSize: '0.9375rem', fontWeight: 300, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6 }}>{g.desc}</span>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>
      </div>

      {/* ── A Few Favorites — full width ────────────────────── */}
      <div
        className="col-span-1 lg:col-span-2 order-4"
        style={{ padding: '1.5rem clamp(1.5rem, 6vw, 6rem) clamp(2.5rem, 4vw, 4rem)' }}
      >
        <motion.p
          {...reveal(0.82, isActive)}
          style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}
        >
          A Few Favorites
        </motion.p>
        <div>
          {EPISODES.map((ep, i) => (
            <motion.div
              key={ep.label}
              {...reveal(0.86 + i * 0.07, isActive)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                padding: '0.75rem 0',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#1A14F5', letterSpacing: '0.1em', flexShrink: 0, width: '2.5rem' }}>{ep.label}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'rgba(255,255,255,0.90)', lineHeight: 1.3, marginBottom: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.title}</p>
                <p style={{ fontSize: '0.8125rem', fontWeight: 300, color: 'rgba(255,255,255,0.60)', letterSpacing: '0.02em' }}>{ep.guest}</p>
              </div>
              <a
                href={ep.spotify} target="_blank" rel="noopener noreferrer"
                className="pill-link"
                style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', minHeight: '44px', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '0.4rem 0.9rem', transition: 'color 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#1DB954'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1DB954'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Listen
              </a>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </div>

        <motion.div
          {...reveal(1.0, isActive)}
          style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
            Also on
          </span>
          <a
            href="https://www.youtube.com/@TheInsideScoop-ByAaryanPol"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-link"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              minHeight: '44px',
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '999px',
              padding: '0.35rem 0.8rem',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FF0000'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#FF0000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}
