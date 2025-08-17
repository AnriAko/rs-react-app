export function parseOffsetPaginationParams(
  fullUrl: string,
  defaultLimit: number
): { limit: number; page: number } {
  const url = new URL(fullUrl);
  const limit = parseInt(url.searchParams.get('limit') || '') || defaultLimit;
  const offset = parseInt(url.searchParams.get('offset') || '') || 0;
  const page = Math.floor(offset / limit) + 1;
  return { limit, page };
}
