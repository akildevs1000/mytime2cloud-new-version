"use client";

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

import Settings from './Settings';
import Login from './Login';
import RFID from './RFID';

// Data structure for the tabs
const TABS = [
    { id: 'settings', name: 'Settings', icon: MapPin },
    { id: 'login', name: 'Login', icon: MapPin },
    { id: 'rfid', name: 'RFID', icon: MapPin },
];


export default function SETTINGRFIDLOGIN({ employee_id, user, rfid_card_number, rfid_card_password, leave_group_id, reporting_manager_id, status }) {

    const [activeTab, setActiveTab] = useState('settings');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'settings':
                return (
                    <Settings
                        employee_id={employee_id}
                        leave_group_id={leave_group_id}
                        reporting_manager_id={reporting_manager_id}
                        status={status}

                        web_login_access={user.web_login_access}
                        mobile_app_login_access={user.mobile_app_login_access}
                        tracking_status={user.tracking_status}

                        user_id={user.id}
                    />
                );
            case 'login':
                return <Login employee_id={employee_id} user={user} />;
            case 'rfid':
                return <RFID employee_id={employee_id} rfid_card_number={rfid_card_number} rfid_card_password={rfid_card_password} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="bg-surface-light dark:bg-surface-dark px-6 py-4 rounded-lg flex shadow-sm">
                {/* Left Tabs */}
                <div className="flex flex-col w-48 border-r border-border">
                    {TABS.map((tab) => {
                        const isCurrent = activeTab === tab.id;
                        const classes = isCurrent
                            ? 'border-l-2 border-primary bg-surface-light dark:bg-surface-dark text-primary font-medium'
                            : 'border-l-4 border-transparent text-subtext-light dark:text-subtext-dark  hover:text-text-light dark:hover:text-text-dark';

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${classes} py-3 px-4 text-left transition-colors duration-200 focus:outline-none`}
                            >
                                {tab.name}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="flex-1 pl-6 min-h-[250px]">
                    {renderTabContent()}
                </div>
            </div>
        </>
    );
}
