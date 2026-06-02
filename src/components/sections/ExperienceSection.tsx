'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/data/experience.data';
import TimelineStop from '@/components/ui/TimelineStop';
import { useScrollAnimation, fadeUpVariants } from '@/hooks/useScrollAnimation';

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const { ref, controls } = useScrollAnimation();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - (containerRef.current?.offsetLeft ?? 0);
    scrollLeftRef.current = containerRef.current?.scrollLeft ?? 0;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  return (
    <section id="experience" className="py-24 md:py-32 bg-bg-base overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeUpVariants}
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4">
            EXPERIENCE
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary">
            Where I&apos;ve shipped.
          </h2>
        </motion.div>
      </div>

      {/* Timeline track */}
      <div className="mt-16 relative">
        {/* Horizontal amber line */}
        <div className="absolute top-8 left-0 right-0 h-px bg-accent/20" />

        {/* Scroll container */}
        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-8 scroll-smooth snap-x snap-mandatory px-6 md:px-12 select-none"
          style={{ cursor: 'grab' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {EXPERIENCE.map((item, index) => (
            <TimelineStop key={`${item.company}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
