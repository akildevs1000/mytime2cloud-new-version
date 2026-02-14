import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import Swal from 'sweetalert2';

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


export const setStatusLabel = (status) => {
  const statuses = {
    A: "Absent",
    P: "Present",
    M: "Missed",
    LC: "Present",
    EG: "Present",
    O: "Week Off",
    L: "Leave",
    H: "Holiday",
    V: "Vacation",
  };
  return statuses[status];
};

export const getBgColor = (status) => {
  const colors = {
    A: "#dc2626", // light orange
    P: "#bbf7d0", // light green
    M: "#e5e7eb", // light gray
    LC: "#bbf7d0",
    EG: "#bbf7d0",
    O: "#fed7aa",
    L: "#fef08a", // light yellow
    H: "#c7d2fe", // light indigo
    V: "#c7d2fe",
  };
  return colors[status] || "#f3f4f6";
};

export const getTextColor = (status) => {
  const colors = {
    A: "#fee2e2", // dark orange
    P: "#15803d", // dark green
    M: "#374151", // dark gray
    LC: "#15803d",
    EG: "#15803d",
    O: "#c2410c",
    L: "#854d0e", // dark yellow-brown
    H: "#3730a3", // dark indigo
    V: "#3730a3",
  };
  return colors[status] || "#111827";
};

export const getRandomItem = (array) => {
  if (!array || array.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const generateSecurePassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let retVal = "";

  // Ensure we get at least one of each for 100% strength
  retVal += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
  retVal += "0123456789".charAt(Math.floor(Math.random() * 10));
  retVal += "!@#$%^&*()".charAt(Math.floor(Math.random() * 10));

  for (let i = 0; i < length - 3; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Shuffle the result
  return retVal.split('').sort(() => 0.5 - Math.random()).join('');
};

export const getStrength = (password) => {
  if (!password) return { width: "0%", label: "None", color: "bg-slate-700", text: "text-slate-500" };

  let score = 0;
  if (password.length > 6) score++;         // 1
  if (password.length > 10) score++;        // 2
  if (/[A-Z]/.test(password)) score++;      // 3
  if (/[0-9]/.test(password)) score++;      // 4
  if (/[^A-Za-z0-9]/.test(password)) score++; // 5

  const levels = {
    0: { width: "5%", label: "Very Weak", color: "bg-red-600", text: "text-red-600" },
    1: { width: "20%", label: "Weak", color: "bg-red-500", text: "text-red-500" },
    2: { width: "40%", label: "Fair", color: "bg-orange-500", text: "text-orange-500" },
    3: { width: "60%", label: "Good", color: "bg-blue-500", text: "text-blue-500" },
    4: { width: "80%", label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" },
    5: { width: "100%", label: "Elite", color: "bg-emerald-400", text: "text-emerald-400" },
  };

  return levels[score];
};

export const notify = (title, text, type = 'success') => {
  return Swal.fire({
    title,
    text,
    icon: type,
    timer: type === 'success' ? 3000 : 5000,
    heightAuto: false,
  });
};

/**
 * Compresses an image file and returns a Base64 string.
 */
export const compressImage = (file, { maxWidth = 600, maxHeight = 600, quality = 0.7 } = {}) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Maintain Aspect Ratio
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL(file.type, quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
      img.src = event.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

/**
 * Converts minutes (number) to HH:MM (string)
 */
export const minutesToHHMM = (totalMinutes) => {
  if (!totalMinutes || isNaN(totalMinutes)) return "00:00";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

/**
 * Converts HH:MM (string) back to total minutes (number)
 */
export const hhmmToMinutes = (timeStr) => {
  if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) return 0;

  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours * 60) + (minutes || 0);
};

export const debounce = (func, delay) => {
  let timer;

  const debounced = function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };

  // Utility to stop the execution if needed
  debounced.cancel = () => {
    clearTimeout(timer);
  };

  return debounced;
};