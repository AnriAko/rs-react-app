export function parsePaginationParams(
  queryString: string,
  defaultLimit: number,
  defaultPage: number
): { limit: number; page: number } {
  const params = new URLSearchParams(queryString);
  const limit = parseInt(params.get('limit') || '') || defaultLimit;
  const page = parseInt(params.get('page') || '') || defaultPage;
  return { limit, page };
}
