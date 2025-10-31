"use client";

// import Performance from '@/components/Performance';
import EmergencyContact from '@/components/Employees/EmergencyContact';
import Profile from '@/components/Employees/Profile';
import Address from '@/components/Employees/Address';
import Document from '@/components/Employees/Document';
import VisaPassportEmirate from '@/components/Employees/VisaPassportEmirate';
import Qualification from '@/components/Employees/Qualification';
import SETTINGRFIDLOGIN from '@/components/Employees/SETTINGRFIDLOGIN';
import BANKPAYROLL from '@/components/Employees/BANKPAYROLL';


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, MapPin, FileText, Upload, Save } from 'lucide-react';
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


import { getBranches, getEmployees } from '@/lib/api';
import { EmployeeExtras } from '@/components/Employees/Extras';
import { Input } from '@/components/ui/input';
import { convertFileToBase64 } from '@/lib/utils';

// -----------------------------------------------------------
// 1. Custom Debounce Hook
// -----------------------------------------------------------
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: clears the previous timer if the value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue;
};


// Data structure for the tabs
const TABS = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'emergency', name: 'Emergency', icon: FileText },
  { id: 'address', name: 'Address', icon: MapPin },
  { id: 'visa', name: 'Visa', icon: MapPin },
  { id: 'qualification', name: 'Qualification', icon: MapPin },
  { id: 'bank', name: 'Bank', icon: MapPin },
  { id: 'documents', name: 'Documents', icon: FileText },
  { id: 'settings', name: 'Settings', icon: MapPin },
  // { id: 'performance', name: 'Performance', icon: Briefcase },
];


export default function Home() {

  const [searchTerm, setSearchTerm] = useState("");

  const [activeTab, setActiveTab] = useState('profile');

  // Placeholder content based on the active tab
  const renderTabContent = (employee) => {
    if (!employee) return;

    let {
      id, phone_relative_number, relation, local_address, local_city, local_country, home_address, home_tel, home_mobile, home_fax, home_city, home_state, home_country,

      rfid_card_number, rfid_card_password, leave_group_id, reporting_manager_id, status,

      // relations
      visa, emirate, passport,
      qualification, bank,
      user,
      payroll

    } = employee;

    switch (activeTab) {
      case 'profile':
        return <Profile payload={employee} />;
      case 'emergency':
        return (
          <EmergencyContact
            id={id}
            phone_relative_number={phone_relative_number}
            relation={relation}
            local_address={local_address}
            local_city={local_city}
            local_country={local_country} />
        );
      case 'address':
        return (
          <Address
            id={id}
            home_address={home_address}
            home_tel={home_tel}
            home_mobile={home_mobile}
            home_fax={home_fax}
            home_city={home_city}
            home_state={home_state}
            home_country={home_country}
          />);
      case 'visa':
        return (
          <VisaPassportEmirate
            employee_id={id}
            visa={visa}
            emirate={emirate}
            passport={passport} />
        );
      case 'qualification':
        return (
          <Qualification employee_id={id} qualification={qualification} />
        );
      case 'bank':
        return (
          <BANKPAYROLL employee_id={id} bank={bank} payroll={payroll} />
        );
      case 'settings':
        return (
          <SETTINGRFIDLOGIN
            employee_id={id}
            user={user}
            rfid_card_number={rfid_card_number}
            rfid_card_password={rfid_card_password}
            leave_group_id={leave_group_id}
            reporting_manager_id={reporting_manager_id} s
            tatus={status} />
        );
      case 'documents':
        return <Document employee_id={id} />;
      // case 'performance':
      //   return <Performance payload={employee} />;
      default:
        return null;
    }
  };

  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10); // Default to 10 for a cleaner table, even if the API suggests 100
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearchChange = useCallback((event) => {
    const newQuery = event.target.value;

    // 1. Check if the input is cleared
    if (newQuery === "") {
      // 2. Reset to null instead of an empty string
      setSearchQuery(null);
    } else {
      // 3. Otherwise, set the new string value
      setSearchQuery(newQuery);
    }
  }, []);

  // Effect to trigger the actual search/API call when the DEBOUNCED value changes.
  useEffect(() => {
    // This log will only run 500ms after the user stops typing
    if (debouncedSearchQuery !== '') {
      console.log('API call or Data Filtering triggered for:', debouncedSearchQuery);
      // Example: api.fetchData(debouncedSearchQuery);
    } else if (debouncedSearchQuery === '') {
      console.log('Search query cleared. Resetting results.');
    }

  }, [debouncedSearchQuery]);


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

  const fileInputRef = useRef(null);
  const handleUploadClick = () => fileInputRef.current.click();

  const handleFileChange = async (event) => {
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
        setSelectedEmployee(prev => ({
          ...prev,
          profile_picture: base64String
        }));

      } catch (error) {
        setGlobalError("Error converting file to Base64.");
      }
    }
  };

  const renderEmployeeRow = (employee) => {
    return (
      <li key={employee.id}
        className="p-4 flex items-center space-x-4 hover:bg-primary/10 cursor-pointer bg-white"
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
      <div className="flex flex-1 gap-6">
        <div
          className="w-80 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col"
        >
          <div
            className="p-4 border-b border-border-light dark:border-border-dark flex justify-between items-center"
          >
            <h2 className="text-lg font-semibold">Employees</h2>
            <Link href="/employees/create">
              <button className="p-2 rounded-lg bg-primary text-white">
                <span className="material-icons">add</span>
              </button>
            </Link>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex space-x-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between py-4 text-gray-500 border border-gray-300 rounded-lg bg-white hover:bg-gray-100"
                  >
                    {selectedBranch
                      ? branches.find((b) => b.id === selectedBranch)?.name
                      : "Select Branch"}

                    {/* Arrow icon */}
                    <span className="material-icons text-gray-400">
                      expand_more
                    </span>
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[320px] p-0">
                  <Command>
                    <CommandInput placeholder="Search branch..." />
                    <CommandEmpty>No branch found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        className="text-gray-500"
                        value="Select All"
                        onSelect={handleSelectBranch}
                      >
                        Select All
                      </CommandItem>
                      {branches.map((branch) => (
                        <CommandItem
                          className="text-gray-500"
                          key={branch.id}
                          value={branch.name}
                          onSelect={handleSelectBranch}
                        >
                          {branch.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">


              <div className="relative flex-grow">
                <span
                  className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark"
                >search</span
                >
                <Input
                  className="w-full  pl-10 pr-4 py-2 rounded-lg border border-border-light dark:border-border-dark   focus:ring-primary focus:border-primary"
                  placeholder="Search Employees"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-border-light dark:divide-border-dark">
              {employees.map(renderEmployeeRow)}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">{selectedEmployee?.full_name || "---"}</h1>
              <p className="text-subtext-light dark:text-subtext-dark">{selectedEmployee?.employee_id || "---"}</p>
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
          </header>
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg">
            <div
              className="flex items-center space-x-6 pb-6 border-b border-border-light dark:border-border-dark"
            >
              <div>
                <img
                  onClick={handleUploadClick}
                  alt="avatar of jane cooper"
                  className="w-20 h-20 rounded-full"
                  src={selectedEmployee?.profile_picture || `https://placehold.co/40x40/6946dd/ffffff?text=${selectedEmployee?.full_name?.charAt(0)}`}
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${selectedEmployee?.full_name?.charAt(0)}`; }}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                />
                <Save className='text-primary mx-auto mt-2' />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{selectedEmployee?.full_name || "---"}</h3>
                <div
                  className="mt-2 flex items-center space-x-2 text-sm text-subtext-light dark:text-subtext-dark"
                >
                  <span className="material-icons text-base">domain</span>
                  <span>Dept: {selectedEmployee?.department?.name || "---"}</span>
                </div>
                <div
                  className="mt-2 flex items-center space-x-2 text-sm text-subtext-light dark:text-subtext-dark"
                >
                  <span className="material-icons text-base">email</span>
                  <span>{selectedEmployee?.email || "yourmail@example.com"}</span>
                </div>
                <div
                  className="mt-1 flex items-center space-x-2 text-sm text-subtext-light dark:text-subtext-dark"
                >
                  <span className="material-icons text-base">phone</span>
                  <span>{selectedEmployee?.phone_number || "---"}</span>
                </div>
              </div>

              {globalError && (
                <div
                  className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg"
                  role="alert"
                >
                  {globalError}
                </div>
              )}
            </div>
            <div className="mt-6">
              <div className="border-b border-border-light dark:border-border-dark">
                <nav aria-label="Tabs" className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
                  {TABS.map((tab) => {
                    const isCurrent = activeTab === tab.id;
                    const Icon = tab.icon;

                    const classes = isCurrent
                      ? 'border-primary text-primary'
                      : 'border-transparent text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark hover:border-border-light dark:hover:border-border-dark';

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${classes} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2 focus:outline-none`}
                      >
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content Area */}
              <div className="min-h-[250px]">
                {renderTabContent(selectedEmployee)}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
