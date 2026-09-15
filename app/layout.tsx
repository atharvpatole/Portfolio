import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter, Space_Grotesk } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CommandPalette } from '@/components/command-palette/CommandPalette';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

/** Display face for the name and titles only. Body copy stays on Inter for legibility. */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-plex-mono',
});

export const metadata: Metadata = {
  title: 'Atharv Patole, AI Engineer',
  description:
    'I build GenAI and LLM systems that ship to production: ingestion, retrieval, agents, and the frontend someone actually opens. Based in New York City.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:bg-mylar focus-visible:px-3 focus-visible:py-2 focus-visible:text-meta"
        >
          Skip to content
        </a>
        {/*
          reducedMotion="user" makes every motion.* component honor
          prefers-reduced-motion automatically: transitions still run so content
          still appears, but instantly, with no transform or delay to undo.
        */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <CommandPalette />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
