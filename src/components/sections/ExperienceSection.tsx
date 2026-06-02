'use client';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/data/experience.data';
import TimelineStop from '@/components/ui/TimelineStop';
import { useScrollAnimation, fadeUpVariants } from '@/hooks/useScrollAnimation';

export default function ExperienceSection() {
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 md:py-32 bg-bg-base">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeUpVariants}
          className="mb-16"
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4">
            EXPERIENCE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary">
            Where I&apos;ve shipped.
          </h2>
        </motion.div>

        {/* Stacked experience cards */}
        <div className="flex flex-col gap-6">
          {EXPERIENCE.map((item, index) => (
            <TimelineStop key={`${item.company}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
