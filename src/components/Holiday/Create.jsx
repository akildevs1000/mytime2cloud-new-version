"use client";

import React from "react";
import Input from "../Theme/Input";
import Dropdown from "../Theme/DropDown";
import DatePicker from "../ui/DatePicker";

const Create = () => {
  return (
    <div className="mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Holiday Details */}
          <section className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm dark:shadow-2xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-white/10">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <span className="material-symbols-outlined">event_note</span>
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Holiday Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  htmlFor="holidayName"
                >
                  Holiday Name
                </label>
                <Input
                  type="text"
                  id="holidayName"
                  placeholder="e.g. Founder's Day"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <div className="relative">
                  <Dropdown
                    items={[
                      { id: 1, name: `Public Holiday` },
                      { id: 2, name: `Religious` },
                      { id: 3, name: `Corporate Event` },
                      { id: 4, name: `Regional Holiday` },
                    ]}
                    onSelect={(item) => {}}
                    placeholder="Select a Branch"
                    width="w-full"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <div className="relative">
                  {/* <input
                      type="date"
                      id="date"
                      className="w-full rounded-lg border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/50 focus:border-indigo-500 focus:ring-indigo-500 text-sm shadow-sm dark:text-slate-200 transition-colors"
                    /> */}
                  <DatePicker className="" placeholder="Pick a date" />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Applicability */}
          <section className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-white/10">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined">domain</span>
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Applicability
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Select Branch(es)
                  </label>
                  <div className="text-xs space-x-2">
                    <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                      Select All
                    </button>
                    <span className="text-slate-300 dark:text-slate-600">
                      |
                    </span>
                    <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium">
                      Clear All
                    </button>
                  </div>
                </div>
                <div className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/50 p-3 flex flex-wrap gap-2 min-h-[50px] focus-within:ring-2 focus-within:ring-indigo-500 shadow-sm cursor-text transition-all">
                  {["New York HQ", "London Office"].map((branch) => (
                    <span
                      key={branch}
                      className="inline-flex items-center px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20 text-xs font-semibold"
                    >
                      {branch}
                      <button className="ml-1 hover:text-indigo-900 dark:hover:text-indigo-100">
                        <span className="material-symbols-outlined text-[14px]">
                          close
                        </span>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-slate-400 dark:text-slate-200 min-w-[120px]"
                    placeholder="Add branches..."
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          {/* Settings Card */}
          <section className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-white/10">
              <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                <span className="material-symbols-outlined">tune</span>
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Settings
              </h2>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Recurring Holiday
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Repeat event every year
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  {/* The input MUST have the 'peer' class */}
                  <input type="checkbox" className="sr-only peer" />

                  <div
                    className="
    w-11 h-6 rounded-full transition-all duration-300
    /* Unchecked Backgrounds */
    bg-slate-200 dark:bg-slate-700
    
    /* Checked Backgrounds - Explicit Fix */
    peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500
    
    /* The Knob (White Dot) */
    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all 
    peer-checked:after:translate-x-full
  "
                  ></div>
                </label>
              </div>
            </div>
          </section>

          {/* Visuals Card */}
          <section className="bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200/60 dark:border-white/10">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Visuals
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Color Category
                </label>
                <div className="flex gap-3">
                  {[
                    "bg-indigo-500",
                    "bg-emerald-500",
                    "bg-amber-500",
                    "bg-rose-500",
                    "bg-slate-500",
                  ].map((color, i) => (
                    <label key={i} className="cursor-pointer">
                      <input
                        className="sr-only peer"
                        name="color"
                        type="radio"
                      />
                      <span
                        className={`block w-8 h-8 rounded-full ${color} ring-2 ring-offset-2 ring-transparent dark:ring-offset-slate-800 peer-checked:ring-indigo-500 transition-all hover:scale-110`}
                      ></span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  htmlFor="notes"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  placeholder="Enter holiday description here..."
                  className="
    w-full h-32 p-3 rounded-lg text-sm resize-none transition-all duration-200
    /* Background & Text */
    bg-white/80 dark:bg-slate-950/50 text-slate-900 dark:text-slate-200 placeholder-slate-400
    
    /* Border - Standard State */
    border border-slate-200 dark:border-white/10
    
    /* Focus State - This fixes the black border */
    outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
    
    /* Dark Mode Focus */
    dark:focus:ring-indigo-500/40 dark:focus:border-indigo-400
  "
                ></textarea>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-3">
        <button
          type="button"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-500
dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600 dark:hover:text-slate-300 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none hover:shadow-indigo-300 dark:hover:shadow-indigo-900/20 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
        >
          Save Holiday
        </button>
      </div>
    </div>
  );
};

export default Create;
