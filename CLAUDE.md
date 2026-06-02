# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build to dist/
npm run watch      # Watch build (development config)
npm test           # Run Karma/Jasmine unit tests
```

Angular schematics are configured to skip test generation (`skipTests: true` in `angular.json`), so tests must be created manually when needed.

## Architecture

This is an **Angular 20 standalone-component portfolio site** styled with **Tailwind CSS** (dark mode via `darkMode: 'class'`).

### Routing

`app.routes.ts` defines four routes:
- `/` → `HomePage` (new v2 design using `src/app/components/` sections)
- `/projects` → `ProjectsListPage`; `/projects/:slug` → `ProjectDetailPage` (with optional nested `/demos/claude-docs`)
- `/resume` → `ResumePage`
- `/v1`, `/v2` (referenced in the navbar) — legacy variant pages that still exist in `src/app/pages/`

### Two parallel page compositions

There are two home page designs living side by side:
- **`src/app/pages/home.page.ts`** (active `/` route) — assembles sections from `src/app/components/` (hero-section, skills-section, projects-section, etc.)
- **`src/app/pages/v2-home.page.ts`** and **`v1-home.page.ts`** — older variant pages retained for the `/v2` and `/v1` routes

Sections used by the main home page live in two places:
- `src/app/components/` — newer section components (hero-section, skills-section, projects-section, services-section, blog-section, contact-section, testimonials-section)
- `src/app/sections/` — older section components (hero, about, skills, projects, experience, contact, awards) still used by v1/v2 pages

### Content data

Dynamic content comes from two sources:

1. **JSON files** (`src/assets/data/`) loaded via `DataService` (HTTP):
   - `projects.json`, `skills.json`, `experience.json`, `socials.json`, `awards.json`, `email.json`

2. **TypeScript data file** (`src/app/core/data/projects.data.ts`) — hardcoded `PROJECTS` array used by the `/projects` routes. The `Project` model lives in `src/app/core/models/project.model.ts`. Projects have a `slug` for routing, optional `hasEmbeddedDemo` + `demoRoute` for inline demos.

### Services

- `ThemeService` — manages dark/light mode via Angular signal + `localStorage` (key: `portfolio-theme`); applies `dark` class to `<html>`
- `DataService` — thin HTTP wrapper that reads the JSON files under `assets/data/`
- `DownloadService` — triggers resume PDF download from `assets/data/resume.pdf`
- `EmailService` — wraps `@emailjs/browser` for the contact form (config in `assets/data/email.json`)

### Naming conventions

Files follow a `<name>.<type>.ts` convention:
- Pages: `home.page.ts`, `resume.page.ts`, `project-detail.page.ts`
- Sections: `hero.section.ts`, `about.section.ts`
- Components: `navbar.component.ts`, `skill-badge.component.ts`

### Static assets

- `src/assets/icons/` — SVG tech icons referenced by skill components
- `src/assets/images/profile.jpg` — profile photo
- `src/assets/data/resume.pdf` — resume download target

### Prettier config

Configured in `package.json`: `printWidth: 100`, `singleQuote: true`, Angular HTML parser for `.html` files.
