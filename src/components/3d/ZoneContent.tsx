'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { config } from '@/data/portfolio.config';
import { PROJECTS } from '@/data/projects.data';
import { EXPERIENCE } from '@/data/experience.data';
import { AWARDS } from '@/data/awards.data';
import { ZONE_LABELS, type ZoneKey } from './constants3d';

interface Props {
  zone: ZoneKey;
}

/**
 * Right-docked HUD panel that slides in with the content for the active zone.
 * Uses the real portfolio data (no duplication) and the site's design tokens.
 * On-monitor <Html> embedding is a later visual enhancement; this keeps it legible.
 */
export function ZoneContent({ zone }: Props) {
  // Arcade is playable directly on the cabinet screen (see Screens3D), so the right
  // panel is suppressed there — only a small, non-blocking hint is shown bottom-left.
  return (
    <AnimatePresence mode="wait">
      {zone === 'arcade' ? (
        <motion.div
          key="arcade-hint"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="pointer-events-none absolute bottom-24 left-5 z-10 w-[min(300px,80vw)] rounded-2xl border border-white/10 bg-bg-base/70 p-4 backdrop-blur-xl shadow-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Arcade</p>
          <p className="mt-2 text-sm text-text-secondary">
            <span className="text-accent">Deploy Dash</span> is live on the cabinet — click it,
            then press space (or tap) to jump the bugs.
          </p>
        </motion.div>
      ) : (
        zone !== 'hub' && (
          <motion.aside
            key={zone}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="pointer-events-auto absolute right-5 top-20 bottom-24 z-10 w-[min(420px,90vw)] overflow-y-auto rounded-2xl border border-white/10 bg-bg-base/80 p-6 backdrop-blur-xl shadow-2xl"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              {ZONE_LABELS[zone]}
            </p>
            <div className="mt-4">{renderZone(zone)}</div>
          </motion.aside>
        )
      )}
    </AnimatePresence>
  );
}

function renderZone(zone: ZoneKey) {
  switch (zone) {
    case 'projects':
      return <ProjectsPanel />;
    case 'experience':
      return <ExperiencePanel />;
    case 'skills':
      return <SkillsPanel />;
    case 'awards':
      return <AwardsPanel />;
    case 'arcade':
      return <ArcadePanel />;
    case 'about':
      return <AboutPanel />;
    case 'chill':
      return <ChillPanel />;
    default:
      return null;
  }
}

function ProjectsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">Selected Work</h2>
      {PROJECTS.map((p) => (
        <div key={p.slug} className="rounded-lg border border-bg-border bg-white/[0.02] p-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold text-text-primary">{p.title}</h3>
            <span className="font-mono text-xs text-text-secondary">{p.number}</span>
          </div>
          <p className="mt-1 text-sm text-text-secondary">{p.shortDescription}</p>
          {p.impact && (
            <p className="mt-2 font-mono text-xs text-accent">↳ {p.impact}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.techStack.map((t) => (
              <span key={t} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-text-secondary">
                {t}
              </span>
            ))}
          </div>
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block font-mono text-xs text-accent hover:underline"
            >
              View live →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold text-text-primary">Experience</h2>
      {EXPERIENCE.map((e) => (
        <div key={e.company} className="relative border-l border-bg-border pl-4">
          <span
            className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
              e.isCurrent ? 'bg-accent shadow-[0_0_8px] shadow-accent' : 'bg-text-secondary'
            }`}
          />
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-semibold text-text-primary">{e.company}</h3>
            <span className="font-mono text-[10px] text-text-secondary whitespace-nowrap">{e.duration}</span>
          </div>
          <p className="text-sm text-accent/90">{e.role}</p>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary">{e.description}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {e.stats.map((s) => (
              <div key={s.label}>
                <span className="font-mono text-sm text-text-primary">{s.value}</span>{' '}
                <span className="text-[10px] text-text-secondary">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">AI DNA</h2>
      <p className="text-sm text-text-secondary">{config.tagline}</p>
      <div className="flex flex-wrap gap-2">
        {config.roles.map((r) => (
          <span key={r} className="rounded-full border border-accent/30 px-3 py-1 font-mono text-[11px] text-accent">
            {r}
          </span>
        ))}
      </div>
      <div className="grid gap-2">
        {config.bentoTiles.map((t) => (
          <div key={t.id} className="rounded-lg border border-bg-border bg-white/[0.02] p-3">
            <div className="flex items-center gap-2">
              <span className="text-accent">{t.icon}</span>
              <span className="font-semibold text-sm text-text-primary">{t.label}</span>
              {'stat' in t && t.stat && (
                <span className="ml-auto font-mono text-[10px] text-accent">{t.stat}</span>
              )}
            </div>
            <p className="mt-1 text-xs text-text-secondary">{t.sentence}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AwardsPanel() {
  const awards = AWARDS.filter((a) => a.type === 'award');
  const certs = AWARDS.filter((a) => a.type === 'certification');
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-text-primary">Awards</h2>
        <div className="mt-3 space-y-2">
          {awards.map((a) => (
            <div key={a.title} className="rounded-lg border border-accent/20 bg-accent/[0.04] p-3">
              <p className="font-semibold text-sm text-text-primary">🏆 {a.title}</p>
              <p className="font-mono text-[10px] text-text-secondary">
                {a.issuer}{a.year ? ` · ${a.year}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">Certifications</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {certs.map((c) => (
            <span
              key={c.title}
              className={`rounded px-2 py-1 text-[11px] ${
                c.highlight ? 'bg-accent/10 text-accent' : 'bg-white/5 text-text-secondary'
              }`}
            >
              {c.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">About Me</h2>
      <p className="text-sm text-text-secondary">
        I'm {config.name} — an {config.roles[0]} based in {config.location}. {config.tagline}
      </p>
      <p className="text-sm text-text-secondary">
        I live on Chubb's Core AI team building the infrastructure that AI tools run on, ship
        full-stack products end-to-end, and mentor engineers along the way. Outside the editor:
        card magic, lo-fi, and the occasional Rubik's solve.
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        {config.roles.map((r) => (
          <span
            key={r}
            className="rounded-full border border-accent/30 px-3 py-1 font-mono text-[11px] text-accent"
          >
            {r}
          </span>
        ))}
      </div>
      <a
        href={`mailto:${config.email}`}
        className="inline-block font-mono text-xs text-accent hover:underline"
      >
        Say hi → {config.email}
      </a>
    </div>
  );
}

function ArcadePanel() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-text-primary">Arcade</h2>
      <p className="text-sm text-text-secondary">
        Six mini-games themed on my actual work — the first one,{' '}
        <span className="text-accent">Deploy Dash</span>, is live and playable right on the
        cabinet screen. Click it, then press space (or tap) to jump the bugs.
      </p>
      <ul className="space-y-1.5 font-mono text-[11px] text-text-secondary">
        <li>▶ Deploy Dash — endless runner</li>
        <li>◷ Bug Hunt — whack-a-mole (soon)</li>
        <li>◷ Stack Attack — tech-logo Tetris (soon)</li>
        <li>◷ Interview Scheduler — calendar puzzle (soon)</li>
      </ul>
    </div>
  );
}

function ChillPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">Chill Corner</h2>
      <p className="text-sm text-text-secondary">
        Beanbag, arcade, fanned cards. Off the clock I'm into card magic, lo-fi, and the
        occasional Rubik's solve. Let's talk.
      </p>
      <div className="space-y-2">
        <a
          href={config.socials.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg border border-bg-border bg-white/[0.02] p-3 hover:border-accent/40 transition-colors"
        >
          <span className="text-accent">⌥</span>
          <span className="text-sm text-text-primary">GitHub</span>
          <span className="ml-auto font-mono text-[10px] text-text-secondary">@dhanishmehta</span>
        </a>
        <a
          href={config.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg border border-bg-border bg-white/[0.02] p-3 hover:border-accent/40 transition-colors"
        >
          <span className="text-accent">in</span>
          <span className="text-sm text-text-primary">LinkedIn</span>
        </a>
        <a
          href={`mailto:${config.email}`}
          className="flex items-center gap-3 rounded-lg border border-bg-border bg-white/[0.02] p-3 hover:border-accent/40 transition-colors"
        >
          <span className="text-accent">✉</span>
          <span className="text-sm text-text-primary">{config.email}</span>
        </a>
      </div>
      <p className="font-mono text-[11px] text-text-secondary">📍 {config.location}</p>
    </div>
  );
}
