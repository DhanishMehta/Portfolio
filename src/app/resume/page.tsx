import Link from 'next/link';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary py-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors font-mono text-sm mb-10"
        >
          ← Back to Home
        </Link>

        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-5xl md:text-6xl text-text-primary">Resume</h1>

          {/* Download button */}
          <a
            href="/assets/data/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg-base font-mono text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-[0_0_20px_rgba(245,164,32,0.2)]"
          >
            Download PDF ↓
          </a>
        </div>

        {/* PDF iframe */}
        <iframe
          src="/assets/data/resume.pdf"
          className="w-full h-[80vh] border border-bg-border rounded-xl mt-8"
          title="Dhanish Mehta Resume"
        />
      </div>
    </div>
  );
}
