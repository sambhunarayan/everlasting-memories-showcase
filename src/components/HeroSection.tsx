import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import heroBg from "../assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Wedding hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-overlay-dark" />

      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm uppercase tracking-[0.3em] text-primary-foreground/80 mb-4"
        >
          The Wedding of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-primary-foreground mb-6 italic"
        >
          Silpa & Sambhu
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-px bg-gradient-gold mx-auto mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80"
        >
          <div className="flex items-center gap-2 font-body text-sm tracking-wider">
            <CalendarDays className="h-4 w-4" />
            <span>February 6, 2026</span>
          </div>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-primary-foreground/50" />
          <div className="flex items-center gap-2 font-body text-sm tracking-wider">
            <MapPin className="h-4 w-4" />
            <span>chenagannur, Alappey</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12"
        >
          <a
            href="#videos"
            className="inline-block font-body text-xs uppercase tracking-[0.25em] text-primary-foreground/70 border border-primary-foreground/30 px-8 py-3 rounded-full hover:bg-primary-foreground/10 transition-colors"
          >
            Watch Our Story
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-primary-foreground/60"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
