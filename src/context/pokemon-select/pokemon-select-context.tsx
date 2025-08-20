'use client';

import { createContext, useContext } from 'react';

export type Pokemon = {
  id: string;
  name: string;
  url: string;
};

export type PokemonSelectContextType = {
  selected: Record<string, Pokemon>;
  togglePokemon: (pokemon: Pokemon) => void;
  clearAll: () => void;
  getSelectedArray: () => Pokemon[];
};

export const PokemonSelectContext = createContext<
  PokemonSelectContextType | undefined
>(undefined);

export const usePokemonSelect = (): PokemonSelectContextType => {
  const ctx = useContext(PokemonSelectContext);
  if (!ctx) {
    throw new Error('usePokemonSelect must be used within PokemonsProvider');
  }
  return ctx;
};
