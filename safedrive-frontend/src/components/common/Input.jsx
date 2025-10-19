import React from 'react';

const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  label,
  required = false 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-slate-300 text-sm font-semibold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-colors"
      />
    </div>
  );
};

export default Input;