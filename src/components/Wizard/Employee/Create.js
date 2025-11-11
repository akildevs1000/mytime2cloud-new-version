"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { useForm } from "react-hook-form"; // Removed: Use standard state instead
import { SuccessDialog } from "@/components/SuccessDialog"; // Keep if still needed for success state
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Removed: Form, FormControl, FormField, FormItem, FormLabel, FormMessage
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Keep for Title selection

import { User, Briefcase, Phone, ArrowLeft, Upload } from "lucide-react";
import { convertFileToBase64, parseApiError } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { getBranches, getDepartments, storeEmployee } from '@/lib/api';

import DatePicker from '@/components/ui/DatePicker';
import DropDown from '@/components/ui/DropDown';

// Define the initial state structure for the form data
const initialFormData = {
  // Personal Details
  title: "Mr.",
  first_name: "", // Changed null to "" for easier input handling
  last_name: "", // Changed null to "" for easier input handling
  full_name: "",
  display_name: "",
  // Employment Details
  employee_id: "",
  joining_date: null,
  branch_id: "", // Changed "null" to "" for easier logic/Select compatibility
  // Contact Information (not fully present in the JSX, keeping defaults)
  phone_number: "",
  whatsapp_number: "",
  // Other payload fields
  system_user_id: "",
  department_id: "",
  // Field present in original JSX but not in final payload keys (kept for form use)
  employee_device_id: "",
};


const Create = ({ options, onSuccess }) => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  // 1. Standard React State for Form Data
  const [formData, setFormData] = useState(initialFormData);
  // 2. Standard React State for Loading/Error
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  // 3. States for Dependent Data/Image Handling
  const [departments, setDepartments] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [branches, setBranches] = useState([]);


  // --- Helper Functions and Handlers ---

  const handleUploadClick = () => fileInputRef.current.click();

  // 4. Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 5. Select/Dropdown Change Handler (for custom components/Selects)
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 6. DatePicker Change Handler
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, joining_date: date }));
  };

  // 7. Data Fetching
  const fetchBranches = async () => {
    try {
      const data = await getBranches();
      // Ensure IDs are strings for Select/DropDown if they come as numbers, or use them as is.
      // Assuming branches have { id, name } structure
      setBranches(data.map(b => ({ ...b, id: b.id.toString() })));
    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  // Use useCallback for fetchDepartments to avoid issues if used as a dependency, though not strictly needed here
  const fetchDepartments = useCallback(async () => {
    try {
      let data = await getDepartments(null);
      // Ensure IDs are strings for Select if they come as numbers, or use them as is.
      setDepartments(data.map(d => ({ ...d, id: d.id.toString() })));

      const currentDeptId = formData.department_id;
      if (currentDeptId && !data.some(d => d.id.toString() === currentDeptId.toString())) {
        setFormData(prev => ({ ...prev, department_id: "" })); // Reset if department is not in new list
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setDepartments([]); // Clear departments on error
      setFormData(prev => ({ ...prev, department_id: "" })); // Clear the selected department
    }
  }, [formData.department_id]);


  // 8. Dependency Effect (Branch -> Department)
  useEffect(() => {
    fetchDepartments();
  }, []); // Dependency on branch_id and the memoized function


  // 9. File Change Handler
  const handleFileChange = async (event) => {
    setGlobalError(null);
    const file = event.target.files[0];
    if (file) {
      // Basic file validation
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setGlobalError("File size exceeds 2MB limit.");
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setGlobalError("Only JPG and PNG formats are supported.");
        return;
      }

      try {
        const base64String = await convertFileToBase64(file);
        setImagePreview(URL.createObjectURL(file)); // Use Object URL for cleaner preview
        setImageFile(file);
      } catch (error) {
        setGlobalError("Error converting file to Base64.");
        setImagePreview(null);
        setImageFile(null);
      }
    }
  };

  // 10. Submission Handler
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setGlobalError(null);
    setIsSubmitting(true);

    // Map the collected form data to the final required employee payload structure
    const payloadData = {
      ...formData, // Start with all current form data
      // Ensure integer IDs are correctly cast if needed by API, though the API will usually handle string numbers
      branch_id: parseInt(formData.branch_id) || null,
      department_id: parseInt(formData.department_id) || null,
    };

    // Construct full_name if not explicitly entered
    payloadData.full_name = formData.full_name || `${formData.first_name || ''} ${formData.last_name || ''}`.trim();

    // Clean up fields that might have been explicitly set as "null" or are non-payload fields
    delete payloadData.employee_device_id;

    // Replace empty strings with null for fields where the API expects null if empty/optional
    Object.keys(payloadData).forEach(key => {
      if (payloadData[key] === "") {
        payloadData[key] = null;
      }
    });

    let finalPayload = { ...payloadData };

    if (imageFile) {
      try {
        finalPayload.profile_image_base64 = await convertFileToBase64(imageFile);
      } catch (error) {
        setGlobalError("Error preparing image for upload.");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await storeEmployee(finalPayload);
      onSuccess();
      setFormData(initialFormData); // Reset form
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      setGlobalError(parseApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- JSX Rendering ---

  return (
    <div className="pt-15 overflow-y-auto max-h-[500px]">
      <div
        className="relative dark:bg-card-dark p-8 pt-20 rounded-lg"
      >
        {/* Profile Image and Upload Controls */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          {/* Image Preview Area */}
          <div className={`w-${options.w || 48} h-${options.h || 48} rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-6 border-4 border-dashed border-indigo-200 dark:border-indigo-700 overflow-hidden`}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-6xl text-primary h-15 w-15" />
            )}
          </div>

          {/* File Name Display */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
            {imageFile ? imageFile.name : "No Image Selected"}
          </p>

          {/* Upload Button */}
          <Button
            onClick={handleUploadClick}
            className="bg-primary text-white hover:bg-indigo-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            {imageFile ? "CHANGE IMAGE" : "UPLOAD IMAGE"}
          </Button>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
            className="hidden"
          />

          {/* Constraints Text */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            * Upload JPG or PNG only. <br />
            Maximum file size 2MB.
          </p>
        </div>
        <div className="pt-50">
          {/* Replace <Form {...form}> with a standard form element */}
          <form onSubmit={onSubmit} className="space-y-8">

            {/* Personal Details Section */}
            <section className='mt-5'>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <User className="mr-3 h-6 w-6 text-primary" />
                Personal Details
              </h2>

              {/* Row 1: Title, Full Legal Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title Select - Use standard Select component but manage state manually */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <Select
                    onValueChange={(value) => handleSelectChange("title", value)}
                    value={formData.title}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Title" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Mr.', 'Mrs.', 'Ms.'].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* FormMessage removed, use custom error display if needed */}
                </div>

                {/* Full Legal Name Input */}
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Legal Name</label>
                  <Input
                    id="full_name"
                    name="full_name"
                    placeholder="Enter employee's full legal name"
                    value={formData.full_name || ""} // Ensure controlled input with non-null value
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2: First Name, Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* First Name Input */}
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="Enter first name"
                    value={formData.first_name || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Last Name Input */}
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Enter last name"
                    value={formData.last_name || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>


              {/* Row 3: Display Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="display_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Name / Nickname</label>
                  <Input
                    id="display_name"
                    name="display_name"
                    placeholder="Nickname or preferred display name"
                    value={formData.display_name || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Employment Details Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Briefcase className="mr-3 h-6 w-6 text-primary" />
                Employment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Branch Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Branch</label>
                  <DropDown
                    placeholder="Select Branch"
                    value={formData.branch_id}
                    items={branches} // branches are now guaranteed to have string IDs
                    onChange={(id) => handleSelectChange("branch_id", id)}
                  />
                </div>

                {/* Department Select (dependent on Branch) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
                  <Select
                    onValueChange={(value) => handleSelectChange("department_id", value)}
                    value={formData.department_id}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={department.id.toString()} // Ensure value is a string
                        >
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Employee ID Input */}
                <div>
                  <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Employee ID</label>
                  <Input
                    id="employee_id"
                    name="employee_id"
                    placeholder="Unique ID (e.g., EMP001)"
                    value={formData.employee_id || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* System User ID Input (Device ID) */}
                <div>
                  <label htmlFor="system_user_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">System User ID (Device Id)</label>
                  <Input
                    id="system_user_id"
                    name="system_user_id"
                    placeholder="Asset Tracking ID (Optional)"
                    value={formData.system_user_id || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Joining Date Input */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Joining Date</label>
                  <DatePicker
                    value={formData.joining_date}
                    onChange={handleDateChange}
                    placeholder="Pick a date"
                  />
                </div>
              </div>
            </section>


            {globalError && (
              <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
                {globalError}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="submit"
                className="bg-primary hover:bg-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Create;