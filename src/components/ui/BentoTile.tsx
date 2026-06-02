'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollAnimation, fadeUpVariants } from '@/hooks/useScrollAnimation';

interface BentoTileProps {
  label: string;
  sentence: string;
  size: 'large' | 'medium' | 'small';
  icon: string;
  stat?: string;
}

export default function BentoTile({ label, sentence, size, icon, stat }: BentoTileProps) {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'bg-bg-surface border border-bg-border rounded-xl p-6 flex flex-col justify-between gap-4',
        'hover:border-bg-border-hover transition-all duration-400 cursor-default',
        'col-span-1',
        size === 'large' && 'md:col-span-2',
      )}
    >
      {/* Top: icon + label row */}
      <div className="flex items-start justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-mono tracking-widest uppercase text-text-muted">{label}</span>
      </div>

      {/* Middle: sentence */}
      <p className="text-text-primary text-base md:text-lg leading-relaxed">{sentence}</p>

      {/* Bottom: optional stat */}
      {stat && (
        <span className="text-xs font-mono tracking-widest uppercase text-accent">{stat}</span>
      )}
    </motion.div>
  );
}
