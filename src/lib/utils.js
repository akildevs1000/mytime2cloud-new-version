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

export function formatDate(value) {
  if (!value) return ""; // handle null/undefined safely
  if (value instanceof Date) {
    return value.toISOString().split("T")[0]; // convert Date → ISO → date-only
  }
  if (typeof value === "string") {
    return value.split("T")[0]; // already a string → split
  }
  return ""; // fallback if something unexpected
};

export const formatDateDubai = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dubai", // ✅ use Dubai timezone
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(d); // returns YYYY-MM-DD
};

export const parseApiError = (error) => {
    console.log("🚀 ~ parseApiError ~ error:", error)
    if (error.response) {

        const status = error.response.status;
        const responseData = error.response.data;

        if (status === 422) {
            return (
                responseData.message || "Validation failed. Please check the form fields for errors."
            );

            // You may also want to integrate responseData.errors with react-hook-form's setError here

        } else if (status >= 500) {
            // 500: Server error
            return ("A critical server error occurred. Please try again later.");
        } else {
            // Other errors (401, 403, 404, etc.)
            return (responseData.message || `An error occurred with status ${status}.`);
        }

    } else {
        // Network error
        return ("Network error: Could not connect to the API.");
    }
}


