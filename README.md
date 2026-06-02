# Dhanish Mehta — Portfolio

Personal portfolio for Dhanish Mehta, Software Engineer at Chubb. Built with Next.js 14, Framer Motion, and Tailwind CSS. Features an AI chat widget powered by the Gemini API.

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Animations | Framer Motion — 3D tilt, scroll reveals, morphing text |
| Styling | Tailwind CSS v3 with custom design tokens |
| AI Chat | Gemini API (`gemini-1.5-flash`) via Next.js API route |
| Deployment | Netlify (`@netlify/plugin-nextjs`) |

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

For the AI chat widget, create `.env.local` in the project root:

```
GEMINI_API_KEY=your_key_here
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata
│   ├── page.tsx                    # Main portfolio page
│   ├── projects/[slug]/page.tsx    # Project detail (SSG)
│   ├── resume/page.tsx             # Resume viewer
│   └── api/ask/route.ts            # Gemini streaming API route
├── components/
│   ├── layout/                     # Navbar, Footer
│   ├── sections/                   # HeroSection, BentoSection,
│   │                               # ProjectsSection, ExperienceSection,
│   │                               # HumanSection, AiDnaSection, ContactSection
│   ├── ui/                         # ProjectCard, BentoTile, StatCounter,
│   │                               # MorphingText, MeshBackground, AwardCard,
│   │                               # TimelineStop
│   └── chat/                       # AskDhanish widget, ChatMessage
├── data/
│   ├── portfolio.config.ts         # Name, tagline, stats, bento tiles
│   ├── projects.data.ts            # Project list (add here to add a project)
│   ├── experience.data.ts          # Work experience
│   └── awards.data.ts              # Awards and certifications
├── hooks/
│   ├── useScrollAnimation.ts       # Scroll-triggered Framer Motion hook
│   ├── useStatCounter.ts           # Animated number counter
│   └── useTilt.ts                  # 3D perspective tilt on hover
└── lib/
    ├── gemini.ts                   # Gemini client + system prompt
    └── utils.ts                    # cn() utility
public/
├── assets/images/profile.jpg       # Hero portrait
├── assets/icons/                   # Tech SVG icons
└── assets/data/resume.pdf          # Resume download
```

## Updating Content

**Add a project** — append one object to `src/data/projects.data.ts`. It appears automatically in the grid, filter, and static routes. No other file to touch.

**Update experience / awards** — edit `src/data/experience.data.ts` or `src/data/awards.data.ts`.

**Change name, tagline, stats, or social links** — edit `src/data/portfolio.config.ts`.

**Update the AI chat knowledge** — edit the `SYSTEM_PROMPT` in `src/lib/gemini.ts`.

**Add project thumbnails** — drop screenshots into `public/assets/images/` and set `thumbnail: '/assets/images/your-file.png'` in `projects.data.ts`.

## Deployment

Deploys automatically to Netlify on push to `main`. The `netlify.toml` and `@netlify/plugin-nextjs` handle SSR and API routes as Netlify Functions.

Set `GEMINI_API_KEY` in the Netlify dashboard under Site settings → Environment variables before the first deploy.

## Design Tokens

Key Tailwind custom classes (defined in `tailwind.config.ts`):

| Class | Value | Use |
|---|---|---|
| `bg-bg-base` | `#060D1F` | Page background |
| `bg-bg-surface` | `#0C1528` | Card backgrounds |
| `text-accent` | `#F5A420` | Amber — labels, CTAs, numbers |
| `bg-warm-base` | `#1A1008` | Human section only |
| `font-serif` | Playfair Display | Headings |
| `font-mono` | JetBrains Mono | Labels, code, stats |
