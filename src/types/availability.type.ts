import { z } from "zod";

export const availabilitySchema = z
  .object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (v) => new Date(v.startTime).getTime() < new Date(v.endTime).getTime(),
    { message: "End time must be after start time", path: ["endTime"] },
  );

export type AvailabilityFormValues = z.infer<typeof availabilitySchema>;

export type AvailabilitySlot = {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};
