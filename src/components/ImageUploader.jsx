"use client";
import React, { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { compressImage, notify } from "@/lib/utils";
import axios from "axios";
import { FACE_VALIDATOR_URL } from "@/config";

const ImageUploader = ({ onImageSet = () => {}, existingImage = null }) => {
  const [qualityScore, setQualityScore] = useState(0);
  const [preview, setPreview] = useState(null);
  const [reasons, setReasons] = useState([]); // To store specific Python API errors

  useEffect(() => {
    console.log("Face Validator URL:", FACE_VALIDATOR_URL);
  }, []);

  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
      setQualityScore(100);
    } else {
      setPreview(null);
      setQualityScore(0);
    }
  }, [existingImage]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File validation
    if (file.size > 2 * 1024 * 1024) {
      await notify("Warning!", "File size exceeds 2mb limit.", "warning");
      return;
    }

    try {
      // 1. Compress Image
      const compressedBase64 = await compressImage(file, {
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.9,
      });

      // 2. Call Python Validation API
      // Note: Ensure your Python FastAPI has CORS enabled!
      const { data } = await axios.post(
        `${FACE_VALIDATOR_URL}/validate-passport`,
        {
          image_base64: compressedBase64,
        },
      );

      const { status, quality_score, meta } = data;

      // Parse "77.5%" string to numeric 77.5
      const numericScore = parseFloat(quality_score.replace("%", ""));

      setQualityScore(numericScore);
      setReasons(meta.reasons || []);

      if (status) {
        setPreview(compressedBase64);
        onImageSet(compressedBase64);
      } else {
        // Even if status is false, we show the preview so they see the photo
        setPreview(compressedBase64);
        // We set null to the parent form so they can't submit a bad photo
        onImageSet(null);
        // if (meta.reasons.length > 0) {
        //    await notify("Quality Check", meta.reasons[0], "error");
        // }
      }
    } catch (error) {
      console.error("Validation API failed:", error);
      await notify("Error!", "Validation service is offline.", "error");
      setQualityScore(0);
    }
  };

  return (
    <>
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

      <div className="w-full bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase">
            Quality Check
          </span>
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
                : qualityScore > 0
                  ? "Poor"
                  : "N/A"}{" "}
            ({qualityScore}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
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
