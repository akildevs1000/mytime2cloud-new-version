"use client";
import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { compressImage, notify } from "@/lib/utils";
const ImageUploader = ({ onImageSet = () => {}, existingImage = null }) => {
  const [qualityScore, setQualityScore] = useState(92);
  const [preview, setPreview] = useState(null);

  // Sync internal state with existing image prop
  useEffect(() => {
    if (existingImage) {

      console.log(existingImage);
      setPreview(existingImage);
      // You might want to set a default quality score for existing images
      setQualityScore(100);
    }
  }, [existingImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic file validation
    if (file.size > 1 * 1024 * 1024) {
      await notify("Warning!", "File size exceeds 1mb limit.", "warning");
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      await notify(
        "Warning!",
        "Only JPG and PNG formats are supported.",
        "warning",
      );
      return;
    }

    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      const compressedBase64 = await compressImage(file, {
        maxWidth: 400,
        maxHeight: 400,
        quality: 0.8,
      });

      setPreview(compressedBase64);
      onImageSet(compressedBase64);

      // Clean up memory
      URL.revokeObjectURL(img.src);
    } catch (error) {
      console.error("Image processing failed:", error);
      await notify("Error!", "Image processing failed.", "error");
      setPreview(null);
      onImageSet(null);
    }
  };

  return (
    <>
      {/* Biometric Upload Section */}
      <label className="relative group cursor-pointer block w-fit">
        <div className="w-40 h-40 rounded-full border-4 border-dashed border-slate-300 dark:border-white/20 shadow-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center ring-4 ring-transparent group-hover:ring-primary-500/30 group-hover:border-primary-500 transition-all duration-300 transform group-hover:scale-105">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <Camera
              size={40}
              className="text-slate-400 group-hover:scale-110 transition-transform"
            />
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      {/* Dynamic Quality Check Card */}
      <div className="w-full bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase">
            Quality Check
          </span>
          {/* Dynamic Text and Color */}
          <span
            className={`text-xs font-bold ${
              qualityScore >= 90
                ? "text-emerald-600"
                : qualityScore >= 70
                  ? "text-amber-500"
                  : qualityScore > 0
                    ? "text-red-500"
                    : "text-slate-400"
            }`}
          >
            {qualityScore >= 90
              ? "Excellent"
              : qualityScore >= 70
                ? "Good"
                : "Poor"}{" "}
            ({qualityScore}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          {/* Dynamic Bar Width and Background */}
          <div
            className={`h-full transition-all duration-500 ${
              qualityScore >= 90
                ? "bg-emerald-500"
                : qualityScore >= 70
                  ? "bg-amber-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${qualityScore}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default ImageUploader;
