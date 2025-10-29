import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};



export function getEmployeeDocumentDonwloadLink(pic, file_name) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend.mytime2cloud.com/api';

  console.log("🚀 ~ getEmployeeDocumentDonwloadLink ~ pic, file_name:", pic, file_name)
  return (
    `${API_BASE}/download-emp-documents/${pic}/${file_name}`
  );
}

export function addTimes(time1, time2) {
  if (!time1 || !time2) return "";

  const [h1, m1] = time1.split(":").map(Number);
  const [h2, m2] = time2.split(":").map(Number);

  // Convert both to minutes
  const totalMinutes = h1 * 60 + m1 + h2 * 60 + m2;

  // Convert back to HH:mm
  const hours = Math.floor((totalMinutes / 60) % 24);
  const minutes = totalMinutes % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}