export default function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-36 sm:w-44 rounded-xl overflow-hidden bg-surface">
      <div className="aspect-[2/3] skeleton" />
      <div className="p-2 space-y-1.5">
        <div className="h-3 skeleton rounded w-4/5" />
        <div className="h-2.5 skeleton rounded w-2/5" />
      </div>
    </div>
  )
}
