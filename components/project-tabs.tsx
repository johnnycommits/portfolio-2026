"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Project } from "@/data/projects";

const tabs = ["Overview", "Process", "Impact", "Gallery"] as const;
type Tab = (typeof tabs)[number];

export function ProjectTabs({ project }: { project: Project }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId();

  const handleKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="project-tabs">
      <div className="tab-list" role="tablist" aria-label={`${project.title} case study sections`}>
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(node) => { tabRefs.current[index] = node; }}
            type="button"
            role="tab"
            id={`${id}-${tab}-tab`}
            aria-selected={activeTab === tab}
            aria-controls={`${id}-${tab}-panel`}
            tabIndex={activeTab === tab ? 0 : -1}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(event) => handleKeys(event, index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <section
        className="tab-panel"
        role="tabpanel"
        id={`${id}-${activeTab}-panel`}
        aria-labelledby={`${id}-${activeTab}-tab`}
        tabIndex={0}
      >
        {activeTab === "Overview" && (
          <div className="overview-grid">
            <div>
              <h3>Key Contributions</h3>
              <ul className="contribution-list">
                {project.contributions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="tech-stack">
              <h3>Tech Stack</h3>
              <ul>{project.techStack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
            </div>
          </div>
        )}
        {activeTab === "Process" && <p className="panel-copy">{project.process}</p>}
        {activeTab === "Impact" && <p className="panel-copy">{project.impact}</p>}
        {activeTab === "Gallery" && (
          <ul className="gallery-notes">
            {project.gallery.map((item, index) => (
              <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
