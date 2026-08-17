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

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-300">
        {label}
      </label>

      <div className="relative">
        <div
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
            error ? 'text-red-400' : 'text-zinc-500'
          }`}
        >
          {icon}
        </div>

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className={`w-full rounded-xl border bg-white/[0.04] px-12 py-3.5 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-400/40 focus:border-red-400/60 focus:ring-red-400/10'
              : 'border-white/[0.08] focus:border-cyan-400/50 focus:bg-white/[0.06] focus:ring-cyan-400/10'
          }`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}