'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Three.js needs browser APIs — never SSR the canvas.
const Experience3D = dynamic(() => import('@/components/3d/Experience3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-screen items-center justify-center bg-[#060D1F] text-text-secondary font-mono text-sm">
      Booting the Cosmos Workshop…
    </div>
  ),
});

function isMobile() {
  if (typeof navigator === 'undefined') return false;
  const uaMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  // Guard against transient/headless width of 0 — only a real, positive narrow width counts.
  const narrow = window.innerWidth > 0 && window.innerWidth < 768;
  return uaMobile || narrow;
}

export default function ThreeDPage() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  if (mobile === null) return null;

  if (mobile) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-[#060D1F] px-8 text-center">
        <p className="font-mono text-accent text-sm uppercase tracking-widest">Cosmos Workshop</p>
        <h1 className="text-2xl font-semibold text-text-primary">Best experienced on desktop</h1>
        <p className="max-w-sm text-text-secondary">
          The interactive 3D workshop is heavy on graphics and built for a larger screen and a
          pointer. Visit on a desktop browser to explore it — or jump back to the standard
          portfolio.
        </p>
        <a
          href="/"
          className="font-mono text-xs uppercase tracking-widest border border-accent text-accent px-5 py-3 rounded hover:bg-accent hover:text-bg-base transition-all"
        >
          ← Back to portfolio
        </a>
      </div>
    );
  }

  return <Experience3D />;
}
