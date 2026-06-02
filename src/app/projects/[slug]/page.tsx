import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects.data';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  return {
    title: project ? `${project.title} — Dhanish Mehta` : 'Project Not Found',
  };
}

export default function ProjectDetailPage({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Back link */}
      <div className="px-6 pt-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-mono text-sm"
        >
          ← Back
        </Link>
      </div>

      {/* Project header */}
      <section className="bg-bg-surface border-b border-bg-border py-16">
        <div className="max-w-5xl mx-auto px-6">
          {/* Number badge */}
          <span className="font-mono text-accent text-sm tracking-widest">
            {project.number}
          </span>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-6xl text-text-primary mt-3 mb-4">
            {project.title}
          </h1>

          {/* Short description */}
          <p className="text-text-secondary text-xl mb-8 max-w-2xl">
            {project.shortDescription}
          </p>

          {/* Tech stack pills */}
          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-accent/10 text-accent border border-accent/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Impact stat */}
          {project.impact && (
            <div className="mb-8">
              <span className="font-mono text-accent text-2xl md:text-3xl font-bold">
                {project.impact}
              </span>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-base font-mono text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Live Demo ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-bg-base border border-bg-border text-text-primary font-mono text-sm rounded-lg hover:border-accent hover:text-accent transition-colors"
              >
                Repository ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="py-16 max-w-3xl mx-auto px-6">
        {/* Long description */}
        <p className="text-text-secondary text-lg leading-relaxed mb-10">
          {project.longDescription}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded text-xs font-mono uppercase tracking-widest text-text-muted border border-bg-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
