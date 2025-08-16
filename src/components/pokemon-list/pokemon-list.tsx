import { getPokemons } from '~/lib/api/pokemon/pokemon-api';
import { PokemonCard } from '~/components/pokemon-card';

export async function PokemonList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const limit = Number(searchParams.limit ?? 20);
  const page = Number(searchParams.page ?? 1);
  const offset = (page - 1) * limit;

  const data = await getPokemons(offset, limit);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {data.results.map((p) => {
        const idMatch = p.url.match(/\/pokemon\/(\d+)\//);
        const id = idMatch ? idMatch[1] : null;
        if (!id) return null;

        return <PokemonCard key={p.name} name={p.name} id={id} />;
      })}
    </div>
  );
}
