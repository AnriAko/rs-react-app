import type { StringNullable } from '../../../common-types/string-nullable';

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
