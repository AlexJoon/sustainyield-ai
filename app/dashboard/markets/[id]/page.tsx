'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  AlertTriangle, 
  TrendingUp, 
  Trash2,
  Loader2,
  Waves,
  Thermometer,
  CloudRain,
  DollarSign,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import type { Market } from '@/types'

export default function MarketDetailPage() {
  const router = useRouter()
  const params = useParams()
  const marketId = params.id as string
  
  const [market, setMarket] = useState<Market | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load market from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('markets')
    if (saved) {
      const markets: Market[] = JSON.parse(saved)
      const found = markets.find(m => m.id === marketId)
      setMarket(found || null)
    }
    setIsLoading(false)
  }, [marketId])

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this market?')) return
    
    setIsDeleting(true)
    
    // Remove from localStorage
    const saved = localStorage.getItem('markets')
    if (saved) {
      const markets: Market[] = JSON.parse(saved)
      const filtered = markets.filter(m => m.id !== marketId)
      localStorage.setItem('markets', JSON.stringify(filtered))
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    router.push('/dashboard')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    )
  }

  if (!market) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <AlertTriangle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Market Not Found</h2>
        <p className="text-slate-600 mb-6">This market doesn't exist or has been deleted.</p>
        <Link href="/dashboard">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900">
              {market.marketName}
            </h1>
            <Badge variant="outline" className="capitalize">
              {market.assetClass}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>{market.location}</span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Added {new Date(market.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-red-200 text-red-600 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Market
              </>
            )}
          </Button>
        </div>
      </div>

      {/* No Analysis Yet - Call to Action */}
      <Card className="border-dashed border-2 mb-8">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No Analysis Yet
          </h3>
          
          <p className="text-slate-600 text-center max-w-md mb-6">
            Run AI analysis to get comprehensive climate risk assessment, investment recommendations, 
            and ROI projections for this market.
          </p>
          
          <Button className="bg-emerald-600 hover:bg-emerald-700" disabled>
            <BarChart3 className="w-4 h-4 mr-2" />
            Run Analysis (Coming Soon)
          </Button>

          <p className="text-xs text-slate-500 mt-4">
            Analysis will be available once the backend API is connected
          </p>
        </CardContent>
      </Card>

      {/* Mock Preview - What Analysis Will Look Like */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-slate-900">Preview: What You'll Get</h2>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Mock Data
          </Badge>
        </div>
        <p className="text-slate-600 mb-6">
          Here's a preview of the analysis results you'll receive once the backend is built
        </p>
      </div>

      {/* Mock Analysis Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Investment Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">BUY</span>
            </div>
            <p className="text-xs text-slate-500">Strong opportunity with manageable risks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Climate Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span className="text-2xl font-bold text-slate-900">42/100</span>
            </div>
            <p className="text-xs text-slate-500">Moderate risk level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              Target ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-slate-900">8-12%</span>
            </div>
            <p className="text-xs text-slate-500">10-year projection</p>
          </CardContent>
        </Card>
      </div>

      {/* Mock Climate Risks */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Climate Risk Assessment</CardTitle>
          <CardDescription>30-year projections based on NOAA and FEMA data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Flood Risk */}
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Waves className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-slate-900">Flood Risk</h4>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                    Moderate
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Current: Zone X (minimal risk) • 2050: Zone AE (high risk)
                </p>
                <p className="text-xs text-slate-500">
                  Estimated adaptation cost: $45,000 - $80,000
                </p>
              </div>
            </div>

            {/* Heat Stress */}
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Thermometer className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-slate-900">Heat Stress</h4>
                  <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                    High
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Current: 15 days/year over 95°F • 2050: 45 days/year over 95°F
                </p>
                <p className="text-xs text-slate-500">
                  Increased cooling costs: +$12,000/year estimated
                </p>
              </div>
            </div>

            {/* Sea Level Rise */}
            <div className="flex items-start gap-4 p-4 bg-cyan-50 rounded-lg">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CloudRain className="w-5 h-5 text-cyan-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-slate-900">Sea Level Rise</h4>
                  <Badge variant="outline" className="bg-cyan-100 text-cyan-700 border-cyan-200">
                    Low
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">
                  Current: 12ft above sea level • 2050: +1.5ft projected rise
                </p>
                <p className="text-xs text-slate-500">
                  Property remains above risk threshold
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mock Investment Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Insights</CardTitle>
          <CardDescription>AI-generated recommendations based on comprehensive analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Key Strengths</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  Strong demographic growth (+8% population increase projected)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  High median income area ($85,000, 78th percentile)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  Manageable climate adaptation costs relative to property value
                </li>
              </ul>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Risks to Consider</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  Flood insurance premiums may increase 15-25% by 2030
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  Heat mitigation upgrades required within 5 years
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">⚠</span>
                  Property values in flood zones may face downward pressure
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-900">
              <strong>Note:</strong> This is mock data for demonstration purposes. Real analysis 
              will be generated when you run the AI analysis after the backend is connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}