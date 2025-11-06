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
        <div className="absolute mt-2 w-24 bg-white border rounded shadow-lg z-10">
          <button
            onClick={() => setOpenEdit("edit")}
            className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-600"
          >
            <PenBox size={14} /> Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-gray-100 text-gray-600"
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

export default function Columns({ handleRowClick, onSuccess = () => { } } = {}) {
  return [
    {
      key: "branch_name",
      header: "Name",
      render: (item) => (
        <span onClick={() => handleRowClick(item)}
          className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
          title={item.branch_name || "—"}
        >
          {item.branch_name || "—"}
        </span>
      ),
    },
    {
      key: "licence_number",
      header: "Licence",
      render: (item) => (
        <span
          className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
          title={item.licence_number || "—"}
        >
          {item.licence_number || "—"}
        </span>
      ),
    },
    {
      key: "licence_issue_by_department",
      header: "Licence Issued By Department",
      render: (item) => (
        <span
          className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
          title={item.licence_issue_by_department || "—"}
        >
          {item.licence_issue_by_department || "—"}
        </span>
      ),
    },
    {
      key: "licence_expiry",
      header: "Licence Expiry",
      render: (item) => (
        <span
          className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
          title={item.licence_expiry || "—"}
        >
          {item.licence_expiry || "—"}
        </span>
      ),
    },
    {
      key: "lat",
      header: "Lat",
      render: (item) => (
        <span
          className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
          title={item.lat || "—"}
        >
          {item.lat || "—"}
        </span>
      ),
    },
    {
      key: "lon",
      header: "Lon",
      render: (item) => (
        <span
          className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
          title={item.lon || "—"}
        >
          {item.lon || "—"}
        </span>
      ),
    },
    {
      key: "address",
      header: "Address",
      render: (item) => (
        <span
          className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
          title={item.address || "—"}
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
          className="text-gray-800 cursor-pointer block max-w-[150px] truncate"
          title={item.created_date || "—"}
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
