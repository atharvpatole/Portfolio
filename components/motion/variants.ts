import type { Variants } from 'framer-motion';

/** One easing curve, used everywhere motion appears, so the site feels like one system. */
export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Orchestrates direct children entering one after another. No transform of its own. */
export const stagger = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
};

/** Viewport config for scroll-triggered reveals: once, and slightly before fully on screen. */
export const inViewport = { once: true, margin: '-80px' } as const;
