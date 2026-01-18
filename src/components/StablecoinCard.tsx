'use client'

import Image from 'next/image'
import { StablecoinWithPeg } from '@/types/stablecoin'

interface StablecoinCardProps {
  coin: StablecoinWithPeg
  index: number
}

function formatNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
  return `$${num.toFixed(2)}`
}

function formatSupply(num: number): string {
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
  return num.toFixed(2)
}

export default function StablecoinCard({ coin, index }: StablecoinCardProps) {
  const pegClass = 
    coin.pegStatus === 'perfect' ? 'peg-perfect' : 
    coin.pegStatus === 'minor' ? 'peg-minor' : 'peg-major'
  
  const deviationSign = coin.pegDeviation >= 0 ? '+' : ''
  
  return (
    <div 
      className="cyber-card p-6 hover-lift"
      style={{ 
        animationDelay: `${index * 50}ms`,
        animation: 'fadeIn 0.5s ease forwards',
        opacity: 0
      }}
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-cyber-muted flex items-center justify-center">
          <Image
            src={coin.image}
            alt={coin.name}
            width={48}
            height={48}
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold text-white tracking-wider">
            {coin.symbol.toUpperCase()}
          </h3>
          <p className="text-sm text-gray-400 truncate">{coin.name}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500">RANK</span>
          <p className="font-display text-cyber-accent font-bold">#{coin.market_cap_rank}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Price and Peg */}
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Price</span>
            <p className={`font-mono text-2xl font-bold ${pegClass}`}>
              ${coin.current_price.toFixed(4)}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Peg Δ</span>
            <p className={`font-mono text-lg font-semibold ${pegClass}`}>
              {deviationSign}{coin.pegDeviation.toFixed(3)}%
            </p>
          </div>
        </div>

        {/* Peg Health Bar */}
        <div className="relative h-2 bg-cyber-darker rounded-full overflow-hidden">
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30"
          />
          <div 
            className={`absolute top-0 bottom-0 rounded-full transition-all duration-500 ${
              coin.pegStatus === 'perfect' ? 'bg-cyber-accent' : 
              coin.pegStatus === 'minor' ? 'bg-cyber-warning' : 'bg-cyber-danger'
            }`}
            style={{
              left: `${Math.max(0, Math.min(100, 50 + coin.pegDeviation * 50))}%`,
              width: '8px',
              marginLeft: '-4px',
              boxShadow: `0 0 10px ${
                coin.pegStatus === 'perfect' ? 'var(--cyber-accent)' : 
                coin.pegStatus === 'minor' ? 'var(--cyber-warning)' : 'var(--cyber-danger)'
              }`
            }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-cyber-border/30">
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Market Cap</span>
            <p className="font-mono text-white">{formatNumber(coin.market_cap)}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">24h Volume</span>
            <p className="font-mono text-white">{formatNumber(coin.total_volume)}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Supply</span>
            <p className="font-mono text-white">{formatSupply(coin.circulating_supply)}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">24h Change</span>
            <p className={`font-mono ${coin.price_change_percentage_24h >= 0 ? 'text-cyber-accent' : 'text-cyber-danger'}`}>
              {coin.price_change_percentage_24h >= 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2) || '0.00'}%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

