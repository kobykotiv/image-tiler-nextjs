import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimiter } from '@/lib/rateLimiter'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || 'anonymous'
    
    if (!rateLimiter.canMakeRequest(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait 1 second.' },
        { status: 429 }
      )
    }
  }
}

export const config = {
  matcher: '/api/:path*',
}
