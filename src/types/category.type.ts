export type FormValues = {
  id?: string;
  name: string;
  description: string;
  isActive: boolean;
  _count?: {
    tutorProfiles: number;
    bookings: number;
  };
};
