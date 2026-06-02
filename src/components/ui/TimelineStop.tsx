'use client';
import { motion } from 'framer-motion';
import { ExperienceItem } from '@/data/experience.data';
import { useScrollAnimation, fadeUpVariants } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface TimelineStopProps {
  item: ExperienceItem;
  index: number;
}

export default function TimelineStop({ item, index }: TimelineStopProps) {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUpVariants}
      className={cn(
        'snap-start min-w-[320px] md:min-w-[420px] bg-bg-surface border rounded-xl p-8 flex-shrink-0',
        item.isCurrent
          ? 'border-accent/40 shadow-[0_0_40px_rgba(245,164,32,0.08)]'
          : 'border-bg-border',
      )}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Current badge */}
      {item.isCurrent && (
        <div className="mb-4">
          <span className="text-xs font-mono tracking-widest text-accent border border-accent/40 px-3 py-1 rounded-full uppercase">
            CURRENT
          </span>
        </div>
      )}

      {/* Top row: Company + Duration */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-serif text-2xl text-text-primary">{item.company}</h3>
        <span className="text-text-muted text-sm font-mono whitespace-nowrap mt-1">
          {item.duration}
        </span>
      </div>

      {/* Role */}
      <p className="text-text-secondary text-base mb-6">{item.role}</p>

      {/* Stats grid */}
      {item.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-3 my-6">
          {item.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-1 bg-bg-base/50 rounded-lg p-3"
            >
              <span className="text-accent font-mono font-bold text-lg">{stat.value}</span>
              <span className="text-text-muted text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
        {item.description}
      </p>

      {/* Awards */}
      {item.awards && item.awards.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {item.awards.map((award) => (
            <span
              key={award}
              className="text-xs font-mono px-3 py-1 border border-accent/30 text-accent rounded-full"
            >
              {award}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
