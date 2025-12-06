/**
 * Get the base URL for API calls
 * Since we're using SSR (force-dynamic), we can use relative URLs during runtime
 * Only need absolute URLs during build time for static generation
 */
export function getBaseUrl(): string {
  // During build time (static generation), we need absolute URLs
  // Check if we're in a build context
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build' || 
                      process.env.NEXT_PHASE === 'phase-production-compile';
  
  if (isBuildTime) {
    // During build time on Vercel
    if (process.env.VERCEL_URL) {
      let vercelUrl = process.env.VERCEL_URL.trim();
      // Remove trailing slash
      vercelUrl = vercelUrl.replace(/\/$/, '');
      // If it already includes https://, use it as is, otherwise add it
      if (vercelUrl.startsWith('https://') || vercelUrl.startsWith('http://')) {
        return vercelUrl;
      }
      return `https://${vercelUrl}`;
    }
    
    // Fallback to NEXT_PUBLIC_BASE_URL if set
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL.trim();
      // Remove trailing slash
      return baseUrl.replace(/\/$/, '');
    }
    
    // During local build
    return 'http://localhost:3000';
  }
  
  // During SSR (runtime), use relative URLs for same-server API calls
  // This works correctly on Vercel since we're on the same server
  return '';
}

