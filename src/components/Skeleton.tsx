import { cn } from "../lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-theme-secondary/10 rounded-sm",
        className
      )}
    />
  );
}

export function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Header Skeleton */}
      <div className="relative h-[70vh] lg:h-[85vh] w-full bg-theme-secondary/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-theme-primary to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-24 max-w-7xl mx-auto">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-4 w-24 mb-6" />
          <Skeleton className="h-16 lg:h-24 w-full max-w-2xl mb-8" />
          <div className="flex gap-8">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-4xl mx-auto px-8 lg:px-0 py-24 space-y-12">
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-sm" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
