export const MEETING_MODES = ["ONLINE", "IN_PERSON", "BOTH"] as const;
export const PROFILE_STATUS = ["DRAFT", "PUBLISHED"] as const;

export const CURRENCIES = ["BDT", "USD"] as const;

export type FormValues = {
  categoryId: string;
  headline: string;
  about: string;
  subjectsText: string;
  meetingMode: (typeof MEETING_MODES)[number];
  hourlyRate: number | "";
  currency: (typeof CURRENCIES)[number];
  isFeatured: boolean;
  profileStatus: (typeof PROFILE_STATUS)[number];
};

export type CreateTutorProfilePayload = {
  categoryId: string;
  headline: string;
  about: string;
  subjects: string[]; // backend expects array
  meetingMode: "ONLINE" | "IN_PERSON" | "BOTH";
  hourlyRate: number;
  currency: "BDT" | "USD";
  isFeatured: boolean;
  profileStatus: "DRAFT" | "PUBLISHED";
};

export type Category = { id: string; name: string };
