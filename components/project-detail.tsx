"use client";

import type { Project } from "@/data/projects";
import { ProjectTabs } from "./project-tabs";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <aside className="project-detail" aria-live="polite" aria-label={`${project.title} project details`}>
      <div className="detail-scroll">
        <div className="detail-meta">
          <span>{project.index} / 06</span>
          <span className="status"><i aria-hidden="true" /> Completed</span>
        </div>
        <div className="detail-heading">
          <div>
            <h2>{project.title}</h2>
            <p className="tagline">{project.tagline}</p>
          </div>
          <dl>
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
          </dl>
        </div>
        <p className="detail-description">{project.description}</p>
        <ProjectTabs key={project.id} project={project} />
        <div className="detail-actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              View live site <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.caseStudyUrl && (
            <a href={project.caseStudyUrl}>View case study <span aria-hidden="true">→</span></a>
          )}
        </div>
      </div>
    </aside>
  );
}
