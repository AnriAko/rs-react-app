import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonDetails } from '../service/pokemon-service';
import type { PokemonDetails } from '../types/pokemon-details.dto';

export default function PokemonDetailsCard() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        setPokemon(null);
        return;
      }

      setLoading(true);
      try {
        const data = await getPokemonDetails(id);
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch pokemon details:', error);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  if (!id) return null;

  return (
    <div className="mt-5 w-full rounded-xl border bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold capitalize">
          {pokemon?.name || 'Loading...'}
        </h2>
        <button
          onClick={handleClose}
          className="text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          type="button"
        >
          Close
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-32">
          <div className="w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : pokemon ? (
        <>
          <img
            src={
              pokemon.sprites?.other?.['official-artwork']?.front_default ??
              pokemon.sprites?.front_default ??
              ''
            }
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
      ) : (
        <p>Pokemon not found.</p>
      )}
    </div>
  );
}
