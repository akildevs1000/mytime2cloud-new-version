import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend.mytime2cloud.com/api';


import { getUser } from "@/config/index";

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


export const storeEmployee = async (payload) => {
    const user = await getUser();
    await axios.post(`${API_BASE}/employee-store-new`, { ...payload, company_id: user?.company_id || 0 });
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

    console.log("Storing employee with payload:", payload, user?.company_id || 0);

    await axios.post(`${API_BASE}/employee-update-qualification-new`, { ...payload, company_id: user?.company_id || 0 });

    return true;
};

export const uploadEmployee = async (payload) => {

    let { data } = await axios.post(`${API_BASE}/employee/import`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
};


// companyId will be passed dynamically
export const getEmployeeList = async (branch_id = 0) => {
    const user = await getUser();
    const { data } = await axios.get(`${API_BASE}/scheduled_employees_with_type`, {
        params: {
            branch_id: branch_id,
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
        return("Network error: Could not connect to the API.");
    }
}
