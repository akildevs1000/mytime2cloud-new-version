import React, { useState } from "react";
// import Performance from '@/components/Performance';

import EmergencyContact from './EmergencyContact';
import Profile from './Profile';
import Address from './Address';
import Document from './Document';
import VisaPassportEmirate from './VisaPassportEmirate';
import Qualification from './Qualification';
import SETTINGRFIDLOGIN from './SETTINGRFIDLOGIN';
import BANKPAYROLL from './BANKPAYROLL';

const EmployeeTabs = ({ selectedEmployee }) => {

    const [activeTab, setActiveTab] = useState('profile');

    // Data structure for the tabs
    const TABS = [
        { id: 'profile', name: 'Profile' },
        { id: 'emergency', name: 'Emergency'  },
        { id: 'address', name: 'Address'  },
        { id: 'visa', name: 'Visa' },
        { id: 'qualification', name: 'Qualification',  },
        { id: 'bank', name: 'Bank'  },
        { id: 'documents', name: 'Documents'  },
        { id: 'settings', name: 'Settings'  },
        // { id: 'performance', name: 'Performance', icon: Briefcase },
    ];
    // Function to render tab content
    const renderTabContent = () => {

        console.log(selectedEmployee);
        
        if (!selectedEmployee) return;

        let {
            id, phone_relative_number, relation, local_address, local_city, local_country, home_address, home_tel, home_mobile, home_fax, home_city, home_state, home_country,

            rfid_card_number, rfid_card_password, leave_group_id, reporting_manager_id, status,

            // relations
            visa, emirate, passport,
            qualification, bank,
            user,
            payroll

        } = selectedEmployee;

        switch (activeTab) {
            case 'profile':
                return <Profile payload={selectedEmployee} />;
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
    return (
        <div className="mt-6">
            <div className="border-b border-border-light dark:border-border-dark">
                <nav
                    aria-label="Tabs"
                    className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto"
                >
                    {TABS.map((tab) => {
                        const isCurrent = activeTab === tab.id;
                        const classes = isCurrent
                            ? "border-primary text-primary"
                            : "border-transparent text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark hover:border-border-light dark:hover:border-border-dark";

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

            {/* Tab Content */}
            <div className="min-h-[250px]">{renderTabContent()}</div>
        </div>
    );
};

export default EmployeeTabs;
