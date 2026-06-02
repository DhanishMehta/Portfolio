# Dhanish Mehta — Portfolio Revamp Plan

> Full design, architecture, and implementation blueprint. Written before any code. Use this as the single source of truth when building.

---

## 1. The Concept

**"Signal"** — An AI-first engineer who ships real things and gives a damn about people.

Not a resume site. Not a brag sheet. A portrait: the engineer, the leader, the person who coordinates 600 volunteers and then goes to work and eliminates 98% of manual effort from a hiring process. Every section earns its place by telling something true about who Dhanish is.

The portfolio must:
- Be memorable within 5 seconds
- Give someone a reason to scroll
- Make a hiring manager or collaborator feel like they already know him
- Be something Dhanish is proud to share

---

## 2. Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SSG output for Netlify, React ecosystem unlocks Framer Motion + 21st.dev |
| Animations | **Framer Motion** | Physics-based, `layoutId` for card transitions, scroll-driven animations |
| Styling | **Tailwind CSS v3** | Utility-first, dark mode via `class` strategy |
| Components | **shadcn/ui + 21st.dev** | Base primitives + premium UI elements |
| AI Chat | **Gemini API** (user has keys) | "Ask Dhanish" floating chat widget |
| Design Intel | **ui-ux-pro-max skill** | Already installed at `.claude/skills/ui-ux-pro-max/` |
| Language | **TypeScript** | Typed data files for easy content updates |
| Hero FX | **CSS + Framer Motion mesh** | Animated gradient mesh, no Three.js/WebGL overhead |
| Deployment | **Netlify** | Existing pipeline, triggered on GitHub push to main |

**Why Next.js over keeping Angular:** Framer Motion, 21st.dev, and the entire premium React component ecosystem are non-negotiable for the animation quality targeted. Angular Animations cannot replicate this.

---

## 3. Design System

### 3.1 Color Palette

Inspired by the Simon Sparks reference portfolio. Deep ink navy base — NOT pure black, NOT generic AI purple gradient.

```
Base background:    #060D1F   (deep ink navy)
Surface / cards:    #0C1528   (lifted navy)
Border:             #1A2744   (subtle card borders)
Border highlight:   #243356   (hover state borders)

Text primary:       #F0F4FF   (near-white, slight blue tint)
Text secondary:     #7A8CAE   (muted navy-grey)
Text muted:         #3D5070   (very subtle, labels)

Accent (amber):     #F5A420   (warm gold — numbered labels, CTAs, highlights)
Accent hover:       #FFB83D   (lighter gold on hover)

Human section warm: #1A1008   (dark amber base — used ONLY in NSS/human section)
Human accent:       #E07820   (deeper orange for human section only)

Gemini chat:        #1A2744   (matches surface, subtle)
```

### 3.2 Typography

```
Display (name, section headers):   Playfair Display or Cormorant Garamond — bold, serif weight
Body / paragraphs:                 Inter or DM Sans — clean, readable
Labels / caps:                     Letter-spacing 0.2em, font-size 11-12px, weight 500
Monospace (AI DNA section):        JetBrains Mono or Fira Code
```

Rules:
- Name in hero: large serif, no animation gimmick on the letterforms themselves — let the size do the work
- Section labels: ALL CAPS, wide tracking, amber color, small
- Numbered labels (01, 02, 03): amber, monospace

### 3.3 Animation Principles

From the Simon Sparks reference: deliberate, weighted, unhurried but confident.

```
Default transition:   duration 0.4s, ease [0.25, 0.46, 0.45, 0.94] (custom ease-out)
Card expand:          spring { stiffness: 300, damping: 30 } via Framer Motion layoutId
Scroll entry:         y: 40 → 0, opacity: 0 → 1, duration 0.6s, staggered children
Counter animation:    0 → final value over 1.5s on scroll entry, easeOut
Hero mesh:            slow, continuous — 8-12s loop, subtle, never distracting
Page load:            staggered fade-in, 100ms between items, max 500ms total
```

**Hard rules:**
- No bounce easing anywhere except intentional micro-interactions
- No simultaneous large animations (one thing moves at a time)
- Reduced motion: `@media (prefers-reduced-motion)` — all animations disabled, instant transitions
- Mobile: same animations, just faster durations (0.3s instead of 0.4s)

### 3.4 Spacing & Grid

```
Max content width:    1200px
Section padding:      py-24 (96px) desktop, py-16 (64px) mobile
Card gap:             gap-4 (16px)
Section label gap:    mb-4 above heading
```

---

## 4. Page Architecture

Single-page with route-based detail pages for projects.

### Routes
```
/                  — Main portfolio (all sections, scroll-based)
/projects/[slug]   — Project detail page
/resume            — Resume viewer / download page
```

### Section Order (scroll sequence)
```
1. Hero
2. What I Do  (Bento stories)
3. Projects   (Card reveal grid)
4. Experience (Horizontal scroll timeline)
5. The Human  (NSS + Awards — warm amber section)
6. AI DNA     (Signature section)
7. Contact
```

Footer is minimal — name, social links, copyright.

---

## 5. Section-by-Section Blueprint

### 5.1 Hero

**Goal:** Communicate who Dhanish is in under 5 seconds. Make them lean in.

**Layout:**
- Full viewport height
- Animated mesh gradient background (CSS `@keyframes` + Framer Motion opacity layer)
- Subtle topographic/circuit grid overlay at ~4% opacity
- Nav: logo left (`DM` monogram), links right (About · Projects · Contact), dark mode toggle
- Content centered, slight left offset on desktop

**Content:**
```
LABEL:        AI-FIRST ENGINEER  [amber, spaced caps]
NAME:         Dhanish Mehta       [large serif, 72-96px, staggered letter reveal on load]
MORPHING:     Full-Stack Developer → Community Builder → Automation Architect → ...
              (word morph animation — NOT typewriter — actual cross-fade/blur morph between roles)
BIO LINE:     One sentence. "Building systems that work fast, feel human, and actually ship."
STATS ROW:    [75% faster onboarding]  [98% effort eliminated]  [600+ people led]
              (numbers animate up on load, amber accent)
CTAs:         [See My Work ↓]  [Download Resume]
```

**Scroll indicator:** Small animated arrow at bottom of viewport. Fades out on first scroll.

**Mesh animation:** Two overlapping radial gradients (deep blue + indigo tint) that drift slowly. Implemented as absolutely-positioned divs with CSS `animation: drift 12s ease-in-out infinite alternate`. No canvas, no WebGL.

---

### 5.2 What I Do (Bento Grid)

**Goal:** Replace the boring "About Me" section with a visual, scannable set of true stories.

**Layout:** Asymmetric bento grid, 3 columns on desktop, collapses to 2 on tablet, 1 on mobile.

**6 tiles — each is a sentence, not a label:**

| Tile | Content | Size |
|---|---|---|
| **The Builder** | "I cut interview scheduling manual effort by 98% — 600+ interviews, zero spreadsheet chaos." | Large (spans 2 cols) |
| **The AI Thinker** | "I live on Chubb's Core AI team. I don't just use AI tools — I build the infrastructure they run on." | Medium |
| **The Mentor** | "I've mentored 10+ engineers. Good code is nothing without someone to pass it forward to." | Small |
| **The Leader** | "Student Coordinator for 600+ NSS volunteers. Leadership isn't a title — it's showing up." | Medium |
| **The Designer** | "Graphic Design Lead. I think in systems AND aesthetics. Frontend isn't just logic." | Small |
| **The Craftsman** | "75% faster insurance product onboarding. I'm here for the boring problems nobody else wants to solve." | Large (spans 2 cols) |

**Interaction:** Each tile has a subtle hover state — border brightens, icon animates, scale: 1.02. No expand needed here, these are bite-sized.

**Tile anatomy:**
```
[Icon or number — amber]
[Sentence — white, 16-18px]
[Optional micro-stat or tag]
```

---

### 5.3 Projects

**Goal:** Show the work. Let it breathe. Give each project a presence.

**Layout:** 4-card row (mirroring Simon Sparks reference exactly).

**Default card state:**
- Deep navy card, subtle border
- Small downward triangle indicator at top center
- Tech stack logo or project icon in center (icon only, no thumbnail)
- Project name: spaced caps, white
- Numbered label: amber monospace (01, 02, 03...)
- Bottom: subtle progress-bar-style line

**Hover / active state (the wow moment):**
- Card expands upward via `layoutId` (Framer Motion)
- Project screenshot or visual fills the card
- Title moves below the card
- Siblings shrink (`scale: 0.95`) and dim (`opacity: 0.5`)
- Background behind active card gets a subtle glow halo
- Implementation: `AnimatePresence` + `motion.div` with `layoutId`

**Background:** Faint topographic contour lines pattern (SVG, ~3% opacity). Matches reference.

**Projects to show (from `projects.data.ts`):**
```
01 — Vatana          (Full-stack e-commerce)
02 — RecruitMate     (Automation — 98% effort reduction)
03 — GreenScan       (AI/ML — TensorFlow plant detection)
04 — OptiCric        (Data analytics — Python + PowerBI)
05 — KCPL Portfolio  (Client work — React)
```

Each project card links to `/projects/[slug]` for full detail.

**Below the grid:** "View all projects →" link.

---

### 5.4 Experience (Horizontal Scroll Timeline)

**Goal:** Tell the career story cinematically, not as a bulleted list.

**Layout:** Horizontal scroll container. Three "stops" on a timeline track.

**Timeline stops:**
```
STOP 1 — Chubb (Sept 2023 – Present)
  Role: Software Engineer, Core AI Team
  Impact stats (animate on entry):
    → 75% faster product onboarding
    → 80% code coverage achieved
    → 30% faster load times via NgRx + caching
    → 10+ engineers mentored
    → 98% manual hiring effort eliminated (RecruitMate)
  Highlight badge: "Q3 Platinum Award · Q1 Amazing Contributions"
  Visual: Subtle "current" glow — this stop is active

STOP 2 — KCPL (2022 – 2023)
  Role: Solutions Developer
  Key notes: Full client solutions, cloud architecture, Python automation
  
STOP 3 — NSS, KIIT (2021 – 2024)
  Role: Student Coordinator → Project Rep → Graphic Design Lead
  Scale: 600+ volunteers
  Note: "University Level Best Volunteer Award"
```

**Scroll behavior:** `overflow-x: scroll` with momentum on mobile, mouse-drag on desktop. Timeline track is a thin amber line connecting stops. Each stop fades in as it enters the viewport.

---

### 5.5 The Human

**Goal:** The section that makes Dhanish memorable, not just employable.

**Visual treatment:** This section ONLY breaks from the navy palette — background shifts to a very dark warm amber (`#1A1008`). Signals a tonal shift. "You're meeting the person now."

**Layout:** Two columns
- Left: NSS story told as a short editorial paragraph + key numbers
- Right: Award shelf

**NSS Story (left):**
```
LABEL:   COMMUNITY  [amber, spaced caps]
HEADING: I didn't just study. I showed up.
BODY:    Started as a volunteer. Got promoted to Project Representative
         managing 40 people. Then Student Coordinator for 600+. Led blood donation 
         drives, slum visits, orphanage visits. Won University Level Best Volunteer.
         This isn't a line on a resume. It changed how I lead.
```

**Award shelf (right):**
- Cards for top 5 awards/certs:
  - Chubb Q3 Platinum Excellence (2024)
  - Chubb Q1 Amazing Contributions (2025)
  - University Level Best Volunteer — NSS
  - Certified Angular Developer — Certificates.dev
  - IBM AI Series
- Each card: issuer logo placeholder, title, year
- Subtle glow on the two Chubb awards (most recent, most impressive)

---

### 5.6 AI DNA

**Goal:** The section nobody else can copy. Dhanish's actual AI-first workflow, not just "I used ChatGPT."

**Visual treatment:** Subtle terminal/code aesthetic — ONLY in this section. Monospace font for technical labels. The rest of the section stays clean.

**Layout:** Two-column asymmetric. Left: text + list. Right: visual diagram or card grid.

**Content:**
```
LABEL:   AI DNA  [amber]
HEADING: I don't just use AI. I build how teams use AI.

Left column — The Stack:
  → Claude Code (daily driver)
  → Gemini API (integrations)
  → Prompt engineering (PluralSight certified)
  → AI for Software Developers (PluralSight)
  → IBM AI Series

Right column — The Practice (3 tiles):
  TILE 1: Documentation Automation
          "Auto-generate CLAUDE.md files for any codebase. Multi-framework support."
  TILE 2: AI-First Development
          "Every PR review, every architecture decision — AI is in the loop, not an afterthought."
  TILE 3: Developer Productivity
          "Built RecruitMate to eliminate repetitive work. That's what AI is for."
```

**Animation:** Code-like reveal — lines appear one by one as if being typed (but fast, 20ms per line, not dramatic).

---

### 5.7 Ask Dhanish (Gemini Chat Widget)

**Goal:** Let visitors ask real questions and get real answers about Dhanish's experience. The ultimate interactive "about me."

**Placement:** Floating button, bottom-right corner. Persists across all sections.

**UI:**
- Collapsed: Small circular button with a "DM" monogram or chat icon, amber border glow
- Expanded: 380×520px chat panel, slides up with spring animation
- Dark navy panel matching site palette
- Gemini branding note: small "Powered by Gemini" label in footer of panel

**System prompt strategy:**
The Gemini API call includes a rich system prompt containing:
- Dhanish's full bio, experience, projects, skills, awards
- Tone instructions: conversational, warm, first-person but not sycophantic
- Guardrails: don't make up information, redirect off-topic questions gracefully
- Suggested questions shown as chips on first open: "What's your strongest skill?", "Tell me about RecruitMate", "Are you open to opportunities?"

**Implementation:**
- Next.js API route: `app/api/ask/route.ts`
- Gemini key stored as Netlify environment variable (`GEMINI_API_KEY`)
- Streaming response via `ReadableStream` for that real-time feel
- No auth, no session — stateless per conversation

---

### 5.8 Contact

**Goal:** Make it effortless to reach out. Not a form graveyard.

**Layout:** Centered, minimal. One strong CTA line, then the options.

```
HEADING:  Let's build something worth building.
SUBTEXT:  Open to conversations about interesting problems, collaborations, or just a good chat.

Links:
  → dhanish.workspace@gmail.com  [copy to clipboard on click]
  → LinkedIn
  → GitHub
```

**No contact form.** Direct links are faster and more trustworthy for a personal portfolio.

---

## 6. Content Data Architecture

All content lives in typed TypeScript files under `src/data/`. No JSON files — TypeScript gives autocomplete, type safety, and import-time validation.

```
src/data/
├── portfolio.config.ts     ← single file to update for name, bio, roles, socials
├── projects.data.ts        ← Project[] — add object to add project
├── experience.data.ts      ← ExperienceItem[] — companies, roles, stats
├── skills.data.ts          ← SkillGroup[] — grouped by category  
└── awards.data.ts          ← Award[] — certifications + recognition unified
```

### Key Types

```typescript
// portfolio.config.ts
export const config = {
  name: 'Dhanish Mehta',
  tagline: 'Building systems that work fast, feel human, and actually ship.',
  roles: ['AI-First Engineer', 'Full-Stack Developer', 'Community Builder', 'Automation Architect'],
  location: 'Hyderabad, India',
  email: 'dhanish.workspace@gmail.com',
  socials: { linkedin: '...', github: '...' },
  stats: [
    { value: 75, suffix: '%', label: 'Faster Onboarding' },
    { value: 98, suffix: '%', label: 'Effort Eliminated' },
    { value: 600, suffix: '+', label: 'People Led' },
  ]
}

// projects.data.ts
export interface Project {
  slug: string
  title: string
  number: string             // '01', '02', etc.
  shortDescription: string
  longDescription: string
  techStack: string[]
  tags: string[]
  icon: string               // path to SVG/icon for card default state
  thumbnail?: string         // screenshot for card expanded state
  repoUrl?: string
  liveUrl?: string
  impact?: string            // one-liner impact stat: "98% manual effort reduced"
}

// experience.data.ts
export interface ExperienceItem {
  company: string
  role: string
  duration: string
  isCurrent?: boolean
  stats: { value: string; label: string }[]
  description: string
  awards?: string[]
}

// awards.data.ts
export interface Award {
  title: string
  issuer: string
  year?: number
  type: 'award' | 'certification'
  highlight?: boolean        // true for the Chubb awards + Best Volunteer
}
```

**Adding a new project:** Append one `Project` object to `projects.data.ts`. It automatically appears in the grid, filter, and navigation. No other file to touch.

---

## 7. Component Structure

```
src/
├── app/
│   ├── layout.tsx                  ← Root layout, font imports, ThemeProvider
│   ├── page.tsx                    ← Main portfolio page (all sections)
│   ├── projects/[slug]/page.tsx    ← Project detail
│   ├── resume/page.tsx             ← Resume page
│   └── api/ask/route.ts            ← Gemini chat API route
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── BentoSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── HumanSection.tsx
│   │   ├── AiDnaSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/
│   │   ├── ProjectCard.tsx         ← The expand/collapse card (core interaction)
│   │   ├── BentoTile.tsx
│   │   ├── StatCounter.tsx         ← Animated number counter
│   │   ├── MorphingText.tsx        ← Role morph animation
│   │   ├── MeshBackground.tsx      ← Hero animated gradient mesh
│   │   ├── AwardCard.tsx
│   │   └── TimelineStop.tsx
│   └── chat/
│       ├── AskDhanish.tsx          ← Floating chat button + panel
│       └── ChatMessage.tsx
├── data/                           ← All content (see above)
├── hooks/
│   ├── useScrollAnimation.ts       ← Reusable scroll-triggered animation hook
│   └── useStatCounter.ts           ← Counter animation hook
└── lib/
    ├── gemini.ts                   ← Gemini API client + system prompt
    └── utils.ts                    ← cn() and other utilities
```

---

## 8. Photos

- **Hero:** One editorial shot. Clean background, good light, face clearly visible. Confident energy.
- **Human section:** One candid — ideally from NSS work, event, or team context. Makes the story feel real.
- **If only one good photo available:** Use it only in hero. Human section falls back to a design treatment.

Current asset: `src/assets/images/profile.jpg` — evaluate quality before using.

---

## 9. Deployment

**Existing pipeline (keep):** Netlify, triggered on push to `main` branch on GitHub.

**Changes needed:**
- `next.config.ts`: set `output: 'export'` for static site generation (Netlify compatible)
- `netlify.toml`: update build command to `npm run build`, publish dir to `out/`
- Netlify env var: `GEMINI_API_KEY` — must be set in Netlify dashboard before first deploy
- The `/api/ask` route requires Netlify Functions (not static) — use `@netlify/plugin-nextjs` adapter OR convert to Netlify Edge Function

**Note on Gemini API route:** Static export (`output: 'export'`) cannot serve API routes. Two options:
1. Use `@netlify/plugin-nextjs` (recommended) — keeps Next.js API routes as Netlify Functions automatically
2. Move chat to a Netlify Function manually (`netlify/functions/ask.ts`)
Option 1 is simpler.

---

## 10. Implementation Phases

### Phase 1 — Project scaffold
- Init Next.js 14 with App Router, TypeScript, Tailwind
- Install: `framer-motion`, `@google/generative-ai`, `shadcn/ui`, Netlify adapter
- Set up `tailwind.config.ts` with custom color tokens (Section 3.1)
- Set up fonts (Playfair Display + Inter via `next/font`)
- Create all `src/data/` files with typed content migrated from current Angular app
- Create `Navbar` and `Footer`
- Set up Netlify config

### Phase 2 — Core sections (no animations yet)
- `HeroSection` — layout only
- `BentoSection` — grid layout, tiles static
- `ProjectsSection` — cards static
- `ExperienceSection` — horizontal scroll layout
- `HumanSection` — two-column layout
- `AiDnaSection` — layout
- `ContactSection`

### Phase 3 — Animations
- Hero: mesh background, name stagger reveal, role morph
- Scroll entry animations (useScrollAnimation hook)
- Stat counters
- Project card expand/collapse (the main interaction)
- Experience horizontal scroll drag behavior
- AI DNA code-reveal lines

### Phase 4 — Ask Dhanish
- Netlify Function / API route
- Gemini system prompt with full bio context
- Chat UI (panel, messages, streaming)
- Floating button with open/close animation

### Phase 5 — Polish + ship
- Project detail pages
- Resume page
- Mobile testing + fixes
- Performance audit (Lighthouse ≥ 90)
- `prefers-reduced-motion` pass
- OG image for social sharing
- Final Netlify deploy

---

## 11. Open Decisions

- [ ] **Accent color confirmed?** Ember (amber `#F5A420`) — pending final sign-off
- [ ] **Hero photo** — current `profile.jpg` to be evaluated; may need a new shot
- [ ] **Candid photo** for Human section — does one exist?
- [ ] **Project thumbnails** — screenshots needed for card expanded state (5 projects)
- [ ] **Custom domain?** Currently on Netlify subdomain — worth setting up `dhanishmehta.dev` or similar
- [ ] **DM monogram** for navbar/chat button — simple CSS or SVG, to be designed

---

*Last updated: 2026-06-02. Written before implementation. Update this file as decisions change.*
