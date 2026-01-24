"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

import { getBranches, getDepartments, getDevices } from '@/lib/api';

import DropDown from '@/components/Theme/DropDown';
import { parseApiError } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SuccessDialog } from '@/components/SuccessDialog';

export default function AttendanceTable() {

  // filters
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);



  useEffect(async () => {
    try {
      setBranches(await getBranches());
      setDepartments(await getDepartments());
    } catch (error) {
      setError(parseApiError(error));
    }
  }, []);

  const handleSuccess = (e) => {
    setSuccessOpen(true);
    setSucessObject(e);
  }

  return (
    <div className='p-5 space-y-10 relative z-10'>
      <header
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-surface backdrop-blur-xl p-6 rounded-2xl shadow-glass border border-glass-border"
      >
        <div>
          <h1
            className="text-3xl font-bold text-gray-600 dark:text-gray-300 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700"
          >
            Elite Sync Studio
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Enterprise Personnel &amp; Hardware Bridge
          </p>
        </div>
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <div className="relative group min-w-[180px]">
            <DropDown
              items={branches}
              selectedItem={selectedBranch}
              onSelect={(item) => {
                setSelectedBranch(item);
                setCurrentPage(1); // Any extra logic goes here
              }}
              placeholder="Select a Branch"
              width="w-[320px]"
            />
          </div>
          <div className="relative group min-w-[180px]">
            <DropDown
              items={departments}
              selectedItem={selectedBranch}
              onSelect={(item) => {
                setSelectedBranch(item);
                setCurrentPage(1); // Any extra logic goes here
              }}
              placeholder="Select a Branch"
              width="w-[320px]"
            />
          </div>
          <div className="relative group min-w-[180px]">
            <DropDown
              items={branches}
              selectedItem={selectedBranch}
              onSelect={(item) => {
                setSelectedBranch(item);
                setCurrentPage(1); // Any extra logic goes here
              }}
              placeholder="Select a Branch"
              width="w-[320px]"
            />
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className="lg:col-span-5 flex flex-col h-[480px] bg-surface backdrop-blur-xl rounded-xl shadow-glass border border-white/60 overflow-hidden shadow-glass-inner"
        >
          <div
            className="p-5 border-b border-slate-200/50 bg-white/30 backdrop-blur-sm space-y-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-xl"
                  >group</span
                >
                Available Employees
              </h2>
              <span
                className="text-[10px] font-bold tracking-wider px-2.5 py-1 bg-slate-200/50 text-slate-600 rounded-full uppercase"
                >8 Total</span
              >
            </div>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
                >search</span
              >
              <input
                className="w-full bg-white/60 border-none rounded-lg py-2 pl-9 pr-4 text-xs font-medium placeholder-slate-400 focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                placeholder="Search ID or Name..."
                type="text"
              />
            </div>
          </div>
          <div className="overflow-y-auto custom-scroll flex-1">
            <div
              className="grid grid-cols-12 gap-2 px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100/50"
            >
              <div className="col-span-1"></div>
              <div className="col-span-8">Personnel Profile</div>
              <div className="col-span-3 text-right">Badge ID</div>
            </div>
            <label
              className="group flex items-center px-5 py-3.5 border-b border-slate-100/60 hover:bg-white/60 transition-all cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <input className="peer sr-only toggle-checkbox" type="checkbox" />
                <div
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white toggle-label flex items-center justify-center transition-all duration-200 peer-checked:shadow-glow"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 transform scale-50 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 flex-1">
                <img
                  alt="User"
                  className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG6lYB6LubqdvjeIJjHP3vsvIfQn5gP2h_QwAqw2HYnfk9EmHxzOyzuCshScMK-gfeTQmmu6ndRSho62SDMit-xaLjmdONK9FW8N3_yWYO-KQmmuRZ0Ob2z2YaOpXgG_ttWG1rXBFw1lLrQCCJsnoj09v3kqJxZvTPH61jbTa7d1Ou9KQfxCQACjS6p4QnQcEONdfuUhDgIsonxeqV2BDPVRMjIWArLDOtzEGZw3zUjhv4bkA6LN1UITXSL74uI2vbwWuOcsmVgrPM"
                />
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors"
                    >Nihal Nihal</span
                  >
                  <span className="text-[10px] text-slate-400 font-medium"
                    >Engineering Dept</span
                  >
                </div>
              </div>
              <span
                className="text-xs text-slate-500 font-mono tracking-tight bg-slate-100/50 px-2 py-0.5 rounded"
                >1000015</span
              >
            </label>
            <label
              className="group flex items-center px-5 py-3.5 border-b border-slate-100/60 hover:bg-white/60 transition-all cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <input className="peer sr-only toggle-checkbox" type="checkbox" />
                <div
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white toggle-label flex items-center justify-center transition-all duration-200 peer-checked:shadow-glow"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 transform scale-50 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 flex-1">
                <img
                  alt="User"
                  className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9EP0J5CRCNVuwiZL0ry_K--BzMwMAM0ZHV_h8tjHY_6wNnX00G8NhN7_JZ3aEGFZucBrhbrx1gFCuwSVYJM78mw5Q-Rg0Rdulq76PQU4exaLoSCfkjv8EYb5-90XEnVI1MD1d61s3BcvlCVY_p8QIPYVIrwicVF1MHCu6eM5DCwpBcL2WNpWev9jV926HbXiojc_n-nNVMOlVraP3KFqc_6MoIKSSnq715wCEG1O47MzrGzULPJNM0w__AY0CCjyLJcFpGiWkflIm"
                />
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors"
                    >PRADEEP PRADEEP</span
                  >
                  <span className="text-[10px] text-slate-400 font-medium"
                    >Operations</span
                  >
                </div>
              </div>
              <span
                className="text-xs text-slate-500 font-mono tracking-tight bg-slate-100/50 px-2 py-0.5 rounded"
                >1073</span
              >
            </label>
            <label
              className="group flex items-center px-5 py-3.5 border-b border-slate-100/60 hover:bg-white/60 transition-all cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <input className="peer sr-only toggle-checkbox" type="checkbox" />
                <div
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white toggle-label flex items-center justify-center transition-all duration-200 peer-checked:shadow-glow"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 transform scale-50 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 flex-1">
                <img
                  alt="User"
                  className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcBkb5-3B8FHvOloR5EZxk1HAACLEHdTizUPYlLC4bCI-M7RuFh5ybpcCm0HgE7X2dES-u9r4ys-B8GTwVZNMFeMleZMqqeZLtMf7NAv1aD1pWdZymBSljxSebcMkpCKsoSnFVUHa8Kx1Lk0X4JdScBZ7cjFd61Wnvh1r0N2aKcEimHyLWZo44ORW3qVUvyIr4ApI1hW8jzrRNCH0gpr3NZ2ZhcRRvofySWvFqT_rxxZFX0lvFj3g0K17JhYm_hdzfYB_GwiT6_w8G"
                />
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors"
                    >FRANCIS FRANCIS</span
                  >
                  <span className="text-[10px] text-slate-400 font-medium"
                    >Sales Lead</span
                  >
                </div>
              </div>
              <span
                className="text-xs text-slate-500 font-mono tracking-tight bg-slate-100/50 px-2 py-0.5 rounded"
                >1079</span
              >
            </label>
            <label
              className="group flex items-center px-5 py-3.5 border-b border-slate-100/60 hover:bg-white/60 transition-all cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <input className="peer sr-only toggle-checkbox" type="checkbox" />
                <div
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white toggle-label flex items-center justify-center transition-all duration-200 peer-checked:shadow-glow"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 transform scale-50 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 flex-1">
                <img
                  alt="User"
                  className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHCUUnWKAVEwoiVY0Cpt-CP8tlgxuOkKnW9tIsHz43a-Qo1iwSsbEyS_boVCUnGnU1s8MUiQ8uVJ5Wd4TmM3m_2Y29NIl5zRfFWoFjyT6ZR90VU5CkKCaf7omLUfU_w0bHU1qM5_zNIe7wIuSONfX6RORMQGSFhHZsN4KmnzLmsFA49nmlMpQ0_qErYhbMyv04uIjhYb84YMRZome3WAgjhW9dgdwdMslzcepHODMSw0kE4vkGcn0QPcp1ksGYsRsQZekbodPNhW9r"
                />
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors"
                    >HARSHAD PAMBODAN</span
                  >
                  <span className="text-[10px] text-slate-400 font-medium"
                    >HR Manager</span
                  >
                </div>
              </div>
              <span
                className="text-xs text-slate-500 font-mono tracking-tight bg-slate-100/50 px-2 py-0.5 rounded"
                >1061</span
              >
            </label>
            <label
              className="group flex items-center px-5 py-3.5 border-b border-slate-100/60 hover:bg-white/60 transition-all cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <input className="peer sr-only toggle-checkbox" type="checkbox" />
                <div
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white toggle-label flex items-center justify-center transition-all duration-200 peer-checked:shadow-glow"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 transform scale-50 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 flex-1">
                <img
                  alt="User"
                  className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRa1btLcahbPH_pi-XQJxRLGfEi2eiP4oWXC9qd3bZ4_al5MkKOssLIMniQjuLkeOgDLxUligKbBcKQ9upOZAeeSYAneRByfguuKwKIn8tl_3QCmRoayTFSB4mlFe21YeQhsA1s-wRxu1S6GhaqvN4g61SGn7xJE_M4cNKF_gJJgqnwfz0upnShVvjPBLI-L4G7ICmoMUXUTyT9Tn6J4lOlAt0B2OfoJOy1D33v7wPDYzIvGx7gVE6btd3MV1oz4Gf3ZlMTsPD-z4t"
                />
                <div className="flex flex-col">
                  <span
                    className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors"
                    >AMEER AMEER</span
                  >
                  <span className="text-[10px] text-slate-400 font-medium"
                    >Support</span
                  >
                </div>
              </div>
              <span
                className="text-xs text-slate-500 font-mono tracking-tight bg-slate-100/50 px-2 py-0.5 rounded"
                >1092</span
              >
            </label>
          </div>
        </div>
        <div
          className="lg:col-span-2 flex flex-col justify-center items-center h-full py-4 lg:py-0"
        >
          <div
            className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg rounded-full px-3 py-6 flex flex-row lg:flex-col gap-3 items-center"
          >
            <button
              className="group w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              <span
                className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform"
                >chevron_right</span
              >
            </button>
            <button
              className="group w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              <span
                className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform"
                >keyboard_double_arrow_right</span
              >
            </button>
            <div className="h-px w-6 lg:w-px lg:h-6 bg-slate-300/50 my-1"></div>
            <button
              className="group w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              <span
                className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform"
                >chevron_left</span
              >
            </button>
            <button
              className="group w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-glow transition-all duration-300"
            >
              <span
                className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform"
                >keyboard_double_arrow_left</span
              >
            </button>
          </div>
        </div>
        <div
          className="lg:col-span-5 flex flex-col h-[480px] bg-white/70 backdrop-blur-2xl rounded-xl shadow-glass border border-white/70 overflow-hidden relative"
        >
          <div
            className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(99,102,241,0.05)]"
          ></div>
          <div
            className="p-5 border-b border-indigo-100/50 bg-indigo-50/30 backdrop-blur-sm flex justify-between items-center relative z-10"
          >
            <h2 className="font-semibold text-indigo-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400 text-xl"
                >verified_user</span
              >
              Selected Personnel
            </h2>
            <span
              className="text-[10px] font-bold tracking-wider px-2.5 py-1 bg-indigo-100 text-indigo-600 rounded-full uppercase"
              >3 Queued</span
            >
          </div>
          <div className="overflow-y-auto custom-scroll flex-1 relative z-10">
            <div
              className="grid grid-cols-12 gap-2 px-6 py-3 text-[10px] font-bold text-indigo-300 uppercase tracking-widest border-b border-indigo-50"
            >
              <div className="col-span-1"></div>
              <div className="col-span-8">Personnel Profile</div>
              <div className="col-span-3 text-right">Badge ID</div>
            </div>
            <label
              className="group flex items-center px-5 py-3.5 border-b border-indigo-50 hover:bg-indigo-50/40 transition-all cursor-pointer bg-white/40"
            >
              <div className="relative flex items-center justify-center">
                <input
                  checked=""
                  className="peer sr-only toggle-checkbox"
                  type="checkbox"
                />
                <div
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white toggle-label flex items-center justify-center transition-all duration-200 peer-checked:bg-primary peer-checked:border-primary peer-checked:shadow-glow"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 transform scale-50 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 flex-1">
                <img
                  alt="User"
                  className="w-9 h-9 rounded-full ring-2 ring-indigo-50 shadow-sm object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXO0OD-Msa9C9tUMDP2vBfQwEE0zvQhywhzHcZq-ySLbC6AsjFk6dKqOT1BAH6w_QQE3jlz-XgG11EYU7YiAB7c_IPwbfcAd1sZ6DBxJGKKC9SyjNl07x-ls4Zq7cdjG8gGvP2pmtTGScMjUbXdIw_gc1cShtYujt9cjEBrFTt0x9ES0GsujssPOS4xbY25jTol-1HiX1SSsqF6fvfM32P-OH89u5S_bUJ405vNeKteF_4O7sy-cgycRyf61qpKlgARO3MwNhnrKFo"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700"
                    >Chacha Chacha</span
                  >
                  <span className="text-[10px] text-slate-400 font-medium"
                    >Logistics</span
                  >
                </div>
              </div>
              <span
                className="text-xs text-indigo-600 font-mono tracking-tight bg-indigo-50 px-2 py-0.5 rounded"
                >1000014</span
              >
            </label>
            <label
              className="group flex items-center px-5 py-3.5 border-b border-indigo-50 hover:bg-indigo-50/40 transition-all cursor-pointer bg-white/40"
            >
              <div className="relative flex items-center justify-center">
                <input className="peer sr-only toggle-checkbox" type="checkbox" />
                <div
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white toggle-label flex items-center justify-center transition-all duration-200 peer-checked:bg-primary peer-checked:border-primary peer-checked:shadow-glow"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 transform scale-50 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 flex-1">
                <img
                  alt="User"
                  className="w-9 h-9 rounded-full ring-2 ring-indigo-50 shadow-sm object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8817tHNkUt653HitLwr-tXszIEZFQFiexhfCcfCGpUc_cshPccnnPGgn12FTP_9pjsMLHGmdjnY0zY6HzXskJLOBOKDKBkgkOkk6AsiJdQyRApJ7SHyC2J9hLNbQORK7TCy7jlilzf3ttsXY0IxiCk-diD3-8wB3ZJ946gNgTH-S2bq22oaDpoGFcUoJJ_oNnlKscBTZA_hLB9FVFTgn97OvZsWE9rtom6ZkzPq2EfYedRm-99uGSthgUiQIHz-AsN2edQ4C1h7jW"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700"
                    >SAIYYID ABDUL</span
                  >
                  <span className="text-[10px] text-slate-400 font-medium"
                    >Field Ops</span
                  >
                </div>
              </div>
              <span
                className="text-xs text-indigo-600 font-mono tracking-tight bg-indigo-50 px-2 py-0.5 rounded"
                >1042</span
              >
            </label>
            <label
              className="group flex items-center px-5 py-3.5 border-b border-indigo-50 hover:bg-indigo-50/40 transition-all cursor-pointer bg-white/40"
            >
              <div className="relative flex items-center justify-center">
                <input className="peer sr-only toggle-checkbox" type="checkbox" />
                <div
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white toggle-label flex items-center justify-center transition-all duration-200 peer-checked:bg-primary peer-checked:border-primary peer-checked:shadow-glow"
                >
                  <svg
                    className="w-3 h-3 text-white opacity-0 transform scale-50 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4 flex-1">
                <img
                  alt="User"
                  className="w-9 h-9 rounded-full ring-2 ring-indigo-50 shadow-sm object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfvheqrvo6ekhq57ddXM88C9KsfthDMQL6Un8OhepZxHP4mXkDrBK_v8zwijJv2EfRr8owUdVLAZQrJ6bXUfmxNRGB-yGlw1cUijFoEYN4BGp5xzVZoZuM1zFgRNTk2aj0yIdYDUomJXERVcTIdXltkSIlDA-zFBsrTlr9sHR4iXPzui-tHk78NTfLCjg3hzfJ1k-N7-yDSUiYtXGftl_0FnrqsJrCjN4DlEeywk4n5_rMr-H9by37lhUVQyF7435JH1Ra5rofTaLo"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700"
                    >SAJIDH SAJIDH</span
                  >
                  <span className="text-[10px] text-slate-400 font-medium"
                    >Analyst</span
                  >
                </div>
              </div>
              <span
                className="text-xs text-indigo-600 font-mono tracking-tight bg-indigo-50 px-2 py-0.5 rounded"
                >1044</span
              >
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}
