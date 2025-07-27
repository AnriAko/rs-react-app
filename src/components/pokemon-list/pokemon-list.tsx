import PokemonCard from './pokemon-card';
import type { Pokemon } from '../types/pokemon.dto';

interface PokemonListProps {
  result: Pokemon[];
}

const PokemonList = ({ result }: PokemonListProps) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
      style={{ maxHeight: '45vh', overflowY: 'auto' }}
    >
      {result.map((p) => (
        <PokemonCard key={p.name} name={p.name} url={p.url} />
      ))}
    </div>
  );
};

export default PokemonList;
