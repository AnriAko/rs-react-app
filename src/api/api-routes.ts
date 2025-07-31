export const POKEMON_API_ROUTES = {
  BASE: 'pokemon',
  DETAILS: (id: string) => `${POKEMON_API_ROUTES.BASE}/${id}/`,
  LIST: (query: string = '?limit=10000&offset=0') =>
    `${POKEMON_API_ROUTES.BASE}${query}`,
};
