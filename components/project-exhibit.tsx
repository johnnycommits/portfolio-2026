"use client";

import type { CSSProperties, PointerEvent } from "react";
import type { Project } from "@/data/projects";
import { ExhibitBoxes } from "./glass-case";

type ProjectExhibitProps = {
  project: Project;
  selected: boolean;
  muted: boolean;
  onSelect: (project: Project) => void;
};

export function ProjectExhibit({ project, selected, muted, onSelect }: ProjectExhibitProps) {
  const moveHighlight = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <article
      className={`project-exhibit${selected ? " is-selected" : ""}${muted ? " is-muted" : ""}`}
      data-project={project.id}
      aria-hidden={muted || undefined}
    >
      <button
        type="button"
        className="exhibit-trigger"
        onClick={() => onSelect(project)}
        onPointerMove={moveHighlight}
        disabled={selected}
        aria-label={selected ? `${project.title} selected` : `Examine ${project.title}`}
        tabIndex={muted ? -1 : 0}
        style={{ "--order": Number(project.index) } as CSSProperties}
      >
        <span className="exhibit-visual">
          <ExhibitBoxes image={project.image} title={project.title} />
        </span>

        <span className="exhibit-label">
          <span>
            <strong>{project.title}</strong>
            <small>{project.subtitle}</small>
          </span>
          <span className="exhibit-index" aria-hidden="true">{project.index}</span>
        </span>
      </button>
    </article>
  );
}
