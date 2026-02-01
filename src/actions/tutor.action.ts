"use server";

import { tutorServices } from "@/services/tutor.service";
import { CreateTutorProfilePayload } from "@/types/tutorProfile.type";

export const getCategory = async () => {
  return await tutorServices.getCategory();
};

export const createProfile = async (data: CreateTutorProfilePayload) => {
  return await tutorServices.createProfile(data);
};
