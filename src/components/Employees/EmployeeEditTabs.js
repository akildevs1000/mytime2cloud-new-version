"use client";

import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

import CompensationSection from './Edit/CompensationSection';
import BankingDetails from './Edit/BankingDetails';
import EmployeeProfileTest from './Edit/Education';
import EmployeeDocuments from './Edit/Document';
import Form from './Form';
import EmployeeContact from './Edit/Contact';

const EditEmployeeRecord = ({ selectedEmployee }) => {

    const [activeTab, setActiveTab] = useState('Personal');
    const [payload, setPayload] = useState(null);

    const tabs = ['Personal', 'Contact', 'Document', 'Payroll', 'Banking', 'Education'];

    useEffect(() => {
        setPayload(selectedEmployee);
    }, [selectedEmployee])


    if (!selectedEmployee) return;
    if (!payload) return;

    return (
        <main className="mx-auto p-6 md:p-10 overflow-y-auto max-h-[calc(100vh-100px)]">

            {/* Breadcrumbs & Header */}
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>Employees</span>
                    <ChevronRight size={14} />
                    <span className="text-[#7f19e6] font-medium">Edit Record</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Edit Employee Record
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                    Update personal information, contact details, and identification documents.
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-[#dbd0e7] dark:border-slate-700 mb-6">
                <div className="flex gap-8 ">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-1 text-sm font-bold tracking-wide uppercase transition-colors border-b-[3px] ${activeTab === tab
                                ? 'border-[#7f19e6] text-[#7f19e6]'
                                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab == "Personal" && <Form action={'Edit'} payload={payload} />}
            {activeTab == "Contact" && <EmployeeContact action={'Edit'} payload={payload} />}
            {activeTab == "Document" && <EmployeeDocuments employee_id={payload.id} />}
            {activeTab == "Banking" && <BankingDetails action={'Edit'} payload={payload} />}


            {
                activeTab == "Payroll" && <>
                    <CompensationSection />
                </>
            }

         
            {
                activeTab == "Education" && <>
                    <EmployeeProfileTest />
                </>
            }

        </main>
    );
};

export default EditEmployeeRecord;