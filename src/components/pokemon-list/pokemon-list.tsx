import { useNavigate } from 'react-router';
import PokemonCard from './pokemon-card';
import type { Pokemon } from '../types/pokemon';
import { ROUTES_PATH } from '../../router/routes-path';

type PokemonListProps = {
  result: Pokemon[];
};

const PokemonList = ({ result }: PokemonListProps) => {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    navigate(ROUTES_PATH.getDetailsPath(id));
  };

  return (
    <div className="flex gap-6 mt-6 mb-3" style={{ minHeight: '45vh' }}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto"
        style={{ flex: 1, maxHeight: '45vh' }}
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default PokemonList;
