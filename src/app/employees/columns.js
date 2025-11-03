// columns.js
import {
  ScanFace,
  QrCode,
  Fingerprint,
  Hand,
  Lock,
  MoreVertical,
  Pencil,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default (deleteEmployee) => [
  {
    key: "employee",
    header: "Name",
    render: (employee) => (
      <div className="flex items-center space-x-3">
        <img
          alt={employee.full_name}
          className="w-10 h-10 rounded-full object-cover shadow-sm"
          src={
            employee.profile_picture ||
            `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/40x40/6946dd/ffffff?text=${employee.full_name.charAt(0)}`;
          }}
        />
        <div>
          <p className="font-medium text-gray-800">{employee.full_name}</p>
          <p className="text-sm text-gray-500">
            {employee.designation?.title || employee.last_name}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "emp_device",
    header: "Emp Id / Device Id",
    render: (employee) => (
      <>
        <p className="text-gray-800">{employee.employee_id || "—"}</p>
        <p className="text-sm text-gray-500">Device ID: {employee.system_user_id || "—"}</p>
      </>
    ),
  },
  {
    key: "branch",
    header: "Branch",
    render: (employee) => employee.branch?.branch_name || "N/A",
  },
  {
    key: "department",
    header: "Department",
    render: (employee) => employee.department?.name || "N/A",
  },
  {
    key: "mobile_email",
    header: "Mobile / Email",
    render: (employee) => (
      <>
        <p className="text-gray-800">{employee.phone_number || "—"}</p>
        <p className="text-sm text-gray-500">{employee.user?.email || "—"}</p>
      </>
    ),
  },
  {
    key: "timezone",
    header: "Timezone / Join Date",
    render: (employee) => employee.show_joining_date || "—",
  },
  {
    key: "access",
    header: "Access",
    render: () => (
      <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
        Full Access
      </span>
    ),
  },
  {
    key: "security",
    header: "Options / Security",
    render: (employee) => {
      const { rfid_card_number, finger_prints, rfid_card_password, palms, profile_picture } = employee;

      const isCardNumberSet =
        rfid_card_number && rfid_card_number !== "" && rfid_card_number !== "0";
      const isFingerPrint = finger_prints && finger_prints.length > 0;
      const isPalms = palms && palms.length > 0;
      const isPasswordSet =
        rfid_card_password && rfid_card_password !== "" && rfid_card_password !== "FFFFFFFF";
      const isFace = profile_picture;

      return (
        <div className="flex items-center space-x-2 text-gray-500">
          {isFace && <ScanFace className="w-5 h-5 hover:text-indigo-600 transition-colors" title="Face" />}
          {isCardNumberSet && <QrCode className="w-5 h-5 hover:text-indigo-600 transition-colors" title="Card" />}
          {isFingerPrint && <Fingerprint className="w-5 h-5 hover:text-indigo-600 transition-colors" title="Fingerprint" />}
          {isPalms && <Hand className="w-5 h-5 hover:text-indigo-600 transition-colors" title="Palms" />}
          {isPasswordSet && <Lock className="w-5 h-5 hover:text-indigo-600 transition-colors" title="Password" />}
        </div>
      );
    },
  },
  {
    key: "actions",
    header: "Actions",
    render: (employee) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreVertical className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer" title="More Options" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-30 bg-white shadow-md rounded-md py-1">
          <DropdownMenuItem
            onClick={() => console.log("Edit", employee.id)}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Pencil className="w-4 h-4 text-primary" /> <span className="text-primary">Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => deleteEmployee(employee.id)}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Trash className="w-4 h-4 text-gray-500" /> <span className="text-gray-500">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
