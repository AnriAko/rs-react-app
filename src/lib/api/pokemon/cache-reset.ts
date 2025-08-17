'use server';

import { revalidateTag } from 'next/cache';

export async function resetPokemonDetailsCache(id: string) {
  revalidateTag(`POKEMON_${id}`);
}

export async function resetPokemonListCache(offset = 0, limit = 20) {
  revalidateTag(`POKEMON_LIST_${offset}_${limit}`);
}

export async function resetAllPokemonsCache() {
  revalidateTag('POKEMONS');
}
