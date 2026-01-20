import React, { useState } from "react";
// import Performance from '@/components/Performance';

import EmergencyContact from './EmergencyContact';
import Profile from './Profile';
import Document from './Document';
import SETTINGRFIDLOGIN from './SETTINGRFIDLOGIN';
import Payroll from './Payroll';

const EmployeeTabs = ({ selectedEmployee }) => {

    const [activeTab, setActiveTab] = useState('profile');

    // Data structure for the tabs
    const TABS = [
        { id: 'profile', name: 'Personal' },
        { id: 'emergency', name: 'Contact' },
        { id: 'payroll', name: 'Payroll' },
        { id: 'documents', name: 'Documents' },
        { id: 'settings', name: 'Settings' },
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

          
            case 'payroll':
                return (
                    <Payroll employee_id={id} bank={bank} payroll={payroll} />
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

        <>
            <div className="mx-auto flex flex-col gap-8">
                <div className="flex justify-center md:justify-start">

                    <div
                        className="bg-white/50 dark:bg-gray-800 backdrop-blur-sm p-1 rounded-lg inline-flex relative glass-card shadow-sm"
                    >
                        {TABS.map((tab) => {
                            const isCurrent = activeTab === tab.id;
                            const classes = isCurrent
                                ? "bg-white/50 dark:bg-gray-800 text-primary"
                                : "text-gray-600 dark:text-gray-300";

                            return (

                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-6 py-2 rounded-md text-sm font-medium   transition-all hover:bg-white/50 dark:hover:bg-gray-500 ${classes}`}
                                >
                                    {tab.name}
                                </button>
                            );
                        })}



                    </div>
                </div>
                <div className="min-h-[250px]">{renderTabContent()}</div>

            </div>
        </>


    );
};

export default EmployeeTabs;
