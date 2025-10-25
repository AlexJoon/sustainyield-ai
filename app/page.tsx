'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Leaf, 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowRight, 
  CheckCircle2,
  BarChart3,
  DollarSign,
  Home as HomeIcon,
  MapPin,
  Waves
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-600" />
            <span className="text-xl font-bold text-slate-900">SustainYield AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 text-sm">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 text-sm">
              How It Works
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0 text-sm px-4 py-1">
                <Leaf className="w-3 h-3 mr-2" />
                Climate-Aware Real Estate Intelligence
              </Badge>
              
              <h1 className="text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
                Invest Smarter with
                <span className="text-emerald-600"> Climate Intelligence</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                AI-powered platform combining real-time market data, 30-year climate projections, 
                and GPT-4 analysis to help you make data-driven real estate investment decisions
              </p>

              <div className="flex gap-4 justify-center items-center">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-slate-300">
                  <BarChart3 className="mr-2 w-4 h-4" />
                  View Demo
                </Button>
              </div>

              <p className="text-sm text-slate-500 mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: '10+', label: 'Data Sources' },
                { value: '30yr', label: 'Climate Projections' },
                { value: '< 2min', label: 'Analysis Time' },
                { value: '95%', label: 'Accuracy Rate' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-slate-100 text-slate-800 border-0">
                Features
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Everything You Need for Climate-Smart Investing
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive analysis powered by real-time data and AI
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <TrendingUp className="w-10 h-10 text-emerald-600" />,
                  title: 'Real-Time Market Data',
                  description: 'Live property valuations from Zillow API with price trends, comparables, and price-per-sqft analysis'
                },
                {
                  icon: <Shield className="w-10 h-10 text-blue-600" />,
                  title: 'Climate Risk Assessment',
                  description: 'FEMA flood zones, NOAA sea level projections, and heat stress analysis from Open-Meteo'
                },
                {
                  icon: <Zap className="w-10 h-10 text-amber-600" />,
                  title: 'GPT-4 Analysis',
                  description: 'AI-powered investment recommendations with ROI projections and adaptation strategies'
                },
                {
                  icon: <DollarSign className="w-10 h-10 text-green-600" />,
                  title: 'Cost Calculations',
                  description: 'Accurate adaptation costs using RSMeans construction data with regional multipliers'
                },
                {
                  icon: <Waves className="w-10 h-10 text-cyan-600" />,
                  title: 'Flood Insurance Estimates',
                  description: 'NFIP premium calculations based on actual FEMA flood zones and base flood elevations'
                },
                {
                  icon: <MapPin className="w-10 h-10 text-rose-600" />,
                  title: 'Interactive Maps',
                  description: 'Visualize climate risks, property locations, and nearby infrastructure on dynamic maps'
                }
              ].map((feature, idx) => (
                <Card key={idx} className="border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-0">
                How It Works
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Get Investment Intelligence in 3 Simple Steps
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Add a Market',
                  description: 'Enter a location and asset class (commercial, multifamily, luxury, or industrial)',
                  icon: <HomeIcon className="w-8 h-8" /> 
                },
                {
                  step: '2',
                  title: 'Run Analysis',
                  description: 'Our AI gathers data from 10+ sources and generates a comprehensive investment report in under 2 minutes',
                  icon: <BarChart3 className="w-8 h-8" />
                },
                {
                  step: '3',
                  title: 'Make Decisions',
                  description: 'Review climate risks, adaptation costs, ROI projections, and get AI-powered recommendations',
                  icon: <CheckCircle2 className="w-8 h-8" />
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    {item.step}
                  </div>
                  <div className="mb-4 flex justify-center text-emerald-600">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Card className="border-emerald-200 bg-emerald-50/50 max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-900 text-center">
                  Powered by Trusted Data Sources
                </CardTitle>
                <CardDescription className="text-center text-emerald-700">
                  We aggregate data from government agencies, research institutions, and industry leaders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    'NOAA Climate Data',
                    'FEMA Flood Maps',
                    'Zillow Property API',
                    'Open-Meteo Weather',
                    'OpenStreetMap',
                    'RSMeans Cost Data',
                    'US Census Bureau',
                    'Tavily Research'
                  ].map((source) => (
                    <div key={source} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm text-slate-700 font-medium">{source}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make Smarter Investments?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join investors who are using climate intelligence to protect and grow their portfolios
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 px-8">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-emerald-100 text-sm mt-4">
              14-day free trial • No credit card required • Full access to all features
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}