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

import { createBranch } from "@/lib/api";
import { SuccessDialog } from "@/components/SuccessDialog";
import DatePicker from "../ui/DatePicker";
import { parseApiError } from "@/lib/utils";

let defaultPayload = {
  user_id: 0, // dont changedefault 

  branch_name: "",
  licence_number: "",
  licence_issue_by_department: "",
  licence_expiry: "",
  lat: "",
  lon: "",
  address: "",
};

const Create = ({ pageTitle = "Item", onSuccess = () => { } }) => {

  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(defaultPayload);

  useEffect(() => {
    if (open) {
      setForm(defaultPayload);
    }
  }, [open]);

  const handleChange = (field, value) => {
    console.log(field, value);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
    setGlobalError(null);
    setLoading(true);
    try {

      let { data } = await createBranch(form);

      if (data?.status == false) {

        const firstKey = Object.keys(data.errors)[0]; // get the first key
        const firstError = data.errors[firstKey][0]; // get its first error message
        setGlobalError(firstError);
        return;
      }
      console.log(data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOpen(false);
      onSuccess();
    } catch (error) {
      setGlobalError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add {pageTitle}</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!w-[600px] !max-w-[90%]">
          <DialogHeader>
            <DialogTitle>New {pageTitle}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">

            <div>
              <label className="block text-xs font-medium mb-1">Name</label>
              <Input
                value={form.branch_name}
                onChange={(e) => handleChange("branch_name", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Licence</label>
                <Input
                  value={form.licence_number}
                  onChange={(e) => handleChange("licence_number", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Issued By Department</label>
                <Input
                  value={form.licence_issue_by_department}
                  onChange={(e) => handleChange("licence_issue_by_department", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Licence Expiry</label>
                <DatePicker
                  value={form.licence_expiry}
                  onChange={(value) => handleChange("licence_expiry", value)}
                  placeholder="Pick a date"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Lat</label>
                <Input
                  value={form.lat}
                  onChange={(e) => handleChange("lat", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Lon</label>
                <Input
                  value={form.lon}
                  onChange={(e) => handleChange("lon", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                rows={4} // adjust height
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
              {loading ? "Saving..." : `Create ${pageTitle}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SuccessDialog
        successOpen={successOpen}
        onOpenChange={setSuccessOpen}
        title={`Saved ${pageTitle}`}
        description="Branch Saved successfully."
      />
    </>
  );
};

export default Create;
