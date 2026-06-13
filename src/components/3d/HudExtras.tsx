'use client';

import { useEffect, useState } from 'react';

const MODEL_CREDITS = [
  'Desk, Bookcase, Office Chair, Robot, Houseplant — Quaternius (CC0)',
  'Dual Monitors — involuntary tsetse (CC-BY 3.0)',
  'Arcade Machine — J-Toastie (CC-BY 3.0)',
  'Coffee Cup, Planets, Rubik’s Cube — Poly by Google (CC-BY 3.0)',
  'Asteroids — Jarlan Perez · Book Stack — Danni Bittman (CC-BY 3.0)',
  'Space HDRI — Poly Haven (CC0)',
];

/** Live IST clock + a collapsible model-attribution credits panel (CC-BY requirement). */
export function HudExtras() {
  const [time, setTime] = useState('');
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute right-5 top-5 z-10 flex flex-col items-end gap-2">
      <div className="rounded-md border border-white/10 bg-bg-base/60 px-3 py-1.5 font-mono text-xs text-accent backdrop-blur-sm">
        {time} <span className="text-text-secondary">IST</span>
      </div>
      <button
        onClick={() => setShowCredits((s) => !s)}
        className="pointer-events-auto rounded-md border border-white/10 bg-bg-base/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-text-secondary backdrop-blur-sm hover:text-accent"
      >
        Credits
      </button>
      {showCredits && (
        <div className="pointer-events-auto max-w-xs rounded-lg border border-white/10 bg-bg-base/85 p-3 text-[10px] leading-relaxed text-text-secondary backdrop-blur-xl">
          <p className="mb-1 font-mono uppercase tracking-widest text-accent">Model Credits</p>
          {MODEL_CREDITS.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </div>
      )}
    </div>
  );
}
