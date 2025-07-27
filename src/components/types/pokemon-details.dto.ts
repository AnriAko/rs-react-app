export interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  types: Type[];
  abilities: Ability[];
  sprites: Sprites;
}

export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface Sprites {
  front_default: string;
  other?: {
    ['official-artwork']?: {
      front_default?: string;
    };
  };
}
