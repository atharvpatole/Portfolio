'use client';

import { motion } from 'framer-motion';
import { stack } from '@/content/stack';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ease, inViewport, stagger } from '@/components/motion/variants';

const swatch = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.5, ease } },
};

const row = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Stack() {
  return (
    <section className="px-6 py-section md:px-10 md:py-section-lg">
      <SectionLabel id="skills">Skills</SectionLabel>

      {/* A map legend, not a logo wall: a hairline swatch per group, mono labels, no icons. */}
      <motion.dl
        initial="hidden"
        whileInView="show"
        viewport={inViewport}
        variants={stagger(0.08)}
        className="border-b border-contour/40"
      >
        {stack.map((group) => (
          <motion.div
            key={group.label}
            variants={row}
            className="border-t border-contour/25 py-5 first:border-t-0 first:pt-0"
          >
            <dt className="flex items-center gap-3">
              <motion.span
                variants={swatch}
                className="h-px w-6 origin-left shrink-0 bg-contour"
                aria-hidden="true"
              />
              <span className="font-mono text-data uppercase tracking-[0.06em] text-contour">
                {group.label}
              </span>
            </dt>
            <dd className="mt-2 max-w-[52rem] pl-9 font-mono text-data text-ink/90">
              {group.items.join(' · ')}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
