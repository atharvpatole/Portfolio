import { experience } from '@/content/experience';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { RoleEntry } from './RoleEntry';
import { TimelineSpine } from './TimelineSpine';

export function Experience() {
  return (
    <section className="px-6 py-section md:px-10 md:py-section-lg">
      <SectionLabel id="experience">Experience</SectionLabel>

      {/*
        A vertical sequence, which is the one case where a timeline is honest.
        The ground line sits in the gutter and the entries pad past it, so their
        station hairlines cross it rather than butting against it.
      */}
      <div className="relative border-b border-contour/40">
        <TimelineSpine />
        {experience.map((role) => (
          <RoleEntry key={role.company} role={role} />
        ))}
      </div>
    </section>
  );
}
