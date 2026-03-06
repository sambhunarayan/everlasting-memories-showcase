import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#videos", label: "Videos" },
    { href: "#gallery", label: "Gallery" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2 font-display text-2xl font-semibold tracking-wide">
          <Heart className={`h-5 w-5 ${scrolled ? "text-primary" : "text-primary-foreground"}`} />
          <span className={scrolled ? "text-foreground" : "text-primary-foreground"}>
            A & J
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-medium uppercase tracking-widest transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <MobileMenu scrolled={scrolled} links={navLinks} />
        </div>
      </div>
    </nav>
  );
};

const MobileMenu = ({ scrolled, links }: { scrolled: boolean; links: { href: string; label: string }[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`flex flex-col gap-1.5 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
      >
        <span className={`block h-0.5 w-6 transition-all ${open ? "rotate-45 translate-y-2" : ""} ${scrolled ? "bg-foreground" : "bg-primary-foreground"}`} />
        <span className={`block h-0.5 w-6 transition-all ${open ? "opacity-0" : ""} ${scrolled ? "bg-foreground" : "bg-primary-foreground"}`} />
        <span className={`block h-0.5 w-6 transition-all ${open ? "-rotate-45 -translate-y-2" : ""} ${scrolled ? "bg-foreground" : "bg-primary-foreground"}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md shadow-soft animate-fade-in">
          <div className="flex flex-col items-center gap-6 py-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-body text-sm font-medium uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
