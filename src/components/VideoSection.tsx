import { motion } from "framer-motion";
import VideoCard from "./VideoCard";

const videos = [
  {
    title: "Wedding Highlights",
    description: "The most beautiful moments from our special day, captured in a cinematic highlight reel.",
    driveFileId: "1BxiMVs0XTw9FWUMTkn-dUdE8gfvU3Fbs",
  },
  {
    title: "Reception Celebration",
    description: "Toasts, first dance, and all the joy shared with our loved ones during the reception.",
    driveFileId: "1BxiMVs0XTw9FWUMTkn-dUdE8gfvU3Fbs",
  },
  {
    title: "Full Ceremony",
    description: "Our complete wedding ceremony — the vows, the rings, and the beginning of forever.",
    driveFileId: "1BxiMVs0XTw9FWUMTkn-dUdE8gfvU3Fbs",
  },
];

const VideoSection = () => {
  return (
    <section id="videos" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Relive the moments
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground italic mb-6">
            Our Wedding Films
          </h2>
          <div className="divider-ornament max-w-xs mx-auto">
            <span className="text-primary text-lg">♦</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {videos.map((video, i) => (
            <VideoCard key={video.title} {...video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
