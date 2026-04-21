// Skeleton loading components for content pages

export function LessonSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 animate-pulse">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-48 bg-muted rounded" />
        </div>

        {/* Header skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-20 bg-muted rounded-full" />
            <div className="h-5 w-24 bg-muted rounded-full" />
          </div>
          <div className="h-10 w-3/4 bg-muted rounded mb-3" />
          <div className="h-5 w-full bg-muted rounded mb-2" />
          <div className="h-5 w-2/3 bg-muted rounded mb-4" />
          <div className="flex gap-4 mb-3">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-muted rounded-full" />
            <div className="h-6 w-20 bg-muted rounded-full" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-1/2 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-32 w-full bg-muted rounded-lg mt-6" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-6 w-2/5 bg-muted rounded mt-6" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-4/5 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function QuizSkeleton() {
  return (
    <div className="mt-10 rounded-lg border overflow-hidden animate-pulse">
      <div className="p-4 bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-muted rounded" />
          <div>
            <div className="h-5 w-40 bg-muted rounded mb-1" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlaygroundSkeleton() {
  return (
    <div className="my-8 rounded-xl border bg-[#1a1b26] overflow-hidden animate-pulse">
      <div className="px-4 py-3 bg-[#1e1e2e] border-b">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/30" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/30" />
            <div className="h-3 w-3 rounded-full bg-green-500/30" />
          </div>
          <div className="h-4 w-20 bg-[#313244] rounded ml-2" />
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="h-4 w-full bg-[#313244] rounded" />
        <div className="h-4 w-3/4 bg-[#313244] rounded" />
        <div className="h-4 w-5/6 bg-[#313244] rounded" />
        <div className="h-4 w-2/3 bg-[#313244] rounded" />
      </div>
    </div>
  );
}
