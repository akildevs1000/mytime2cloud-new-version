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
import ProfilePicture from "@/components/ProfilePicture";

export default (deleteEmployee, editEmployee) => [
  {
    key: "employee",
    header: "Personnel",
    render: (e) => (
      <div className="flex items-center space-x-3">

        <ProfilePicture src={e.profile_picture} />

        <div>
          <p className="font-medium text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">{e?.first_name}</p>
          <p className="text-sm text-gray-500">
            ID: {e.employee_id}
          </p>
        </div>
      </div>
    ),
  },
  {
    key: "branch",
    header: "Branch / Department",
    render: (employee) => (
      <div className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
        {employee.branch?.branch_name || "N/A"} / {employee.department?.name || "N/A"}
      </div>
    ),
  },
  {
    key: "position",
    header: "Position",
    render: (employee) => (
      <div className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
        {employee.designation?.name || "N/A"}
      </div>
    ),
  },
  {
    key: "mobile_email",
    header: "Mobile / Email",
    render: (employee) => (
      <div className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
        <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">{employee.user?.email || "—"}</p>
        <br />
        <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">{employee.phone_number || "—"}</p>
      </div>
    ),
  },
  {
    key: "timezone",
    header: "Join Date",
    render: (employee) => (
      <div className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono">
        {employee.show_joining_date || "N/A"}
      </div>
    ),
  },
  {
    key: "access",
    header: "Access",
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
        <div className="flex items-center space-x-2 text-green-500 dark:text-slate-600">
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
        <DropdownMenuTrigger
          asChild
          /* This prevents the dropdown trigger itself from triggering the row click */
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-2 rounded-full cursor-pointer w-fit">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-32 bg-white dark:bg-gray-900 shadow-md rounded-md py-1"
          /* This prevents clicking inside the menu from triggering the row click */
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation(); // Stop row redirect
              editEmployee(employee.id)
            }}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <Pencil className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Edit</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation(); // Stop row redirect
              deleteEmployee(employee.id);
            }}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            <Trash className="w-4 h-4 text-red-500" />
            <span className="text-red-500 font-medium">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
