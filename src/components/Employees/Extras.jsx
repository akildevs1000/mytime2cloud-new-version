"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getBranches, uploadEmployee } from "@/lib/api";
import { MoreVertical, Download, Upload } from "lucide-react";

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

import { Button } from "@/components/ui/button";
import axios from "axios";

import { getUser } from "@/config/index";

export function EmployeeExtras({ data, onUploadSuccess }) {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [errors, setErrors] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

  // Fetch branches
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

  const handleSelectBranch = (currentValue) => {
    if (currentValue === "Select All") {
      setSelectedBranch(null);
    } else {
      const selectedBranchItem = branches.find((b) => b.name === currentValue);
      if (selectedBranchItem) {
        setSelectedBranch(
          selectedBranchItem.id === selectedBranch
            ? null
            : selectedBranchItem.id,
        );
      }
    }
    setPopoverOpen(false);
  };

  const handleDownloadSample = async () => {
    const link = document.createElement("a");
    link.href = "/employees.csv";
    link.download = "employees.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportEmployees = async () => {
    if (data.length == 0) {
      return;
    }

    let csvData = json_to_csv(data);
    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8, " + encodeURIComponent(csvData),
    );
    element.setAttribute("download", "download.csv");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const json_to_csv = (json) => {
    let data = json.map((e) => ({
      first_name: e.first_name,
      last_name: e.last_name,
      branch_name: e.department.branch && e.department.branch.branch_name,
      email: e.user.email,
      phone_number: e.phone_number,
      whatsapp_number: e.whatsapp_number,
      phone_relative_number: e.phone_relative_number,
      whatsapp_relative_number: e.whatsapp_relative_number,
      employee_id: e.employee_id,
      joining_date: e.show_joining_date,
      department: e.department.name,
      sub_department: e.sub_department.name,
      designation: e.designation.name,
    }));
    let header = Object.keys(data[0]).join(",") + "\n";
    let rows = "";
    data.forEach((e) => {
      rows += Object.values(e).join(",").trim() + "\n";
    });
    return header + rows;
  };

  const importEmployee = async () => {
    setSnackbar(null);

    if (!selectedBranch) {
      alert("Select Branch");
      return;
    }
    if (!files) {
      alert("Select a file to upload");
      return;
    }

    let user = await getUser();
    if (!user) {
      console.log("User not found. Please login again.");
      return;
    }
    console.log("🚀 ~ importEmployee ~ user.:", user.company_id);
    const payload = new FormData();
    payload.append("employees", files);
    payload.append("company_id", user.company_id || 0);
    payload.append("branch_id", selectedBranch);

    setBtnLoader(true);

    try {
      const data = await uploadEmployee(payload);

      setBtnLoader(false);

      if (!data.record) {
        setErrors(data.errors || []);
        setSnackbar("Employee cannot import check file or entries");
        return;
      } else {
        // ✅ Call parent callback
        if (onUploadSuccess) {
          onUploadSuccess(); // parent can refresh data or show a message
        }

        setErrors([]);
        setSnackbar(null);
        // You can refresh your data here if needed
        setDialogOpen(false);
        setFiles(null);
      }
    } catch (e) {
      setBtnLoader(false);
      if (e.toString().includes("Network Error")) {
        setErrors([
          "File is modified. Please cancel the current file and try again",
        ]);
      } else {
        setErrors([e.message]);
      }
    }
  };

  return (
    <>
      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="
      p-2 transition-all duration-200 rounded-xl border glass-card
      !bg-white border-gray-200 text-slate-600 hover:bg-gray-50
      dark:!bg-slate-900 dark:border-white/10 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:border-white/20
      active:scale-95
    "
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="
      w-60 mt-2 p-1.5 rounded-xl shadow-2xl animate-toast
      glass-panel !bg-white border-gray-200
      dark:!bg-slate-900 dark:border-white/10
    "
        >
          <DropdownMenuItem
            onClick={handleDownloadSample}
            className="
        flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-200 font-body text-sm
        /* Light Hover */
        text-slate-600 hover:bg-slate-100 hover:text-slate-900 outline-none
        /* Dark Hover */
        dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100
      "
          >
            <Download className="w-4 h-4 opacity-70" />
            <span>Download Sample File</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setDialogOpen(true)}
            className="
        flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-200 font-body text-sm
        text-slate-600 hover:bg-slate-100 hover:text-slate-900 outline-none
        dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100
      "
          >
            <Upload className="w-4 h-4 opacity-70" />
            <span>Import Employees</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleExportEmployees}
            className="
        flex items-center gap-2 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-200 font-body text-sm
        text-slate-600 hover:bg-slate-100 hover:text-slate-900 outline-none
        dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100
      "
          >
            <Download className="w-4 h-4 opacity-70" />
            <span>Export Employees</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md w-[90%] p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Upload Employees</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-500 mb-4">
            Select branch and CSV file to upload employees.
          </p>

          {/* Branch Dropdown */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={popoverOpen}
                className="w-full justify-between mb-4"
              >
                {selectedBranch
                  ? branches.find((b) => b.id === selectedBranch)?.name
                  : "Select Branch"}
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
                  <CommandItem value="Select All" onSelect={handleSelectBranch}>
                    Select All
                  </CommandItem>
                  {branches.map((branch) => (
                    <CommandItem
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

          {/* File input */}
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFiles(e.target.files[0])}
            className="mb-4"
          />

          {errors.length > 0 && (
            <div className="text-red-500 mb-2">
              {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          <Button
            onClick={importEmployee}
            disabled={btnLoader}
            className="w-full"
          >
            {btnLoader ? "Uploading..." : "Upload"}
          </Button>

          {snackbar && (
            <p className={`text-${snackbar ? "green" : "red"}-500 mt-2`}>
              {snackbar}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
