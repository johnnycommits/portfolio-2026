"use client";

import dynamic from "next/dynamic";
import { useState, type CSSProperties, type PointerEvent } from "react";
import type { Project } from "@/data/projects";
import { ExhibitBoxes } from "./glass-case";

const LoomisThreeExhibit = dynamic(
  () => import("./loomis-three-exhibit").then((module) => module.LoomisThreeExhibit),
  { ssr: false },
);

type ProjectExhibitProps = {
  project: Project;
  selected: boolean;
  muted: boolean;
  onSelect: (project: Project) => void;
};

export function ProjectExhibit({ project, selected, muted, onSelect }: ProjectExhibitProps) {
  const [hovered, setHovered] = useState(false);
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
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        disabled={selected}
        aria-label={selected ? `${project.title} selected` : `Examine ${project.title}`}
        tabIndex={muted ? -1 : 0}
        style={{ "--order": Number(project.index) } as CSSProperties}
      >
        <span
          className={`exhibit-visual ${
            project.id === "loomis-us" ? "exhibit-visual--three" : "exhibit-visual--css"
          }`}
        >
          {project.id === "loomis-us" ? (
            <LoomisThreeExhibit hovered={hovered} selected={selected} />
          ) : (
            <ExhibitBoxes image={project.image} title={project.title} />
          )}
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
