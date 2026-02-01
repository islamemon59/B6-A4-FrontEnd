"use server";

import { adminService } from "@/services/admin.service";
import { FormValues } from "@/types/category.type";

export const updateUserStatus = async (id: string, payload: string) => {
  return await adminService.updateStatus(id, payload);
};

export const getSingleCategory = async (id: string) => {
  return await adminService.getSingleCategory(id);
}

export const createCategory = async (payload: FormValues) => {
  return await adminService.createCategory(payload);
};

export const deleteCategory = async (id: string) => {
  return await adminService.deleteCategory(id);
};


export const updateCategory = async (id: string, payload: FormValues) => {
  return await adminService.updateCategory(id, payload);
}