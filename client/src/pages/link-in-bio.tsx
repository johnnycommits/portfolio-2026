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
} from "lucide-react";
// @ts-ignore
import Stars from "@/lib/stars";
import profileImage from "@assets/John_Ludena_1768408996520.png";
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
import chevronBentoBg from "../assets/chevron-bento.jpg";
import eleoxBentoBg from "../assets/eleox-bento.jpg";

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
  bio: "Product Engineer with 10+ years of experience building and shipping software products for both startups and large businesses. I bridge execution and design, with a sharp eye for UX that turns ideas into clean, user-centered, high-impact products.",
  avatar: profileImage,
};

const bentoCards = [
  {
    id: 1,
    title: "KBR Inc.",
    client: "Adcetera Design Group",
    description:
      "At **Adcetera Design Group**, I was entrusted—just one month after joining the studio—with leading the largest and most complex project to date: a multi-million-dollar, four-month rebuild of **KBR**’s global website. This responsibility was awarded after I quickly demonstrated technical and leadership capability by contributing to Adcetera’s own rebranded website.\n\nI led a delivery team of two junior front-end engineers while working in close partnership with a backend engineer. I owned technical direction and execution, mentored and unblocked junior developers, and ensured the team stayed aligned on scope, quality, and timelines throughout the engagement.\n\nA core contribution was the design and implementation of a flexible, component-based system of reusable content blocks within Drupal. This empowered KBR’s internal teams to independently manage and scale content across the site without developer involvement. I worked closely with backend engineering to ensure seamless CMS integration, performance, and long-term maintainability.\n\nThe project required a significant content migration effort, including the transfer and restructuring of legacy articles, press releases, and enterprise content from KBR’s previous website. I helped plan and execute the migration strategy, ensuring content integrity, proper taxonomy mapping, and minimal disruption to ongoing business operations.\n\nAccessibility was a major focus of the project. I helped drive and implement compliance with **WCAG 2.1 AA** standards across the site, ensuring inclusive experiences through proper semantic markup, keyboard navigation, contrast requirements, and accessible component patterns suitable for a global enterprise audience.\n\nThe project also included a custom Google Maps integration to visualize KBR’s worldwide footprint, supporting a broader brand repositioning from an oil-and-gas services company to a world-class technology leader.\n\nThe award-nominated site increased users year-over-year by **12% within six months of launch**, while boosting **average time on site by 15%**. The work went on to win a **Gold ADDY Award** from the **American Advertising Federation (AAF) Houston**, in a highly competitive year against several of Houston’s top agencies, recognizing the project as **Best B2B Enterprise Website**.\n\nIn addition to the studio recognition, I was personally awarded **Team of Distinction** by Adcetera that year—an internal honor given to new hires who significantly exceed expectations—recognizing my leadership, impact, and contributions across one of the most demanding projects in the company’s portfolio.",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.google.com",
    date: "2019",
    role: "Front-End Lead",
    featured: true,
    bgImage: kbrBentoBg,
    images: [
      kbrSlider1,
      kbrSlider2,
      kbrSlider3,
      kbrSlider4,
      kbrSlider5,
    ],
  },
  {
    id: 2,
    title: "Loomis US, LLC",
    client: "Adcetera Design Group",
    description:
      "For **Loomis**, a global leader in secure cash handling and armored transport services, I served as one of two senior front-end developers responsible for delivering a complete website rebuild under a highly compressed timeline. The project focused on modernizing Loomis’ digital presence while supporting both enterprise and small-business audiences.\n\nWorking as part of a lean three-person team—two senior front-end developers and one junior backend engineer—we collaborated closely to deliver the project end-to-end in approximately eight weeks. Despite the aggressive schedule, the site launched on time and on budget with no major issues.\n\nI helped design and implement a scalable, component-based front-end system integrated with the Drupal CMS. This system enabled the Loomis team to manage and update content independently while maintaining visual consistency, accessibility, and performance across the site.\n\nThe website featured a robust online catalog showcasing Loomis products and services, along with interactive tools such as a custom ROI Calculator. The calculator allowed small businesses to estimate potential cost savings by using Loomis’ cash management and secure transport services, helping drive lead qualification and customer education directly through the site.\n\nThroughout the project, I worked closely with backend engineering to ensure smooth CMS integration, reliable data handling for interactive features, and a clean handoff for long-term maintenance. The result was a streamlined, high-performing platform delivered efficiently despite limited resources and a fast-moving timeline.",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.loomis.us",
    role: "Senior Front-End Developer",
    date: "2020",
    bgImage: loomisBentoBg,
    images: [
      loomisSlider1,
      loomisSlider2,
      loomisSlider3,
    ],
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
    id: 4,
    title: "Chevron Corporation",
    client: "Adcetera Design Group",
    description:
      "Working with **Chevron**, one of the world's largest energy corporations, I led front-end development on a series of high-impact digital initiatives aimed at modernizing their corporate communications and recruitment platforms.\n\nA key focus was the development of a high-performance, accessible content framework that allowed Chevron's global teams to deploy localized content across multiple regions while maintaining strict brand consistency and security standards.\n\nI collaborated closely with stakeholders to implement complex data visualizations and interactive maps that showcase Chevron's global operations and sustainability initiatives. The project required rigorous performance optimization to ensure fast load times across varying network conditions in international markets.\n\nThe resulting platform significantly improved user engagement and streamlined the content publishing workflow for Chevron's internal communications teams.",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.chevron.com",
    role: "Front-End Lead",
    date: "2021",
    bgImage: chevronBentoBg,
    images: [
      chevronBentoBg, // Using bento as placeholder for now since no slider images provided
    ],
  },
  {
    id: 5,
    title: "Eleox, LLC",
    client: "Adcetera Design Group",
    description:
      "For **Eleox**, a technology provider for the energy industry, I contributed to the design and development of their digital brand presence, focusing on a clean, modern aesthetic that reflects their innovative approach to energy logistics.\n\nI worked on implementing a responsive, component-based front-end that highlights their core service offerings and technology platform. The project involved creating custom illustrations and animated elements to explain complex logistics processes in a user-friendly way.\n\nThe final site provides a professional and engaging platform for Eleox to showcase their solutions to enterprise clients in the energy sector.",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.eleox.com",
    role: "Front-End Developer",
    date: "2022",
    bgImage: eleoxBentoBg,
    images: [
      eleoxBentoBg, // Using bento as placeholder
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
];

export default function LinkInBio() {
  const featuredCard = bentoCards.find((c) => c.featured);
  const gridCards = bentoCards.filter((c) => !c.featured);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

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
            className="text-sm text-[hsl(var(--foreground))] leading-relaxed max-w-[450px] mx-auto opacity-90 space-y-3"
            data-testid="text-profile-bio"
          >
            <p>
              Product Engineer with 10+ years of experience shipping digital products for startups, agencies, and Fortune 500 companies.
            </p>
            <p>
              I bridge design and engineering, bringing strong UX instincts and execution speed to turn complex ideas into clear, high-impact products.
            </p>
          </div>
        </header>

        <div className="flex justify-center gap-3 mb-5 opacity-0 animate-fade-in-up stagger-1">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-social-${social.label.toLowerCase()}`}
              className="social-icon w-9 h-9 flex items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
            >
              <social.icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </div>

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
                    <CarouselPrevious className="left-2 bg-black/20 border-white/20 text-white hover:bg-black/40" />
                    <CarouselNext className="right-2 bg-black/20 border-white/20 text-white hover:bg-black/40" />
                  </Carousel>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 z-50 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full p-2 hover:bg-black/60 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide pb-24">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[hsl(var(--muted-foreground))] opacity-50">Client</span>
                        <p className="text-[11px] text-[hsl(var(--foreground))] font-medium">
                          {selectedProject.client}
                        </p>
                      </div>
                      {selectedProject.role && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[hsl(var(--muted-foreground))] opacity-50">Role</span>
                          <p className="text-[11px] text-[hsl(var(--foreground))] font-medium">
                            {selectedProject.role}
                          </p>
                        </div>
                      )}
                      {selectedProject.date && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[hsl(var(--muted-foreground))] opacity-50">Date</span>
                          <p className="text-[11px] text-[hsl(var(--foreground))] font-medium">
                            {selectedProject.date}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-[hsl(var(--border))] pb-2">
                      About This Project
                    </h3>
                    <div className="text-[hsl(var(--foreground))] opacity-80 leading-relaxed text-[15px] space-y-4 whitespace-pre-line">
                      {selectedProject.description.split('\n\n').map((paragraph, i) => (
                        <p key={i}>
                          {paragraph.split(/(\*\*.*?\*\*)/).map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={j} className="text-[hsl(var(--foreground))] font-bold">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedProject.id !== 1 && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))/90] to-transparent pointer-events-none">
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity pointer-events-auto shadow-xl"
                    >
                      {selectedProject.cta} <ExternalLink size={18} />
                    </a>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>

        <footer className="mt-8 text-center opacity-0 animate-fade-in-up stagger-6">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Made with ❤️ in Houston, TX
          </p>
        </footer>
      </div>
    </div>
  );
}
