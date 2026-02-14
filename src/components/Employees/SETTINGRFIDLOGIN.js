"use client";

import Settings from './Settings';
import Login from './Login';
import RFID from './RFID';
import LeaveAndReporting from './LeaveAndReporting';

export default function SETTINGRFIDLOGIN({ id, email, web_login_access, mobile_app_login_access, tracking_status, rfid_card_number, rfid_card_password, leave_group_id, reporting_manager_id, status }) {
    return (
        <>
            <div
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            >
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Settings
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Manage general preferences, security credentials, and hardware
                        access.
                    </p>
                </div>
            </div>
            <div className="space-y-8 dark:bg-slate-900 rounded-2xl overflow-y-auto h-[700px] px-3 py-10">
                {/* these settings and login section should  be in one line  */}
                <LeaveAndReporting
                    id={id}
                    leave_group_id={leave_group_id}
                    reporting_manager_id={reporting_manager_id}
                />

                <Login employee_id={id} email={email} />

                <Settings
                    id={id}
                    status={status}
                    web_login_access={web_login_access}
                    mobile_app_login_access={mobile_app_login_access}
                    tracking_status={tracking_status}
                />

                <RFID
                    id={id}
                    rfid_card_number={rfid_card_number}
                    rfid_card_password={rfid_card_password}
                />
            </div>
        </>

    );
}
