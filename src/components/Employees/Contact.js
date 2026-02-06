import React, { useState } from 'react';
import {
    ChevronRight,
    Save, Mail, Home, Shield, Copy
} from 'lucide-react';


const Contact = () => {

    const [formData, setFormData] = useState({
        workEmail: 'john.doe@company.com',
        personalEmail: 'j.doe_private@gmail.com',
        workPhone: '+1 234 567 8900',
        mobilePhone: '+1 555 019 2834',
        // ... rest of the initial state
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900 relative transition-colors duration-300 h-screen">

            {/* Header */}
            <div className="px-10 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center  bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    Contact Information
                </h3>
                <div className="text-xs text-slate-400 dark:text-slate-500 italic">
                    Last updated: Today, 10:23 AM
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1  p-10">
                <div className="max-w-4xl space-y-10">

                    {/* Section: Contact Info */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <Mail size={20} />
                            </div>
                            <h4 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wide">
                                Contact Info
                            </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <FormInput
                                label="Work Email"
                                id="workemail"
                                type="email"
                                value={formData.workEmail}
                                onChange={handleInputChange}
                            />
                            <FormInput
                                label="Personal Email"
                                id="personalemail"
                                type="email"
                                value={formData.personalEmail}
                                onChange={handleInputChange}
                            />
                            <FormInput
                                label="Work Phone"
                                id="workphone"
                                type="tel"
                                value={formData.workPhone}
                                onChange={handleInputChange}
                            />
                            <FormInput
                                label="Mobile Phone"
                                id="mobilephone"
                                type="tel"
                                value={formData.mobilePhone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </section>

                    <hr className="border-slate-200 dark:border-slate-800" />

                    {/* Section: Present Address */}
                    <section>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                    <Home size={20} />
                                </div>
                                <h4 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wide">
                                    Present Address
                                </h4>
                            </div>
                            <button className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-3 py-1.5 rounded-lg transition-colors">
                                <Copy size={16} />
                                Copy from Permanent
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <FormInput label="Room Number" id="present_room" />
                            <FormInput label="Building Name" id="present_building" />
                            <div className="md:col-span-2">
                                <FormInput label="Street Address" id="present_street" />
                            </div>
                            <FormInput label="City" id="present_city" />
                            <FormInput label="State / Province" id="present_state" />
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Country</label>
                                <select className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                </select>
                            </div>
                            <FormInput label="Zip Code" id="present_zip" />
                        </div>
                    </section>

                    <hr className="border-slate-200 dark:border-slate-800" />

                    {/* Section: Emergency Contacts */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                                <Shield size={20} />
                            </div>
                            <h4 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wide">
                                Emergency Contacts
                            </h4>
                        </div>

                        <div className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
                            <h5 className="text-sm font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2 uppercase tracking-wide">
                                <span className="w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-indigo-200 dark:ring-indigo-900"></span>
                                Primary Emergency Contact
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <FormInput label="Full Name" id="ec1_fullname" value="Jane Doe" />
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Relationship</label>
                                    <select className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5">
                                        <option>Spouse</option>
                                        <option>Parent</option>
                                    </select>
                                </div>
                                <FormInput label="Primary Phone" id="ec1_phone_primary" value="+1 555 987 6543" />
                                <FormInput label="Email Address" id="ec1_email" type="email" value="jane.doe@email.com" />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <div className="px-10 py-5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-4 shrink-0">
                <button className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-white dark:hover:bg-slate-800 transition shadow-sm">
                    Cancel
                </button>
                <button className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition flex items-center gap-2">
                    <Save size={18} /> Save Changes
                </button>
            </div>
        </div>
    );
};

// Sub-component for cleaner code
const FormInput = ({ label, id, type = "text", value, onChange, placeholder = "" }) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor={id}>
            {label}
        </label>
        <input
            className="block w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-4 outline-none transition-all"
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);



export default Contact;