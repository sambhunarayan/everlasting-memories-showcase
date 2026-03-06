import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <p className="font-display text-3xl italic text-foreground mb-4">
          Silpa & Sambhu
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
          <span className="font-body text-sm">Forever starts here</span>
          <Heart className="h-3 w-3 text-primary fill-primary" />
        </div>
        <p className="font-body text-xs text-muted-foreground tracking-wider">
          February 6, 2026 • Chengannur,Alappuzha        </p>
      </div>
    </footer>
  );
};

export default Footer;
