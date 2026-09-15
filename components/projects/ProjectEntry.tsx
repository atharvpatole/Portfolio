'use client';

import { useEffect, useId, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { Project } from '@/content/types';
import { AnimatedReadout } from '@/components/ui/AnimatedReadout';
import { fadeUp, inViewport } from '@/components/motion/variants';
import { ProjectDetail } from './ProjectDetail';
import { ProjectLinks } from './ProjectLinks';

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 8"
      width="12"
      height="8"
      aria-hidden="true"
      className={`transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ProjectEntry({ project }: { project: Project }) {
  const featured = project.featured ?? false;
  const hasDetail = project.detail.length > 0;

  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const panelId = useId();

  /*
    The featured project opens on arrival so a reader with 45 seconds does not
    have to click to reach it, but only from 768px up. On a 380px viewport that
    open panel adds about 910px, more than a whole screen, which pushes the next
    project past three screens down.

    Closed is the server-rendered state, so narrow viewports are correct with no
    hydration mismatch and nothing to undo. Wide viewports open during the first
    commit, while `data-instant` holds the transition off, so the panel is simply
    already open rather than animating itself open on load.
  */
  useEffect(() => {
    if (featured && hasDetail && window.matchMedia('(min-width: 768px)').matches) {
      setOpen(true);
    }

    // One frame later, hand the transition back for real clicks.
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, [featured, hasDetail]);

  /*
    A small 3D lean toward the cursor. Kept to 4 degrees so it reads as a tilt,
    not a distortion, even on the featured card once it is tall and expanded.
  */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relY = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(relX * 4);
    rotateX.set(relY * -4);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1200 }}
      initial="hidden"
      whileInView="show"
      viewport={inViewport}
      variants={fadeUp}
      className={
        featured
          ? 'border-2 border-contour/50 bg-ink/[0.03] p-6 md:p-10'
          : 'border border-contour/25 bg-ink/[0.03] p-6 transition-colors duration-300 hover:border-contour/60 md:p-8'
      }
    >
      <h3 className={featured ? 'text-h2 font-semibold' : 'text-h3 font-semibold'}>
        {project.name}
      </h3>

      <p
        className={
          featured ? 'mt-5 max-w-[56rem] text-lead' : 'mt-3 max-w-[48rem] text-body'
        }
      >
        {project.summary}
      </p>

      {project.tech.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="border border-contour/30 px-2.5 py-1 font-mono text-data text-contour"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      {project.data.length > 0 ? (
        <p className="mt-4 flex flex-wrap items-baseline gap-x-2 border-t border-contour/20 pt-4 font-mono text-data text-depth">
          <span aria-hidden="true" className="text-contour">
            {'// '}
          </span>
          {project.data.map((datum, index) => (
            <span key={datum.readout} className="flex items-baseline gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-contour">
                  ·
                </span>
              ) : null}
              <AnimatedReadout readout={datum.readout} />
            </span>
          ))}
        </p>
      ) : null}

      <ProjectLinks links={project.links} />

      {hasDetail ? (
        <>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen((previous) => !previous)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-6 inline-flex items-center gap-2 text-meta text-depth underline decoration-contour/50 decoration-1 underline-offset-4 hover:decoration-depth"
          >
            {project.detailLabel ?? 'Read the build'}
            <Chevron open={open} />
          </motion.button>

          {/* Collapsed content is inert, so it is neither focusable nor read aloud. */}
          <div
            id={panelId}
            className="panel"
            data-open={open}
            data-instant={!ready}
            inert={!open}
          >
            <div>
              <ProjectDetail blocks={project.detail} featured={featured} />
            </div>
          </div>
        </>
      ) : null}
    </motion.article>
  );
}
