"use client";

import React, { useState } from "react";

const EmergencyContact = ({ payload }) => {

  const { present_address, permanent_address, contact, primary_contact } = payload || {};

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
          className="absolute right-0 top-0 w-2/3 h-full  pointer-events-none">
        </div>
        <div className="flex items-center justify-between mb-6 z-10 relative">
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary ring-1 ring-primary/20">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300 leading-tight">Current Address</h3>
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
            <span className="text-gray-600 dark:text-gray-300 text-lg font-medium">{present_address?.room_no} {present_address?.building}</span>
            <span className="text-[#9db0b9] text-sm">{present_address?.street_address}</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">City
                &amp; State</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium">{present_address?.city}, UAE</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Postal
                Code</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium">{present_address?.zip_code}</span>
            </div>
          </div>
        </div>
        <div
          className="mt-6 pt-5 border-t border-white/5 z-10 relative flex justify-between items-center">
          <span className="text-xs text-[#5f717a]">Last updated: {payload?.updated_at}</span>
          {/* <button
            className="text-sm text-primary hover:text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-2 group/btn">
            <span
              className="material-symbols-outlined text-[18px] group-hover/btn:scale-110 transition-transform">edit</span>
            Edit Details
          </button> */}
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
              <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300 leading-tight">Permanent Address</h3>
              <span className="text-xs text-[#9db0b9]">Legal domicile</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10 relative flex-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Street
              Address</span>
            <span className="text-gray-600 dark:text-gray-300 text-lg font-medium">{permanent_address?.room_no} {permanent_address?.building}</span>
            <span className="text-[#9db0b9] text-sm">{permanent_address?.street_address}</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">City
                &amp; State</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium">{permanent_address?.city}, UAE</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Postal
                Code</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium">{permanent_address?.zip_code}</span>
            </div>
          </div>
        </div>
        {/* <div className="mt-6 pt-5 border-t border-white/5 z-10 relative flex justify-end items-center">
          <button
            className="text-sm text-[#9db0b9] hover:text-gray-600 dark:text-gray-300 transition-colors flex items-center gap-2 group/btn">
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            Copy as Current
          </button>
        </div> */}
      </div>
      <div className="glass-card col-span-1 lg:col-span-1 p-6 flex flex-col gap-5 rounded-lg">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <span className="material-symbols-outlined text-[20px]">contact_phone</span>
          </div>
          <h3 className="font-bold text-gray-600 dark:text-gray-300">Contact Info</h3>
        </div>
        <div className="flex flex-col gap-4">
          <div className="group cursor-pointer">
            <span
              className="text-xs font-bold text-[#5f717a] uppercase tracking-wider mb-1 block">Work
              Email</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300 text-sm truncate pr-2">{contact?.work_email}</span>
              <span
                className="material-symbols-outlined text-[16px] text-[#5f717a] opacity-0 group-hover:opacity-100 transition-opacity">content_copy</span>
            </div>
          </div>
          <div className="group cursor-pointer border-t border-white/5 pt-3">
            <span
              className="text-xs font-bold text-[#5f717a] uppercase tracking-wider mb-1 block">Work
              Phone</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300 text-sm truncate pr-2">{contact?.work_phone}</span>
              <span
                className="material-symbols-outlined text-[16px] text-[#5f717a] opacity-0 group-hover:opacity-100 transition-opacity">call</span>
            </div>
          </div>
          <div className="group cursor-pointer border-t border-white/5 pt-3">
            <span
              className="text-xs font-bold text-[#5f717a] uppercase tracking-wider mb-1 block">Mobile</span>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300 text-sm truncate pr-2">{contact?.mobile_phone}</span>
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
              <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Emergency Contact</h3>
              <span className="text-xs text-[#9db0b9]">Primary contact for emergencies</span>
            </div>
          </div>
          {/* <button
            className="px-3 py-1.5 rounded-md bg-primary hover:bg-[#3a4b53] text-xs font-medium text-gray-100 dark:text-gray-300 transition-colors border border-white/5">
            + Add Secondary
          </button> */}

        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 col-span-1">
            <div
              className="size-12 rounded-full bg-primary border border-white/10 flex items-center justify-center text-[#9db0b9]">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Name
                &amp; Relationship</span>
              <span className="text-gray-600 dark:text-gray-300 font-bold text-lg">{primary_contact?.full_name}</span>
              <span
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-600 dark:text-gray-300 w-fit">
                {primary_contact?.relation}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4 col-span-1 border-l border-white/5 pl-0 md:pl-6">
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-bold text-[#5f717a] uppercase tracking-wider">Emergency
                Phone</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium text-base">{primary_contact?.primary_phone}</span>
            </div>
            <div className="flex gap-2">
              {/* {primary_contact?.primary_phone} */}
              <a
                href={`tel:${primary_contact?.primary_phone}`}
                className="flex-1 py-1.5 rounded bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">call</span> Call
              </a>
              <a
                href={`sms:${primary_contact?.primary_phone}`}
                className="flex-1 py-1.5 rounded bg-primary hover:bg-[#3a4b53] text-gray-100 dark:text-gray-300 text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">sms</span> Message
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-1 col-span-1 border-l border-white/5 pl-0 md:pl-6">
            <span
              className="text-xs font-bold text-[#5f717a] uppercase tracking-wider mb-1">Address</span>
            <p className="text-sm text-[#9db0b9] leading-relaxed">
              {present_address?.room_no} {present_address?.building}<br />
              <span className="text-xs italic opacity-60">{present_address?.street_address}, UAE</span>
            </p>
          </div>
        </div>
      </div>
    </div></>)
};

export default EmergencyContact;
