// columns.js
"use client";

import { useState } from "react";
import { MoreVertical, PenBox, Trash2 } from "lucide-react";
import Edit from "@/components/Branch/Edit";

import { deleteBranch } from "@/lib/api";
import { parseApiError } from "@/lib/utils";


function OptionsMenu({ item, onSuccess = () => { } }) {
  const [openEdit, setOpenEdit] = useState(false);

  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return; // exit if user cancels
    try {
      await deleteBranch(id);
      onSuccess(); // refresh parent data after successful delete
      setOpenEdit(false); // close menu
    } catch (error) {
      console.log(parseApiError(error));
    }
  };

  return (
    <div className="relative">
      <MoreVertical
        className="text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={() => setOpenEdit(!openEdit)}
      />

      {openEdit && (
        <div className="absolute mt-2 w-24 bg-white dark:bg-slate-900 border border-border rounded shadow-lg z-10">
          <button
            onClick={() => setOpenEdit("edit")}
            className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 dark:hover:bg-gray-700 hover:bg-gray-100 text-gray-600 dark:text-slate-300"
          >
            <PenBox size={14} /> Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 dark:hover:bg-gray-700 hover:bg-gray-100 text-gray-600 dark:text-slate-300"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}

      {/* 👇 Edit Dialog Integration */}
      {openEdit === "edit" && (
        <Edit
          initialData={item}
          controlledOpen={true}
          controlledSetOpen={(val) => setOpenEdit(val ? "edit" : false)}
          onSuccess={() => {
            onSuccess(); // refresh parent data
            setOpenEdit(false);
          }}
        />
      )}
    </div>
  );
}

// 	City	Phone	Status	Actions
export default function Columns({ handleRowClick, onSuccess = () => { } } = {}) {
  return [
    {
      key: "branch_name",
      header: "Name",
      render: (item) => (
        <span onClick={() => handleRowClick(item)}
          className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono"
        >
          {item.branch_name || "—"}
        </span>
      ),
    },

    {
      key: "branch_code",
      header: "Short Name",
      render: (item) => (
        <span onClick={() => handleRowClick(item)}
          className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono"
        >
          {item.branch_code || "—"}
        </span>
      ),
    },
    {
      key: "address",
      header: "Location",
      render: (item) => (
        <span
          className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono"
        >
          {item.address || "—"}
        </span>
      ),
    },
    
    {
      key: "created_date",
      header: "Since",
      render: (item) => (
        <span
          className="text-sm text-slate-500 dark:text-slate-400 hidden xl:table-cell font-mono"
        >
          {item.created_date || "—"}
        </span>
      ),
    },

    {
      key: "options",
      header: "Options",
      render: (item) => (
        <OptionsMenu
          item={item}
          onSuccess={onSuccess}
        />
      ),
    },
  ];
}
