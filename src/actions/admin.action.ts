"use server";

import { adminService } from "@/services/admin.service";

export const updateUserStatus = async (id: string, payload: string) => {
  return await adminService.updateStatus(id, payload);
};
