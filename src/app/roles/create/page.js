"use client";

import React, { useState, useEffect, useCallback } from 'react';

import { getBranches, getDeviceList, getDeviceLogs } from '@/lib/api';

import { parseApiError } from '@/lib/utils';
import Input from '@/components/Theme/Input';
import Link from 'next/link';

export default function AttendanceTable() {

    // filters
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedDeviceId, setSelectedDevice] = useState(null);

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);

    const [employees, setAttendance] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [total, setTotalAttendance] = useState(0);

    const [branches, setBranches] = useState([]);
    const [devices, setDevices] = useState([]);

    const fetchBranches = async () => {
        try {
            setBranches(await getBranches());
        } catch (error) {
            setError(parseApiError(error));
        }
    };

    const fetchDevices = async () => {
        if (!selectedBranch) return;
        try {
            let result = await getDeviceList(selectedBranch);
            setDevices(result.map((e) => ({ name: e.name, id: e.device_id })));
        } catch (error) {
            setError(parseApiError(error));
        }
    };


    useEffect(() => {
        fetchBranches();
    }, []);


    useEffect(() => {
        fetchDevices();
    }, [selectedBranch]);

    useEffect(() => {
        fetchRecords();
    }, [currentPage, perPage]);

    const fetchRecords = async () => {
        try {
            setIsLoading(true);

            const params = {
                page: currentPage,
                per_page: perPage,
                sortDesc: 'false',
                device: selectedDeviceId,
                branch_id: selectedBranch,
                from_date: from,
                to_date: to,
            };

            const result = await getDeviceLogs(params);

            // Check if result has expected structure before setting state
            if (result && Array.isArray(result.data)) {
                setAttendance(result.data);
                setCurrentPage(result.current_page || 1);
                setTotalAttendance(result.total || 0);
                setIsLoading(false);
                return; // Success, exit
            } else {
                // If the API returned a 2xx status but the data structure is wrong
                throw new Error('Invalid data structure received from API.');
            }

        } catch (error) {
            setError(parseApiError(error))
            setIsLoading(false); // Make sure loading state is turned off on error
        }
    };


    const [activeCards, setActiveCards] = useState({
        dashboard: true,
        attendance: true,
        payroll: false,
        settings: false,
    });

    // 2. Generic handler to toggle values
    const handleToggle = (id) => {
        setActiveCards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const cards = [
        { id: 'dashboard', title: 'Dashboard', desc: 'Overview analytics & personal stats.', icon: 'dashboard', color: 'indigo' },
        { id: 'attendance', title: 'Attendance', desc: 'Time logs, shifts, and leaves.', icon: 'schedule', color: 'emerald' },
        { id: 'payroll', title: 'Payroll', desc: 'Salary slips and tax configurations.', icon: 'payments', color: 'amber' },
        { id: 'settings', title: 'Settings', desc: 'System configuration and users.', icon: 'admin_panel_settings', color: 'rose' },
    ];

    return (
        <>
            <div className="p-5 overflow-auto max-height[300px]">
                <div
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
                >
                    <div>

                        <h1 className="text-3xl font-bold text-slate-600 dark:text-slate-300 tracking-tight mb-2">
                            Create New Role
                        </h1>
                        <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
                            Configure access levels, module visibility, and specific permissions
                            for a new user role.
                        </p>
                    </div>
                    <div className="flex gap-3">


                        <Link href="/roles">
                            <button
                                className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-lg transition-colors shadow-sm"
                            >
                                Cancel
                            </button>
                        </Link>

                        <button
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-200 flex items-center gap-2"
                        >
                            <span className="material-icons-outlined text-sm">save</span>
                            Save Role
                        </button>


                    </div>
                </div>
                <div className="space-y-8">
                    <section
                        className="glass-panel rounded-xl p-8 shadow-soft border-t-4 border-t-indigo-500/20"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100"
                            >
                                1
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Basic Details</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1"
                                    >Role Name <span className="text-rose-500">*</span></label
                                    >

                                    <Input
                                        placeholder="e.g. Shift Manager"
                                        icon="search"
                                        onChange={(e) => { }}
                                    />
                                </div>
                                {/* <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1"
                                    >Role Clone (Optional)</label
                                    >
                                    <select
                                        className="w-full rounded-lg border-slate-200 bg-white/50 focus:border-indigo-500 focus:ring-indigo-500/20 shadow-sm text-slate-600"
                                    >
                                        <option value="">Start from scratch</option>
                                        <option value="hr">Clone from HR Manager</option>
                                        <option value="staff">Clone from General Staff</option>
                                    </select>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Pre-fill permissions based on an existing role.
                                    </p>
                                </div> */}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1"
                                >Description <span className="text-rose-500">*</span></label
                                >

                                <Input
                                    placeholder="Describe the responsibilities and access level for this role..."
                                    onChange={(e) => { }}
                                />
                            </div>
                        </div>
                    </section>
                    <section className="glass-panel rounded-xl p-8 shadow-soft">
                        <div
                            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100"
                                >
                                    2
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">Module Access</h2>
                                    <p className="text-xs text-slate-500">
                                        Enable high-level access to application modules.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate-500">Access Granted:</span>
                                <span
                                    className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100"
                                >2 / 4 Modules</span
                                >
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className={`p-5 rounded-xl border transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group 
                ${activeCards[card.id]
                                            ? 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-500/30 shadow-lg'
                                            : 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                                        }`}
                                >
                                    <div className="flex justify-between items-start z-10">
                                        {/* Icon Wrapper */}
                                        <div className={`p-2 rounded-lg shadow-sm transition-colors 
                    ${activeCards[card.id]
                                                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400'
                                                : 'bg-white dark:bg-slate-800 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                                            }`}
                                        >
                                            <span className="material-icons-outlined">{card.icon}</span>
                                        </div>

                                        {/* Switch Toggle */}
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={activeCards[card.id]}
                                                onChange={() => handleToggle(card.id)}
                                            />
                                            <div className={`w-9 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 dark:after:border-slate-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all 
                        ${activeCards[card.id] ? 'bg-indigo-500' : ''}`}
                                            ></div>
                                        </label>
                                    </div>

                                    <div className="z-10">
                                        <h3 className={`font-bold transition-colors ${activeCards[card.id]
                                            ? 'text-slate-800 dark:text-white'
                                            : 'text-slate-600 dark:text-slate-400'
                                            }`}>
                                            {card.title}
                                        </h3>
                                        <p className={`text-xs mt-1 transition-colors ${activeCards[card.id]
                                            ? 'text-slate-500 dark:text-slate-300'
                                            : 'text-slate-400 dark:text-slate-500'
                                            }`}>
                                            {card.desc}
                                        </p>
                                    </div>

                                    {/* Background Icon Decoration - Fixed for Dark Mode */}
                                    <div className={`absolute -bottom-4 -right-4 opacity-10 dark:opacity-[0.05] z-0 transition-colors 
                ${activeCards[card.id] ? 'text-indigo-500' : 'text-slate-400'}`}>
                                        <span className="material-icons-outlined text-[80px]">{card.icon}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-md rounded-xl p-8 shadow-soft border border-slate-200 dark:border-slate-800 transition-colors">
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-100 dark:border-indigo-800">
                                    3
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                                        Advanced Permissions
                                    </h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Fine-tune actions (View, Edit, Delete) for each sub-module.
                                    </p>
                                </div>
                            </div>

                            {/* Search Input */}
                            <div className="relative w-full md:w-72 group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-icons-outlined text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                        search
                                    </span>
                                </span>
                                <input
                                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 dark:text-slate-200 placeholder-slate-400 transition-all text-sm shadow-sm"
                                    placeholder="Search permissions..."
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Table Container */}
                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white/50 dark:bg-slate-900/20">
                            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                                <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-xs uppercase font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                    <tr>
                                        <th className="px-6 py-4 w-1/3">Feature / Capability</th>
                                        <th className="px-6 py-4 text-center">View</th>
                                        <th className="px-6 py-4 text-center">Create</th>
                                        <th className="px-6 py-4 text-center">Edit</th>
                                        <th className="px-6 py-4 text-center">Delete</th>
                                        <th className="px-6 py-4 text-center">Approve/Export</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {[
                                        { title: "Employee Directory", desc: "Personal profiles & contact info", icon: "people_outline" },
                                        { title: "Time Tracking", desc: "Daily logs and attendance correction", icon: "timer" },
                                        { title: "Company Reports", desc: "Financial and operational analytics", icon: "analytics" }
                                    ].map((row, idx) => (
                                        <tr key={idx} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shadow-sm">
                                                        <span className="material-icons-outlined text-sm">{row.icon}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-700 dark:text-slate-200">{row.title}</p>
                                                        <p className="text-xs text-slate-400 dark:text-slate-500">{row.desc}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer" />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer" />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer" />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer" />
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {idx === 2 ? (
                                                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer" />
                                                ) : (
                                                    <span className="text-slate-300 dark:text-slate-700 material-icons-outlined text-sm" title="Not Applicable">block</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Info */}
                        <div className="mt-4 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 px-2">
                            <p>* Changes to permissions may take up to 5 minutes to reflect for active users.</p>
                            <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                                Reset to Default
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
