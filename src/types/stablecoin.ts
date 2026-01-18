export interface Stablecoin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  price_change_percentage_24h: number
  circulating_supply: number
  last_updated: string
}

export interface StablecoinWithPeg extends Stablecoin {
  pegDeviation: number
  pegStatus: 'perfect' | 'minor' | 'major'
}

export function calculatePegStatus(price: number): { deviation: number; status: 'perfect' | 'minor' | 'major' } {
  const deviation = ((price - 1) * 100)
  const absDeviation = Math.abs(deviation)
  
  let status: 'perfect' | 'minor' | 'major'
  if (absDeviation < 0.1) {
    status = 'perfect'
  } else if (absDeviation < 0.5) {
    status = 'minor'
  } else {
    status = 'major'
  }
  
  return { deviation, status }
}

