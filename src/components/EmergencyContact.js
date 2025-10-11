import React, { useEffect, useRef, useState } from 'react';

const EmergencyContact = () => {

    const [formData, setFormData] = useState({
        primaryPhone: '+1 (555) 987-6543',
        secondaryPhone: '',
        contactName: 'Jane Smith',
        relationship: 'Sister',
        // ... other fields (contactName, relationship, etc.)
    });

    // Handler to update the state when the input changes
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };


    return (

        <div className="py-6 space-y-8">
            <div className="flex justify-between items-center">
                <h3
                    className="text-lg font-semibold text-text-light dark:text-text-dark"
                >
                    Emergency Contact Information
                </h3>
                <button
                    className="px-4 py-2 rounded-lg bg-primary text-white flex items-center space-x-2 text-sm font-medium"
                >
                    <span className="material-icons text-base">add</span>
                    <span>Add Contact</span>
                </button>
            </div>
            <div
                className="border border-border-light dark:border-border-dark rounded-lg p-6 space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            className="block text-sm font-medium text-subtext-light dark:text-subtext-dark"
                            htmlFor="contact-name"
                        >Contact Name</label
                        >
                        <input
                            className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary p-2"
                            id="contact-name"
                            type="text"
                            value={formData.contactName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm font-medium text-subtext-light dark:text-subtext-dark"
                            htmlFor="relationship"
                        >Relationship</label
                        >
                        <input
                            className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary p-2"
                            id="relationship"
                            type="text"
                            value={formData.relationship}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label
                            className="block text-sm font-medium text-subtext-light dark:text-subtext-dark"
                            htmlFor="primary-phone"
                        >Primary Phone Number</label
                        >
                        <input
                            className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary p-2"
                            id="primary-phone"
                            type="text"
                            value={formData.primaryPhone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-sm font-medium text-subtext-light dark:text-subtext-dark"
                            htmlFor="secondary-phone"
                        >Secondary Phone Number (Optional)</label
                        >
                        <input
                            className="mt-1 block w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-primary focus:border-primary p-2"
                            id="secondary-phone"
                            type="text"
                            value={formData.secondaryPhone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        className="px-4 py-2 rounded-lg border border-red-500 text-red-500 flex items-center space-x-2 text-sm font-medium"
                    >
                        <span className="material-icons text-base">delete</span>
                        <span>Delete</span>
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-primary text-white flex items-center space-x-2 text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <span className="material-icons text-base">save</span>
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmergencyContact;