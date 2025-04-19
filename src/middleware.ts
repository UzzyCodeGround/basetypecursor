import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Example middleware logic
  return NextResponse.next();
}
