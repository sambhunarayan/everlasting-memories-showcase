import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Wedding ceremony" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", alt: "Bride portrait" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", alt: "Wedding venue" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "First dance" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", alt: "Wedding rings" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", alt: "Bouquet" },
  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Wedding couple" },
  { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80", alt: "Wedding details" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", alt: "Reception decor" },
];

const GalleryGrid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Captured forever
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground italic mb-6">
            Photo Gallery
          </h2>
          <div className="divider-ornament max-w-xs mx-auto">
            <span className="text-primary text-lg">♦</span>
          </div>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true, margin: "-30px" }}
              className="mb-4 break-inside-avoid"
            >
              <button
                onClick={() => setSelectedIndex(i)}
                className="relative w-full overflow-hidden rounded-lg shadow-card group cursor-pointer"
              >
                {!loadedImages.has(i) && (
                  <div className="aspect-[4/3] bg-muted animate-pulse rounded-lg" />
                )}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full transition-transform duration-700 group-hover:scale-105 ${loadedImages.has(i) ? "block" : "hidden"}`}
                  onLoad={() => setLoadedImages(prev => new Set(prev).add(i))}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[selectedIndex].src.replace("w=800", "w=1400")}
              alt={galleryImages[selectedIndex].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryGrid;
