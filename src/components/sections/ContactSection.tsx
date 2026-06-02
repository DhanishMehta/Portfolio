'use client';
import { motion } from 'framer-motion';
import { config } from '@/data/portfolio.config';
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

export default function ContactSection() {
  const { ref, controls } = useScrollAnimation();

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
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <a
            href={`mailto:${config.email}`}
            className="font-mono text-sm tracking-widest uppercase border border-accent text-accent hover:bg-accent hover:text-bg-base px-8 py-4 transition-all duration-300"
          >
            {config.email}
          </a>

          <a
            href={config.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm tracking-widest uppercase text-text-secondary hover:text-text-primary border border-bg-border hover:border-bg-border-hover px-8 py-4 transition-all duration-300"
          >
            LinkedIn ↗
          </a>

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
