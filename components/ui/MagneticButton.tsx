'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useRef } from 'react';

type MagneticButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
> & {
  children: ReactNode;
  /** How far the button can travel toward the cursor, in pixels. */
  strength?: number;
};

/**
 * A button that leans toward the cursor within its own bounds, then springs
 * back on leave. The pull is capped by `strength` so it never chases the
 * pointer off its own hitbox. Disabled under prefers-reduced-motion via the
 * spring's own stiffness staying put at 0 displacement (no listener needed:
 * MotionConfig reducedMotion="user" makes the spring settle instantly).
 */
export function MagneticButton({
  children,
  strength = 14,
  className = '',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const relX = event.clientX - (bounds.left + bounds.width / 2);
    const relY = event.clientY - (bounds.top + bounds.height / 2);
    x.set((relX / (bounds.width / 2)) * strength);
    y.set((relY / (bounds.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      {...props}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
