import React, { useState } from 'react';

const BranchManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const branchData = [
    { id: 1, name: "Global Headquarters", address: "101 Innovation Dr, Suite 500", city: "San Francisco, CA", phone: "+1 (555) 012-3456", status: "Active" },
    { id: 2, name: "East Coast Hub", address: "450 Lexington Ave, Fl 12", city: "New York, NY", phone: "+1 (212) 555-0199", status: "Active" },
    { id: 3, name: "Berlin Operations", address: "Friedrichstraße 12", city: "Berlin, DE", phone: "+49 30 12345678", status: "Inactive" },
    { id: 4, name: "Tokyo Satellite", address: "Roppongi Hills Mori Tower", city: "Tokyo, JP", phone: "+81 3 4567 8901", status: "Active" },
  ];

  const filteredBranches = branchData.filter(branch => 
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full  bg-slate-50 min-h-screen">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative group w-full sm:w-auto">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            search
          </span>
          <input
            type="text"
            placeholder="Filter locations..."
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg text-sm w-full sm:w-72 transition-all placeholder-slate-400 text-slate-600 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          ADD NEW BRANCH
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
                <th className="px-6 py-4">Branch Name</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredBranches.map((branch) => (
                <tr key={branch.id} className="hover:bg-indigo-50/40 transition-colors bg-white/40">
                  <td className="px-6 py-4 font-semibold text-slate-800">{branch.name}</td>
                  <td className="px-6 py-4 text-slate-500">{branch.address}</td>
                  <td className="px-6 py-4 text-slate-500">{branch.city}</td>
                  <td className="px-6 py-4 text-slate-500">{branch.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      branch.status === 'Active' 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        branch.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}></span>
                      {branch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Showing {filteredBranches.length} of {branchData.length} branches
            </span>
            <div className="flex gap-2">
              <button className="p-1 rounded hover:bg-white disabled:opacity-50 text-slate-500" disabled>
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <button className="p-1 rounded hover:bg-white text-slate-500">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchManagement;