"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectTabs } from "./project-tabs";

export function ProjectDetail({ project, totalProjects }: { project: Project; totalProjects: number }) {
  const [displayedProject, setDisplayedProject] = useState(project);
  const [switching, setSwitching] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project.id === displayedProject.id) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedProject(project);
      scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    setSwitching(true);
    const timer = window.setTimeout(() => {
      setDisplayedProject(project);
      scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
      setSwitching(false);
    }, 220);
    return () => window.clearTimeout(timer);
  }, [displayedProject.id, project]);

  return (
    <aside
      className="project-detail"
      aria-live="polite"
      aria-busy={switching}
      aria-label={`${displayedProject.title} project details`}
    >
      <div ref={scrollRef} className={`detail-scroll${switching ? " is-switching" : ""}`}>
        <div className="detail-meta">
          <span>{displayedProject.index} / {String(totalProjects).padStart(2, "0")}</span>
          <span className="status"><i aria-hidden="true" /> Completed</span>
        </div>
        <div className="detail-heading">
          <div>
            <h2>{displayedProject.title}</h2>
            <p className="tagline">{displayedProject.tagline}</p>
          </div>
          <dl>
            <div><dt>Role</dt><dd>{displayedProject.role}</dd></div>
            <div><dt>Year</dt><dd>{displayedProject.year}</dd></div>
          </dl>
        </div>
        <p className="detail-description">{displayedProject.description}</p>
        <ProjectTabs key={displayedProject.id} project={displayedProject} />
        <div className="detail-actions">
          {displayedProject.liveUrl && (
            <a href={displayedProject.liveUrl} target="_blank" rel="noreferrer">
              View live site <span aria-hidden="true">↗</span>
            </a>
          )}
          {displayedProject.caseStudyUrl && (
            <a href={displayedProject.caseStudyUrl}>View case study <span aria-hidden="true">→</span></a>
          )}
        </div>
        {displayedProject.assetCredit && (
          <p className="asset-credit">
            3D model: <a href={displayedProject.assetCredit.sourceUrl} target="_blank" rel="noreferrer">{displayedProject.assetCredit.title}</a>
            {" by "}{displayedProject.assetCredit.author}{", "}
            <a href={displayedProject.assetCredit.licenseUrl} target="_blank" rel="noreferrer">CC BY 4.0</a>.
            Material and presentation modified for this exhibit.
          </p>
        )}
      </div>
    </aside>
  );
}
