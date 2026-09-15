import type { AnchorHTMLAttributes, ReactNode } from 'react';

type AnimatedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean;
  children: ReactNode;
};

/**
 * The idle underline is a real text-decoration in `contour`, so the link reads
 * as a link with no JS and no hover. On hover it hands off to a `depth` bar
 * that draws in from the left, which is the one hover flourish used sitewide.
 */
export function AnimatedLink({
  external = false,
  className = '',
  children,
  ...props
}: AnimatedLinkProps) {
  return (
    <a
      {...props}
      target={external ? '_blank' : props.target}
      rel={external ? 'noopener noreferrer' : props.rel}
      className={`group relative inline-flex items-center gap-1 text-depth underline decoration-contour/50 decoration-1 underline-offset-4 transition-colors duration-200 hover:decoration-transparent ${className}`}
    >
      {children}
      {external ? (
        <>
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            &#8599;
          </span>
          <span className="sr-only">, opens in a new tab</span>
        </>
      ) : null}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[3px] left-0 h-px w-full origin-left scale-x-0 bg-depth transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
    </a>
  );
}
