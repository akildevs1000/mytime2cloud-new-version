// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

import { createDesignations, getBranches, getDepartments } from "@/lib/api";
import { SuccessDialog } from "@/components/SuccessDialog";
import { parseApiError } from "@/lib/utils";
import Input from "../Theme/Input";
import TextArea from "../Theme/TextArea";
import Dropdown from "../Theme/DropDown";
import MultiDropDown from "../ui/MultiDropDown";
import DateRangeSelect from "../ui/DateRange";
import { Checkbox } from "../ui/checkbox";

import {
    X,
    ChevronDown,
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link2,
    Image as ImageIcon,
    UploadCloud,
    FileText,
    Trash2,
    Calendar,
    Clock,
    Send
} from 'lucide-react';
import DatePicker from "../ui/DatePicker";
import TimePicker from "../ui/TimePicker";

const ToolbarButton = ({ icon, title }) => (
    <button
        className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
        title={title}
    >
        {icon}
    </button>
);

const RadioButton = ({ label, checked, onChange, name }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
            <input
                type="radio"
                name={name}
                checked={checked}
                onChange={onChange}
                className="peer size-5 cursor-pointer appearance-none rounded-full border border-gray-500 checked:border-indigo-500 checked:bg-indigo-500 transition-all"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        <span className="text-gray-600 dark:text-slate-300 font-medium group-hover:text-white transition-colors">{label}</span>
    </label>
);

// Reusable Toggle Component
const ToggleItem = ({ title, desc, checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={onChange}
        />
        {/* Track */}
        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer 
        peer-checked:bg-slate-300 dark:peer-checked:bg-slate-600 border border-transparent 
        transition-all duration-300 ease-in-out">
        </div>

        {/* Thumb (Circle) */}
        <div className="absolute left-[2px] top-[2px] w-5 h-5 rounded-full 
        shadow-md transition-all duration-300 ease-in-out 
        
        /* State-based Colors */
        bg-white peer-checked:bg-primary 
        
        peer-checked:translate-x-5">
        </div>
    </label>
);

let defaultPayload = {
    name: "",
    description: "",
};

const Create = ({ onSuccess = () => { } }) => {


    const [publishType, setPublishType] = useState('now');
    const [selectedCount, setSelectedCount] = useState(3);
    const [isOvertimeEnabled, setIsOvertimeEnabled] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const [selectedBranch, setSelectedBranch] = useState({ name: "Select Branch", id: "" });
    const [selectedDepartmentIds, setSelectedDepartment] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({ name: "Select Status", id: "" });
    const [selectedEmployee, setSelectedEmployee] = useState({ name: "Select Employee", id: "" });
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [content, setContent] = useState('');
    const [employees, setEmployees] = useState([
        { id: 'EMP-2024-042', name: 'Sarah Jenkins', email: 'sarah.j@company.com', dept: 'Engineering', role: 'Senior Developer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDX4U7iiTK5ShudUldj9tzZfxOtUmjJi58np4sSrz4a-2sCDOu0b7kDd2SOeEM-fxruzRcK0PgUTlbXYSEtfZvWkL0-DWVO5O4wnwC2HDqk5dfcmInS9mYaNcbArigElI7-VsQ3-wmmz8RCMgziNFHtXGmogHhSUK0SW6ScL84LLI3TOpH5ZOcS2I2dBjLH_pBZZFCMkfCt-mesd7wYf2ZtvsCAjI4fR24Nb0d3c01SuSVVG45iTEMIN2cj-WssK891xigUWNh9t6p', color: 'blue' },
        { id: 'EMP-2024-089', name: 'Emily Davis', email: 'emily.d@company.com', dept: 'Design', role: 'Product Designer', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoYgaOzt6eR8qNSkBhbzjwXQ_so6sw9GgsNJOZgBM3C0idBhbYZLA1ZEvkizJuxjaMWJEBK7e4Z51RYFMtrvHttbvM-mSMTihBRn4KmrN36dxYtve2h0y_pusxYIjuBcZnnJe-1ZipLow3Wg2by21KW_NLZ5aBCG7rMSSmLIg5xOt4W2LY5S--1NgwWoOTUCEJVUhGfaU_D9wdHw6WzkcB1LHaa-uaSxGy9C2dP3eS5d2T9pM3EeED2Tq5QJNixvsetkIoII0J88Jh', color: 'purple' },
        { id: 'EMP-2024-103', name: 'Michael Brown', email: 'michael.b@company.com', dept: 'Marketing', role: 'Marketing Lead', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF-9sFBl0giPF8I1rgRDanyFo3HIkZcuEI_ipiNEU1TbD0mrfw63VPDJTJ4Wr8RavZ3twI4d3S8ZffG0TomE_bdVTAusnUkwx5JcXv2AAcLIGqYNxJcPlWln9XGxdwOy4qPFqZ8aYIhJkiFJjKxWU0fEMizV2IESoUxD05RqC16R0_4AKcprZ6SuWoehl1lOyfphOg0xyQSw4yNNeiNTGPmEUqqtBtT8fS59YsVaNQZOvsxm_yN3bLqGbYHdAOEWsX3eZMTZ2ZCOxf', color: 'orange' },
        { id: 'EMP-2024-104', name: 'Michael Brown', email: 'michael.b@company.com', dept: 'Marketing', role: 'Marketing Lead', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF-9sFBl0giPF8I1rgRDanyFo3HIkZcuEI_ipiNEU1TbD0mrfw63VPDJTJ4Wr8RavZ3twI4d3S8ZffG0TomE_bdVTAusnUkwx5JcXv2AAcLIGqYNxJcPlWln9XGxdwOy4qPFqZ8aYIhJkiFJjKxWU0fEMizV2IESoUxD05RqC16R0_4AKcprZ6SuWoehl1lOyfphOg0xyQSw4yNNeiNTGPmEUqqtBtT8fS59YsVaNQZOvsxm_yN3bLqGbYHdAOEWsX3eZMTZ2ZCOxf', color: 'orange' },
        { id: 'EMP-2024-105', name: 'Michael Brown', email: 'michael.b@company.com', dept: 'Marketing', role: 'Marketing Lead', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF-9sFBl0giPF8I1rgRDanyFo3HIkZcuEI_ipiNEU1TbD0mrfw63VPDJTJ4Wr8RavZ3twI4d3S8ZffG0TomE_bdVTAusnUkwx5JcXv2AAcLIGqYNxJcPlWln9XGxdwOy4qPFqZ8aYIhJkiFJjKxWU0fEMizV2IESoUxD05RqC16R0_4AKcprZ6SuWoehl1lOyfphOg0xyQSw4yNNeiNTGPmEUqqtBtT8fS59YsVaNQZOvsxm_yN3bLqGbYHdAOEWsX3eZMTZ2ZCOxf', color: 'orange' },
        { id: 'EMP-2024-106', name: 'Michael Brown', email: 'michael.b@company.com', dept: 'Marketing', role: 'Marketing Lead', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF-9sFBl0giPF8I1rgRDanyFo3HIkZcuEI_ipiNEU1TbD0mrfw63VPDJTJ4Wr8RavZ3twI4d3S8ZffG0TomE_bdVTAusnUkwx5JcXv2AAcLIGqYNxJcPlWln9XGxdwOy4qPFqZ8aYIhJkiFJjKxWU0fEMizV2IESoUxD05RqC16R0_4AKcprZ6SuWoehl1lOyfphOg0xyQSw4yNNeiNTGPmEUqqtBtT8fS59YsVaNQZOvsxm_yN3bLqGbYHdAOEWsX3eZMTZ2ZCOxf', color: 'orange' },
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

    const [selectedIds, setSelectedIds] = useState([]);

    // Toggle single selection
    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Toggle select all
    const toggleAll = () => {
        if (selectedIds.length === employees.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(employees.map(emp => emp.id));
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)}
                className="bg-primary hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded-lg flex items-center gap-1 transition-all shadow-lg shadow-primary/20"
            >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add
            </button>

            {/* Modal Portal Logic */}
            {open && (
                <div
                    aria-modal="true"
                    role="dialog"
                    className="fixed inset-0 z-50 flex items-center justify-center"
                >
                    {/* Backdrop/Overlay */}
                    <div
                        className="absolute inset-0 bg-black/70 frosted-glass transition-opacity animate-in fade-in duration-300"
                        onClick={toggleModal}
                    ></div>

                    {/* Modal Card */}
                    <div className="relative w-[900px]    bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10  overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">

                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Create New Announcement</h3>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    Create your announcement and share it with the team.
                                </p>
                            </div>
                            <button
                                onClick={toggleModal}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors rounded-full p-1"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>



                        <div className="flex-1 overflow-y-auto max-h-[calc(90vh-130px)] p-0   custom-scrollbar bg-surface-variant/30 dark:bg-black/20">
                            <div className="flex flex-col gap-2 pb-24">
                                <section className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-elevation-1">
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-slate-400">
                                            Announcement Title <span className="text-red-400">*</span>
                                        </label>
                                        <Input
                                            required
                                            placeholder=""
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex w-full gap-6 mt-5">
                                        {/* Each child div now has flex-1 to occupy equal portions of the full width */}
                                        <div className="space-y-1.5 flex-1">
                                            <label className="block text-sm font-medium text-slate-400">
                                                Select Branch
                                            </label>
                                            <Dropdown
                                                items={branches}
                                                selectedItem={selectedBranch}
                                                onSelect={(item) => setSelectedBranch(item)}
                                                placeholder="Select Branch"
                                                width="w-full"
                                            />
                                        </div>

                                        <div className="space-y-1.5 flex-1">
                                            <label className="block text-sm font-medium text-slate-400">
                                                Select Department
                                            </label>
                                            <MultiDropDown
                                                placeholder={'Select Department'}
                                                items={departments}
                                                value={selectedDepartmentIds}
                                                onChange={setSelectedDepartment}
                                                badgesCount={1}
                                            />
                                        </div>

                                        <div className="space-y-1.5 flex-1">
                                            <label className="block text-sm font-medium text-slate-400">
                                                Search Employees
                                            </label>
                                            <Input
                                                placeholder="Search by name or ID"
                                                icon="search"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                width="w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 mt-5">
                                        <label className="block text-sm font-medium text-slate-400">
                                            Content
                                        </label>
                                        <div className="border border-border  rounded-lg overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500 transition-all  shadow-inner">
                                            <div className="flex items-center gap-1 p-2 border-b border-border ">
                                                <ToolbarButton icon={<Bold size={18} />} title="Bold" />
                                                <ToolbarButton icon={<Italic size={18} />} title="Italic" />
                                                <ToolbarButton icon={<Underline size={18} />} title="Underline" />
                                                <div className="w-px h-5 bg-gray-700 mx-1"></div>
                                                <ToolbarButton icon={<List size={18} />} title="Bullet List" />
                                                <ToolbarButton icon={<ListOrdered size={18} />} title="Numbered List" />
                                                <div className="w-px h-5 bg-gray-700 mx-1"></div>
                                                <ToolbarButton icon={<Link2 size={18} />} title="Link" />
                                                <ToolbarButton icon={<ImageIcon size={18} />} title="Image" />
                                            </div>
                                            <textarea
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                className="w-full h-64 p-4 border-none focus:ring-0 bg-transparent text-white resize-none text-base leading-relaxed placeholder:text-gray-600 outline-none"
                                                placeholder="Write your announcement details here..."
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 mt-5">
                                        <label className="block text-sm font-medium text-slate-400">
                                            Attachments
                                        </label>
                                        <div className="border-2 border-dashed dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center gap-3 text-center hover:border-indigo-500/50 transition-all cursor-pointer group">
                                            <div className="bg-obsidian  p-3 rounded-full shadow-lg group-hover:scale-110 group-hover:shadow-indigo-500/20 group-hover:shadow-xl transition-all border border-border">
                                                <UploadCloud className="text-indigo-500" size={30} />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-gray-600 dark:text-slate-300 font-medium group-hover:text-indigo-400 transition-colors">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-gray-500 text-sm">SVG, PNG, JPG or PDF (max. 10MB)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex mt-5 items-center justify-between p-3 rounded-lg border border-border  mt-2 hover:border-gray-600 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-red-500/10 text-red-400 p-2 rounded ring-1 ring-red-500/20">
                                                <FileText size={20} />
                                            </div>
                                            <div className="flex flex-col ">
                                                <span className="text-sm font-medium text-white">Q3_Overview_Draft.pdf</span>
                                                <span className="text-xs text-gray-500">2.4 MB</span>
                                            </div>
                                        </div>
                                        <button className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-full p-2 transition-all">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="h-px w-full bg-gray-200 dark:bg-gray-800 my-2"></div>

                                    {/* Publishing Options */}
                                    <div className="flex flex-col gap-4">
                                        <label className="text-gray-600 dark:text-slate-300 text-sm font-semibold leading-normal">Publishing Options</label>
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="flex flex-col gap-3 min-w-[200px]">
                                                <RadioButton
                                                    label="Publish Now"
                                                    name="publish_type"
                                                    checked={publishType === 'now'}
                                                    onChange={() => setPublishType('now')}
                                                />
                                                <RadioButton
                                                    label="Schedule for later"
                                                    name="publish_type"
                                                    checked={publishType === 'later'}
                                                    onChange={() => setPublishType('later')}
                                                />
                                            </div>

                                            {/* Date/Time Pickers (Enabled when 'later' is selected) */}
                                            <div className={`flex flex-1 flex-wrap gap-4 items-center p-4 rounded-lg border border-border transition-opacity ${publishType === 'later' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                                                <div className="flex flex-col gap-1.5 flex-1 min-w-[200px] group">
                                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">Date</label>
                                                    <div className="relative">
                                                        <DatePicker />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1.5 flex-1 min-w-[150px] group">
                                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">Time</label>
                                                    <div className="relative">
                                                    <TimePicker />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
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
                                {loading ? "Saving..." : "Save Schedule"}
                            </button>
                        </div>
                    </div >
                </div >
            )}

            <SuccessDialog
                successOpen={successOpen}
                onOpenChange={setSuccessOpen}
                title="Schedule Saved"
                description="Schedule Saved successfully."
            />
        </>
    );
};

export default Create;
