// /config/index.js

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://backend.mytime2cloud.com/api';

export const APP_NAME = "MyTime2Cloud";
export const DEFAULT_LANGUAGE = "en";
export const DEV_NAME = "Francis";

// ✅ safely get user only on client
export const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user")) || {}
    : {};



export const getUser = () => {
  return typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user")) || {}
    : {};
}
