import React, { useState } from 'react';

const Document = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dynamic data array for documents
  const [documents] = useState([
    {
      id: 1,
      name: "Business License.pdf",
      date: "Oct 20, 2024",
      type: "Legal",
      expiry: "Oct 24, 2025",
      icon: "description",
      iconBg: "bg-red-50",
      iconColor: "text-red-500"
    },
    {
      id: 2,
      name: "Tax_Registration_2024.pdf",
      date: "Jan 15, 2024",
      type: "Financial",
      expiry: "Dec 31, 2024",
      icon: "description",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    {
      id: 3,
      name: "Office_Floor_Plan_v3.png",
      date: "Sep 05, 2024",
      type: "Assets",
      expiry: "--",
      icon: "image",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500"
    }
  ]);

  // Filter logic for the search bar
  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full animate-fade-in p-4">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative group w-full sm:w-auto">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            search
          </span>
          <input
            type="text"
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-lg text-sm w-full sm:w-72 transition-all placeholder-slate-400 text-slate-600 shadow-sm outline-none"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
          UPLOAD
        </button>
      </div>

      {/* Glassmorphism Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs uppercase font-bold text-slate-500">
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Uploaded Date</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-indigo-50/40 transition-colors bg-white/40">
                    <td className="px-6 py-4 font-semibold text-slate-800 flex items-center gap-3">
                      <div className={`p-2 ${doc.iconBg} ${doc.iconColor} rounded-lg`}>
                        <span className="material-symbols-outlined text-lg">{doc.icon}</span>
                      </div>
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{doc.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-600 font-medium border border-slate-200">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{doc.expiry}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors mx-1" title="View">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </button>
                      <button className="text-slate-400 hover:text-indigo-600 transition-colors mx-1" title="Download">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">
                    No documents found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Document;