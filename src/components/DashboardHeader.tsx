'use client'

interface DashboardHeaderProps {
  totalMarketCap: number
  totalVolume: number
  avgDeviation: number
  lastUpdated: Date | null
  isLoading: boolean
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  return `$${num.toFixed(2)}`
}

export default function DashboardHeader({ 
  totalMarketCap, 
  totalVolume, 
  avgDeviation,
  lastUpdated,
  isLoading 
}: DashboardHeaderProps) {
  return (
    <header className="mb-12">
      <div className="text-center mb-10">
        {/* David's name in handwritten neon style */}
        <div className="mb-2">
          <span className="neon-handwritten text-5xl md:text-7xl neon-buzz">
            Dav
          </span>
          <span className="neon-handwritten text-5xl md:text-7xl neon-flicker">
            i
          </span>
          <span className="neon-handwritten text-5xl md:text-7xl neon-buzz">
            d's
          </span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-black tracking-widest text-white glow-text mb-4">
          STABLECOIN
        </h1>
        <h2 className="font-display text-xl md:text-2xl font-bold tracking-[0.3em] text-cyber-accent glow-text-subtle">
          DASHBOARD
        </h2>
        <p className="mt-4 text-gray-400 font-mono text-sm">
          Real-time peg monitoring & market analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Market Cap */}
        <div className="cyber-card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">Total Market Cap</span>
          </div>
          {isLoading ? (
            <div className="skeleton h-10 w-40 mx-auto" />
          ) : (
            <p className="font-display text-3xl font-bold text-white glow-text-subtle">
              {formatLargeNumber(totalMarketCap)}
            </p>
          )}
        </div>

        {/* 24h Volume */}
        <div className="cyber-card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">24h Volume</span>
          </div>
          {isLoading ? (
            <div className="skeleton h-10 w-40 mx-auto" />
          ) : (
            <p className="font-display text-3xl font-bold text-white glow-text-subtle">
              {formatLargeNumber(totalVolume)}
            </p>
          )}
        </div>

        {/* Average Peg Deviation */}
        <div className="cyber-card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              Math.abs(avgDeviation) < 0.1 ? 'bg-cyber-accent' :
              Math.abs(avgDeviation) < 0.5 ? 'bg-cyber-warning' : 'bg-cyber-danger'
            }`} />
            <span className="text-xs text-gray-500 uppercase tracking-widest">Avg Peg Deviation</span>
          </div>
          {isLoading ? (
            <div className="skeleton h-10 w-32 mx-auto" />
          ) : (
            <p className={`font-display text-3xl font-bold ${
              Math.abs(avgDeviation) < 0.1 ? 'peg-perfect' :
              Math.abs(avgDeviation) < 0.5 ? 'peg-minor' : 'peg-major'
            }`}>
              {avgDeviation >= 0 ? '+' : ''}{avgDeviation.toFixed(4)}%
            </p>
          )}
        </div>
      </div>

      {lastUpdated && (
        <div className="text-center mt-6 text-xs text-gray-500 font-mono">
          Last updated: {lastUpdated.toLocaleTimeString()} • Auto-refresh every 60s
        </div>
      )}
    </header>
  )
}

