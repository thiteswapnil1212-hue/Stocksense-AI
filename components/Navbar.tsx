'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from "next/image";


const navItems = [
  'Markets',
  'AI Analyst',
  'Portfolio',
  'Watchlist',
  'Pricing',
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative z-20 flex items-center justify-between px-6 py-4 md:px-10"
    >
    <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase text-slate-200">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          <span className="text-base text-sky-300">SS</span>
        </div>
        <div>
          <p className="text-white">StockSense AI</p>
        </div>
      </div>
      <nav className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl md:flex">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm font-medium text-slate-300 transition hover:text-white"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">

  <Link
    href="/signin"
    className="text-sm font-medium text-slate-300 transition hover:text-white"
  >
    Sign In
  </Link>
  <Link
    href="/signup"
    className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
  >
    login
  </Link>
</div>
    </motion.header>
  );
}
