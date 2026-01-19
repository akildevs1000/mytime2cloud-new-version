"use client";

import { useEffect, useMemo, useState } from "react";
import { deleteDocument, getDocuments, uploadEmployeeDocument } from "@/lib/api";
import { getEmployeeDocumentDonwloadLink } from "@/lib/utils";

// shadcn/ui
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Document = ({ employee_id }) => {
    const [documents, setDocuments] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchDocuments = async () => {
        try {
            setDocuments(await getDocuments(employee_id));
        } catch {
            setDocuments([]);
        }
    };

    // fetch documents
    useEffect(() => {
        fetchDocuments();
    }, [employee_id]);

    const resetForm = () => {
        setTitle("");
        setFile(null);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setSubmitting(true);
        try {
            await uploadEmployeeDocument(employee_id, { title, file });
            fetchDocuments();
            resetForm();
            setOpen(false);
        } catch (err) {
            console.error(err);
            // Optionally show a toast here
        } finally {
            setSubmitting(false);
        }
    };

    const onDelete = async (id) => {
        setSubmitting(true);
        try {
            await deleteDocument(id);
            fetchDocuments();
            resetForm();
            setOpen(false);
        } catch (err) {
            console.error(err);
            // Optionally show a toast here
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="py-6 space-y-8">
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
                        All Documents
                    </h3>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="text-sm font-medium">
                                <span className="material-icons mr-2 text-base">add</span>
                                Add Document
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add Document</DialogTitle>
                                <DialogDescription>
                                    Provide a title and attach a file. Supported types depend on your backend validation.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={onSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="doc-title">Title</Label>
                                    <Input
                                        id="doc-title"
                                        placeholder="e.g., Passport Copy"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="doc-file">Attachment</Label>
                                    <Input
                                        id="doc-file"
                                        type="file"
                                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                        // accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                        required
                                    />
                                    {file && (
                                        <p className="text-xs text-muted-foreground">
                                            Selected: {file.name} ({Math.ceil(file.size / 1024)} KB)
                                        </p>
                                    )}
                                </div>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={submitting}
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>

                                    <Button type="submit" disabled={submitting}>
                                        {submitting ? "Uploading..." : "Save"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="overflow-hidden rounded-lg border border-border-light dark:border-border-dark">
                    <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
                        <thead className="bg-background-light dark:bg-background-dark">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-subtext-light dark:text-subtext-dark">
                                    Document Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-subtext-light dark:text-subtext-dark">
                                    Document Attachment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-subtext-light dark:text-subtext-dark">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light bg-surface-light dark:divide-border-dark dark:bg-surface-dark">
                            {documents.map((e, index) => (
                                <tr key={e?.id ?? index}>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-text-light dark:text-text-dark">
                                        {e.title}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-subtext-light dark:text-subtext-dark">
                                        <a
                                            title="Download Attachment"
                                            target="_blank"
                                            href={getEmployeeDocumentDonwloadLink(e.employee_id, e.attachment)}
                                            className="inline-flex items-center text-violet-600 hover:text-violet-800"
                                        >
                                            <span className="material-icons align-middle text-sm">download</span>
                                        </a>
                                    </td>

                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-subtext-light dark:text-subtext-dark">
                                        <a
                                            title="Delete Attachment"
                                            onClick={() => onDelete(e.id)}
                                            className="inline-flex items-center text-violet-600 hover:text-violet-800 cursor-pointer"
                                        >
                                            <span className="material-icons align-middle text-sm">delete</span>
                                        </a>
                                    </td>

                                </tr>
                            ))}
                            {documents.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-6 py-10 text-center text-sm text-muted-foreground">
                                        No documents yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Document;
