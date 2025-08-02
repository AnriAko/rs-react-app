import { useNavigate, useLocation } from 'react-router';
import { PokemonCard } from '@components/pokemon-card';
import type { Pokemon } from '@api/pokemon-api/types/pokemon';
import cl from 'classnames';
import './pokemon-list.styles.css';

type PokemonListProps = {
  result: Pokemon[];
  theme: 'light' | 'dark';
};

export const PokemonList = ({ result, theme }: PokemonListProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (id: string) => {
    const params = new URLSearchParams(location.search);
    params.set('details', id);
    navigate({ search: params.toString() });
  };

  return (
    <div
      className={cl('flex gap-6 mt-6 mb-3', {
        'text-gray-900': theme === 'light',
        'text-white': theme === 'dark',
      })}
      style={{ minHeight: '50vh' }}
    >
      <div
        className={cl(
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto thin-scrollbar',
          {
            'bg-white': theme === 'light',
            'bg-gray-900': theme === 'dark',
          }
        )}
        style={{ flex: 1, maxHeight: '50vh' }}
      >
        {result.map((p) => {
          const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
          const id = idMatch ? idMatch[1] : null;

          if (!id) {
            console.error('Invalid Pokemon URL', p.url);
            return null;
          }

          return (
            <PokemonCard
              key={p.name}
              name={p.name}
              id={id}
              onSelect={handleSelect}
              theme={theme}
            />
          );
        })}
      </div>
    </div>
  );
};
