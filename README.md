# SustainYield AI

Climate-aware real estate investment intelligence platform powered by AI.

> AI-powered platform combining real-time market data, 30-year climate projections, and GPT-4 analysis to help investors make data-driven real estate decisions.

## Features

- **Real-Time Market Data** - Live property valuations from Zillow API
- **Climate Risk Assessment** - FEMA flood zones, NOAA projections, heat stress analysis
- **AI-Powered Analysis** - GPT-4 investment recommendations with ROI projections
- **Accurate Cost Calculations** - Regional construction costs using RSMeans data
- **Insurance Estimates** - NFIP premium calculations based on FEMA zones
- **Interactive Maps** - Visualize climate risks and property locations

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Leaflet Maps
- Recharts

**Backend** *(coming soon)*
- FastAPI (Python)
- PostgreSQL
- Redis
- OpenAI GPT-4

**Data Sources**
- NOAA Climate Data
- FEMA Flood Maps
- Zillow Property API
- Open-Meteo
- OpenStreetMap
- RSMeans Cost Data
- US Census Bureau

## Getting Started
```bash
# Clone the repository
git clone https://github.com/AlexJoon/sustainyield-ai.git
cd sustainyield-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
sustainyield-ai/
├── app/                 # Next.js pages
│   ├── (auth)/         # Auth pages
│   ├── (dashboard)/    # Dashboard
│   └── page.tsx        # Landing page
├── components/         # React components
├── lib/               # Utilities
├── types/             # TypeScript types
└── .env.local         # Environment variables
```

## 🧪 Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production
npm run lint     # Lint code
```

## License

MIT

## Author

**Alex Joon**

- GitHub: [@AlexJoon](https://github.com/AlexJoon)
- Project: [SustainYield AI](https://github.com/AlexJoon/sustainyield-ai)