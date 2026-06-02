'use client';
import { cn } from '@/lib/utils';
import { Award } from '@/data/awards.data';

interface AwardCardProps {
  award: Award;
}

export default function AwardCard({ award }: AwardCardProps) {
  return (
    <div
      className={cn(
        'bg-bg-surface border rounded-xl p-5 flex flex-col gap-2',
        'hover:border-bg-border-hover transition-all duration-300',
        award.highlight
          ? 'border-accent/30 shadow-[0_0_25px_rgba(245,164,32,0.07)]'
          : 'border-bg-border',
      )}
    >
      {/* Top row: issuer + year */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs text-text-muted uppercase tracking-widest truncate">
          {award.issuer}
        </span>
        {award.year && (
          <span className="font-mono text-xs text-text-muted shrink-0">{award.year}</span>
        )}
      </div>

      {/* Title */}
      <p className="text-text-primary text-sm font-medium leading-snug">{award.title}</p>

      {/* Badge */}
      {award.type === 'award' ? (
        <span className="self-start text-xs font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
          ★ Award
        </span>
      ) : (
        <span className="self-start text-xs font-mono px-2 py-0.5 rounded-full bg-bg-border text-text-muted border border-bg-border">
          ◉ Cert
        </span>
      )}
    </div>
  );
}
