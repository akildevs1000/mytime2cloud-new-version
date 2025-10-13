
const Document = () => {

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
                                    Upload Date
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider"
                                    scope="col"
                                >
                                    Status
                                </th>
                                <th className="relative px-6 py-3" scope="col">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-surface-light dark:bg-surface-dark divide-y divide-border-light dark:divide-border-dark"
                        >
                            <tr>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    Offer Letter
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Jan 15, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    >
                                        Acknowledged
                                    </span>
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                >
                                    <a className="text-primary hover:text-primary/80" href="#"
                                    ><span className="material-icons align-middle"
                                    >download</span
                                        ></a
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    Employment Contract
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Jan 15, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    >
                                        Acknowledged
                                    </span>
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                >
                                    <a className="text-primary hover:text-primary/80" href="#"
                                    ><span className="material-icons align-middle"
                                    >download</span
                                        ></a
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    Performance Review Q4 2023
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Dec 20, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        className="px-3 py-1 rounded-md bg-primary text-white text-xs font-medium"
                                    >
                                        Acknowledge
                                    </button>
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                >
                                    <a className="text-primary hover:text-primary/80" href="#"
                                    ><span className="material-icons align-middle"
                                    >download</span
                                        ></a
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    Company Handbook
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Oct 01, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                    >
                                        Acknowledged
                                    </span>
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                >
                                    <a className="text-primary hover:text-primary/80" href="#"
                                    ><span className="material-icons align-middle"
                                    >download</span
                                        ></a
                                    >
                                </td>
                            </tr>
                            <tr>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    Updated W-4 Form
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Sep 05, 2023
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        className="px-3 py-1 rounded-md bg-primary text-white text-xs font-medium"
                                    >
                                        Acknowledge
                                    </button>
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                >
                                    <a className="text-primary hover:text-primary/80" href="#"
                                    ><span className="material-icons align-middle"
                                    >download</span
                                        ></a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Document;