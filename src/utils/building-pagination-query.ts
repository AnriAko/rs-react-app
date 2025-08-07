export function buildPaginationQuery(limit: number, page: number) {
  const offset = limit * (page - 1);
  return `?limit=${limit}&offset=${offset}`;
}
