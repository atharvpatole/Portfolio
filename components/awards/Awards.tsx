import { awards } from '@/content/awards';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AwardEntry } from './AwardEntry';

export function Awards() {
  // Held back per portfolio-facts.mdc until its one-sentence TODO is resolved.
  const shipped = awards.filter((award) => !award.pending);
  if (shipped.length === 0) return null;

  return (
    <section className="px-6 py-section md:px-10 md:py-section-lg">
      <SectionLabel id="achievements">Achievements</SectionLabel>

      <div className="border-b border-contour/40">
        {shipped.map((award) => (
          <AwardEntry key={award.event} award={award} />
        ))}
      </div>
    </section>
  );
}
