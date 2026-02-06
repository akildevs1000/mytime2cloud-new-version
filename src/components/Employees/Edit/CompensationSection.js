import React, { useState } from 'react';
import { Lock, Plus, Trash2 } from 'lucide-react';
import AddAllowanceModal from './AddAllowanceModal';

const CompensationSection = () => {
  // State for Fixed Salary
  const [basicPay, setBasicPay] = useState(4800);
  const [payFrequency, setPayFrequency] = useState('Monthly');

  // State for Dynamic Allowances
  const [allowances, setAllowances] = useState([
    { id: 1, description: 'House Rent Allowance', amount: 1200 },
    { id: 2, description: 'Travel Allowance', amount: 800 },
    { id: 3, description: 'Medical Allowance', amount: 450 },
  ]);

  // Calculations
  const totalAllowances = allowances.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const grossTotal = basicPay + totalAllowances;

  // Handlers
  const handleAllowanceChange = (id, field, value) => {
    setAllowances(allowances.map(allowance =>
      allowance.id === id ? { ...allowance, [field]: value } : allowance
    ));
  };

  const addAllowance = () => {
    const newId = allowances.length > 0 ? Math.max(...allowances.map(a => a.id)) + 1 : 1;
    setAllowances([...allowances, { id: newId, description: '', amount: 0 }]);
  };

  const removeAllowance = (id) => {
    setAllowances(allowances.filter(allowance => allowance.id !== id));
  };

  const formatCurrency = (num) => {
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
                <input
                  type="number"
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-gray-900 dark:text-white pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
                  value={basicPay}
                  onChange={(e) => setBasicPay(Number(e.target.value))}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pay Frequency</label>
              <select
                value={payFrequency}
                onChange={(e) => setPayFrequency(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
              >
                <option>Monthly</option>
                <option>Bi-Weekly</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Allowances Table Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Allowances</h3>
            <span className="text-xs text-gray-500">Variable components</span>
          </div>
          <AddAllowanceModal />
        
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Amount</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {allowances.map((allowance) => (
                <tr key={allowance.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      className="block w-full border-0 p-0 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 bg-transparent text-sm"
                      placeholder="e.g. House Rent Allowance"
                      value={allowance.description}
                      onChange={(e) => handleAllowanceChange(allowance.id, 'description', e.target.value)}
                    />
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm mr-2">$</span>
                      <input
                        type="number"
                        className="block w-full border-0 p-0 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 bg-transparent text-sm text-right"
                        value={allowance.amount}
                        onChange={(e) => handleAllowanceChange(allowance.id, 'amount', e.target.value)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => removeAllowance(allowance.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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

export default CompensationSection;