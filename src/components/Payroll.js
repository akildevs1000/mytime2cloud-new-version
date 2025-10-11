import React, { useEffect, useRef } from 'react';

const Payroll = () => {

    return (
        <div className="py-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3
                        className="text-lg font-semibold text-text-light dark:text-text-dark mb-4"
                    >
                        Salary Details
                    </h3>
                    <div className="space-y-4">
                        <div
                            className="p-4 border border-border-light dark:border-border-dark rounded-lg"
                        >
                            <div className="flex justify-between items-center">
                                <p
                                    className="text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Basic Salary
                                </p>
                                <p
                                    className="text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    $4,500.00
                                </p>
                            </div>
                        </div>
                        <div
                            className="p-4 border border-border-light dark:border-border-dark rounded-lg"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <p
                                    className="text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Housing Allowance
                                </p>
                                <p
                                    className="text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    $300.00
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p
                                    className="text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Transport Allowance
                                </p>
                                <p
                                    className="text-sm font-medium text-text-light dark:text-text-dark"
                                >
                                    $200.00
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3
                        className="text-lg font-semibold text-text-light dark:text-text-dark mb-4"
                    >
                        Bank Information
                    </h3>
                    <div
                        className="p-4 border border-border-light dark:border-border-dark rounded-lg flex items-start"
                    >
                        <span className="material-icons text-primary mr-4 mt-1"
                        >account_balance</span
                        >
                        <div>
                            <p
                                className="font-medium text-text-light dark:text-text-dark"
                            >
                                Bank of America
                            </p>
                            <p
                                className="text-sm text-subtext-light dark:text-subtext-dark"
                            >
                                Checking Account
                            </p>
                            <p
                                className="text-sm text-subtext-light dark:text-subtext-dark"
                            >
                                **** **** **** 1234
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3
                    className="text-lg font-semibold text-text-light dark:text-text-dark mb-4"
                >
                    Last 3 Months Salary
                </h3>
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
                                    Month
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider"
                                    scope="col"
                                >
                                    Pay Date
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wider"
                                    scope="col"
                                >
                                    Net Pay
                                </th>
                                <th className="relative px-6 py-3" scope="col">
                                    <span className="sr-only">Download</span>
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
                                    November 2023
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Nov 20, 2023
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    $5,000.00
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
                                    October 2023
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Oct 20, 2023
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    $5,000.00
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
                                    September 2023
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    Sep 20, 2023
                                </td>
                                <td
                                    className="px-6 py-4 whitespace-nowrap text-sm text-subtext-light dark:text-subtext-dark"
                                >
                                    $5,000.00
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

export default Payroll;