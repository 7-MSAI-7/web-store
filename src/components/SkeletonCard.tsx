'use client'

export default function SkeletonCard() {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden p-6 border">
      <div className="aspect-[3/4] relative bg-gray-200 rounded-md animate-pulse"></div>
      <div className="mt-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
    </div>
  )
} 