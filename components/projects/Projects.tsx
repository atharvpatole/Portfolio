import { projects } from '@/content/projects';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ProjectEntry } from './ProjectEntry';

export function Projects() {
  return (
    <section className="px-6 py-section md:px-10 md:py-section-lg">
      <SectionLabel id="selected-work">Projects</SectionLabel>

      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectEntry key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
