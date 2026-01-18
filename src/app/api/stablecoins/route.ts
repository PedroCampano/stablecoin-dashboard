import { NextResponse } from 'next/server'

const STABLECOIN_IDS = [
  'tether',
  'usd-coin', 
  'dai',
  'first-digital-usd',
  'ethena-usde',
  'frax',
  'true-usd',
  'paxos-standard',
  'usdd',
  'gemini-dollar',
  'paypal-usd',
  'liquity-usd'
]

// Fallback data for when API is unavailable (dev environment issues, rate limits, etc.)
const FALLBACK_DATA = [
  { id: 'tether', symbol: 'usdt', name: 'Tether', image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png', current_price: 0.9998, market_cap: 142000000000, market_cap_rank: 3, total_volume: 45000000000, price_change_percentage_24h: -0.02, circulating_supply: 142000000000, last_updated: new Date().toISOString() },
  { id: 'usd-coin', symbol: 'usdc', name: 'USDC', image: 'https://assets.coingecko.com/coins/images/6319/large/usdc.png', current_price: 1.0001, market_cap: 45000000000, market_cap_rank: 6, total_volume: 5500000000, price_change_percentage_24h: 0.01, circulating_supply: 45000000000, last_updated: new Date().toISOString() },
  { id: 'dai', symbol: 'dai', name: 'Dai', image: 'https://assets.coingecko.com/coins/images/9956/large/Badge_Dai.png', current_price: 0.9999, market_cap: 5300000000, market_cap_rank: 23, total_volume: 180000000, price_change_percentage_24h: -0.01, circulating_supply: 5300000000, last_updated: new Date().toISOString() },
  { id: 'first-digital-usd', symbol: 'fdusd', name: 'First Digital USD', image: 'https://assets.coingecko.com/coins/images/31079/large/firstdigitalusd.jpeg', current_price: 1.0002, market_cap: 2100000000, market_cap_rank: 40, total_volume: 3800000000, price_change_percentage_24h: 0.02, circulating_supply: 2100000000, last_updated: new Date().toISOString() },
  { id: 'ethena-usde', symbol: 'usde', name: 'Ethena USDe', image: 'https://assets.coingecko.com/coins/images/33613/large/USDE.png', current_price: 1.0003, market_cap: 5500000000, market_cap_rank: 20, total_volume: 120000000, price_change_percentage_24h: 0.03, circulating_supply: 5500000000, last_updated: new Date().toISOString() },
  { id: 'frax', symbol: 'frax', name: 'Frax', image: 'https://assets.coingecko.com/coins/images/13422/large/FRAX_icon.png', current_price: 0.9985, market_cap: 650000000, market_cap_rank: 85, total_volume: 8000000, price_change_percentage_24h: -0.15, circulating_supply: 650000000, last_updated: new Date().toISOString() },
  { id: 'true-usd', symbol: 'tusd', name: 'TrueUSD', image: 'https://assets.coingecko.com/coins/images/3449/large/tusd.png', current_price: 0.9982, market_cap: 495000000, market_cap_rank: 92, total_volume: 45000000, price_change_percentage_24h: -0.18, circulating_supply: 495000000, last_updated: new Date().toISOString() },
  { id: 'paxos-standard', symbol: 'usdp', name: 'Pax Dollar', image: 'https://assets.coingecko.com/coins/images/6013/large/Pax_Dollar.png', current_price: 1.0001, market_cap: 145000000, market_cap_rank: 180, total_volume: 12000000, price_change_percentage_24h: 0.01, circulating_supply: 145000000, last_updated: new Date().toISOString() },
  { id: 'usdd', symbol: 'usdd', name: 'USDD', image: 'https://assets.coingecko.com/coins/images/25380/large/USDD.jpg', current_price: 0.9975, market_cap: 730000000, market_cap_rank: 75, total_volume: 35000000, price_change_percentage_24h: -0.25, circulating_supply: 730000000, last_updated: new Date().toISOString() },
  { id: 'gemini-dollar', symbol: 'gusd', name: 'Gemini Dollar', image: 'https://assets.coingecko.com/coins/images/5992/large/gemini-dollar-gusd.png', current_price: 1.0000, market_cap: 95000000, market_cap_rank: 220, total_volume: 3500000, price_change_percentage_24h: 0.00, circulating_supply: 95000000, last_updated: new Date().toISOString() },
  { id: 'paypal-usd', symbol: 'pyusd', name: 'PayPal USD', image: 'https://assets.coingecko.com/coins/images/31212/large/PYUSD_Logo_%282%29.png', current_price: 0.9999, market_cap: 800000000, market_cap_rank: 70, total_volume: 45000000, price_change_percentage_24h: -0.01, circulating_supply: 800000000, last_updated: new Date().toISOString() },
  { id: 'liquity-usd', symbol: 'lusd', name: 'Liquity USD', image: 'https://assets.coingecko.com/coins/images/14666/large/Group_3.png', current_price: 1.0012, market_cap: 85000000, market_cap_rank: 250, total_volume: 2000000, price_change_percentage_24h: 0.12, circulating_supply: 85000000, last_updated: new Date().toISOString() },
]

export async function GET() {
  try {
    const ids = STABLECOIN_IDS.join(',')
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 } // Cache for 60 seconds
      }
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    })
  } catch (error) {
    console.error('Failed to fetch stablecoin data, using fallback:', error)
    
    // Return fallback data when API is unavailable
    return NextResponse.json(FALLBACK_DATA, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'X-Data-Source': 'fallback'
      }
    })
  }
}

