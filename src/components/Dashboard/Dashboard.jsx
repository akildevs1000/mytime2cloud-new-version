import Stats from "./Stats";
import AttendanceCard from "./AttendanceCard";
import WelnessCard from "./WelnessCard";
import ExecutiveInsights from "./ExecutiveInsights";
import LiveFeed from "./LiveFeed";
import { useEffect, useState } from "react";
import { getBranches } from "@/lib/api";
import { parseApiError } from "@/lib/utils";
import DropDown from "../ui/DropDown";

const Dashboard = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState(null);

  const fetchBranches = async () => {
    try {
      setBranches(await getBranches());
    } catch (error) {
      setError(parseApiError(error));
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <>
      <div className="px-2 mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900 font-display tracking-tight">
          Executive Overview
        </h2>
        <div className="filter-glass px-1 py-1 rounded-xl flex items-center gap-1.5 max-w-sm">
          <div className="pl-2 pr-1 flex items-center text-slate-500">
            <span className="material-symbols-outlined text-[18px]">
              domain
            </span>
          </div>
          <div className="h-6 w-px bg-slate-300"></div>
          <div className="relative group">
            <DropDown
              placeholder="Select Branch"
              onChange={(id) => {
                setSelectedBranch(id);
                setCurrentPage(1);
              }}
              value={selectedBranch}
              items={branches}
            />
            {/* <select className="appearance-none bg-transparent border-none text-sm text-slate-700 font-medium pl-2 pr-8 py-1.5 focus:ring-0 cursor-pointer w-40 hover:text-primary transition-colors">
              <option value="all">Global HQ</option>
              <option value="engineering">Engineering Wing</option>
              <option value="sales">Sales Floor</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                expand_more
              </span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-6 custom-scrollbar flex flex-col gap-5">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-3">
          <Stats />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-[340px]">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col h-full">
              <AttendanceCard />
            </div>
            <div className="glass-panel rounded-2xl p-5 relative overflow-hidden flex flex-col h-full items-center justify-center">
              <WelnessCard />
            </div>
          </div>
          <div className="glass-panel rounded-2xl p-0 relative overflow-hidden flex flex-col h-[340px]">
            <ExecutiveInsights />
          </div>
        </div>
        <div className="glass-panel rounded-2xl flex-1 flex flex-col min-h-[300px]">
          <LiveFeed />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
