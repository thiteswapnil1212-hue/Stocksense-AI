'use client';

interface AuthFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

export function AuthField({ label, type, name, placeholder }: AuthFieldProps) {
  return (
    <label className="block text-sm text-slate-200">
      <span className="mb-2 block text-sm text-slate-400">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
      />
    </label>
  );
}
