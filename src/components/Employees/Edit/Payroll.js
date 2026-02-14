import React, { useEffect, useState } from 'react';
import { Lock, Plus, Trash2 } from 'lucide-react';
import Input from '@/components/Theme/Input';
import DropDown from '@/components/ui/DropDown';
import PayrollModel from './PayrollModal';
import { getPayroll, storePayroll } from '@/lib/api';
import { notify } from '@/lib/utils';

const Payroll = ({ employee_id }) => {
  // State for Fixed Salary
  const [basicPay, setBasicPay] = useState(4800);
  const [netPay, setNetPay] = useState(0);
  const [payFrequency, setPayFrequency] = useState('Monthly');
  // State for Dynamic Allowances
  const [allowances, setAllowances] = useState([]);

  const fetchPayroll = async (employee_id) => {
    let { data } = await getPayroll(employee_id);
    console.log(`data`);
    console.log(data);
    console.log(data.earnings);
    setBasicPay(data.basic_salary);
    setNetPay(data.net_salary);
    setAllowances(data.earnings);
  }

  useEffect(() => {

    fetchPayroll(employee_id);
  }, [])


  // Calculations
  const totalAllowances = allowances.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const grossTotal = Number(basicPay) + totalAllowances;

  const onDelete = async (index) => {
    let payload = {
      "earnings": allowances.filter((e, i) => i != index),
      "effective_date": "2026-02-01",
      "basic_salary": basicPay,
      "net_salary": grossTotal,
      "employee_id": employee_id
    };

    try {
      await storePayroll(payload);
      await notify("Success!", `Allowance added.`, "success");
      fetchPayroll(employee_id);
    } catch ({ response }) {
      await notify("Error!", response?.data?.message, "error");
      // Optionally show a toast here
    } finally {
    }

  }

  const formatCurrency = (num) => {
    return `${Number(num).toFixed(2)} AED`;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  return (
    <div className="md:col-span-8 lg:col-span-9 space-y-6 p-4">

      {/* Fixed Salary Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">Fixed Salary</h3>
          <Lock size={18} className="text-gray-400" />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Basic Pay</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <Input
                  value={basicPay}
                  onChange={(e) => setBasicPay(Number(e.target.value || 0))}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">AED</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pay Frequency</label>
              <DropDown
                width="w-full"
                items={[
                  { id: "Monthly", name: "Monthly" },
                  { id: "Bi-Weekly", name: "Bi-Weekly" },
                  { id: "Weekly", name: "Weekly" },
                ]}
                value={payFrequency}
                onChange={(e) => setPayFrequency(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 flex flex-col overflow-hidden  relative">
        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Allowance</h3>
            <PayrollModel basic_salary={basicPay} allowances={allowances} employee_id={employee_id} onSuccess={(e) => { fetchPayroll(e) }} />
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                    Description
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                    Amount
                  </th>
                  <th className={`px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {allowances.map((allowance, index) => (
                  <tr key={allowance.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{allowance.label}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{allowance.value}</td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => onDelete(index)} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Allowances Table Card */}


      {/* Summary Card */}
      <div className="flex flex-col md:flex-row justify-end items-stretch gap-4">
        <div className="md:w-1/2 lg:w-5/12">
          <div className="bg-primary bg-opacity-5 dark:bg-slate-900 border border-border rounded-xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-600 dark:text-slate-300 uppercase tracking-widest mb-4">
              Total Compensation
            </h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Fixed</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(basicPay)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Allowances</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {formatCurrency(totalAllowances)}
              </span>
            </div>
            <div className="h-px bg-indigo-600/20 my-3"></div>
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Gross Total</span>
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {formatCurrency(grossTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;