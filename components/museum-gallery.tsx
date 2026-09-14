"use client";

import type { CSSProperties, RefObject, UIEvent } from "react";
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
  const exhibitCount = visibleProjects.length;
  const trackStyle = {
    "--exhibit-count": exhibitCount,
    "--desktop-hotspot-width": `${exhibitCount * 26.8}svh`,
    "--mobile-track-width": `calc(${exhibitCount * 76}vw + ${Math.max(0, exhibitCount - 1) * 18}px)`,
  } as CSSProperties;
  const reportScroll = (event: UIEvent<HTMLDivElement>) => {
    const row = event.currentTarget;
    const maximum = row.scrollWidth - row.clientWidth;
    onScrollProgress(maximum > 0 ? row.scrollLeft / maximum : 0);
  };

  return (
    <div className="project-row" ref={rowRef} onScroll={reportScroll} aria-label="Selected project exhibits">
      <div className={`museum-stage-track${selected ? " is-focused" : ""}`} style={trackStyle}>
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
