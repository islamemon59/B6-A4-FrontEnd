"use server";

import { adminService } from "@/services/admin.service";
import { FormValues } from "@/types/category.type";

export const updateUserStatus = async (id: string, payload: string) => {
  return await adminService.updateStatus(id, payload);
};

export const createCategory = async (payload: FormValues) => {
  return await adminService.createCategory(payload);
};
