import React, { useState } from 'react';
import { X, ChevronDown, Calendar, FileText, Check, UploadCloud } from 'lucide-react';

const DocumentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  const toggleModal = () => setIsOpen(!isOpen);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="p-8 flex justify-center">
      {/* Trigger Button - Styled like the Education Modal trigger */}
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105"
      >
        <FileText size={20} />
        Add New Document
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          
          {/* Modal Container - Reference style from Education Modal */}
          <div className="relative w-full max-w-[640px] max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <h3 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
                Add New Document
              </h3>
              <button
                onClick={toggleModal}
                className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/20">
              <form id="document-form" className="flex flex-col gap-6">
                
                {/* Document Type Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Document Type</label>
                  <div className="relative">
                    <select 
                      className="w-full h-12 px-4 pr-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer outline-none transition-all"
                      defaultValue=""
                    >
                      <option value="" disabled>Select document type</option>
                      <option value="contract">Employment Contract</option>
                      <option value="id">Identification</option>
                      <option value="tax">Tax Form</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500" size={20} />
                  </div>
                </div>

                {/* Document Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Document Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Signed NDA 2023"
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Issue Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">Expiry Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* File Upload Area - Matching the Education Modal style */}
                <div className="mt-2">
                  <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold mb-2 block">
                    File Attachment
                  </label>
                  <div className="group relative flex flex-col md:flex-row items-center gap-4 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-white dark:bg-slate-900 px-6 py-4 transition-all">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <UploadCloud size={20} />
                    </div>
                    <div className="flex flex-1 flex-col items-center md:items-start text-center md:text-left">
                      <p className="text-slate-900 dark:text-white text-sm font-medium leading-tight">
                        {fileName === "No file chosen" ? "Click to upload or drag and drop" : fileName}
                      </p>
                      <p className="text-slate-500 text-xs mt-1">PDF, JPG or PNG (max. 5MB)</p>
                    </div>
                    <label className="shrink-0 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                      Browse
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <button
                onClick={toggleModal}
                className="px-5 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="document-form"
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Check size={18} />
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentModal;