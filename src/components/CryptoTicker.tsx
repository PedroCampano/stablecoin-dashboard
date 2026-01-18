'use client'

import { useEffect, useState } from 'react'

interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
}

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (price >= 1) return `$${price.toFixed(2)}`
  return `$${price.toFixed(4)}`
}

export default function CryptoTicker() {
  const [cryptos, setCryptos] = useState<CryptoPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch('/api/crypto')
        if (response.ok) {
          const data = await response.json()
          setCryptos(data)
        }
      } catch (error) {
        console.error('Failed to fetch crypto prices:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCrypto()
    const interval = setInterval(fetchCrypto, 30000) // Update every 30s
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="w-full bg-cyber-darker border-b border-cyber-border/30 py-2 overflow-hidden">
        <div className="flex items-center gap-8 px-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="skeleton w-8 h-4 rounded" />
              <div className="skeleton w-16 h-4 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Duplicate the list for seamless infinite scroll
  const tickerItems = [...cryptos, ...cryptos]

  return (
    <div className="w-full bg-gradient-to-r from-cyber-darker via-cyber-dark to-cyber-darker border-b border-cyber-accent/20 py-3 overflow-hidden relative">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cyber-darker to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cyber-darker to-transparent z-10" />
      
      {/* Scrolling ticker */}
      <div className="ticker-track flex items-center gap-10 whitespace-nowrap">
        {tickerItems.map((crypto, index) => (
          <div 
            key={`${crypto.id}-${index}`} 
            className="flex items-center gap-2 shrink-0"
          >
            <span className="font-display text-sm font-bold text-white tracking-wider">
              {crypto.symbol.toUpperCase()}
            </span>
            <span className="font-mono text-sm text-gray-300">
              {formatPrice(crypto.current_price)}
            </span>
            <span className={`font-mono text-xs font-medium ${
              crypto.price_change_percentage_24h >= 0 
                ? 'text-cyber-accent' 
                : 'text-cyber-danger'
            }`}>
              {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </span>
            
            {/* Separator dot */}
            <span className="text-cyber-accent/30 ml-4">●</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .ticker-track {
          animation: scroll 40s linear infinite;
        }
        
        .ticker-track:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

