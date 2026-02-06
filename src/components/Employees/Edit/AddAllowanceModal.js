import React, { useState } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';
import Input from '@/components/Theme/Input';
import DropDown from '@/components/ui/DropDown';

const AddAllowanceModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allowanceType, setAllowanceType] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allowanceType || !amount) return;

    // onAdd({
    //   type: allowanceType,
    //   amount: parseFloat(amount),
    // });

    // Reset and close
    setAllowanceType('');
    setAmount('');
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-sm transition-colors"
      >
        <Plus size={14} className="mr-1" /> Add Allowance
      </button>
      {
        isOpen &&
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/50 backdrop-blur-sm p-4 md:p-0 transition-opacity">
          <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-[#1F2937] shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all transform scale-100 opacity-100">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Allowance
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">
                {/* Allowance Type Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Allowance Type
                  </label>
                  <div className="relative">


                    <DropDown
                      placeholder={'Select Report Template'}
                      onChange={(e) => setAllowanceType(e.target.value)}
                      value={allowanceType}
                      items={[
                        { id: 'Housing Allowance', name: 'Housing Allowance' },
                        { id: 'Transport Allowance', name: 'Transport Allowance' },
                        { id: 'Food Allowance', name: 'Food Allowance' },
                        { id: 'Medical Allowance', name: 'Medical Allowance' },
                        { id: 'Education Allowance', name: 'Education Allowance' },
                      ]}
                    />
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <Input
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      id="allowance_amount"
                      placeholder="0.00"
                      required
                    />
                    {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div> */}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 bg-gray-50 dark:bg-gray-800/50 px-6 py-4 rounded-b-xl border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-800 transition shadow-sm bg-white dark:bg-transparent"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-purple-700 text-white text-sm font-medium shadow-md transition"
                  type="submit"
                >
                  Add Allowance
                </button>
              </div>
            </form>
          </div>
        </div>
      }


    </>

  );
};

export default AddAllowanceModal;