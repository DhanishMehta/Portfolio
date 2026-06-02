'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/data/portfolio.config';
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { ref, controls } = useScrollAnimation();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = config.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-bg-base">
      <motion.div
        ref={ref}
        variants={staggerContainerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-content mx-auto px-6 text-center"
      >
        <motion.p
          variants={fadeUpVariants}
          className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4"
        >
          GET IN TOUCH
        </motion.p>

        <motion.h2
          variants={fadeUpVariants}
          className="font-serif text-4xl md:text-6xl text-text-primary"
        >
          Let&apos;s build something worth building.
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          className="text-text-secondary text-lg mt-6 max-w-lg mx-auto"
        >
          Open to conversations about interesting problems, collaborations, or just a good chat.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
        >
          {/* Email copy button */}
          <div className="relative inline-flex">
            <button
              onClick={handleCopyEmail}
              className="relative font-mono text-sm tracking-widest uppercase border border-accent text-accent hover:bg-accent hover:text-bg-base px-8 py-4 transition-all duration-300"
              aria-label={`Copy email address ${config.email}`}
            >
              {copied ? 'Copied!' : config.email}
            </button>
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-mono text-accent bg-bg-surface border border-accent/30 px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                Copied!
              </span>
            )}
          </div>

          {/* LinkedIn */}
          <a
            href={config.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm tracking-widest uppercase text-text-secondary hover:text-text-primary border border-bg-border hover:border-bg-border-hover px-8 py-4 transition-all duration-300"
          >
            LinkedIn ↗
          </a>

          {/* GitHub */}
          <a
            href={config.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm tracking-widest uppercase text-text-secondary hover:text-text-primary border border-bg-border hover:border-bg-border-hover px-8 py-4 transition-all duration-300"
          >
            GitHub ↗
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
