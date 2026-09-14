"use client";

import type { CSSProperties, PointerEvent, RefObject, UIEvent } from "react";
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
  const beginDesktopHover = (event: PointerEvent<HTMLElement>, projectId: string) => {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches
    ) {
      onHover(projectId);
    }
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
              {selected ? (
                <div
                  className="exhibit-trigger exhibit-trigger--detail"
                  onPointerEnter={(event) => beginDesktopHover(event, project.id)}
                  onPointerLeave={() => onHover(null)}
                  aria-hidden="true"
                />
              ) : (
                <button
                  type="button"
                  className="exhibit-trigger"
                  onClick={() => onSelect(project)}
                  onPointerEnter={(event) => beginDesktopHover(event, project.id)}
                  onPointerLeave={() => onHover(null)}
                  aria-label={`Examine ${project.title}`}
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
