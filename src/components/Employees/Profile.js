"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form"; // Used for standard form handling
import { SuccessDialog } from "@/components/SuccessDialog"; // Import the new component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";



import { Check, ChevronsUpDown, User, Briefcase, Phone } from "lucide-react";
import { cn, convertFileToBase64, parseApiError } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { getBranches, getDepartments, storeEmployee, updateEmployee } from '@/lib/api';
import DatePicker from '@/components/ui/DatePicker';



const Profile = ({ payload }) => {
  const fileInputRef = useRef(null);
  const handleUploadClick = () => fileInputRef.current.click();

  const router = useRouter();
  const handleCancel = () => router.push(`/employees`);
  const form = useForm({
    defaultValues: {
      // Personal Details
      title: "Mr.",
      first_name: "John", // Initial value
      last_name: "Doe", // Initial value
      full_name: "",
      display_name: "",
      // Employment Details
      employee_id: "",
      joining_date: "2023-10-11",
      branch_id: null, // null for no selection
      // Contact Information
      phone_number: "",
      whatsapp_number: "",
      // Other payload fields not tied to a visible input
      system_user_id: "",
      department_id: null,
      // Field present in original JSX but not in final payload keys (kept for form use)
      employee_device_id: "",
    },
  });
  const { reset, watch, setValue, handleSubmit, formState: { isSubmitting } } = form;

  useEffect(() => {
    if (payload) {
      reset({
        id: payload.id || 0,
        title: payload.title || "Mr.",
        first_name: payload.first_name || "",
        last_name: payload.last_name || "",
        full_name: payload.full_name || "",
        display_name: payload.display_name || "",
        employee_id: payload.employee_id || "",
        joining_date: payload.joining_date || "",
        branch_id: payload.branch_id ?? null,
        phone_number: payload.phone_number || "",
        whatsapp_number: payload.whatsapp_number || "",
        system_user_id: payload.system_user_id || "",
        department_id: payload.department_id ?? null,
        employee_device_id: payload.employee_device_id || "",
      });
    }
  }, [payload, reset]);

  const [isBranchPopoverOpen, setIsBranchPopoverOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const selectedBranchId = watch("branch_id");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setBranches(await getBranches());
      } catch (error) {
        console.error("Error fetching branches:", error);
        setBranches([]);
      }
    };
    fetchBranches();
  }, []);


  useEffect(() => {
    const branchId = watch("branch_id");

    if (!branchId) {
      setDepartments([]);
      setValue("department_id", null);
      return;
    }

    const fetchDepartments = async () => {
      try {
        const data = await getDepartments(branchId);
        setDepartments(data);

        const currentDeptId = watch("department_id");
        if (currentDeptId && !data.some(d => d.id === currentDeptId)) {
          setValue("department_id", null);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, [watch("branch_id"), payload]); // ✅ also depend on payload


  const selectedBranchName = branches.find((b) => b.id === selectedBranchId)?.name || "Select Branch";

  const onSubmit = async (data) => {

    setGlobalError(null); // 👈 CRITICAL: Clear previous errors on new submission

    // Map the collected form data to the final required employee payload structure
    const finalPayload = {
      title: data.title,
      joining_date: data.joining_date,
      // Construct full_name if not explicitly entered
      full_name: data.full_name || `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      display_name: data.display_name,
      first_name: data.first_name,
      last_name: data.last_name,
      employee_id: data.employee_id,
      system_user_id: data.system_user_id, // Empty string if no input field exists
      phone_number: data.phone_number,
      whatsapp_number: data.whatsapp_number,
      branch_id: data.branch_id,
      department_id: data.department_id,
    };

    if (imageFile) {
      finalPayload.profile_image_base64 = await convertFileToBase64(imageFile);
    }

    try {

      await updateEmployee(finalPayload, data.id);

      setOpen(true);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setOpen(false);

      router.push(`/employees`);

    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  };

  return (
    <>
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Employee Profile
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Employee personal information and contacts, document etc.
          </p>
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-[minmax(140px,auto)]"
      >
        <div
          className="glass-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 p-8 flex flex-col justify-between rounded-2xl relative overflow-hidden group"
        >
          <div
            className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-transparent to-transparent"
          ></div>
          <div
            className="flex flex-col sm:flex-row gap-6 items-start relative z-10"
          >
            <div className="relative">
              <div
                className="size-24 rounded-2xl bg-cover bg-center no-repeat "
                data-alt="High resolution professional portrait of employee"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBy91H_sAck7802OraM2Bi7mJAwHll1qP1a6pqfnfhDs3WNn67hHTpxnjdf7BRvngncy1RgHoY6TNkxTypaknUow-0MRyrpB3AAsz7Yc6-mpoYFiHdx6tp1oD-3-x-w24B2XB9NAtI1FXwW-ai8gwOxdYr4Czoyybwib1lBNVticZmhasZTIO47RvPNjT7fz9liYRT8hyTxixelcTkn_Lbext9llfOzWY7DXRjAveXepklWlJ6szMCiM1LnqE5uL1TCqsN0mG5tTlil")`,
                }}
              ></div>
              {/* <div
              className="absolute -bottom-2 -right-2 bg-white border border-gray-100 text-teal-600 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"
            >
              <div
                className="size-1.5 bg-teal-500 rounded-full animate-pulse"
              ></div>
              Active
            </div> */}
            </div>
            <div className="flex flex-col gap-1">
              <h2
                className="text-3xl font-bold text-gray-600 dark:text-gray-300 tracking-tight"
              >
                Alex Morgan
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Senior Product Designer
              </p>
              <div
                className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-300"
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]"
                  >id_card</span
                  >
                  ID: #829304
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]"
                  >location_on</span
                  >
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-600 relative z-10"
          >
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >Email Address</span
              >
              <span
                className="text-gray-600 dark:text-gray-300 font-medium hover:text-primary transition-colors cursor-pointer truncate"
              >alex.morgan@elitehr.com</span
              >
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >Department</span
              >
              <span className="text-gray-600 dark:text-gray-300 font-medium"
              >Design &amp; Experience</span
              >
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >Phone</span
              >
              <span className="text-gray-600 dark:text-gray-300 font-medium"
              >+1 (555) 019-2834</span
              >
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >Manager</span
              >
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="size-6 rounded-full bg-cover bg-center ring-1 ring-gray-100"
                  data-alt="Manager Avatar"
                  style={{
                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDOWtylDVpYzGDYVs7MpxUkPE8A96szvEO8wbKTxdyujt_lEx4do6WE9zVe_cUydxWb642p12-7s2piLDERg_jveIbJfETuwIHgNAKc8T7FWvQDBUer9R5yIZHnPHSktnNZzYytNvQ9sH3N6Xd-xN8XphXn6rUJWNIr7hV6Yc20wHMcIMHyDsCC_5nB8JtbBbKxtRaHnuz6s-QLTLDm8P8KZ6kYD49i33a89UdupvovRKL0E6PnY--jp_tHT_r3Tkl4KtL_EpyU3MVq")`,
                  }}
                ></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300"
                >Sarah Jenkins</span
                >
              </div>
            </div>
          </div>
          <button
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]"
            >edit</span
            >
          </button>
        </div>
        <div
          className="glass-card col-span-1 md:col-span-1 row-span-2 p-6 flex flex-col rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]"
              >payments</span
              >
              <span className="text-sm font-bold uppercase tracking-wider"
              >Payroll</span
              >
            </div>
            <button
              className="text-xs text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              History
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1 mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">Next Payday</span>
            <span
              className="text-3xl font-light text-gray-600 dark:text-gray-300 tracking-tight"
            >Oct 30</span
            >
            <span
              className="text-xs text-teal-600 mt-1 flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[14px] filled"
              >check_circle</span
              >
              Confirmed
            </span>
          </div>
          <div
            className="bg-slate-50 dark:bg-gray-800 rounded-xl p-4 border border-slate-100 dark:border-gray-700 mb-4 shadow-inner"
          >
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs text-gray-600 dark:text-gray-300"
              >Last Net Pay</span
              >
              <span className="text-lg font-bold text-gray-600 dark:text-gray-300"
              >$4,250.00</span
              >
            </div>
            <div className="flex items-end gap-1 h-8 mt-2 opacity-80">
              <div className="w-1/6 bg-indigo-200 rounded-t-sm h-[40%]"></div>
              <div className="w-1/6 bg-indigo-200 rounded-t-sm h-[60%]"></div>
              <div className="w-1/6 bg-indigo-200 rounded-t-sm h-[50%]"></div>
              <div className="w-1/6 bg-indigo-200 rounded-t-sm h-[75%]"></div>
              <div className="w-1/6 bg-indigo-200 rounded-t-sm h-[65%]"></div>
              <div
                className="w-1/6 bg-primary rounded-t-sm h-[90%] shadow-[0_0_10px_rgba(79,70,229,0.3)]"
              ></div>
            </div>
          </div>
          <button
            className="w-full mt-auto py-2.5 text-gray-600 dark:text-gray-300 rounded-lg bg-white dark:bg-gray-800 glass-card shadow-sm hover:shadow text-sm font-medium hover:text-primary transition-all flex items-center justify-center gap-2 group"
          >
            <span
              className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform"
            >download</span
            >
            Latest Slip
          </button>
        </div>
        <div
          className="glass-card col-span-1 p-5 flex flex-col justify-between rounded-2xl hover:border-primary/20 group"
        >
          <div className="flex justify-between items-start">
            <div
              className="size-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-100 transition-colors"
            >
              <span className="material-symbols-outlined"
              >workspace_premium</span
              >
            </div>
            <span
              className="text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >Tenure</span
            >
          </div>
          <div>
            <span className="text-3xl font-light text-gray-600 dark:text-gray-300 block"
            >3.2</span
            >
            <span className="text-sm text-gray-600 dark:text-gray-300"
            >Years of Service</span
            >
          </div>
        </div>
        <div
          className="glass-card col-span-1 p-5 flex flex-col justify-between rounded-2xl relative overflow-hidden"
        >
          <div className="flex justify-between items-start z-10 relative">
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300"
            >Annual Leave</span
            >
            <button
              className="size-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-primary text-slate-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]"
              >add</span
              >
            </button>
          </div>
          <div className="flex items-center gap-4 mt-2 z-10 relative">
            <div
              className="size-16 rounded-full flex items-center justify-center relative bg-slate-100 shadow-inner"
              style={{
                background: "conic-gradient(#4f46e5 220deg, #e2e8f0 0deg)",
              }}
            >
              <div
                className="size-14 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center z-10 shadow-sm"
              >
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">12</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-light text-gray-600 dark:text-gray-300"
              >12/20</span
              >
              <span className="text-xs text-gray-600 dark:text-gray-300"
              >Days Available</span
              >
            </div>
          </div>
          <div
            className="absolute bottom-[-20%] right-[-20%] w-24 h-24 bg-blue-100 rounded-full blur-[30px] pointer-events-none opacity-50"
          ></div>
        </div>
        <div
          className="glass-card col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-300 font-bold text-lg">
              Recent Documents
            </h3>
            <a
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              href="#"
            >View All</a
            >
          </div>
          <div className="flex flex-col gap-3">
            <div
              className="flex items-center p-3  rounded-xl glass-card  border border-transparent  hover:shadow-sm transition-all group cursor-pointer"
            >
              <div
                className="size-10 rounded-lg bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mr-4 group-hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined"
                >picture_as_pdf</span
                >
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300 truncate">
                  Employment_Contract_2024.pdf
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Added on Oct 12 • 2.4 MB
                </p>
              </div>
              <button
                className="p-2 text-gray-500 dark:text-gray-300 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
            <div
              className="flex items-center p-3 rounded-xl glass-card border border-transparent  hover:shadow-sm transition-all group cursor-pointer"
            >
              <div
                className="size-10 rounded-lg bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center mr-4 group-hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300 truncate">
                  NDA_Confidentiality.docx
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Added on Sep 04 • 840 KB
                </p>
              </div>
              <button
                className="p-2 text-gray-500 dark:text-gray-300 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>
        </div>
        <div
          className="glass-card col-span-1 p-5 rounded-2xl flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-600 dark:text-gray-300"
            >Upcoming Leave</span
            >
            <span
              className="material-symbols-outlined text-gray-500 dark:text-gray-300 text-[20px]"
            >flight_takeoff</span
            >
          </div>
          <div className="mt-auto">
            <div
              className="flex items-center gap-3 glass-card p-3 rounded-xl"
            >
              <div
                className="flex flex-col items-center justify-center  glass-card shadow-sm rounded px-2 py-1 min-w-[3rem]"
              >
                <span
                  className="text-[10px] uppercase text-gray-600 dark:text-gray-300 font-bold"
                >Nov</span
                >
                <span
                  className="text-lg font-bold text-gray-600 dark:text-gray-300 leading-none"
                >14</span
                >
              </div>
              <div className="flex flex-col ">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300"
                >Thanksgiving</span
                >
                <span className="text-xs text-gray-600 dark:text-gray-300">2 Days</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="glass-card col-span-1 p-5 rounded-2xl flex flex-col justify-between"
        >
          <span className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-2"
          >Profile Completion</span
          >
          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex justify-between items-end">
              <span className="text-3xl font-light text-primary">85%</span>
              <a
                className="text-xs text-primary font-medium hover:underline mb-1"
                href="#"
              >Finish setup</a
              >
            </div>
            <div
              className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden"
            >
              <div
                className="bg-primary h-full rounded-full w-[85%] shadow-[0_0_8px_rgba(79,70,229,0.4)]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;