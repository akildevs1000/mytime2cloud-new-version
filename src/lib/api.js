import axios from "axios";

// usage example in page/component
// useEffect(() => {

//         const fetchCompanyInfo = async () => {
//             try {
//                 let res = await getCompanyInfo()
//                 console.log("🚀 ~ fetchCompanyInfo ~ res:", res)
//             } catch (error) {
//                 console.log(parseApiError(error));
//             }
//         }

//         fetchCompanyInfo();

//     }, []);


const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend.mytime2cloud.com/api';


import { getUser } from "@/config/index";

export const getStatuses = async () => {
    const { data } = await axios.get(`${API_BASE}/attendance-statuses`);
    return data;
};

export const getBranches = async () => {

    const user = await getUser();

    const { data } = await axios.get(`${API_BASE}/branch-list`, {
        params: {
            order_by: "name",
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getRoles = async () => {

    const user = await getUser();

    const { data } = await axios.get(`${API_BASE}/role`, {
        params: {
            order_by: "name",
            per_page: 1000,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

// companyId will be passed dynamically
export const getDepartments = async (branch_id = null) => {
    const user = await getUser();

    const { data } = await axios.get(`${API_BASE}/department-list`, {
        params: {
            branch_id: branch_id,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

// companyId will be passed dynamically
export const getCompanyId = async () => {
    const user = await getUser();
    return user?.company_id || 0
};

export const getVisitorLink = async () => {
    let company_id = await getCompanyId();
    return `http://localhost:4444/register/visitor/walkin/${company_id}`;
};

// companyId will be passed dynamically
export const getScheduleEmployees = async (params = {}) => {
    const user = await getUser();

    const { data } = await axios.get(`${API_BASE}/employees_with_schedule_count`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getDeviceLogs = async (params = {}) => {
    const user = await getUser();

    const { data } = await axios.get(`${API_BASE}/attendance_logs`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getAccessControlReport = async (params = {}) => {
    const user = await getUser();

    const { data } = await axios.get(`${API_BASE}/access_control_report`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};



export const getEmployees = async (params = {}) => {
    const user = await getUser();

    const { data } = await axios.get(`${API_BASE}/employeev1`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getShifts = async (params = {}) => {
    const user = await getUser();

    const { data } = await axios.get(`${API_BASE}/shift`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getShiftDropDownList = async (branch_id = null) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/shift_dropdownlist`, {
        params: {
            branch_id: branch_id,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getDocuments = async (id) => {
    const { data } = await axios.get(`${API_BASE}/documentinfo/${id}`);
    return data;
};

export const deleteDocument = async (id) => {
    await axios.delete(`${API_BASE}/documentinfo/${id}`);
    return true;
};

export async function uploadEmployeeDocument(employeeId, payload) {

    // employee-update-document-new
    const user = await getUser();

    const fd = new FormData();
    fd.append("title", payload.title);
    fd.append("attachment", payload.file);
    fd.append("employee_id", employeeId);
    fd.append("company_id", user?.company_id || 0);

    await axios.post(`${API_BASE}/employee-update-document-new/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return true;
}


export const getAttendnaceCount = async (branch_id = null) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/dashbaord_attendance_count`, {
        params: {
            branch_id: branch_id,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

// companyId will be passed dynamically
export const getLogs = async (page = 1, count = 10, per_page = 10) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/device/getLastRecordsHistory/${count}`, {
        params: {
            page: page,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

// companyId will be passed dynamically
export const getTodayLogsCount = async (branch_id = null, department_id = null) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/get_logs_count`, {
        params: {
            branch_id: branch_id,
            department_id: department_id,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getLogoOnly = async () => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/get-logo-only/${user?.company_id || 0}`);
    return data;
};

export const updateLogoOnly = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/update-logo-only`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};

export const storeEmployee = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/employee-store-new`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};

export const setPin = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/set-pin`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};


export const updateContact = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/company/${user?.company_id}/update/contact`, payload);
    return true;
};

export const updatePassword = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/company/${user?.company_id}/update/user`, payload);
    return true;
};

export const updateLicense = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/company/${user?.company_id}/trade-license`, payload);
    return true;
};

export const postAddPerson = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/SDK/AddPerson`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};

export const updateProfilePicture = async (payload) => {
    await axios.post(`${API_BASE}/employee-update-profile-picture`, payload);
    return true;
};

export const storeShift = async (payload) => {
    const user = await getUser();
    let { data } = await axios.post(`${API_BASE}/shift`, { ...payload, company_id: user?.company_id || 0 });
    return data;
};

export const storeSchedule = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/schedule_employees`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};

export const storePayroll = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/payroll`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};

export const updateEmployee = async (payload, id = 0) => {
    await axios.post(`${API_BASE}/employee-update-new/${id}`, payload);
    return true;
};

export const removeEmployee = async (id = 0) => {

    await axios.delete(`${API_BASE}/employee/${id}`);

    return true;
};

export const removeShift = async (id = 0) => {

    await axios.delete(`${API_BASE}/shift/${id}`);

    return true;
};

export const updateEmergencyContact = async (payload, id = 0) => {

    await axios.post(`${API_BASE}/employee-update-emergency-contact-new/${id}`, payload);

    return true;
};

export const updateBank = async (payload) => {

    const user = await getUser();

    await axios.post(`${API_BASE}/employee-update-bank-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const updateAccessSettings = async (payload) => {

    const user = await getUser();

    await axios.post(`${API_BASE}/employee-update-access-settings-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const updateLogin = async (payload) => {

    const user = await getUser();

    await axios.post(`${API_BASE}/employee-update-login-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const updateSettings = async (payload) => {

    const user = await getUser();

    await axios.post(`${API_BASE}/employee-update-settings-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const getLeaveGroups = async () => {

    const user = await getUser();

    let { data } = await axios.get(`${API_BASE}/leave_groups`, { company_id: user?.company_id || 0, per_page: 100 });

    return data.data;
};

export const getLeaveManagers = async () => {

    const user = await getUser();

    let { data } = await axios.get(`${API_BASE}/employeesList`, { company_id: user?.company_id || 0, per_page: 100 });

    return data.data;
};

export const updateAddress = async (payload, id = 0) => {

    await axios.post(`${API_BASE}/employee-update-address-new/${id}`, payload);

    return true;
};

export const updateVisa = async (payload) => {

    const user = await getUser();

    console.log("Storing employee with payload:", payload, user?.company_id || 0);

    await axios.post(`${API_BASE}/employee-update-visa-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const updateEmirate = async (payload) => {

    const user = await getUser();

    console.log("Storing employee with payload:", payload, user?.company_id || 0);

    await axios.post(`${API_BASE}/employee-update-emirate-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const updatePassport = async (payload) => {

    const user = await getUser();

    console.log("Storing employee with payload:", payload, user?.company_id || 0);

    await axios.post(`${API_BASE}/employee-update-passport-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const updateQualification = async (payload) => {

    const user = await getUser();

    await axios.post(`${API_BASE}/employee-update-qualification-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const uploadEmployee = async (payload) => {

    let { data } = await axios.post(`${API_BASE}/employee/import`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
};

export const uploadCompanyDocument = async (payload) => {

    let { data } = await axios.post(`${API_BASE}/document`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
};


// companyId will be passed dynamically
export const getCompanyDocuments = async () => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/document`, {
        params: {
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

// companyId will be passed dynamically
export const getEmployeeList = async (branch_id = 0, department_id = 0) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/scheduled_employees_with_type`, {
        params: {
            branch_id: branch_id,
            department_id: department_id,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getScheduledEmployeeList = async (branch_id = null, department_ids = [], shift_type_id = 2) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/scheduled_employees_with_type`, {
        params: {
            per_page: 1000,
            branch_id: branch_id,
            department_ids: department_ids,
            company_id: user?.company_id || 0,
            shift_type_id: shift_type_id
        },
    });
    return data;
};

export const getDesinations = async (params = {}) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/designation`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getSubDepartments = async (params = {}) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/sub-departments`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

// companyId will be passed dynamically
export const getDeviceList = async (branch_id = 0) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/device-list`, {
        params: {
            branch_id: branch_id,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const getDevices = async (params = {}) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/device`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};


// ADMINS
export const getAdmins = async (params = {}) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/admin`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};
export const createAdmin = async (payload = {}) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/admin`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};
export const updateAdmin = async (id, payload = {}) => {
    const user = await getUser();
    await axios.put(`${API_BASE}/admin/${id}`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};
export const deleteAdmin = async (id) => {
    await axios.delete(`${API_BASE}/admin/${id}`);
    return true;
};

// ADMINS END

// DEPARTMENT

export const getSepartmentsForTable = async (params = {}) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/departments`, {
        params: {
            ...params,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

export const createDepartment = async (payload = {}) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/departments`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};
export const updateDepartment = async (id, payload = {}) => {
    const user = await getUser();
    await axios.put(`${API_BASE}/departments/${id}`, { ...payload, company_id: user?.company_id || 0 });
    return true;
};
export const deleteDepartment = async (id) => {
    await axios.delete(`${API_BASE}/departments/${id}`);
    return true;
};

// DEPARTMENT END


// companyId will be passed dynamically
export const openDoor = async (device_id = 0) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/open_door`, {
        params: {
            device_id: device_id,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

// companyId will be passed dynamically
export const closeDoor = async (device_id = 0) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/close_door`, {
        params: {
            device_id: device_id,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};


// companyId will be passed dynamically
export const checkPin = async (pin = "0000") => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/check-pin`, {
        params: {
            pin: pin,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};

// companyId will be passed dynamically
export const getLastTenLogs = async (UserID = "0") => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/get_last_ten_attendance_logs`, {
        params: {
            UserID: UserID,
            company_id: user?.company_id || 0,
        },
    });
    return data;
};


// companyId will be passed dynamically
export const getAttendanceReports = async (payload = {}) => {
    const user = await getUser();
    const { data } = await axios.post(`${API_BASE}/attendance-report-new`, { ...payload, company_id: user?.company_id || 0 });
    return data;
};

export const getCompanyInfo = async () => {
    const user = await getUser();

    const data = await axios.get(`${API_BASE}/company/${user?.company_id || 0}`);

    return data;
};


export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
})

// Attach token automatically (if available)
api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export const parseApiError = (error) => {
    console.log("🚀 ~ parseApiError ~ error:", error)
    if (error.response) {

        const status = error.response.status;
        const responseData = error.response.data;

        if (status === 422) {
            return (
                responseData.message || "Validation failed. Please check the form fields for errors."
            );

            // You may also want to integrate responseData.errors with react-hook-form's setError here

        } else if (status >= 500) {
            // 500: Server error
            return ("A critical server error occurred. Please try again later.");
        } else {
            // Other errors (401, 403, 404, etc.)
            return (responseData.message || `An error occurred with status ${status}.`);
        }

    } else {
        // Network error
        return ("Network error: Could not connect to the API.");
    }
}
