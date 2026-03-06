import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoCardProps {
  title: string;
  description: string;
  driveFileId: string;
  // optional list of up to 3 local thumbnail filenames (e.g. "thumbnail-1.jpg") placed in src/assets
  thumbnails?: string[];
  index: number;
}

const VideoCard = ({ title, description, driveFileId, index, thumbnails }: VideoCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w800`;
  // local placeholder in case the Drive thumbnail is inaccessible (permissions/CORS)
  const placeholder = new URL("../assets/hero-bg.jpg", import.meta.url).href;
  // resolve up to three thumbnails from the assets folder if provided
  const resolveAsset = (name: string) => {
    // Try the provided name as-is (if it has an extension), otherwise try common image extensions.
    const tryExts = name.includes(".") ? [""] : [".jpg", ".png", ".svg"];
    for (const ext of tryExts) {
      try {
        return new URL(`../assets/${name}${ext}`, import.meta.url).href;
      } catch (e) {
        // continue trying other extensions
      }
    }
    return null;
  };

  const resolvedThumbnails = (thumbnails ?? [])
    .slice(0, 3)
    .map((n) => resolveAsset(n))
    .filter(Boolean) as string[];

  const initialSrc = resolvedThumbnails.length > 0 ? resolvedThumbnails[0] : thumbnailUrl;
  const [src, setSrc] = useState<string>(initialSrc);
  const [activeThumb, setActiveThumb] = useState<number>(resolvedThumbnails.length > 0 ? 0 : -1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group"
    >
      <div className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-500">
        <div className="relative aspect-video bg-muted">
          {!playing ? (
            <>
              {!loaded && (
                <Skeleton className="absolute inset-0 rounded-none" />
              )}
              <img
                src={src}
                alt={title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setLoaded(true)}
                onError={() => {
                  // If Drive thumbnail fails (not shared/public or CORS), fall back to local placeholder
                  if (src !== placeholder) setSrc(placeholder);
                  setLoaded(true);
                }}
              />
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6 text-primary-foreground ml-1" />
                </div>
              </button>
              {/* Thumbnails selector (local assets) */}
              {resolvedThumbnails.length > 0 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  {resolvedThumbnails.map((t, idx) => (
                    <button
                      key={t}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (src !== t) {
                          setLoaded(false);
                          setSrc(t);
                          setActiveThumb(idx);
                        }
                      }}
                      className={`w-14 h-9 rounded overflow-hidden border-2 ${activeThumb === idx ? "border-primary" : "border-transparent"}`}
                      aria-label={`Thumbnail ${idx + 1}`}
                    >
                      <img src={t} alt={`${title} thumb ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <iframe
              src={`https://drive.google.com/file/d/${driveFileId}/preview`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={title}
            />
          )}
        </div>

        <div className="p-6">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
