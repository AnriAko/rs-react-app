'use client';

import { useState, useCallback, useMemo } from 'react';
import { PokemonSelectContext, Pokemon } from './pokemon-select-context';

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
    () => ({ selected, togglePokemon, clearAll, getSelectedArray }),
    [selected, togglePokemon, clearAll, getSelectedArray]
  );

  return (
    <PokemonSelectContext.Provider value={contextValue}>
      {children}
    </PokemonSelectContext.Provider>
  );
}
