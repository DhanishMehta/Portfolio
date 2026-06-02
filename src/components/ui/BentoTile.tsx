'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollAnimation, fadeUpVariants } from '@/hooks/useScrollAnimation';
import { useTilt } from '@/hooks/useTilt';

interface BentoTileProps {
  label: string;
  sentence: string;
  size: 'large' | 'medium' | 'small';
  icon: string;
  stat?: string;
}

export default function BentoTile({ label, sentence, size, icon, stat }: BentoTileProps) {
  const { ref: scrollRef, controls } = useScrollAnimation();
  const { ref: tiltRef, state: tilt, tiltStyle, onMouseMove, onMouseLeave } = useTilt(6);

  return (
    <motion.div
      ref={scrollRef}
      variants={fadeUpVariants}
      initial="hidden"
      animate={controls}
      className={cn(
        'col-span-1',
        size === 'large' && 'md:col-span-2',
      )}
    >
      <div
        ref={tiltRef}
        style={tiltStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          'relative bg-bg-surface border border-bg-border rounded-xl p-6 flex flex-col justify-between gap-4 h-full',
          'hover:border-bg-border-hover transition-colors duration-300 cursor-default',
        )}
      >
        {/* Glare */}
        {tilt.isHovered && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-[0.05]"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, white, transparent 60%)`,
            }}
          />
        )}
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
      </div>
    </motion.div>
  );
}
