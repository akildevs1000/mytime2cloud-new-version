import React, { useState } from 'react';
import { Landmark, User, Hash, Code, MapPin, Check } from 'lucide-react';
import Input from '@/components/Theme/Input';
import TextArea from '@/components/Theme/TextArea';

const BankingDetails = () => {
  const [formData, setFormData] = useState({
    bankName: '',
    accountHolder: 'Sarah Jenkins',
    accountNumber: '',
    swiftCode: '',
    branchAddress: '',
    isPrimary: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving Banking Data:', formData);
    // Logic to save data would go here
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight mb-2">
              Banking Details
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
              Manage the employee's bank account information for payroll processing.
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Row 1: Bank Name & Holder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                label="Bank Name"
                name="bankName"
                placeholder="e.g. Chase Bank"
                value={formData.bankName}
                onChange={handleChange}
                icon={<Landmark size={20} />}
              />
              <InputGroup
                label="Account Holder Name"
                name="accountHolder"
                placeholder="e.g. Sarah Jenkins"
                value={formData.accountHolder}
                onChange={handleChange}
                icon={<User size={20} />}
              />
            </div>

            {/* Row 2: IBAN & SWIFT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                label="Account Number (IBAN)"
                name="accountNumber"
                placeholder="e.g. US12 3456 7890 1234 5678"
                value={formData.accountNumber}
                onChange={handleChange}
                icon={<Hash size={20} />}
                className="font-mono"
              />
              <InputGroup
                label="Swift / BIC Code"
                name="swiftCode"
                placeholder="e.g. CHASUS33"
                value={formData.swiftCode}
                onChange={handleChange}
                icon={<Code size={20} />}
                className="font-mono"
              />
            </div>

            {/* Row 3: Address */}
            <div className="flex flex-col gap-2">
              <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">Branch Address</span>
              <div className="relative">
                <TextArea
                  name="branchAddress"
                  value={formData.branchAddress}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g. 123 Main Street, New York, NY 10001"
                />
                <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
                  <MapPin size={20} />
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700 mt-2">
              <div className="flex flex-col">
                <span className="text-slate-900 dark:text-white font-medium text-sm">Set as Primary Account</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">
                  This account will be used for all salary deposits.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <Input
                  type="checkbox"
                  name="isPrimary"
                  checked={formData.isPrimary}
                  onChange={handleChange}
                  className="sr-only peer"
                />
              </label>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-8 pb-10">
          <button
            type="button"
            className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none font-medium text-sm transition-all flex items-center gap-2"
          >
            <Check size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Component
const InputGroup = ({ label, name, placeholder, value, onChange, icon, className = "" }) => (
  <label className="flex flex-col gap-2">
    <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">{label}</span>
    <div className="relative">
      <Input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div className="absolute right-3 top-3 text-slate-400 pointer-events-none">
        {icon}
      </div>
    </div>
  </label>
);

export default BankingDetails;