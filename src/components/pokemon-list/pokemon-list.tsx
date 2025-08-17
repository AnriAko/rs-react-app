import cl from 'classnames';
import { PokemonCard } from '~/components/pokemon-card';
import type { Pokemon } from '~/lib/api/pokemon/types/get-pokemons';
import { Theme, theme } from '~/context/theme/theme-context';

type Props = {
  result: Pokemon[];
  theme: theme;
};

export const PokemonList = ({ result, theme }: Props) => {
  return (
    <div
      className={cl('grid grid-cols-2 md:grid-cols-3 gap-6', {
        'bg-white': theme === Theme.light,
        'bg-gray-900': theme === Theme.dark,
      })}
    >
      {result.map((p) => {
        const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
        const id = idMatch ? idMatch[1] : null;
        if (!id) return null;

        return <PokemonCard key={p.name} name={p.name} id={id} theme={theme} />;
      })}
    </div>
  );
};
