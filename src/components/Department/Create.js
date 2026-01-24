// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


import { getBranches, createDepartment } from "@/lib/api";
import { SuccessDialog } from "@/components/SuccessDialog";
import { parseApiError } from "@/lib/utils";
import Input from "../Theme/Input";
import TextArea from "../Theme/TextArea";

let defaultPayload = {
  name: "",
  branch_id: "",
};

const Create = ({ onSuccess = () => { } }) => {

  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const [branches, setBranches] = useState([]);

  const toggleModal = () => setOpen(!open);

  const fetchBranches = async () => {
    try {
      setBranches(await getBranches());
    } catch (error) {
      setGlobalError(parseApiError(error));
    }
  };

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(defaultPayload);

  useEffect(() => {
    if (open) {
      fetchBranches();
      setForm(defaultPayload);
    }
  }, [open]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
    setGlobalError(null);
    setLoading(true);
    try {

      await createDepartment(form);

      onSuccess();

      setOpen(false);

      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccessOpen(true);

    } catch (error) {
      setGlobalError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="bg-primary hover:bg-blue-600 text-white text-sm font-semibold py-2 px-3 rounded-lg flex items-center gap-1 transition-all shadow-lg shadow-primary/20"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        Add Department
      </button>

      {/* Modal Portal Logic */}
      {open && (
        <div
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop/Overlay */}
          <div
            className="absolute inset-0 bg-black/70 frosted-glass transition-opacity animate-in fade-in duration-300"
            onClick={toggleModal}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 w-full max-w-lg overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">

            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Add Department</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Create a new department in the system
                </p>
              </div>
              <button
                onClick={toggleModal}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors rounded-full p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={onSubmit}>
              <div className="p-6 space-y-5 bg-white/50 dark:bg-gray-900">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-400">
                    Department Title <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    placeholder="e.g. Sales"
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-400">
                    Description
                  </label>

                  <TextArea
                    placeholder="Brief description of the department..."
                    rows={3}
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-white/10  flex justify-end gap-3">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:text-white hover:bg-background-dark transition-all text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-primary/20"
                >
                  {loading ? "Saving..." : "Save Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SuccessDialog
        successOpen={successOpen}
        onOpenChange={setSuccessOpen}
        title="Department Saved"
        description="Department Saved successfully."
      />
    </>
  );
};

export default Create;
