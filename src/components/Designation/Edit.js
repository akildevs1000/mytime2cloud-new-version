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

import { updateDesignations } from "@/lib/api";
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
      let { data } = await updateDesignations(initialData.id, form);

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
          <DialogTitle>Edit Sub Department</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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
