'use client';

import { motion } from 'framer-motion';
import type { Award } from '@/content/types';
import { ease, inViewport, stagger } from '@/components/motion/variants';

const disc = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease, delay: 0.1 } },
};

const copy = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function AwardEntry({ award }: { award: Award }) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={inViewport}
      variants={stagger(0.05)}
      className="flex gap-4 border-t border-contour/40 py-6 first:border-t-0 first:pt-0"
    >
      {/* The one other circle on the site, alongside the live-site marker. A survey disc is a disc. */}
      <motion.span
        variants={disc}
        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-contour"
        aria-hidden="true"
      />
      <motion.div variants={copy}>
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-mono text-data text-contour">{award.placement}</span>
          <h3 className="text-h3 font-semibold">{award.event}</h3>
        </div>
        <p className="mt-2 max-w-[46rem] text-body">{award.line}</p>
        {award.collaborators ? (
          <p className="mt-1 text-meta text-contour">{award.collaborators}</p>
        ) : null}
      </motion.div>
    </motion.article>
  );
}
