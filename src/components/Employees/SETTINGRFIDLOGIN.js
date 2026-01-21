"use client";

import Settings from './Settings';
import Login from './Login';
import RFID from './RFID';
import LeaveAndReporting from './LeaveAndReporting';

export default function SETTINGRFIDLOGIN({ employee_id, user, rfid_card_number, rfid_card_password, leave_group_id, reporting_manager_id, status }) {

    return (
        <div className="space-y-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            
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


            {/* and this should be after that */}
            <RFID employee_id={employee_id} rfid_card_number={rfid_card_number} rfid_card_password={rfid_card_password} />
        </div>
    );
}
