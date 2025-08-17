'use client';

import Image from 'next/image';
import { PokemonDetails } from '~/lib/api/pokemon/types/pokemon-details';
import { useTranslations } from 'next-intl';

type Props = {
  pokemon: PokemonDetails;
};

export const PokemonInfo = ({ pokemon }: Props) => {
  const t = useTranslations('PokemonInfo');

  const image =
    pokemon.sprites?.other?.['official-artwork']?.front_default ??
    pokemon.sprites?.front_default ??
    '';

  return (
    <>
      {image && (
        <div className="w-32 h-32 mx-auto mb-4 relative">
          <Image
            src={image}
            alt={pokemon.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      )}

      <p>
        <span className="font-semibold">{t('baseExperience')}:</span>{' '}
        {pokemon.base_experience}
      </p>
      <p>
        <span className="font-semibold">{t('height')}:</span> {pokemon.height}
      </p>
      <p>
        <span className="font-semibold">{t('weight')}:</span> {pokemon.weight}
      </p>
      <p>
        <span className="font-semibold">{t('types')}:</span>{' '}
        {pokemon.types.length > 0
          ? pokemon.types.map((t) => t.type.name).join(', ')
          : t('notAvailable')}
      </p>
      <p>
        <span className="font-semibold">{t('abilities')}:</span>{' '}
        {pokemon.abilities.length > 0
          ? pokemon.abilities.map((a) => a.ability.name).join(', ')
          : t('notAvailable')}
      </p>
    </>
  );
};
