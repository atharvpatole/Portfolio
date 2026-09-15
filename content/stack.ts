import type { StackGroup } from './types';

/**
 * Sourced from the TECHNICAL SKILLS section of the 2026 resume
 * (d:\resume\aug26\Atharv_Patole_Resume_2026.pdf), plus the geospatial group
 * already established from portfolio-facts.mdc. Every item here is real and
 * traceable; nothing is added to pad the list.
 */
export const stack: StackGroup[] = [
  {
    label: 'agentic ai',
    items: [
      'LLM agents',
      'Multi-step workflows',
      'Tool / function calling',
      'LangGraph',
      'OpenAI Agents SDK',
      'MCP',
      'Prompt & context engineering',
      'Human-in-the-loop workflows',
    ],
  },
  {
    label: 'rag & retrieval',
    items: [
      'Graph RAG',
      'LlamaIndex',
      'Hybrid retrieval (BM25 + dense)',
      'Semantic chunking',
      'Semantic caching',
      'Knowledge graphs',
      'Pinecone',
      'Chroma',
      'Vertex AI Vector Search',
    ],
  },
  {
    label: 'evals & observability',
    items: [
      'LangSmith',
      'Langfuse',
      'OpenTelemetry',
      'LLM-as-judge',
      'Regression evals',
      'Cost-per-query tracking',
      'Prompt-injection defense',
      'PII filtering',
    ],
  },
  {
    label: 'languages & backend',
    items: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Flask', 'REST APIs', 'Next.js', 'Vercel'],
  },
  {
    label: 'data & cloud',
    items: [
      'AWS',
      'GCP',
      'ETL / ELT pipelines',
      'PySpark',
      'Docker',
      'Kubernetes',
      'PostgreSQL (Supabase)',
      'SQL Server',
      'MongoDB',
      'DuckDB',
      'Cloudflare R2',
    ],
  },
  {
    label: 'machine learning',
    items: [
      'Classification',
      'clustering',
      'Time series forecasting',
      'Anomaly detection',
      'Feature engineering',
      'Model evaluation',
    ],
  },
  {
    label: 'geospatial',
    items: ['GDAL', 'GeoPandas', 'WhiteboxTools', 'MapLibre GL', 'PMTiles', 'Tippecanoe', 'GeoParquet'],
  },
];
