// SuccessDialog.jsx
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Note: Removed 'SuccessDialogProps' interface and type annotations
export function SuccessDialog({ open, onOpenChange, title, description }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          border-none shadow-xl bg-white dark:bg-gray-900
          max-w-sm w-[90%] rounded-2xl p-8 text-center flex flex-col items-center justify-center
        "
        hideClose
      >
        {/* Hidden title for accessibility */}
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>

        {/* Visible custom content (Icon, Title, Description) */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
          <span
            className="material-icons text-white"
            style={{ fontSize: "48px" }}
          >
            check
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h1>

        <DialogDescription asChild>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}