// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import axios from "axios";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreVertical, Pencil, Trash2, Plus, RefreshCw } from "lucide-react";
import DataTable from "../ui/DataTable";
import Pagination from "@/lib/Pagination";
import { getSepartmentsForTable } from "@/lib/api";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({ id: null, name: "" });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // snackbar-ish message
  const [message, setMessage] = useState(null);

  const endpoint = "/department"; // same as your Vue `endpoint: "department"`

  // ---- Fetch data ----
  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      setError(null);


      let params = {
        page: currentPage,
        per_page: perPage,
      };

      const data = await getSepartmentsForTable(params);

      console.log(data);

      // assuming Laravel-style paginated response:
      // { data: [...], total, current_page, last_page, ... }
      setDepartments(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      setError("Failed to load departments.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, perPage]);

  // ---- Helpers ----
  const openNewDialog = () => {
    setEditedItem({ id: null, name: "" });
    setFormErrors({});
    setDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setEditedItem({ id: item.id, name: item.name || "" });
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleDelete = async (item) => {
    const ok = window.confirm(
      "Are you sure you wish to delete this department? This action cannot be undone."
    );
    if (!ok) return;

    try {
      setIsLoading(true);
      const { data } = await axios.delete(`${endpoint}/${item.id}`);

      setMessage(data.message || " Departments deleted successfully.");
      await fetchDepartments();
    } catch (err) {
      console.error(err);
      setError("Failed to delete department.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setFormErrors({});

    const payload = {
      name: editedItem.name,
      // company_id: ... // add if required
    };

    try {
      if (editedItem.id) {
        // update
        const { data } = await axios.put(
          `${endpoint}/${editedItem.id}`,
          payload
        );
        if (!data.status && data.errors) {
          setFormErrors(data.errors || {});
        } else {
          setMessage(data.message || " Departments updated successfully.");
          setDialogOpen(false);
          fetchDepartments();
        }
      } else {
        // create
        const { data } = await axios.post(endpoint, payload);
        if (!data.status && data.errors) {
          setFormErrors(data.errors || {});
        } else {
          setMessage(data.message || " Departments created successfully.");
          setDialogOpen(false);
          // reset to first page if you want to see it on top
          setCurrentPage(1);
          fetchDepartments();
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save department.");
    } finally {
      setSaving(false);
    }
  };

  const handleReload = () => {
    fetchDepartments();
  };

  const ManagerCell = ({ manager }) => {
    if (!manager) {
      return (
        <div>
          <div>---</div>
          <div className="text-xs text-slate-500 mt-0.5">
            --- <br /> ---
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>{manager.name || "---"}</div>
        <div className="text-xs text-slate-500 mt-0.5">
          {manager.email || "---"}
          <br />
          {manager.whatsapp_number || "---"}
        </div>
      </div>
    );
  };

  // ---- Columns for reusable DataTable ----
  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row) => row.name,
    },
    {
      key: "manager1",
      header: "Manager 1",
      render: (row) => (
        <ManagerCell manager={row.managers?.[0]} />
      ),
    },
    {
      key: "manager2",
      header: "Manager 2",
      render: (row) => (
        <ManagerCell manager={row.managers?.[1]} />
      ),
    },
    {
      key: "manager3",
      header: "Manager 3",
      render: (row) => (
        <ManagerCell manager={row.managers?.[2]} />
      ),
    },
    {
      key: "updated_at",
      header: "Last Updated Date",
      render: (row) => row.updated_at,
    },
    {
      key: "options",
      header: "Options",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center rounded-full p-1 hover:bg-slate-100">
              <MoreVertical className="h-4 w-4 text-slate-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => openEditDialog(row)}>
              <Pencil className="mr-2 h-3 w-3" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => handleDelete(row)}
            >
              <Trash2 className="mr-2 h-3 w-3" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];


  return (
    <div className="space-y-4">
      {/* Snackbar-like message */}
      {message && (
        <div className="rounded-md bg-emerald-100 text-emerald-800 px-4 py-2 text-sm flex justify-between items-center">
          <span>{message}</span>
          <button
            onClick={() => setMessage(null)}
            className="text-xs font-semibold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold"> Departments

            {/* <Button className="mt-15"
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            title="Reload"
                            onClick={handleReload}
                        >
                            <RefreshCw className="h-4 w-4" />
                        </Button> */}
          </h3>
          <p className="text-xs text-muted-foreground">
            Manage department names used across the system.
          </p>

        </div>

        <div className="flex items-center gap-2">


          <Button
            size="sm"
            className="bg-primary text-white"
            onClick={openNewDialog}
          >
            <Plus className="h-4 w-4" />
            Departments
          </Button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable className="overflow-hidden"
        columns={columns}
        data={departments}
        isLoading={isLoading}
        error={error}
        pagination={
          <Pagination
            page={currentPage}
            perPage={perPage}
            total={total}
            onPageChange={setCurrentPage}
            onPerPageChange={(n) => {
              setPerPage(n);
              setCurrentPage(1);
            }}
            pageSizeOptions={[10, 50, 100, 500, 1000]}
          />
        }
      />

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {editedItem.id ? "Edit  Departments" : "New  Departments"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">
                Departments Name <span className="text-red-500">*</span>
              </label>
              <Input
                value={editedItem.name}
                onChange={(e) =>
                  setEditedItem((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder=" Departments Name"
                className="text-sm"
              />
              {formErrors?.name && (
                <p className="mt-1 text-xs text-red-500">
                  {formErrors.name[0]}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-primary text-white"
              disabled={saving || !editedItem.name?.trim()}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Department;
