/**
 * Get the base URL for API calls
 * Uses absolute URLs when available, falls back to relative URLs
 */
export function getBaseUrl(): string {
  // Priority 1: NEXT_PUBLIC_BASE_URL (explicitly set)
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.trim();
    // Remove trailing slash
    return baseUrl.replace(/\/$/, '');
  }
  
  // Priority 2: VERCEL_URL (automatically provided by Vercel)
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
  
  // Priority 3: Local development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // Fallback: Use relative URLs (works for same-server calls)
  return '';
}

