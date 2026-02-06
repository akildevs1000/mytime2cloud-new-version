import axios from "axios";
import { getUser } from "@/config/index";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend.mytime2cloud.com/api';

/**
 * Reusable Axios Instance
 */
export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach Bearer Token to every request
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

/**
 * Global Query Builder
 * Use this in any service file to automatically inject user/company context
 */
export const buildQueryParams = async (params = {}) => {
    const user = await getUser();

    console.log(user);

    const queryParams = {
        company_id: user?.company_id ?? 0,
        ...params, // Overwrites defaults if specific params are passed
    };

    // Auto-inject Branch ID if user is restricted to one
    if (user?.branch_id && user.branch_id !== 0) {
        queryParams.branch_id = user.branch_id;
    }

    // Handle Department Logic: User-restricted departments take priority
    const userDepts = user?.departments?.map(d => d.id);
    if (userDepts?.length > 0) {
        queryParams.department_ids = userDepts;
    }

    return queryParams;
};