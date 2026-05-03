import { publicService } from "@/services/public.service";
import TutorsGrid from "./TutorsGrid";

export default async function FeaturedTutors() {
  const { data } = await publicService.getFeaturedTutor();
  const tutors = Array.isArray(data) ? data : [];

  return <TutorsGrid tutors={tutors} />;
}
