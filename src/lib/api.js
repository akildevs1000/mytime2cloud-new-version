import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://backend.mytime2cloud.com/api';


import { getUser } from "@/config/index";

export const buildQueryParams = async (params = {}) => {
    const user = await getUser();

    const queryParams = {
        ...params,
        company_id: user?.company_id ?? 0,
    };

    // Only include branch_id if it's not 0
    if (user?.branch_id && user.branch_id !== 0) {
        queryParams.branch_id = user.branch_id;
    }

    // Include department_ids only if valid and non-empty
    if (Array.isArray(user?.department_ids) && user.department_ids.length > 0) {
        queryParams.department_ids = user.department_ids;
    }
    else if (Array.isArray(params?.department_ids) && params.department_ids.length > 0) {
        queryParams.department_ids = params.department_ids;
    }

    // queryParams.department_ids = [145, 410]

    return queryParams;
};

export const getStatuses = async () => {
    const { data } = await axios.get(`${API_BASE}/attendance-statuses`);
    return data;
};

export const getBranches = async () => {

    const { data } = await axios.get(`${API_BASE}/branch-list`, {
        params: await buildQueryParams(),
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
    const { data } = await axios.get(`${API_BASE}/employees_with_schedule_count`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const getDeviceLogs = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/attendance_logs`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const getAccessControlReport = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/access_control_report`, {
        params: await buildQueryParams(params),
    });
    return data;
};


export const getEmployees = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/employeev1`, { params: await buildQueryParams(params) });
    return data;
};


export const getShifts = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/shift`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const getShiftDropDownList = async (branch_id = null) => {
    const params = {};

    // Include branch_id if passed
    if (branch_id) {
        params.branch_id = branch_id;
    }
    const { data } = await axios.get(`${API_BASE}/shift_dropdownlist`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const getDocuments = async (id) => {
    const { data } = await axios.get(`${API_BASE}/documentinfo/${id}`);
    return data;
};

export const deleteDocument = async (id) => {
    return await axios.delete(`${API_BASE}/documentinfo/${id}`);
};

export async function uploadEmployeeDocument(employeeId, payload) {

    // employee-update-document-new
    const user = await getUser();

    const fd = new FormData();
    fd.append("title", payload.title);
    fd.append("attachment", payload.file);
    fd.append("employee_id", employeeId);
    fd.append("company_id", user?.company_id || 0);

    return await axios.post(`${API_BASE}/employee-update-document-new/`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
    });
}


export const getAttendnaceCount = async (branch_id = null) => {
    const params = {};

    // Include branch_id if passed
    if (branch_id) {
        params.branch_id = branch_id;
    }

    const { data } = await axios.get(`${API_BASE}/dashbaord_attendance_count`, {
        params: await buildQueryParams(params),
    });
    return data;
};

// companyId will be passed dynamically
export const getLogs = async (page = 1, count = 10) => {
    const params = { page };
    const { data } = await axios.get(`${API_BASE}/device/getLastRecordsHistory/${count}`, {
        params: await buildQueryParams(params),
    });
    return data;
};

// companyId will be passed dynamically
export const getTodayLogsCount = async (branch_id = null, department_id = null) => {
    const params = { branch_id, department_id };
    const { data } = await axios.get(`${API_BASE}/get_logs_count`, {
        params: await buildQueryParams(params),
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
    return await axios.post(`${API_BASE}/update-logo-only`, { ...payload, company_id: user?.company_id || 0 });
};

export const storeEmployee = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-store-new`, { ...payload, company_id: user?.company_id || 0 });
};

export const setPin = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/set-pin`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateContact = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/company/${user?.company_id}/update/contact`, payload);
};

export const updatePassword = async (payload) => {
    return await axios.post(`${API_BASE}/company/${user?.company_id}/update/user`, payload);
};

export const updateLicense = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/company/${user?.company_id}/trade-license`, payload);
};

export const postAddPerson = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/SDK/AddPerson`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateProfilePicture = async (payload) => {
    return await axios.post(`${API_BASE}/employee-update-profile-picture`, payload);
};

export const storeShift = async (payload) => {
    const user = await getUser();
    let { data } = await axios.post(`${API_BASE}/shift`, { ...payload, company_id: user?.company_id || 0 });
    return data;
};

export const storeSchedule = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/schedule_employees`, { ...payload, company_id: user?.company_id || 0 });
};

export const storePayroll = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/payroll`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateEmployee = async (payload, id = 0) => {
    return await axios.post(`${API_BASE}/employee-update-new/${id}`, payload);
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
    return await axios.post(`${API_BASE}/employee-update-emergency-contact-new/${id}`, payload);
};

export const updateBank = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-update-bank-new`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateAccessSettings = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-update-access-settings-new`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateLogin = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-update-login-new`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateSettings = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-update-settings-new`, { ...payload, company_id: user?.company_id || 0 });
};

export const getLeaveGroups = async () => {
    let params = { per_page: 100 };
    let { data } = await axios.get(`${API_BASE}/leave_groups`, { params: await buildQueryParams(params) });
    return data.data;
};

export const getLeaveManagers = async () => {
    let params = { per_page: 100 };
    let { data } = await axios.get(`${API_BASE}/employeesList`, { params: await buildQueryParams(params) });
    return data.data;
};

export const updateAddress = async (payload, id = 0) => {
    return await axios.post(`${API_BASE}/employee-update-address-new/${id}`, payload);
};

export const updateVisa = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-update-visa-new`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateEmirate = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-update-emirate-new`, { ...payload, company_id: user?.company_id || 0 });
};

export const updatePassport = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-update-passport-new`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateQualification = async (payload) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/employee-update-qualification-new`, { ...payload, company_id: user?.company_id || 0 });
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

export const getCompanyDocuments = async () => {
    const { data } = await axios.get(`${API_BASE}/document`, {
        params: await buildQueryParams(),
    });
    return data;
};

// companyId will be passed dynamically
export const getEmployeeList = async (branch_id = 0, department_id = 0) => {
    let params = {
        branch_id: branch_id,
        department_id: department_id,
    };
    const { data } = await axios.get(`${API_BASE}/scheduled_employees_with_type`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const getScheduledEmployeeList = async (branch_id = null, department_ids = [], shift_type_id = 2) => {

    const params = {
        per_page: 1000,
        branch_id,
        department_ids, // passed from dropdown
        shift_type_id,
    };

    const { data } = await axios.get(`${API_BASE}/scheduled_employees_with_type`, {
        params: await buildQueryParams(params),
    });
    return data;
};

// companyId will be passed dynamically
export const getDeviceList = async (branch_id = 0) => {

    const params = {
        branch_id,
    };

    const { data } = await axios.get(`${API_BASE}/device-list`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const getDevices = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/device`, {
        params: await buildQueryParams(params),
    });
    return data;
};

// Group
export const getGroupLogins = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/group-login`, {
        params: await buildQueryParams(params),
    });
    return data;
};
export const createGroupLogin = async (payload = {}) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/group-login`, { ...payload, company_id: user?.company_id || 0 });
};
export const updateGroupLogin = async (id, payload = {}) => {
    const user = await getUser();
    return await axios.put(`${API_BASE}/group-login/${id}`, { ...payload, company_id: user?.company_id || 0 });
};
export const deleteGroupLogin = async (id) => {
    await axios.delete(`${API_BASE}/group-login/${id}`);
    return true;
};

// Group END

// PayrollFormula
export const getPayrollFormula = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/payroll_formula`, {
        params: await buildQueryParams(params),
    });
    return data;
};
export const PayrollFormulaCreate = async (payload = {}) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/payroll_formula`, { ...payload, company_id: user?.company_id || 0 });
};

export const updatePayrollFormula = async (id, payload = {}) => {
    const user = await getUser();
    return await axios.put(`${API_BASE}/payroll_formula/${id}`, { ...payload, company_id: user?.company_id || 0 });
};

export const deletePayrollFormula = async (id) => {
    await axios.delete(`${API_BASE}/payroll_formula/${id}`);
    return true;
};

// PayrollFormula END


// Activity
export const getActivity = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/activity`, {
        params: await buildQueryParams(params),
    });
    return data;
};

// Activity END

// GenerationDate
export const getPayrollGenerationDate = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/payroll_generate_date`, {
        params: await buildQueryParams(params),
    });
    return data;
};
export const createPayrollGenerationDate = async (payload = {}) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/payroll_generate_date`, { ...payload, company_id: user?.company_id || 0 });
};

export const updatePayrollGenerationDate = async (id, payload = {}) => {
    const user = await getUser();
    return await axios.put(`${API_BASE}/payroll_generate_date/${id}`, { ...payload, company_id: user?.company_id || 0 });
};

export const deletePayrollGenerationDate = async (id) => {
    await axios.delete(`${API_BASE}/payroll_generate_date/${id}`);
    return true;
};

// GenerationDate END

// ADMINS
export const getAdmins = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/admin`, {
        params: await buildQueryParams(params),
    });
    return data;
};
export const createAdmin = async (payload = {}) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/admin`, { ...payload, company_id: user?.company_id || 0 });
};
export const updateAdmin = async (id, payload = {}) => {
    const user = await getUser();
    return await axios.put(`${API_BASE}/admin/${id}`, { ...payload, company_id: user?.company_id || 0 });
};
export const deleteAdmin = async (id) => {
    await axios.delete(`${API_BASE}/admin/${id}`);
    return true;
};

// ADMINS END

// DEPARTMENT

export const getSepartmentsForTable = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/departments`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const createDepartment = async (payload = {}) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/departments`, { ...payload, company_id: user?.company_id || 0 });
};

export const updateDepartment = async (id, payload = {}) => {
    const user = await getUser();
    return await axios.put(`${API_BASE}/departments/${id}`, { ...payload, company_id: user?.company_id || 0 });
};
export const deleteDepartment = async (id) => {
    await axios.delete(`${API_BASE}/departments/${id}`);
    return true;
};

// DEPARTMENT END

// SUB DEPARTMENT
export const getSubDepartments = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/sub-departments`, {
        params: await buildQueryParams(params),
    });
    return data;
};
export const createSubDepartments = async (payload = {}) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/sub-departments`, { ...payload, company_id: user?.company_id || 0 });
};
export const updateSubDepartments = async (id, payload = {}) => {
    const user = await getUser();
    return await axios.put(`${API_BASE}/sub-departments/${id}`, { ...payload, company_id: user?.company_id || 0 });
};
export const deleteSubDepartments = async (id) => {
    await axios.delete(`${API_BASE}/sub-departments/${id}`);
    return true;
};
// SUB DEPARTMENT END

// DESIGNATION
export const getDesignations = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/designation`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const createDesignations = async (payload = {}) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/designation`, { ...payload, company_id: user?.company_id || 0 });
};
export const updateDesignations = async (id, payload = {}) => {
    const user = await getUser();
    return await axios.put(`${API_BASE}/designation/${id}`, { ...payload, company_id: user?.company_id || 0 });
};
export const deleteDesignations = async (id) => {
    await axios.delete(`${API_BASE}/designation/${id}`);
    return true;
};

// DESIGNATION END


// DESIGNATION
export const getBranchesForTable = async (params = {}) => {
    const { data } = await axios.get(`${API_BASE}/branch`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const createBranch = async (payload = {}) => {
    const user = await getUser();
    return await axios.post(`${API_BASE}/branch`, { ...payload, company_id: user?.company_id || 0 });
};
export const updateBranch = async (id, payload = {}) => {
    const user = await getUser();
    return await axios.put(`${API_BASE}/branch/${id}`, { ...payload, company_id: user?.company_id || 0 });
};
export const deleteBranch = async (id) => {
    await axios.delete(`${API_BASE}/branch/${id}`);
    return true;
};

// DESIGNATION END


// companyId will be passed dynamically
export const openDoor = async (device_id = 0) => {

    let params = {
        device_id: device_id,
    };

    const { data } = await axios.get(`${API_BASE}/open_door`, {
        params: await buildQueryParams(params),
    });
    return data;
};

// companyId will be passed dynamically
export const closeDoor = async (device_id = 0) => {
    let params = {
        device_id: device_id,
    };
    const { data } = await axios.get(`${API_BASE}/close_door`, {
        params: await buildQueryParams(params),
    });
    return data;
};


// companyId will be passed dynamically
export const checkPin = async (pin = "0000") => {
    let params = {
        pin: pin,
    };
    const { data } = await axios.get(`${API_BASE}/check-pin`, {
        params: await buildQueryParams(params),
    });
    return data;
};

// companyId will be passed dynamically
export const getLastTenLogs = async (UserID = "0") => {
    let params = {
        UserID: UserID,
    };
    const { data } = await axios.get(`${API_BASE}/get_last_ten_attendance_logs`, {
        params: await buildQueryParams(params),
    });
    return data;
};

export const getAttendanceReports = async (payload = {}) => {
    const body = await buildQueryParams(payload); // prepares company_id, branch_id, department_ids
    const { data } = await axios.post(`${API_BASE}/attendance-report-new`, body);
    return data;
};

export const getCompanyInfo = async () => {
    const user = await getUser();
    return await axios.get(`${API_BASE}/company/${user?.company_id || 0}`);
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
