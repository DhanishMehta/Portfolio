'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/data/projects.data';
import { cn } from '@/lib/utils';
import { useTilt } from '@/hooks/useTilt';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}

export default function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  const { ref: tiltRef, state: tilt, tiltStyle, onMouseMove, onMouseLeave } = useTilt(8);

  return (
    <div
      ref={tiltRef}
      style={tiltStyle}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
    <motion.div
      layoutId={project.slug}
      onClick={onClick}
      layout
      className={cn(
        'bg-bg-surface border border-bg-border rounded-xl overflow-hidden cursor-pointer relative flex flex-col p-4',
        'transition-colors duration-[400ms]',
        'hover:border-bg-border-hover hover:shadow-[0_0_30px_rgba(245,164,32,0.12)]',
        isActive ? 'h-96' : 'h-64 md:h-80',
      )}
    >
      {/* Glare overlay */}
      {tilt.isHovered && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none z-10 opacity-[0.06]"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, white, transparent 60%)`,
          }}
        />
      )}
      {/* Top: Project number */}
      <div className="text-accent font-mono text-sm tracking-widest mb-3">
        {project.number}
      </div>

      {/* Center: Icon + Title */}
      <div className="flex flex-col items-center gap-2 flex-1 justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.icon}
          alt={`${project.title} icon`}
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="font-mono tracking-widest text-sm uppercase text-text-primary text-center">
          {project.title}
        </p>
      </div>

      {/* Bottom: Progress indicator + Tech stack */}
      <div className="mt-4">
        <div className="h-0.5 bg-accent/20 w-full" />
        <div className="flex flex-wrap gap-1 mt-3">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-border text-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Active expanded content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key={`${project.slug}-expanded`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-4"
          >
            {/* Thumbnail or dark placeholder */}
            {project.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={`${project.title} screenshot`}
                className="w-full h-24 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="w-full h-24 bg-bg-border/60 rounded-lg flex items-center justify-center mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.icon}
                  alt={`${project.title} icon`}
                  width={32}
                  height={32}
                  className="object-contain opacity-40"
                />
              </div>
            )}

            {/* Full title */}
            <p className="font-mono tracking-widest text-sm uppercase text-text-primary mb-2">
              {project.title}
            </p>

            {/* Impact stat */}
            {project.impact && (
              <p className="text-accent text-xs font-mono mb-2">{project.impact}</p>
            )}

            {/* View Project link */}
            <Link
              href={`/projects/${project.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="text-accent text-xs font-mono hover:text-accent-hover transition-colors"
            >
              View Project →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </div>
  );
}
