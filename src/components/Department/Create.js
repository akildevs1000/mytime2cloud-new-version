// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DropDown from "@/components/ui/DropDown";

import { getBranches, createDepartment, parseApiError } from "@/lib/api";
import { SuccessDialog } from "@/components/SuccessDialog";

let defaultPayload = {
  name: "",
  branch_id: "",
};

const Create = ({ onSuccess = () => { } }) => {

  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const [branches, setBranches] = useState([]);

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
      <Button onClick={() => setOpen(true)}>Add Admin</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Admin</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1">Branch</label>
              <DropDown
                placeholder="Select Branch"
                onChange={(val) => handleChange("branch_id", val)}
                value={form.branch_id}
                items={branches}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Name</label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
          </div>

          {globalError && (
            <div className="mb-4 p-3 border border-red-500 bg-red-50 text-red-700 rounded-lg" role="alert">
              {globalError}
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              disabled={loading}
              className="bg-primary text-white"
            >
              {loading ? "Saving..." : "Create Admin"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SuccessDialog
        successOpen={successOpen}
        onOpenChange={setSuccessOpen}
        title="Admin Saved"
        description="Admin Saved successfully."
      />
    </>
  );
};

export default Create;
