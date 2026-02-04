import { Footer } from "@/components/Layout/Footer";
import { CarouselPlugin } from "@/components/modules/homepage/Carousel";
import FeaturedTutorCard from "@/components/modules/homepage/FeaturedTutors";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <CarouselPlugin />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl text-center mb-12 font-semibold">
          Featured Tutors
        </h1>
        <FeaturedTutorCard />
      </div>
      <Footer />
    </div>
  );
}
