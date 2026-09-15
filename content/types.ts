/**
 * Content shapes. Everything on this site is a typed object in /content.
 * No CMS, no fetching, no global state.
 */

/** A run of hero text. `highlight` marks the one phrase that renders in the accent color. */
export type StatementSegment = {
  text: string;
  highlight?: boolean;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  /** Renders as a quiet marker instead of an anchor, for a URL that does not exist yet. */
  pending?: boolean;
};

/**
 * A mono readout. The value and its unit are one string because a measurement
 * without its unit is not data. Nothing belongs here that is not a real count,
 * date, coordinate, layer name, or API path.
 */
export type ProjectDatum = {
  readout: string;
};

export type ProjectBlock =
  | { kind: 'prose'; text: string }
  /**
   * A named part of the system. `emphasis` gives a part heading-level type and
   * more room, which is how the AI system outranks the data system inside
   * SpiderNet instead of both dissolving into one flat technology list.
   */
  | { kind: 'part'; heading: string; paragraphs: string[]; emphasis?: boolean }
  /** The approach that did not work. Rendered with more room than prose. */
  | { kind: 'failure'; heading: string; text: string }
  | { kind: 'list'; heading: string; items: string[] };

export type Project = {
  slug: string;
  name: string;
  /** What it does, in plain language. Never names a technology. */
  summary: string;
  /** Featured projects carry roughly twice the visual weight and open by default. */
  featured?: boolean;
  data: ProjectDatum[];
  /** Quick-scan keyword line under the stat callout. Lowercase, dot-separated on render. */
  tech: string[];
  /** Empty means no expand control, because there is nothing to expand into. */
  detail: ProjectBlock[];
  detailLabel?: string;
  links: ProjectLink[];
};

export type Role = {
  company: string;
  title: string;
  /** Written exactly as in portfolio-facts.mdc. Rendered in mono, as real data. */
  dates: string;
  location?: string;
  /**
   * Fulton Ring and Community Dream Foundation ran over the same months. The
   * facts rule requires that this reads as deliberate, never as a gap or a
   * correction, so the overlap is stated rather than left to inference.
   */
  concurrentWith?: string;
  /** The anchor role carries more weight. One per list. */
  anchor?: boolean;
  summary?: string;
  bullets: string[];
};

export type Award = {
  /** e.g. "1st place". */
  placement: string;
  event: string;
  /** One line on what was built. */
  line: string;
  collaborators?: string;
  /** Held back from render until the facts file's TODO for this entry is resolved. */
  pending?: boolean;
};

/** One row of the stack legend. `label` is lowercase, mono, read as a map layer name. */
export type StackGroup = {
  label: string;
  items: string[];
};

export type Profile = {
  name: string;
  /** Short role line under the name in the header. */
  tagline: string;
  statement: StatementSegment[];
  location: string;
  /** Dot-separated tags under the tagline: location, relocation, work authorization. */
  headerTags: string[];
  email: string;
  links: ContactLink[];
  /** The footer's one job: state the roles he wants, in his own words. */
  openToStatement: string;
  /** Short intro, one paragraph per array entry. Sourced from the resume summary. */
  bio: string[];
};
