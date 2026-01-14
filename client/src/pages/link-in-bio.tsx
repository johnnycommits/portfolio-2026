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
  ExternalLink
} from "lucide-react";
// @ts-ignore
import Stars from "@/lib/stars";
import profileImage from "@assets/John_Ludena_1768408996520.png";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

const profile = {
  name: "John Ludena",
  handle: "@johnnycommits",
  bio: "Project Manager with 10+ years of experience building and shipping software products for both startups and large businesses. I bridge execution and design, with a sharp eye for UX that turns ideas into clean, user-centered, high-impact products.",
  avatar: profileImage
};

const bentoCards = [
  {
    id: 1,
    title: "Pomodoro Champion",
    client: "FocusApp Inc.",
    description: "A comprehensive productivity suite designed to maximize deep work sessions. This project involved deep UX research into habit formation and focus triggers.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.google.com",
    featured: true,
    bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80"
    ]
  },
  {
    id: 2,
    title: "Vibe Debugging Pro",
    client: "StartupX",
    description: "A specialized consulting platform that helps teams identify cultural and process bottlenecks. We built a custom assessment engine and dashboard.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    subtitle: "Learn more",
    cta: "Visit Website",
    url: "https://www.google.com",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      "https://images.unsplash.com/photo-1531403001884-26976222c688?w=800&q=80"
    ]
  },
  {
    id: 3,
    title: "Resume",
    client: "Professional Portfolio",
    description: "A curated collection of my professional journey, skills, and impact over the last decade in software project management.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    subtitle: "Learn more",
    cta: "Download PDF",
    url: "https://www.google.com",
    bgImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80"
    ]
  }
];

const socials = [
  { icon: Instagram, url: "#", label: "Instagram" },
  { icon: Twitter, url: "#", label: "Twitter" },
  { icon: Youtube, url: "#", label: "YouTube" },
  { icon: Twitch, url: "#", label: "Twitch" },
  { icon: Linkedin, url: "#", label: "LinkedIn" },
  { icon: Github, url: "#", label: "GitHub" },
  { icon: Mail, url: "#", label: "Email" }
];

export default function LinkInBio() {
  const featuredCard = bentoCards.find(c => c.featured);
  const gridCards = bentoCards.filter(c => !c.featured);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const stars = new Stars(canvasRef.current, {
        speed: 0.01,
        number: 800,
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      const handleResize = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="stars-container absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="block" />
      </div>
      <div className="mx-auto max-w-[430px] px-4 py-6 pb-8 relative z-10">
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
            className="text-sm text-[hsl(var(--foreground))] leading-relaxed max-w-[320px] mx-auto opacity-90 space-y-3"
            data-testid="text-profile-bio"
          >
            <p>Project Manager with 10+ years of experience building and shipping software products for both startups and large businesses.</p>
            <p>I bridge execution and design, with a sharp eye for UX that turns ideas into clean, user-centered, high-impact products.</p>
          </div>
        </header>

        <div className="flex justify-center gap-3 mb-5 opacity-0 animate-fade-in-up stagger-1">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              aria-label={social.label}
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
              className="bento-card opacity-0 animate-fade-in-up stagger-2 block w-full rounded-2xl overflow-hidden relative h-44 group text-left cursor-pointer"
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
                <h3 className="text-xl font-bold text-white mb-1">{featuredCard.title}</h3>
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
                className={`bento-card opacity-0 animate-fade-in-up stagger-${index + 3} block rounded-2xl overflow-hidden relative h-36 group text-left cursor-pointer`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4" />
                
                <div className="relative h-full flex flex-col justify-end p-4 transition-all duration-300 group-hover:translate-y-[-4px]">
                  <h3 className="text-base font-bold text-white mb-0.5 leading-tight">{card.title}</h3>
                  <p className="text-xs text-white/75 leading-snug flex items-center gap-1">
                    {card.subtitle} <Maximize2 size={14} />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-[430px] w-[95%] h-[90vh] rounded-3xl p-0 overflow-hidden border-none bg-[hsl(var(--background))] text-[hsl(var(--foreground))] aurora-modal flex flex-col">
            {selectedProject && (
              <>
                <div className="relative h-64 w-full shrink-0">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-64">
                      {selectedProject.images?.map((img: string, idx: number) => (
                        <CarouselItem key={idx} className="h-full">
                          <img src={img} alt={`Slide ${idx}`} className="w-full h-full object-cover" />
                        </CarouselItem>
                      ))}
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
                    <h2 className="text-2xl font-bold mb-1">{selectedProject.title}</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] uppercase tracking-widest font-semibold">
                      Client: {selectedProject.client}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-[hsl(var(--border))] pb-2">About Project</h3>
                    <div className="text-[hsl(var(--foreground))] opacity-80 leading-relaxed text-[15px] space-y-4 whitespace-pre-line">
                      {selectedProject.description}
                    </div>
                  </div>
                </div>

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
              </>
            )}
          </DialogContent>
        </Dialog>

        <footer className="mt-8 text-center opacity-0 animate-fade-in-up stagger-6">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Made with ❤️ using Replit
          </p>
        </footer>
      </div>
    </div>
  );
}
