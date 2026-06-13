'use client';

import { useEffect, useRef, useState } from 'react';

const W = 360;
const H = 200;
const GROUND = 168;
const HS_KEY = 'cosmos-deploydash-hs';

type Obstacle = { x: number; w: number; h: number; bug: boolean };

/**
 * "Deploy Dash" — endless runner. You're a build pipeline; jump the bugs (red),
 * grab the green checkmarks. Pure canvas + rAF. Space/click/tap to jump.
 */
export function DeployDash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [hi, setHi] = useState(0);
  const [dead, setDead] = useState(false);

  // Mutable game state kept in a ref so the rAF loop isn't torn down each render.
  const game = useRef({
    y: GROUND,
    vy: 0,
    jumping: false,
    obstacles: [] as Obstacle[],
    checks: [] as { x: number; y: number; got: boolean }[],
    speed: 2.4,
    t: 0,
    score: 0,
    alive: true,
  });

  useEffect(() => {
    setHi(Number(localStorage.getItem(HS_KEY) || 0));
  }, []);

  const jump = () => {
    const g = game.current;
    if (!g.alive) return;
    if (!g.jumping) {
      g.vy = -7.4;
      g.jumping = true;
    }
  };

  const start = () => {
    game.current = {
      y: GROUND,
      vy: 0,
      jumping: false,
      obstacles: [],
      checks: [],
      speed: 2.4,
      t: 0,
      score: 0,
      alive: true,
    };
    setScore(0);
    setDead(false);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', onKey);

    const loop = () => {
      const g = game.current;
      g.t += 1;
      g.speed += 0.0008;

      // physics
      g.vy += 0.42;
      g.y += g.vy;
      if (g.y >= GROUND) {
        g.y = GROUND;
        g.vy = 0;
        g.jumping = false;
      }

      // spawn
      if (g.t % 90 === 0) {
        const bug = Math.random() > 0.25;
        g.obstacles.push({ x: W + 10, w: bug ? 16 : 14, h: bug ? 16 : 22, bug });
      }
      if (g.t % 140 === 60) {
        g.checks.push({ x: W + 10, y: GROUND - 40 - Math.random() * 40, got: false });
      }

      g.obstacles.forEach((o) => (o.x -= g.speed));
      g.checks.forEach((c) => (c.x -= g.speed));
      g.obstacles = g.obstacles.filter((o) => o.x > -30);
      g.checks = g.checks.filter((c) => c.x > -30 && !c.got);

      const px = 40;
      const pw = 18;
      const ph = 18;
      // collisions: a bug hits if we overlap horizontally and haven't cleared its height
      for (const o of g.obstacles) {
        const overlapX = px < o.x + o.w && px + pw > o.x;
        if (o.bug && overlapX && g.y > GROUND - o.h) {
          g.alive = false;
        }
      }
      for (const c of g.checks) {
        if (!c.got && px < c.x + 12 && px + pw > c.x && g.y - ph < c.y + 12 && g.y > c.y) {
          c.got = true;
          g.score += 10;
        }
      }
      g.score += 0.05;

      // draw
      ctx.fillStyle = '#060D1F';
      ctx.fillRect(0, 0, W, H);
      // ground
      ctx.strokeStyle = '#1e2a44';
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 18);
      ctx.lineTo(W, GROUND + 18);
      ctx.stroke();
      // scrolling dashes
      ctx.fillStyle = '#243352';
      for (let i = 0; i < W / 24 + 1; i++) {
        const x = ((i * 24 - (g.t * g.speed) % 24) + W) % W;
        ctx.fillRect(x, GROUND + 16, 10, 2);
      }
      // player (pipeline block)
      ctx.fillStyle = '#F5A420';
      ctx.fillRect(px, g.y - ph, pw, ph);
      ctx.fillStyle = '#060D1F';
      ctx.fillRect(px + 4, g.y - ph + 5, 3, 3);
      // obstacles
      for (const o of g.obstacles) {
        ctx.fillStyle = o.bug ? '#e0444f' : '#2f3e5e';
        ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
        if (o.bug) {
          ctx.fillStyle = '#fff';
          ctx.font = '10px monospace';
          ctx.fillText('✕', o.x + 3, GROUND - 4);
        }
      }
      // checks
      ctx.fillStyle = '#22c55e';
      ctx.font = '14px monospace';
      for (const c of g.checks) ctx.fillText('✓', c.x, c.y + 12);

      // hud
      ctx.fillStyle = '#9fb0cc';
      ctx.font = '11px monospace';
      ctx.fillText(`SCORE ${Math.floor(g.score)}`, 8, 16);

      setScore(Math.floor(g.score));

      if (!g.alive) {
        const finalScore = Math.floor(g.score);
        setRunning(false);
        setDead(true);
        setHi((prev) => {
          const next = Math.max(prev, finalScore);
          localStorage.setItem(HS_KEY, String(next));
          return next;
        });
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, [running]);

  return (
    <div className="select-none">
      <div
        className="relative overflow-hidden rounded-lg border-2 border-[#1e2a44] bg-[#060D1F]"
        onClick={() => (running ? jump() : start())}
        style={{ width: W, maxWidth: '100%', aspectRatio: `${W}/${H}` }}
      >
        <canvas ref={canvasRef} width={W} height={H} className="block h-full w-full" />
        {!running && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#060D1F]/85 text-center">
            <p className="font-mono text-sm text-accent">DEPLOY DASH</p>
            {dead ? (
              <>
                <p className="font-mono text-xs text-text-primary">Build failed · {score}</p>
                <p className="font-mono text-[10px] text-text-secondary">best {hi}</p>
              </>
            ) : (
              <p className="font-mono text-[10px] text-text-secondary">jump the bugs · grab the ✓</p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                start();
              }}
              className="mt-1 rounded border border-accent px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent hover:bg-accent hover:text-bg-base"
            >
              {dead ? 'Retry' : 'Start'}
            </button>
          </div>
        )}
      </div>
      <p className="mt-2 font-mono text-[10px] text-text-secondary">SPACE / tap to jump</p>
    </div>
  );
}
