'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/data/portfolio.config';
import MeshBackground from '@/components/ui/MeshBackground';
import MorphingText from '@/components/ui/MorphingText';
import StatCounter from '@/components/ui/StatCounter';

const nameLetters = 'Dhanish Mehta'.split('');

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-bg-base overflow-hidden flex flex-col items-center justify-center">
      {/* Layer 1: Animated mesh background */}
      <MeshBackground />

      {/* Layer 2: Main content */}
      <div className="relative z-10 max-w-content mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center">
        {/* Section label */}
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4">
          AI-FIRST ENGINEER
        </p>

        {/* Name with staggered letter reveal */}
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-text-primary mb-4 flex flex-wrap justify-center">
          {nameLetters.map((letter, i) =>
            letter === ' ' ? (
              <span key={i} className="inline-block w-4 md:w-6" aria-hidden="true" />
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ),
          )}
        </h1>

        {/* Morphing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-6"
        >
          <MorphingText />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-text-secondary text-lg md:text-xl max-w-xl mb-12"
        >
          {config.tagline}
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex gap-8 md:gap-16 mb-12"
        >
          {config.stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="bg-accent hover:bg-accent-hover text-bg-base font-mono text-sm tracking-widest uppercase px-8 py-4 transition-all"
          >
            See My Work
          </a>
          <a
            href="/assets/data/resume.pdf"
            download
            className="border border-accent text-accent hover:bg-accent hover:text-bg-base font-mono text-sm tracking-widest uppercase px-8 py-4 transition-all"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Layer 3: Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{ opacity: scrolled ? 0 : 1, transition: 'opacity 0.4s ease' }}
        aria-hidden="true"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-muted"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
