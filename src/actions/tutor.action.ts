"use server";

import { tutorServices } from "@/services/tutor.service";
import { AvailabilityFormValues } from "@/types/availability.type";
import { CreateTutorProfilePayload } from "@/types/tutorProfile.type";

export const getCategory = async () => {
  return await tutorServices.getCategory();
};

export const createProfile = async (data: CreateTutorProfilePayload) => {
  return await tutorServices.createProfile(data);
};

export const getTutorProfile = async () => {
  return await tutorServices.getProfile();
};

export const updateProfile = async (data: CreateTutorProfilePayload) => {
  return await tutorServices.updateProfile(data);
};

export const setAvailability = async (data: AvailabilityFormValues) => {
  return await tutorServices.setAvailability(data);
};

export const getTutorSessions = async () => {
  return await tutorServices.getTutorSessions();
};

export const completeTutorSession = async (bookingId: string) => {
  return await tutorServices.completeTutorSession(bookingId);
};

export const cancelTutorSession = async (bookingId: string, reason: string) => {
  return await tutorServices.cancelTutorSession(bookingId, reason);
};

export const getTutorReviews = async () => {
  return await tutorServices.getTutorReviews();
};
