'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import Image from 'next/image';
import type { SectionId } from '@/lib/section-types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
}

const navLinks: { label: string; id: SectionId }[] = [
  { label: 'About Me',          id: 'about'    },
  { label: 'Episodes',          id: 'episodes' },
  { label: 'About the Podcast', id: 'podcast'  },
  { label: 'Get in Touch',      id: 'guest'    },
];

export default function Navbar({ onNavigate, activeSection }: { onNavigate: (id: SectionId) => void; activeSection?: SectionId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [wordmarkDimmed, setWordmarkDimmed] = useState(false);

  useEffect(() => {
    const h = (e: Event) => setWordmarkDimmed((e as CustomEvent<{ dim: boolean }>).detail.dim);
    window.addEventListener('wordmark-dim', h);
    return () => window.removeEventListener('wordmark-dim', h);
  }, []);

  // Element refs
  const navWrapRef   = useRef<HTMLDivElement>(null);
  const dimRef       = useRef<HTMLDivElement>(null);
  const panelsRef    = useRef<HTMLDivElement[]>([]);
  const linksRef     = useRef<HTMLSpanElement[]>([]);
  const btnTextsRef  = useRef<HTMLSpanElement[]>([]);
  const btnIconRef   = useRef<SVGSVGElement>(null);
  const activeRef    = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openMenu = useCallback(() => {
    activeRef.current?.kill();
    gsap.set(navWrapRef.current, { display: 'block' });
    gsap.set(linksRef.current, { opacity: 0, y: 20, rotate: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'main', duration: 0.7 } });
    activeRef.current = tl;

    tl.fromTo(btnTextsRef.current,  { yPercent: 0   }, { yPercent: -100, stagger: 0.15 })
      .fromTo(btnIconRef.current,   { rotate: 0     }, { rotate: 315                   }, '<')
      .fromTo(dimRef.current,       { autoAlpha: 0  }, { autoAlpha: 1                  }, '<')
      .fromTo(panelsRef.current,    { xPercent: 101 }, { xPercent: 0, stagger: 0.1, duration: 0.55 }, '<')
      .fromTo(linksRef.current,     { opacity: 0, y: 20, rotate: 0 }, { opacity: 1, y: 0, rotate: 0, stagger: 0.06, duration: 0.45 }, '>-0.5');

    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    activeRef.current?.kill();

    const tl = gsap.timeline({
      defaults: { ease: 'main', duration: 0.7 },
      onComplete: () => gsap.set(navWrapRef.current, { display: 'none' }),
    });
    activeRef.current = tl;

    tl.to(linksRef.current,  { opacity: 0, y: -12, rotate: 0, stagger: { each: 0.04, from: 'end' }, duration: 0.3 })
      .to(btnTextsRef.current, { yPercent: 0, stagger: { each: 0.15, from: 'end' } }, '<')
      .to(btnIconRef.current,  { rotate: 0 }, '<')
      .to(panelsRef.current,   { xPercent: 101, stagger: { each: 0.1, from: 'end' }, duration: 0.55 }, '<+=0.1')
      .to(dimRef.current,      { autoAlpha: 0, duration: 0.45 }, '<');

    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => (isOpen ? closeMenu() : openMenu()), [isOpen, openMenu, closeMenu]);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) closeMenu(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, closeMenu]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault();
    onNavigate(id);
    closeMenu();
  };

  return (
    <div ref={containerRef}>
      {/* Always-visible header */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Scrolling ticker strip */}
        <div
          className="pointer-events-auto overflow-hidden"
          style={{
            height: '30px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(8,8,18,0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="ticker-track">
            {[0, 1].map((n) => (
              <span key={n} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {['THE INSIDE SCOOP', 'BY AARYAN POLISETTY', 'GEN Z FOUNDERS', 'BUSINESS BREAKDOWNS', 'FICTION MEETS HUSTLE', 'REAL QUESTIONS · NO SCRIPT', 'SEASON 01', 'NEW EPISODES EVERY OTHER WEEK'].map((text) => (
                  <span key={text} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', padding: '0 1.4rem', whiteSpace: 'nowrap' }}>
                      {text}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px', flexShrink: 0 }}>·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Logo + menu row — fixed height, both elements absolutely positioned */}
        <div className="relative pointer-events-none" style={{ height: '72px' }}>

          {/* Logo + wordmark — centered on hero, left on all other sections */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="pointer-events-auto absolute flex items-center gap-3 flex-shrink-0"
            style={{
              top: '50%',
              left: '1.5rem', transform: 'translateY(-50%)',
              opacity: wordmarkDimmed ? 0 : 1,
              transition: 'opacity 0.4s ease',
              textDecoration: 'none',
            }}
          >
            <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: '44px', height: '44px' }}>
              <Image src="/logo.webp" alt="The Inside Scoop" width={44} height={44} className="w-full h-full object-cover" />
            </div>
            <div
              className="wordmark-roll hidden lg:block"
              style={{
                fontSize: '28px',
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.02em',
                height: '34px',
                lineHeight: '34px',
              }}
            >
              <span style={{ display: 'block', lineHeight: '34px' }}>The Inside Scoop</span>
              <span style={{ display: 'block', lineHeight: '34px' }}>The Inside Scoop</span>
            </div>
          </a>

          {/* Menu button — always right */}
          <button
            onClick={toggle}
            className="pointer-events-auto absolute flex items-center gap-3 text-white cursor-pointer flex-shrink-0"
            style={{ top: '50%', right: '1.25rem', transform: 'translateY(-50%)' }}
            aria-label="Toggle menu"
          >
            <div className="overflow-hidden" style={{ height: '1.5rem' }}>
              <span ref={(el) => { if (el) btnTextsRef.current[0] = el; }}
                style={{ display: 'block', fontSize: '16px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: '1.5rem' }}>
                Menu
              </span>
              <span ref={(el) => { if (el) btnTextsRef.current[1] = el; }}
                style={{ display: 'block', fontSize: '16px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: '1.5rem' }}>
                Close
              </span>
            </div>
            <svg
              ref={btnIconRef}
              xmlns="http://www.w3.org/2000/svg"
              width="18" height="18"
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor" />
              <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
              <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
              <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
              <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
              <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
            </svg>
          </button>
        </div>{/* end logo+menu row */}
      </header>

      {/* Full-screen overlay */}
      <div
        ref={navWrapRef}
        style={{ display: 'none', position: 'fixed', inset: 0, zIndex: 40 }}
      >
        {/* Dim clickable overlay */}
        <div
          ref={dimRef}
          onClick={closeMenu}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }}
        />

        <nav style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {/* Staggered backdrop panels */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={(el) => { if (el) panelsRef.current[i] = el; }}
              style={{
                position: 'absolute', inset: 0,
                background: i === 1 ? '#0a0a18' : '#080812',
                zIndex: i + 1,
              }}
            />
          ))}

          {/* Nav links */}
          <div style={{
            position: 'relative', zIndex: 5,
            display: 'flex', alignItems: 'center', height: '100%',
            padding: '0 clamp(2.5rem, 9vw, 9rem)',
          }}>
            <ul style={{ listStyle: 'none' }}>
              {navLinks.map((link, i) => (
                <li
                  key={link.label}
                  style={{ lineHeight: 1, marginBottom: '0.05em' }}
                >
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, link.id)}
                    style={{ display: 'block', textDecoration: 'none' }}
                  >
                    <span
                      ref={(el) => { if (el) linksRef.current[i] = el; }}
                      style={{
                        display: 'block',
                        fontSize: 'clamp(1.8rem, 6.5vw, 7rem)',
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.05,
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#4d6cff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; }}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
