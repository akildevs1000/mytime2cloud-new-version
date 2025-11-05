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

import { parseApiError, updateSubDepartments } from "@/lib/api";

const Edit = ({
  initialData = {},
  onSuccess = () => {},
  controlledOpen,
  controlledSetOpen,
}) => {
  const isControlled = controlledOpen !== undefined;
  const [open, setOpen] = useState(false);
  const actualOpen = isControlled ? controlledOpen : open;
  const actualSetOpen = isControlled ? controlledSetOpen : setOpen;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setError(null);
    setLoading(true);
    try {
      await updateSubDepartments(initialData.id, form);
      onSuccess();
      actualSetOpen(false);
    } catch (error) {
      setError(parseApiError(error));
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
