"use server";

import { studentServices } from "@/services/student.service";
import { userService } from "@/services/user.service";
import { Profile } from "@/types/profile.type";

export const updateProfile = async (payload: Profile) => {
  return await studentServices.updateProfile(payload);
};

export const getSession = async () => {
  return await userService.getSession();
};

export const createBooking = async (payload: {
  tutorProfileId: string;
  availabilitySlotId: string;
  subject: string;
}) => {
  return await studentServices.createBooking(payload);
};

export const getMyBookings = async () => {
  return await studentServices.getMyBookings();
};

export const cancelBooking = async (id: string, reason: string) => {
  return await studentServices.cancelBooking(id, reason);
};

export const createReview = async (payload: {
    bookingId: string;
    rating: number;
    comment?: string;
  }) => {
    return await studentServices.createReview(payload)
  }
