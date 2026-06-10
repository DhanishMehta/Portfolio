'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/data/portfolio.config';
import MeshBackground from '@/components/ui/MeshBackground';
import MorphingText from '@/components/ui/MorphingText';
import StatCounter from '@/components/ui/StatCounter';
import { useTilt } from '@/hooks/useTilt';

const nameWords = 'Dhanish Mehta'.split(' ').map((word) => word.split(''));

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const { ref: tiltRef, state: tilt, tiltStyle, onMouseMove, onMouseLeave } = useTilt(7);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-bg-base overflow-hidden flex items-center">
      <MeshBackground />

      <div className="relative z-10 w-full max-w-content mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left: text content ── */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4"
            >
              AI-FIRST ENGINEER
            </motion.p>

            {/* Name stagger */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-text-primary mb-4 flex flex-wrap gap-x-3 md:gap-x-4 justify-center lg:justify-start">
              {nameWords.map((wordLetters, wi) => {
                const letterOffset = nameWords.slice(0, wi).reduce((acc, w) => acc + w.length, 0) + wi;
                return (
                  <span key={wi} className="inline-flex whitespace-nowrap">
                    {wordLetters.map((letter, li) => (
                      <motion.span
                        key={li}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (letterOffset + li) * 0.04, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                );
              })}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-6 flex justify-center lg:justify-start"
            >
              <MorphingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-text-secondary text-base md:text-lg max-w-lg mb-10 mx-auto lg:mx-0"
            >
              {config.tagline}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex gap-6 md:gap-10 mb-10 justify-center lg:justify-start flex-wrap"
            >
              {config.stats.map((stat) => (
                <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="bg-accent hover:bg-accent-hover text-bg-base font-mono text-sm tracking-widest uppercase px-8 py-4 transition-all text-center"
              >
                See My Work
              </a>
              <a
                href="/assets/data/resume.pdf"
                download
                className="border border-accent text-accent hover:bg-accent hover:text-bg-base font-mono text-sm tracking-widest uppercase px-8 py-4 transition-all text-center"
              >
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* ── Right: portrait photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div
              ref={tiltRef}
              style={tiltStyle}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="relative"
            >
              {/* Ambient glow behind photo */}
              <div className="absolute -inset-4 rounded-3xl bg-accent/5 blur-2xl" />

              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/profile.jpg"
                alt="Dhanish Mehta"
                className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-80 lg:h-[420px] object-cover object-top rounded-2xl border border-bg-border"
                style={{ transformStyle: 'preserve-3d' }}
              />

              {/* Glare on photo */}
              {tilt.isHovered && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-10"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, white, transparent 55%)`,
                  }}
                />
              )}

              {/* Amber corner accent */}
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent/50 rounded-br-lg" />
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{ opacity: scrolled ? 0 : 1, transition: 'opacity 0.4s ease' }}
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
