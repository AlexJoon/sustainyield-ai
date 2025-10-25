import { UserButton } from '@clerk/nextjs'
import { Leaf } from 'lucide-react'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80">
            <Leaf className="w-6 h-6 text-emerald-600" />
            <span className="text-xl font-bold text-slate-900">SustainYield AI</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/markets/new" 
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              Add Market
            </Link>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9"
                }
              }}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}