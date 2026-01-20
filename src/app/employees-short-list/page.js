"use client";

import useImageUpload from "@/hooks/useImageUpload";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Save } from 'lucide-react';
import Link from 'next/link';

// NOTE: For live execution, this external API might require authentication headers (like an API Key or Authorization token) not provided here.
// The fetch logic includes retry/backoff but may still fail without proper authorization.
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

import { Button } from '@/components/ui/button';


import { getBranches, getEmployees, updateProfilePicture } from '@/lib/api';
import { EmployeeExtras } from '@/components/Employees/Extras';
import { Input } from '@/components/ui/input';
import { convertFileToBase64 } from '@/lib/utils';
import EmployeeTabs from "@/components/Employees/EmployeeTabs";
import { useRouter } from "next/navigation";

export default function EmployeeShortList() {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);




  const { FileInput, handleUploadClick, imageError } = useImageUpload({
    onChange: (base64) => {
      setSelectedEmployee((prev) => ({
        ...prev,
        profile_picture: base64,
      }));
      setImagePreview(base64)
    }
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // 👇 this runs when user clicks the Save icon
  const handleSaveClick = async () => {
    try {
      setLoading(true);
      setSuccess("");

      let payload = {
        id: selectedEmployee.id,
        profile_image_base64: selectedEmployee.profile_picture,
      };

      await updateProfilePicture(payload);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess("Profile picture updated successfully!");

      fetchEmployees(currentPage, perPage);
    } catch (err) {
      console.error(err);
      setSuccess("Error updating profile picture");
    } finally {
      setLoading(false);
      await new Promise(resolve => setTimeout(resolve, 2000));

      setImagePreview(null)

      setSuccess("");

    }
  };

  const handleSelectBranch = (currentValue) => {
    if (currentValue === "Select All") {
      setSelectedBranch(null);
    } else {
      const selectedBranchItem = branches.find((b) => b.name === currentValue);
      if (selectedBranchItem) {
        setSelectedBranch(
          selectedBranchItem.id === selectedBranch ? null : selectedBranchItem.id
        );
      }
    }
    setOpen(false);
  };

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setBranches(await getBranches());
      } catch (error) {
        setGlobalError(parseApiError(error));
      }
    };
    fetchBranches();
  }, []);


  const fetchEmployees = useCallback(async (page, perPage) => {
    setError(null);

    try {
      const params = {
        page: page,
        per_page: perPage,
        sortDesc: 'false',
        branch_id: selectedBranch,
        search: searchTerm || null, // Only include search if it's not empty
      };
      const result = await getEmployees(params);

      // Check if result has expected structure before setting state
      if (result && Array.isArray(result.data)) {
        setEmployees(result.data);
        setCurrentPage(result.current_page || 1);
        setTotalPages(result.last_page || 1);
        setTotalEmployees(result.total || 0);
        setSelectedEmployee(result.data[0] || null); // Select the first employee by default
        return; // Success, exit
      } else {
        // If the API returned a 2xx status but the data structure is wrong
        throw new Error('Invalid data structure received from API.');
      }

    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  }, [perPage, selectedBranch, searchTerm]);



  useEffect(() => {
    fetchEmployees(currentPage, perPage);
  }, [currentPage, perPage, fetchEmployees]); // Re-fetch when page or perPage changes

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
  }

  const renderEmployeeRow = (employee) => {
    return (
      <li key={employee.id}
        className="p-3  flex border-b border-gray-100 dark:border-gray-700 items-center space-x-4 hover:bg-primary/10 cursor-pointer text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900"
        onClick={() => handleRowClick(employee)}
      >
        <img
          alt="avatar of jane cooper"
          className="w-10 h-10 rounded-full"
          src={employee.profile_picture || `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`; }}
        />
        <div>
          <p className="font-medium text-text-light dark:text-text-dark">
            {employee.full_name}
          </p>
          <p className="text-sm text-subtext-light dark:text-subtext-dark">
            {employee.employee_id || 'N/A'}
          </p>
        </div>
      </li>
    );
  };

  return (
    <>
      <div className="flex flex-1 gap-6 px-5">
        <div
          className="w-80 border-r border-gray-100 dark:border-gray-700 flex flex-col"
        >
          {/* <div
            className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center"
          >
            <h2 className="text-lg font-semibold text-gray-400 dark:text-white">Employees</h2>
            <Link href="/employees/create">
              <button className="text-gray-400 dark:text-white">
                <span className="material-icons">add</span>
              </button>
            </Link>
          </div> */}
          <div className="pb-5 space-y-4">
            {/* Dropdown Container - Added 'relative' here to anchor the menu */}
            <div className="relative inline-block w-[300px]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200"
              >
                <span className="truncate">
                  {selectedBranch
                    ? branches.find((b) => b.id === selectedBranch)?.name
                    : "Select Branch"}
                </span>
                <span
                  className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                    }`}
                >
                  expand_more
                </span>
              </button>

              {isOpen && (
                <div className="absolute z-[50] w-full mt-2 origin-top bg-white border border-slate-200 rounded-xl shadow-xl dark:bg-slate-800 dark:border-slate-700 p-1.5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {branches.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => {
                          setSelectedBranch(opt.id); // Ensure you pass the ID
                          setCurrentPage(1);
                          setIsOpen(false);
                        }}
                        className="flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300"
                      >
                        {opt.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Section */}
            {/* <div className="flex items-center space-x-2">
              <div className="relative flex-grow">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  search
                </span>
                <Input
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm"
                  placeholder="Search Employees..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div> */}
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="">
              {employees.map(renderEmployeeRow)}
            </ul>
          </div>
        </div>
        <div className="flex-1">

          <EmployeeTabs selectedEmployee={selectedEmployee} />

        

          {/* <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">{selectedEmployee?.full_name || "---"}</h1>
              <p className="text-subtext-light dark:text-subtext-dark">ID: {selectedEmployee?.employee_id || "---"}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="px-4 py-2 rounded-lg border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark flex items-center space-x-2"
              >
                <span className="material-icons text-base">edit</span>
                <span>Edit</span>
              </button>
              <EmployeeExtras data={employees} onUploadSuccess={fetchEmployees} />
            </div>
          </header> */}
          <div className="p-6 rounded-lg">
            {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}

            
          </div>
        </div>

      </div>
    </>
  );
}
