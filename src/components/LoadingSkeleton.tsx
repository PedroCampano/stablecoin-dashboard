export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="cyber-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="skeleton w-12 h-12 rounded-full" />
            <div className="flex-1">
              <div className="skeleton h-5 w-20 mb-2" />
              <div className="skeleton h-4 w-32" />
            </div>
            <div className="skeleton h-8 w-12" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <div className="skeleton h-3 w-12 mb-2" />
                <div className="skeleton h-8 w-24" />
              </div>
              <div className="text-right">
                <div className="skeleton h-3 w-12 mb-2 ml-auto" />
                <div className="skeleton h-6 w-16" />
              </div>
            </div>
            <div className="skeleton h-2 w-full rounded-full" />
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="skeleton h-3 w-16 mb-2" />
                <div className="skeleton h-5 w-20" />
              </div>
              <div>
                <div className="skeleton h-3 w-16 mb-2" />
                <div className="skeleton h-5 w-20" />
              </div>
              <div>
                <div className="skeleton h-3 w-16 mb-2" />
                <div className="skeleton h-5 w-20" />
              </div>
              <div>
                <div className="skeleton h-3 w-16 mb-2" />
                <div className="skeleton h-5 w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

