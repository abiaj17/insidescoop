'use client';

import { motion } from 'framer-motion';
import Grainient from '@/components/Grainient';
import type { SectionId } from '@/lib/section-types';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease, delay },
});

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.0, ease, delay },
});

export default function Hero({ onNavigate }: { onNavigate?: (id: SectionId) => void }) {

  return (
    <section id="hero" className="snap-section flex flex-col">
      <Grainient
        color1="#5577FF"
        color2="#1A14F5"
        color3="#02013D"
        timeSpeed={0.12}
        warpStrength={0.7}
        warpFrequency={3.5}
        warpSpeed={1.2}
        warpAmplitude={70}
        grainAmount={0.07}
        grainScale={1.5}
        contrast={1.25}
        saturation={1.15}
        zoom={0.85}
        rotationAmount={420}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center gap-6" style={{ paddingTop: '88px' }}>
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-xs font-medium tracking-[0.28em] uppercase text-white/50"
        >
          01 / The Inside Scoop
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.45)}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-white leading-[0.92] tracking-tight max-w-4xl"
        >
          Where Gen Z hustle meets bold conversations.
        </motion.h1>

        {/* Subhead */}
        <motion.p
          {...fadeUp(0.65)}
          className="text-base sm:text-lg font-light text-white/65 max-w-sm leading-relaxed"
        >
          Interviews, case studies, and the questions other podcasts skip.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.8)} className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate?.('episodes')}
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-[#1A14F5] font-bold hover:bg-white/90 transition-all duration-200 cursor-pointer"
            style={{ padding: '16px 40px', fontSize: '15px', letterSpacing: '0.01em' }}
          >
            Listen to episodes <span>→</span>
          </button>
          <button
            onClick={() => onNavigate?.('guest')}
            className="inline-flex items-center gap-2 rounded-2xl text-white font-semibold hover:bg-white/10 transition-all duration-200 cursor-pointer"
            style={{ padding: '16px 40px', fontSize: '15px', letterSpacing: '0.01em', border: '1px solid rgba(255,255,255,0.3)' }}
          >
            Apply to be a guest
          </button>
        </motion.div>

        {/* Metadata row */}
        <motion.div
          {...fadeIn(0.9)}
          className="flex items-center gap-4 sm:gap-8 pt-4"
        >
          {[
            { label: 'ISSUE NO.', value: '01' },
            { label: 'EST.', value: '2026' },
            { label: 'BY', value: 'AARYAN POLISETTY' },
          ].map(({ label, value }, i) => (
            <div key={label} className="flex items-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-medium tracking-[0.2em] text-white/35 uppercase">{label}</span>
                <span className="text-xs font-bold tracking-[0.1em] text-white/60 uppercase">{value}</span>
              </div>
              {i < 2 && <div className="w-px h-6 bg-white/15" />}
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
