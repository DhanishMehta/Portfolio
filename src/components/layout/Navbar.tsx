'use client';

import { config } from '@/data/portfolio.config';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'AI DNA', href: '#ai-dna' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-bg-base/80 backdrop-blur-sm border-b border-bg-border">
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: DM Monogram */}
        <a href="/" className="shrink-0">
          <span className="font-mono text-accent font-bold text-lg border border-accent/30 px-2 py-1 rounded">
            DM
          </span>
        </a>

        {/* Center: Nav links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: 3D mode + Resume download */}
        <div className="flex items-center gap-3">
          <a
            href="/3d"
            className="text-xs font-mono tracking-widest uppercase border border-white/20 text-text-secondary px-4 py-2 hover:border-accent hover:text-accent transition-all"
          >
            3D
          </a>
          <a
            href="/assets/data/resume.pdf"
            download
            className="text-xs font-mono tracking-widest uppercase border border-accent text-accent px-4 py-2 hover:bg-accent hover:text-bg-base transition-all"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
