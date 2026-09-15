'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, inViewport } from '@/components/motion/variants';

export function SectionLabel({ id, children }: { id: string; children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={inViewport}
      variants={fadeUp}
      className="mb-8 flex items-center gap-4"
    >
      <h2 id={id} className="shrink-0 font-mono text-data text-ink">
        <span className="text-depth">// </span>
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-contour/25" />
    </motion.div>
  );
}
