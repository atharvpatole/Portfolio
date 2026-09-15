'use client';

import { motion } from 'framer-motion';
import { profile } from '@/content/profile';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { fadeUp, inViewport } from '@/components/motion/variants';

export function About() {
  return (
    <section
      aria-labelledby="about"
      className="border-b border-contour/40 px-6 py-section md:px-10 md:py-section-lg"
    >
      <SectionLabel id="about">About</SectionLabel>
      <div className="max-w-[52rem]">
        {profile.bio.map((paragraph) => (
          <motion.p
            key={paragraph}
            initial="hidden"
            whileInView="show"
            viewport={inViewport}
            variants={fadeUp}
            className="mt-4 text-lead first:mt-0"
          >
            {paragraph.split('\n').map((line, index, lines) => (
              <span key={line}>
                {line}
                {index < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
