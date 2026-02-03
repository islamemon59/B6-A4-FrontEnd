export type TutorProfile = {
  id: string;
  userId: string;
  categoryId: string;
  headline: string;
  about: string;
  subjects: string[];
  meetingMode: "ONLINE" | "IN_PERSON" | "BOTH";
  hourlyRate: number;
  currency: string;
  ratingAvg?: number; // optional if not in schema yet
  ratingCount: number;
  isFeatured: boolean;
  profileStatus: "DRAFT" | "PUBLISHED";
  createdAt: string;
  updatedAt: string;
  category?: { id: string; name: string };
};

export type TutorsQuery = {
  q?: string;
  categoryId?: string;
  subject?: string;
  minRating?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: "rating" | "price" | "latest";
  sortOrder?: "asc" | "desc";
  page?: string;
  limit?: string;
};

export type TutorsResponse = {
  success: boolean;
  meta: { page: number; limit: number; total: number; totalPages: number };
  data: TutorProfile[];
  message?: string;
};
