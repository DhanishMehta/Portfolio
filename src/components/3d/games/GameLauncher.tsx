'use client';

import { useState } from 'react';
import { DeployDash } from './DeployDash';

const GAMES = [
  { id: 'deploy-dash', name: 'Deploy Dash', desc: 'Endless runner — jump the bugs', ready: true },
  { id: 'bug-hunt', name: 'Bug Hunt', desc: 'Whack-a-mole on a code grid', ready: false },
  { id: 'stack-attack', name: 'Stack Attack', desc: 'Tech-logo Tetris', ready: false },
  { id: 'interview-scheduler', name: 'Interview Scheduler', desc: 'Calendar puzzle (RecruitMate)', ready: false },
];

export function GameLauncher() {
  const [active, setActive] = useState<string | null>(null);

  if (active === 'deploy-dash') {
    return (
      <div className="space-y-3">
        <button
          onClick={() => setActive(null)}
          className="font-mono text-[11px] uppercase tracking-widest text-text-secondary hover:text-accent"
        >
          ← Game select
        </button>
        <DeployDash />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-text-primary">Arcade</h2>
      <p className="text-sm text-text-secondary">Six games themed on my actual work. First one's live.</p>
      <div className="space-y-2">
        {GAMES.map((g) => (
          <button
            key={g.id}
            disabled={!g.ready}
            onClick={() => g.ready && setActive(g.id)}
            className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
              g.ready
                ? 'border-accent/30 bg-accent/[0.04] hover:border-accent/60'
                : 'cursor-not-allowed border-bg-border opacity-50'
            }`}
          >
            <span className="text-accent">{g.ready ? '▶' : '◷'}</span>
            <span>
              <span className="block text-sm font-semibold text-text-primary">{g.name}</span>
              <span className="block text-[11px] text-text-secondary">{g.desc}</span>
            </span>
            {!g.ready && (
              <span className="ml-auto font-mono text-[9px] uppercase text-text-secondary">soon</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
