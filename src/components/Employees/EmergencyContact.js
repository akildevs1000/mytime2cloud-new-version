"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SuccessDialog } from "@/components/SuccessDialog";
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
import { useRouter } from "next/navigation";
import { PhoneCall } from "lucide-react";
import { updateEmergencyContact } from "@/lib/api";
import { parseApiError } from "@/lib/utils";

const EmergencyContact = ({ id, phone_relative_number, relation, local_address, local_city, local_country }) => {

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const form = useForm({
    defaultValues: {
      id: id,
      phone_relative_number: phone_relative_number || "",
      relation: relation || "",
      local_address: local_address || "",
      local_city: local_city || "",
      local_country: local_country || "",
    },
  });

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const handleCancel = () => router.push(`/employees`);

  const onSubmit = async (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    setGlobalError(null);
    try {
      const finalPayload = {
        phone_relative_number: data.phone_relative_number,
        relation: data.relation,
        local_address: data.local_address,
        local_city: data.local_city,
        local_country: data.local_country,
      };

      await updateEmergencyContact(finalPayload, data.id);

      setOpen(true);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setOpen(false);

      router.push(`/employees`);
    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  };


  return (<>
    <div
      className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          Contact Details
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Maintain employee primary communication channels and emergency contact information.
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[minmax(140px,auto)]">
      <div
        className="glass-card col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col rounded-lg relative overflow-hidden group min-h-[260px]">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[length:24px_24px]">
        </div>
        <div
          className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none">
        </div>
        <div className="flex items-center justify-between mb-6 z-10 relative">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Current Address</h3>
              <span className="text-xs text-[#9db0b9]">Primary residence</span>
            </div>
          </div>
          <span
            className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Verified
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 relative flex-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Street
              Address</span>
            <span className="text-white text-lg font-medium">4521 Innovation Loop</span>
            <span className="text-[#9db0b9] text-sm">Apartment 4B</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">City
                &amp; State</span>
              <span className="text-white font-medium">San Francisco, CA</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Postal
                Code</span>
              <span className="text-white font-medium">94103</span>
            </div>
          </div>
        </div>
        <div
          className="mt-6 pt-5 border-t border-white/5 z-10 relative flex justify-between items-center">
          <span className="text-xs text-[#5f717a]">Last updated: Oct 04, 2024</span>
          <button
            className="text-sm text-primary hover:text-white transition-colors flex items-center gap-2 group/btn">
            <span
              className="material-symbols-outlined text-[18px] group-hover/btn:scale-110 transition-transform">edit</span>
            Edit Details
          </button>
        </div>
      </div>
      <div
        className="glass-card col-span-1 md:col-span-2 lg:col-span-2 p-6 flex flex-col rounded-lg relative overflow-hidden group min-h-[260px]">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[length:24px_24px]">
        </div>
        <div className="flex items-center justify-between mb-6 z-10 relative">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 ring-1 ring-purple-500/20">
              <span className="material-symbols-outlined">cottage</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Permanent Address</h3>
              <span className="text-xs text-[#9db0b9]">Legal domicile</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 relative flex-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Street
              Address</span>
            <span className="text-white text-lg font-medium">892 Lakeview Estate</span>
            <span className="text-[#9db0b9] text-sm">Building C</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">City
                &amp; State</span>
              <span className="text-white font-medium">Austin, TX</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Postal
                Code</span>
              <span className="text-white font-medium">78701</span>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-white/5 z-10 relative flex justify-end items-center">
          <button
            className="text-sm text-[#9db0b9] hover:text-white transition-colors flex items-center gap-2 group/btn">
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            Copy as Current
          </button>
        </div>
      </div>
      <div className="glass-card col-span-1 lg:col-span-1 p-6 flex flex-col gap-5 rounded-lg">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <span className="material-symbols-outlined text-[20px]">contact_phone</span>
          </div>
          <h3 className="font-bold text-white">Contact Info</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="group cursor-pointer">
            <span
              className="text-xs font-bold text-[#5f717a] uppercase tracking-wider mb-1 block">Work
              Email</span>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm truncate pr-2">alex.morgan@elitehr.com</span>
              <span
                className="material-symbols-outlined text-[16px] text-[#5f717a] opacity-0 group-hover:opacity-100 transition-opacity">content_copy</span>
            </div>
          </div>
          <div className="group cursor-pointer border-t border-white/5 pt-3">
            <span
              className="text-xs font-bold text-[#5f717a] uppercase tracking-wider mb-1 block">Work
              Phone</span>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm truncate pr-2">+1 (555) 019-2834</span>
              <span
                className="material-symbols-outlined text-[16px] text-[#5f717a] opacity-0 group-hover:opacity-100 transition-opacity">call</span>
            </div>
          </div>
          <div className="group cursor-pointer border-t border-white/5 pt-3">
            <span
              className="text-xs font-bold text-[#5f717a] uppercase tracking-wider mb-1 block">Mobile</span>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm truncate pr-2">+1 (555) 982-1122</span>
              <span
                className="material-symbols-outlined text-[16px] text-[#5f717a] opacity-0 group-hover:opacity-100 transition-opacity">sms</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="glass-card col-span-1 md:col-span-2 lg:col-span-3 p-6 flex flex-col justify-between rounded-lg relative overflow-hidden">
        <div
          className="absolute right-[-20px] top-[-20px] size-32 rounded-full bg-red-500/5 blur-3xl pointer-events-none">
        </div>
        <div
          className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 ring-1 ring-red-500/20">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Emergency Contact</h3>
              <span className="text-xs text-[#9db0b9]">Primary contact for emergencies</span>
            </div>
          </div>
          <button
            className="px-3 py-1.5 rounded-md bg-[#283339] hover:bg-[#3a4b53] text-xs font-medium text-white transition-colors border border-white/5">
            + Add Secondary
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 col-span-1">
            <div
              className="size-12 rounded-full bg-[#283339] border border-white/10 flex items-center justify-center text-[#9db0b9]">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Name
                &amp; Relationship</span>
              <span className="text-white font-bold text-lg">Sarah Jenkins</span>
              <span
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-white w-fit">
                Spouse
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 col-span-1 border-l border-white/5 pl-0 md:pl-6">
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Emergency
                Phone</span>
              <span className="text-white font-medium text-base">+1 (555) 234-5678</span>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">call</span> Call
              </button>
              <button
                className="flex-1 py-1.5 rounded bg-[#283339] hover:bg-[#3a4b53] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">sms</span> Message
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-1 border-l border-white/5 pl-0 md:pl-6">
            <span
              className="text-xs font-bold text-[#5f717a] uppercase tracking-wider mb-1">Address</span>
            <p className="text-sm text-[#9db0b9] leading-relaxed">
              Same as current residential address.<br />
              <span className="text-xs italic opacity-60">4521 Innovation Loop, Apt 4B, San
                Francisco, CA</span>
            </p>
          </div>
        </div>
      </div>
    </div></>)
};

export default EmergencyContact;
