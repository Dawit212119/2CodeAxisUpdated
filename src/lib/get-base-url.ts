/**
 * Get the base URL for API calls
 * Works during static generation (build time) and runtime
 */
export function getBaseUrl(): string {
  // During build time on Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Fallback to NEXT_PUBLIC_BASE_URL if set
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  
  // During local development or build time
  // Always return an absolute URL to avoid "Failed to parse URL" errors during static generation
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // During production build (not on Vercel), use localhost as fallback
  // This ensures static generation works, and runtime will use the actual domain
  return 'http://localhost:3000';
}

