'use client';
import { useStatCounter } from '@/hooks/useStatCounter';

interface Props {
  value: number;
  suffix: string;
  label: string;
}

export default function StatCounter({ value, suffix, label }: Props) {
  const { ref, count } = useStatCounter(value);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-baseline gap-0.5">
        <span ref={ref} className="text-3xl md:text-4xl font-bold text-text-primary font-mono">
          {count}
        </span>
        <span className="text-2xl font-bold text-accent font-mono">{suffix}</span>
      </div>
      <span className="text-xs tracking-widest uppercase text-text-secondary">{label}</span>
    </div>
  );
}
