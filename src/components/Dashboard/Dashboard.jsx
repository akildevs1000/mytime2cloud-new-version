"use client";

import AttendanceCard from "@/components/Dashboard/AttendanceCard";
import EventsAndInsights from "@/components/Dashboard/EventsAndInsights";
import LiveFeed from "@/components/Dashboard/LiveFeed";
import Stats from "@/components/Dashboard/Stats";
import WelnessCard from "@/components/Dashboard/WelnessCard";
import { getBranches } from "@/lib/api";
import { parseApiError } from "@/lib/utils";
import { useEffect, useState } from "react";
import Dropdown from "../Theme/DropDown";

const AdminDashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState({
    name: "Select All Branches",
    id: null,
  });
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState(null);

  const fetchBranches = async () => {
    try {
      setBranches([
        { name: "Select All", id: null },
        ...(await getBranches()),
      ]);
    } catch (error) {
      setError(parseApiError(error));
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="p-4 pb-24 overflow-y-auto max-h-[calc(100vh-100px)]">
      <div className="px-2 mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-600 dark:text-gray-300 font-display tracking-tight">
          Executive Overview
        </h2>
        <div className="filter-glass px-1 py-1 rounded-xl flex items-center gap-1.5 max-w-sm">
          <Dropdown
            items={branches}
            selectedItem={selectedBranch}
            onSelect={(item) => {
              setSelectedBranch(item);
            }}
            placeholder="Select a Branch"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-16 custom-scrollbar flex flex-col gap-5">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          <Stats branch_id={selectedBranch?.id} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[340px]">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col h-full">
              <AttendanceCard branch_id={selectedBranch?.id} />
            </div>
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col h-full items-center justify-center">
              <WelnessCard branch_id={selectedBranch?.id} />
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-0 relative overflow-hidden flex flex-col h-[340px]">
            <EventsAndInsights branch_id={selectedBranch?.id} />
          </div>
        </div>
        <div className="glass-panel rounded-2xl flex-1 flex flex-col">
          <LiveFeed branch_id={selectedBranch?.id} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
