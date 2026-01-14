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
  ChevronRight,
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
    description: "A comprehensive productivity suite designed to maximize deep work sessions. This project involved deep UX research into habit formation and focus triggers.",
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
    description: "A specialized consulting platform that helps teams identify cultural and process bottlenecks. We built a custom assessment engine and dashboard.",
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
    description: "A curated collection of my professional journey, skills, and impact over the last decade in software project management.",
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
      <div className="stars-container">
        <canvas ref={canvasRef} />
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

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-sm border border-white px-4 py-1.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 min-w-[120px] text-center flex items-center justify-center gap-2">
                  Learn more <ChevronRight size={14} />
                </span>
              </div>
              
              <div className="relative h-full flex flex-col justify-end p-5 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                <h3 className="text-xl font-bold text-white mb-1">{featuredCard.title}</h3>
                <p className="text-sm text-white/80 flex items-center gap-1">
                  {featuredCard.subtitle} <ChevronRight size={14} />
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
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <span className="text-white font-bold text-sm border border-white px-4 py-1.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 min-w-[120px] text-center flex items-center justify-center gap-1">
                    Learn more <ChevronRight size={14} />
                  </span>
                </div>
                
                <div className="relative h-full flex flex-col justify-end p-4 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                  <h3 className="text-base font-bold text-white mb-0.5 leading-tight">{card.title}</h3>
                  <p className="text-xs text-white/75 leading-snug flex items-center gap-1">
                    {card.subtitle} <ChevronRight size={14} />
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-[430px] w-[95%] rounded-3xl p-0 overflow-hidden border-none bg-[hsl(var(--background))] text-[hsl(var(--foreground))] aurora-modal">
            {selectedProject && (
              <>
                <div className="relative h-64 w-full">
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

                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedProject.title}</h2>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] uppercase tracking-widest font-semibold">
                      Client: {selectedProject.client}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-[hsl(var(--border))] pb-2">About Project</h3>
                    <p className="text-[hsl(var(--foreground))] opacity-80 leading-relaxed text-[15px]">
                      {selectedProject.description}
                    </p>
                  </div>

                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity mt-4"
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
            Made with ♥
          </p>
        </footer>
      </div>
    </div>
  );
}


        <footer className="mt-8 text-center opacity-0 animate-fade-in-up stagger-6">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Made with ♥
          </p>
        </footer>
      </div>
    </div>
  );
}

