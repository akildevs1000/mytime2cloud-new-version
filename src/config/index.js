// /config/index.js

let env = process.env;

export const API_BASE_URL = env.NEXT_PUBLIC_API_URL || 'https://backend.mytime2cloud.com/api';

export const FACE_VALIDATOR_URL =
  typeof window !== "undefined"
    ? env.NEXT_PUBLIC_FACE_VALIDATOR_ENDPOINT || "https://face-validator.mytime2cloud.com/"
    : null;



export const APP_NAME = "MyTime2Cloud";
export const DEFAULT_LANGUAGE = "en";
export const DEV_NAME = "Francis";

export const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user")) || {}
    : {};



export const getUser = () => {
  return typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user")) || {}
    : {};
}
