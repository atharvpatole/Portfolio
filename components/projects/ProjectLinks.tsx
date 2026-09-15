import type { ProjectLink } from '@/content/types';
import { AnimatedLink } from '@/components/ui/AnimatedLink';

export function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null;

  return (
    <ul className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
      {links.map((link) => (
        <li key={link.label} className="text-meta">
          {link.pending ? (
            /*
              A slot with no URL yet. It stays visible so the absence is
              deliberate rather than forgotten, but it is not a control.
            */
            <span className="text-contour">{link.label}, coming soon</span>
          ) : (
            <AnimatedLink href={link.href} external className="text-meta">
              {link.label}
            </AnimatedLink>
          )}
        </li>
      ))}
    </ul>
  );
}
