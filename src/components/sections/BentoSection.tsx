'use client';
import { motion } from 'framer-motion';
import { config } from '@/data/portfolio.config';
import BentoTile from '@/components/ui/BentoTile';
import {
  useScrollAnimation,
  staggerContainerVariants,
  fadeUpVariants,
} from '@/hooks/useScrollAnimation';

export default function BentoSection() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="about" className="py-24 md:py-32 bg-bg-base">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4">
            WHAT I DO
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-text-primary">
            I don&apos;t just ship code.
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16"
        >
          {config.bentoTiles.map((tile) => (
            <motion.div key={tile.id} variants={fadeUpVariants}>
              <BentoTile
                label={tile.label}
                sentence={tile.sentence}
                size={tile.size}
                icon={tile.icon}
                stat={'stat' in tile ? tile.stat : undefined}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
