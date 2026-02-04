"use server"

import { userService } from "@/services/user.service"

export const getUser = async() => {
    return userService.getSession();
}