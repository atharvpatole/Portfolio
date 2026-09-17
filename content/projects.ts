import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'spidernet',
    name: 'SpiderNet',
    featured: true,
    /*
      Kept short on purpose. At lead size on a 380px viewport every extra line
      costs 30px, and the list of sources it used to carry now lives in the AI
      system part, which is where a reader who wants that detail is looking.
    */
    summary:
      'Ask a question in plain English about any New York City building or lot. The answer comes from real records, drawn on the map.',
    data: [
      { readout: '~30 map layers' },
      { readout: 'public REST API' },
      { readout: '241 sensors' },
      { readout: '~219,000 buildings' },
      { readout: '~55,000 flooded' },
    ],
    tech: [
      'Python',
      'LangChain',
      'Pinecone',
      'MCP',
      'DuckDB',
      'MapLibre GL',
      'PMTiles',
      'Next.js',
      'GeoPandas',
      'WhiteboxTools',
      'GeoParquet',
      'Tippecanoe',
    ],
    detailLabel: 'Read the build',
    /*
      Three parts. The AI system comes first and carries emphasis, because
      that is the work these applications are for. The data system is what
      makes the answers true, and the flood risk model is one specific layer
      that data system serves, so it reads last, as the detail underneath.
    */
    detail: [
      {
        kind: 'part',
        heading: 'The AI system',
        emphasis: true,
        paragraphs: [
          'A question in plain English turns into queries against real data, and the answer comes back grounded in records that exist. An LLM does the planning and calls tools over an MCP server I wrote by hand.',
          'The tools read parcel records, the building and zoning code text, and the flood risk layer. They return the answer along with the geometry to draw it, so the reply and the map agree.',
        ],
      },
      {
        kind: 'part',
        heading: 'The data system',
        paragraphs: [
          'The data lives as GeoParquet on Cloudflare R2. DuckDB runs inside a Vercel serverless function and reads it over HTTP range requests, so a query pulls the bytes it needs instead of loading the table.',
          'The map is MapLibre GL over PMTiles, about 30 layers. The front end is Next.js on Vercel.',
          'The same data is available without the chat, through a free public REST API with an OpenAPI spec.',
        ],
      },
      {
        kind: 'part',
        heading: 'The flood risk model',
        paragraphs: [
          'One of those layers is a building-level flood risk classification covering roughly one million New York City properties.',
        ],
      },
      {
        kind: 'failure',
        heading: 'The first approach failed',
        text: 'I started with Kriging plus XGBoost over sensor readings. It did not work. The sensors are not sited randomly, so the model extrapolated badly outside their footprint. Accuracy near the sensors was hiding the fact that the predictions everywhere else were not trustworthy.',
      },
      {
        kind: 'prose',
        text: 'I replaced it with a physics-based HAND-stage inundation method, run across all 241 eligible sensors.',
      },
      {
        kind: 'prose',
        text: 'The output is an enriched GeoParquet covering roughly 219,000 assessed buildings. Roughly 55,000 classify as flooded, each with a confidence score and a tiered flood depth.',
      },
      {
        kind: 'list',
        heading: 'Validation',
        items: [
          'Cross-checked against 311 complaints.',
          'Leave-one-out sensor coherence analysis.',
          "Compared against NYC DEP's Stormwater Map.",
          'Distance-decay confidence lookup.',
        ],
      },
      {
        kind: 'prose',
        text: 'Tiled with tippecanoe to PMTiles and served live as the flood risk layer above.',
      },
    ],
    // The repository is private. Do not add a repo link.
    links: [
      { label: 'spidernet.app', href: 'https://spidernet.app' },
      { label: 'Developer docs', href: 'https://spidernet.app/developers' },
      { label: 'OpenAPI spec', href: 'https://spidernet.app/openapi.json' },
      // TODO (Atharv): paste the Medium URL here and drop the `pending` flag.
      { label: 'Flood model write-up', href: '', pending: true },
    ],
  },
  {
    slug: 'art-styles',
    name: 'Art Styles',
    summary:
      "A library of original art styles for greeting cards, generated end to end. Twenty-two card fronts across seven art movements, two original styles built by combining movements that don't normally meet, and one style based on a current Gen Z trend. Each style is written as a reusable JSON spec before generation, so a whole set stays on-style instead of drifting image to image.",
    data: [
      { readout: '22 card fronts' },
      { readout: '7 art movements' },
      { readout: '2 hybrid styles' },
      { readout: '1 Gen Z-trend style' },
    ],
    tech: ['Next.js', 'Vercel', 'Nano Banana 2'],
    detailLabel: 'Read the styles',
    /*
      Three parts, same shape as SpiderNet: the method carries emphasis because
      it is what keeps a 22-card set from drifting image to image, the two
      hybrids and the trend style are what make it original rather than a
      style-transfer demo, and the range list is the detail underneath.
    */
    detail: [
      {
        kind: 'part',
        heading: 'The method',
        emphasis: true,
        paragraphs: [
          'Each style is written as a reusable JSON spec before anything is generated: medium, palette, texture, composition, and what to avoid. A card is that spec plus an occasion, so a whole set stays on-style instead of drifting image to image, and a new occasion is a one-line change instead of a new prompt.',
          'No artist names, studios, brands, or existing characters appear in any prompt. Styles are described entirely by their visual traits, so the output stays commercially usable.',
        ],
      },
      {
        kind: 'part',
        heading: 'Two styles that don’t normally meet',
        paragraphs: [
          'Ukiyo-e Chrome takes the carved outlines and woodblock composition built for cheap, fast street-corner printing and renders every surface in Y2K liquid chrome, the finish Gen Z keeps pulling back out of 2001.',
          'Baroque Riso prints the single-spotlight drama and theatrical staging of Baroque painting as a grainy, misregistered two-color risograph zine, so a card can mean its subject and joke about it in the same breath.',
        ],
      },
      {
        kind: 'part',
        heading: 'One Gen Z read',
        paragraphs: [
          'Jelly Candy is built on the squishy, translucent gummy look running through Pinterest and the ASMR side of TikTok. It reads happy without reading childish, which is a narrow lane for a style to hold.',
        ],
      },
      {
        kind: 'list',
        heading: 'The range',
        items: [
          '14 cards across watercolor, risograph, claymation, ukiyo-e, Bauhaus, 90s anime cel, and Art Nouveau, two cards per movement.',
          'Ukiyo-e Chrome and Baroque Riso carry 2 and 3 cards; Jelly Candy carries 3.',
          'Every prompt is published on the site next to the image it produced.',
        ],
      },
    ],
    links: [
      { label: 'Live', href: 'https://art-styles-gamma.vercel.app' },
      { label: 'Repo', href: 'https://github.com/atharvpatole/synth-art-cards' },
    ],
  },
];
