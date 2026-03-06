import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import GalleryGrid from "@/components/GalleryGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <VideoSection />
      <GalleryGrid />
      <Footer />
    </div>
  );
};

export default Index;
