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

const EPISODES = [
  { num: '01', title: 'From Startup Dreams to Global Impact', sub: 'Mahir Laul · Founder, Velric', spotify: 'https://open.spotify.com/episode/52prNMXkGPZfcJ007EVyB9' },
  { num: '02', title: "From College Dorm to $125K MRR: SideShift's Bold Bet on Student Talent", sub: 'Nick Lavion · Co-founder, SideShift', spotify: 'https://open.spotify.com/episode/0PGs8HY4770Mgqw0YgDFIp' },
  { num: '03', title: 'This Gen Z Founder Skipped Wall Street to Build for Gen Z', sub: 'Emilio Van Corthem', spotify: 'https://open.spotify.com/episode/4iiXhBCK8yu9fB4vUFeedR' },
  { num: '04', title: "How Crackd Is Disrupting Test Prep | Arun Khemani's Bold Startup Journey", sub: 'Arun Khemani · Co-founder, Crackd', spotify: 'https://open.spotify.com/episode/3KtU7FsnQxRYPTZuiajac3' },
  { num: '05', title: "The High School Hustle to 1M Users | Talem's Journey", sub: 'Pranav Konjeti · Co-founder, Talem', spotify: 'https://open.spotify.com/episode/7kaxsnSVSXwvSaKEldXKj1' },
  { num: '06', title: "The Startup That's Changing How Students Study Forever", sub: 'Jonathan Maynard · Founder, Knowlify', spotify: 'https://open.spotify.com/episode/2ZNjnH9XGDYBD9nSEqRf9J' },
  { num: '07', title: 'How Young Researchers Institute Is Disrupting Academia', sub: 'Ishan Jain · Founder, Young Researchers Institute', spotify: 'https://open.spotify.com/episode/0zfjpUR2KZ3wnbm5g2cHgu' },
  { num: '08', title: 'How This 21st Century Startup Is Giving AI Superpowers', sub: 'Harsha Gaddipati · Co-founder, DASH AI', spotify: 'https://open.spotify.com/episode/0ZGwX91y860npKwUYxn50T' },
  { num: '09', title: "China's $17 Trillion Power Play: Can the World Keep Up with the Dragon?", sub: 'Business breakdown', spotify: 'https://open.spotify.com/episode/6KlfTuIvd2Omlv98c12XJK' },
  { num: '10', title: "This Startup Is Changing How College Students Date", sub: 'Evan Rama · Founder, Kupid', spotify: 'https://open.spotify.com/episode/5IP3h5paJu7ybNLFqdb6Lc' },
  { num: '11', title: 'Why Suits Is the Ultimate Business Show | Harvey Specter Case Study', sub: 'Fiction meets hustle', spotify: 'https://open.spotify.com/episode/4qKJHVTZ3H7PezonXMCJ4x' },
  { num: '12', title: 'Tinder vs Bumble: The Billion-Dollar Dating Business War', sub: 'Business breakdown', spotify: 'https://open.spotify.com/episode/5txsLGt1ULhXJhyeAOSvMR' },
];

const PLATFORMS = [
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/show/1CA7i79aV73VZqr1ebOtjd', // AARYAN: confirm show page URL
    hoverColor: '#1DB954',
    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
  },
  {
    label: 'Apple Podcasts',
    href: '#', // AARYAN: Apple Podcasts link
    hoverColor: '#B150E2',
    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 4.419c4.173 0 7.581 3.408 7.581 7.581 0 4.173-3.408 7.581-7.581 7.581-4.173 0-7.581-3.408-7.581-7.581 0-4.173 3.408-7.581 7.581-7.581zM12 7.2c-2.646 0-4.8 2.154-4.8 4.8 0 2.039 1.28 3.794 3.097 4.48-.043-.359-.083-.905-.017-1.296l.614-2.603s-.157-.313-.157-.777c0-.727.422-1.272.946-1.272.446 0 .663.335.663.737 0 .449-.286 1.122-.434 1.746-.123.521.26 1.004.773 1.004.927 0 1.64-.977 1.64-2.388 0-1.249-.897-2.121-2.177-2.121-1.483 0-2.353 1.112-2.353 2.262 0 .447.172.927.387 1.188.042.051.049.096.036.148l-.144.589c-.023.094-.076.114-.175.069-.692-.323-1.125-1.337-1.125-2.151 0-1.749 1.271-3.356 3.665-3.356 1.924 0 3.418 1.371 3.418 3.201 0 1.908-1.203 3.447-2.872 3.447-.561 0-1.088-.292-1.269-.636l-.345 1.285c-.125.481-.462 1.083-.689 1.449.519.16 1.069.247 1.639.247 2.646 0 4.8-2.154 4.8-4.8S14.646 7.2 12 7.2z"/></svg>,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@TheInsideScoop-ByAaryanPol',
    hoverColor: '#FF0000',
    icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
];

function EpisodeCard({ ep, delay, isActive }: { ep: typeof EPISODES[0]; delay: number; isActive: boolean }) {
  return (
    <motion.div
      {...reveal(delay, isActive)}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,20,245,0.55)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(26,20,245,0.06)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      {/* Number */}
      <span style={{
        fontSize: '11px', fontWeight: 500, color: '#1A14F5', letterSpacing: '0.12em',
      }}>
        {ep.num}
      </span>

      {/* Title — grows to fill available space */}
      <p style={{
        fontSize: '0.9375rem', fontWeight: 700,
        color: 'rgba(255,255,255,0.92)', lineHeight: 1.4,
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {ep.title}
      </p>

      {/* Bottom row: guest + listen */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <p style={{
          fontSize: '0.8125rem', fontWeight: 300,
          color: 'rgba(255,255,255,0.42)', letterSpacing: '0.01em',
          flex: 1, minWidth: 0,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {ep.sub}
        </p>
        <a
          href={ep.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-link"
          style={{
            flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            minHeight: '44px',
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px', padding: '0.35rem 0.75rem',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = '#1DB954';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = '#1DB954';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)';
            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Listen
        </a>
      </div>
    </motion.div>
  );
}

export default function Episodes({ isActive = false }: { isActive?: boolean }) {
  return (
    <section
      className="snap-section"
      onScroll={(e) => {
        const dim = e.currentTarget.scrollTop > 50;
        window.dispatchEvent(new CustomEvent('wordmark-dim', { detail: { dim } }));
      }}
      style={{ backgroundColor: '#0d0d1a', overflowY: 'auto', overflowX: 'hidden' }}
    >
      <div style={{ padding: 'clamp(5rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem) clamp(2.5rem, 4vw, 4rem)' }}>

        {/* Eyebrow */}
        <motion.p
          {...reveal(0.05, isActive)}
          style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1.25rem',
          }}
        >
          03 / Episodes
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...reveal(0.15, isActive)}
          style={{
            fontSize: 'clamp(2.4rem, 4vw, 4.5rem)',
            fontWeight: 900, lineHeight: 0.97, letterSpacing: '-0.03em',
            color: 'white', marginBottom: '0.85rem',
          }}
        >
          Recent conversations.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          {...reveal(0.23, isActive)}
          style={{
            fontSize: '1.0625rem', fontWeight: 300, lineHeight: 1.85,
            color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem',
          }}
        >
          New episodes every other week.
        </motion.p>

        {/* Card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '1rem',
        }}>
          {EPISODES.map((ep, i) => (
            <EpisodeCard
              key={ep.num}
              ep={ep}
              delay={0.3 + i * 0.045}
              isActive={isActive}
            />
          ))}
        </div>

        {/* Listen on strip */}
        <motion.div
          {...reveal(0.3 + EPISODES.length * 0.045 + 0.1, isActive)}
          style={{
            marginTop: '2.5rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap',
          }}
        >
          <span style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
          }}>
            Listen on
          </span>
          {PLATFORMS.map((p) => (
            <a
              key={p.label}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-link"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                minHeight: '44px',
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)',
                textDecoration: 'none', border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '999px', padding: '0.35rem 0.8rem',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = p.hoverColor;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = p.hoverColor;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.40)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.10)';
              }}
            >
              {p.icon}
              {p.label}
            </a>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
