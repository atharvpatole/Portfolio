import type { ProjectBlock } from '@/content/types';

/**
 * The failed approach gets the most room of anything in the section. It is the
 * part a hiring engineer actually wants, and it is the part most portfolios
 * leave out, so it is set apart rather than buried in the prose run.
 */
function FailureBlock({ heading, text }: { heading: string; text: string }) {
  return (
    <div className="my-10 border-l-2 border-contour pl-6 md:my-12 md:pl-8">
      <h4 className="text-h3 font-semibold">{heading}</h4>
      <p className="mt-4 max-w-[46rem] text-lead">{text}</p>
    </div>
  );
}

export function ProjectDetail({
  blocks,
  featured,
}: {
  blocks: ProjectBlock[];
  featured: boolean;
}) {
  const proseWidth = featured ? 'max-w-[52rem]' : 'max-w-[46rem]';

  return (
    <div className={featured ? 'pt-8' : 'pt-6'}>
      {blocks.map((block, index) => {
        if (block.kind === 'failure') {
          return <FailureBlock key={block.heading} {...block} />;
        }

        if (block.kind === 'part') {
          const emphasis = block.emphasis ?? false;
          return (
            <div
              key={block.heading}
              className={
                emphasis
                  ? 'first:mt-0'
                  : 'mt-12 border-t border-contour/25 pt-8 md:mt-14'
              }
            >
              <h4 className={emphasis ? 'text-h3 font-semibold' : 'text-body font-semibold'}>
                {block.heading}
              </h4>
              {block.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={
                    emphasis
                      ? 'mt-5 max-w-[52rem] text-lead'
                      : `mt-4 ${proseWidth} text-body`
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          );
        }

        if (block.kind === 'list') {
          return (
            <div key={block.heading} className="mt-8">
              <h4 className="text-body font-semibold">{block.heading}</h4>
              <ul className={`mt-3 ${proseWidth}`}>
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-contour/25 py-2 text-body first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p
            key={block.text}
            className={`${proseWidth} ${index === 0 ? '' : 'mt-4'} text-body`}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
