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
  return (
    `https://mytime2cloud-backend.test/api/download-emp-documents/${pic}/${file_name}`
  );
}

