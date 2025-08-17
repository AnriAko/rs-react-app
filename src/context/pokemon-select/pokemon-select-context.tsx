'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

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

const defaultValue: PokemonSelectContextType = {
  selected: {},
  togglePokemon: () => {},
  clearAll: () => {},
  getSelectedArray: () => [],
};

export const PokemonSelectContext =
  createContext<PokemonSelectContextType>(defaultValue);

export const usePokemonSelect = (): PokemonSelectContextType => {
  const ctx = useContext(PokemonSelectContext);
  if (!ctx)
    throw new Error('usePokemonSelect must be used within PokemonsProvider');
  return ctx;
};

export function PokemonsProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Record<string, Pokemon>>({});

  const togglePokemon = useCallback((pokemon: Pokemon) => {
    setSelected((prev) => {
      const isSelected = !!prev[pokemon.id];
      if (isSelected) {
        const copy = { ...prev };
        delete copy[pokemon.id];
        return copy;
      }
      return { ...prev, [pokemon.id]: pokemon };
    });
  }, []);

  const clearAll = useCallback(() => setSelected({}), []);

  const getSelectedArray = useCallback(
    () => Object.values(selected),
    [selected]
  );

  const contextValue = useMemo(
    () => ({
      selected,
      togglePokemon,
      clearAll,
      getSelectedArray,
    }),
    [selected, togglePokemon, clearAll, getSelectedArray]
  );

  return (
    <PokemonSelectContext.Provider value={contextValue}>
      {children}
    </PokemonSelectContext.Provider>
  );
}
