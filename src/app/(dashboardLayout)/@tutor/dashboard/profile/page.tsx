import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { tutorServices } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

const TutorProfile = async () => {
  const session = await userService.getSession();
  if (!session) return null;
  const user = session?.data?.user;

  if (!user) {
    return <p className="mt-10 text-center">Unauthorized</p>;
  }

  const profileRes = await tutorServices.getProfile();
  const profile = profileRes?.data;

  if (!profile) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">
          You haven't created your tutor profile yet.
        </p>
        <Button asChild>
          <Link href="/dashboard/create-profile">Create Tutor Profile</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Card className="rounded-[1.75rem] border-border/70">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
      </Card>

      <Card className="rounded-[1.75rem] border-border/70">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{profile.headline}</CardTitle>
            <Badge
              variant={profile.profileStatus === "PUBLISHED" ? "default" : "secondary"}
            >
              {profile.profileStatus}
            </Badge>
          </div>
          <CardDescription>{profile.category?.name}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-1 font-semibold">About</h4>
            <p className="text-sm text-muted-foreground">{profile.about}</p>
          </div>

          <Separator />

          <div>
            <h4 className="mb-2 font-semibold">Subjects</h4>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((subject: string) => (
                <Badge key={subject} variant="outline">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <span className="font-medium">Meeting Mode:</span> {profile.meetingMode}
            </div>
            <div>
              <span className="font-medium">Hourly Rate:</span> {profile.hourlyRate}{" "}
              {profile.currency}
            </div>
            <div>
              <span className="font-medium">Rating:</span> {profile.ratingAvg} / 5
            </div>
            <div>
              <span className="font-medium">Featured:</span>{" "}
              {profile.isFeatured ? "Yes" : "No"}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button asChild variant="outline">
          <Link href="/dashboard/update-profile">Edit Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default TutorProfile;
