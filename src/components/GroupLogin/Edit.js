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

import { updateBranch } from "@/lib/api";
import { parseApiError } from "@/lib/utils";

const Edit = ({
  initialData = {},
  onSuccess = () => { },
  controlledOpen,
  controlledSetOpen,
}) => {
  const isControlled = controlledOpen !== undefined;
  const [open, setOpen] = useState(false);
  const actualOpen = isControlled ? controlledOpen : open;
  const actualSetOpen = isControlled ? controlledSetOpen : setOpen;

  const [loading, setLoading] = useState(false);

  const [globalError, setGlobalError] = useState(null);

  const [form, setForm] = useState(initialData);

  useEffect(() => {
    if (actualOpen) {
      setForm(initialData);
    }
  }, [actualOpen, initialData]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
    setGlobalError(null);
    setLoading(true);
    try {
      let { data } = await updateBranch(initialData.id, form);

      console.log(data?.status);

      if (data?.status == false) {
        console.log(data?.status);

        const firstKey = Object.keys(data.errors)[0]; // get the first key
        const firstError = data.errors[firstKey][0]; // get its first error message
        setGlobalError(firstError);
        return;
      }
      onSuccess();
      actualSetOpen(false);
    } catch (error) {
      setGlobalError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={actualOpen} onOpenChange={actualSetOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Branch</DialogTitle>
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
              <Input
                value={form.licence_expiry}
                onChange={(e) => handleChange("licence_expiry", e.target.value)}
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
          <Button variant="outline" onClick={() => actualSetOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={loading}
            className="bg-primary text-white"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
