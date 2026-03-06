import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoCardProps {
  title: string;
  description: string;
  driveFileId: string;
  index: number;
}

const VideoCard = ({ title, description, driveFileId, index }: VideoCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w800`;

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
                src={thumbnailUrl}
                alt={title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setLoaded(true)}
                onError={() => setLoaded(true)}
              />
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-elevated group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6 text-primary-foreground ml-1" />
                </div>
              </button>
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
