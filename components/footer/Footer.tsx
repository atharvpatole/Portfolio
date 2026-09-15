'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { profile } from '@/content/profile';
import { fadeUp, inViewport, stagger } from '@/components/motion/variants';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '@/components/ui/icons';

const ICONS: Record<string, (props: { className?: string }) => ReactNode> = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
};

function IconLink({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex h-11 w-11 items-center justify-center border border-contour/30 text-depth transition-colors hover:border-depth hover:bg-depth/5"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const { email, links } = profile;

  return (
    <motion.footer
      id="contact"
      initial="hidden"
      whileInView="show"
      viewport={inViewport}
      variants={stagger(0.12)}
      className="border-t-2 border-contour px-6 py-section text-center md:px-10 md:py-section-lg"
    >
      <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
        <IconLink href={`mailto:${email}`} label="Email">
          <EmailIcon className="h-5 w-5" />
        </IconLink>
        {links.map((link) => {
          const Icon = ICONS[link.label];
          return (
            <IconLink key={link.label} href={link.href} label={link.label} external>
              {Icon ? <Icon className="h-5 w-5" /> : link.label}
            </IconLink>
          );
        })}
      </motion.div>
    </motion.footer>
  );
}
