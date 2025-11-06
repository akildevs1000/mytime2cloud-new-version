"use client";

import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import {
  getBranches,
  getDepartments,
  getEmployees,
  postAddPerson,
  getDevices,
} from "@/lib/api";

import DropDown from "@/components/ui/DropDown";
import { Button } from "@/components/ui/button";
import { SuccessDialog } from "@/components/SuccessDialog";
import { parseApiError } from "@/lib/utils";

export default function EmployeeDeviceUpload() {
  // filters / picks
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // employees left / right
  const [leftEmployees, setLeftEmployees] = useState([]);
  const [leftSelectedEmp, setLeftSelectedEmp] = useState([]); // array of ids
  const [rightEmployees, setRightEmployees] = useState([]);
  const [rightSelectedEmp, setRightSelectedEmp] = useState([]);

  // devices left / right
  const [leftDevices, setLeftDevices] = useState([]);
  const [leftSelectedDevices, setLeftSelectedDevices] = useState([]);
  const [rightDevices, setRightDevices] = useState([]);
  const [rightSelectedDevices, setRightSelectedDevices] = useState([]);

  // responses & UI state
  const [deviceResponses, setDeviceResponses] = useState([]);
  const [cameraResponses, setCameraResponses] = useState([]);
  const [cameraResponses2, setCameraResponses2] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const [progressLoading, setProgressLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ show: false, message: "", color: "bg-gray-800" });

  // helpers: sorting
  const sortByFirstName = (arr = []) =>
    [...arr].sort((a, b) => {
      const A = (a.first_name || "").toUpperCase();
      const B = (b.first_name || "").toUpperCase();
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });

  const sortDevicesById = (arr = []) =>
    [...arr].sort((a, b) => {
      const A = (a.device_id || "").toUpperCase();
      const B = (b.device_id || "").toUpperCase();
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });

  // fetchers
  const fetchBranches = async () => {
    try {
      const data = await getBranches();
      setBranches(data || []);
    } catch (err) {
      setError(parseApiError(err));
    }
  };

  const fetchDepartments = async (branchId) => {
    try {
      const data = await getDepartments(branchId);
      // keep a default "All Departments" like your Vue code
      setDepartments([{ id: "---", name: "All Departments" }, ...(data || [])]);
    } catch (err) {
      setError(parseApiError(err));
    }
  };

  const fetchDevices = async (branchId) => {
    try {
      const devices = await getDevices(branchId);

      setLeftDevices(devices.data || []);
    } catch (err) {
      setError(parseApiError(err));
    }
  };

  const fetchEmployees = async (branchId, departmentId) => {
    try {
      const employees = await getEmployees(branchId, departmentId);
      setLeftEmployees(employees.data || []);
      setLeftSelectedEmp([]);
      // reset right lists (keeping UX same as Vue where selecting department cleared right)
      setRightEmployees([]);
      setRightSelectedEmp([]);
    } catch (err) {
      setError(parseApiError(err));
    }
  };

  // initial load
  useEffect(() => {
    fetchBranches();
  }, []);

  // when branch changes, load departments/devices/employees/timezones etc
  useEffect(() => {
    if (selectedBranch === null) return;
    setProgressLoading(true);
    Promise.all([
      fetchDepartments(selectedBranch),
      fetchDevices(selectedBranch),
      fetchEmployees(selectedBranch, selectedDepartment),
    ])
      .catch((err) => setError(parseApiError(err)))
      .finally(() => setProgressLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBranch]);

  // when department changes, fetch employees
  useEffect(() => {
    if (selectedBranch === null) return;
    fetchEmployees(selectedBranch, selectedDepartment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment]);

  // utility: reset any SDK responses stored on elements
  const resetErrorMessages = () => {
    setError(null);
    setDeviceResponses([]);
    setCameraResponses([]);
    setCameraResponses2([]);
    setLeftEmployees((prev) =>
      prev.map((el) => {
        return { ...el, sdkEmpResponse: "" };
      })
    );
    setLeftDevices((prev) =>
      prev.map((el) => {
        return { ...el, sdkDeviceResponse: "" };
      })
    );
    setRightEmployees((prev) => prev.map((el) => ({ ...el, sdkEmpResponse: "" })));
    setRightDevices((prev) => prev.map((el) => ({ ...el, sdkDeviceResponse: "" })));
  };

  // verify displaybutton logic (Vue used displaybutton to disable submit until both sides non-empty)
  const canSubmit = () => rightEmployees.length > 0 && rightDevices.length > 0;

  /* ---------- Employee move logic ---------- */
  const allMoveToRightEmp = () => {
    resetErrorMessages();

    // In original Vue they moved only employees that had profile_picture
    const withPic = leftEmployees.filter((el) => !!el.profile_picture);
    const withoutPic = leftEmployees.filter((el) => !el.profile_picture);

    setRightEmployees((prev) => sortByFirstName(prev.concat(withPic)));
    setLeftEmployees(sortByFirstName(withoutPic));
    setLeftSelectedEmp([]);
  };

  const allMoveToLeftEmp = () => {
    resetErrorMessages();
    setLeftEmployees((prev) => sortByFirstName(prev.concat(rightEmployees)));
    setRightEmployees([]);
    setRightSelectedEmp([]);
  };

  const moveToRightSelectedEmp = () => {
    resetErrorMessages();
    if (!leftSelectedEmp.length) return;

    const toMove = leftEmployees.filter((e) => leftSelectedEmp.includes(e.id));
    const remain = leftEmployees.filter((e) => !leftSelectedEmp.includes(e.id));

    setRightEmployees((prev) => sortByFirstName(prev.concat(toMove)));
    setLeftEmployees(sortByFirstName(remain));
    setLeftSelectedEmp([]);
  };

  const moveToLeftSelectedEmp = () => {
    resetErrorMessages();
    if (!rightSelectedEmp.length) return;

    const toMove = rightEmployees.filter((e) => rightSelectedEmp.includes(e.id));
    const remain = rightEmployees.filter((e) => !rightSelectedEmp.includes(e.id));

    setLeftEmployees((prev) => sortByFirstName(prev.concat(toMove)));
    setRightEmployees(sortByFirstName(remain));
    setRightSelectedEmp([]);
  };

  /* ---------- Devices move logic ---------- */
  const allMoveToRightDevices = () => {
    resetErrorMessages();
    // Only active devices in Vue moved right
    const active = leftDevices.filter((el) => el.status && el.status.name === "active");
    const inactive = leftDevices.filter((el) => !(el.status && el.status.name === "active"));

    setRightDevices((prev) => sortDevicesById(prev.concat(active)));
    setLeftDevices(sortDevicesById(inactive));
  };

  const allMoveToLeftDevices = () => {
    resetErrorMessages();
    setLeftDevices((prev) => sortDevicesById(prev.concat(rightDevices)));
    setRightDevices([]);
  };

  const moveToRightSelectedDevices = () => {
    resetErrorMessages();
    if (!leftSelectedDevices.length) return;

    const toMove = leftDevices.filter((e) => leftSelectedDevices.includes(e.id));
    const remain = leftDevices.filter((e) => !leftSelectedDevices.includes(e.id));

    setRightDevices((prev) => sortDevicesById(prev.concat(toMove.map((d) => ({ ...d, sdkDeviceResponse: "" })))));
    setLeftDevices(sortDevicesById(remain));
    setLeftSelectedDevices([]);
  };

  const moveToLeftSelectedDevices = () => {
    resetErrorMessages();
    if (!rightSelectedDevices.length) return;

    const toMove = rightDevices.filter((e) => rightSelectedDevices.includes(e.id));
    const remain = rightDevices.filter((e) => !rightSelectedDevices.includes(e.id));

    setLeftDevices((prev) => sortDevicesById(prev.concat(toMove.map((d) => ({ ...d, sdkDeviceResponse: "" })))));
    setRightDevices(sortDevicesById(remain));
    setRightSelectedDevices([]);
  };

  /* ---------- Submit ---------- */
  const onSubmit = async () => {
    // open dialog in Vue; here we'll toggle snackbar and collect responses
    resetErrorMessages();
    setDeviceResponses([]);
    setCameraResponses([]);
    setCameraResponses2([]);
    setIsLoading(true);

    if (rightEmployees.length === 0) {
      setSnackbar({ show: true, message: "Please select at least one employee.", color: "bg-red-600" });
      setIsLoading(false);
      return;
    }
    if (rightDevices.length === 0) {
      setSnackbar({ show: true, message: "Please select at least one device.", color: "bg-red-600" });
      setIsLoading(false);
      return;
    }

    setProgressLoading(true);

    // build snList once (device device_id)
    const snList = rightDevices.map((d) => d.device_id);

    for (const item of rightEmployees) {
      const person = {
        name: `${item.first_name || ""} ${item.last_name || ""}`.trim(),
        userCode: item.system_user_id ? parseInt(item.system_user_id) : undefined,
        profile_picture_raw: item.profile_picture_raw,
        faceImage: item.profile_picture,
      };

      if (item.rfid_card_number) person.cardData = item.rfid_card_number;
      if (item.rfid_card_password) person.password = item.rfid_card_password;
      if (item.finger_prints && item.finger_prints.length > 0)
        person.fp = item.finger_prints.map((e) => e.fp);
      if (item.palms && item.palms.length > 0) person.palm = item.palms.map((e) => e.palm);

      const payload = {
        personList: [person],
        snList,
        branch_id: selectedBranch,
      };

      try {
        const { data } = await postAddPerson(payload); // expects { deviceResponse: [...], cameraResponse: [...], cameraResponse2: [...] }
        if (data?.deviceResponse?.length) setDeviceResponses((prev) => prev.concat(data.deviceResponse));
        if (data?.cameraResponse?.length) setCameraResponses((prev) => prev.concat(data.cameraResponse));
        if (data?.cameraResponse2?.length) setCameraResponses2((prev) => prev.concat(data.cameraResponse2));
      } catch (err) {
        console.error("Add person error:", err);
        // show a non-blocking message
        setSnackbar({ show: true, message: parseApiError(err) || "Upload failed for a person", color: "bg-red-600" });
      }
    }

    setProgressLoading(false);
    setIsLoading(false);
    setOpen(true);
    setSnackbar({ show: true, message: "Upload completed.", color: "bg-green-600" });
  };

  /* ---------- small helpers for toggling checkbox selections ---------- */
  const toggleArrayValue = (arr, setter, id) => {
    if (arr.includes(id)) setter(arr.filter((v) => v !== id));
    else setter([...arr, id]);
  };

  return (
    <>
      <div style={{ width: "100%" }} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold">Employees upload to Devices</h2>

          <div className="flex items-center space-x-3">
            <div className="w-56">
              <DropDown
                placeholder={"Select Branch"}
                onChange={(v) => setSelectedBranch(v)}
                value={selectedBranch}
                items={branches.map((b) => ({ name: b.branch_name || b.name, id: b.id }))}
              />
            </div>

            <div className="w-56">
              <DropDown
                placeholder={"Select Department"}
                onChange={(v) => setSelectedDepartment(v)}
                value={selectedDepartment}
                items={departments.map((d) => ({ name: d.name, id: d.id }))}
              />
            </div>
          </div>
        </div>

        {/* lists */}
        <div className="grid grid-cols-12 gap-4">
          {/* Employees left */}
          <div className="col-span-5 bg-white">
            <div className="border rounded shadow-sm p-2 h-72 overflow-auto">
              <div className="font-semibold mb-2">Employees</div>
              {leftEmployees.map((user) => (
                <div key={user.id} className="flex items-center py-2 border-b last:border-b-0">
                  <input
                    type="checkbox"
                    checked={leftSelectedEmp.includes(user.id)}
                    onChange={() => toggleArrayValue(leftSelectedEmp, setLeftSelectedEmp, user.id)}
                    className="mr-3"
                  />
                  <img
                    src={user.profile_picture || "/no-profile-image.jpg"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/80x80/6946dd/ffffff?text=${user.first_name.charAt(0)}`;
                    }}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-6 h-6 rounded-full mr-3 object-cover border"
                  />
                  <div className="flex-1 text-sm">
                    <div>{user.first_name} {user.last_name}</div>
                    <div className="text-xs text-gray-500">{user.employee_id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Employee transfer buttons */}
          <div className="col-span-2 flex flex-col items-center  space-y-2 relative">

            {/* this should be stick to top */}
            <div className="mb-15   z-10 py-2 w-full text-center font-medium">
              Transfer Employees
            </div>

            <Button onClick={moveToRightSelectedEmp} className="btn bg-primary w-full text-2xl">›</Button>
            <Button onClick={allMoveToRightEmp} className="btn bg-primary w-full text-2xl">»</Button>
            <Button onClick={moveToLeftSelectedEmp} className="btn bg-primary w-full text-2xl">‹</Button>
            <Button onClick={allMoveToLeftEmp} className="btn bg-primary w-full text-2xl">«</Button>
          </div>


          {/* Employees right */}
          <div className="col-span-5 bg-white">
            <div className="border rounded shadow-sm p-2 h-72 overflow-auto">
              <div className="font-semibold mb-2">Selected Employees</div>
              {rightEmployees.map((user) => (
                <div key={user.id} className="flex items-center py-2 border-b last:border-b-0">
                  <input
                    type="checkbox"
                    checked={rightSelectedEmp.includes(user.id)}
                    onChange={() => toggleArrayValue(rightSelectedEmp, setRightSelectedEmp, user.id)}
                    className="mr-3"
                  />
                  <img
                    src={user.profile_picture || "/no-profile-image.jpg"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/80x80/6946dd/ffffff?text=${user.first_name.charAt(0)}`;
                    }}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-6 h-6 rounded-full mr-3 object-cover border"
                  />
                  <div className="flex-1 text-sm">
                    <div>{user.first_name} {user.last_name}</div>
                    <div className="text-xs text-gray-500">{user.employee_id}</div>
                  </div>

                  <div className="text-sm ml-2">
                    {user.sdkEmpResponse ? (
                      <span className="text-xs">{user.sdkEmpResponse}</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices left */}
          <div className="col-span-5 bg-white mt-4">
            <div className="border rounded shadow-sm p-2 h-72 overflow-auto">
              <div className="font-semibold mb-2">Devices</div>
              {leftDevices.map((d) => (
                <div key={d.id} className="flex items-center py-2 border-b last:border-b-0">
                  <input
                    type="checkbox"
                    checked={leftSelectedDevices.includes(d.id)}
                    onChange={() => toggleArrayValue(leftSelectedDevices, setLeftSelectedDevices, d.id)}
                    className="mr-3"
                    disabled={!(d.status && d.status.name === "active")}
                  />
                  <div className="flex-1 text-sm">
                    <div>{d.name}</div>
                    <div className="text-xs text-gray-500">{d.model_number}</div>
                  </div>
                  <div className="ml-2">
                    {d.status && d.status.name === "active" ? (
                      <img src="/icons/device_status_open.png" alt="online" className="w-6" />
                    ) : (
                      <img src="/icons/device_status_close.png" alt="offline" className="w-6" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device transfer */}
          <div className="col-span-2 flex flex-col items-center justify-center space-y-2 mt-4">
            <Button onClick={moveToRightSelectedDevices} className="btn bg-primary text-white w-full text-2xl">›</Button>
            <Button onClick={allMoveToRightDevices} className="btn bg-primary text-white w-full text-2xl">»</Button>
            <Button onClick={moveToLeftSelectedDevices} className="btn bg-primary text-white w-full text-2xl">‹</Button>
            <Button onClick={allMoveToLeftDevices} className="btn bg-primary text-white w-full text-2xl">«</Button>
          </div>

          {/* Devices right */}
          <div className="col-span-5 bg-white mt-4">
            <div className="border rounded shadow-sm p-2 h-72 overflow-auto">
              <div className="font-semibold mb-2">Selected Devices</div>
              {rightDevices.map((d) => (
                <div key={d.id} className="flex items-center py-2 border-b last:border-b-0">
                  <input
                    type="checkbox"
                    checked={rightSelectedDevices.includes(d.id)}
                    onChange={() => toggleArrayValue(rightSelectedDevices, setRightSelectedDevices, d.id)}
                    className="mr-3"
                    disabled={!(d.status && d.status.name === "active")}
                  />
                  <div className="flex-1 text-sm">
                    <div>{d.name}</div>
                    <div className="text-xs text-gray-500">{d.model_number}</div>
                  </div>
                  <div className="ml-2 text-sm">
                    {d.sdkDeviceResponse ? (
                      <span className="text-xs">{d.sdkDeviceResponse}</span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* footer actions */}
        <div className="mt-4 text-center">
          <div className="text-red-600">{error}</div>

          <button
            onClick={onSubmit}
            disabled={!canSubmit() || isLoading}
            className={`px-4 py-2 rounded font-semibold ${canSubmit() && !isLoading ? "bg-primary text-white" : "bg-gray-300 text-gray-600"}`}
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        </div>

        <SuccessDialog
          open={open}
          onOpenChange={setOpen}
          title="Employees Uploaded"
          description="All selected employees were uploaded to the selected devices successfully."
        />

      </div>
    </>
  );
}
