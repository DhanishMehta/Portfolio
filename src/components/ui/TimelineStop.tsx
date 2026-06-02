'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ExperienceItem } from '@/data/experience.data';
import { useScrollAnimation, fadeUpVariants } from '@/hooks/useScrollAnimation';

interface TimelineStopProps {
  item: ExperienceItem;
  index: number;
}

export default function TimelineStop({ item, index }: TimelineStopProps) {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={controls}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'relative rounded-2xl p-6 md:p-8 border bg-bg-surface',
        item.isCurrent
          ? 'border-accent/30 shadow-[0_0_60px_rgba(245,164,32,0.06)]'
          : 'border-bg-border',
      )}
    >
      {/* Amber left accent bar for current role */}
      {item.isCurrent && (
        <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-accent rounded-full" />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6 pl-3">
        <div>
          {item.isCurrent && (
            <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-accent border border-accent/40 px-2 py-0.5 rounded-full mb-2">
              CURRENT
            </span>
          )}
          <h3 className="font-serif text-2xl md:text-3xl text-text-primary">{item.company}</h3>
          <p className="text-text-secondary mt-0.5">{item.role}</p>
        </div>
        <span className="font-mono text-sm text-text-muted whitespace-nowrap sm:text-right">
          {item.duration}
        </span>
      </div>

      {/* Stats row — wraps naturally on mobile */}
      {item.stats.length > 0 && (
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6 pl-3">
          {item.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-xl md:text-2xl font-bold font-mono text-accent leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] font-mono tracking-wider uppercase text-text-muted mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-bg-border mb-6" />

      {/* Description */}
      <p className="text-text-secondary text-sm md:text-base leading-relaxed pl-3">
        {item.description}
      </p>

      {/* Awards */}
      {item.awards && item.awards.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6 pl-3">
          {item.awards.map((award) => (
            <span
              key={award}
              className="text-[11px] font-mono px-3 py-1 border border-accent/30 text-accent rounded-full"
            >
              {award}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
