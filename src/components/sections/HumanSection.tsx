'use client';
import { motion } from 'framer-motion';
import { AWARDS } from '@/data/awards.data';
import AwardCard from '@/components/ui/AwardCard';
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollAnimation';

const featuredAwards = AWARDS.filter((a) => a.highlight);

export default function HumanSection() {
  const { ref: leftRef, controls: leftControls } = useScrollAnimation();
  const { ref: rightRef, controls: rightControls } = useScrollAnimation();

  return (
    <section id="human" className="py-24 md:py-32 bg-warm-base">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left column — NSS Story */}
          <motion.div
            ref={leftRef}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={leftControls}
          >
            <motion.p
              variants={fadeUpVariants}
              className="text-xs font-mono tracking-[0.2em] uppercase text-warm-accent mb-4"
            >
              COMMUNITY
            </motion.p>

            <motion.h2
              variants={fadeUpVariants}
              className="font-serif text-3xl md:text-4xl text-text-primary"
            >
              I didn&apos;t just study. I showed up.
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="text-text-secondary text-base leading-relaxed mt-6"
            >
              Started as a volunteer. Got promoted to Project Representative managing 40 people.
              Then Student Coordinator for 600+. Led blood donation drives, slum visits, orphanage
              visits. Won University Level Best Volunteer. This isn&apos;t a line on a resume. It
              changed how I lead.
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUpVariants}
              className="flex gap-10 mt-10"
            >
              <div className="flex flex-col">
                <span className="font-serif text-4xl text-warm-accent font-bold">600+</span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest mt-1">
                  Volunteers
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-4xl text-warm-accent font-bold">4</span>
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest mt-1">
                  Years
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — Award Shelf */}
          <motion.div
            ref={rightRef}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={rightControls}
            custom={0.2}
          >
            <motion.p
              variants={fadeUpVariants}
              className="text-xs font-mono tracking-[0.2em] uppercase text-accent mb-4"
            >
              RECOGNITION
            </motion.p>

            <motion.div
              variants={staggerContainerVariants}
              className="grid grid-cols-1 gap-3 mt-4"
            >
              {featuredAwards.map((award) => (
                <motion.div key={award.title} variants={fadeUpVariants}>
                  <AwardCard award={award} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
