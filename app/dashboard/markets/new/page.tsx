'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MapPin, Building2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import type { Market, CreateMarketInput } from '@/types'

export default function NewMarketPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CreateMarketInput>({
    marketName: '',
    location: '',
    assetClass: 'commercial'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create new market object
    const newMarket: Market = {
      id: `market_${Date.now()}`,
      userId: 'user_temp', // Will come from Clerk when we add backend
      marketName: formData.marketName,
      location: formData.location,
      assetClass: formData.assetClass,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save to localStorage (temporary until we build backend)
    const existingMarkets = localStorage.getItem('markets')
    const markets = existingMarkets ? JSON.parse(existingMarkets) : []
    markets.push(newMarket)
    localStorage.setItem('markets', JSON.stringify(markets))

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <Link href="/dashboard" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Add New Market
        </h1>
        <p className="text-slate-600">
          Enter market details to begin climate-aware investment analysis
        </p>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>Market Information</CardTitle>
          <CardDescription>
            Provide the location and asset class for your investment market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Market Name */}
            <div className="space-y-2">
              <Label htmlFor="marketName">
                Market Name
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="marketName"
                  placeholder="e.g., Downtown Chicago Commercial"
                  value={formData.marketName}
                  onChange={(e) => setFormData({ ...formData, marketName: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-slate-500">
                Give your market a descriptive name for easy reference
              </p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">
                Location
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="location"
                  placeholder="e.g., Chicago, IL"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-slate-500">
                Enter city and state for accurate climate data analysis
              </p>
            </div>

            {/* Asset Class */}
            <div className="space-y-2">
              <Label>
                Asset Class
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'commercial', label: 'Commercial', emoji: '🏢' },
                  { value: 'industrial', label: 'Industrial', emoji: '🏭' },
                  { value: 'multifamily', label: 'Multifamily', emoji: '🏘️' },
                  { value: 'luxury', label: 'Luxury', emoji: '🏰' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, assetClass: option.value as any })}
                    className={`
                      p-4 rounded-lg border-2 text-left transition-all
                      ${formData.assetClass === option.value
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    <div className="font-medium text-slate-900">{option.label}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                Select the primary asset class for this market
              </p>
            </div>

            {/* What Happens Next */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  What happens next?
                </h3>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    Market saved to your dashboard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    Ready to run AI analysis (coming soon)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    View climate risks and investment insights
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Buttons */}
            <div className="flex gap-3">
              <Link href="/dashboard" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Add Market'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Badge className="bg-emerald-600">Preview Mode</Badge>
          </div>
          <div>
            <p className="text-sm text-emerald-900">
              <strong>Note:</strong> Markets are currently saved locally. Once the backend is built, 
              they'll be stored in the database and synced across devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}