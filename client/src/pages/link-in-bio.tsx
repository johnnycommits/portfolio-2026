import React, { useEffect, useRef, useState } from "react";
import {
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Github,
  Mail,
  Twitch,
  Sparkles,
  Maximize2,
  X,
  ExternalLink,
  FileText,
  Plus,
  Minus,
} from "lucide-react";
// @ts-ignore
import Stars from "@/lib/stars";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import profileImage from "@assets/john-ludena-headshot_1769019956329.jpg";
import kbrImage from "@assets/Screenshot_2025-09-23_at_4.13.48_PM_1768590034547.png";
import kbrMapImage from "@assets/Screenshot_2025-09-23_at_4.24.19_PM_1768590092789.png";
import kbrBentoBg from "@assets/kbr-bento_1768945191201.jpg";
import kbrSlider1 from "@assets/kbr-slider-1_1768945952182.jpg";
import kbrSlider2 from "@assets/kbr-slider-2_1768945952187.jpg";
import kbrSlider3 from "@assets/kbr-slider-3_1768945952187.jpg";
import kbrSlider4 from "@assets/kbr-slider-4_1768945952187.jpg";
import kbrSlider5 from "@assets/kbr-slider-5_1768945952186.jpg";
import loomisSlider1 from "@assets/loomis-slider-1_1768947313676.jpg";
import loomisSlider2 from "@assets/loomis-slider-2_1768947313687.jpg";
import loomisSlider3 from "@assets/loomis-slider-3_1768947313687.jpg";
import loomisBentoBg from "@assets/loomis-bento_1768947208061.jpg";
import absWavesightBg from "@assets/abs-bento_1768946949072.jpg";
import absWavesightHome from "@assets/abs-slider-1_1768946859771.jpg";
import absWavesightPortfolio from "@assets/abs-slider-2_1768946859779.jpg";
import absWavesightRoles from "@assets/abs-slider-3_1768946859779.jpg";
import absWavesightArabic from "@assets/abs-slider-4_1768946859778.jpg";
import chevronBentoBg from "@/assets/chevron-bento.jpg";
import eleoxBentoBg from "@/assets/eleox-bento.jpg";
import texasGridBentoBg from "@/assets/texas-grid-bento.jpg";
import texasGridSlider1 from "@/assets/texas-grid-slider-1.jpg";
import vdproBentoBg from "@/assets/vdpro-bento.jpg";
import vdproSlider1 from "@/assets/vdpro-slider-1.jpg";
import vdproSlider2 from "@/assets/vdpro-slider-2.jpg";
import vdproSlider3 from "@/assets/vdpro-slider-3.jpg";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const profile = {
  name: "John Ludena",
  handle: "@johnnycommits",
  bio: "Senior Frontend Engineer with 10+ years of experience building and shipping software products for both startups and large businesses. I bridge execution and design, with a sharp eye for UX that turns ideas into clean, user-centered, high-impact products.",
  avatar: profileImage,
};

const bentoCards = [
  {
    id: 6,
    title: "Texas Grid Status",
    client: "Personal Project",
    description:
      "**Texas Grid Status** is a lightweight, public-facing dashboard that provides a clear, user-friendly snapshot of Texas power grid conditions using ERCOT’s public data. The goal of the project was to make it easier for everyday Texans to quickly understand how the grid is performing, especially during severe weather, without needing to interpret dense charts or industry-specific jargon.\n\nI began the project in **Figma Make**, using prompt-based design to rapidly explore and iterate on multiple UI directions. By treating design as a conversational process rather than a static deliverable, I was able to refine the layout, hierarchy, and visual language quickly until the interface felt calm, readable, and mobile-first.\n\nOnce the design was finalized, I used **Figma MCP** to export the design context via URL and pasted it directly into **Cursor**, where I leveraged **Claude’s Sonnet 4.5 model** to generate the initial UI implementation. This workflow allowed me to translate design intent into working code with minimal friction, while still maintaining full control over structure, styling, and accessibility.\n\nOn the engineering side, I researched and integrated multiple **ERCOT public API endpoints**, including supply and demand data as well as Physical Responsive Capability (PRC) metrics. This required carefully understanding how ERCOT structures and updates its data, distinguishing between real-time and forecasted values, and determining which metrics best represented grid health in a way that was both accurate and easy to explain to non-technical users.\n\nUsing that understanding, I again prompted Cursor to help build a small **Next.js backend API route** that queries ERCOT’s endpoints, normalizes the data, and caches responses to prevent unnecessary upstream load. This backend layer ensures reliable performance even during traffic spikes, while keeping the frontend logic clean and focused on presentation.\n\nThe project was deployed on **Vercel**, taking advantage of its serverless infrastructure, caching, and analytics. After launch, I shared the site organically on Reddit during a Texas weather event. The response was overwhelmingly positive, with over **60 supportive comments** from the community praising the clarity, design, and usefulness of the interface. Several users even reported embedding the dashboard into their **Home Assistant** setups, validating the project’s utility beyond its original scope.\n\nOverall, this project demonstrates an end-to-end, AI-accelerated product workflow: from prompt-driven design and MCP-enabled UI generation, through thoughtful API integration and system design, to real-world deployment and community adoption. Notably, the entire process—from initial ideation to production deployment—was completed in under six hours, highlighting the speed and leverage of modern AI-assisted development workflows when paired with strong product and engineering fundamentals.",
    subtitle: "Featured Project",
    cta: "Visit Website",
    url: "https://www.texasgridstatus.com",
    role: "Product Designer & Engineer",
    date: "2026",
    featured: true,
    bgImage: texasGridBentoBg,
    images: [texasGridSlider1],
    technologies: [
      "Next.js",
      "React",
      "Serverless API Routes",
      "ERCOT Public APIs",
      "API Caching / Revalidation",
      "Vercel",
      "Vercel Analytics",
      "Figma Make",
      "Figma MCP",
      "Cursor",
      "Claude (Sonnet 4.5)",
      "AI-Assisted Development",
      "Prompt-Driven UI Development",
      "GitHub",
    ],
  },
  {
    id: 5,
    title: "Eleox",
    client: "Eleox, LLC.",
    description:
      "At **Eleox**, a lean energy software startup, I served as the sole product designer while also working as a front-end software engineer, owning the full design-to-implementation lifecycle across the platform. With a core team of fewer than 12 engineers, I partnered directly with the VP of Engineering and leadership to define scope, shape product direction, and deliver new features from concept through production.\n\nI led product design and front-end implementation for OxNom, Eleox’s flagship natural gas nomination tool used by energy trading and operations teams to manage complex, time-sensitive workflows. The challenge was translating dense industry rules and operational constraints into clear, intuitive interfaces that users could trust for daily decision-making.\n\nTo drive alignment and reduce delivery risk, I independently created interactive Sketch prototypes that allowed leadership and stakeholders to click through complete workflows before development began. These prototypes became the primary artifact for product discussions, enabling faster approvals, earlier feedback, and smoother handoffs to engineering. Once approved, I frequently implemented the features myself, while also supporting other engineers with UI architecture and interaction guidance.\n\nFollowing a major company-wide rebrand, I led the platform-wide UI refresh, redesigning layouts and refactoring React components to align with the new visual system. This work resulted in a more cohesive product experience and a modular, reusable component foundation that improved consistency and long-term maintainability.\n\nIn addition to feature development, I acted as a mentor and UI authority for the engineering team, helping unblock implementation challenges and maintaining design quality across the product. I also contributed to user testing efforts and expanded end-to-end test coverage with Cypress, strengthening confidence in critical workflows as the platform scaled.",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.eleox.com",
    role: "Product Designer & Front-end Engineer",
    date: "2023-2025",
    bgImage: eleoxBentoBg,
    images: [eleoxBentoBg],
  },
  {
    id: 3,
    title: "ABS Wavesight",
    client: "Adcetera Design Group",
    description:
      "The ABS Wavesight website was delivered as a highly collaborative, cross-disciplinary effort involving Client Services, UX/UI Design, Motion, Copywriting, and Engineering. ABS Wavesight provides advanced risk and performance analytics for the maritime and offshore industries, requiring a digital experience that balanced technical credibility with a modern, data-driven brand presence.\n\nServing as one of two front-end co-leads on the project, I partnered closely with my counterpart to divide and own front-end responsibilities end-to-end. I worked directly with UX and UI teams to translate complex client needs and design intent into scalable, production-ready solutions.\n\nIn addition to hands-on development, I supported sprint planning, helped define levels of effort for front-end tasks, and collaborated with project leadership to ensure scope, timelines, and technical constraints remained aligned throughout the build.\n\nUsing Drupal with Acquia Site Studio, I helped architect and implement a flexible, custom authoring experience that empowered content creators with fine-grained control over layout, spacing, color themes, animations, and component variations. The system included built-in authoring guidance to reduce errors, improve consistency, and streamline the content creation workflow.\n\nA key technical challenge involved adding full support for right-to-left (RTL) languages, including Arabic. This required careful coordination with design and motion teams to adapt ABS Wavesight’s distinctive angular visual language for RTL layouts without breaking visual hierarchy, animations, or component logic.\n\nThe final site features rich motion and interactivity, including custom-scripted animations and Lottie-based components designed to enhance storytelling while maintaining performance and accessibility standards suitable for an enterprise audience.",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.abswavesight.com/",
    role: "Front-end Co-Lead",
    date: "2023",
    bgImage: absWavesightBg,
    images: [
      absWavesightHome,
      absWavesightPortfolio,
      absWavesightRoles,
      absWavesightArabic,
    ],
  },
  {
    id: 2,
    title: "Loomis US",
    client: "Adcetera Design Group",
    description:
      "For **Loomis**, a global leader in secure cash handling and armored transport services, I served as one of two senior front-end developers responsible for delivering a complete website rebuild under a highly compressed timeline. The project focused on modernizing Loomis’ digital presence while supporting both enterprise and small-business audiences.\n\nWorking as part of a lean three-person team—two senior front-end developers and one junior backend engineer—we collaborated closely to deliver the project end-to-end in approximately eight weeks. Despite the aggressive schedule, the site launched on time and on budget with no major issues.\n\nI helped design and implement a scalable, component-based front-end system integrated with the Drupal CMS. This system enabled the Loomis team to manage and update content independently while maintaining visual consistency, accessibility, and performance across the site.\n\nThe website featured a robust online catalog showcasing Loomis products and services, along with interactive tools such as a custom ROI Calculator. The calculator allowed small businesses to estimate potential cost savings by using Loomis’ cash management and secure transport services, helping drive lead qualification and customer education directly through the site.\n\nThroughout the project, I worked closely with backend engineering to ensure smooth CMS integration, reliable data handling for interactive features, and a clean handoff for long-term maintenance. The result was a streamlined, high-performing platform delivered efficiently despite limited resources and a fast-moving timeline.",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.loomis.us",
    role: "Senior Front-End Developer",
    date: "2021",
    bgImage: loomisBentoBg,
    images: [loomisSlider1, loomisSlider2, loomisSlider3],
  },
  {
    id: 1,
    title: "KBR Inc.",
    client: "Adcetera Design Group",
    description:
      "At **Adcetera Design Group**, I was entrusted—just one month after joining the studio—with leading the largest and most complex project to date: a multi-million-dollar, four-month rebuild of **KBR**’s global website. This responsibility was awarded after I quickly demonstrated technical and leadership capability by contributing to Adcetera’s own rebranded website.\n\nI led a delivery team of two junior front-end engineers while working in close partnership with a backend engineer. I owned technical direction and execution, mentored and unblocked junior developers, and ensured the team stayed aligned on scope, quality, and timelines throughout the engagement.\n\nA core contribution was the design and implementation of a flexible, component-based system of reusable content blocks within Drupal. This empowered KBR’s internal teams to independently manage and scale content across the site without developer involvement. I worked closely with backend engineering to ensure seamless CMS integration, performance, and long-term maintainability.\n\nThe project required a significant content migration effort, including the transfer and restructuring of legacy articles, press releases, and enterprise content from KBR’s previous website. I helped plan and execute the migration strategy, ensuring content integrity, proper taxonomy mapping, and minimal disruption to ongoing business operations.\n\nAccessibility was a major focus of the project. I helped drive and implement compliance with **WCAG 2.1 AA** standards across the site, ensuring inclusive experiences through proper semantic markup, keyboard navigation, contrast requirements, and accessible component patterns suitable for a global enterprise audience.\n\nThe project also included a custom Google Maps integration to visualize KBR’s worldwide footprint, supporting a broader brand repositioning from an oil-and-gas services company to a world-class technology leader.\n\nThe award-nominated site increased users year-over-year by **12% within six months of launch**, while boosting **average time on site by 15%**. The work went on to win a **Gold ADDY Award** from the **American Advertising Federation (AAF) Houston**, in a highly competitive year against several of Houston’s top agencies, recognizing the project as **Best B2B Enterprise Website**.\n\nIn addition to the studio recognition, I was personally awarded **Team of Distinction** by Adcetera that year—an internal honor given to new hires who significantly exceed expectations—recognizing my leadership, impact, and contributions across one of the most demanding projects in the company’s portfolio.",
    subtitle: "Learn more",
    url: "https://www.google.com",
    date: "2019",
    role: "Front-End Lead",
    bgImage: kbrBentoBg,
    images: [kbrSlider1, kbrSlider2, kbrSlider3, kbrSlider4, kbrSlider5],
  },
  {
    id: 4,
    title: "Chevron Corporation",
    client: "Cella Consulting",
    description:
      "As a subcontractor embedded within **Chevron**’s internal in-house studio, I was brought in as a Lead Web Developer to stabilize and recover a high-risk, large-scale learning initiative that had fallen significantly behind schedule. The engagement centered on a seven-month program to deliver 12 highly interactive training modules, with only two months remaining before launch.\n\nI quickly assumed technical and delivery leadership for the project, auditing the existing work, restructuring the front-end approach, and establishing clear development standards and workflows. Over the following eight weeks, I led development while mentoring newly hired studio developers, unblocking technical bottlenecks, and restoring confidence across stakeholders. The team successfully delivered all 12 training modules on time, meeting Chevron’s original commitments and quality standards.\n\nThe modules were designed to educate Chevron’s global workforce on critical topics including field safety, health risks during international travel (such as mosquito-borne illnesses), and core Chevron cultural and compliance standards. Each experience emphasized interactivity and engagement to improve retention within the constraints of Chevron’s Learning Management System.\n\nAll work was required to align with Chevron’s newly launched brand system, which demanded close collaboration with Chevron brand specialists, internal designers, instructional designers, and motion and audio teams. I partnered cross-functionally to translate learning objectives into structured learning paths, ensure brand fidelity, and deliver precise front-end implementations that respected LMS limitations while still feeling modern and engaging.\n\nBeyond the flagship program, I also contributed to several internal initiatives, including the migration and re-branding of multiple SharePoint-based intranet sites across different Chevron business units to the new enterprise brand template.\n\nThe success of the project led to a sustained partnership with Chevron’s in-house studio, where I continued to provide technical guidance and support for subsequent web-based learning and internal communication efforts.",
    subtitle: "Learn more",
    url: "https://www.chevron.com",
    role: "Web Developer",
    date: "2016 - 2018",
    bgImage: chevronBentoBg,
    images: [chevronBentoBg],
  },
  {
    id: 7,
    title: "Vibe Debugging Pro",
    client: "Personal Project",
    description:
      "**Vibe Debugging Pro** is an experiment in offering a lightweight, productized service for builders who are exploring modern no-code and AI-assisted tools but don’t come from a traditional engineering background.\n\nAs tools like Lovable, Bolt, Replit, and similar platforms make it easier than ever to start building, I noticed a common pattern: people were excited to create, made strong early progress, and then hit a wall once something broke or behaved unexpectedly. Without an engineering foundation, many struggled to debug issues or reason about what the system was actually doing under the hood.\n\nI built Vibe Debugging Pro as a way to help unblock those builders and give them a clear path forward, without requiring them to fully “become engineers” just to continue their projects. The service focuses on clarity, practical guidance, and momentum rather than abstract theory.\n\nThe interface was designed quickly using **prompt-based design with Bolt.new**, allowing me to iterate rapidly on layout, tone, and visual hierarchy. After settling on a direction, I downloaded the generated files and continued refining the design locally, keeping the implementation intentionally simple as a plain HTML/CSS site.\n\nTo support payments, I integrated **Stripe Checkout**, configuring products and pricing directly in the Stripe Dashboard and wiring them into the site for a clean, frictionless checkout experience. This demonstrates my ability to add secure, production-ready payments to a site quickly, even without a complex frontend framework.\n\nOverall, Vibe Debugging Pro highlights my ability to identify real user friction in emerging AI workflows, design a focused solution around that need, and move from idea to launch quickly using AI-assisted tools and pragmatic engineering decisions.",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.vibedebugging.pro",
    role: "Product Designer & Engineer",
    date: "2026",
    bgImage: vdproBentoBg,
    images: [vdproSlider1, vdproSlider2, vdproSlider3],
    technologies: [
      "HTML / CSS",
      "Prompt-Based UI Design",
      "Bolt.new",
      "AI-Assisted Product Design",
      "No-Code / Low-Code Tooling",
      "Productized Services",
      "Stripe Checkout",
      "Stripe Dashboard",
      "Payments Integration",
      "Rapid Prototyping",
      "User-Centered Problem Discovery",
      "GitHub",
    ],
  },
];

const socials = [
  /*
  {
    icon: Instagram,
    url: "https://www.instagram.com/johnnycommits",
    label: "Instagram",
  },
  { icon: Twitter, url: "https://www.x.com/johnnycommits", label: "Twitter" },
  {
    icon: Youtube,
    url: "https://www.youtube.com/@JohnnyCommits",
    label: "YouTube",
  },
  { icon: Twitch, url: "https://www.twitch.tv/johnnycommits", label: "Twitch" },
  */
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/in/john-ludena",
    label: "LinkedIn",
  },
  { icon: Github, url: "https://github.com/johnnycommits", label: "GitHub" },
  { icon: Mail, url: "mailto:johnludena@gmail.com", label: "Email" },
  {
    icon: FileText,
    url: "/resume.pdf",
    label: "Resume",
    download: true,
    rel: "nofollow noopener noreferrer",
  },
];

export default function LinkInBio() {
  const featuredCard = bentoCards.find((c) => c.featured);
  const gridCards = bentoCards.filter((c) => !c.featured);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isTechOpen, setIsTechOpen] = useState(false);

  useEffect(() => {
    if (!selectedProject) {
      setIsTechOpen(false);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (canvasRef.current) {
      const stars = new Stars(canvasRef.current, {
        speed: 0.01,
        number: 800,
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="stars-container absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="block" />
      </div>
      <div className="mx-auto max-w-[600px] px-4 py-6 pb-8 relative z-10">
        <header className="text-center mb-5 opacity-0 animate-fade-in-up">
          <div className="avatar-ring inline-block mb-3">
            <img
              src={profile.avatar}
              alt={profile.name}
              data-testid="avatar-image"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <h1
            className="text-xl font-bold text-[hsl(var(--foreground))] mb-0.5"
            data-testid="text-profile-name"
          >
            {profile.name}
          </h1>
          <p
            className="text-sm text-[hsl(var(--muted-foreground))] mb-2"
            data-testid="text-profile-handle"
          >
            {profile.handle}
          </p>
          <div
            className="text-sm text-[hsl(var(--foreground))] leading-relaxed max-w-[500px] mx-auto opacity-90 space-y-3"
            data-testid="text-profile-bio"
          >
            <p>
              Senior Frontend Engineer with 10+ years of experience shipping digital
              products for startups, agencies, and Fortune 500 companies.
            </p>
            <p>
              I bridge design and engineering, using modern AI-assisted workflows to move quickly from ideas to polished, production-ready products.
            </p>
          </div>
        </header>

        <TooltipProvider>
          <div className="flex justify-center gap-3 mb-5 opacity-0 animate-fade-in-up stagger-1">
            {socials.map((social) => (
              <Tooltip key={social.label}>
                <TooltipTrigger asChild>
                  <a
                    href={social.url}
                    aria-label={social.label}
                    target="_blank"
                    rel={social.rel || "noopener noreferrer"}
                    download={social.download}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                    className="social-icon w-9 h-9 flex items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
                  >
                    <social.icon size={18} strokeWidth={1.5} />
                  </a>
                </TooltipTrigger>
                <TooltipContent className="bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))] border-[hsl(var(--border))] rounded-lg px-2.5 py-1 text-[11px] font-medium shadow-md">
                  <p>{social.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        <div className="space-y-3">
          {featuredCard && (
            <button
              onClick={() => setSelectedProject(featuredCard)}
              data-testid={`bento-card-${featuredCard.id}`}
              className="bento-card opacity-0 animate-fade-in-up stagger-2 block w-full rounded-2xl overflow-hidden relative aspect-video group text-left cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${featuredCard.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-300 group-hover:opacity-0" />

              <div className="absolute top-4 left-5 z-20">
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles size={10} className="fill-white" />
                  Featured
                </span>
              </div>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />

              <div className="relative h-full flex flex-col justify-end p-5 transition-all duration-300 group-hover:translate-y-[-4px]">
                <h3 className="text-xl font-bold text-white mb-1">
                  {featuredCard.title}
                </h3>
                <p className="text-sm text-white/80 flex items-center gap-1">
                  {featuredCard.subtitle} <Maximize2 size={14} />
                </p>
              </div>
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            {gridCards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => setSelectedProject(card)}
                data-testid={`bento-card-${card.id}`}
                className={`bento-card opacity-0 animate-fade-in-up stagger-${index + 3} block rounded-2xl overflow-hidden relative aspect-video group text-left cursor-pointer`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-0" />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4" />

                <div className="relative h-full flex flex-col justify-end p-4 transition-all duration-300 group-hover:translate-y-[-4px]">
                  <h3 className="text-base font-bold text-white mb-0.5 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/75 leading-snug flex items-center gap-1">
                    {card.subtitle} <Maximize2 size={14} />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <footer className="mt-12 mb-8 text-center opacity-0 animate-fade-in-up stagger-5">
          <p className="text-[11px] text-[hsl(var(--muted-foreground))] opacity-80 font-medium tracking-wide uppercase">
            Made with ❤️ under Texas skies
          </p>
        </footer>

        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => !open && setSelectedProject(null)}
        >
          <DialogContent className="max-w-[600px] w-[95%] h-[90vh] rounded-3xl p-0 overflow-hidden border-none bg-[hsl(var(--background))] text-[hsl(var(--foreground))] aurora-modal flex flex-col">
            {selectedProject && (
              <>
                <div className="relative w-full aspect-video shrink-0">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                      {selectedProject.images?.map(
                        (img: string, idx: number) => (
                          <CarouselItem key={idx} className="h-full">
                            <img
                              src={img}
                              alt={`Slide ${idx}`}
                              className="w-full h-full object-cover"
                            />
                          </CarouselItem>
                        ),
                      )}
                    </CarouselContent>
                    {selectedProject.images && selectedProject.images.length > 1 && (
                      <>
                        <CarouselPrevious className="left-2 bg-black/20 border-white/20 text-white hover:bg-black/40" />
                        <CarouselNext className="right-2 bg-black/20 border-white/20 text-white hover:bg-black/40" />
                      </>
                    )}
                  </Carousel>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-50 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide pb-24">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      {selectedProject.title}
                    </h2>
                    
                    <div className="border-t border-[hsl(var(--border))] py-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[hsl(var(--muted-foreground))] opacity-50">
                          Client
                        </span>
                        <p className="text-[11px] text-[hsl(var(--foreground))] font-medium">
                          {selectedProject.client}
                        </p>
                      </div>
                      {selectedProject.role && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[hsl(var(--muted-foreground))] opacity-50">
                            Role
                          </span>
                          <p className="text-[11px] text-[hsl(var(--foreground))] font-medium">
                            {selectedProject.role}
                          </p>
                        </div>
                      )}
                      {selectedProject.date && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[hsl(var(--muted-foreground))] opacity-50">
                            Date
                          </span>
                          <p className="text-[11px] text-[hsl(var(--foreground))] font-medium">
                            {selectedProject.date}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border-y border-[hsl(var(--border))] py-3">
                      <button
                        onClick={() => setIsTechOpen(!isTechOpen)}
                        className="flex items-center justify-between w-full group"
                      >
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[hsl(var(--muted-foreground))] opacity-50">
                          Tools & Technologies
                        </span>
                        {isTechOpen ? (
                          <Minus size={14} className="text-[hsl(var(--muted-foreground))]" />
                        ) : (
                          <Plus size={14} className="text-[hsl(var(--muted-foreground))]" />
                        )}
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isTechOpen
                            ? "grid-rows-[1fr] opacity-100 mt-2"
                            : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-wrap gap-2">
                            {(selectedProject.technologies || ["React.js", "Next.js", "TypeScript", "Node.js"]).map(
                              (tech: string) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-[10px] font-medium border border-[hsl(var(--border))]"
                                >
                                  {tech}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none pt-2">
                    <div className="text-sm leading-relaxed text-[hsl(var(--foreground))] opacity-90 space-y-4 whitespace-pre-line">
                      {selectedProject.description.split("\n\n").map((text: string, i: number) => {
                        const parts = text.split(/(\*\*.*?\*\*)/g);
                        return (
                          <p key={i}>
                            {parts.map((part, j) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return <strong key={j}>{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))] to-transparent">
                  {selectedProject.cta && selectedProject.url && !([1, 4].includes(selectedProject.id)) && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-2xl font-bold text-center block transition-transform active:scale-[0.98] shadow-lg"
                    >
                      {selectedProject.cta}
                    </a>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
