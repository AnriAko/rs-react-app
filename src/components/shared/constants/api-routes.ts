export const POKEMON_API_ROUTES = {
  BASE: 'pokemon',
  DETAILS: (id: string) => `pokemon/${id}/`,
  LIST: (query: string = '?limit=10000&offset=0') => `pokemon${query}`,
};
