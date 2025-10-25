// ============================================
// CORE ENTITY TYPES
// ============================================

/**
 * Market - Represents a real estate market that a user wants to analyze
 */
export interface Market {
  id: string
  userId: string
  marketName: string
  location: string
  assetClass: 'commercial' | 'industrial' | 'multifamily' | 'luxury'
  createdAt: string
  updatedAt: string
}

/**
 * Input for creating a new market
 */
export interface CreateMarketInput {
  marketName: string
  location: string
  assetClass: 'commercial' | 'industrial' | 'multifamily' | 'luxury'
}

// ============================================
// ANALYSIS TYPES
// ============================================

/**
 * Complete analysis result from AI
 */
export interface Analysis {
  id: string
  marketId: string
  investmentRecommendation: 'strong_buy' | 'buy' | 'hold' | 'avoid'
  investmentHorizon: 'short' | 'medium' | 'long'
  climateRiskScore: number
  sustainabilityScore: number
  
  targetReturn: {
    min: number
    max: number
    timeline: string
  }
  
  capitalRequired: {
    acquisition: number
    climateAdaptation: number
    ongoing: number
  }
  
  physicalRisks: {
    flood: { current: string; '2050': string; financialImpact: string }
    heat: { current: string; '2050': string; financialImpact: string }
    sealevel: { current: string; '2050': string; financialImpact: string }
  }
  
  propertyInsights?: {
    avgBuildingAge: string
    greenBuildingPenetration: string
    retrofitOpportunities: string
  }
  
  demographicInsights?: {
    medianIncome: number
    workingClass: string
    incomePercentile: number
    priceToIncomeRatio: number
    affordabilityIndex: number
    targetTenant: string
  }
  
  marketCondition: 'buyers' | 'sellers' | 'balanced'
  priceTrend: {
    direction: 'up' | 'down' | 'flat'
    confidence: number
  }
  
  dealBreakers: string[]
  competitiveAdvantages: string[]
  sources: Array<{ title: string; url: string }>
  summary: string
  createdAt: string
}

// ============================================
// RAW DATA TYPES (from external APIs)
// ============================================

export interface Coordinates {
  lat: number
  lon: number
}

export interface RawData {
  coordinates: Coordinates
  climateData?: any
  floodRisk?: any
  seaLevelRisk?: any
  heatIsland?: any
  buildingData?: any
  sources?: Array<{ title: string; url: string }>
}

// ============================================
// CHAT TYPES
// ============================================

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean
  data: T
  cached?: boolean
  rawData?: RawData
}

export interface ApiError {
  success: false
  error: string
  details?: string
}