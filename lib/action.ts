"use server"

import axios from "axios";
import { API_URL } from "./constant";

export const registerAction = async ({ email, password }: { email: string, password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, {
            email,
            password
        })
        if (response.status === 201) {
            return {
                message: response.data?.message || 'Success register user',
                success: true
            }
        } else {
            return {
                message: response.data?.message || 'Failed register user',
                success: false
            }
        }
    } catch (error: any) {
        return {
            message: error?.response?.data?.message || 'Failed register user',
            success: false
        }
    }
}