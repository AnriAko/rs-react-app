const API_URL = 'https://pokeapi.co/api/v2';

export const POKEMON_API_ROUTES = {
  LIST: (offset = 0, limit = 20) =>
    `${API_URL}/pokemon?offset=${offset}&limit=${limit}`,
  DETAILS: (id: string) => `${API_URL}/pokemon/${id}`,
};
