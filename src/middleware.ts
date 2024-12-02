import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  // Simply pass through the request without modification
  return NextResponse.next();
}

// Correct configuration for middleware
export const config = {
  matcher: '/:path*', // Matches all routes
};
