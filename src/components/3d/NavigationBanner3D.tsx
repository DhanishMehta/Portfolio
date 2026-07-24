'use client';

import { ZONE_LABELS, type ZoneKey } from './constants3d';

const ZONE_ORDER: ZoneKey[] = ['projects', 'experience', 'skills', 'awards', 'arcade', 'chill'];

interface Props {
  active: ZoneKey;
  onNavigate: (zone: ZoneKey) => void;
}

export function NavigationBanner3D({ active, onNavigate }: Props) {
  return (
    <>
      {/* Top-left: exit + back-to-hub */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5">
        <a
          href="/"
          className="pointer-events-auto font-mono text-xs uppercase tracking-widest border border-accent/60 text-accent px-3 py-2 rounded hover:bg-accent hover:text-bg-base transition-all bg-bg-base/60 backdrop-blur-sm"
        >
          ← Exit 3D
        </a>
        {active !== 'hub' && (
          <button
            onClick={() => onNavigate('hub')}
            className="pointer-events-auto font-mono text-xs uppercase tracking-widest border border-white/30 text-white/80 px-3 py-2 rounded hover:border-white/70 transition-all bg-bg-base/60 backdrop-blur-sm"
          >
            Overview
          </button>
        )}
      </div>

      {/* Bottom: zone selector */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-5">
        <div className="pointer-events-auto flex flex-wrap justify-center gap-2 rounded-full border border-white/10 bg-bg-base/70 px-3 py-2 backdrop-blur-md">
          {ZONE_ORDER.map((zone) => (
            <button
              key={zone}
              onClick={() => onNavigate(zone)}
              className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full transition-all ${
                active === zone
                  ? 'bg-accent text-bg-base'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {ZONE_LABELS[zone]}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
