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
import Link from "next/link";

const TutorProfile = async () => {
  const session = await userService.getSession();
  if(!session)return null;
  const user = session?.data?.user;

  if (!user) {
    return <p className="text-center mt-10">Unauthorized</p>;
  }
  const profileRes = await tutorServices.getProfile();
  const profile = profileRes?.data;

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <p className="text-muted-foreground">
          You haven’t created your tutor profile yet.
        </p>
        <Button asChild>
          <a href="/tutor/profile/create">Create Tutor Profile</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{profile.headline}</CardTitle>
            <Badge
              variant={
                profile.profileStatus === "PUBLISHED" ? "default" : "secondary"
              }
            >
              {profile.profileStatus}
            </Badge>
          </div>
          <CardDescription>{profile.category?.name}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1">About</h4>
            <p className="text-sm text-muted-foreground">{profile.about}</p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Subjects</h4>
            <div className="flex flex-wrap gap-2">
              {profile.subjects.map((sub: string) => (
                <Badge key={sub} variant="outline">
                  {sub}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Meeting Mode:</span>{" "}
              {profile.meetingMode}
            </div>
            <div>
              <span className="font-medium">Hourly Rate:</span>{" "}
              {profile.hourlyRate} {profile.currency}
            </div>
            <div>
              <span className="font-medium">Rating:</span> {profile.ratingCount}
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
