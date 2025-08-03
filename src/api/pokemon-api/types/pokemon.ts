import { NullableString } from 'types/nullable-string';
import { NamedApiResource } from './pokemon-details';

export type GetPokemons = {
  count: number;
  next: NullableString;
  previous: NullableString;
  results: Pokemon[];
};

export type Pokemon = NamedApiResource;
