// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

import { createDesignations } from "@/lib/api";
import { SuccessDialog } from "@/components/SuccessDialog";
import { parseApiError } from "@/lib/utils";
import Input from "../Theme/Input";
import TextArea from "../Theme/TextArea";
import Dropdown from "../Theme/DropDown";

// Reusable Toggle Component
const ToggleItem = ({ title, desc, checked, onChange }) => (
    <div className="flex items-center justify-between  rounded-xl hover:bg-surface-variant/30 transition-colors">
        <div className="flex flex-col">
            <p className="text-sm font-bold text-slate-dark dark:text-white">{title}</p>
            <p className="text-xs text-slate-500">{desc}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
            <div className="w-[52px] h-8 bg-surface-variant rounded-full peer dark:bg-gray-700 peer-checked:bg-primary border border-slate-300 dark:border-slate-600 transition-colors"></div>
            <div className="absolute left-[4px] top-[4px] bg-slate-500 w-6 h-6 rounded-full transition-transform peer-checked:translate-x-6 peer-checked:bg-white shadow-sm flex items-center justify-center">
                {checked && <span className="material-symbols-outlined text-primary text-[14px] font-bold">check</span>}
            </div>
        </label>
    </div>
);

let defaultPayload = {
    name: "",
    description: "",
};

const Create = ({ onSuccess = () => { } }) => {

    const [selectedCount, setSelectedCount] = useState(3);
    const [isOvertimeEnabled, setIsOvertimeEnabled] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const [selectedBranch, setSelectedBranch] = useState({ name: "Select Branch", id: "" });
    const [selectedDepartment, setSelectedDepartment] = useState({ name: "Select Department", id: "" });
    const [selectedShiftStatus, setSelectedShiftStatus] = useState({ name: "Select Scheduled / Un Scheduled", id: "" });
    const [selectedEmployee, setSelectedEmployee] = useState({ name: "Select Employee", id: "" });

    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([
        { id: 'EMP-2024-042', name: 'Sarah Jenkins', email: 'sarah.j@company.com', dept: 'Engineering', role: 'Senior Developer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDX4U7iiTK5ShudUldj9tzZfxOtUmjJi58np4sSrz4a-2sCDOu0b7kDd2SOeEM-fxruzRcK0PgUTlbXYSEtfZvWkL0-DWVO5O4wnwC2HDqk5dfcmInS9mYaNcbArigElI7-VsQ3-wmmz8RCMgziNFHtXGmogHhSUK0SW6ScL84LLI3TOpH5ZOcS2I2dBjLH_pBZZFCMkfCt-mesd7wYf2ZtvsCAjI4fR24Nb0d3c01SuSVVG45iTEMIN2cj-WssK891xigUWNh9t6p', color: 'blue' },
        { id: 'EMP-2024-089', name: 'Emily Davis', email: 'emily.d@company.com', dept: 'Design', role: 'Product Designer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoYgaOzt6eR8qNSkBhbzjwXQ_so6sw9GgsNJOZgBM3C0idBhbYZLA1ZEvkizJuxjaMWJEBK7e4Z51RYFMtrvHttbvM-mSMTihBRn4KmrN36dxYtve2h0y_pusxYIjuBcZnnJe-1ZipLow3Wg2by21KW_NLZ5aBCG7rMSSmLIg5xOt4W2LY5S--1NgwWoOTUCEJVUhGfaU_D9wdHw6WzkcB1LHaa-uaSxGy9C2dP3eS5d2T9pM3EeED2Tq5QJNixvsetkIoII0J88Jh', color: 'purple' },
        { id: 'EMP-2024-103', name: 'Michael Brown', email: 'michael.b@company.com', dept: 'Marketing', role: 'Marketing Lead', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF-9sFBl0giPF8I1rgRDanyFo3HIkZcuEI_ipiNEU1TbD0mrfw63VPDJTJ4Wr8RavZ3twI4d3S8ZffG0TomE_bdVTAusnUkwx5JcXv2AAcLIGqYNxJcPlWln9XGxdwOy4qPFqZ8aYIhJkiFJjKxWU0fEMizV2IESoUxD05RqC16R0_4AKcprZ6SuWoehl1lOyfphOg0xyQSw4yNNeiNTGPmEUqqtBtT8fS59YsVaNQZOvsxm_yN3bLqGbYHdAOEWsX3eZMTZ2ZCOxf', color: 'orange' },
    ]);

    const fetchDropdowns = async () => {
        try {
            setBranches([{ name: "Select All", id: "" }, ...await getBranches()]);
            setDepartments([{ name: "Select All", id: "" }, ...await getDepartments()]);
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    useEffect(() => {
        fetchDropdowns();
    }, []);


    const [open, setOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(defaultPayload);
    const toggleModal = () => setOpen(!open);

    useEffect(() => {
        if (open) {
            setForm(defaultPayload);
        }
    }, [open]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {
            let { data } = await createDesignations(form);

            // FIX: Check if status is explicitly false
            if (data?.status === false) {
                const firstKey = Object.keys(data.errors)[0];
                const firstError = data.errors[firstKey][0];
                setGlobalError(firstError);
                return; // Stop execution if there's a validation error
            }

            // Success Path
            onSuccess();
            setSuccessOpen(true);
            setOpen(false);
        } catch (error) {
            setGlobalError(parseApiError(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)}
                className="bg-primary hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded-lg flex items-center gap-1 transition-all shadow-lg shadow-primary/20"
            >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Designation
            </button>

            {/* Modal Portal Logic */}
            {open && (
                <div
                    aria-modal="true"
                    role="dialog"
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                >
                    {/* Backdrop/Overlay */}
                    <div
                        className="absolute inset-0 bg-black/70 frosted-glass transition-opacity animate-in fade-in duration-300"
                        onClick={toggleModal}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative  overflow-y-auto max-h-[calc(100vh-130px)]  bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10  overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Add Designation</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Create a new job role in the system
                                </p>
                            </div>
                            <button
                                onClick={toggleModal}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors rounded-full p-1"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>



                        <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar bg-surface-variant/30 dark:bg-black/20">
                            <div className="flex flex-col gap-6 pb-24">

                                {/* SECTION 1: TARGET EMPLOYEES */}
                                <section className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-elevation-1 border border-white/50 dark:border-white/5">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-bold text-slate-dark dark:text-white flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-on-primary-container text-sm font-bold shadow-sm">1</span>
                                            Target Employees
                                        </h2>
                                        <span className="text-xs font-medium text-primary bg-primary-container px-3 py-1.5 rounded-full">
                                            {selectedCount} Selected
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-6">

                                        {/* Filters */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <Dropdown
                                                items={branches}
                                                selectedItem={selectedBranch}
                                                onSelect={(item) => {
                                                    setSelectedBranch(item);
                                                }}
                                                placeholder="Select Branch"
                                                width="w-[320px]"
                                            />

                                            <Dropdown
                                                items={departments}
                                                selectedItem={selectedDepartment}
                                                onSelect={(item) => {
                                                    setSelectedDepartment(item);
                                                    setCurrentPage(1); // Any extra logic goes here
                                                }}
                                                placeholder="Select Department"
                                                width="w-[320px]"
                                            />

                                            <Dropdown
                                                items={[
                                                    { id: "Schedule", name: "Schedule" },
                                                    { id: "Un Schedule", name: "Un Schedule" },
                                                ]}
                                                selectedItem={selectedShiftStatus}
                                                onSelect={(item) => {
                                                    setSelectedShiftStatus(item);
                                                }}
                                                placeholder="Select Schedule/Un Schedule"
                                                width="w-[320px]"
                                            />

                                            <Input
                                                placeholder="Search by name or ID"
                                                icon="search"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />

                                        </div>


                                        {/* Employee Table */}
                                        <div className="overflow-hidden rounded-3xl border border-stone-200 dark:border-white/10 shadow-elevation-1">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-[#efece5] dark:bg-white/5 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider font-semibold border-b border-stone-200 dark:border-white/5">
                                                        <th className="px-6 py-4 font-bold">Employee Name</th>
                                                        <th className="px-6 py-4 font-bold">Employee ID</th>
                                                        <th className="px-6 py-4 font-bold">Department</th>
                                                        <th className="px-6 py-4 font-bold">Designation</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-stone-100 dark:divide-white/5 bg-surface-light dark:bg-surface-dark">
                                                    {employees.map((emp) => (
                                                        <tr key={emp.id} className="hover:bg-[#f8f6f1] dark:hover:bg-white/5 transition-colors group">
                                                            <td className="px-6 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <img
                                                                        src={emp.img}
                                                                        alt={emp.name}
                                                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-white/10 shadow-sm"
                                                                    />
                                                                    <div>
                                                                        <div className="font-bold text-slate-800 dark:text-white">{emp.name}</div>
                                                                        <div className="text-xs text-slate-500">{emp.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-mono">{emp.id}</td>
                                                            <td className="px-6 py-4">
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-${emp.color}-50 text-${emp.color}-700 dark:bg-${emp.color}-900/30 dark:text-${emp.color}-300 dark:border-${emp.color}-800`}>
                                                                    {emp.dept}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{emp.role}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>

                                {/* BOTTOM GRID */}
                                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                                    {/* SECTION 2: CONFIGURATION */}
                                    <section className="xl:col-span-1 bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-elevation-1 border border-white/50 dark:border-white/5 h-full flex flex-col">
                                        <h2 className="text-lg font-bold text-slate-dark dark:text-white flex items-center gap-3 mb-6">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-on-primary-container text-sm font-bold shadow-sm">2</span>
                                            Configuration
                                        </h2>
                                        <div className="flex flex-col gap-5 flex-1">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-200 ml-1">Shift Profile</label>
                                                <div className="relative">
                                                    <select className="w-full bg-surface-variant dark:bg-white/5 border-0 rounded-2xl py-3.5 px-4 text-sm text-slate-dark dark:text-white focus:ring-2 focus:ring-primary/50 cursor-pointer appearance-none">
                                                        <option>General Shift (09:00 - 18:00)</option>
                                                        <option>Morning Shift (06:00 - 15:00)</option>
                                                        <option>Night Shift (22:00 - 07:00)</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                                        <span className="material-symbols-outlined">expand_more</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="space-y-2">
                                                <div className="relative">
                                                    <ToggleItem
                                                        title="Enable Overtime"
                                                        desc=""
                                                        checked={isOvertimeEnabled}
                                                        onChange={() => setIsOvertimeEnabled(!isOvertimeEnabled)}
                                                    />

                                                </div>
                                            </div> */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700 dark:text-gray-200 ml-1">Effective Range</label>
                                                <div className="flex flex-col gap-3">
                                                    <input type="date" className="w-full bg-surface-variant dark:bg-white/5 border-0 rounded-2xl py-3 px-4 text-sm text-slate-dark dark:text-white focus:ring-2 focus:ring-primary/50" defaultValue="2023-10-23" />
                                                    <input type="date" className="w-full bg-surface-variant dark:bg-white/5 border-0 rounded-2xl py-3 px-4 text-sm text-slate-dark dark:text-white focus:ring-2 focus:ring-primary/50" defaultValue="2023-11-23" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* SECTION 3: PATTERN PREVIEW */}
                                    <section className="xl:col-span-2 bg-surface-light dark:bg-surface-dark rounded-3xl shadow-elevation-1 border border-white/50 dark:border-white/5 overflow-hidden flex flex-col">
                                        <div className="px-6 py-5 border-b border-gray-100 dark:border-white/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white/40 dark:bg-white/5 backdrop-blur-sm">
                                            <h2 className="text-lg font-bold text-slate-dark dark:text-white flex items-center gap-3">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-on-primary-container text-sm font-bold shadow-sm">3</span>
                                                Pattern Preview
                                            </h2>
                                            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Work</div>
                                                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>Off</div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            {/* Timeline and Bars (Simplified for brevity, similar to your HTML) */}
                                            <div className="flex flex-col w-full">
                                                <div className="flex pl-14 pr-0 text-[10px] font-bold text-slate-400 dark:text-slate-500 justify-between uppercase tracking-widest mb-2">
                                                    <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
                                                </div>
                                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                                    <div key={day} className="flex items-center group relative mb-2">
                                                        <div className="w-14 text-xs font-bold text-slate-500 dark:text-slate-400 text-right pr-4">{day}</div>
                                                        <div className="flex-1 h-2.5 bg-slate-100 dark:bg-gray-800 rounded-full relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                                                            <div className="absolute top-0 bottom-0 left-[37.5%] w-[37.5%] bg-emerald-500 shadow-sm transition-colors cursor-pointer" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                </div>


                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10  flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:text-white hover:bg-background-dark transition-all text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={onSubmit}
                                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-primary/20"
                            >
                                {loading ? "Saving..." : "Save Designation"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SuccessDialog
                successOpen={successOpen}
                onOpenChange={setSuccessOpen}
                title="Designation Saved"
                description="Designation Saved successfully."
            />
        </>
    );
};

export default Create;
