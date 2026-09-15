'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { profile } from '@/content/profile';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { fadeUp, stagger } from '@/components/motion/variants';

export function Header() {
  const { name, statement, headerTags, openToStatement } = profile;

  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(30);
  const springX = useSpring(spotlightX, { stiffness: 50, damping: 20 });
  const springY = useSpring(spotlightY, { stiffness: 50, damping: 20 });
  const background = useMotionTemplate`radial-gradient(720px circle at ${springX}% ${springY}%, color-mix(in srgb, var(--color-depth) 12%, transparent), transparent 70%)`;

  // A slight lean away from the cursor, the same signal as the spotlight, read as depth.
  const rotateY = useTransform(springX, [0, 100], [-3, 3]);
  const rotateX = useTransform(springY, [0, 100], [3, -3]);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    spotlightX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    spotlightY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  }

  return (
    <motion.header
      onMouseMove={handleMouseMove}
      className="grid-pattern relative overflow-hidden border-b border-contour/25 px-6 py-20 md:px-10 md:py-32"
      initial="hidden"
      animate="show"
      variants={stagger(0.12)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background }}
      />

      <motion.div
        className="relative max-w-[52rem]"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-hero-sm font-bold tracking-tight text-ink md:text-hero-md"
        >
          Hi, I&apos;m {name}.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-2 font-display text-h2 font-bold tracking-tight text-contour"
        >
          {statement.map((segment) =>
            segment.highlight ? (
              <span key={segment.text} className="text-depth">
                {segment.text}
              </span>
            ) : (
              <span key={segment.text}>{segment.text}</span>
            ),
          )}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-6 max-w-[36rem] text-body text-ink">
          {openToStatement}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-4 font-mono text-data text-contour">
          {headerTags.join(' · ')}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8">
          <MagneticButton
            href="/Atharv-Patole-Resume.pdf"
            download
            className="inline-flex items-center bg-depth px-5 py-2.5 font-mono text-meta font-semibold text-mylar transition-opacity hover:opacity-90"
          >
            Download resume
          </MagneticButton>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
