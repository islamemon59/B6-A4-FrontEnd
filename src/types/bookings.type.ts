export type Booking = {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  cancelledBy?: "STUDENT" | "TUTOR" | "ADMIN" | null;

  tutorProfile?: {
    id: string;
    headline?: string | null;
    userId?: string | null;
    categoryId?: string | null;
    hourlyRate?: number | null;
    currency?: string | null;
    ratingAvg?: number | null;
    ratingCount?: number | null;
    meetingMode?: string | null;
    user?: {
      id: string;
      name: string;
      email?: string;
      image?: string | null;
    } | null;
  } | null;

  student?: {
    id: string;
    name: string;
    email?: string;
    image?: string | null;
  } | null;

  category?: {
    id: string;
    name: string;
  } | null;

  availabilitySlot?: {
    id: string;
    startTime: string;
    endTime: string;
  } | null;

  createdAt: string;
};
