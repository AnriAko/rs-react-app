export interface GetPokemons {
  count: number;
  next: string;
  previous: string | null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}
