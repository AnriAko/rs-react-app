import type { PokemonDetails } from '@api/pokemon-api/types/pokemon-details';

type Props = {
  pokemon: PokemonDetails;
};

export const PokemonInfo = ({ pokemon }: Props) => {
  const image =
    pokemon.sprites?.other?.['official-artwork']?.front_default ??
    pokemon.sprites?.front_default ??
    '';

  return (
    <>
      <img
        src={image}
        alt={pokemon.name}
        className="w-32 h-32 object-contain mx-auto mb-4"
      />
      <p>
        <span className="font-semibold">Base Experience:</span>{' '}
        {pokemon.base_experience}
      </p>
      <p>
        <span className="font-semibold">Height:</span> {pokemon.height}
      </p>
      <p>
        <span className="font-semibold">Weight:</span> {pokemon.weight}
      </p>
      <p>
        <span className="font-semibold">Types:</span>{' '}
        {pokemon.types.length > 0
          ? pokemon.types.map((t) => t.type.name).join(', ')
          : 'N/A'}
      </p>
      <p>
        <span className="font-semibold">Abilities:</span>{' '}
        {pokemon.abilities.length > 0
          ? pokemon.abilities.map((a) => a.ability.name).join(', ')
          : 'N/A'}
      </p>
    </>
  );
};
