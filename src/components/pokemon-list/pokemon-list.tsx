import { Component, type ReactNode } from 'react';
import PokemonCard from './pokemon-card';
import type { Pokemon } from '../types/pokemon.dto';

interface PokemonListProps {
  result: Pokemon[];
}

class PokemonList extends Component<PokemonListProps> {
  render(): ReactNode {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
        style={{ maxHeight: '45vh', overflowY: 'auto' }}
      >
        {this.props.result.map((p) => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>
    );
  }
}

export default PokemonList;
