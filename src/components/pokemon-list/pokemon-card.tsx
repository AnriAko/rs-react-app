import { Component, type ReactNode } from 'react';

interface PokemonProps {
  name: string;
  url: string;
}

class PokemonCard extends Component<PokemonProps> {
  render(): ReactNode {
    const capitalized =
      this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    return (
      <div className="bg-gray-800 text-white rounded-md p-4 shadow-md hover:shadow-lg transition">
        <div className="mb-2 font-semibold">Pokémon: {capitalized}</div>
        <div>
          Description:{' '}
          <a
            href={this.props.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            {this.props.url}
          </a>
        </div>
      </div>
    );
  }
}

export default PokemonCard;
