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
      "<p>During a recent Texas storm, I kept refreshing ERCOT's dashboard trying to figure out if the grid was actually okay or if I should be worried. The data was all there, but it felt like work to interpret it. I just wanted a simple answer: is the Texas grid healthy right now?</p><p>That evening, I decided to build that simple answer.</p><p>Started in Figma Make, which let me iterate on the UI through prompts instead of staring at a blank canvas. Got the mobile view dialed in pretty quickly since I figured most people would be checking on their phones.</p><p>Then I used Figma MCP to pass the design context directly into Cursor, where Claude Sonnet 4.5 generated the initial code. I was honestly expecting to do a lot of cleanup, but it came through almost exactly as designed.</p><p>The backend work took the most time—not because it was complicated, but because I needed to understand what ERCOT's data actually meant. I integrated their public APIs for supply, demand, and Physical Responsive Capability (PRC), making sure to separate real-time vs forecast data since that distinction matters when people are trying to assess risk.</p><p>Used Next.js to quickly create an API route that fetches from ERCOT, normalizes the data, and caches responses so the site would stay fast even if a lot of people hit it at once. Deployed the whole thing on Vercel.</p><p>Posted it on Reddit during the storm. Got a bunch of comments from people who just wanted a calm, clear way to check the grid without feeling like they needed a degree in energy systems. A few folks even wired it into their Home Assistant setups, which was cool to see.</p><p>Whole thing took about six hours, mostly spent figuring out ERCOT's data structure. What stuck with me: this Figma Make → MCP → Cursor flow removes a lot of friction between 'I have an idea' and 'here's a working thing.'</p>",
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
      "<p>Eleox was a lean energy software startup with fewer than 12 engineers. I was the only product designer and also worked as a front-end engineer, which meant I owned the full design-to-implementation process.</p><p>The main product was OxNom, a natural gas nomination tool used by energy traders and operations teams. These workflows are dense, time-sensitive, and full of industry-specific rules. My job was to turn that complexity into something clear and usable that people could trust for daily decisions.</p><p>I built interactive Sketch prototypes for every major feature before we wrote any code. Leadership and stakeholders could click through the full workflow, give feedback early, and sign off before development started. Once approved, I'd often build the feature myself or support other engineers with UI architecture and interaction guidance.</p><p>After a company-wide rebrand, I led the platform UI refresh—redesigned layouts, refactored React components to match the new visual system, and built a more modular component foundation that improved consistency and made future work easier.</p><p>Beyond feature work, I acted as the UI authority for the team, helping engineers get unblocked on implementation challenges and keeping design quality consistent across the product. I also contributed to user testing and expanded our end-to-end test coverage with Cypress to make sure critical workflows stayed stable as we scaled.</p>",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.eleox.com",
    role: "Product Designer & Front-end Engineer",
    date: "2023-2025",
    bgImage: eleoxBentoBg,
    images: [eleoxBentoBg],
    technologies: [
      "React",
      "Redux",
      "Tailwind",
      "SCSS",
      "React Query",
      "Product Design",
      "Prototype Design",
      "Sketch",
      "REST API Integration",
      "OpenAI API integration",
    ],
  },
  {
    id: 3,
    title: "ABS Wavesight",
    client: "Adcetera Design Group",
    description:
      "<p>ABS Wavesight provides risk and performance analytics for the maritime and offshore industries. They needed a site that felt modern and data-driven while still carrying the technical credibility their industry expects.</p><p>I was one of two front-end co-leads on the project. We split responsibilities and worked closely with the UX/UI team to turn complex requirements and design concepts into something that actually worked at scale.</p><p>Beyond building, I helped with sprint planning and scoping out how long front-end work would take, making sure timelines and technical realities stayed aligned.</p><p>We built the site in Drupal using Acquia Site Studio, a low-code tool that let us build and modify themes visually through drag-and-drop editors. You still needed front-end skills (HTML, CSS, jQuery for interactivity), but it meant we could make template changes without touching Twig files or PHP and going through full redeployments. Made iteration a lot faster.</p><p>One of the trickier challenges was adding full right-to-left (RTL) language support for Arabic. ABS Wavesight has a pretty distinctive angular visual style, and making that work in RTL without breaking the hierarchy or animations required close coordination with the design and motion teams.</p><p>The final site has a lot of motion and interactivity—custom animations and Lottie components that help tell the story without sacrificing performance or accessibility.</p>",
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
    technologies: [
      "Drupal CMS",
      "Acquia Site Studio",
      "Twig templating",
      "SCSS",
      "jQuery",
      "Lottie Animation",
      "Webpack",
      "Multi Language Support",
    ],
  },
  {
    id: 2,
    title: "Loomis US",
    client: "Adcetera Design Group",
    description:
      "<p>Loomis handles secure cash transport and armored trucks—basically, they move money safely and sell products like safes to businesses. They needed a full website rebuild, and the timeline was tight.</p><p>I was one of two senior front-end devs on a small team: me, another senior dev, and a junior backend engineer. Three people, eight weeks, full site rebuild. We hit the deadline with no major issues.</p><p>The main technical work was building a scalable component system in Drupal with Layout Builder, giving Loomis' content team flexibility to arrange and manage their own pages without needing us for every update. Had to keep things consistent, accessible, and fast across the board.</p><p>The site included a full product catalog and some interactive tools. The most interesting piece was a custom ROI Calculator that let small businesses estimate how much they could save by using Loomis' services instead of handling cash themselves. It helped qualify leads and made the pitch more concrete.</p><p>Worked closely with our backend developer to make sure the CMS integration was solid and the interactive features had reliable data handling. Clean handoff, maintainable codebase, delivered on time and on budget.</p>",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.loomis.us",
    role: "Senior Front-End Developer",
    date: "2021",
    bgImage: loomisBentoBg,
    images: [loomisSlider1, loomisSlider2, loomisSlider3],
    technologies: [
      "Drupal CMS",
      "Twig templating",
      "Bootstrap",
      "SCSS",
      "JavaScript",
      "jQuery",
      "Webpack",
    ],
  },
  {
    id: 1,
    title: "KBR Inc.",
    client: "Adcetera Design Group",
    description:
      "<p>About a month after joining Adcetera, they handed me the biggest project the studio had taken on: a full rebuild of KBR's global website. Four months, multi-million-dollar budget, and a lot riding on it.</p><p>I led a small team—two junior front-end engineers and worked closely with the backend team. My job was to keep things on track, unblock the juniors when they got stuck, and make sure we were building something that would actually scale.</p><p>The big technical piece was designing a flexible component system in Drupal so KBR's team could manage their own content without needing a developer every time they wanted to update a page. Worked with backend developers to make sure the CMS integration was solid and performant.</p><p>We also migrated a ton of legacy content—articles, press releases, all the enterprise stuff from their old site. Had to make sure nothing broke and the taxonomy made sense going forward.</p><p>Accessibility was non-negotiable. We built to WCAG 2.1 AA standards across the board: semantic markup, keyboard navigation, proper contrast, all of it. For a global company like KBR, that wasn't optional.</p><p>One of the more interesting pieces was the custom Google Maps integration for their Locations page. We set it up so users would see a branded map on the right and filterable location cards on the left—kind of like a real estate search interface. The filters would update both the map pins and the cards simultaneously, making it easy to narrow down KBR's global presence by region, service type, or whatever criteria mattered.</p><p>The site performed well after launch—12% increase in users and 15% boost in time on site within six months. It won a Gold ADDY Award from AAF Houston for Best B2B Enterprise Website that year, which was cool since the competition included some of Houston's biggest agencies.</p><p>Adcetera gave me their Team of Distinction award that year, which they give to new hires who go above expectations.</p>",
    subtitle: "Learn more",
    url: "https://www.google.com",
    date: "2019",
    role: "Front-End Lead",
    bgImage: kbrBentoBg,
    images: [kbrSlider1, kbrSlider2, kbrSlider3, kbrSlider4, kbrSlider5],
    technologies: [
      "Drupal CMS",
      "Twig templating",
      "React",
      "SCSS",
      "JavaScript",
      "jQuery",
      "Webpack",
      "Multi Language Support",
    ],
  },
  {
    id: 4,
    title: "Chevron Corporation",
    client: "Cella Consulting",
    description:
      "Chevron's internal studio brought me in to rescue a training project that was in rough shape. They had committed to delivering 12 interactive training modules in seven months, and with two months left, they were way behind.\n\nI came in as Lead Web Developer, audited what existed, restructured the front-end approach, and set up clearer workflows. Spent the next eight weeks building modules while mentoring the newly hired devs on the team and unblocking whatever was slowing things down. We hit the deadline—all 12 modules delivered on time.\n\nThe modules covered stuff that actually mattered to Chevron's workforce: field safety protocols, health risks during international travel (mosquito-borne illnesses, etc.), and core company compliance standards. Everything had to work within their existing Learning Management System, which meant balancing interactivity with real technical constraints.\n\nChevron had just rolled out a new brand system, so every module needed to align with updated brand guidelines. I worked closely with their brand team, instructional designers, and motion/audio folks to make sure the learning objectives translated into something that felt cohesive and polished.\n\nI also helped migrate a bunch of SharePoint intranet sites across different business units to match the new enterprise brand template.\n\nThe project went well enough that they kept me around for follow-up work on other web-based learning and internal communication projects.",
    subtitle: "Learn more",
    url: "https://www.chevron.com",
    role: "Web Developer",
    date: "2016 - 2018",
    bgImage: chevronBentoBg,
    images: [chevronBentoBg],
    technologies: [
      "JavaScript",
      "jQuery",
      "CSS",
      "Sharepoint",
      "Instructional Design",
      "User Interface Design",
    ],
  },
  {
    id: 7,
    title: "Vibe Debugging Pro",
    client: "Personal Project",
    description:
      "I kept seeing the same pattern: people were having a blast building with tools like Lovable, Bolt, and Replit—until something broke. Then they'd hit a wall.\n\nThese AI coding tools are great at getting you 80% of the way there, but when things go sideways, you're suddenly expected to debug like an engineer. Most people don't have that background, and honestly, they shouldn't need it just to keep their project moving.\n\nSo I built Vibe Debugging Pro as a productized service to help people get unstuck. No jargon, no \"let me rewrite your entire codebase\"—just clear explanations of what's happening and how to fix it so they can keep building.\n\nThe site itself is pretty simple. Built the initial version with Bolt.new using prompt-based design, downloaded the files, and refined it locally as a straightforward HTML/CSS site. Wired up Stripe Checkout for payments—configured everything in the Stripe Dashboard and kept the implementation clean.\n\nWhole thing went from idea to live in about a weekend.",
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
      "Firebase Hosting",
      "User-Centered Problem Discovery",
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
                        <CarouselPrevious className="left-2 bg-black/20 border-white/20 text-white hover:bg-black/40 cursor-pointer" />
                        <CarouselNext className="right-2 bg-black/20 border-white/20 text-white hover:bg-black/40 cursor-pointer" />
                      </>
                    )}
                  </Carousel>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-50 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full p-2 hover:bg-black/60 transition-colors cursor-pointer"
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
                        className="flex items-center justify-between w-full group cursor-pointer"
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
                    {selectedProject.description.includes('<p>') ? (
                      <div 
                        className="text-sm leading-relaxed text-[hsl(var(--foreground))] opacity-90 [&>p]:mb-4 [&>p:last-child]:mb-0"
                        dangerouslySetInnerHTML={{ __html: selectedProject.description }}
                      />
                    ) : (
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
                    )}
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
