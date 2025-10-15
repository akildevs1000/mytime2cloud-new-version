"use client";

import { getDocuments } from "@/lib/api";
import { getEmployeeDocumentDonwloadLink } from "@/lib/utils";
import { useEffect, useState } from "react";

const Document = ({ employee_id }) => {

    const [documents, setDocuments] = useState([]);

    // getDocuments

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                setDocuments(await getDocuments(employee_id));
            } catch (error) {
                setDocuments([]);
            }
        };
        fetchBranches();
    }, []);

    return (
        <div className="py-6 space-y-8">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3
                        className="text-lg font-semibold text-text-light dark:text-text-dark"
                    >
                        All Documents
                    </h3>
                    <div className="flex items-center space-x-2">
                        <button
                            className="px-4 py-2 rounded-lg bg-primary text-white flex items-center space-x-2 text-sm font-medium"
                        >
                            <span className="material-icons text-base">add</span>
                            <span>Add Document</span>
                        </button>
                    </div>
                </div>
                <div
                    className="border border-border-light dark:border-border-dark rounded-lg overflow-hidden"
                >
                    <table
                        className="min-w-full divide-y divide-border-light dark:divide-border-dark"
                    >
                        <thead className="bg-background-light dark:bg-background-dark">
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider"
                                    scope="col"
                                >
                                    Document Title
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider"
                                    scope="col"
                                >
                                    Document Attachment
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-surface-light dark:bg-surface-dark divide-y divide-border-light dark:divide-border-dark">
                            {documents.map((e, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-light dark:text-text-dark">
                                        {e.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark">

                                        <a
                                            title="Download Profile Picture"
                                            href={getEmployeeDocumentDonwloadLink(e.employee_id, e.attachment)}
                                            className="text-violet-600 hover:text-violet-800"
                                        >
                                            <span className="material-icons align-middle text-violet-600 text-sm">
                                                download
                                            </span>
                                        </a>

                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Document;