'use client';

import { ArrowRight, Mic, Sparkles } from 'lucide-react';

export function CommandBar({ placeholder, label }: { placeholder: string; label: string }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex w-[min(92vw,720px)] -translate-x-1/2 items-center gap-3 rounded-full border border-[#00f0ff]/20 bg-[#0e0e0e]/90 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <div className="flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#171717] px-3 py-2">
        <Sparkles className="h-4 w-4 text-[#00f0ff]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">{label}</span>
      </div>
      <input
        className="flex-1 bg-transparent text-sm text-[#f3f0ee] outline-none placeholder:text-[#7b7f83]"
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <div className="flex items-center gap-2">
        <button type="button" className="rounded-full border border-[#2b2b2b] p-2 text-[#8f9397] transition hover:text-white" aria-label="Voice input">
          <Mic className="h-4 w-4" />
        </button>
        <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00f0ff] text-[#00363a] transition hover:brightness-110 active:scale-95">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
