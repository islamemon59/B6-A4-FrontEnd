import { CarouselPlugin } from "@/components/modules/homepage/Carousel";
import FeaturedTutorCard from "@/components/modules/homepage/FeaturedTutors";

export default function Home() {
  return (
    <div className="">
      <div className="w-full">
        <CarouselPlugin/>
        <FeaturedTutorCard/>
      </div>
    </div>
  );
}
