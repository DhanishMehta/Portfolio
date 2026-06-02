'use client';
export default function MeshBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Primary drift blob */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 animate-drift-slow"
        style={{
          background: 'radial-gradient(circle at center, #1E3A8A 0%, #312E81 40%, transparent 70%)',
          top: '-200px',
          left: '-100px',
        }}
      />
      {/* Secondary drift blob */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15 animate-drift-medium"
        style={{
          background: 'radial-gradient(circle at center, #1D4ED8 0%, #4338CA 50%, transparent 70%)',
          bottom: '-100px',
          right: '-50px',
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#7A8CAE 1px, transparent 1px), linear-gradient(90deg, #7A8CAE 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
