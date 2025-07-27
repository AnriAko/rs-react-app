import type { Pokemon } from '../types/pokemon.dto';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './pokemon-card';

interface PokemonListProps {
  result: Pokemon[];
}

const PokemonList = ({ result }: PokemonListProps) => {
  const navigate = useNavigate();

  const handleSelect = (url: string) => {
    const idMatch = url.match(/\/pokemon\/(\d+)\//);
    const id = idMatch ? idMatch[1] : null;

    if (id) {
      navigate(`details/${id}`);
    } else {
      console.error('Invalid Pokemon URL', url);
    }
  };

  return (
    <div className="flex gap-6 mt-6" style={{ minHeight: '45vh' }}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto"
        style={{ flex: 1, maxHeight: '45vh' }}
      >
        {result.map((p) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            url={p.url}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
