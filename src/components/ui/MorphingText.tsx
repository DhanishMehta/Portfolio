'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const roles = ['AI-First Engineer', 'Full-Stack Developer', 'Community Builder', 'Automation Architect'];

export default function MorphingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 md:h-10 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(8px)', y: -12 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 text-lg md:text-xl text-text-secondary tracking-wide"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
