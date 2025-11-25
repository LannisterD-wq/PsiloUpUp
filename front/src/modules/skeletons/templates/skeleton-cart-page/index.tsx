import React from "react"

const SkeletonCartPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-8 py-8">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-48 mb-8"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartPage