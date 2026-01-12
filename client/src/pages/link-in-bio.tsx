import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Github,
  Mail,
  Twitch
} from "lucide-react";

const profile = {
  name: "Alex Morgan",
  handle: "@alexmorgan",
  bio: "Product Engineer with over 10+ years of experience building websites for startups and Fortune 500 enterprises.",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
};

const bentoCards = [
  {
    id: 1,
    title: "Pomodoro Champion",
    subtitle: "Focus or die",
    url: "#",
    featured: true,
    bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
  },
  {
    id: 2,
    title: "Vibe Debugging Pro",
    subtitle: "Book a call and get unstuck fast",
    url: "#",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80"
  },
  {
    id: 3,
    title: "Resume",
    subtitle: "Download a copy of my resume",
    url: "#",
    bgImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80"
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

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-[430px] px-4 py-6 pb-8">
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
          <p 
            className="text-sm text-[hsl(var(--foreground))] leading-relaxed max-w-[320px] mx-auto opacity-90"
            data-testid="text-profile-bio"
          >
            {profile.bio}
          </p>
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
            <a
              href={featuredCard.url}
              data-testid={`bento-card-${featuredCard.id}`}
              className="bento-card opacity-0 animate-fade-in-up stagger-2 block w-full rounded-2xl overflow-hidden relative h-44"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredCard.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              <div className="relative h-full flex flex-col justify-end p-5">
                <h3 className="text-xl font-bold text-white mb-1">{featuredCard.title}</h3>
                <p className="text-sm text-white/80">{featuredCard.subtitle}</p>
              </div>
            </a>
          )}

          <div className="grid grid-cols-2 gap-3">
            {gridCards.map((card, index) => (
              <a
                key={card.id}
                href={card.url}
                data-testid={`bento-card-${card.id}`}
                className={`bento-card opacity-0 animate-fade-in-up stagger-${index + 3} block rounded-2xl overflow-hidden relative h-36`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="relative h-full flex flex-col justify-end p-4">
                  <h3 className="text-base font-bold text-white mb-0.5 leading-tight">{card.title}</h3>
                  <p className="text-xs text-white/75 leading-snug">{card.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-8 text-center opacity-0 animate-fade-in-up stagger-6">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Made with ♥
          </p>
        </footer>
      </div>
    </div>
  );
}
