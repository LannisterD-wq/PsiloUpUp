import React from "react"

const SkeletonOrderConfirmed: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded-full mb-6"></div>
      <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-56 mb-8"></div>
      
      <div className="w-full max-w-2xl">
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>
          <div className="h-px bg-gray-200 my-4"></div>
          <div className="flex justify-between">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            <div className="h-5 bg-gray-200 rounded w-28"></div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="h-12 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonOrderConfirmed