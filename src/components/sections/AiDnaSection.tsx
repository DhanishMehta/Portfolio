'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

const STACK_LINES = [
  '→ Claude Code (daily driver)',
  '→ Claude 101 + Claude Code in Action (certified)',
  '→ Gemini API (integrations)',
  '→ Prompt Engineering (PluralSight certified)',
  '→ AI for Software Developers (PluralSight)',
  '→ IBM AI Series',
];

const PRACTICE_TILES = [
  {
    label: 'DOCUMENTATION AUTOMATION',
    text: 'Auto-generate CLAUDE.md files for any codebase. Multi-framework support.',
  },
  {
    label: 'AI-FIRST DEVELOPMENT',
    text: 'Every PR review, every architecture decision — AI is in the loop, not an afterthought.',
  },
  {
    label: 'DEVELOPER PRODUCTIVITY',
    text: 'Built RecruitMate to eliminate repetitive work. That\'s what AI is for.',
  },
];

function CodeRevealStack({ inView }: { inView: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setVisibleCount(0);
    STACK_LINES.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, i + 1));
      }, i * 60);
    });
  }, [inView]);

  return (
    <ul className="mt-8 flex flex-col gap-3">
      {STACK_LINES.map((line, i) => {
        const arrowEnd = line.indexOf(' ');
        const arrow = line.slice(0, arrowEnd);
        const rest = line.slice(arrowEnd);
        return (
          <li
            key={line}
            className="font-mono text-sm text-text-secondary transition-opacity duration-300"
            style={{ opacity: i < visibleCount ? 1 : 0 }}
          >
            <span className="text-accent">{arrow}</span>
            {rest}
          </li>
        );
      })}
    </ul>
  );
}

export default function AiDnaSection() {
  const { ref: sectionRef, controls } = useScrollAnimation();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section id="ai-dna" className="py-24 md:py-32 bg-bg-base">
      <div className="max-w-content mx-auto px-6">
        <motion.div
          ref={sectionRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-[1fr,1fr] gap-16"
        >
          {/* Left column — The Stack */}
          <motion.div variants={fadeUpVariants}>
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4">AI DNA</p>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary">
              I don&apos;t just use AI. I build how teams use AI.
            </h2>
            <CodeRevealStack inView={inView} />
          </motion.div>

          {/* Right column — The Practice */}
          <motion.div variants={fadeUpVariants} className="flex flex-col gap-4">
            {PRACTICE_TILES.map((tile) => (
              <div
                key={tile.label}
                className="bg-bg-surface border border-bg-border border-t-2 border-t-accent/40 rounded-xl p-6"
              >
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">
                  {tile.label}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">{tile.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
