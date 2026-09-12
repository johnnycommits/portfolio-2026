"use client";

import type { RefObject, UIEvent } from "react";
import type { Project } from "@/data/projects";

type MuseumGalleryProps = {
  projects: Project[];
  selected: Project | null;
  rowRef: RefObject<HTMLDivElement | null>;
  onSelect: (project: Project) => void;
  onHover: (projectId: string | null) => void;
  onScrollProgress: (progress: number) => void;
};

export function MuseumGallery({
  projects,
  selected,
  rowRef,
  onSelect,
  onHover,
  onScrollProgress,
}: MuseumGalleryProps) {
  const visibleProjects = selected ? [selected] : projects;
  const reportScroll = (event: UIEvent<HTMLDivElement>) => {
    const row = event.currentTarget;
    const maximum = row.scrollWidth - row.clientWidth;
    onScrollProgress(maximum > 0 ? row.scrollLeft / maximum : 0);
  };

  return (
    <div className="project-row" ref={rowRef} onScroll={reportScroll} aria-label="Selected project exhibits">
      <div className={`museum-stage-track${selected ? " is-focused" : ""}`}>
        <div className="museum-stage-hotspots">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className={`project-exhibit${selected ? " is-selected" : ""}`}
              data-project={project.id}
            >
              <button
                type="button"
                className="exhibit-trigger"
                onClick={() => onSelect(project)}
                onPointerEnter={() => onHover(project.id)}
                onPointerLeave={() => onHover(null)}
                disabled={Boolean(selected)}
                aria-label={selected ? `${project.title} selected` : `Examine ${project.title}`}
              >
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
