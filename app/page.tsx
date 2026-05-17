'use client';

import { useState, useEffect } from 'react';
import type { SectionId } from '@/lib/section-types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Episodes from '@/components/sections/Episodes';
import Podcast from '@/components/sections/Podcast';
import BeAGuest from '@/components/sections/BeAGuest';

export default function Home() {
  const [active, setActive] = useState<SectionId>('hero');

  useEffect(() => {
    if (active === 'hero') {
      window.dispatchEvent(new CustomEvent('wordmark-dim', { detail: { dim: false } }));
    }
  }, [active]);

  return (
    <>
      <Navbar onNavigate={setActive} activeSection={active} />
      <div className="view-host">
        <div className={`view-section${active === 'hero'     ? ' is-active' : ''}`}><Hero onNavigate={setActive} /></div>
        <div className={`view-section${active === 'about'    ? ' is-active' : ''}`}><About isActive={active === 'about'} /></div>
        <div className={`view-section${active === 'episodes' ? ' is-active' : ''}`}><Episodes isActive={active === 'episodes'} /></div>
        <div className={`view-section${active === 'podcast'  ? ' is-active' : ''}`}><Podcast isActive={active === 'podcast'} /></div>
        <div className={`view-section${active === 'guest'    ? ' is-active' : ''}`}><BeAGuest isActive={active === 'guest'} /></div>
      </div>
    </>
  );
}
