import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';


export function middleware(req: NextRequest, event: NextFetchEvent) {
  let response = req.method === "OPTIONS" ? new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  }) : NextResponse.next();


  if (req.method !== "OPTIONS") {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  return response;
}


const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};