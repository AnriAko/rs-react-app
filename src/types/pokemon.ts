import type { StringNullable } from './string-nullable';

export type GetPokemons = {
  count: number;
  next: StringNullable;
  previous: StringNullable;
  results: Pokemon[];
};

export type Pokemon = {
  name: string;
  url: string;
};
