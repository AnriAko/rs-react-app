import { describe, test, expect } from 'vitest';
import { api } from '../../axios';

describe('axios instance', () => {
  test('should have correct baseURL and headers', () => {
    expect(api.defaults.baseURL).toBe(
      import.meta.env.VITE_API_URL || 'https://pokeapi.co/api/v2/'
    );
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });
});
