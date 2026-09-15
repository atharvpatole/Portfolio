'use client';

import { motion } from 'framer-motion';
import type { Role } from '@/content/types';
import { fadeUp, inViewport } from '@/components/motion/variants';

export function RoleEntry({ role }: { role: Role }) {
  const anchor = role.anchor ?? false;

  /* The top hairline runs the full width of the entry, including the gutter, so
     it crosses the ground line like a station mark on a section. */
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={inViewport}
      variants={fadeUp}
      className={
        anchor
          ? 'border-t-2 border-contour py-10 pl-8 md:py-12 md:pl-14'
          : 'border-t border-contour/40 py-8 pl-8 md:pl-14'
      }
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-h3 font-semibold">{role.company}</h3>
        {/* Mono, because a date range is real data. */}
        <p className="font-mono text-data text-contour">{role.dates}</p>
      </div>

      <p className="mt-2 text-lead">{role.title}</p>

      {(role.location ?? role.concurrentWith) ? (
        <p className="mt-2 text-meta text-contour">
          {role.location}
          {role.location && role.concurrentWith ? ' · ' : null}
          {role.concurrentWith ? `Concurrent with ${role.concurrentWith}.` : null}
        </p>
      ) : null}

      {role.summary ? (
        <p className="mt-5 max-w-[52rem] text-lead">{role.summary}</p>
      ) : null}

      <ul className={`mt-5 ${anchor ? 'max-w-[52rem]' : 'max-w-[46rem]'}`}>
        {role.bullets.map((bullet) => (
          <li
            key={bullet}
            className="border-t border-contour/25 py-2 text-body first:border-t-0 first:pt-0"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
