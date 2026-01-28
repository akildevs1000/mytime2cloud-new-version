"use client";

import Settings from './Settings';
import Login from './Login';
import RFID from './RFID';
import LeaveAndReporting from './LeaveAndReporting';

export default function SETTINGRFIDLOGIN({ employee_id, user, rfid_card_number, rfid_card_password, leave_group_id, reporting_manager_id, status }) {


    const handleValueChange = (data) => {
        console.log("Received debounced data:", data);
        // data contains: { rfid_card_number, rfid_card_password }

        // Example: Update your database or state here
        // updateEmployeeHardware(employee_id, data);
    };

    const handleSave = () => {
        console.log("Changes saved!");
    };

    const handleCancel = () => {
        console.log("Action cancelled");
    };

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
                    employee_id={employee_id}
                    leave_group_id={leave_group_id}
                    reporting_manager_id={reporting_manager_id}
                    status={status}

                    web_login_access={user.web_login_access}
                    mobile_app_login_access={user.mobile_app_login_access}
                    tracking_status={user.tracking_status}

                    user_id={user.id}
                />

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
                <Login employee_id={employee_id} user={user} />

                <RFID
                    employee_id={employee_id}
                    rfid_card_number={rfid_card_number}
                    rfid_card_password={rfid_card_password}
                    onUpdate={handleValueChange}
                />


                <div className="w-full mx-auto flex justify-end gap-3">
                    {/* Cancel Button */}
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                        type="button"
                    >
                        Cancel
                    </button>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-2"
                        type="button"
                    >
                        {/* Using a standard span for the icon - ensure Material Icons font is loaded in your project */}
                        <span className="material-icons text-sm">save</span>
                        Save All Changes
                    </button>
                </div>
            </div>
        </>

    );
}
