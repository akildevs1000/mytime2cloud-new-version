"use client";

import { getDocuments } from '@/lib/api';
import { FileType, ImageIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const Profile = ({ payload }) => {

  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      let employees = await getDocuments(payload.id);
      console.log(employees);

      setDocuments(employees);
    } catch {
      setDocuments([]);
    }
  };

  // fetch documents
  useEffect(() => {
    fetchDocuments();
  }, [payload.id]);




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
                  backgroundImage: `url("${payload.profile_picture}")`,
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
                {payload.full_name}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Dept: {payload?.department?.name}
              </p>
              <div
                className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-300"
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]"
                  >id_card</span
                  >
                  ID: {payload.employee_id}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]"
                  >location_on</span
                  >
                  {payload?.present_address?.room_no} {payload?.present_address?.street_address}, {payload?.present_address?.city}
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
              > {payload?.user?.email} </span
              >
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >Department</span
              >
              <span className="text-gray-600 dark:text-gray-300 font-medium"
              >{payload?.department?.name} </span
              >
            </div>
            <div className="flex flex-col gap-1">
              <span
                className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >Phone</span
              >
              <span className="text-gray-600 dark:text-gray-300 font-medium"
              >{payload?.phone_number}</span
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
                >{payload?.reporting_manager?.first_name}</span
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

            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center p-3 rounded-xl glass-card border border-transparent hover:shadow-sm transition-all group cursor-pointer"
              >
                {/* Icon Container */}
                {/* <div className="size-10 rounded-lg bg-red-50 text-red-500 border border-red-100 flex items-center justify-center mr-4 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined">picture_as_pdf</span>
                </div> */}
                <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center rounded ${doc.type === 'pdf' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                  {doc.type === 'pdf' ? <FileType size={20} /> : <ImageIcon size={20} />}
                </div>

                {/* Document Details */}
                <div className="flex-1 min-w-0 ml-5">
                  <h4 className="text-sm font-bold text-gray-600 dark:text-gray-300 truncate">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Added on {doc.created_at}
                  </p>
                </div>

                {/* Action Button */}
                <a
                  href={doc.access_url}
                  download={doc.access_url} // Force download filename
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="p-2 text-gray-400 hover:text-blue-500">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </a>
              </div>
            ))}

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