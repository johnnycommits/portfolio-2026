import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Github,
  Globe,
  ShoppingBag,
  Mail,
  Podcast,
  BookOpen,
  Calendar,
  Sparkles,
  ExternalLink
} from "lucide-react";

const profile = {
  name: "Alex Morgan",
  handle: "@alexmorgan",
  bio: "Digital creator & designer. Building products that spark joy ✨",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
};

const links = [
  {
    id: 1,
    title: "My New Course",
    subtitle: "Learn design in 30 days",
    icon: Sparkles,
    url: "#",
    featured: true
  },
  {
    id: 2,
    title: "Shop My Presets",
    icon: ShoppingBag,
    url: "#"
  },
  {
    id: 3,
    title: "Latest Blog Post",
    icon: BookOpen,
    url: "#"
  },
  {
    id: 4,
    title: "Book a Call",
    icon: Calendar,
    url: "#"
  },
  {
    id: 5,
    title: "Listen to My Podcast",
    icon: Podcast,
    url: "#"
  },
  {
    id: 6,
    title: "My Portfolio",
    icon: Globe,
    url: "#"
  }
];

const socials = [
  { icon: Instagram, url: "#", label: "Instagram" },
  { icon: Twitter, url: "#", label: "Twitter" },
  { icon: Youtube, url: "#", label: "YouTube" },
  { icon: Linkedin, url: "#", label: "LinkedIn" },
  { icon: Github, url: "#", label: "GitHub" },
  { icon: Mail, url: "#", label: "Email" }
];

export default function LinkInBio() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-[430px] px-4 py-6 pb-8">
        {/* Profile Header - Compact for mobile */}
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
            className="text-sm text-[hsl(var(--foreground))] leading-relaxed max-w-[280px] mx-auto"
            data-testid="text-profile-bio"
          >
            {profile.bio}
          </p>
        </header>

        {/* Social Icons Row */}
        <div className="flex justify-center gap-4 mb-5 opacity-0 animate-fade-in-up stagger-1">
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

        {/* Links */}
        <div className="space-y-3">
          {links.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              data-testid={`link-button-${link.id}`}
              className={`link-button opacity-0 animate-fade-in-up stagger-${Math.min(index + 2, 6)} block w-full rounded-2xl p-4 ${
                link.featured 
                  ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]' 
                  : 'bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  link.featured 
                    ? 'bg-white/20' 
                    : 'bg-[hsl(var(--secondary))]'
                }`}>
                  <link.icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-semibold text-[15px] truncate">
                    {link.title}
                  </div>
                  {link.subtitle && (
                    <div className={`text-xs mt-0.5 truncate ${
                      link.featured ? 'opacity-80' : 'text-[hsl(var(--muted-foreground))]'
                    }`}>
                      {link.subtitle}
                    </div>
                  )}
                </div>
                <ExternalLink size={16} className="shrink-0 opacity-50" />
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center opacity-0 animate-fade-in-up stagger-6">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Made with ♥
          </p>
        </footer>
      </div>
    </div>
  );
}
