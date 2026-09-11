"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { ProjectDetail } from "./project-detail";
import { ProjectExhibit } from "./project-exhibit";

export function SelectedWork() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [closing, setClosing] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const previousScroll = useRef(0);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const selectProject = (project: Project) => {
    if (selected || closing) return;
    previousScroll.current = rowRef.current?.scrollLeft ?? 0;
    setSelected(project);
    window.history.replaceState(null, "", `#${project.id}`);
    requestAnimationFrame(() =>
      rowRef.current?.scrollTo({ left: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" }),
    );
  };

  const closeDetail = () => {
    if (!selected || closing) return;
    const selectedId = selected?.id;
    setClosing(true);
    window.history.replaceState(null, "", "#work");
    window.setTimeout(() => {
      setSelected(null);
      setClosing(false);
      requestAnimationFrame(() => {
        rowRef.current?.scrollTo({
          left: previousScroll.current,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
        if (selectedId) {
          document.querySelector<HTMLButtonElement>(`[data-project="${selectedId}"] .exhibit-trigger`)?.focus();
        }
      });
    }, prefersReducedMotion() ? 0 : 620);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selected) closeDetail();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <main className={`museum${selected ? " has-selection" : ""}${closing ? " is-closing" : ""}`}>
      <div className="ambient-light" aria-hidden="true" />
      <header className="site-header">
        <a className="identity" href="#work" aria-label="John Ludena, home">
          <strong>Johnny Commits</strong>
          <span>Designer / Engineer / Problem Solver</span>
        </a>
        <nav aria-label="Primary navigation">
          <a className="active" href="#work" aria-current="page">Work</a>
          <a href="https://www.linkedin.com/in/john-ludena" target="_blank" rel="noreferrer">About</a>
          <a href="https://github.com/johnnycommits" target="_blank" rel="noreferrer">Journal</a>
          <a href="mailto:johnludena@gmail.com">Contact</a>
        </nav>
        <p className="header-note">Real projects.<br />Real people.<br />A brighter internet.</p>
      </header>

      <section id="work" className="work-section" aria-labelledby="work-title">
        <div className="work-intro">
          <span>01</span>
          <h1 id="work-title">Selected Work</h1>
          <p className="eyebrow">Real problems. Real people. Real impact.</p>
          <i aria-hidden="true" />
          <p>A collection of products, experiences, and explorations built at the intersection<br className="desktop-only" /> of design, engineering, and curiosity.</p>
        </div>

        {selected && (
          <button className="back-control" type="button" onClick={closeDetail}>
            <span aria-hidden="true">←</span> Back to work
          </button>
        )}

        <div className="gallery-layout">
          <div className="project-row" ref={rowRef} aria-label="Selected project exhibits">
            {projects.map((project) => (
              <ProjectExhibit
                key={project.id}
                project={project}
                selected={selected?.id === project.id}
                muted={Boolean(selected && selected.id !== project.id)}
                onSelect={selectProject}
              />
            ))}
          </div>
          {selected && <ProjectDetail key={selected.id} project={selected} />}
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span><i /></span>
          <small>Scroll horizontally</small>
          <b />
        </div>
      </section>
    </main>
  );
}
