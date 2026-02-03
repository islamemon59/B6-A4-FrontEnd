"use server"

import { studentServices } from "@/services/student.service"
import { userService } from "@/services/user.service"
import { Profile } from "@/types/profile.type"

export const updateProfile = async (payload: Profile)=> {
    return await studentServices.updateProfile(payload)
}

export const getSession = async () => {
    return await userService.getSession()
}