# Atharv Patole — Portfolio

Personal portfolio site built with Next.js. One page: header, about, skills, experience,
projects, achievements, contact.

Live content lives in `/content` as typed TypeScript objects, not a CMS. Editing the site
almost always means editing a file in `/content`, not a component.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**
- **Tailwind CSS v4** — design tokens (colors, type scale, spacing) live in the `@theme`
  block at the top of `app/globals.css`
- **Framer Motion** — scroll-triggered reveals, the command palette's open/close, the
  cursor-reactive header spotlight and card tilt, animated stat counters
- No CMS, no database, no server actions. Everything prerenders as static HTML.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000 (or the next free port)
npm run typecheck # tsc --noEmit
npm run build     # production build
```

## Project structure

```
app/
  layout.tsx      fonts, global <MotionConfig>, the command palette mount
  page.tsx        section order for the single page
  globals.css     design tokens (@theme), base styles, a few global keyframe/utility classes

content/          the only place facts and copy live
  types.ts        shared shapes for every content file
  profile.ts       name, header statement, bio, contact links, target roles
  experience.ts    work history
  projects.ts      case studies
  awards.ts        achievements
  stack.ts         skills, grouped

components/
  header/         name, statement, resume CTA, cursor spotlight + tilt
  nav/            sticky top nav, section anchors
  command-palette/ Ctrl/Cmd+K quick navigation
  about/          bio section
  stack/          skills legend
  experience/     work history + the drawn timeline spine
  projects/       case study cards, expandable detail, animated stat readouts
  awards/         achievements list
  footer/         contact icons
  ui/             shared primitives: AnimatedLink, AnimatedReadout, MagneticButton,
                  SectionLabel, icons
  motion/         shared Framer Motion variants and easing, so animation stays consistent
                  instead of redefined per component

public/
  Atharv-Patole-Resume.pdf   served at /Atharv-Patole-Resume.pdf, linked from the header
```

## Editing content

Everything a recruiter reads is data, not markup:

- **Bio, header statement, target roles, contact links** → `content/profile.ts`
- **Work history** → `content/experience.ts` (`Role[]`; mark one role `anchor: true` for
  visual weight; `concurrentWith` exists for overlapping roles)
- **Projects** → `content/projects.ts` (`Project[]`; `detail` is a discriminated union of
  `prose` / `part` / `failure` / `list` blocks, rendered by `ProjectDetail.tsx`)
- **Achievements** → `content/awards.ts` (`Award[]`; set `pending: true` to hold an entry
  back from rendering without deleting it)
- **Skills** → `content/stack.ts` (`StackGroup[]`, rendered as a grouped legend)

Every type in `content/types.ts` carries a one-line comment on what it's for and why it's
shaped the way it is — read that before adding a field.

## Design tokens

Six color custom properties in `app/globals.css`, reused as Tailwind utility classes
(`bg-mylar`, `text-ink`, `border-contour`, `text-depth`, etc.):

| Token | Role |
|---|---|
| `mylar` | Page background |
| `ink` | Primary text |
| `contour` | Secondary text and hairlines (used at reduced opacity for dividers) |
| `depth` | The one accent color — links, buttons, highlights, focus rings |
| `flagging` | Currently mirrors `depth`; kept as a separate token in case focus rings ever need to diverge from the accent |
| `shoal` | Unused at the moment; kept for palette symmetry |

Changing the site's whole color scheme is a matter of editing these six values once, since
every component references the token, never a hardcoded hex.

Type scale, spacing, and the hero font sizes are also tokens in the same `@theme` block.
Fonts: Space Grotesk for the name and display headings (`font-display`), Inter for body copy
(the default), IBM Plex Mono for data — dates, stats, section labels, code-style chrome.

## Motion conventions

Shared variants and easing live in `components/motion/variants.ts` (`fadeUp`, `stagger`,
`inViewport`) so every section animates the same way. A few rules that have mattered in
practice:

- A `motion` component that orchestrates children via `variants` needs its own `variants`
  prop, even if the value is just `stagger()`. A component with only `initial`/`whileInView`
  strings and no `variants` object will not animate itself, and — in at least one case in
  this codebase — silently left its children stuck at `opacity: 0` instead of animating in.
  If a section ever renders blank content that shows up fine in the DOM, this is the first
  thing to check.
- `<MotionConfig reducedMotion="user">` in `app/layout.tsx` makes every `motion.*` component
  respect `prefers-reduced-motion` automatically (transitions still run, just instantly).
  Anything animated outside of Framer Motion (the `AnimatedReadout` counter, the timeline
  spine's SVG draw) checks `prefers-reduced-motion` itself.
- No continuous/looping motion (pulsing dots, auto-playing carousels). Entrances and
  cursor-driven interactions only.

## Deployment

Static-output Next.js app, deploys cleanly to Vercel with no configuration beyond the
defaults. No environment variables are required.
