'use client'

import { useEffect, useState, useCallback } from 'react'
import { Stablecoin, StablecoinWithPeg, calculatePegStatus } from '@/types/stablecoin'
import CryptoTicker from '@/components/CryptoTicker'
import DashboardHeader from '@/components/DashboardHeader'
import StablecoinCard from '@/components/StablecoinCard'
import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function Home() {
  const [stablecoins, setStablecoins] = useState<StablecoinWithPeg[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStablecoins = useCallback(async () => {
    try {
      const response = await fetch('/api/stablecoins')
      
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      
      const data: Stablecoin[] = await response.json()
      
      const coinsWithPeg: StablecoinWithPeg[] = data.map(coin => {
        const { deviation, status } = calculatePegStatus(coin.current_price)
        return {
          ...coin,
          pegDeviation: deviation,
          pegStatus: status
        }
      })
      
      setStablecoins(coinsWithPeg)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError('Failed to load stablecoin data. Please try again later.')
      console.error('Fetch error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStablecoins()
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchStablecoins, 60000)
    
    return () => clearInterval(interval)
  }, [fetchStablecoins])

  // Calculate totals
  const totalMarketCap = stablecoins.reduce((sum, coin) => sum + coin.market_cap, 0)
  const totalVolume = stablecoins.reduce((sum, coin) => sum + coin.total_volume, 0)
  const avgDeviation = stablecoins.length > 0
    ? stablecoins.reduce((sum, coin) => sum + coin.pegDeviation, 0) / stablecoins.length
    : 0

  return (
    <>
      <CryptoTicker />
      <main className="min-h-screen px-4 py-12 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
        <DashboardHeader
          totalMarketCap={totalMarketCap}
          totalVolume={totalVolume}
          avgDeviation={avgDeviation}
          lastUpdated={lastUpdated}
          isLoading={isLoading}
        />

        {error && (
          <div className="cyber-card p-6 mb-8 border-cyber-danger/50 text-center">
            <p className="text-cyber-danger font-mono">{error}</p>
            <button
              onClick={fetchStablecoins}
              className="mt-4 px-6 py-2 bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/50 rounded-lg hover:bg-cyber-accent/30 transition-colors font-mono text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stablecoins.map((coin, index) => (
              <StablecoinCard key={coin.id} coin={coin} index={index} />
            ))}
          </div>
        )}

        <footer className="mt-16 text-center text-gray-500 font-mono text-xs">
          <p>Data provided by CoinGecko API • Not financial advice</p>
          <p className="mt-2 text-cyber-accent/50">
            Built with Next.js & Tailwind CSS
          </p>
        </footer>
        </div>
      </main>
    </>
  )
}

