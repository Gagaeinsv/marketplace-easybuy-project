import React from 'react';
import { useField } from 'formik';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  icon?: React.ReactNode;
}

export default function TextInput({
  label,
  showPasswordToggle,
  showPassword,
  togglePasswordVisibility,
  icon,
  ...props
}: TextInputProps) {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;
  const isDisabled = props.disabled;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.name} className="block mb-1 text-xs font-semibold text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...field}
          {...props}
          type={showPasswordToggle && showPassword ? 'text' : props.type}
          className={`
            w-full rounded-xl px-3.5 py-2 text-sm
            border transition placeholder:text-gray-400 outline-none
            ${hasError ? 'border-red-500 bg-red-50 text-red-800' : 'border-[#e2e2e2] bg-white text-gray-900'}
            ${!hasError && 'focus:border-[#104c9a] focus:ring-[rgba(16,76,154,0.15)] focus:ring-3'}
            ${isDisabled && 'bg-gray-100 cursor-not-allowed text-gray-400'}
            hover:border-gray-400
            ${showPasswordToggle ? 'pr-10' : ''}
          `}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-700 flex items-center justify-center cursor-pointer"
          >
            {icon}
          </button>
        )}
      </div>

      {hasError && (
        <p className="mt-0.5 text-[11px] text-red-600 font-medium leading-tight">{meta.error}</p>
      )}
    </div>
  );
}
