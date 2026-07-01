import { clsx } from 'clsx';

type LoaderSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<LoaderSize, string> = {
  sm: 'h-px w-12',
  md: 'h-0.5 w-20',
  lg: 'h-0.5 w-28',
};

interface LoaderProps {
  size?: LoaderSize;
  className?: string;
}

export function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <div
  className={clsx(
    'loader-track relative overflow-hidden rounded-full bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 ring-1 ring-white/10 shadow-[0_0_25px_rgba(56,189,248,0.15)]',
    sizeMap[size],
    className
  )}
  role="status"
  aria-label="Loading"
>
  <div className="loader-sweep absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 shadow-[0_0_25px_rgba(56,189,248,.8)]" />
</div>
  );
}

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({ label = 'Loading', className }: LoadingStateProps) {
  return (
    <div className={clsx('flex flex-col items-center justify-center gap-5 py-16', className)}>
      <Loader size="lg" />
      <div className="text-center space-y-2">
  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300 animate-pulse">
    {label}
  </p>

  <p className="text-sm text-slate-400">
    Fetching AI market intelligence...
  </p>
</div>
    </div>
  );
}

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "skeleton-shimmer rounded-xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse",
        className
      )}
    />
  );
}
const chartBarHeights = [
  'h-[28%]',
  'h-[42%]',
  'h-[56%]',
  'h-[70%]',
  'h-[84%]',
  'h-[42%]',
  'h-[58%]',
  'h-[72%]',
  'h-[48%]',
  'h-[64%]',
  'h-[78%]',
  'h-[52%]',
];

export function StockDataSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[360px] rounded-[2rem] border border-white/10 bg-slate-950/85 backdrop-blur-xl p-5 shadow-xl">
            <Shimmer className="h-3 w-14" />
            <Shimmer className="h-8 w-28" />
            <Shimmer className="h-3 w-16" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <Shimmer className="h-3 w-20" />
            <Shimmer className="h-4 w-full max-w-[140px]" />
          </div>
        ))}
      </div>

      <div className="h-[360px] rounded-[2rem] border border-white/10 bg-slate-950/85 p-5">
        <div className="flex h-full flex-col justify-end gap-3">
          <div className="mt-auto flex items-end justify-between gap-2 px-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <Shimmer key={index} className={clsx('w-full', chartBarHeights[index])} />
            ))}
          </div>
          <Shimmer className="mx-2 h-px w-[calc(100%-1rem)]" />
        </div>
      </div>
    </div>
  );
}

export function NewsListSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/55 p-4">
          <div className="flex items-start justify-between gap-3">
            <Shimmer className="h-4 w-3/4 max-w-md" />
            <Shimmer className="h-3 w-16 shrink-0" />
          </div>
          <Shimmer className="h-3 w-full" />
          <Shimmer className="h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}

export function SnapshotSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-3 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <Shimmer className="h-3 w-24" />
          <Shimmer className="h-6 w-20" />
        </div>
      ))}
    </div>
  );
}
