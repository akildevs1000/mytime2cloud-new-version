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

import { createDesignations, parseApiError } from "@/lib/api";
import { SuccessDialog } from "@/components/SuccessDialog";

let defaultPayload = {
  name: "",
};

const Create = ({ onSuccess = () => { } }) => {

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
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
    setGlobalError(null);
    setLoading(true);
    try {

      let { data } = await createDesignations(form);

      if (!data?.status == false) {
        console.log(data?.status);
        
        const firstKey = Object.keys(data.errors)[0]; // get the first key
        const firstError = data.errors[firstKey][0]; // get its first error message
        setGlobalError(firstError);
        return;
      }

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
      <Button onClick={() => setOpen(true)}>Add Designation</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>New Designation</DialogTitle>
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
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              disabled={loading}
              className="bg-primary text-white"
            >
              {loading ? "Saving..." : "Create Designation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SuccessDialog
        successOpen={successOpen}
        onOpenChange={setSuccessOpen}
        title="Designation Saved"
        description="Designation Saved successfully."
      />
    </>
  );
};

export default Create;
