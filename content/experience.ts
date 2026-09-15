import type { Role } from './types';

/**
 * Reverse chronological. Every line here traces to portfolio-facts.mdc. Nothing
 * is embellished, no metrics are added, and no responsibility is inferred from
 * a job title.
 *
 * Fulton Ring bullets stay general on purpose: no product or client names.
 * Atharv worked across several production LLM and data systems there (the
 * NYC property search tool detailed in Projects is one of them), and the
 * copy is written to reflect that breadth rather than naming any one of them.
 */
export const experience: Role[] = [
  {
    company: 'Fulton Ring',
    title: 'Data Scientist, AI Systems',
    dates: 'Aug 2025 - Jul 2026',
    location: 'New York, NY',
    anchor: true,
    summary: 'Built and shipped multiple production LLM and data systems.',
    bullets: [
      'Teams and outside users had no way to ask a question about city data without waiting on an engineer to run it down. Built and shipped several production LLM search tools across different projects that answer in plain language instead, cutting manual review time roughly 40% on the primary one.',
      'Retrieval kept surfacing plausible but wrong records because embeddings ignored the identifiers people actually reason with. Rebuilt the retrieval layer over Pinecone around structured metadata, then instrumented MCP tool-calling with LangSmith tracing and LLM-as-judge guardrails gating every release. Retrieval consistency rose close to 30%, and groundedness review dropped from hours to minutes.',
      'Architects, investors, and other non-technical stakeholders across these projects had no route into the underlying data without borrowing time from a data team. Built standalone sites that put the data directly in front of them, on one trimming query latency on spatial files above 10GB by roughly 60%.',
    ],
  },
  {
    company: 'Community Dream Foundation',
    title: 'Data Analyst',
    dates: 'Aug 2025 - Jul 2026',
    location: 'Remote, US',
    bullets: [
      "Reporting numbers coming out of the pipelines didn't always match what the source systems actually held, and nothing had caught it before it reached stakeholders. Traced the mismatches back through the pipeline by hand, then wrote Python and SQL checks that caught the same class of error automatically before every release.",
      'The team pulled from internal tools and REST APIs that quietly disagreed with each other, and no one outside engineering could see the reporting layer to sanity-check it. Verified the data against source myself, then built dashboards so non-technical stakeholders could see the numbers directly instead of waiting on someone to explain them.',
      'Issues found during testing had no shared record, so the same ones kept resurfacing every cycle without anyone connecting the dots. Documented every test scenario and worked directly with developers and stakeholders to close each one out for good.',
    ],
  },
  {
    company: 'Scon Infra',
    title: 'Analytics Engineer',
    dates: 'Jul 2020 - Jun 2023',
    location: 'Mumbai',
    bullets: [
      'Finance and engineering were reconciling the same infrastructure planning figures by hand every month, and sign-off stalled every cycle waiting on someone to redo the math. Dug into the reporting logic and scripted it end to end across more than $12M in planning workflows, cutting recurring manual effort by about 35%.',
      'Downstream models kept breaking whenever new source data came in, because no one had agreed on what a valid record looked like. Sat with the engineering team to define validation rules, then wrote the Python and SQL ingestion pipelines that enforced them, retiring the manual prep step entirely.',
      'Executives were making planning calls off hand-assembled reports that took days to pull together, with finance and engineering working from different numbers. Defined shared governance rules and relational models spanning both sides, shortening decision turnaround by nearly 45%.',
    ],
  },
];
