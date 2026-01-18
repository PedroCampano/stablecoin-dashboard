# Stablecoin Dashboard

A real-time stablecoin monitoring dashboard built with Next.js and Tailwind CSS. Track prices, market caps, and peg deviations for major stablecoins.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Stablecoin+Dashboard)

## Features

- **Real-time Monitoring**: Auto-refreshes every 60 seconds
- **Peg Deviation Tracking**: Visual indicators for price deviations from $1
- **Market Overview**: Total market cap and 24h volume across all stablecoins
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Cyberpunk Aesthetic**: Dark theme with neon accents

## Stablecoins Tracked

- Tether (USDT)
- USD Coin (USDC)
- DAI
- First Digital USD (FDUSD)
- Ethena USDe
- Frax (FRAX)
- TrueUSD (TUSD)
- Pax Dollar (USDP)
- USDD
- Gemini Dollar (GUSD)
- PayPal USD (PYUSD)
- Liquity USD (LUSD)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd stablecoin-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Run deployment:
   ```bash
   vercel
   ```

3. Follow the prompts to complete deployment.

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Vercel will automatically detect Next.js and configure the build settings.

## API

This dashboard uses the [CoinGecko API](https://www.coingecko.com/en/api) (free tier) to fetch stablecoin data. No API key is required for basic usage, but rate limits apply.

### API Route

- `GET /api/stablecoins` - Returns current stablecoin market data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Data Source**: CoinGecko API
- **Deployment**: Vercel

## License

MIT License - feel free to use this project for any purpose.

## Disclaimer

This dashboard is for informational purposes only. It is not financial advice. Always do your own research before making investment decisions.

