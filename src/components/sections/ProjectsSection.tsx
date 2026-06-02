'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data/projects.data';
import ProjectCard from '@/components/ui/ProjectCard';
import { useScrollAnimation, staggerContainerVariants, fadeUpVariants } from '@/hooks/useScrollAnimation';

// Topographic diagonal line SVG pattern (data URI)
const topoPatternSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
  <path d='M0 40 Q50 20 100 40 Q150 60 200 40' fill='none' stroke='%23F5A420' stroke-width='0.8'/>
  <path d='M0 80 Q50 60 100 80 Q150 100 200 80' fill='none' stroke='%23F5A420' stroke-width='0.8'/>
  <path d='M0 120 Q50 100 100 120 Q150 140 200 120' fill='none' stroke='%23F5A420' stroke-width='0.8'/>
  <path d='M0 160 Q50 140 100 160 Q150 180 200 160' fill='none' stroke='%23F5A420' stroke-width='0.8'/>
  <path d='M0 200 Q50 180 100 200 Q150 220 200 200' fill='none' stroke='%23F5A420' stroke-width='0.8'/>
</svg>`;

const topoPatternUri = `url("data:image/svg+xml,${topoPatternSvg.replace(/\n/g, '').replace(/\s+/g, ' ')}")`;

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { ref, controls } = useScrollAnimation();

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Topographic background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: topoPatternUri,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 max-w-content mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeUpVariants}
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4">
            SELECTED WORK
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary">
            Things I&apos;ve built.
          </h2>
        </motion.div>

        {/* Projects grid with stagger */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            {PROJECTS.map((project) => (
              <motion.div
                key={project.slug}
                variants={fadeUpVariants}
                className={
                  activeProject !== null && activeProject !== project.slug
                    ? 'opacity-50 scale-95 transition-all duration-400'
                    : 'transition-all duration-400'
                }
              >
                <ProjectCard
                  project={project}
                  isActive={activeProject === project.slug}
                  onClick={() =>
                    setActiveProject((prev) => (prev === project.slug ? null : project.slug))
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all link */}
        <div className="mt-12 text-center">
          <a
            href="/projects"
            className="text-accent hover:text-accent-hover font-mono text-sm tracking-widest transition-colors"
          >
            View all projects →
          </a>
        </div>
      </div>
    </section>
  );
}
