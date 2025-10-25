'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlusCircle, BarChart3, Leaf, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [markets, setMarkets] = useState<any[]>([])

  // Load markets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('markets')
    if (saved) {
      setMarkets(JSON.parse(saved))
    }
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, {user?.firstName || 'there'}! 👋
        </h1>
        <p className="text-slate-600">
          Manage your markets and analyze climate-aware investment opportunities
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Markets
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{markets.length}</div>
            <p className="text-xs text-slate-500 mt-1">
              {markets.length === 0 ? 'No markets yet' : 'Active markets'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Analyses Run
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">0</div>
            <p className="text-xs text-slate-500 mt-1">
              {markets.length === 0 ? 'Add markets to analyze' : 'Ready to analyze'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Climate Score Avg
            </CardTitle>
            <Leaf className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">—</div>
            <p className="text-xs text-slate-500 mt-1">No data yet</p>
          </CardContent>
        </Card>
      </div>

      {/* Markets Section */}
      {markets.length === 0 ? (
        // Empty State
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <PlusCircle className="w-8 h-8 text-emerald-600" />
            </div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No Markets Yet
            </h3>
            
            <p className="text-slate-600 text-center max-w-md mb-6">
              Get started by adding your first market to analyze. We'll provide comprehensive 
              climate risk assessment and investment insights.
            </p>
            
            <Link href="/dashboard/markets/new">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Your First Market
              </Button>
            </Link>

            <div className="mt-8 flex gap-4 flex-wrap justify-center">
              <Badge variant="outline" className="text-xs">
                FEMA Flood Data
              </Badge>
              <Badge variant="outline" className="text-xs">
                NOAA Climate
              </Badge>
              <Badge variant="outline" className="text-xs">
                Zillow API
              </Badge>
              <Badge variant="outline" className="text-xs">
                GPT-4 Analysis
              </Badge>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Markets List
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Your Markets</h2>
            <Link href="/dashboard/markets/new">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Market
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {markets.map((market) => (
              <Card key={market.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{market.marketName}</CardTitle>
                      <p className="text-sm text-slate-600 mt-1">{market.location}</p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {market.assetClass}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 mb-4">
                    Added {new Date(market.createdAt).toLocaleDateString()}
                  </p>
                  <Link href={`/dashboard/markets/${market.id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎯 Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <div>
                  <p className="font-medium text-slate-900">Add a Market</p>
                  <p className="text-slate-600">Enter location and asset class</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <div>
                  <p className="font-medium text-slate-900">Run Analysis</p>
                  <p className="text-slate-600">AI analyzes 10+ data sources</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <div>
                  <p className="font-medium text-slate-900">Review Insights</p>
                  <p className="text-slate-600">Get climate risks & ROI projections</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📊 What You'll Get</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                Investment recommendation (Buy/Hold/Avoid)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                Climate risk score with 30-year projections
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                Accurate adaptation costs by region
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                FEMA flood zones & insurance estimates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                Property valuations from Zillow API
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5">✓</span>
                Demographic insights & target tenants
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}