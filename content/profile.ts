import type { Profile } from './types';

export const profile: Profile = {
  name: 'Atharv Patole',
  tagline: 'AI Engineer, GenAI and Production LLM Systems',
  // Broad on purpose: he is targeting any AI Engineer / Applied AI / FDE / GTM role,
  // not just geospatial work, so the headline leads with the general skill, not the domain.
  statement: [
    { text: 'I ship AI systems ' },
    { text: 'end to end', highlight: true },
    { text: ': the data pipeline, the agent, the evals, and the interface the user touches.' },
  ],
  location: 'New York City',
  headerTags: ['New York City', 'Open to relocation', 'F-1 STEM OPT'],
  email: 'atharvpatole6@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/atharvpatole/' },
    { label: 'GitHub', href: 'https://github.com/atharvpatole' },
  ],
  openToStatement:
    'Open to AI Engineer, Applied AI Engineer, Forward-Deployed Engineer, and AI/automation GTM roles.',
  bio: [
    'I build production LLM systems. That means staying current in a field that moves weekly: retrieval that actually grounds answers, agents that work reliably, evaluation that catches failures before users do. I learn from shipping, not from papers alone.',
    'M.S. Computer Science, Pace University.\nB.Tech Civil Engineering, Sanjay Ghodawat University.\nBased in New York City.',
  ],
};
