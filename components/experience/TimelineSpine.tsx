'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Horizontal positions as fractions of the gutter width, top to bottom. The line
 * wanders like a ground line on a survey section rather than running dead
 * straight, which is what keeps this from reading as a timeline rule. There are
 * no nodes and no circles: the roles are marked by the station hairlines that
 * cross this line, the way stations cross a section.
 */
const GROUND_LINE = [0.5, 0.18, 0.72, 0.3, 0.86, 0.24, 0.66, 0.38, 0.5];

/** Used for the server render, before the real height is known. */
const FALLBACK = { width: 24, height: 900 };

function buildGroundLine(width: number, height: number): string {
  const step = height / (GROUND_LINE.length - 1);

  return GROUND_LINE.map((fraction, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${command} ${(fraction * width).toFixed(1)} ${(index * step).toFixed(1)}`;
  }).join(' ');
}

export function TimelineSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(FALLBACK);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* The gutter height follows the roles, so the geometry is measured rather
       than guessed. A 1:1 viewBox keeps the stroke honest at any height. */
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setSize({ width, height });
      }
    });
    resizeObserver.observe(node);

    /* Draws once, on arrival. Disconnected immediately so it cannot repeat, and
       the roles themselves are deliberately not observed. */
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          intersectionObserver.disconnect();
        }
      },
      { rootMargin: '-10% 0px' },
    );
    intersectionObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-drawn={drawn}
      className="spine pointer-events-none absolute inset-y-0 left-0 w-6 md:w-10"
    >
      <svg
        width={size.width}
        height={size.height}
        viewBox={`0 0 ${size.width} ${size.height}`}
        className="block"
      >
        <path
          className="spine-path fill-none stroke-contour/70"
          d={buildGroundLine(size.width, size.height)}
          pathLength={1}
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
