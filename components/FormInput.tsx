'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  icon,
  value,
  onChange,
  error,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-3.5 text-white placeholder-slate-500 transition focus:border-sky-500 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
