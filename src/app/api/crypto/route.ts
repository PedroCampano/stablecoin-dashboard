import { NextResponse } from 'next/server'

const CRYPTO_IDS = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'solana',
  'ripple',
  'cardano',
  'avalanche-2',
  'polkadot',
  'chainlink',
  'polygon'
]

// Fallback data for when API is unavailable
const FALLBACK_DATA = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 104250, price_change_percentage_24h: 2.45 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3320, price_change_percentage_24h: 1.82 },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 695, price_change_percentage_24h: 0.95 },
  { id: 'solana', symbol: 'sol', name: 'Solana', current_price: 262, price_change_percentage_24h: 4.12 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', current_price: 3.18, price_change_percentage_24h: -1.24 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', current_price: 1.05, price_change_percentage_24h: 2.88 },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', current_price: 38.50, price_change_percentage_24h: 3.21 },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot', current_price: 7.25, price_change_percentage_24h: 1.56 },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', current_price: 22.80, price_change_percentage_24h: 2.10 },
  { id: 'polygon', symbol: 'pol', name: 'Polygon', current_price: 0.48, price_change_percentage_24h: -0.85 },
]

export async function GET() {
  try {
    const ids = CRYPTO_IDS.join(',')
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 30 }
      }
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    })
  } catch (error) {
    console.error('Failed to fetch crypto data, using fallback:', error)
    
    return NextResponse.json(FALLBACK_DATA, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'X-Data-Source': 'fallback'
      }
    })
  }
}

