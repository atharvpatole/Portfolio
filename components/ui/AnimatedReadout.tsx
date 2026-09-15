'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/** Splits "~219,000 buildings" into a leading tilde, the count, and the trailing label. */
function parseReadout(readout: string) {
  const match = readout.match(/^(~?)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, tilde, digits, rest] = match;
  return { tilde, target: Number(digits.replace(/,/g, '')), rest };
}

/**
 * A mono readout that counts up to its value once, when it scrolls into view.
 * Non-numeric readouts (e.g. "public REST API") render as plain text.
 */
export function AnimatedReadout({ readout }: { readout: string }) {
  const parsed = parseReadout(readout);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!parsed || !inView) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(parsed.target);
      return;
    }

    const controls = animate(0, parsed.target, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, parsed?.target]);

  if (!parsed) return <span>{readout}</span>;

  return (
    <span ref={ref}>
      {parsed.tilde}
      {value.toLocaleString('en-US')}
      {parsed.rest}
    </span>
  );
}
