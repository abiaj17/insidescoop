# The Inside Scoop — Project Context

## What this is
Next.js 16 website for **The Inside Scoop**, a podcast by Aaryan Polisetty (high school student, Austin TX).
Gen Z founder interview show. Early stage — 6 episodes. Instagram: 38 followers.
YouTube: https://www.youtube.com/@TheInsideScoop-ByAaryanPol

---

## Stack
- Next.js 16 (App Router, Turbopack)
- Tailwind v4
- Framer Motion (section reveal animations)
- GSAP + CustomEase (navbar overlay animation)
- OGL (WebGL Grainient background — hero only)
- Urbanist font (next/font/google, weights 300–900)

## Running
```bash
cd ~/Desktop/scoopsite
npm run dev
# http://localhost:3003
```

---

## Design System

### Colors
| Token | Hex | Use |
|---|---|---|
| Brand blue | `#1A14F5` | Primary accent — eyebrow numbers, drop caps, pull quote bar, borders, rings |
| Light blue | `#4d6cff` / `#5577FF` | Gradient tints, hover tints |
| Deep navy | `#02013D` | Grainient dark end |
| Dark bg | `#080812` | Default section background |
| Dark 2 | `#0d0d1a` | Slightly lighter dark (Episodes bg) |
| Near black | `#050508` | Contact/footer bg |
| White | `#FFFFFF` | All text |
| Spotify green | `#1DB954` | Spotify link hover only |
| YouTube red | `#FF0000` | YouTube link hover only |

### Typography
- **Font**: Urbanist exclusively. No other fonts.
- **Eyebrow labels**: 11px, weight 500, tracking 0.22em, `rgba(255,255,255,0.35)`, uppercase. Format: `01 / SECTION NAME`
- **Headlines**: `clamp(2.4rem–4.5rem)`, weight 900, line-height 0.97, tracking -0.03em, white
- **Body text**: 1.0625rem (17px), weight 300, line-height 1.85, `rgba(255,255,255,0.88)`
- **Pull quotes**: italic, weight 300, `rgba(255,255,255,0.80)`, with 2px `#1A14F5` left bar
- **Section numbers** (in tables/rows): 11px, weight 500, `#1A14F5`, tracking 0.1em
- **Row titles**: 0.8125rem, weight 700, white, uppercase, tracking 0.02em
- **Row descriptions**: 0.9375rem, weight 300, `rgba(255,255,255,0.78)`, line-height 1.6

### Section Backgrounds
Each section has a distinct dark background. Put gradients directly on the `section` element's
`backgroundImage` style (NOT via a `position: absolute` child div) — otherwise the gradient cuts
off when the section scrolls internally.

| Section | Background |
|---|---|
| Hero | WebGL Grainient — blue shades `#5577FF → #1A14F5 → #02013D` |
| About | `#080812` + two radial blue glows (bottom-left strong, top-right faint) |
| Episodes | `#0d0d1a` (slightly lighter dark) |
| The Podcast | `#1A14F5` (full electric blue — inverted from hero) |
| Be a Guest | `#080812` |
| Contact | `#050508` (near black) |

Grain texture: SVG `feTurbulence` filter applied to a colored overlay div at ~0.045 opacity.
Defined as `<svg><filter id="..."><feTurbulence/><feColorMatrix/></filter></svg>` inline.

### Borders & Dividers
- Row separators: `1px solid rgba(255,255,255,0.07)`
- Outer rings (circle photo etc.): `1px solid rgba(26,20,245,0.35)`
- Button borders: `1px solid rgba(255,255,255,0.12)` default, hover changes to brand/platform color

### Animations
- **All section reveals**: use `isActive` prop + Framer Motion `animate` — NOT `whileInView`.
  Sections are always mounted (CSS visibility/opacity controls display). `whileInView` fires
  immediately on mount for all sections because they're `position: absolute; inset: 0`.
- **Pattern**: `reveal(delay, isActive)` function returns `{ initial, animate, transition }`.
  `animate` switches between `{ opacity: 1, y: 0 }` and `{ opacity: 0, y: 28 }` based on `isActive`.
- **Easing**: `[0.16, 1, 0.3, 1]` (expo out) for all reveals
- **Stagger**: 0.07–0.1s between items
- **Hero**: Framer Motion with `animate` (fires on mount — hero is always first shown, so it's fine)
- **GSAP**: navbar overlay only. `CustomEase('main', '0.65, 0.01, 0.05, 0.99')` for menu panels/links

---

## Architecture

### Navigation Model
No scroll-based navigation. Sections are tab-switched:
- `page.tsx` holds `activeSection: SectionId` state
- All 6 sections mounted simultaneously; CSS `.view-section` / `.view-section.is-active` controls
  which is visible (`opacity` + `visibility` with 0.45s transition)
- Navbar link click → `closeMenu()` → 700ms delay → `onNavigate(id)` (delay lets GSAP close finish)
- Hero CTA buttons also call `onNavigate` directly

```ts
// lib/section-types.ts
export type SectionId = 'hero' | 'about' | 'episodes' | 'podcast' | 'guest' | 'contact';
```

### Wordmark Dim Behaviour
When the About section scrolls down past 50px, the navbar logo+wordmark fades out (they overlap
the body text). It fades back when scrolling up or navigating away.

Implementation:
- About section `onScroll` dispatches `CustomEvent('wordmark-dim', { detail: { dim: boolean } })`
- Navbar listens and sets `wordmarkDimmed` state → applies `opacity` on the logo+wordmark group
- `page.tsx` `useEffect` on `active` fires reset (`dim: false`) whenever leaving About

### Navbar Props
```tsx
<Navbar onNavigate={setActive} activeSection={active} />
```
- `onNavigate`: called with SectionId to switch section
- `activeSection`: controls logo+wordmark positioning (centered on hero, left-aligned elsewhere)

---

## File Map

```
app/
  layout.tsx          — Urbanist font, metadata
  page.tsx            — 'use client', activeSection state, wordmark-dim reset effect
  globals.css         — Tailwind v4 tokens, .view-host, .view-section, .snap-section,
                        .drop-cap::first-letter, .ticker-track, .wordmark-roll

lib/
  section-types.ts    — SectionId union type

components/
  Grainient.tsx       — WebGL animated gradient (OGL). Props: color1/2/3, timeSpeed,
                        warpStrength, warpFrequency, warpSpeed, warpAmplitude,
                        grainAmount, grainScale, contrast, saturation, zoom, rotationAmount
  Navbar.tsx          — Fixed header. Ticker strip + logo/wordmark group + GSAP overlay menu.
                        Logo+wordmark: centered on hero, left-aligned on all other sections.
                        Both fade together via 'wordmark-dim' custom event.

components/sections/
  Hero.tsx            — DONE
  About.tsx           — DONE
  Episodes.tsx        — DONE
  Podcast.tsx         — NEXT UP
  BeAGuest.tsx        — PLACEHOLDER
  Contact.tsx         — PLACEHOLDER

public/
  logo.webp           — Blue circle logo, white mic + "THE INSIDE SCOOP" text
  aaryan.jpg          — Aaryan in navy suit, Austin skyline bg. Used as circle crop in About.
```

---

## Sections — Status & Spec

### 01 / Hero — DONE
- **BG**: WebGL Grainient, blue palette
- Eyebrow: `01 / The Inside Scoop`
- Headline: `Where Gen Z hustle meets bold conversations.`
- Subhead + 2 CTA buttons (navigate to episodes / guest) + metadata row
- Framer Motion cinematic fade-up reveals (fires on mount, no `isActive` needed)

### 02 / About Me — DONE
- **BG**: `#080812` + radial blue glows (bottom-left strong, top-right faint)
- Grid: `grid-cols-1 lg:grid-cols-[7fr_5fr]`
  - Left col (order-1): eyebrow, headline, pull quote, 3 body paragraphs, drop cap
  - Right col (order-2): circle photo of Aaryan, outer blue ring
  - Full-width row (order-3): Why I Started (4 numbered goal rows)
  - Full-width row (order-4): A Few Favorites (3 episode rows + YouTube link)
- Section has `overflowY: auto` (scrolls internally)
- `isActive` prop drives all animations

**Content that IS filled in:**
- Pull quote: "Every interview teaches me something a classroom hasn't."
- 3 body paragraphs (Aaryan's bio, rewritten to be conversational/non-AI)
- Goals: Learn / Build / McCombs / Pay it forward
- EP 01: "Who Am I? and Why I Started This Podcast" — Aaryan Polisetty
  → https://open.spotify.com/episode/1CA7i79aV73VZqr1ebOtjd
- EP 02: "The High School Hustle to 1M Users | Talem's Journey" — Pranav Konjeti
  → https://open.spotify.com/episode/7kaxsnSVSXwvSaKEldXKj1
- EP 03: "From Startup Dreams to Global Impact" — Mahir Laul · Founder, Velric
  → https://open.spotify.com/episode/52prNMXkGPZfcJ007EVyB9
- YouTube link: https://www.youtube.com/@TheInsideScoop-ByAaryanPol

### 03 / Episodes — DONE
- **BG**: `#0d0d1a`
- 12-episode card grid (2-col desktop, 1-col mobile). Cards: dark bg, blue border on hover.
- Each card: episode number (blue), title (bold), guest/type, Spotify listen pill.
- Solo episodes (09, 11, 12) show type label instead of guest: "Business breakdown" / "Fiction meets hustle"
- "Listen on" strip: Spotify, Apple Podcasts (link TBD), YouTube
- **TODO**: Aaryan to confirm Spotify show page URL + Apple Podcasts link

### 04 / About the Podcast — TO BUILD (NEXT)
- **BG**: `#1A14F5` solid blue — no grain overlay, no radial glows. The color is enough.
- **Layout**: single column, same horizontal padding as other sections, `overflowY: auto`
- **Color overrides for blue bg** (everything is white-on-blue, no brand blue accent):
  - Eyebrow: `rgba(255,255,255,0.55)`
  - Headline: `white`
  - Body text: `rgba(255,255,255,0.85)`
  - Row numbers: `rgba(255,255,255,0.45)`
  - Row type names: `white`, weight 700, uppercase
  - Row descriptions: `rgba(255,255,255,0.80)`
  - Dividers: `1px solid rgba(255,255,255,0.2)`

**Content structure (top to bottom):**

1. **Eyebrow**: `04 / About the Podcast`

2. **Headline** (2 lines for impact):
   ```
   Three kinds of episodes.
   One show.
   ```

3. **Lead** (1 sentence, body weight):
   `"Every episode fits into one of these. All of them are worth your time."`

4. **Three type rows** — divider-list pattern (same grid as About's Why I Started):
   `gridTemplateColumns: '2.5rem 11rem 1fr'`

   | # | Type | Description |
   |---|------|-------------|
   | 01 | FOUNDER INTERVIEWS | Conversations with people actually building things. High schoolers hitting 1M users, college kids disrupting test prep, researchers democratizing academia. No PR speak, no rehearsed answers. |
   | 02 | BUSINESS BREAKDOWNS | No guest needed. China's $17 trillion economy, Tinder vs Bumble's decade-long war, the real playbook behind billion-dollar decisions. Short, sharp, worth the 6 minutes. |
   | 03 | FICTION MEETS HUSTLE | Business lessons from stories that never happened. Harvey Specter. Characters who never existed but understand leverage, negotiation, and risk better than most real executives. |

5. **Closing line** (small, muted, bottom of section):
   `"New episodes every other week."`  — 11px eyebrow style, `rgba(255,255,255,0.4)`

**Animation**: same `reveal(delay, isActive)` pattern. Stagger rows at 0.07s apart starting at delay 0.45.
**No pill buttons, no icons, no columns** — rows only. Deliberate divergence from 3-column SaaS grid.

### 05 / Be a Guest — TO BUILD
- **BG**: `#080812`
- Eyebrow: `05 / APPLY`
- Headline: `Want to be on the show?`
- Form fields: NAME, EMAIL, WHAT YOU DO, WHY YOU'D BE A GOOD GUEST (textarea), SOCIAL LINK (optional)
- Submit → success state: "Got it. Aaryan reviews every application personally and replies within a week."
- Right sidebar: email, LinkedIn, Instagram links
- Need from Aaryan: email address (contact@theinsidescoop.com — unconfirmed), LinkedIn URL

### 06 / Contact — TO BUILD
- **BG**: `#050508`
- Left: logo + tagline
- Center: page links
- Right: social links (Spotify, YouTube, Instagram)
- Bottom: © 2026 The Inside Scoop
- Need from Aaryan: confirmed email, LinkedIn URL, Instagram handle/link

---

## Content TODOs (Aaryan must fill)
- [ ] All 6 episode data for Episodes section (title, guest, 1-line description, Spotify link)
- [ ] Contact email address (is it contact@theinsidescoop.com?)
- [ ] LinkedIn profile URL
- [ ] Instagram profile URL
- [ ] Apple Podcasts link (if available)

---

## Rules — Never Break These
1. **Urbanist only.** No other fonts ever.
2. **`isActive` prop for animations** — never `whileInView`. Sections are always mounted.
3. **Section backgrounds on the element itself** — not on absolute child divs (they cut off on scroll).
4. **No invented content** — any bio detail, episode title, guest name, or link Aaryan hasn't
   provided must be marked `// AARYAN: [description]` in the code.
5. **Copy voice**: conversational, specific, no em-dash drama, no buzzwords (revolutionize,
   leverage, seamless, empower, disruptors, amplify, catalysts for change, next-generation).
6. **Build one section at a time, describe first, wait for approval before next.**
7. **No: purple gradients, neon glows, stock photos, centered-everything layouts, 3-column
   icon+headline+paragraph grids, "How it works" 3-step sections.**

---

## Design Patterns to Reuse

### Section shell
```tsx
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
export default function SectionName({ isActive = false }: { isActive?: boolean }) {
  return (
    <section className="snap-section" style={{ backgroundColor: '#0d0d1a', backgroundImage: '...' }}>
      <motion.p {...reveal(0.05, isActive)} style={{ /* eyebrow */ }}>03 / Episodes</motion.p>
      {/* ... */}
    </section>
  );
}
```

### Eyebrow
```tsx
<motion.p {...reveal(0.05, isActive)} style={{
  fontSize: '11px', fontWeight: 500, letterSpacing: '0.22em',
  color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '1.5rem',
}}>
  03 / Episodes
</motion.p>
```

### Row divider list (used in About for goals + episodes)
```tsx
{items.map((item, i) => (
  <motion.div key={item.id} {...reveal(0.5 + i * 0.07, isActive)}
    style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '0.75rem 0' }}
  >
    {/* content */}
  </motion.div>
))}
<div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
```

### Pill button (Spotify / YouTube / platform links)
```tsx
<a href={url} target="_blank" rel="noopener noreferrer" style={{
  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
  fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
  border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '0.4rem 0.9rem',
  transition: 'color 0.2s, border-color 0.2s',
}}
  onMouseEnter={e => { e.currentTarget.style.color = '#1DB954'; e.currentTarget.style.borderColor = '#1DB954'; }}
  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
>
  Listen
</a>
```

### page.tsx: wiring a new section with isActive
```tsx
// In page.tsx:
<div className={`view-section${active === 'episodes' ? ' is-active' : ''}`}>
  <Episodes isActive={active === 'episodes'} />
</div>
```
