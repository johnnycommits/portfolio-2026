export type Project = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  role: string;
  year: string;
  tagline: string;
  description: string;
  process: string;
  impact: string;
  contributions: string[];
  techStack: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  gallery: string[];
  assetCredit?: {
    title: string;
    author: string;
    sourceUrl: string;
    licenseUrl: string;
  };
};

export const projects: Project[] = [
  {
    id: "loomis-us",
    index: "01",
    title: "Loomis US",
    subtitle: "Product Design + Frontend",
    image: "/images/artifacts/loomis-us-object.png",
    alt: "Miniature black and silver armored security truck on a black stone plinth",
    role: "Senior Front-End Developer",
    year: "2021",
    tagline: "Modernizing security for a complex world",
    description:
      "Loomis needed a complete website rebuild on a demanding eight-week timeline. I worked on a three-person delivery team to create a scalable, accessible platform for its services, product catalog, and customer tools.",
    process:
      "We built a reusable component system in Drupal Layout Builder so the content team could assemble and maintain pages without developer support. I partnered closely with backend engineering on CMS integration and reliable data handling.",
    impact:
      "The team delivered the full rebuild on time and on budget, including a custom ROI calculator that helped small businesses understand the value of Loomis services and qualify leads.",
    contributions: [
      "Built a scalable Drupal component system",
      "Delivered the complete rebuild in eight weeks",
      "Developed the custom ROI calculator",
      "Implemented accessible, responsive interfaces",
    ],
    techStack: ["Drupal", "Twig", "Bootstrap", "SCSS", "JavaScript", "Webpack"],
    liveUrl: "https://www.loomis.us",
    gallery: ["Component system", "ROI calculator", "Responsive product catalog"],
    assetCredit: {
      title: "MD '84 Armored — Low poly model",
      author: "Daniel Zhabotinsky",
      sourceUrl: "https://sketchfab.com/3d-models/md-84-armored-low-poly-model-26e809cce40e4359a3199649f12ef295",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
  },
  {
    id: "abs-wavesight",
    index: "02",
    title: "ABS Wavesight",
    subtitle: "Product Design + Engineering",
    image: "/images/artifacts/abs-wavesight-object.png",
    alt: "Miniature commercial maritime work vessel on a black stone plinth",
    role: "Front-End Co-Lead",
    year: "2023",
    tagline: "Maritime intelligence, translated clearly",
    description:
      "ABS Wavesight needed a modern, data-driven site with the technical credibility expected by maritime and offshore audiences. I was one of two front-end co-leads working closely with UX, visual design, and motion teams.",
    process:
      "We built the experience in Drupal with Acquia Site Studio, combining flexible visual authoring with custom HTML, SCSS, jQuery, Lottie, and front-end architecture. The most exacting work was adapting the angular design system and animation language for full Arabic RTL support.",
    impact:
      "The resulting platform gave editors faster iteration while preserving the brand's motion, performance, multilingual requirements, and accessibility across a technically complex global site.",
    contributions: [
      "Co-led front-end delivery and sprint planning",
      "Built reusable Acquia Site Studio components",
      "Implemented full right-to-left language support",
      "Integrated custom motion and Lottie sequences",
    ],
    techStack: ["Drupal", "Acquia", "SCSS", "jQuery", "Lottie", "Webpack"],
    liveUrl: "https://www.abswavesight.com/",
    gallery: ["Global homepage", "Product portfolio", "Arabic RTL experience"],
  },
  {
    id: "eleox",
    index: "03",
    title: "Eleox",
    subtitle: "Product Design + UX",
    image: "/images/artifacts/eleox-object.png",
    alt: "Miniature industrial natural-gas valve and pipeline assembly on a black stone plinth",
    role: "Product Designer & Front-End Engineer",
    year: "2023–2025",
    tagline: "Clarity for time-critical energy workflows",
    description:
      "As the only product designer at a lean energy software startup, I owned the design-to-implementation process for OxNom, a natural-gas nomination tool used by traders and operations teams.",
    process:
      "I prototyped major workflows before engineering began, brought stakeholders into early validation, and then built features or supported engineers with UI architecture. After a company rebrand, I led the platform refresh and refactored React components into a more modular foundation.",
    impact:
      "The work made dense, industry-specific workflows easier to navigate, established a consistent product system, and expanded end-to-end coverage for critical tasks as the platform scaled.",
    contributions: [
      "Owned product design from prototype to production",
      "Led the platform-wide UI rebrand",
      "Built and refactored reusable React components",
      "Expanded critical Cypress test coverage",
    ],
    techStack: ["React", "Redux", "React Query", "Tailwind", "SCSS", "Cypress", "Sketch"],
    liveUrl: "https://www.eleox.com",
    gallery: ["OxNom workflows", "Interactive prototypes", "Rebranded design system"],
    assetCredit: {
      title: "Ox",
      author: "VIMUNE",
      sourceUrl: "https://sketchfab.com/3d-models/ox-24d2fa58691c4d9aa45a9247107032f9",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
  },
  {
    id: "pomodoro-champion",
    index: "04",
    title: "Pomodoro Champion",
    subtitle: "Independent Product",
    image: "/images/artifacts/pomodoro-champion-object.png",
    alt: "Premium black and silver mechanical stopwatch on a black stone plinth",
    role: "Product Designer & Engineer",
    year: "2026",
    tagline: "A quieter way to protect focused time",
    description:
      "An independent product exploration centered on making focused work feel direct, calm, and rewarding. The experience reduces the timer to its essential states and keeps progress legible without visual noise.",
    process:
      "The concept is shaped around fast setup, clear session states, keyboard-friendly controls, and a visual system that can remain present without competing for attention.",
    impact:
      "The project serves as a focused study in interaction rhythm, restrained feedback, and building a small utility with the finish of a considered product.",
    contributions: [
      "Defined the product interaction model",
      "Designed focused and rest states",
      "Created an accessible keyboard flow",
      "Built a restrained responsive interface",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Product Design"],
    gallery: ["Focus state", "Session controls", "Responsive timer"],
  },
  {
    id: "adcetera",
    index: "05",
    title: "Adcetera",
    subtitle: "Brand + Web",
    image: "/images/artifacts/adcetera-object.png",
    alt: "Abstract brushed-metal A sculpture on a black stone plinth",
    role: "Senior Front-End Developer",
    year: "2019",
    tagline: "A studio identity made tangible online",
    description:
      "At Adcetera Design Group, I contributed to the studio's own rebranded website before being entrusted with technical leadership across its largest enterprise engagements.",
    process:
      "The work connected the agency's new visual direction to a responsive component approach, translating expressive creative concepts into maintainable front-end behavior while collaborating across design, motion, and engineering.",
    impact:
      "That early contribution established trust quickly and led to responsibility for a multi-million-dollar global website rebuild, team leadership, and an internal Team of Distinction award.",
    contributions: [
      "Translated the studio rebrand into responsive UI",
      "Built reusable front-end patterns",
      "Partnered with design and motion teams",
      "Established trust for later technical leadership",
    ],
    techStack: ["HTML", "SCSS", "JavaScript", "Drupal", "Twig", "Webpack"],
    liveUrl: "https://www.adcetera.com",
    gallery: ["Studio rebrand", "Responsive components", "Motion collaboration"],
  },
  {
    id: "chevron",
    index: "06",
    title: "Chevron",
    subtitle: "Enterprise UX",
    image: "/images/artifacts/chevron-object.png",
    alt: "Detailed miniature refinery infrastructure on a black stone plinth",
    role: "Lead Web Developer",
    year: "2016–2018",
    tagline: "Complex training delivered under pressure",
    description:
      "Chevron's internal studio brought me in to recover a training initiative that had fallen behind: twelve interactive modules with two months left before delivery.",
    process:
      "I audited the existing work, restructured the front-end approach, set clearer workflows, built modules, and mentored newly hired developers. The work balanced interaction and accessibility with the constraints of Chevron's learning management system and new enterprise brand.",
    impact:
      "All twelve modules shipped by the original deadline. The engagement continued into additional web-based learning, internal communications, and SharePoint brand migration work.",
    contributions: [
      "Recovered and delivered twelve training modules",
      "Restructured front-end production workflows",
      "Mentored and unblocked new developers",
      "Aligned experiences to the enterprise brand",
    ],
    techStack: ["JavaScript", "jQuery", "CSS", "SharePoint", "Instructional Design"],
    liveUrl: "https://www.chevron.com",
    gallery: ["Interactive training", "Enterprise brand system", "SharePoint migration"],
  },
];
