import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Resolve static assets via Vite-friendly URLs so they load reliably at runtime.
const resolve = (name: string) => new URL(`../assets/${name}`, import.meta.url).href;
const placeholder = resolve("hero-bg.jpg");

const galleryImages = [
  { src: resolve("gallery-1.jpg"), alt: "Wedding ceremony" },
  { src: resolve("gallery-2.jpg"), alt: "Bride portrait" },
  { src: resolve("gallery-3.jpg"), alt: "Wedding venue" },
  { src: resolve("gallery-4.jpg"), alt: "First dance" },
  { src: resolve("gallery-5.jpg"), alt: "Wedding rings" },
  { src: resolve("gallery-6.jpg"), alt: "Bouquet" },
  { src: resolve("gallery-7.jpg"), alt: "Wedding couple" },
  { src: resolve("gallery-8.jpg"), alt: "Wedding details" },
  // gallery-9 on disk is `gallery-9.JPG` (uppercase extension)
  { src: resolve("gallery-9.JPG"), alt: "Reception decor" },
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
                  onError={(e) => {
                    // if loading fails (wrong path/case/CORS), show placeholder and mark as loaded
                    const el = e.currentTarget as HTMLImageElement;
                    if (el.src !== placeholder) el.src = placeholder;
                    setLoadedImages(prev => new Set(prev).add(i));
                  }}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://drive.google.com/drive/folders/1GDX7z3xe9U7WCeewfj3YIfobtzU1nknQ?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-xs uppercase tracking-[0.25em] text-black bg-white border border-primary-foreground/30 px-8 py-3 rounded-full hover:bg-transparent transition-colors"
          >
            Show All
          </a>
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
