import { parseOffsetPaginationParams } from '~/utils/parse-offset-pagination-params';

describe('parseOffsetPaginationParams', () => {
  const defaultLimit = 20;

  test('parses limit and page from full URL with offset', () => {
    const url = 'https://example.com?limit=5&offset=10';
    const result = parseOffsetPaginationParams(url, defaultLimit);
    expect(result.limit).toBe(5);
    expect(result.page).toBe(3);
  });

  test('defaults limit and page if missing', () => {
    const url = 'https://example.com';
    const result = parseOffsetPaginationParams(url, defaultLimit);
    expect(result.limit).toBe(defaultLimit);
    expect(result.page).toBe(1);
  });

  test('handles invalid offset gracefully', () => {
    const url = 'https://example.com?limit=5&offset=abc';
    const result = parseOffsetPaginationParams(url, defaultLimit);
    expect(result.limit).toBe(5);
    expect(result.page).toBe(1);
  });
});
