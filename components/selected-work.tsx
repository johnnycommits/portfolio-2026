"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { MuseumGallery } from "./museum-gallery";
import { ProjectDetail } from "./project-detail";

const MuseumThreeScene = dynamic(
  () => import("./museum-three-scene").then((module) => module.MuseumThreeScene),
  {
    ssr: false,
    loading: () => <span className="museum-stage-loader">Preparing gallery…</span>,
  },
);

export function SelectedWork() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [closing, setClosing] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [rotationResetToken, setRotationResetToken] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);
  const previousScroll = useRef(0);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const selectProject = (project: Project) => {
    if (selected || closing) return;
    previousScroll.current = rowRef.current?.scrollLeft ?? 0;
    setHoveredId(null);
    setRotationResetToken((token) => token + 1);
    setSelected(project);
    window.history.replaceState(null, "", `#${project.id}`);
    requestAnimationFrame(() =>
      rowRef.current?.scrollTo({ left: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" }),
    );
  };

  const closeDetail = () => {
    if (!selected || closing) return;
    const selectedId = selected?.id;
    setHoveredId(null);
    setRotationResetToken((token) => token + 1);
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
      <MuseumThreeScene
        projectIds={projects.map((project) => project.id)}
        projects={projects}
        hoveredId={hoveredId}
        selectedId={selected?.id ?? null}
        rotationResetToken={rotationResetToken}
        scrollProgress={scrollProgress}
      />
      <header className="site-header">
        <a className="identity" href="#work" aria-label="John Ludena, home">
          <strong>John Ludena</strong>
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

      <section id="work" className="work-section" aria-label="Selected work gallery">

        {selected && (
          <button className="back-control" type="button" onClick={closeDetail}>
            <span aria-hidden="true">←</span> Back to work
          </button>
        )}

        <div className="gallery-layout">
          <MuseumGallery
            projects={projects}
            selected={selected}
            rowRef={rowRef}
            onSelect={selectProject}
            onHover={setHoveredId}
            onScrollProgress={setScrollProgress}
          />
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
