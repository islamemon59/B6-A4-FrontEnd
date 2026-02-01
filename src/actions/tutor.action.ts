"use server";

import { tutorServices } from "@/services/tutor.service";
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
