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

const TutorProfile = async () => {
  const profileRes = await tutorServices.getProfile();
  const profile = profileRes?.data;

  // ❌ profile not created yet
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
      {/* User Info */}
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
      </Card>

      {/* Tutor Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{profile.headline}</CardTitle>
            <Badge
              variant={
                profile.profileStatus === "PUBLISHED"
                  ? "default"
                  : "secondary"
              }
            >
              {profile.profileStatus}
            </Badge>
          </div>
          <CardDescription>{profile.category?.name}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* About */}
          <div>
            <h4 className="font-semibold mb-1">About</h4>
            <p className="text-sm text-muted-foreground">
              {profile.about}
            </p>
          </div>

          <Separator />

          {/* Subjects */}
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

          {/* Details */}
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
              <span className="font-medium">Rating:</span>{" "}
              {profile.ratingCount}
            </div>
            <div>
              <span className="font-medium">Featured:</span>{" "}
              {profile.isFeatured ? "Yes" : "No"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button asChild variant="outline">
          <a href="/tutor/profile/edit">Edit Profile</a>
        </Button>
        <Button asChild>
          <a href="/tutor/availability">Manage Availability</a>
        </Button>
      </div>
    </div>
  );
};

export default TutorProfile;
